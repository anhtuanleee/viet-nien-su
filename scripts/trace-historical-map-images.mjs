import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { feature as topojsonFeature } from "topojson-client";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = join(projectRoot, "source-data/historical-territories-image-traced.geojson");
const khoaBase = "https://e.khoahoc.tv/photos/image";
const diaOcBase = "https://cdn.diaocthongthai.com/2021/08";
const khoa = (date, file) => `${khoaBase}/${date}/ban-do-viet-nam-${file}.jpg`;
const diaOc = (file) => `${diaOcBase}/ban-do-lanh-tho-viet-nam-qua-cac-thoi-ky-${file}.jpg`;
const sourcePages = {
  "khoahoc-45-maps": "https://khoahoc.tv/45-tam-ban-do-viet-nam-qua-cac-giai-doan-tu-the-ky-10-phan-1-67140",
  "diaocthongthai-atlas": "https://diaocthongthai.com/ban-do-lanh-tho-viet-nam-qua-cac-thoi-ky/",
};

// The source illustrations have no graticule and visibly distort the coast.
// Keep their historical inland boundary, but constrain traced color cells to
// real regional land so an affine/polynomial warp can never spill into the sea.
const landTopology = JSON.parse(await readFile(join(projectRoot, "node_modules/world-atlas/land-50m.json"), "utf8"));
const landGeoJson = topojsonFeature(landTopology, landTopology.objects.land);
const landGeometry = landGeoJson.type === "FeatureCollection" ? landGeoJson.features[0].geometry : landGeoJson.geometry;
const regionalExtent = [95, 120, 3, 30];

const pointInRing = ([longitude, latitude], ring) => {
  let inside = false;
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index, index += 1) {
    const [currentLongitude, currentLatitude] = ring[index];
    const [previousLongitude, previousLatitude] = ring[previous];
    const intersects = currentLatitude > latitude !== previousLatitude > latitude
      && longitude < ((previousLongitude - currentLongitude) * (latitude - currentLatitude))
        / (previousLatitude - currentLatitude || 1e-12) + currentLongitude;
    if (intersects) inside = !inside;
  }
  return inside;
};

const regionalLandPolygons = (landGeometry.type === "Polygon"
  ? [landGeometry.coordinates]
  : landGeometry.coordinates)
  .map((polygon) => {
    const longitudes = polygon[0].map(([longitude]) => longitude);
    const latitudes = polygon[0].map(([, latitude]) => latitude);
    return {
      polygon,
      bounds: [Math.min(...longitudes), Math.max(...longitudes), Math.min(...latitudes), Math.max(...latitudes)],
    };
  })
  .filter(({ bounds: [west, east, south, north] }) => (
    east >= regionalExtent[0] && west <= regionalExtent[1]
      && north >= regionalExtent[2] && south <= regionalExtent[3]
      // Historical island claims are rendered by a separate evidence layer.
      // Excluding small offshore land here also prevents a displaced mainland
      // pixel from snapping across the Gulf of Tonkin onto Hainan.
      && (east - west > 3 || north - south > 3)
  ));

const isOnRegionalLand = (longitude, latitude) => regionalLandPolygons.some(({ polygon, bounds }) => {
  const [west, east, south, north] = bounds;
  if (longitude < west || longitude > east || latitude < south || latitude > north) return false;
  if (!pointInRing([longitude, latitude], polygon[0])) return false;
  return !polygon.slice(1).some((hole) => pointInRing([longitude, latitude], hole));
});

const buildLandSnapGrid = (gridWidth, gridHeight, imageWidth, imageHeight) => {
  const size = gridWidth * gridHeight;
  const land = new Uint8Array(size);
  const distance = new Int16Array(size);
  const nearest = new Int32Array(size);
  distance.fill(-1);
  nearest.fill(-1);
  const queue = new Int32Array(size);
  let head = 0;
  let tail = 0;

  for (let gridY = 0; gridY < gridHeight; gridY += 1) {
    for (let gridX = 0; gridX < gridWidth; gridX += 1) {
      const index = gridY * gridWidth + gridX;
      const x = Math.min(imageWidth - 1, gridX * cellSize + Math.floor(cellSize / 2));
      const y = Math.min(imageHeight - 1, gridY * cellSize + Math.floor(cellSize / 2));
      const [longitude, latitude] = pixelToWgs84(x, y, imageWidth, imageHeight);
      if (!isOnRegionalLand(longitude, latitude)) continue;
      land[index] = 1;
      distance[index] = 0;
      nearest[index] = index;
      queue[tail++] = index;
    }
  }

  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  while (head < tail) {
    const index = queue[head++];
    const gridX = index % gridWidth;
    const gridY = Math.floor(index / gridWidth);
    for (const [offsetX, offsetY] of directions) {
      const nextX = gridX + offsetX;
      const nextY = gridY + offsetY;
      if (nextX < 0 || nextX >= gridWidth || nextY < 0 || nextY >= gridHeight) continue;
      const nextIndex = nextY * gridWidth + nextX;
      if (distance[nextIndex] !== -1) continue;
      distance[nextIndex] = distance[index] + 1;
      nearest[nextIndex] = nearest[index];
      queue[tail++] = nextIndex;
    }
  }
  return { land, distance, nearest };
};

const snapMaskToLand = (mask, gridWidth, gridHeight, landSnapGrid, maximumDistance = 30) => {
  const snapped = new Uint8Array(mask.length);
  for (let index = 0; index < mask.length; index += 1) {
    if (!mask[index]) continue;
    if (landSnapGrid.land[index]) {
      snapped[index] = 1;
      continue;
    }
    if (landSnapGrid.distance[index] < 0 || landSnapGrid.distance[index] > maximumDistance) continue;
    snapped[landSnapGrid.nearest[index]] = 1;
  }
  return fillHoles(closeMask(snapped, gridWidth, gridHeight, 2), gridWidth, gridHeight);
};

// The shared illustration frame is an oblique regional map, so a plain affine
// transform drifts east around the Gulf of Tonkin. This quadratic transform
// maps its normalized 585×960 frame to WGS84 using coastal control points at
// Móng Cái, Hải Phòng, Nghệ An, Bố Chính, Ma Linh, Hải Vân and Cà Mau.
const pixelToWgs84 = (x, y, width, height) => {
  const normalizedX = x * (585 / width);
  const normalizedY = y * (960 / height);
  return [
    0.01929352494 * normalizedX
      + 0.00502668791 * normalizedY
      - 0.00000390208639 * normalizedY * normalizedY
      + 98.77106197,
    -0.00756686905 * normalizedX
      - 0.01658606441 * normalizedY
      - 0.00000201844478 * normalizedY * normalizedY
      + 26.96259691,
  ];
};

// Every image in the shared series contains the same non-geographic ornaments:
// a parchment caption at bottom-left, red frame/stamps, a compass and an inset
// map. Remove those pixels before color segmentation so they can never become
// territory, even when an ornament touches the selected color component.
const isDecorativePixel = (x, y, width, height, sourceId) => {
  const normalizedX = x * (585 / width);
  const normalizedY = y * (960 / height);
  if (normalizedX < 20 || normalizedX > 565 || normalizedY < 20 || normalizedY > 940) return true;
  if (normalizedX < 132 && normalizedY > 520) return true;
  if (normalizedX < 86 && normalizedY >= 105 && normalizedY <= 215) return true;
  if (normalizedX > 485 && normalizedY >= 380 && normalizedY <= 575) return true;
  if (normalizedX > 420 && normalizedY > 770) return true;
  if (sourceId === "khoahoc-45-maps" && normalizedX > 445 && normalizedY < 140) return true;
  return false;
};

const pointInPixelPolygon = (x, y, polygon) => {
  let inside = false;
  for (let current = 0, previous = polygon.length - 1; current < polygon.length; previous = current, current += 1) {
    const [currentX, currentY] = polygon[current];
    const [previousX, previousY] = polygon[previous];
    if ((currentY > y) !== (previousY > y)
      && x < ((previousX - currentX) * (y - currentY)) / (previousY - currentY) + currentX) inside = !inside;
  }
  return inside;
};

const rgbToHsv = (red, green, blue) => {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const maximum = Math.max(r, g, b);
  const minimum = Math.min(r, g, b);
  const delta = maximum - minimum;
  let hue = 0;
  if (delta) {
    if (maximum === r) hue = 60 * (((g - b) / delta) % 6);
    else if (maximum === g) hue = 60 * ((b - r) / delta + 2);
    else hue = 60 * ((r - g) / delta + 4);
  }
  if (hue < 0) hue += 360;
  return [hue, maximum ? delta / maximum : 0, maximum];
};

const colorMatches = (preset, red, green, blue) => {
  const [hue, saturation, value] = rgbToHsv(red, green, blue);
  if (value < 0.28) return false;
  if (preset === "yellow") return hue >= 34 && hue <= 68 && saturation >= 0.22 && value >= 0.48;
  if (preset === "orange") return hue >= 13 && hue < 38 && saturation >= 0.38 && value >= 0.48;
  if (preset === "lime") return hue >= 68 && hue <= 112 && saturation >= 0.3 && value >= 0.4;
  if (preset === "lime-bright") return hue >= 70 && hue <= 108 && saturation >= 0.58 && value >= 0.48;
  if (preset === "green") return hue >= 74 && hue <= 145 && saturation >= 0.28 && value >= 0.35;
  if (preset === "red") return (hue <= 14 || hue >= 346) && saturation >= 0.48 && value >= 0.42;
  if (preset === "blue") return hue >= 205 && hue <= 255 && saturation >= 0.36 && value >= 0.35;
  if (preset === "purple") return hue >= 275 && hue <= 335 && saturation >= 0.25 && value >= 0.35;
  if (preset === "slate") return hue >= 95 && hue <= 175 && saturation >= 0.08 && saturation <= 0.48 && value >= 0.25 && value <= 0.72;
  return false;
};

const presetHueTargets = { yellow: 51, orange: 25, lime: 90, "lime-bright": 90, green: 118, red: 0, blue: 230, purple: 305, slate: 125 };
const presetColorScore = (preset, red, green, blue) => {
  const [hue, saturation, value] = rgbToHsv(red, green, blue);
  const target = presetHueTargets[preset] ?? 0;
  const hueDistance = Math.min(Math.abs(hue - target), 360 - Math.abs(hue - target));
  return hueDistance + Math.abs(saturation - 0.62) * 22 + Math.abs(value - 0.68) * 12;
};

const morphology = (mask, width, height, operation) => {
  const output = new Uint8Array(mask.length);
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      let value = operation === "erode" ? 1 : 0;
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          const neighbor = mask[(y + dy) * width + x + dx];
          value = operation === "erode" ? value && neighbor : value || neighbor;
        }
      }
      output[y * width + x] = Number(value);
    }
  }
  return output;
};

const closeMask = (mask, width, height, passes = 2) => {
  let result = mask;
  for (let pass = 0; pass < passes; pass += 1) result = morphology(result, width, height, "dilate");
  for (let pass = 0; pass < passes; pass += 1) result = morphology(result, width, height, "erode");
  return result;
};

const selectComponents = (mask, width, height, maximumComponents = 1, maximumAspectRatio = 8) => {
  const seen = new Uint8Array(mask.length);
  const components = [];
  for (let start = 0; start < mask.length; start += 1) {
    if (!mask[start] || seen[start]) continue;
    const queue = [start];
    const cells = [];
    seen[start] = 1;
    while (queue.length) {
      const index = queue.pop();
      cells.push(index);
      const x = index % width;
      const y = Math.floor(index / width);
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nextX = x + dx;
        const nextY = y + dy;
        const next = nextY * width + nextX;
        if (nextX >= 0 && nextX < width && nextY >= 0 && nextY < height && mask[next] && !seen[next]) {
          seen[next] = 1;
          queue.push(next);
        }
      }
    }
    if (cells.length >= 12) {
      let minimumX = width;
      let maximumX = 0;
      let minimumY = height;
      let maximumY = 0;
      for (const index of cells) {
        const x = index % width;
        const y = Math.floor(index / width);
        minimumX = Math.min(minimumX, x);
        maximumX = Math.max(maximumX, x);
        minimumY = Math.min(minimumY, y);
        maximumY = Math.max(maximumY, y);
      }
      const componentWidth = maximumX - minimumX + 1;
      const componentHeight = maximumY - minimumY + 1;
      const aspectRatio = Math.max(componentWidth / componentHeight, componentHeight / componentWidth);
      if (aspectRatio <= maximumAspectRatio) components.push({ cells, aspectRatio });
    }
  }
  components.sort((left, right) => right.cells.length - left.cells.length);
  const largest = components[0]?.cells.length ?? 0;
  const selected = components
    .filter((component) => component.cells.length >= Math.max(12, largest * 0.025))
    .slice(0, maximumComponents);
  const output = new Uint8Array(mask.length);
  for (const component of selected) for (const index of component.cells) output[index] = 1;
  return output;
};

const fillHoles = (mask, width, height) => {
  const outside = new Uint8Array(mask.length);
  const queue = [];
  for (let x = 0; x < width; x += 1) queue.push(x, (height - 1) * width + x);
  for (let y = 0; y < height; y += 1) queue.push(y * width, y * width + width - 1);
  while (queue.length) {
    const index = queue.pop();
    if (index < 0 || index >= mask.length || outside[index] || mask[index]) continue;
    outside[index] = 1;
    const x = index % width;
    const y = Math.floor(index / width);
    if (x > 0) queue.push(index - 1);
    if (x < width - 1) queue.push(index + 1);
    if (y > 0) queue.push(index - width);
    if (y < height - 1) queue.push(index + width);
  }
  return mask.map((value, index) => value || !outside[index] ? 1 : 0);
};

const perpendicularDistance = (point, start, end) => {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  if (!dx && !dy) return Math.hypot(point[0] - start[0], point[1] - start[1]);
  const ratio = Math.max(0, Math.min(1, ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(point[0] - (start[0] + ratio * dx), point[1] - (start[1] + ratio * dy));
};

const simplify = (points, tolerance) => {
  if (points.length <= 3) return points;
  let maximumDistance = 0;
  let splitIndex = 0;
  for (let index = 1; index < points.length - 1; index += 1) {
    const distance = perpendicularDistance(points[index], points[0], points.at(-1));
    if (distance > maximumDistance) {
      maximumDistance = distance;
      splitIndex = index;
    }
  }
  if (maximumDistance <= tolerance) return [points[0], points.at(-1)];
  return [
    ...simplify(points.slice(0, splitIndex + 1), tolerance).slice(0, -1),
    ...simplify(points.slice(splitIndex), tolerance),
  ];
};

const traceRings = (
  mask,
  gridWidth,
  gridHeight,
  cellSize,
  imageWidth,
  imageHeight,
  coordinateOffset = [0, 0],
  simplificationTolerance = 0.025,
) => {
  const edges = new Map();
  const addEdge = (startX, startY, endX, endY) => {
    const key = `${startX},${startY}`;
    if (!edges.has(key)) edges.set(key, []);
    edges.get(key).push([endX, endY]);
  };
  const filled = (x, y) => x >= 0 && x < gridWidth && y >= 0 && y < gridHeight && mask[y * gridWidth + x];
  for (let y = 0; y < gridHeight; y += 1) {
    for (let x = 0; x < gridWidth; x += 1) {
      if (!filled(x, y)) continue;
      if (!filled(x, y - 1)) addEdge(x, y, x + 1, y);
      if (!filled(x + 1, y)) addEdge(x + 1, y, x + 1, y + 1);
      if (!filled(x, y + 1)) addEdge(x + 1, y + 1, x, y + 1);
      if (!filled(x - 1, y)) addEdge(x, y + 1, x, y);
    }
  }
  const rings = [];
  while (edges.size) {
    const [startKey] = edges.keys();
    const [startX, startY] = startKey.split(",").map(Number);
    const ring = [[startX, startY]];
    let currentKey = startKey;
    let guard = 0;
    while (guard < gridWidth * gridHeight * 4) {
      guard += 1;
      const candidates = edges.get(currentKey);
      if (!candidates?.length) break;
      const next = candidates.pop();
      if (!candidates.length) edges.delete(currentKey);
      ring.push(next);
      currentKey = `${next[0]},${next[1]}`;
      if (currentKey === startKey) break;
    }
    if (ring.length < 8 || currentKey !== startKey) continue;
    const coordinates = ring.map(([x, y]) => {
      const [longitude, latitude] = pixelToWgs84(x * cellSize, y * cellSize, imageWidth, imageHeight);
      return [longitude + coordinateOffset[0], latitude + coordinateOffset[1]];
    });
    const open = coordinates.slice(0, -1);
    const simplified = simplify([...open, open[0]], simplificationTolerance);
    if (simplified.length >= 4) rings.push(simplified.map(([lng, lat]) => [Number(lng.toFixed(4)), Number(lat.toFixed(4))]));
  }
  return rings;
};

const feature = (periodId, name, preset, options = {}) => ({
  periodId,
  name,
  preset,
  control: options.control ?? "direct",
  confidence: options.confidence ?? "medium",
  height: options.height ?? 12000,
  color: options.color ?? "#d7a050",
  bounds: options.bounds ?? [101.5, 110.2, 7.5, 24.2],
  maximumComponents: options.maximumComponents ?? 1,
  postSnapMaximumComponents: options.postSnapMaximumComponents,
  maximumAspectRatio: options.maximumAspectRatio ?? 8,
  morphologyPasses: options.morphologyPasses ?? (preset === "slate" ? 5 : 2),
  pixelPolygon: options.pixelPolygon,
  reconstructionMethod: options.reconstructionMethod ?? "georeferenced-image-color-trace",
  coordinateOffset: options.coordinateOffset ?? [0, 0],
  simplificationTolerance: options.simplificationTolerance ?? 0.018,
});

const maps = [
  { year: "Văn Lang", sourceId: "diaocthongthai-atlas", url: diaOc(1), features: [
    feature("van-lang", "Văn Lang · vùng lõi", "yellow", { confidence: "low", bounds: [102, 110, 15.5, 24.5] }),
    feature("van-lang", "Không gian Âu Việt", "green", { control: "influence", confidence: "low", height: 6500, color: "#7f9661", bounds: [103, 112, 19, 25] }),
  ] },
  { year: "Âu Lạc", sourceId: "diaocthongthai-atlas", url: diaOc(2), features: [feature("au-lac", "Âu Lạc", "lime", { confidence: "low", bounds: [102, 111, 15.5, 24.5] })] },
  { year: "Nam Việt", sourceId: "diaocthongthai-atlas", url: diaOc(3), features: [feature("nam-viet", "Nam Việt", "slate", { confidence: "low", bounds: [102, 116, 15, 25], postSnapMaximumComponents: 3 })] },
  { year: "Bắc thuộc I", sourceId: "diaocthongthai-atlas", url: diaOc(4), features: [feature("bac-thuoc-1", "Giao Chỉ – Cửu Chân – Nhật Nam · lệ thuộc Hán", "slate", { control: "autonomous", color: "#9a8261", bounds: [102, 111, 14, 24], postSnapMaximumComponents: 3 })] },
  { year: "Trưng Vương", sourceId: "diaocthongthai-atlas", url: diaOc(5), features: [
    feature("trung-vuong", "Vùng lõi Trưng Vương", "yellow", { confidence: "low", bounds: [102, 109.3, 15, 25], postSnapMaximumComponents: 2 }),
    feature("trung-vuong", "Hợp Phố / Lĩnh Nam · phạm vi truyền thống", "yellow", { control: "influence", confidence: "low", height: 6500, color: "#668d82", bounds: [109.3, 116, 18, 25], postSnapMaximumComponents: 2 }),
  ] },
  { year: "Bắc thuộc II", sourceId: "diaocthongthai-atlas", url: diaOc(4), features: [feature("bac-thuoc-2", "Giao Châu · lệ thuộc các triều đại phương Bắc", "slate", { control: "autonomous", color: "#9a8261", bounds: [102, 111, 14, 24], postSnapMaximumComponents: 3 })] },
  { year: "Vạn Xuân", sourceId: "diaocthongthai-atlas", url: diaOc(6), features: [feature("van-xuan", "Vạn Xuân", "yellow", { bounds: [102, 111, 14, 24], postSnapMaximumComponents: 3 })] },
  { year: "Bắc thuộc III", sourceId: "diaocthongthai-atlas", url: diaOc(4), features: [feature("bac-thuoc-3", "An Nam đô hộ phủ · lệ thuộc Tùy–Đường", "slate", { control: "autonomous", color: "#9a8261", bounds: [102, 111, 14, 24], postSnapMaximumComponents: 3 })] },
  { year: "905", sourceId: "khoahoc-45-maps", url: khoa("2015/11/27", "1"), features: [feature("tinh-hai-quan", "Tĩnh Hải quân", "yellow", { bounds: [102, 109, 16, 24] })] },
  { year: "938", sourceId: "khoahoc-45-maps", url: khoa("2015/11/27", "5"), features: [feature("ngo-quyen", "Nhà Ngô", "yellow", { bounds: [102, 109, 16, 24] })] },
  { year: "968", sourceId: "khoahoc-45-maps", url: khoa("2015/11/27", "9"), features: [feature("dai-co-viet", "Đại Cồ Việt", "yellow", { bounds: [102, 109, 16, 24] })] },
  { year: "1069", sourceId: "khoahoc-45-maps", url: khoa("2015/11/27", "15"), features: [feature("dai-viet-1069", "Đại Việt thời Lý", "yellow", { bounds: [102, 109, 16, 24] })] },
  { year: "1306", sourceId: "khoahoc-45-maps", url: khoa("2015/11/27", "18"), features: [feature("dai-viet-1306", "Đại Việt thời Trần", "yellow", { bounds: [102, 109.2, 15, 24] })] },
  { year: "1407", sourceId: "khoahoc-45-maps", url: khoa("2015/11/28", "21"), features: [feature("minh-thuoc", "Giao Chỉ thuộc Minh", "slate", {
    control: "autonomous",
    color: "#9a8261",
    bounds: [102, 109.2, 15, 24],
    reconstructionMethod: "georeferenced-image-boundary-trace",
    // Normalized 585×960 points following the dotted Giao Chỉ boundary and
    // the coastal edge visible on the source image. Color segmentation cannot
    // distinguish this territory from the similarly colored Đại Minh terrain.
    pixelPolygon: [
      [160, 82], [205, 66], [255, 70], [305, 66], [360, 70], [410, 82], [445, 102],
      [444, 130], [410, 150], [385, 165], [355, 178], [332, 195], [313, 222],
      [300, 252], [296, 285], [302, 320], [315, 350], [330, 380], [350, 412],
      [369, 444], [351, 452], [334, 421], [315, 391], [295, 360], [273, 330],
      [251, 302], [235, 272], [219, 241], [204, 211], [189, 181], [175, 151],
      [162, 120],
    ],
  })] },
  { year: "1428", sourceId: "khoahoc-45-maps", url: khoa("2015/11/28", "24"), features: [feature("hau-le-1428", "Đại Việt phục hồi", "yellow", { bounds: [102, 109.2, 15, 24] })] },
  { year: "1471", sourceId: "khoahoc-45-maps", url: khoa("2015/11/28", "25"), features: [feature("le-thanh-tong-1471", "Đại Việt sau 1471", "yellow", { bounds: [102, 110, 12.5, 24] })] },
  { year: "1554", sourceId: "khoahoc-45-maps", url: khoa("2015/11/28", "29"), features: [
    feature("nam-bac-trieu", "Bắc triều · Nhà Mạc", "lime-bright", { color: "#b7a151", bounds: [101, 110.5, 18.5, 24.5], morphologyPasses: 3, postSnapMaximumComponents: 2 }),
    feature("nam-bac-trieu", "Nam triều · Lê trung hưng", "yellow", { color: "#c87847", bounds: [102, 110, 12.5, 21], morphologyPasses: 4 }),
  ] },
  { year: "1693", sourceId: "khoahoc-45-maps", url: khoa("2015/11/28", "35"), features: [
    feature("dang-trong-ngoai", "Đàng Ngoài", "yellow", { color: "#d9a44f", bounds: [102, 110, 17.2, 24] }),
    feature("dang-trong-ngoai", "Đàng Trong", "orange", { color: "#db7644", bounds: [104, 110, 9.5, 18.5], maximumComponents: 2 }),
    feature("dang-trong-ngoai", "Trấn Thuận Thành", "purple", { control: "autonomous", confidence: "low", height: 6500, color: "#8e7d72", bounds: [107, 110, 10.2, 13.5] }),
  ] },
  { year: "1788", sourceId: "khoahoc-45-maps", url: khoa("2015/11/28", "44"), features: [
    feature("tay-son", "Lãnh thổ Tây Sơn", "lime-bright", { color: "#d66d3f", bounds: [102, 110, 10.2, 24], maximumComponents: 2, morphologyPasses: 3 }),
    feature("tay-son", "Vùng Nguyễn Ánh", "yellow", { control: "autonomous", confidence: "low", height: 6500, color: "#b08a5a", bounds: [103, 108, 7.5, 11.5], postSnapMaximumComponents: 2 }),
  ] },
  { year: "1802", sourceId: "khoahoc-45-maps", url: khoa("2015/11/28", "46"), features: [feature("gia-long-1802", "Việt Nam thời Gia Long", "yellow", { confidence: "high", color: "#d6613c", bounds: [102, 110, 7.5, 24], maximumComponents: 2 })] },
  { year: "1835", sourceId: "khoahoc-45-maps", url: khoa("2015/11/28", "48"), features: [feature("dai-nam-1835", "Đại Nam", "yellow", { color: "#d75a3a", bounds: [102, 110, 7.5, 24], maximumComponents: 2 })] },
  { year: "1870", sourceId: "diaocthongthai-atlas", url: diaOc(59), features: [
    feature("nam-ky-1867", "Đại Nam còn lại", "yellow", { confidence: "high", color: "#b85a45", bounds: [102, 110, 10.2, 24], maximumComponents: 2 }),
    feature("nam-ky-1867", "Thuộc địa Nam Kỳ", "blue", { control: "autonomous", confidence: "high", color: "#9a8261", bounds: [103, 108, 7.5, 12.5] }),
  ] },
  { year: "1887", sourceId: "diaocthongthai-atlas", url: diaOc(62), features: [feature("phap-thuoc-1887", "Đông Dương thuộc Pháp · phần Việt Nam", "blue", { control: "autonomous", confidence: "high", color: "#9a8261", bounds: [102, 110, 7.5, 24], maximumComponents: 3 })] },
  { year: "1945", sourceId: "diaocthongthai-atlas", url: diaOc(69), features: [feature("doc-lap-1945", "Việt Nam Dân chủ Cộng hòa", "red", { color: "#d34f3c", bounds: [102, 110, 7.5, 24], maximumComponents: 3 })] },
  { year: "1954", sourceId: "diaocthongthai-atlas", url: diaOc(70), features: [
    feature("chia-cat-1954", "Miền Bắc", "red", { confidence: "high", color: "#d6a04b", bounds: [102, 110, 16.8, 23.7] }),
    feature("chia-cat-1954", "Miền Nam", "yellow", { confidence: "high", color: "#cf4b36", bounds: [102.8, 110, 7.5, 17.2] }),
  ] },
];

const cellSize = 3;
const outputFeatures = [];
for (const map of maps) {
  const response = await fetch(map.url);
  if (!response.ok) throw new Error(`Unable to download ${map.url}: ${response.status}`);
  const imageBuffer = Buffer.from(await response.arrayBuffer());
  const { data, info } = await sharp(imageBuffer).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const gridWidth = Math.floor(info.width / cellSize);
  const gridHeight = Math.floor(info.height / cellSize);
  const landSnapGrid = buildLandSnapGrid(gridWidth, gridHeight, info.width, info.height);
  const processedDefinitions = [];
  for (const definition of map.features) {
    const mask = new Uint8Array(gridWidth * gridHeight);
    for (let gridY = 0; gridY < gridHeight; gridY += 1) {
      for (let gridX = 0; gridX < gridWidth; gridX += 1) {
        let matchingPixels = 0;
        for (let offsetY = 0; offsetY < cellSize; offsetY += 1) {
          for (let offsetX = 0; offsetX < cellSize; offsetX += 1) {
            const x = gridX * cellSize + offsetX;
            const y = gridY * cellSize + offsetY;
            if (isDecorativePixel(x, y, info.width, info.height, map.sourceId)) continue;
            const [longitude, latitude] = pixelToWgs84(x, y, info.width, info.height);
            const [west, east, south, north] = definition.bounds;
            if (longitude < west || longitude > east || latitude < south || latitude > north) continue;
            const pixel = (y * info.width + x) * info.channels;
            const normalizedX = x * (585 / info.width);
            const normalizedY = y * (960 / info.height);
            const matches = definition.pixelPolygon
              ? pointInPixelPolygon(normalizedX, normalizedY, definition.pixelPolygon)
              : colorMatches(definition.preset, data[pixel], data[pixel + 1], data[pixel + 2]);
            if (matches) matchingPixels += 1;
          }
        }
        if (matchingPixels >= 2) mask[gridY * gridWidth + gridX] = 1;
      }
    }
    const closed = closeMask(mask, gridWidth, gridHeight, definition.morphologyPasses);
    const selected = selectComponents(
      closed,
      gridWidth,
      gridHeight,
      definition.maximumComponents,
      definition.maximumAspectRatio,
    );
    const filled = fillHoles(selected, gridWidth, gridHeight);
    const landConstrained = snapMaskToLand(filled, gridWidth, gridHeight, landSnapGrid);
    const constrainedComponents = selectComponents(
      landConstrained,
      gridWidth,
      gridHeight,
      Math.max(2, definition.postSnapMaximumComponents ?? definition.maximumComponents),
      definition.maximumAspectRatio,
    );
    processedDefinitions.push({ definition, rawMask: mask, mask: fillHoles(constrainedComponents, gridWidth, gridHeight) });
  }

  // Morphological closing and hole filling can make neighboring colors overlap.
  // Give every raster cell a single owner before vectorization to prevent both
  // invalid historical overlap and fill-extrusion z-fighting in MapLibre.
  if (processedDefinitions.length > 1) {
    for (let index = 0; index < gridWidth * gridHeight; index += 1) {
      const candidates = processedDefinitions.filter((item) => item.mask[index]);
      if (candidates.length < 2) continue;
      const rawCandidates = candidates.filter((item) => item.rawMask[index]);
      const contenders = rawCandidates.length ? rawCandidates : candidates;
      const gridX = index % gridWidth;
      const gridY = Math.floor(index / gridWidth);
      const x = Math.min(info.width - 1, gridX * cellSize + Math.floor(cellSize / 2));
      const y = Math.min(info.height - 1, gridY * cellSize + Math.floor(cellSize / 2));
      const pixel = (y * info.width + x) * info.channels;
      const winner = contenders.reduce((best, item) => {
        if (item.definition.pixelPolygon) return item;
        if (best.definition.pixelPolygon) return best;
        const itemScore = presetColorScore(item.definition.preset, data[pixel], data[pixel + 1], data[pixel + 2]);
        const bestScore = presetColorScore(best.definition.preset, data[pixel], data[pixel + 1], data[pixel + 2]);
        return itemScore < bestScore ? item : best;
      });
      for (const candidate of candidates) if (candidate !== winner) candidate.mask[index] = 0;
    }
  }

  for (const { definition, mask } of processedDefinitions) {
    const rings = traceRings(
      mask,
      gridWidth,
      gridHeight,
      cellSize,
      info.width,
      info.height,
      definition.coordinateOffset,
      definition.simplificationTolerance,
    );
    if (!rings.length) throw new Error(`No trace found for ${definition.periodId}/${definition.name}`);
    outputFeatures.push({
      type: "Feature",
      properties: {
        periodId: definition.periodId,
        name: definition.name,
        control: definition.control,
        confidence: definition.confidence,
        height: definition.height,
        color: definition.color,
        geometrySourceId: map.sourceId,
        geometrySourceUrl: map.url,
        geometrySourcePageUrl: sourcePages[map.sourceId],
        imageYear: map.year,
        reconstructionMethod: definition.reconstructionMethod,
        precision: "illustrative-trace",
        georeferenceAccuracyKm: 50,
      },
      geometry: rings.length === 1
        ? { type: "Polygon", coordinates: [rings[0]] }
        : { type: "MultiPolygon", coordinates: rings.map((ring) => [ring]) },
    });
    console.log(`${definition.periodId}: traced ${rings.length} polygon(s) from ${map.year}`);
  }
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify({ type: "FeatureCollection", features: outputFeatures })}\n`);
console.log(`Wrote ${outputFeatures.length} image-derived features to ${outputPath}`);
