import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const requireFile = (path) => {
  if (!existsSync(join(root, path))) failures.push(`Thiếu tệp: ${path}`);
};
const requireText = (path, pattern, message) => {
  const fullPath = join(root, path);
  if (!existsSync(fullPath) || !pattern.test(readFileSync(fullPath, "utf8"))) failures.push(message);
};

for (const path of [
  "LICENSE",
  "THIRD_PARTY_NOTICES.md",
  "SOCIAL_PUBLISHING_CHECKLIST.md",
  "app/dinh-chinh/page.tsx",
  "public/og.png",
]) requireFile(path);

const labeledDir = join(root, "public/event-illustrations/labeled");
const labeledImages = existsSync(labeledDir)
  ? readdirSync(labeledDir).filter((name) => name.endsWith(".webp"))
  : [];
if (labeledImages.length !== 21) failures.push(`Cần đúng 21 minh họa AI đã gắn nhãn; hiện có ${labeledImages.length}.`);

requireText("app/data/researched-events.ts", /replace\("\/unique\/", "\/labeled\/"\)/, "Hồ sơ sự kiện chưa dùng bản ảnh AI đã gắn nhãn.");
requireText("app/data/researched-events.ts", /Nguồn chính thức/, "Nguồn sự kiện chưa có phân cấp biên tập.");
requireText("app/components/HistoricalAtlas.tsx", /Quần đảo Hoàng Sa, Việt Nam/, "Thiếu ghi chú Hoàng Sa, Việt Nam.");
requireText("app/components/HistoricalAtlas.tsx", /Quần đảo Trường Sa, Việt Nam/, "Thiếu ghi chú Trường Sa, Việt Nam.");
requireText("app/components/HistoricalAtlas.tsx", /WGS84/, "Thiếu chú giải hệ tọa độ WGS84.");
requireText("app/layout.tsx", /\/og\.png/, "Thiếu social card mặc định.");
requireText("app/phap-ly/page.tsx", /THIRD_PARTY_NOTICES/, "Trang pháp lý chưa dẫn thông báo tài sản bên thứ ba.");

if (failures.length) {
  console.error(failures.map((failure) => `✗ ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`✓ Publication audit passed: ${labeledImages.length} ảnh AI có nhãn, hồ sơ pháp lý và chú giải bản đồ đã hiện diện.`);
