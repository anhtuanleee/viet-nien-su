# Phương pháp phục dựng polygon lịch sử

## Phạm vi và giới hạn

Polygon lịch sử của Việt Niên Sử là lớp diễn giải ở tỷ lệ khu vực, không phải địa giới pháp lý hay kết quả đo đạc đồng đại. Biên giới theo nghĩa hiện đại không phù hợp với nhiều giai đoạn cổ–trung đại; vì vậy dữ liệu ưu tiên mô tả vùng kiểm soát và công khai độ bất định.

Các đường bờ và địa giới hiện đại chỉ xuất hiện ở lát cắt Việt Nam hiện đại và các lớp tham chiếu có nhãn riêng. Polygon của 25 lát cắt lịch sử được vector hóa từ vùng màu trên ảnh bản đồ lịch sử, không được tạo bằng cách hợp nhất tỉnh thành năm 2025.

## Các hiệu chỉnh tháng 08/2026

- Mốc 1069 được neo theo Bố Chính, Địa Lý và Ma Linh: Quảng Bình và phần bắc Quảng Trị ngày nay.
- Mốc 1306 được neo theo châu Ô, châu Lý: Quảng Trị và Thừa Thiên Huế ngày nay, với Hải Vân là mốc phía nam khái quát.
- Mốc 1471 được neo theo thừa tuyên Quảng Nam từ Hải Vân đến Cù Mông, không kéo đường kiểm soát trực tiếp xuống toàn bộ Phú Yên.
- Mốc 1954 được mô tả là giới tuyến quân sự tạm thời theo sông Bến Hải/Cửa Tùng, không gọi là biên giới quốc gia.
- Polygon đảo xa bờ lấy từ địa giới hiện đại bị loại khỏi mọi lát cắt trước hiện đại. Hoàng Sa và Trường Sa tiếp tục được thể hiện ở lớp chú thích đảo riêng, tránh hồi chiếu hình học hành chính năm 2025 vào quá khứ.
- Độ chắc chắn của Âu Lạc được hạ xuống `low`, đồng nhất với chú thích khảo cổ và giao diện.
- Mốc 1698 không còn kéo vùng kiểm soát trực tiếp của Đàng Trong xuống toàn bộ đồng bằng sông Cửu Long. Polygon dừng ở vùng Gia Định–Đồng Nai; các mốc Hà Tiên 1708, Mỹ Tho–Vĩnh Long 1732 và phần tây nam sau đó chỉ được dùng làm đối chiếu cho lần mở rộng timeline tiếp theo.

## Tối ưu dữ liệu

`source-data/historical-territories-image-traced.geojson` là dữ liệu hình học chuẩn cho 25 lát cắt lịch sử. Chạy `npm run data:trace:images` để tải ảnh nguồn, tách vùng màu, georeference và vector hóa; sau đó chạy `npm run data:historical` để tạo 26 lát cắt runtime trong `public/data/historical-territories/` cùng manifest `index.json`. File lớn `public/data/vietnam-historical-territories.geojson` chỉ được giữ để kiểm toán dữ liệu cũ và lấy lát cắt hiện đại, không còn là nguồn hình học lịch sử lúc build hoặc runtime.

Runtime chỉ tải lát cắt đang xem và, khi bật so sánh, thêm đúng một lát cắt đối chiếu. Tọa độ đầu ra được làm tròn 5 chữ số thập phân nhưng độ chính xác georeference được công bố là khoảng 50 km; đường biên vì vậy mang tính minh họa khu vực, không phải địa giới pháp lý.

## Nguồn neo chính

- Bảo tàng Lịch sử Quốc gia: thời đại Hùng Vương/Cổ Loa, châu Ô–Lý năm 1306, thừa tuyên Quảng Nam năm 1471.
- Sở Khoa học và Công nghệ Quảng Bình: Bố Chính, Địa Lý, Ma Linh năm 1069.
- Sở Quy hoạch–Kiến trúc TP.HCM: phủ Gia Định năm 1698.
- Văn kiện Genève 1954 do Office of the Historian công bố: mô tả giới tuyến quân sự tạm thời.
- Vietnamese Provinces Database: đường bờ và địa giới tham chiếu WGS84 năm 2025.

Chi tiết URL và ánh xạ nguồn theo từng thời kỳ nằm trong `public/data/historical-territories/index.json`.
Mỗi mốc lịch sử trong manifest có `geometrySources`, gồm URL ảnh JPEG được trace, trang bộ sưu tập chứa ảnh, nhãn năm trên ảnh, phương pháp phục dựng và sai số georeference. Drawer “Nguồn tư liệu” trên giao diện dẫn trực tiếp đến chính ảnh đã dùng.

Riêng mốc 1407 dùng `georeferenced-image-boundary-trace`: vùng Giao Chỉ và nền Đại Minh gần như cùng màu nên polygon được trace theo đường chấm ranh giới hiện trên ảnh, không dùng bộ tách màu.

### Vai trò của ba bộ sưu tập trực tuyến

- Wikipedia được dùng như mục lục để truy file gốc, tác giả, giấy phép và tài liệu dẫn nguồn trên Wikimedia Commons.
- Bộ 45 ảnh của KhoaHoc.tv và 67 ảnh của Địa Ốc Thông Thái là nguồn hình dạng cho phép trace vùng màu. Vì ảnh không có lưới tọa độ hay phép chiếu, phép georeference bậc hai dùng các mốc Móng Cái, Hải Phòng, Nghệ An, Bố Chính, Ma Linh, Hải Vân và Cà Mau, với sai số ước lượng khoảng 50 km.
- Sau khi trace, các ô màu bị phép chiếu đẩy xuống biển được snap về phần đất liền gần nhất trong giới hạn sai số nguồn, dựa trên land mask Natural Earth 1:50m từ package `world-atlas`. Chỉ cạnh giáp biển được ràng buộc; biên nội địa vẫn giữ hình dạng phục dựng của ảnh nguồn. Các đảo nhỏ không tham gia bước snap để tránh kéo nhầm polygon đất liền sang Hải Nam hoặc đảo xa.
- Mask loại khung, con dấu, la bàn và inset được cấu hình riêng cho từng bộ ảnh. Đặc biệt, vùng góc Đông Bắc của ảnh Địa Ốc Thông Thái không bị áp mask la bàn của KhoaHoc.tv; validator yêu cầu các mốc Nam Việt, Trưng Vương và ba thời kỳ Bắc thuộc còn phần biên phía Đông đến ít nhất 110°Đ.
- Các lát cắt Bắc thuộc, Minh thuộc, thuộc địa Nam Kỳ và Pháp thuộc dùng lớp hiển thị `autonomous` — chú giải “tự trị / phụ thuộc / bị chiếm” — thay vì màu kiểm soát trực tiếp.
- Không sao chép ảnh KhoaHoc.tv hoặc Địa Ốc Thông Thái vào repository vì chưa xác định được giấy phép tái sử dụng.
