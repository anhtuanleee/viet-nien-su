import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const legacySourcePath = join(projectRoot, "public/data/vietnam-historical-territories.geojson");
const tracedSourcePath = join(projectRoot, "source-data/historical-territories-image-traced.geojson");
const outputDirectory = join(projectRoot, "public/data/historical-territories");

const sourceCatalog = {
  "wikipedia-territorial-history": {
    label: "Wikipedia tiếng Việt — Lãnh thổ Việt Nam qua từng thời kỳ",
    href: "https://vi.wikipedia.org/wiki/L%C3%A3nh_th%E1%BB%95_Vi%E1%BB%87t_Nam_qua_t%E1%BB%ABng_th%E1%BB%9Di_k%E1%BB%B3",
    role: "reference-index",
    license: "CC BY-SA 4.0 (text; each media file has its own license)",
  },
  "khoahoc-45-maps": {
    label: "KhoaHoc.tv — 45 bản đồ Việt Nam từ thế kỷ X",
    href: "https://khoahoc.tv/45-tam-ban-do-viet-nam-qua-cac-giai-doan-tu-the-ky-10-phan-1-67140",
    role: "illustrative-image-geometry",
    license: "Unspecified; do not redistribute images",
  },
  "diaocthongthai-atlas": {
    label: "Địa Ốc Thông Thái — 67 bản đồ lãnh thổ qua các thời kỳ",
    href: "https://diaocthongthai.com/ban-do-lanh-tho-viet-nam-qua-cac-thoi-ky/",
    role: "illustrative-image-geometry",
    license: "Unspecified; do not redistribute images",
  },
  "commons-van-lang-au-lac": {
    label: "Wikimedia Commons — bản đồ Văn Lang và Nam Cương",
    href: "https://commons.wikimedia.org/wiki/File:B%E1%BA%A3n_%C4%91%E1%BB%93_V%C4%83n_Lang_%26_Nam_C%C6%B0%C6%A1ng.JPG",
    role: "community-reconstruction",
    license: "CC0",
  },
  "commons-tinh-hai-ngo": {
    label: "Wikimedia Commons — Tĩnh Hải quân và đầu thời Ngô",
    href: "https://commons.wikimedia.org/wiki/File:Map_of_T%C4%A9nh_H%E1%BA%A3i_qu%C3%A2n_and_early_years_of_Ng%C3%B4_dynasty.png",
    role: "community-reconstruction",
    license: "CC BY-SA 4.0",
  },
  "commons-ly": {
    label: "Wikimedia Commons — bản đồ nhà Lý",
    href: "https://commons.wikimedia.org/wiki/File:Map_of_the_L%C3%BD_dynasty.png",
    role: "community-reconstruction",
    license: "CC BY-SA 4.0",
  },
  "commons-le-thanh-tong": {
    label: "Wikimedia Commons — Đại Việt thời Lê Thánh Tông",
    href: "https://commons.wikimedia.org/wiki/File:Map_of_Later_L%C3%AA_dynasty_during_the_reign_of_L%C3%AA_Th%C3%A1nh_T%C3%B4ng_(1460-1497).png",
    role: "community-reconstruction",
    license: "CC BY-SA 4.0",
  },
  "commons-nguyen-1838": {
    label: "Wikimedia Commons — địa giới hành chính nhà Nguyễn năm 1838",
    href: "https://commons.wikimedia.org/wiki/File:Nguyen_Dynasty,_administrative_divisions_map_(1838).svg",
    role: "community-reconstruction",
    license: "CC BY-SA 4.0",
  },
  "museum-overview": {
    label: "Bảo tàng Lịch sử Quốc gia — tổng quan lịch sử Việt Nam",
    href: "https://baotanglichsu.vn/en/Articles/4196/vietnam-from-the-1st-to-the-10th-centuries-ad",
  },
  "museum-hung-kings": {
    label: "Bảo tàng Lịch sử Quốc gia — thời đại Hùng Vương và Cổ Loa",
    href: "https://baotanglichsu.vn/vi/Articles/3091/71651/nghien-cuu-phuc-dung-no-lien-chau-thoi-an-duong-vuong-lam-ro-hon-tinh-lich-su-cua-thoi-djai-hung-vuong.html",
  },
  "quang-binh-1069": {
    label: "Sở KH&CN Quảng Bình — Bố Chính, Địa Lý và Ma Linh năm 1069",
    href: "https://skhcn.quangbinh.gov.vn/3cms/upload/khcn/File/Hoithao/CANVUONG/29.pdf",
  },
  "museum-1306": {
    label: "Bảo tàng Lịch sử Quốc gia — Huyền Trân, châu Ô và châu Lý",
    href: "https://baotanglichsu.vn/vi/Articles/3098/15311/cong-chua-huyen-tran-voi-lich-su-dan-toc.html",
  },
  "museum-1471": {
    label: "Bảo tàng Lịch sử Quốc gia — thừa tuyên Quảng Nam năm 1471",
    href: "https://baotanglichsu.vn/vi/Articles/3101/73267/xu-quang-nam-xua-su-kien-lon-nam-1471.html",
  },
  "hcmc-1698": {
    label: "Sở Quy hoạch–Kiến trúc TP.HCM — phủ Gia Định năm 1698",
    href: "https://qhkt.hochiminhcity.gov.vn/Media/Uploads/T%C3%80I%20LI%E1%BB%86U%20H%E1%BB%8CP/2023/HT_%C4%90%E1%BB%81%20xu%E1%BA%A5t%20PT%20h%E1%BA%A1%20t%E1%BA%A7ng%20ngo%E1%BA%A1i%20th%C3%A0nh%20TPHCM/2023_%C4%90A_Ha_tang_Tai%20lieu%20hoi%20thao%201%20-%20V1.pdf",
  },
  "museum-hoang-sa-bac-hai": {
    label: "Bảo tàng Lịch sử Quốc gia — đội Hoàng Sa, Bắc Hải từ thời chúa Nguyễn",
    href: "https://baotanglichsu.vn/VI/Articles/3096/68516/nha-trung-bay-djoi-hoang-sa-bac-hai-tren-djao-ly-son.html",
    role: "historical-maritime-evidence",
  },
  "museum-tay-son-islands": {
    label: "Bảo tàng Lịch sử Quốc gia — Hoàng Sa, Trường Sa thời Tây Sơn và Nguyễn",
    href: "https://baotanglichsu.vn/vi/Articles/2001/65768/hoang-sa-va-truong-sa-duoi-thoi-tay-son-nha-nguyen.html",
    role: "historical-maritime-evidence",
  },
  "archives-nguyen-islands": {
    label: "Trung tâm Lưu trữ quốc gia — châu bản Nguyễn về Hoàng Sa, Trường Sa",
    href: "https://www.archives.org.vn/gioi-thieu-tai-lieu-nghiep-vu/chau-ban-trieu-nguyen-nhung-chung-cu-lich-su-phap-ly-ve-chu-quyen-cua-viet-nam-doi-voi-hoang-sa-truong-sa.htm",
    role: "primary-record-index",
  },
  "archives-french-hoang-sa": {
    label: "Trung tâm Lưu trữ quốc gia — quản lý hành chính Hoàng Sa năm 1938",
    href: "https://www.archives.org.vn/gioi-thieu-tai-lieu-nghiep-vu/lich-su-bien-dong-dia-gioi-hanh-chinh-thua-thien-hue-tu-do-thi-co-den-thanh-pho-truc-thuoc-trung-uong-ky-ii-tu-do-thi-hue-den-thanh-pho-truc-thuoc-trung-uong.htm",
    role: "colonial-administrative-record",
  },
  "mofa-islands-status": {
    label: "Bộ Ngoại giao Việt Nam — sử liệu và tình trạng Hoàng Sa, Trường Sa",
    href: "https://mofa.gov.vn/tin-chi-tiet/chi-tiet/hop-bao-quoc-te-ve-tinh-hinh-bien-dong-254.html",
    role: "official-position-and-status",
  },
  "geneva-1954": {
    label: "Hiệp định Genève 1954 — mô tả giới tuyến quân sự tạm thời",
    href: "https://history.state.gov/historicaldocuments/frus1952-54v16/d1035",
  },
  "provinces-2025": {
    label: "Vietnamese Provinces Database — địa giới WGS84 năm 2025",
    href: "https://github.com/thanglequoc/vietnamese-provinces-database/tree/master/json/geojson",
  },
};

const sharedVisualReferences = ["wikipedia-territorial-history", "diaocthongthai-atlas"];
const referenceCollections = {
  wikipedia: {
    sourceId: "wikipedia-territorial-history",
    auditedMediaFiles: 50,
    usage: "Follow citations and original Wikimedia file metadata; do not treat the article itself as coordinate evidence.",
  },
  khoahoc: {
    sourceId: "khoahoc-45-maps",
    mapCount: 45,
    milestones: [
      "905", "930", "931", "937", "938", "944", "966–967", "967", "968", "980", "1010", "1014", "1048", "1069",
      "1154", "1225", "1306", "1400", "1402", "1407", "1418", "1425", "1428", "1471", "1479", "1540", "1554", "1569", "1611",
      "1653", "1658", "1679", "1693", "1708", "1732", "1739", "1755", "1757", "1771", "1773", "1774", "1788", "1802", "1832", "1835",
    ],
    imageResolution: "approximately 584–585 × 960 JPEG",
    usage: "Illustrative cross-check only; no graticule, projection, control points, or explicit reuse license.",
  },
  diaocthongthai: {
    sourceId: "diaocthongthai-atlas",
    mapCount: 67,
    coverage: "Văn Lang, Âu Lạc, Bắc thuộc, 905–1905, 1945, 1954, hiện đại",
    imageResolution: "approximately 500 × 823 JPEG",
    usage: "Timeline and visual cross-check only; appears to reuse the same illustrative series as KhoaHoc.tv.",
  },
};
const visualReferencesByPeriod = {
  "van-lang": [...sharedVisualReferences, "commons-van-lang-au-lac"],
  "au-lac": [...sharedVisualReferences, "commons-van-lang-au-lac"],
  "tinh-hai-quan": [...sharedVisualReferences, "khoahoc-45-maps", "commons-tinh-hai-ngo"],
  "ngo-quyen": [...sharedVisualReferences, "khoahoc-45-maps", "commons-tinh-hai-ngo"],
  "dai-co-viet": [...sharedVisualReferences, "khoahoc-45-maps"],
  "dai-viet-1069": [...sharedVisualReferences, "khoahoc-45-maps", "commons-ly"],
  "dai-viet-1306": [...sharedVisualReferences, "khoahoc-45-maps"],
  "minh-thuoc": [...sharedVisualReferences, "khoahoc-45-maps"],
  "hau-le-1428": [...sharedVisualReferences, "khoahoc-45-maps"],
  "le-thanh-tong-1471": [...sharedVisualReferences, "khoahoc-45-maps", "commons-le-thanh-tong"],
  "nam-bac-trieu": [...sharedVisualReferences, "khoahoc-45-maps"],
  "dang-trong-ngoai": [...sharedVisualReferences, "khoahoc-45-maps"],
  "tay-son": [...sharedVisualReferences, "khoahoc-45-maps"],
  "gia-long-1802": [...sharedVisualReferences, "khoahoc-45-maps"],
  "dai-nam-1835": [...sharedVisualReferences, "khoahoc-45-maps", "commons-nguyen-1838"],
};

const periodEvidence = {
  "van-lang": { precision: "schematic", reconstructionMethod: "archaeological-region", sourceIds: ["museum-hung-kings"] },
  "au-lac": { precision: "schematic", reconstructionMethod: "archaeological-region", sourceIds: ["museum-hung-kings"] },
  "dai-viet-1069": { precision: "regional-proxy", reconstructionMethod: "historical-map-image-trace", sourceIds: ["quang-binh-1069"] },
  "dai-viet-1306": { precision: "regional-proxy", reconstructionMethod: "historical-map-image-trace", sourceIds: ["museum-1306"] },
  "le-thanh-tong-1471": { precision: "regional-proxy", reconstructionMethod: "historical-map-image-trace", sourceIds: ["museum-1471"] },
  "dang-trong-ngoai": { precision: "regional-proxy", reconstructionMethod: "historical-map-image-trace", sourceIds: ["hcmc-1698", "museum-hoang-sa-bac-hai"] },
  "tay-son": { precision: "regional-proxy", reconstructionMethod: "historical-map-image-trace", sourceIds: ["museum-tay-son-islands"] },
  "gia-long-1802": { precision: "regional-proxy", reconstructionMethod: "historical-map-image-trace", sourceIds: ["archives-nguyen-islands"] },
  "dai-nam-1835": { precision: "regional-proxy", reconstructionMethod: "historical-map-image-trace", sourceIds: ["archives-nguyen-islands"] },
  "nam-ky-1867": { precision: "regional-proxy", reconstructionMethod: "historical-map-image-trace", sourceIds: ["archives-nguyen-islands"] },
  "phap-thuoc-1887": { precision: "regional-proxy", reconstructionMethod: "historical-map-image-trace", sourceIds: ["archives-french-hoang-sa", "mofa-islands-status"] },
  "doc-lap-1945": { precision: "regional-proxy", reconstructionMethod: "historical-map-image-trace", sourceIds: ["mofa-islands-status"] },
  "chia-cat-1954": { precision: "treaty-line-proxy", reconstructionMethod: "historical-map-image-trace", sourceIds: ["geneva-1954", "mofa-islands-status"] },
  "viet-nam-hien-dai": { precision: "modern-reference", reconstructionMethod: "modern-administrative-union", sourceIds: ["provinces-2025", "mofa-islands-status"] },
};

const defaultEvidence = {
  precision: "regional-proxy",
  reconstructionMethod: "historical-map-image-trace",
  sourceIds: ["museum-overview"],
};

const roundCoordinate = (value) => Number(value.toFixed(5));

const optimizeRing = (ring) => {
  const optimized = [];
  for (const point of ring) {
    const next = [roundCoordinate(point[0]), roundCoordinate(point[1])];
    const previous = optimized.at(-1);
    if (!previous || previous[0] !== next[0] || previous[1] !== next[1]) optimized.push(next);
  }
  if (optimized.length && (optimized[0][0] !== optimized.at(-1)[0] || optimized[0][1] !== optimized.at(-1)[1])) {
    optimized.push([...optimized[0]]);
  }
  return optimized;
};

const polygonMinimumLongitude = (polygon) => {
  let minimum = Infinity;
  for (const ring of polygon) for (const point of ring) minimum = Math.min(minimum, point[0]);
  return minimum;
};

const optimizeGeometry = (geometry, periodId) => {
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  const keepOffshoreGeometry = periodId === "viet-nam-hien-dai";
  const optimized = polygons
    // Remote archipelagoes are annotated by a separate point layer. Reusing their
    // modern administrative outlines in older eras would imply false precision.
    .filter((polygon) => keepOffshoreGeometry || polygonMinimumLongitude(polygon) <= 110)
    .map((polygon) => polygon.map(optimizeRing).filter((ring) => ring.length >= 4))
    .filter((polygon) => polygon.length);

  if (optimized.length === 1) return { type: "Polygon", coordinates: optimized[0] };
  return { type: "MultiPolygon", coordinates: optimized };
};

const legacy = JSON.parse(await readFile(legacySourcePath, "utf8"));
const traced = JSON.parse(await readFile(tracedSourcePath, "utf8"));
const canonical = {
  type: "FeatureCollection",
  features: [
    ...traced.features,
    ...legacy.features.filter((feature) => feature.properties.periodId === "viet-nam-hien-dai"),
  ],
};
const grouped = new Map();
for (const feature of canonical.features) {
  const periodId = feature.properties.periodId;
  if (!grouped.has(periodId)) grouped.set(periodId, []);
  const evidence = periodEvidence[periodId] ?? defaultEvidence;
  const sourceGeometry = feature.geometry;
  const referenceSourceIds = visualReferencesByPeriod[periodId] ?? sharedVisualReferences;
  const sourceIds = [...new Set([...evidence.sourceIds, feature.properties.geometrySourceId].filter(Boolean))];
  grouped.get(periodId).push({
    ...feature,
    properties: {
      ...feature.properties,
      ...(periodId === "au-lac" ? { confidence: "low" } : {}),
      precision: feature.properties.precision ?? evidence.precision,
      reconstructionMethod: feature.properties.reconstructionMethod ?? evidence.reconstructionMethod,
      sourceIds: sourceIds.join(","),
      referenceSourceIds: referenceSourceIds.join(","),
    },
    geometry: optimizeGeometry(sourceGeometry, periodId),
  });
}

await mkdir(outputDirectory, { recursive: true });
const manifest = {
  version: "2026-08-23.4",
  coordinateSystem: "WGS84",
  referenceCollections,
  sources: sourceCatalog,
  periods: {},
};
for (const [periodId, features] of grouped) {
  const collection = { type: "FeatureCollection", features };
  const json = `${JSON.stringify(collection)}\n`;
  await writeFile(join(outputDirectory, `${periodId}.geojson`), json);
  manifest.periods[periodId] = {
    path: `/data/historical-territories/${periodId}.geojson`,
    featureCount: features.length,
    bytes: Buffer.byteLength(json),
    ...(periodEvidence[periodId] ?? defaultEvidence),
    sourceIds: [...new Set(features.flatMap((feature) => feature.properties.sourceIds.split(",").filter(Boolean)))],
    geometryModel: features.some((feature) => feature.properties.geometrySourceId)
      ? "georeferenced-image-trace"
      : "modern-reference",
    geometrySourceIds: [...new Set(features.map((feature) => feature.properties.geometrySourceId).filter(Boolean))],
    geometrySources: [...new Map(features
      .filter((feature) => feature.properties.geometrySourceUrl)
      .map((feature) => [feature.properties.geometrySourceUrl, {
        sourceId: feature.properties.geometrySourceId,
        imageYear: feature.properties.imageYear,
        imageUrl: feature.properties.geometrySourceUrl,
        pageUrl: feature.properties.geometrySourcePageUrl,
        reconstructionMethod: feature.properties.reconstructionMethod,
        georeferenceAccuracyKm: feature.properties.georeferenceAccuracyKm,
      }])).values()],
    referenceSourceIds: visualReferencesByPeriod[periodId] ?? sharedVisualReferences,
  };
}
await writeFile(join(outputDirectory, "index.json"), `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Built ${grouped.size} historical GeoJSON slices in ${outputDirectory}`);
