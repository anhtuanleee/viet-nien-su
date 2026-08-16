"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Vinext preview requires full-page navigation for these routes. */

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  CircleHelp,
  GitCompareArrows,
  History,
  Gauge,
  Eye,
  EyeOff,
  Layers3,
  MapPinned,
  Mountain,
  Pause,
  Play,
  Route,
  RotateCcw,
  Waves,
  X,
} from "lucide-react";
import type {
  FilterSpecification,
  Map as MapLibreMap,
  Marker,
  StyleSpecification,
} from "maplibre-gl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { historicalEvents } from "../data/events";
import type { HistoricalEventSummary as HistoricalEventInfo } from "../data/events";
import { periods, sourceLinks, territoryData } from "../data/historical";

const historicalContextLabels = (year: number) => {
  const sea = { name: "BIỂN ĐÔNG", coordinates: [112.0, 15.2] as [number, number] };
  if (year < 43) return [
    { name: "HÁN", coordinates: [108.5, 25.1] as [number, number] },
    { name: "ĐIỀN / DẠ LANG", coordinates: [101.0, 24.2] as [number, number] },
    sea,
  ];
  if (year < 905) return [
    { name: year < 602 ? "CÁC TRIỀU PHƯƠNG BẮC" : "ĐƯỜNG", coordinates: [108.5, 25.1] as [number, number] },
    { name: "LÂM ẤP / CHAMPA", coordinates: [109.4, 14.4] as [number, number] },
    { name: "CHÂN LẠP", coordinates: [102.4, 12.0] as [number, number] },
    sea,
  ];
  if (year < 1407) return [
    { name: year < 1225 ? "TỐNG" : "NGUYÊN / MINH", coordinates: [108.5, 25.1] as [number, number] },
    { name: "ĐẠI LÝ", coordinates: [101.1, 24.8] as [number, number] },
    { name: "CHAMPA", coordinates: [109.4, 13.4] as [number, number] },
    { name: "CHÂN LẠP", coordinates: [102.5, 11.8] as [number, number] },
    sea,
  ];
  if (year < 1802) return [
    { name: year < 1644 ? "MINH" : "THANH", coordinates: [108.5, 25.1] as [number, number] },
    { name: "LAN XANG", coordinates: [101.7, 18.0] as [number, number] },
    { name: "SIAM", coordinates: [99.7, 15.2] as [number, number] },
    { name: "CHÂN LẠP", coordinates: [102.6, 11.7] as [number, number] },
    sea,
  ];
  if (year < 1945) return [
    { name: "NHÀ THANH / TRUNG HOA", coordinates: [108.5, 25.1] as [number, number] },
    { name: "LÀO", coordinates: [102.1, 18.1] as [number, number] },
    { name: "SIAM", coordinates: [99.8, 15.2] as [number, number] },
    { name: "CAMPUCHIA", coordinates: [102.8, 11.8] as [number, number] },
    sea,
  ];
  return [
    { name: "TRUNG QUỐC", coordinates: [108.2, 25.1] as [number, number] },
    { name: "LÀO", coordinates: [102.2, 18.1] as [number, number] },
    { name: "THÁI LAN", coordinates: [100.0, 15.4] as [number, number] },
    { name: "CAMPUCHIA", coordinates: [103.0, 12.2] as [number, number] },
    sea,
  ];
};

type IslandInfo = {
  id: string;
  name: string;
  kind: "Đảo" | "Quần đảo";
  region: string;
  coordinates: [number, number];
};

const historicalEventData = {
  type: "FeatureCollection" as const,
  features: historicalEvents.map((event) => ({
    type: "Feature" as const,
    properties: { id: event.id, periodId: event.periodId },
    geometry: { type: "Point" as const, coordinates: event.coordinates },
  })),
};

const islands: IslandInfo[] = [
  { id: "cat-ba", name: "Cát Bà", kind: "Đảo", region: "Vịnh Bắc Bộ", coordinates: [107.05, 20.79] },
  { id: "co-to", name: "Cô Tô", kind: "Quần đảo", region: "Vịnh Bắc Bộ", coordinates: [107.77, 20.99] },
  { id: "bach-long-vi", name: "Bạch Long Vĩ", kind: "Đảo", region: "Vịnh Bắc Bộ", coordinates: [107.72, 20.13] },
  { id: "con-co", name: "Cồn Cỏ", kind: "Đảo", region: "Quảng Trị", coordinates: [107.34, 17.16] },
  { id: "hoang-sa", name: "Hoàng Sa", kind: "Quần đảo", region: "Biển Đông", coordinates: [112.0, 16.5] },
  { id: "ly-son", name: "Lý Sơn", kind: "Đảo", region: "Quảng Ngãi", coordinates: [109.12, 15.38] },
  { id: "cu-lao-cham", name: "Cù Lao Chàm", kind: "Quần đảo", region: "Đà Nẵng", coordinates: [108.52, 15.95] },
  { id: "phu-quy", name: "Phú Quý", kind: "Đảo", region: "Lâm Đồng", coordinates: [108.94, 10.52] },
  { id: "truong-sa", name: "Trường Sa", kind: "Quần đảo", region: "Biển Đông", coordinates: [114.0, 10.0] },
  { id: "con-dao", name: "Côn Đảo", kind: "Quần đảo", region: "TP. Hồ Chí Minh", coordinates: [106.61, 8.68] },
  { id: "phu-quoc", name: "Phú Quốc", kind: "Đảo", region: "An Giang", coordinates: [103.96, 10.22] },
  { id: "tho-chau", name: "Thổ Châu", kind: "Quần đảo", region: "An Giang", coordinates: [103.48, 9.3] },
];

const islandData = {
  type: "FeatureCollection" as const,
  features: islands.map((island) => ({
    type: "Feature" as const,
    properties: {
      id: island.id,
      name: island.name,
      kind: island.kind,
      region: island.region,
    },
    geometry: { type: "Point" as const, coordinates: island.coordinates },
  })),
};

const baseStyle: StyleSpecification = {
  version: 8,
  sources: {},
  layers: [
    {
      id: "ocean",
      type: "background",
      paint: { "background-color": "#0d1415" },
    },
  ],
};

const periodFilter = (periodId: string): FilterSpecification => [
  "==",
  ["get", "periodId"],
  periodId,
];

const emptyProvinceFilter: FilterSpecification = ["==", ["get", "code"], ""];
const emptyIslandFilter: FilterSpecification = ["==", ["get", "id"], ""];
const emptyHistoricalEventFilter: FilterSpecification = ["==", ["get", "id"], ""];

type ProvinceInfo = {
  code: string;
  name: string;
  fullName: string;
  areaKm2: number;
};

type TerritoryInfo = {
  name: string;
  periodId: string;
  control: "direct" | "autonomous" | "influence";
  confidence: "high" | "medium" | "low";
};

type PolygonGeometry = {
  type: "Polygon";
  coordinates: number[][][];
};

type MultiPolygonGeometry = {
  type: "MultiPolygon";
  coordinates: number[][][][];
};

type HistoricalGeoFeature = {
  type: "Feature";
  properties: {
    periodId: string;
    name: string;
    control: "direct" | "autonomous" | "influence";
    confidence: "high" | "medium" | "low";
    color: string;
  };
  geometry: PolygonGeometry | MultiPolygonGeometry;
};

type ProvinceGeoFeature = {
  type: "Feature";
  properties: ProvinceInfo;
  geometry: PolygonGeometry | MultiPolygonGeometry;
};

const provinceInfoFromProperties = (properties?: Record<string, unknown>): ProvinceInfo | null => {
  if (!properties) return null;
  return {
    code: String(properties.code ?? ""),
    name: String(properties.name ?? ""),
    fullName: String(properties.fullName ?? properties.name ?? ""),
    areaKm2: Number(properties.areaKm2 ?? 0),
  };
};

const territoryInfoFromProperties = (properties?: Record<string, unknown>): TerritoryInfo | null => {
  if (!properties) return null;
  const control = String(properties.control);
  const confidence = String(properties.confidence);
  if (!["direct", "autonomous", "influence"].includes(control)) return null;
  if (!["high", "medium", "low"].includes(confidence)) return null;
  return {
    name: String(properties.name ?? "Vùng chưa định danh"),
    periodId: String(properties.periodId ?? ""),
    control: control as TerritoryInfo["control"],
    confidence: confidence as TerritoryInfo["confidence"],
  };
};

const controlLabel = (control: TerritoryInfo["control"]) =>
  control === "direct"
    ? "Kiểm soát trực tiếp"
    : control === "autonomous"
      ? "Tự trị / phụ thuộc"
      : "Ảnh hưởng / hành chính ngắn hạn";

const confidenceLabel = (confidence: TerritoryInfo["confidence"]) =>
  confidence === "high" ? "Cao" : confidence === "medium" ? "Trung bình" : "Thấp";

const pointInRing = ([lng, lat]: [number, number], ring: number[][]) => {
  let inside = false;
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index, index += 1) {
    const [currentLng, currentLat] = ring[index];
    const [previousLng, previousLat] = ring[previous];
    const intersects = currentLat > lat !== previousLat > lat
      && lng < ((previousLng - currentLng) * (lat - currentLat)) / (previousLat - currentLat || 1e-9) + currentLng;
    if (intersects) inside = !inside;
  }
  return inside;
};

const pointInGeometry = (point: [number, number], geometry: PolygonGeometry | MultiPolygonGeometry) => {
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  return polygons.some((rings) => pointInRing(point, rings[0]) && !rings.slice(1).some((ring) => pointInRing(point, ring)));
};

const geometryReferencePoint = (geometry: PolygonGeometry | MultiPolygonGeometry): [number, number] => {
  const polygon = geometry.type === "Polygon" ? geometry.coordinates : geometry.coordinates[0];
  const outerRing = polygon[0];
  const total = outerRing.reduce(
    (sum, [lng, lat]) => [sum[0] + lng, sum[1] + lat] as [number, number],
    [0, 0] as [number, number],
  );
  return [total[0] / outerRing.length, total[1] / outerRing.length];
};

const fallbackPath = (geometry: PolygonGeometry | MultiPolygonGeometry) => {
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  return polygons
    .flatMap((polygonRings) =>
      polygonRings.map((ring) =>
        `${ring
          .map(([lng, lat], index) =>
            `${index === 0 ? "M" : "L"}${((lng - 98) / 16) * 1000} ${((27 - lat) / 20) * 760}`,
          )
          .join(" ")} Z`,
      ),
    )
    .join(" ");
};

const initialPeriodIndex = Math.max(
  0,
  periods.findIndex((period) => period.id === "dang-trong-ngoai"),
);
const timelineStep = 92;
const defaultCompareIndex = Math.max(
  0,
  periods.findIndex((period) => period.id === "dai-viet-1306"),
);

type EventFilter = "all" | "independence" | "expansion" | "division" | "occupation" | "modern";
type DepthPreset = "standard" | "deep" | "cinematic";
type RenderQuality = "low" | "medium" | "high";
type QualityMode = "auto" | RenderQuality;

type DeviceNavigator = Navigator & {
  deviceMemory?: number;
  connection?: EventTarget & {
    effectiveType?: string;
    saveData?: boolean;
  };
};

const renderQualities: Array<{
  id: RenderQuality;
  label: string;
  note: string;
  maxPixelRatio: number;
  effectScale: number;
}> = [
  { id: "low", label: "Low", note: "Tiết kiệm", maxPixelRatio: 1, effectScale: 0.55 },
  { id: "medium", label: "Medium", note: "Cân bằng", maxPixelRatio: 1.5, effectScale: 0.78 },
  { id: "high", label: "High", note: "Sắc nét", maxPixelRatio: 2, effectScale: 1 },
];

const detectDeviceRenderQuality = (): RenderQuality => {
  if (typeof window === "undefined") return "medium";
  const deviceNavigator = window.navigator as DeviceNavigator;
  const cores = deviceNavigator.hardwareConcurrency || 0;
  const memory = deviceNavigator.deviceMemory || 0;
  const connection = deviceNavigator.connection;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pixelLoad = window.innerWidth * window.innerHeight * Math.min(window.devicePixelRatio || 1, 3) ** 2;
  let score = 2;

  if (cores >= 8) score += 2;
  else if (cores >= 6) score += 1;
  else if (cores && cores <= 2) score -= 2;
  else if (cores && cores <= 4) score -= 1;

  if (memory >= 8) score += 2;
  else if (memory >= 6) score += 1;
  else if (memory && memory <= 2) score -= 2;
  else if (memory && memory <= 4) score -= 1;

  if (window.innerWidth <= 900) score -= 1;
  if ((window.devicePixelRatio || 1) >= 3 || pixelLoad > 7_000_000) score -= 1;
  if (reducedMotion) score -= 1;
  if (connection?.saveData) score -= 3;
  if (connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g") score -= 2;

  if (score <= 0) return "low";
  if (score <= 3) return "medium";
  return "high";
};

const depthPresets: Array<{
  id: DepthPreset;
  label: string;
  terrain: number;
  extrusion: number;
  pitch: number;
}> = [
  { id: "standard", label: "Chuẩn", terrain: 1.15, extrusion: 1, pitch: 52 },
  { id: "deep", label: "Nổi sâu", terrain: 1.65, extrusion: 1.55, pitch: 62 },
  { id: "cinematic", label: "Điện ảnh", terrain: 2.05, extrusion: 2.05, pitch: 68 },
];

const eventFilters: Array<{ id: EventFilter; label: string }> = [
  { id: "all", label: "Tất cả" },
  { id: "independence", label: "Tự chủ" },
  { id: "expansion", label: "Mở cõi" },
  { id: "division", label: "Chia cắt" },
  { id: "occupation", label: "Ngoại thuộc" },
  { id: "modern", label: "Hiện đại" },
];

const periodCategories: Record<string, Exclude<EventFilter, "all">> = {
  "van-lang": "independence", "au-lac": "independence", "nam-viet": "independence",
  "bac-thuoc-1": "occupation", "trung-vuong": "independence", "bac-thuoc-2": "occupation",
  "van-xuan": "independence", "bac-thuoc-3": "occupation", "tinh-hai-quan": "independence",
  "ngo-quyen": "independence", "dai-co-viet": "independence", "dai-viet-1069": "expansion",
  "dai-viet-1306": "expansion", "minh-thuoc": "occupation", "hau-le-1428": "independence",
  "le-thanh-tong-1471": "expansion", "nam-bac-trieu": "division", "dang-trong-ngoai": "division",
  "tay-son": "independence", "gia-long-1802": "independence", "dai-nam-1835": "expansion",
  "nam-ky-1867": "division", "phap-thuoc-1887": "occupation", "doc-lap-1945": "modern",
  "chia-cat-1954": "division", "viet-nam-hien-dai": "modern",
};

const ringArea = (ring: number[][]) => {
  let area = 0;
  for (let index = 0; index < ring.length - 1; index += 1) {
    const [lngA, latA] = ring[index];
    const [lngB, latB] = ring[index + 1];
    area += lngA * latB - lngB * latA;
  }
  return Math.abs(area / 2);
};

const geometryArea = (geometry: PolygonGeometry | MultiPolygonGeometry) => {
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  return polygons.reduce(
    (total, polygonRings) =>
      total + polygonRings.reduce(
        (polygonArea, ring, ringIndex) => polygonArea + ringArea(ring) * (ringIndex === 0 ? 1 : -1),
        0,
      ),
    0,
  );
};

export default function HistoricalAtlas({ initialPeriodId }: { initialPeriodId?: string } = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineViewportRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markerRefs = useRef<Marker[]>([]);
  const neighborMarkerRefs = useRef<Marker[]>([]);
  const playTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cinematicTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeIndex, setActiveIndex] = useState(() => {
    const requestedIndex = initialPeriodId
      ? periods.findIndex((period) => period.id === initialPeriodId)
      : -1;
    return requestedIndex >= 0 ? requestedIndex : initialPeriodIndex;
  });
  const [eventFilter, setEventFilter] = useState<EventFilter>("all");
  const [storyModeEnabled, setStoryModeEnabled] = useState(false);
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [compareIndex, setCompareIndex] = useState(defaultCompareIndex);
  const [mapReady, setMapReady] = useState(false);
  const [webglUnavailable, setWebglUnavailable] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [terrainEnabled, setTerrainEnabled] = useState(true);
  const [sharp3dEnabled, setSharp3dEnabled] = useState(false);
  const [depthPreset, setDepthPreset] = useState<DepthPreset>("standard");
  const [qualityMode, setQualityMode] = useState<QualityMode>("auto");
  const [renderQuality, setRenderQuality] = useState<RenderQuality>("medium");
  const [qualityPreferenceLoaded, setQualityPreferenceLoaded] = useState(false);
  const [cinematic3dEnabled, setCinematic3dEnabled] = useState(false);
  const [contextEnabled, setContextEnabled] = useState(true);
  const [provincesEnabled, setProvincesEnabled] = useState(true);
  const [islandsEnabled, setIslandsEnabled] = useState(true);
  const [historicalEventsEnabled, setHistoricalEventsEnabled] = useState(true);
  const [uncertaintyEnabled, setUncertaintyEnabled] = useState(true);
  const [hoveredProvince, setHoveredProvince] = useState<ProvinceInfo | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceInfo | null>(null);
  const [provinceHistoryOpen, setProvinceHistoryOpen] = useState(false);
  const [hoveredTerritory, setHoveredTerritory] = useState<TerritoryInfo | null>(null);
  const [hoveredIsland, setHoveredIsland] = useState<IslandInfo | null>(null);
  const [selectedIsland, setSelectedIsland] = useState<IslandInfo | null>(null);
  const [hoveredHistoricalEvent, setHoveredHistoricalEvent] = useState<HistoricalEventInfo | null>(null);
  const [selectedHistoricalEvent, setSelectedHistoricalEvent] = useState<HistoricalEventInfo | null>(null);
  const [fallbackHistoricalData, setFallbackHistoricalData] = useState<HistoricalGeoFeature[]>([]);
  const [fallbackProvinceData, setFallbackProvinceData] = useState<ProvinceGeoFeature[]>([]);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [uiHidden, setUiHidden] = useState(false);
  const [storyPanelOpen, setStoryPanelOpen] = useState(true);
  const [legendOpen, setLegendOpen] = useState(false);

  const activePeriod = periods[activeIndex];
  const comparePeriod = periods[compareIndex];
  const activeDepthPreset = depthPresets.find((preset) => preset.id === depthPreset) ?? depthPresets[0];
  const activeRenderQuality = renderQualities.find((quality) => quality.id === renderQuality) ?? renderQualities[2];
  const mapPitch = terrainEnabled
    ? sharp3dEnabled ? activeDepthPreset.pitch : 52
    : 0;
  const historicalFeatures = useMemo(
    () => fallbackHistoricalData.length
      ? fallbackHistoricalData
      : (territoryData.features as HistoricalGeoFeature[]),
    [fallbackHistoricalData],
  );
  const activeFallbackFeatures = useMemo(() => {
    return historicalFeatures.filter((item) => item.properties.periodId === activePeriod.id);
  }, [activePeriod.id, historicalFeatures]);
  const compareFallbackFeatures = useMemo(
    () => historicalFeatures.filter((item) => item.properties.periodId === comparePeriod.id),
    [comparePeriod.id, historicalFeatures],
  );
  const comparisonStatus = useMemo(() => {
    if (activePeriod.id === comparePeriod.id) return "Hai mốc đang trùng nhau";
    const directArea = (periodId: string) => historicalFeatures
      .filter((feature) => feature.properties.periodId === periodId && feature.properties.control === "direct")
      .reduce((total, feature) => total + geometryArea(feature.geometry), 0);
    const activeArea = directArea(activePeriod.id);
    const referenceArea = directArea(comparePeriod.id);
    if (!activeArea || !referenceArea) return "Chưa đủ dữ liệu so sánh";
    const ratio = activeArea / referenceArea;
    if (ratio > 1.04) return "Phạm vi kiểm soát mở rộng";
    if (ratio < 0.96) return "Phạm vi kiểm soát thu hẹp";
    return "Phạm vi kiểm soát tương đương";
  }, [activePeriod.id, comparePeriod.id, historicalFeatures]);
  const timelineWidth = periods.length * timelineStep;
  const progress = activeIndex * timelineStep + timelineStep / 2;
  const visiblePeriodIndexes = useMemo(
    () => periods
      .map((period, index) => ({ period, index }))
      .filter(({ period }) => eventFilter === "all" || periodCategories[period.id] === eventFilter)
      .map(({ index }) => index),
    [eventFilter],
  );
  const activeHistoricalEvents = useMemo(
    () => historicalEvents.filter((event) => event.periodId === activePeriod.id),
    [activePeriod.id],
  );
  const provinceHistory = useMemo(() => {
    if (!selectedProvince) return [];
    const provinceFeature = fallbackProvinceData.find(
      (feature) => feature.properties.code === selectedProvince.code,
    );
    if (!provinceFeature) return [];
    const referencePoint = geometryReferencePoint(provinceFeature.geometry);
    return periods.filter((period) => historicalFeatures.some(
      (feature) => feature.properties.periodId === period.id
        && feature.properties.control === "direct"
        && pointInGeometry(referencePoint, feature.geometry),
    ));
  }, [fallbackProvinceData, historicalFeatures, selectedProvince]);

  const selectPeriod = useCallback((index: number) => {
    const next = Math.max(0, Math.min(periods.length - 1, index));
    setHoveredHistoricalEvent(null);
    setSelectedHistoricalEvent(null);
    setActiveIndex(next);
  }, []);

  const movePeriod = useCallback((direction: -1 | 1) => {
    const currentPosition = visiblePeriodIndexes.indexOf(activeIndex);
    const nextPosition = currentPosition === -1
      ? direction > 0 ? 0 : visiblePeriodIndexes.length - 1
      : Math.max(0, Math.min(visiblePeriodIndexes.length - 1, currentPosition + direction));
    selectPeriod(visiblePeriodIndexes[nextPosition] ?? activeIndex);
  }, [activeIndex, selectPeriod, visiblePeriodIndexes]);

  const applyEventFilter = (nextFilter: EventFilter) => {
    setEventFilter(nextFilter);
    const nextIndexes = periods
      .map((period, index) => ({ period, index }))
      .filter(({ period }) => nextFilter === "all" || periodCategories[period.id] === nextFilter)
      .map(({ index }) => index);
    if (!nextIndexes.includes(activeIndex)) selectPeriod(nextIndexes[0] ?? activeIndex);
  };

  const toggleStoryMode = () => {
    if (storyModeEnabled) {
      setStoryModeEnabled(false);
      setIsPlaying(false);
      return;
    }
    setCompareEnabled(false);
    setEventFilter("all");
    setActiveIndex(0);
    setStoryModeEnabled(true);
    setIsPlaying(true);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedQuality = window.localStorage.getItem("dong-coi-viet-render-quality");
      const savedMode: QualityMode = savedQuality === "low" || savedQuality === "medium" || savedQuality === "high"
        ? savedQuality
        : "auto";
      setQualityMode(savedMode);
      setRenderQuality(savedMode === "auto" ? detectDeviceRenderQuality() : savedMode);
      setQualityPreferenceLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!qualityPreferenceLoaded) return;
    window.localStorage.setItem("dong-coi-viet-render-quality", qualityMode);
  }, [qualityMode, qualityPreferenceLoaded]);

  useEffect(() => {
    if (!qualityPreferenceLoaded || qualityMode !== "auto") return;
    const connection = (window.navigator as DeviceNavigator).connection;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer = 0;
    const updateQuality = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setRenderQuality(detectDeviceRenderQuality()), 180);
    };

    window.addEventListener("resize", updateQuality);
    window.addEventListener("orientationchange", updateQuality);
    connection?.addEventListener("change", updateQuality);
    reducedMotion.addEventListener("change", updateQuality);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", updateQuality);
      window.removeEventListener("orientationchange", updateQuality);
      connection?.removeEventListener("change", updateQuality);
      reducedMotion.removeEventListener("change", updateQuality);
    };
  }, [qualityMode, qualityPreferenceLoaded]);

  useEffect(() => {
    const activeNode = timelineViewportRef.current?.querySelector('[data-active="true"]');
    if (activeNode instanceof HTMLElement) {
      activeNode.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeIndex]);

  useEffect(() => {
    let cancelled = false;
    void Promise.all([
      fetch("/data/vietnam-historical-territories.geojson").then((response) => response.json()),
      fetch("/data/vietnam-provinces-2025.geojson").then((response) => response.json()),
    ]).then(([historical, provinces]) => {
      if (cancelled) return;
      setFallbackHistoricalData((historical as { features: HistoricalGeoFeature[] }).features);
      setFallbackProvinceData((provinces as { features: ProvinceGeoFeature[] }).features);
    }).catch(() => {
      // The embedded simplified polygons remain available when static data cannot load.
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    void import("maplibre-gl").then((maplibregl) => {
      if (cancelled || !containerRef.current) return;

      const savedQuality = window.localStorage.getItem("dong-coi-viet-render-quality");
      const initialQualityId: RenderQuality = savedQuality === "low" || savedQuality === "medium" || savedQuality === "high"
        ? savedQuality
        : detectDeviceRenderQuality();
      const initialQuality = renderQualities.find((quality) => quality.id === initialQualityId) ?? renderQualities[1];
      let map: MapLibreMap;
      try {
        map = new maplibregl.Map({
        container: containerRef.current,
        style: baseStyle,
        center: periods[initialPeriodIndex].center,
        zoom: periods[initialPeriodIndex].zoom,
        pitch: 52,
        bearing: -8,
        minZoom: 3,
        maxZoom: 8,
        maxPitch: 68,
        attributionControl: false,
        antialias: true,
        pixelRatio: Math.min(window.devicePixelRatio || 1, initialQuality.maxPixelRatio),
        });
      } catch {
        setWebglUnavailable(true);
        setMapReady(true);
        return;
      }

      mapRef.current = map;
      map.addControl(
        new maplibregl.NavigationControl({ visualizePitch: true, showCompass: true }),
        "top-right",
      );
      map.addControl(
        new maplibregl.AttributionControl({
          compact: true,
          customAttribution: "Nền: MapLibre Demo Tiles · Dữ liệu phục dựng minh họa",
        }),
        "bottom-left",
      );

      map.on("load", () => {
        map.addSource("historical-territories", {
          type: "geojson",
          data: "/data/vietnam-historical-territories.geojson",
        });

        map.addSource("modern-provinces", {
          type: "geojson",
          data: "/data/vietnam-provinces-2025.geojson",
          promoteId: "code",
        });

        map.addSource("island-points", {
          type: "geojson",
          data: islandData,
        });

        map.addSource("historical-events", {
          type: "geojson",
          data: historicalEventData,
        });

        map.addLayer({
          id: "territory-glow",
          type: "line",
          source: "historical-territories",
          filter: periodFilter(periods[initialPeriodIndex].id),
          paint: {
            "line-color": ["get", "color"],
            "line-width": 10,
            "line-blur": 9,
            "line-opacity": 0.34,
          },
        });

        map.addLayer(
          {
            id: "compare-volume",
            type: "fill-extrusion",
            source: "historical-territories",
            filter: periodFilter(periods[defaultCompareIndex].id),
            layout: { visibility: "none" },
            paint: {
              "fill-extrusion-color": "#3a9392",
              "fill-extrusion-height": ["*", ["get", "height"], 0.72],
              "fill-extrusion-base": 120,
              "fill-extrusion-opacity": 0.44,
              "fill-extrusion-vertical-gradient": true,
            },
          },
          "territory-glow",
        );

        map.addLayer(
          {
            id: "compare-outline",
            type: "line",
            source: "historical-territories",
            filter: periodFilter(periods[defaultCompareIndex].id),
            layout: { visibility: "none" },
            paint: {
              "line-color": "#8ed5d1",
              "line-width": 2.4,
              "line-dasharray": [2, 1.4],
              "line-opacity": 0.92,
            },
          },
          "territory-glow",
        );

        map.addLayer({
          id: "territory-influence",
          type: "fill-extrusion",
          source: "historical-territories",
          filter: [
            "all",
            periodFilter(periods[initialPeriodIndex].id),
            ["==", ["get", "control"], "influence"],
          ],
          paint: {
            "fill-extrusion-color": ["get", "color"],
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": 250,
            "fill-extrusion-opacity": 0.34,
            "fill-extrusion-vertical-gradient": true,
          },
        });

        map.addLayer({
          id: "territory-autonomous",
          type: "fill-extrusion",
          source: "historical-territories",
          filter: [
            "all",
            periodFilter(periods[initialPeriodIndex].id),
            ["==", ["get", "control"], "autonomous"],
          ],
          paint: {
            "fill-extrusion-color": ["get", "color"],
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": 250,
            "fill-extrusion-opacity": 0.58,
            "fill-extrusion-vertical-gradient": true,
          },
        });

        map.addLayer({
          id: "territory-volume",
          type: "fill-extrusion",
          source: "historical-territories",
          filter: [
            "all",
            periodFilter(periods[initialPeriodIndex].id),
            ["==", ["get", "control"], "direct"],
          ],
          paint: {
            "fill-extrusion-color": ["get", "color"],
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": 250,
            "fill-extrusion-opacity": 0.84,
            "fill-extrusion-vertical-gradient": true,
          },
        });

        map.addLayer({
          id: "territory-outline",
          type: "line",
          source: "historical-territories",
          filter: periodFilter(periods[initialPeriodIndex].id),
          paint: {
            "line-color": "#f8e7bd",
            "line-width": 1.4,
            "line-opacity": 0.82,
          },
        });

        map.addLayer({
          id: "province-reference-fill",
          type: "fill",
          source: "modern-provinces",
          paint: {
            "fill-color": "#d7a75a",
            "fill-opacity": 0.055,
          },
        });

        map.addLayer({
          id: "province-boundaries",
          type: "line",
          source: "modern-provinces",
          paint: {
            "line-color": "#f4dfb3",
            "line-width": ["interpolate", ["linear"], ["zoom"], 3, 0.35, 6, 1.15],
            "line-opacity": 0.72,
          },
        });

        map.addLayer({
          id: "province-hit-area",
          type: "fill-extrusion",
          source: "modern-provinces",
          paint: {
            "fill-extrusion-color": "#d7a75a",
            "fill-extrusion-base": 15050,
            "fill-extrusion-height": 15100,
            "fill-extrusion-opacity": 0.01,
            "fill-extrusion-vertical-gradient": false,
          },
        });

        map.addLayer({
          id: "province-hover",
          type: "fill-extrusion",
          source: "modern-provinces",
          filter: emptyProvinceFilter,
          paint: {
            "fill-extrusion-color": "#f0c66f",
            "fill-extrusion-base": 15100,
            "fill-extrusion-height": 19000,
            "fill-extrusion-opacity": 0.62,
            "fill-extrusion-vertical-gradient": true,
          },
        });

        map.addLayer({
          id: "province-selected",
          type: "fill-extrusion",
          source: "modern-provinces",
          filter: emptyProvinceFilter,
          paint: {
            "fill-extrusion-color": "#f1e2bd",
            "fill-extrusion-base": 15100,
            "fill-extrusion-height": 22500,
            "fill-extrusion-opacity": 0.9,
            "fill-extrusion-vertical-gradient": true,
          },
        });

        map.addLayer({
          id: "province-hover-outline",
          type: "line",
          source: "modern-provinces",
          filter: emptyProvinceFilter,
          paint: {
            "line-color": "#f4d99d",
            "line-width": ["interpolate", ["linear"], ["zoom"], 3, 1.3, 6, 2.2],
            "line-opacity": 0.96,
            "line-blur": 0.15,
          },
        });

        map.addLayer({
          id: "province-selected-outline",
          type: "line",
          source: "modern-provinces",
          filter: emptyProvinceFilter,
          paint: {
            "line-color": "#fff0c9",
            "line-width": ["interpolate", ["linear"], ["zoom"], 3, 1.8, 6, 3],
            "line-opacity": 1,
          },
        });

        map.addLayer({
          id: "island-points",
          type: "circle",
          source: "island-points",
          paint: {
            "circle-radius": 4.5,
            "circle-color": "#d7a75a",
            "circle-stroke-color": "#fff0c9",
            "circle-stroke-width": 1.3,
            "circle-opacity": 0.92,
          },
        });

        map.addLayer({
          id: "island-hit-area",
          type: "circle",
          source: "island-points",
          paint: {
            "circle-radius": 14,
            "circle-color": "#d7a75a",
            "circle-opacity": 0.01,
          },
        });

        map.addLayer({
          id: "island-hover",
          type: "circle",
          source: "island-points",
          filter: emptyIslandFilter,
          paint: {
            "circle-radius": 10,
            "circle-color": "#f1e2bd",
            "circle-blur": 0.15,
            "circle-stroke-color": "#d75a3a",
            "circle-stroke-width": 3,
          },
        });

        map.addLayer({
          id: "island-selected",
          type: "circle",
          source: "island-points",
          filter: emptyIslandFilter,
          paint: {
            "circle-radius": 12,
            "circle-color": "#fff2cf",
            "circle-stroke-color": "#d75a3a",
            "circle-stroke-width": 4,
          },
        });

        map.addLayer({
          id: "historical-events",
          type: "circle",
          source: "historical-events",
          filter: periodFilter(periods[initialPeriodIndex].id),
          paint: {
            "circle-radius": 6,
            "circle-color": "#c84b36",
            "circle-stroke-color": "#fff0c9",
            "circle-stroke-width": 1.5,
            "circle-opacity": 0.94,
          },
        });

        map.addLayer({
          id: "historical-events-hit",
          type: "circle",
          source: "historical-events",
          filter: periodFilter(periods[initialPeriodIndex].id),
          paint: { "circle-radius": 16, "circle-color": "#c84b36", "circle-opacity": 0.01 },
        });

        map.addLayer({
          id: "historical-events-hover",
          type: "circle",
          source: "historical-events",
          filter: emptyHistoricalEventFilter,
          paint: {
            "circle-radius": 12,
            "circle-color": "#f0c66f",
            "circle-blur": 0.18,
            "circle-stroke-color": "#c84b36",
            "circle-stroke-width": 3,
          },
        });

        map.addLayer({
          id: "historical-events-selected",
          type: "circle",
          source: "historical-events",
          filter: emptyHistoricalEventFilter,
          paint: {
            "circle-radius": 13,
            "circle-color": "#fff2cf",
            "circle-stroke-color": "#c84b36",
            "circle-stroke-width": 4,
          },
        });

        map.addSource("world", {
          type: "vector",
          url: "https://demotiles.maplibre.org/tiles/tiles.json",
        });
        map.addLayer(
          {
            id: "countries-fill",
            type: "fill",
            source: "world",
            "source-layer": "countries",
            paint: {
              "fill-color": "#1d2725",
              "fill-opacity": 0.92,
            },
          },
          "territory-glow",
        );
        map.addLayer(
          {
            id: "coastline",
            type: "line",
            source: "world",
            "source-layer": "countries",
            paint: {
              "line-color": "rgba(216, 195, 151, .32)",
              "line-width": 0.8,
            },
          },
          "territory-glow",
        );

        map.addSource("relief", {
          type: "raster-dem",
          url: "https://demotiles.maplibre.org/terrain-tiles/tiles.json",
          tileSize: 256,
        });
        map.addLayer(
          {
            id: "relief-shade",
            type: "hillshade",
            source: "relief",
            paint: {
              "hillshade-shadow-color": "#07100e",
              "hillshade-highlight-color": "#6b725e",
              "hillshade-accent-color": "#202e29",
              "hillshade-exaggeration": 0.36,
            },
          },
          "territory-glow",
        );
        map.setTerrain({ source: "relief", exaggeration: 1.15 });

        map.addLayer({
          id: "uncertain-outline",
          type: "line",
          source: "historical-territories",
          filter: [
            "all",
            periodFilter(periods[initialPeriodIndex].id),
            ["==", ["get", "confidence"], "low"],
          ],
          paint: {
            "line-color": "#fff2cf",
            "line-width": 2.2,
            "line-dasharray": [1.2, 1.8],
            "line-opacity": 0.9,
          },
        });

        ["territory-volume", "territory-autonomous", "territory-influence", "compare-volume"].forEach((layer) => {
          map.on("mousemove", layer, (event) => {
            map.getCanvas().style.cursor = "pointer";
            const territory = event.features?.[0]
              ? territoryInfoFromProperties(event.features[0].properties)
              : null;
            setHoveredTerritory(territory);
          });
          map.on("mouseleave", layer, () => {
            map.getCanvas().style.cursor = "grab";
            setHoveredTerritory(null);
          });
        });
        map.on("click", "territory-volume", (event) => {
          const selected = event.features?.[0];
          if (!selected?.properties) return;
          const territory = territoryInfoFromProperties(selected.properties);
          if (!territory) return;
          new maplibregl.Popup({ closeButton: false, offset: 18 })
            .setLngLat(event.lngLat)
            .setHTML(`<strong>${territory.name}</strong><span>${controlLabel(territory.control)} · Độ chắc chắn ${confidenceLabel(territory.confidence).toLowerCase()}</span>`)
            .addTo(map);
        });

        let hoveredProvinceCode = "";
        map.on("mousemove", "province-hit-area", (event) => {
          const province = event.features?.[0]
            ? provinceInfoFromProperties(event.features[0].properties)
            : null;
          if (!province || province.code === hoveredProvinceCode) return;
          hoveredProvinceCode = province.code;
          map.getCanvas().style.cursor = "pointer";
          map.setFilter("province-hover", ["==", ["get", "code"], province.code]);
          map.setFilter("province-hover-outline", ["==", ["get", "code"], province.code]);
          setHoveredProvince(province);
        });

        map.on("mouseleave", "province-hit-area", () => {
          hoveredProvinceCode = "";
          map.getCanvas().style.cursor = "grab";
          map.setFilter("province-hover", emptyProvinceFilter);
          map.setFilter("province-hover-outline", emptyProvinceFilter);
          setHoveredProvince(null);
        });

        map.on("click", "province-hit-area", (event) => {
          const province = event.features?.[0]
            ? provinceInfoFromProperties(event.features[0].properties)
            : null;
          if (!province) return;
          setSelectedProvince(province);
          setProvinceHistoryOpen(false);
          map.setFilter("province-selected", ["==", ["get", "code"], province.code]);
          map.setFilter("province-selected-outline", ["==", ["get", "code"], province.code]);
        });

        let hoveredHistoricalEventId = "";
        map.on("mousemove", "historical-events-hit", (event) => {
          const eventId = String(event.features?.[0]?.properties?.id ?? "");
          if (!eventId || eventId === hoveredHistoricalEventId) return;
          const historicalEvent = historicalEvents.find((item) => item.id === eventId);
          if (!historicalEvent) return;
          hoveredHistoricalEventId = eventId;
          map.getCanvas().style.cursor = "pointer";
          map.setFilter("historical-events-hover", ["==", ["get", "id"], eventId]);
          setHoveredHistoricalEvent(historicalEvent);
        });

        map.on("mouseleave", "historical-events-hit", () => {
          hoveredHistoricalEventId = "";
          map.getCanvas().style.cursor = "grab";
          map.setFilter("historical-events-hover", emptyHistoricalEventFilter);
          setHoveredHistoricalEvent(null);
        });

        map.on("click", "historical-events-hit", (event) => {
          const eventId = String(event.features?.[0]?.properties?.id ?? "");
          const historicalEvent = historicalEvents.find((item) => item.id === eventId);
          if (!historicalEvent) return;
          setSelectedHistoricalEvent(historicalEvent);
          map.setFilter("historical-events-selected", ["==", ["get", "id"], eventId]);
        });

        let hoveredIslandId = "";
        map.on("mousemove", "island-hit-area", (event) => {
          const islandId = String(event.features?.[0]?.properties?.id ?? "");
          if (!islandId || islandId === hoveredIslandId) return;
          const island = islands.find((item) => item.id === islandId);
          if (!island) return;
          hoveredIslandId = islandId;
          map.getCanvas().style.cursor = "pointer";
          map.setFilter("island-hover", ["==", ["get", "id"], islandId]);
          setHoveredIsland(island);
        });

        map.on("mouseleave", "island-hit-area", () => {
          hoveredIslandId = "";
          map.getCanvas().style.cursor = "grab";
          map.setFilter("island-hover", emptyIslandFilter);
          setHoveredIsland(null);
        });

        map.on("click", "island-hit-area", (event) => {
          const islandId = String(event.features?.[0]?.properties?.id ?? "");
          const island = islands.find((item) => item.id === islandId);
          if (!island) return;
          setSelectedIsland(island);
          map.setFilter("island-selected", ["==", ["get", "id"], islandId]);
        });

        setMapReady(true);
      });
    }).catch(() => {
      if (!cancelled) {
        setWebglUnavailable(true);
        setMapReady(true);
      }
    });

    return () => {
      cancelled = true;
      markerRefs.current.forEach((marker) => marker.remove());
      neighborMarkerRefs.current.forEach((marker) => marker.remove());
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const map = mapRef.current;
    const filter = periodFilter(activePeriod.id);
    ["territory-glow", "territory-outline"].forEach((layer) => {
      if (map.getLayer(layer)) map.setFilter(layer, filter);
    });
    const controlLayers = [
      ["territory-volume", "direct"],
      ["territory-autonomous", "autonomous"],
      ["territory-influence", "influence"],
    ] as const;
    controlLayers.forEach(([layer, control]) => {
      if (map.getLayer(layer)) {
        map.setFilter(layer, ["all", filter, ["==", ["get", "control"], control]]);
      }
    });
    if (map.getLayer("uncertain-outline")) {
      map.setFilter("uncertain-outline", [
        "all",
        filter,
        ["==", ["get", "confidence"], "low"],
      ]);
    }
    ["historical-events", "historical-events-hit"].forEach((layer) => {
      if (map.getLayer(layer)) map.setFilter(layer, filter);
    });
    if (map.getLayer("historical-events-hover")) map.setFilter("historical-events-hover", emptyHistoricalEventFilter);
    if (map.getLayer("historical-events-selected")) map.setFilter("historical-events-selected", emptyHistoricalEventFilter);

    const focusCenter: [number, number] = compareEnabled
      ? [
          (activePeriod.center[0] + comparePeriod.center[0]) / 2,
          (activePeriod.center[1] + comparePeriod.center[1]) / 2,
        ]
      : activePeriod.center;
    map.easeTo({
      center: focusCenter,
      zoom: compareEnabled ? Math.max(3, Math.min(activePeriod.zoom, comparePeriod.zoom) - 0.18) : activePeriod.zoom,
      pitch: mapPitch,
      bearing: cinematic3dEnabled ? (activeIndex % 2 === 0 ? -24 : 24) : activeIndex % 2 === 0 ? -7 : 7,
      duration: 1100,
      essential: true,
    });

    markerRefs.current.forEach((marker) => marker.remove());
    markerRefs.current = [];
    void import("maplibre-gl").then((maplibregl) => {
      activePeriod.markers.forEach((item) => {
        const element = document.createElement("div");
        element.className = "place-marker";
        element.innerHTML = `<i></i><span>${item.name}<small>${item.role}</small></span>`;
        markerRefs.current.push(
          new maplibregl.Marker({ element, anchor: "left" })
            .setLngLat(item.coordinates)
            .addTo(map),
        );
      });
    });
  }, [activeIndex, activePeriod, cinematic3dEnabled, compareEnabled, comparePeriod, mapPitch, mapReady]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const map = mapRef.current;
    const visibility = compareEnabled ? "visible" : "none";
    ["compare-volume", "compare-outline"].forEach((layer) => {
      if (!map.getLayer(layer)) return;
      map.setFilter(layer, periodFilter(comparePeriod.id));
      map.setLayoutProperty(layer, "visibility", visibility);
    });
    if (!compareEnabled) return;

    let highlighted = true;
    const pulse = window.setInterval(() => {
      if (!map.getLayer("compare-outline")) return;
      highlighted = !highlighted;
      map.setPaintProperty("compare-outline", "line-opacity", highlighted ? 0.95 : 0.42);
      map.setPaintProperty("compare-outline", "line-width", highlighted ? 2.7 : 1.5);
    }, 900);
    return () => window.clearInterval(pulse);
  }, [compareEnabled, comparePeriod.id, mapReady]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const map = mapRef.current;
    if (terrainEnabled) {
      map.setTerrain({
        source: "relief",
        exaggeration: sharp3dEnabled ? activeDepthPreset.terrain : depthPresets[0].terrain,
      });
      if (map.getLayer("relief-shade")) map.setLayoutProperty("relief-shade", "visibility", "visible");
    } else {
      map.setTerrain(null);
      if (map.getLayer("relief-shade")) map.setLayoutProperty("relief-shade", "visibility", "none");
    }
  }, [activeDepthPreset.terrain, terrainEnabled, sharp3dEnabled, mapReady]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const map = mapRef.current;
    map.setPixelRatio(Math.min(window.devicePixelRatio || 1, activeRenderQuality.maxPixelRatio));
  }, [activeRenderQuality.maxPixelRatio, mapReady]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const map = mapRef.current;
    const height = terrainEnabled
      ? sharp3dEnabled
        ? ["*", ["get", "height"], activeDepthPreset.extrusion]
        : ["get", "height"]
      : 0;
    ["territory-volume", "territory-autonomous", "territory-influence"].forEach((layer) => {
      if (!map.getLayer(layer)) return;
      map.setPaintProperty(layer, "fill-extrusion-base", terrainEnabled ? 250 : 0);
      map.setPaintProperty(layer, "fill-extrusion-height", height);
    });
    if (map.getLayer("compare-volume")) {
      map.setPaintProperty("compare-volume", "fill-extrusion-base", terrainEnabled ? 120 : 0);
      map.setPaintProperty(
        "compare-volume",
        "fill-extrusion-height",
        terrainEnabled
          ? ["*", ["get", "height"], sharp3dEnabled ? activeDepthPreset.extrusion * 0.72 : 0.72]
          : 0,
      );
    }
    if (map.getLayer("province-hit-area")) {
      map.setPaintProperty("province-hit-area", "fill-extrusion-base", terrainEnabled ? 15050 : 0);
      map.setPaintProperty("province-hit-area", "fill-extrusion-height", terrainEnabled ? 15100 : 0);
    }
    if (map.getLayer("province-hover")) {
      map.setPaintProperty("province-hover", "fill-extrusion-base", terrainEnabled ? 15100 : 0);
      map.setPaintProperty("province-hover", "fill-extrusion-height", terrainEnabled ? 19000 : 0);
      map.setPaintProperty("province-hover", "fill-extrusion-vertical-gradient", terrainEnabled);
      map.setPaintProperty("province-hover", "fill-extrusion-opacity", terrainEnabled ? 0.62 : 0.16);
    }
    if (map.getLayer("province-selected")) {
      map.setPaintProperty("province-selected", "fill-extrusion-base", terrainEnabled ? 15100 : 0);
      map.setPaintProperty("province-selected", "fill-extrusion-height", terrainEnabled ? 22500 : 0);
      map.setPaintProperty("province-selected", "fill-extrusion-vertical-gradient", terrainEnabled);
      map.setPaintProperty("province-selected", "fill-extrusion-opacity", terrainEnabled ? 0.9 : 0.28);
    }
    if (map.getLayer("territory-glow")) {
      const dramatic = sharp3dEnabled && depthPreset === "cinematic";
      const glowWidth = dramatic ? 18 : sharp3dEnabled ? 14 : 10;
      const glowOpacity = dramatic ? 0.62 : sharp3dEnabled ? 0.5 : 0.34;
      map.setPaintProperty("territory-glow", "line-width", glowWidth * activeRenderQuality.effectScale);
      map.setPaintProperty("territory-glow", "line-blur", renderQuality === "low" ? 2 : dramatic ? 3 : sharp3dEnabled ? 4 : 9);
      map.setPaintProperty("territory-glow", "line-opacity", glowOpacity * activeRenderQuality.effectScale);
    }
    if (map.getLayer("territory-outline")) {
      map.setPaintProperty("territory-outline", "line-width", sharp3dEnabled ? 2.6 : 1.4);
      map.setPaintProperty("territory-outline", "line-opacity", sharp3dEnabled ? 1 : 0.82);
    }
    if (map.getLayer("province-boundaries")) {
      map.setPaintProperty(
        "province-boundaries",
        "line-width",
        sharp3dEnabled
          ? ["interpolate", ["linear"], ["zoom"], 3, 0.75, 6, 1.8]
          : ["interpolate", ["linear"], ["zoom"], 3, 0.35, 6, 1.15],
      );
      map.setPaintProperty("province-boundaries", "line-opacity", sharp3dEnabled ? 0.95 : 0.72);
    }
    if (map.getLayer("relief-shade")) {
      map.setPaintProperty(
        "relief-shade",
        "hillshade-exaggeration",
        (sharp3dEnabled ? depthPreset === "cinematic" ? 0.9 : 0.72 : 0.36) * activeRenderQuality.effectScale,
      );
    }
  }, [activeDepthPreset.extrusion, activeRenderQuality.effectScale, depthPreset, renderQuality, sharp3dEnabled, terrainEnabled, mapReady]);

  useEffect(() => {
    if (cinematicTimerRef.current) window.clearInterval(cinematicTimerRef.current);
    if (!cinematic3dEnabled || !mapReady || !mapRef.current) return;
    const map = mapRef.current;
    const stopCinematic = () => setCinematic3dEnabled(false);
    const canvas = map.getCanvas();
    canvas.addEventListener("pointerdown", stopCinematic, { once: true });
    map.easeTo({ pitch: mapPitch, bearing: -28, duration: 1400, essential: true });
    cinematicTimerRef.current = window.setInterval(() => {
      map.easeTo({
        bearing: map.getBearing() + 22,
        pitch: mapPitch,
        duration: 6500,
        easing: (progressValue) => progressValue,
        essential: true,
      });
    }, 6500);
    return () => {
      canvas.removeEventListener("pointerdown", stopCinematic);
      if (cinematicTimerRef.current) window.clearInterval(cinematicTimerRef.current);
      cinematicTimerRef.current = null;
    };
  }, [cinematic3dEnabled, mapPitch, mapReady]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const visibility = contextEnabled ? "visible" : "none";
    ["countries-fill", "coastline"].forEach((layer) => {
      if (mapRef.current?.getLayer(layer)) {
        mapRef.current.setLayoutProperty(layer, "visibility", visibility);
      }
    });

    neighborMarkerRefs.current.forEach((marker) => marker.remove());
    neighborMarkerRefs.current = [];
    if (!contextEnabled) return;
    void import("maplibre-gl").then((maplibregl) => {
      historicalContextLabels(activePeriod.year).forEach((item) => {
        const element = document.createElement("div");
        element.className = "country-label";
        element.textContent = item.name;
        neighborMarkerRefs.current.push(
          new maplibregl.Marker({ element }).setLngLat(item.coordinates).addTo(mapRef.current!),
        );
      });
    });
  }, [activePeriod.year, contextEnabled, mapReady]);

  useEffect(() => {
    if (!mapReady || !mapRef.current?.getLayer("uncertain-outline")) return;
    mapRef.current.setLayoutProperty(
      "uncertain-outline",
      "visibility",
      uncertaintyEnabled ? "visible" : "none",
    );
  }, [uncertaintyEnabled, mapReady]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const visibility = provincesEnabled ? "visible" : "none";
    [
      "province-reference-fill",
      "province-boundaries",
      "province-hit-area",
      "province-hover",
      "province-selected",
      "province-hover-outline",
      "province-selected-outline",
    ].forEach((layer) => {
      if (mapRef.current?.getLayer(layer)) {
        mapRef.current.setLayoutProperty(layer, "visibility", visibility);
      }
    });
  }, [provincesEnabled, mapReady]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const visibility = islandsEnabled ? "visible" : "none";
    ["island-points", "island-hit-area", "island-hover", "island-selected"].forEach((layer) => {
      if (mapRef.current?.getLayer(layer)) {
        mapRef.current.setLayoutProperty(layer, "visibility", visibility);
      }
    });
  }, [islandsEnabled, mapReady]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const visibility = historicalEventsEnabled ? "visible" : "none";
    ["historical-events", "historical-events-hit", "historical-events-hover", "historical-events-selected"].forEach((layer) => {
      if (mapRef.current?.getLayer(layer)) mapRef.current.setLayoutProperty(layer, "visibility", visibility);
    });
  }, [historicalEventsEnabled, mapReady]);

  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setInterval(() => {
        setActiveIndex((index) => {
          const currentPosition = visiblePeriodIndexes.indexOf(index);
          const nextPosition = currentPosition < 0 || currentPosition === visiblePeriodIndexes.length - 1
            ? 0
            : currentPosition + 1;
          return visiblePeriodIndexes[nextPosition] ?? index;
        });
      }, storyModeEnabled ? 5200 : 3600);
    } else if (playTimerRef.current) {
      clearInterval(playTimerRef.current);
    }
    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, storyModeEnabled, visiblePeriodIndexes]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSourcesOpen(false);
        setControlsOpen(false);
        setCompareEnabled(false);
        setStoryModeEnabled(false);
        setIsPlaying(false);
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "BUTTON", "A"].includes(target.tagName)) return;
      if (event.key === "ArrowLeft") movePeriod(-1);
      if (event.key === "ArrowRight") movePeriod(1);
      if (event.key === " ") {
        event.preventDefault();
        setIsPlaying((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [movePeriod]);

  const resetView = () => {
    const center: [number, number] = compareEnabled
      ? [
          (activePeriod.center[0] + comparePeriod.center[0]) / 2,
          (activePeriod.center[1] + comparePeriod.center[1]) / 2,
        ]
      : activePeriod.center;
    mapRef.current?.easeTo({
      center,
      zoom: compareEnabled ? Math.max(3, Math.min(activePeriod.zoom, comparePeriod.zoom) - 0.18) : activePeriod.zoom,
      pitch: mapPitch,
      bearing: activeIndex % 2 === 0 ? -7 : 7,
      duration: 900,
    });
  };

  const highlightIsland = (island: IslandInfo) => {
    setHoveredIsland(island);
    if (mapRef.current?.getLayer("island-hover")) {
      mapRef.current.setFilter("island-hover", ["==", ["get", "id"], island.id]);
    }
  };

  const clearIslandHover = () => {
    setHoveredIsland(null);
    if (mapRef.current?.getLayer("island-hover")) {
      mapRef.current.setFilter("island-hover", emptyIslandFilter);
    }
  };

  const selectIsland = (island: IslandInfo) => {
    setSelectedIsland(island);
    if (mapRef.current?.getLayer("island-selected")) {
      mapRef.current.setFilter("island-selected", ["==", ["get", "id"], island.id]);
      mapRef.current.easeTo({
        center: island.coordinates,
        zoom: island.kind === "Quần đảo" ? 5.1 : 6.2,
        pitch: mapPitch,
        duration: 900,
        essential: true,
      });
    }
  };

  const clearIslandSelection = () => {
    setSelectedIsland(null);
    if (mapRef.current?.getLayer("island-selected")) {
      mapRef.current.setFilter("island-selected", emptyIslandFilter);
    }
  };

  const highlightHistoricalEvent = (historicalEvent: HistoricalEventInfo) => {
    setHoveredHistoricalEvent(historicalEvent);
    if (mapRef.current?.getLayer("historical-events-hover")) {
      mapRef.current.setFilter("historical-events-hover", ["==", ["get", "id"], historicalEvent.id]);
    }
  };

  const clearHistoricalEventHover = () => {
    setHoveredHistoricalEvent(null);
    if (mapRef.current?.getLayer("historical-events-hover")) {
      mapRef.current.setFilter("historical-events-hover", emptyHistoricalEventFilter);
    }
  };

  const selectHistoricalEvent = (historicalEvent: HistoricalEventInfo) => {
    setSelectedHistoricalEvent(historicalEvent);
    if (!mapRef.current?.getLayer("historical-events-selected")) return;
    mapRef.current.setFilter("historical-events-selected", ["==", ["get", "id"], historicalEvent.id]);
    mapRef.current.easeTo({
      center: historicalEvent.coordinates,
      zoom: 6.2,
      pitch: mapPitch,
      duration: 900,
      essential: true,
    });
  };

  const clearHistoricalEventSelection = () => {
    setSelectedHistoricalEvent(null);
    if (mapRef.current?.getLayer("historical-events-selected")) {
      mapRef.current.setFilter("historical-events-selected", emptyHistoricalEventFilter);
    }
  };

  const clearProvinceSelection = () => {
    setSelectedProvince(null);
    setProvinceHistoryOpen(false);
    if (mapRef.current?.getLayer("province-selected")) {
      mapRef.current.setFilter("province-selected", emptyProvinceFilter);
    }
    if (mapRef.current?.getLayer("province-selected-outline")) {
      mapRef.current.setFilter("province-selected-outline", emptyProvinceFilter);
    }
  };

  const visibleProvince = selectedProvince ?? hoveredProvince;
  const visibleIsland = selectedIsland ?? hoveredIsland;
  const visibleHistoricalEvent = selectedHistoricalEvent ?? hoveredHistoricalEvent;

  return (
    <main className={`atlas-shell quality-${renderQuality} ${sharp3dEnabled ? "sharp-3d" : ""} ${cinematic3dEnabled ? "cinematic-3d" : ""} ${compareEnabled ? "compare-active" : ""} ${controlsOpen ? "controls-open" : ""} ${uiHidden ? "ui-hidden" : ""}`}>
      <div
        ref={containerRef}
        className={`map-canvas ${mapReady && !webglUnavailable ? "is-ready" : ""}`}
        aria-label="Bản đồ lịch sử Việt Nam tương tác"
      />
      {!mapReady && !webglUnavailable && (
        <div className="map-loader" role="status" aria-live="polite">
          <span aria-hidden="true" />
          <strong>Đang dựng bản đồ lịch sử</strong>
          <small>Chuẩn bị địa hình, ranh giới và dữ liệu thời kỳ…</small>
        </div>
      )}
      {webglUnavailable && (
        <div className="fallback-map" aria-label="Bản đồ 2D dự phòng">
          <svg viewBox="0 0 1000 760" role="img" aria-label={`Phạm vi ${activePeriod.name}`}>
            <defs>
              <filter id="fallback-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation={sharp3dEnabled ? "6" : "13"} result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <pattern id="fallback-grid" width="55" height="55" patternUnits="userSpaceOnUse">
                <path d="M 55 0 L 0 0 0 55" fill="none" stroke="rgba(236,227,204,.07)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="1000" height="760" fill="#101817" />
            <rect width="1000" height="760" fill="url(#fallback-grid)" />
            <path className="fallback-contour" d="M62 152C204 87 342 94 457 126s208 14 328-30 168 25 151 92-99 92-171 129-75 105-8 148 152 16 165 98-77 132-185 101-181-11-273 24-236 25-330-31S-16 507 38 423s133-87 135-155S10 195 62 152Z" />
            {compareEnabled && compareFallbackFeatures.map((feature) => (
              <path
                key={`compare-${feature.properties.periodId}-${feature.properties.name}`}
                d={fallbackPath(feature.geometry)}
                fill="#3a9392"
                fillOpacity="0.38"
                stroke="#8ed5d1"
                strokeWidth="3"
                strokeDasharray="10 7"
                onMouseEnter={() => setHoveredTerritory(feature.properties)}
                onMouseLeave={() => setHoveredTerritory(null)}
              />
            ))}
            {activeFallbackFeatures.map((feature) => {
              const opacity = feature.properties.control === "direct" ? 0.88 : feature.properties.control === "autonomous" ? 0.58 : 0.35;
              return (
                <g key={`${feature.properties.periodId}-${feature.properties.name}`}>
                  <path d={fallbackPath(feature.geometry)} fill="rgba(0,0,0,.42)" transform="translate(9 13)" />
                  <path
                    d={fallbackPath(feature.geometry)}
                    fill={feature.properties.color}
                    fillOpacity={opacity}
                    stroke="#f3dfb0"
                    strokeWidth="2"
                    strokeDasharray={feature.properties.confidence === "low" ? "8 8" : undefined}
                    filter="url(#fallback-glow)"
                    onMouseEnter={() => setHoveredTerritory(feature.properties)}
                    onMouseLeave={() => setHoveredTerritory(null)}
                  />
                </g>
              );
            })}
            {provincesEnabled && fallbackProvinceData.map((feature) => {
              const province = feature.properties;
              const isHovered = hoveredProvince?.code === province.code;
              const isSelected = selectedProvince?.code === province.code;
              return (
                <path
                  key={province.code}
                  className={`fallback-province ${isHovered ? "is-hovered" : ""} ${isSelected ? "is-selected" : ""}`}
                  d={fallbackPath(feature.geometry)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${province.fullName}, mã ${province.code}`}
                  onMouseEnter={() => setHoveredProvince(province)}
                  onMouseLeave={() => setHoveredProvince(null)}
                  onFocus={() => setHoveredProvince(province)}
                  onBlur={() => setHoveredProvince(null)}
                  onClick={() => {
                    setSelectedProvince(province);
                    setProvinceHistoryOpen(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") setSelectedProvince(province);
                  }}
                />
              );
            })}
            {islandsEnabled && islands.map((island) => {
              const x = ((island.coordinates[0] - 98) / 16) * 1000;
              const y = ((27 - island.coordinates[1]) / 20) * 760;
              const isHovered = hoveredIsland?.id === island.id;
              const isSelected = selectedIsland?.id === island.id;
              return (
                <g
                  key={island.id}
                  className={`fallback-island ${isHovered ? "is-hovered" : ""} ${isSelected ? "is-selected" : ""}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${island.kind} ${island.name}, ${island.region}`}
                  onMouseEnter={() => highlightIsland(island)}
                  onMouseLeave={clearIslandHover}
                  onFocus={() => highlightIsland(island)}
                  onBlur={clearIslandHover}
                  onClick={() => selectIsland(island)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") selectIsland(island);
                  }}
                >
                  <circle cx={x} cy={y} r={isSelected ? 9 : isHovered ? 8 : 4.5} />
                  {(isHovered || isSelected) && <text x={x + 12} y={y - 8}>{island.name}</text>}
                </g>
              );
            })}
            {historicalEventsEnabled && activeHistoricalEvents.map((historicalEvent) => {
              const x = ((historicalEvent.coordinates[0] - 98) / 16) * 1000;
              const y = ((27 - historicalEvent.coordinates[1]) / 20) * 760;
              const isHovered = hoveredHistoricalEvent?.id === historicalEvent.id;
              const isSelected = selectedHistoricalEvent?.id === historicalEvent.id;
              return (
                <g
                  key={historicalEvent.id}
                  className={`fallback-event ${isHovered ? "is-hovered" : ""} ${isSelected ? "is-selected" : ""}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${historicalEvent.name}, năm ${historicalEvent.year}`}
                  onMouseEnter={() => highlightHistoricalEvent(historicalEvent)}
                  onMouseLeave={clearHistoricalEventHover}
                  onFocus={() => highlightHistoricalEvent(historicalEvent)}
                  onBlur={clearHistoricalEventHover}
                  onClick={() => selectHistoricalEvent(historicalEvent)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") selectHistoricalEvent(historicalEvent);
                  }}
                >
                  <circle cx={x} cy={y} r={isSelected ? 10 : isHovered ? 9 : 6} />
                  {(isHovered || isSelected) && <text x={x + 13} y={y - 9}>{historicalEvent.name}</text>}
                </g>
              );
            })}
            {contextEnabled && historicalContextLabels(activePeriod.year).map((label) => (
              <text
                key={label.name}
                x={((label.coordinates[0] - 98) / 16) * 1000}
                y={((27 - label.coordinates[1]) / 20) * 760}
                className={label.name === "BIỂN ĐÔNG" ? "sea-label" : undefined}
              >
                {label.name}
              </text>
            ))}
          </svg>
          <span className="fallback-badge">
            Chế độ bản đồ 2D · Thiết bị không có WebGL
          </span>
        </div>
      )}
      <div className="map-vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      {uiHidden && (
        <button
          className="ui-restore-button"
          onClick={() => setUiHidden(false)}
          aria-label="Hiện lại giao diện"
          title="Hiện giao diện"
        >
          <Eye size={18} />
          <span>Hiện giao diện</span>
        </button>
      )}

      <header className="atlas-header">
        <a className="brand" href="#top" aria-label="Dòng Cõi Việt — trang chính">
          <span className="brand-seal">ĐV</span>
          <span>
            <strong>Dòng Cõi Việt</strong>
            <small>Bản đồ lịch sử tương tác</small>
          </span>
        </a>

        <div className="header-actions">
          <span className="prototype-label"><i /> Phục dựng thử nghiệm 01</span>
          <button
            className={`text-button story-trigger ${storyModeEnabled ? "is-active" : ""}`}
            onClick={toggleStoryMode}
            aria-pressed={storyModeEnabled}
          >
            <Route size={16} /> Hành trình
          </button>
          <button
            className={`text-button compare-trigger ${compareEnabled ? "is-active" : ""}`}
            onClick={() => {
              setCompareEnabled((value) => !value);
              setControlsOpen(false);
              setStoryModeEnabled(false);
              setIsPlaying(false);
            }}
            aria-pressed={compareEnabled}
          >
            <GitCompareArrows size={16} /> So sánh
          </button>
          <a className="text-button event-library-trigger" href="/su-kien">
            <History size={16} /> Hồ sơ sự kiện
          </a>
          <button className="text-button" onClick={() => setSourcesOpen(true)}>
            <BookOpen size={16} /> Nguồn tư liệu
          </button>
          <button
            className="icon-button ui-hide-button"
            onClick={() => {
              setUiHidden(true);
              setControlsOpen(false);
            }}
            aria-label="Ẩn toàn bộ giao diện"
            title="Ẩn giao diện"
          >
            <EyeOff size={18} />
          </button>
          {!controlsOpen && (
            <button
              className="icon-button mobile-control-button"
              onClick={() => {
                setControlsOpen(true);
                setCompareEnabled(false);
                setProvinceHistoryOpen(false);
              }}
              aria-label="Mở tùy chọn lớp bản đồ"
              aria-expanded={false}
            >
              <Layers3 size={18} />
            </button>
          )}
        </div>
      </header>

      {compareEnabled && (
        <aside className="compare-panel" aria-label="So sánh hai thời đại">
          <div className="compare-panel-heading">
            <span><GitCompareArrows size={15} /> So sánh lãnh thổ</span>
            <button onClick={() => setCompareEnabled(false)} aria-label="Đóng chế độ so sánh"><X size={16} /></button>
          </div>
          <div className="compare-period-grid">
            <div className="compare-period current-period">
              <span><i /> Mốc đang xem</span>
              <strong>{activePeriod.displayYear}</strong>
              <small>{activePeriod.name}</small>
            </div>
            <label className="compare-period reference-period">
              <span><i /> Đối chiếu với</span>
              <div className="compare-select-wrap">
                <select value={compareIndex} onChange={(event) => setCompareIndex(Number(event.target.value))}>
                  {periods.map((period, index) => (
                    <option key={period.id} value={index}>{period.displayYear} · {period.name}</option>
                  ))}
                </select>
                <ChevronDown size={15} aria-hidden="true" />
              </div>
              <small>{comparePeriod.range}</small>
            </label>
          </div>
          <div className="comparison-result">
            <span>{comparisonStatus}</span>
            <small>So sánh tương đối lớp kiểm soát trực tiếp</small>
          </div>
        </aside>
      )}

      {!storyPanelOpen && (
        <button className="panel-reopen story-reopen" onClick={() => setStoryPanelOpen(true)} aria-label="Mở thông tin thời kỳ" title="Mở thông tin thời kỳ">
          <BookOpen size={17} />
        </button>
      )}

      {storyPanelOpen && <aside className="story-card" aria-live="polite">
        <button className="story-panel-close" onClick={() => setStoryPanelOpen(false)} aria-label="Đóng thông tin thời kỳ"><X size={16} /></button>
        {storyModeEnabled && <div className="story-tour-progress" style={{ width: `${((activeIndex + 1) / periods.length) * 100}%` }} />}
        <div className="story-index">{String(activeIndex + 1).padStart(2, "0")}</div>
        <p className="story-eyebrow">{activePeriod.eyebrow}</p>
        {storyModeEnabled && (
          <div className="story-tour-state">
            <span><i /> Hành trình {activeIndex + 1}/{periods.length}</span>
            <button onClick={() => setIsPlaying((value) => !value)}>{isPlaying ? "Tạm dừng" : "Tiếp tục"}</button>
          </div>
        )}
        <p className="story-year">{activePeriod.range}</p>
        <h1>{activePeriod.name}</h1>
        <h2>{activePeriod.subtitle}</h2>
        <p className="story-description">{activePeriod.description}</p>
        <div className="story-meta">
          <div>
            <span>Phạm vi</span>
            <p>{activePeriod.territoryNote}</p>
          </div>
          <div className="confidence-row">
            <span>Độ chắc chắn</span>
            <p>
              <i className={`confidence-dot confidence-${activePeriod.confidence.toLowerCase().replace(" ", "-")}`} />
              {activePeriod.confidence}
            </p>
          </div>
        </div>
        <button className="source-note" onClick={() => setSourcesOpen(true)}>
          <CircleHelp size={15} />
          <span>{activePeriod.sourceNote}</span>
        </button>
      </aside>}

      <div className="right-panel-stack">
      <div className={`layer-panel-group ${controlsOpen ? "is-open" : ""}`}>
      <aside className="layer-panel layer-panel-core">
        <div className="layer-panel-heading">
          <span><Layers3 size={15} /> Bộ lọc bản đồ</span>
          <button onClick={() => setControlsOpen(false)} aria-label="Đóng tùy chọn"><X size={16} /></button>
        </div>
        <details className="advanced-display-settings">
          <summary>
            <span><Gauge size={14} /> Hiệu năng & 3D</span>
            <ChevronDown size={15} aria-hidden="true" />
          </summary>
          <div className="advanced-display-content">
        <div className="quality-control">
          <div className="depth-control-heading">
            <span><Gauge size={14} /> Chất lượng render</span>
            <small>{qualityMode === "auto" ? `Auto · ${activeRenderQuality.label}` : activeRenderQuality.note}</small>
          </div>
          <div className="quality-preset-grid" role="group" aria-label="Chọn chất lượng hiển thị bản đồ">
            <button
              className={qualityMode === "auto" ? "is-active" : ""}
              aria-pressed={qualityMode === "auto"}
              onClick={() => {
                setQualityMode("auto");
                setRenderQuality(detectDeviceRenderQuality());
              }}
            >
              Auto
            </button>
            {renderQualities.map((quality) => (
              <button
                key={quality.id}
                className={qualityMode === quality.id ? "is-active" : ""}
                aria-pressed={qualityMode === quality.id}
                onClick={() => {
                  setQualityMode(quality.id);
                  setRenderQuality(quality.id);
                }}
              >
                {quality.label}
              </button>
            ))}
          </div>
        </div>
        <label>
          <span><Mountain size={15} /> Địa hình 3D</span>
          <input
            type="checkbox"
            checked={terrainEnabled}
            onChange={(event) => {
              setTerrainEnabled(event.target.checked);
              if (!event.target.checked) {
                setSharp3dEnabled(false);
                setCinematic3dEnabled(false);
                setDepthPreset("standard");
              }
            }}
          />
          <i />
        </label>
        <label>
          <span><Mountain size={15} /> 3D sắc nét</span>
          <input
            type="checkbox"
            checked={sharp3dEnabled}
            onChange={(event) => {
              setSharp3dEnabled(event.target.checked);
              if (event.target.checked) setTerrainEnabled(true);
              else setCinematic3dEnabled(false);
            }}
          />
          <i />
        </label>
        <div className="depth-control">
          <div className="depth-control-heading">
            <span>Độ nổi 3D</span>
            <small>{activeDepthPreset.label}</small>
          </div>
          <div className="depth-preset-grid" role="group" aria-label="Chọn độ nổi bản đồ 3D">
            {depthPresets.map((preset) => (
              <button
                key={preset.id}
                className={depthPreset === preset.id ? "is-active" : ""}
                aria-pressed={depthPreset === preset.id}
                onClick={() => {
                  setDepthPreset(preset.id);
                  setTerrainEnabled(true);
                  setSharp3dEnabled(preset.id !== "standard");
                  if (preset.id !== "cinematic") setCinematic3dEnabled(false);
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
        <label>
          <span><RotateCcw size={15} /> Camera cinematic</span>
          <input
            type="checkbox"
            checked={cinematic3dEnabled}
            onChange={(event) => {
              const enabled = event.target.checked;
              setCinematic3dEnabled(enabled);
              if (enabled) {
                setTerrainEnabled(true);
                setSharp3dEnabled(true);
                setDepthPreset("cinematic");
              }
            }}
          />
          <i />
        </label>
          </div>
        </details>
        <label>
          <span><MapPinned size={15} /> Nước lân cận</span>
          <input type="checkbox" checked={contextEnabled} onChange={(event) => setContextEnabled(event.target.checked)} />
          <i />
        </label>
        <label>
          <span><Layers3 size={15} /> 34 tỉnh hiện đại</span>
          <input
            type="checkbox"
            checked={provincesEnabled}
            onChange={(event) => {
              setProvincesEnabled(event.target.checked);
              if (!event.target.checked) setHoveredProvince(null);
            }}
          />
          <i />
        </label>
        <label>
          <span><CircleHelp size={15} /> Ranh giới ước lệ</span>
          <input type="checkbox" checked={uncertaintyEnabled} onChange={(event) => setUncertaintyEnabled(event.target.checked)} />
          <i />
        </label>
        <label>
          <span><Waves size={15} /> Đảo & quần đảo</span>
          <input
            type="checkbox"
            checked={islandsEnabled}
            onChange={(event) => {
              setIslandsEnabled(event.target.checked);
              if (!event.target.checked) {
                clearIslandHover();
                clearIslandSelection();
              }
            }}
          />
          <i />
        </label>
        <label>
          <span><History size={15} /> Sự kiện lịch sử</span>
          <input
            type="checkbox"
            checked={historicalEventsEnabled}
            onChange={(event) => {
              setHistoricalEventsEnabled(event.target.checked);
              if (!event.target.checked) {
                clearHistoricalEventHover();
                clearHistoricalEventSelection();
              }
            }}
          />
          <i />
        </label>
        <div className="event-filter">
          <div className="event-filter-heading"><Route size={14} /><span>Lọc loại sự kiện</span></div>
          <div className="event-filter-grid">
            {eventFilters.map((filter) => (
              <button
                key={filter.id}
                className={eventFilter === filter.id ? "is-active" : ""}
                onClick={() => applyEventFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <button className="reset-view" onClick={resetView}><RotateCcw size={14} /> Đặt lại góc nhìn</button>
      </aside>

      <aside className="layer-panel layer-panel-information">
        <div className="layer-panel-heading layer-panel-heading-static">
          <span><CircleHelp size={15} /> Thông tin bổ trợ</span>
        </div>
        {historicalEventsEnabled && activeHistoricalEvents.length > 0 && (
          <div className="historical-event-list" aria-label="Sự kiện lịch sử tại mốc đang xem">
            <div className="island-list-heading">
              <span>Sự kiện tại mốc này</span>
              <a href="/su-kien">Hồ sơ <ArrowUpRight size={11} /></a>
            </div>
            {activeHistoricalEvents.map((historicalEvent) => (
              <button
                key={historicalEvent.id}
                className={selectedHistoricalEvent?.id === historicalEvent.id ? "is-selected" : ""}
                onMouseEnter={() => highlightHistoricalEvent(historicalEvent)}
                onMouseLeave={clearHistoricalEventHover}
                onFocus={() => highlightHistoricalEvent(historicalEvent)}
                onBlur={clearHistoricalEventHover}
                onClick={() => selectHistoricalEvent(historicalEvent)}
              >
                <span>{historicalEvent.year}</span>
                <div><strong>{historicalEvent.name}</strong><small>{historicalEvent.location}</small></div>
              </button>
            ))}
          </div>
        )}
        {islandsEnabled && (
          <div className="island-list" aria-label="Danh sách đảo và quần đảo">
            <div className="island-list-heading">
              <span>Địa danh biển đảo</span>
              <small>{islands.length}</small>
            </div>
            <div className="island-list-scroll">
              {islands.map((island) => (
                <button
                  key={island.id}
                  className={selectedIsland?.id === island.id ? "is-selected" : hoveredIsland?.id === island.id ? "is-hovered" : ""}
                  onMouseEnter={() => highlightIsland(island)}
                  onMouseLeave={clearIslandHover}
                  onFocus={() => highlightIsland(island)}
                  onBlur={clearIslandHover}
                  onClick={() => selectIsland(island)}
                >
                  <i />
                  <span><strong>{island.name}</strong><small>{island.kind} · {island.region}</small></span>
                </button>
              ))}
            </div>
            <p>Lớp định vị hiện đại, không suy diễn cho mọi thời kỳ.</p>
          </div>
        )}
      </aside>
      </div>

      {legendOpen ? <aside className="legend-card">
        <button className="legend-close" onClick={() => setLegendOpen(false)} aria-label="Đóng chú giải"><X size={14} /></button>
        <span><i className="legend-direct" /> Kiểm soát trực tiếp</span>
        <span><i className="legend-autonomous" /> Tự trị / phụ thuộc</span>
        <span><i className="legend-influence" /> Ảnh hưởng</span>
        <span><i className="legend-uncertain" /> Ranh giới ước lệ</span>
        <span><i className="legend-province" /> Tỉnh/thành 2025</span>
        <span><i className="legend-island" /> Đảo / quần đảo</span>
        <span><i className="legend-event" /> Sự kiện lịch sử</span>
      </aside> : (
        <button className="panel-reopen legend-reopen" onClick={() => setLegendOpen(true)} aria-label="Mở chú giải" title="Mở chú giải">
          <CircleHelp size={17} />
        </button>
      )}
      </div>

      {historicalEventsEnabled && visibleHistoricalEvent && (
        <aside className={`province-card historical-event-card ${selectedHistoricalEvent ? "is-selected" : ""}`} aria-live="polite">
          <div>
            <span>{selectedHistoricalEvent ? "Sự kiện đã chọn" : "Sự kiện đang trỏ"} · {visibleHistoricalEvent.year}</span>
            <strong>{visibleHistoricalEvent.name}</strong>
            <small>{visibleHistoricalEvent.location}</small>
            <p>{visibleHistoricalEvent.summary}</p>
            {visibleHistoricalEvent.hasDetail && (
              <a className="historical-event-read" href={`/su-kien/${visibleHistoricalEvent.slug}`}>
                Đọc hồ sơ đầy đủ <ArrowUpRight size={13} />
              </a>
            )}
          </div>
          {selectedHistoricalEvent && (
            <button onClick={clearHistoricalEventSelection} aria-label="Bỏ chọn sự kiện"><X size={15} /></button>
          )}
        </aside>
      )}

      {!visibleHistoricalEvent && islandsEnabled && visibleIsland && (
        <aside className={`province-card island-card ${selectedIsland ? "is-selected" : ""}`} aria-live="polite">
          <div>
            <span>{selectedIsland ? "Địa danh đã chọn" : "Địa danh đang trỏ"}</span>
            <strong>{visibleIsland.name}</strong>
            <small>{visibleIsland.kind} · {visibleIsland.region}</small>
          </div>
          {selectedIsland && (
            <button onClick={clearIslandSelection} aria-label="Bỏ chọn đảo"><X size={15} /></button>
          )}
        </aside>
      )}

      {hoveredTerritory && !visibleHistoricalEvent && !visibleIsland && !visibleProvince && (
        <aside className="territory-inspector" aria-live="polite">
          <span>Vùng đang trỏ</span>
          <strong>{hoveredTerritory.name}</strong>
          <div>
            <small>{controlLabel(hoveredTerritory.control)}</small>
            <small>Độ chắc chắn: {confidenceLabel(hoveredTerritory.confidence)}</small>
          </div>
        </aside>
      )}

      {!visibleHistoricalEvent && !visibleIsland && provincesEnabled && visibleProvince && (
        <aside className={`province-card ${selectedProvince ? "is-selected" : ""}`} aria-live="polite">
          <div>
            <span>{selectedProvince ? "Tỉnh/thành đã chọn" : "Tỉnh/thành đang trỏ"}</span>
            <strong>{visibleProvince.name}</strong>
            <small>
              Mã {visibleProvince.code} · {new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(visibleProvince.areaKm2)} km²
            </small>
          </div>
          {selectedProvince && (
            <div className="province-card-actions">
              <button
                className="province-history-open"
                onClick={() => {
                  setProvinceHistoryOpen(true);
                  setControlsOpen(false);
                }}
              >
                <History size={13} /> Lịch sử địa phương
              </button>
              <button onClick={clearProvinceSelection} aria-label="Bỏ chọn tỉnh"><X size={15} /></button>
            </div>
          )}
        </aside>
      )}

      {selectedProvince && provinceHistoryOpen && (
        <aside className="province-history-panel" aria-label={`Lịch sử địa phương ${selectedProvince.name}`}>
          <div className="province-history-heading">
            <div>
              <span>Lịch sử địa phương</span>
              <h3>{selectedProvince.fullName}</h3>
            </div>
            <button onClick={() => setProvinceHistoryOpen(false)} aria-label="Đóng lịch sử địa phương"><X size={17} /></button>
          </div>
          <p className="province-history-intro">
            Các mốc có vùng kiểm soát trực tiếp đi qua tâm địa giới hiện đại của {selectedProvince.name}.
          </p>
          <div className="province-history-list">
            {provinceHistory.length ? provinceHistory.map((period) => (
              <button
                key={period.id}
                className={period.id === activePeriod.id ? "is-active" : ""}
                onClick={() => {
                  selectPeriod(periods.findIndex((item) => item.id === period.id));
                  setProvinceHistoryOpen(false);
                }}
              >
                <span>{period.displayYear}</span>
                <div><strong>{period.name}</strong><small>{period.eyebrow}</small></div>
                <ArrowRight size={14} />
              </button>
            )) : <p className="province-history-empty">Chưa có đủ dữ liệu giao cắt cho khu vực này.</p>}
          </div>
          <p className="province-history-note">
            Đây là phép đối chiếu không gian ước lệ, không khẳng định địa giới tỉnh hiện đại đã tồn tại trong các thời kỳ trên.
          </p>
        </aside>
      )}

      <section className="timeline-panel" aria-label="Dòng thời gian lịch sử">
        <div className="timeline-topline">
          <div className="timeline-actions">
            <button onClick={() => setIsPlaying((value) => !value)} aria-label={isPlaying ? "Tạm dừng" : "Phát dòng thời gian"}>
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </button>
            <button onClick={() => movePeriod(-1)} disabled={visiblePeriodIndexes.indexOf(activeIndex) === 0} aria-label="Thời kỳ trước"><ArrowLeft size={16} /></button>
            <button onClick={() => movePeriod(1)} disabled={visiblePeriodIndexes.indexOf(activeIndex) === visiblePeriodIndexes.length - 1} aria-label="Thời kỳ sau"><ArrowRight size={16} /></button>
          </div>
          <div className="timeline-current">
            <span>Mốc đang xem</span>
            <strong>{activePeriod.displayYear}</strong>
          </div>
          <div className="timeline-hint">{visiblePeriodIndexes.length}/{periods.length} mốc · cuộn ngang để khám phá</div>
        </div>

        <div className="timeline-track-wrap" ref={timelineViewportRef}>
          <div className="timeline-track" style={{ width: `${timelineWidth}px` }}>
            <div className="timeline-progress" style={{ width: `${progress}px` }} />
            {periods.map((period, index) => (
              <button
                key={period.id}
                className={`${index === activeIndex ? "active" : index < activeIndex ? "passed" : ""} ${eventFilter !== "all" && periodCategories[period.id] !== eventFilter ? "is-filtered-out" : ""}`}
                style={{ left: `${index * timelineStep + timelineStep / 2}px` }}
                data-active={index === activeIndex}
                onClick={() => selectPeriod(index)}
                disabled={eventFilter !== "all" && periodCategories[period.id] !== eventFilter}
                aria-label={`Xem ${period.name}, ${period.displayYear}`}
                title={`${period.displayYear} · ${period.name}`}
              >
                <i />
                <span>{period.displayYear}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="modern-context-note">
        <ChevronDown size={13} /> Tỉnh/thành và địa danh biển đảo là lớp tham chiếu hiện đại (2025)
      </div>

      {sourcesOpen && (
        <div className="drawer-backdrop" role="presentation" onMouseDown={() => setSourcesOpen(false)}>
          <aside className="source-drawer" role="dialog" aria-modal="true" aria-labelledby="sources-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="drawer-heading">
              <div>
                <p>Phương pháp & tư liệu</p>
                <h2 id="sources-title">Bản đồ có nguồn, không giấu bất định</h2>
              </div>
              <button onClick={() => setSourcesOpen(false)} aria-label="Đóng nguồn tư liệu"><X size={20} /></button>
            </div>
            <p className="drawer-intro">
              Đường bờ và địa giới tỉnh hiện đại dùng dữ liệu WGS84 chi tiết. Lãnh thổ lịch sử vẫn là phục dựng theo từng lớp độ chắc chắn, không nên dùng như bằng chứng pháp lý hoặc biên giới tuyệt đối.
            </p>
            <div className="method-grid">
              <article><span>01</span><h3>Phân lớp quyền lực</h3><p>Tách kiểm soát trực tiếp, tự trị, ảnh hưởng và tranh chấp.</p></article>
              <article><span>02</span><h3>Gắn độ chắc chắn</h3><p>Biên giới cổ đại dùng nét đứt và chú thích nguồn phục dựng.</p></article>
              <article><span>03</span><h3>Không dùng mốc giả</h3><p>Sự kiện một năm được tách khỏi trạng thái lãnh thổ kéo dài.</p></article>
            </div>
            <h3 className="source-list-title">Nguồn khởi đầu</h3>
            <ul className="source-list">
              {sourceLinks.map((source, index) => (
                <li key={source.href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <a href={source.href} target="_blank" rel="noreferrer">{source.label}<ArrowRight size={15} /></a>
                </li>
              ))}
            </ul>
            <div className="drawer-footnote">Phiên bản dữ liệu: prototype 0.1 · Cập nhật tháng 08/2026</div>
          </aside>
        </div>
      )}
    </main>
  );
}
