import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const source = JSON.parse(await readFile(join(root, "source-data/historical-territories-image-traced.geojson"), "utf8"));
const directory = join(root, "public/data/historical-territories");
const manifest = JSON.parse(await readFile(join(directory, "index.json"), "utf8"));
const sourcePeriodIds = [...new Set(source.features.map((feature) => feature.properties.periodId))];

if (sourcePeriodIds.length !== 25) throw new Error(`Expected 25 image-traced periods, received ${sourcePeriodIds.length}`);
const expectedPeriodIds = [...sourcePeriodIds, "viet-nam-hien-dai"];
if (Object.keys(manifest.periods).length !== expectedPeriodIds.length) throw new Error("Manifest period count is stale");

const walkCoordinates = (value, visit) => {
  if (Array.isArray(value) && typeof value[0] === "number") return visit(value);
  if (Array.isArray(value)) value.forEach((child) => walkCoordinates(child, visit));
};

for (const periodId of expectedPeriodIds) {
  const entry = manifest.periods[periodId];
  if (!entry?.sourceIds?.length) throw new Error(`${periodId} has no provenance`);
  if (!entry?.referenceSourceIds?.length) throw new Error(`${periodId} has no visual references`);
  for (const sourceId of [...entry.sourceIds, ...entry.referenceSourceIds]) {
    if (!manifest.sources[sourceId]) throw new Error(`${periodId} references missing source ${sourceId}`);
  }
  if (periodId !== "viet-nam-hien-dai" && entry.geometryModel !== "georeferenced-image-trace") {
    throw new Error(`${periodId} does not use traced historical image geometry`);
  }
  if (periodId !== "viet-nam-hien-dai" && !entry.geometrySources?.length) {
    throw new Error(`${periodId} does not cite its traced source image`);
  }
  for (const geometrySource of entry.geometrySources ?? []) {
    if (!geometrySource.imageUrl?.startsWith("https://") || !geometrySource.pageUrl?.startsWith("https://")) {
      throw new Error(`${periodId} has an invalid source image citation`);
    }
    if (!geometrySource.imageYear || !geometrySource.sourceId) throw new Error(`${periodId} has incomplete image provenance`);
  }
  const collection = JSON.parse(await readFile(join(directory, `${periodId}.geojson`), "utf8"));
  if (!collection.features.length) throw new Error(`${periodId} has no features`);
  for (const feature of collection.features) {
    if (feature.properties.periodId !== periodId) throw new Error(`${periodId} contains a mismatched feature`);
    if (!feature.properties.precision || !feature.properties.reconstructionMethod || !feature.properties.sourceIds) {
      throw new Error(`${periodId} contains a feature without reconstruction metadata`);
    }
    if (periodId !== "viet-nam-hien-dai" && !feature.properties.geometrySourceId) {
      throw new Error(`${periodId} has no source image identifier`);
    }
    if (periodId !== "viet-nam-hien-dai" && (!feature.properties.geometrySourceUrl || !feature.properties.geometrySourcePageUrl)) {
      throw new Error(`${periodId} feature does not link to its source image and source page`);
    }
    walkCoordinates(feature.geometry.coordinates, ([longitude, latitude]) => {
      if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) throw new Error(`${periodId} has invalid coordinates`);
      if (longitude < 90 || longitude > 125 || latitude < 5 || latitude > 30) throw new Error(`${periodId} is outside the expected region`);
    });
    if (periodId !== "viet-nam-hien-dai") {
      const polygons = feature.geometry.type === "Polygon" ? [feature.geometry.coordinates] : feature.geometry.coordinates;
      for (const polygon of polygons) {
        let minimumLongitude = Infinity;
        walkCoordinates(polygon, ([longitude]) => { minimumLongitude = Math.min(minimumLongitude, longitude); });
        if (minimumLongitude > 110) throw new Error(`${periodId} unexpectedly reuses remote modern-island geometry`);
      }
    }
  }
}

const minimumLatitude = async (periodId) => {
  const collection = JSON.parse(await readFile(join(directory, `${periodId}.geojson`), "utf8"));
  let minimum = Infinity;
  walkCoordinates(collection.features.map((feature) => feature.geometry.coordinates), ([, latitude]) => {
    minimum = Math.min(minimum, latitude);
  });
  return minimum;
};

const expectedSouthernAnchors = {
  "van-lang": [16.7, 17.1],
  "dai-viet-1069": [16.4, 16.7],
  "dai-viet-1306": [15.3, 15.7],
  "le-thanh-tong-1471": [12.2, 12.7],
  "dang-trong-ngoai": [9.8, 10.1],
};
for (const [periodId, [minimum, maximum]] of Object.entries(expectedSouthernAnchors)) {
  const latitude = await minimumLatitude(periodId);
  if (latitude < minimum || latitude > maximum) throw new Error(`${periodId} southern image anchor drifted to ${latitude}`);
}

const expectedEasternAnchors = {
  "nam-viet": 110,
  "bac-thuoc-1": 110,
  "trung-vuong": 110,
  "bac-thuoc-2": 110,
  "bac-thuoc-3": 110,
};
for (const [periodId, minimumLongitude] of Object.entries(expectedEasternAnchors)) {
  const collection = JSON.parse(await readFile(join(directory, `${periodId}.geojson`), "utf8"));
  let maximumLongitude = -Infinity;
  walkCoordinates(collection.features.map((feature) => feature.geometry.coordinates), ([longitude]) => {
    maximumLongitude = Math.max(maximumLongitude, longitude);
  });
  if (maximumLongitude < minimumLongitude) throw new Error(`${periodId} eastern image boundary was truncated at ${maximumLongitude}`);
}

for (const periodId of ["bac-thuoc-1", "bac-thuoc-2", "bac-thuoc-3", "minh-thuoc", "phap-thuoc-1887"]) {
  const collection = JSON.parse(await readFile(join(directory, `${periodId}.geojson`), "utf8"));
  if (collection.features.some((feature) => feature.properties.control !== "autonomous")) {
    throw new Error(`${periodId} is not styled as dependent/occupied territory`);
  }
}
const namKy = JSON.parse(await readFile(join(directory, "nam-ky-1867.geojson"), "utf8"));
const colony = namKy.features.find((feature) => feature.properties.name === "Thuộc địa Nam Kỳ");
if (colony?.properties.control !== "autonomous") throw new Error("Colonial Cochinchina is not styled as occupied territory");

console.log(`Validated ${sourcePeriodIds.length} image-traced historical slices plus the official modern reference`);
