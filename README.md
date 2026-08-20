# Việt Niên Sử

Việt Niên Sử là bản đồ lịch sử tương tác giúp khám phá sự thay đổi lãnh thổ Việt Nam qua nhiều thời kỳ, từ Văn Lang đến Việt Nam hiện đại.

Ứng dụng kết hợp dòng thời gian, bản đồ 3D, lớp tỉnh thành hiện đại, địa danh biển đảo và các sự kiện tiêu biểu để người xem đối chiếu không gian lịch sử theo cách trực quan.

## Tính năng

- Dòng thời gian gồm các giai đoạn và mốc mở rộng, thống nhất, chia cắt hoặc bị đô hộ.
- Bản đồ 2D và 3D với nhiều mức độ nổi.
- Ba mức chất lượng hiển thị: Low, Medium và High.
- Hiển thị các quốc gia và vùng lãnh thổ lân cận theo bối cảnh từng thời kỳ.
- Lớp tham chiếu 34 tỉnh, thành phố Việt Nam theo hệ thống hành chính năm 2025.
- Hover và chọn tỉnh, thành phố để xem thông tin và lịch sử địa phương.
- Danh sách đảo, quần đảo và khả năng định vị trực tiếp trên bản đồ.
- Lớp sự kiện lịch sử với bộ lọc theo nhóm sự kiện.
- Chế độ so sánh lãnh thổ giữa hai mốc thời gian.
- Chế độ hành trình tự động và camera cinematic.
- Tùy chọn ẩn toàn bộ giao diện để quan sát bản đồ toàn màn hình.
- Giao diện responsive cho desktop, tablet và mobile.

## Công nghệ

- Next.js 16
- React 19
- TypeScript
- MapLibre GL JS
- TopoJSON và World Atlas
- Tailwind CSS 4
- Lucide Icons
- Vite và Vinext

## Cài đặt

Yêu cầu Node.js `22.13.0` trở lên.

```bash
npm install
npm run dev
```

Các lệnh chính:

```bash
npm run dev       # Chạy môi trường phát triển
npm run build     # Build bản production
npm run start     # Chạy bản production đã build
npm run lint      # Kiểm tra chất lượng source
npm test          # Build và chạy test
```

## Cấu trúc chính

```text
app/
  components/HistoricalAtlas.tsx   Giao diện và tương tác bản đồ
  data/historical.ts                Dữ liệu thời kỳ, sự kiện và nguồn tham khảo
  globals.css                       Design system và responsive layout
public/data/
  vietnam-historical-territories.geojson
  vietnam-provinces-2025.geojson
```

## Nguyên tắc dữ liệu

Ranh giới lịch sử trong dự án là lớp phục dựng mang tính minh họa. Nhiều thời kỳ không có đường biên chính xác theo cách hiểu hiện đại, vì vậy dữ liệu được trình bày theo ba mức kiểm soát:

- Kiểm soát trực tiếp.
- Tự trị hoặc phụ thuộc.
- Vùng ảnh hưởng.

Ranh giới ước lệ, lớp tỉnh thành năm 2025 và vị trí biển đảo hiện đại được đánh dấu riêng để tránh nhầm lẫn giữa dữ liệu lịch sử và địa giới hiện hành.

## Nguồn tham khảo

Dữ liệu khởi đầu được tổng hợp và đối chiếu từ:

- Bảo tàng Lịch sử Quốc gia.
- Cổng Thông tin điện tử Chính phủ.
- Cục Du lịch Quốc gia Việt Nam.
- Nghị quyết số 202/2025/QH15 về sắp xếp đơn vị hành chính cấp tỉnh.
- Bộ dữ liệu địa giới hành chính Việt Nam dạng GeoJSON.
- Một số tài liệu lịch sử quốc tế được dẫn trực tiếp trong phần “Nguồn tư liệu” của ứng dụng.

Khi bổ sung hoặc điều chỉnh một mốc lịch sử, cần ghi rõ nguồn, phạm vi lãnh thổ, mức độ chắc chắn và lý do thay đổi.

## Lưu ý

Dự án phục vụ mục đích khám phá và trực quan hóa lịch sử. Nội dung không thay thế bản đồ pháp lý, tài liệu hành chính hoặc nghiên cứu lịch sử chuyên ngành.

## Giấy phép

Chưa thiết lập giấy phép sử dụng. Mọi quyền thuộc về chủ sở hữu dự án.
