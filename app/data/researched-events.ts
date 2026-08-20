import type { HistoricalEventDetail, HistoricalEventSummary } from "./events";

type Seed = {
  id: string;
  date: string;
  dek: string;
  context: [string, string];
  sides: [[string, string, string, string], [string, string, string, string]];
  phases: Array<[string, string]>;
  turns: [string, string, string];
  outcome: string;
  significance: [string, string, string];
  certainty: string;
  sources: Array<[string, string, string, string]>;
};

const museumNaval = "https://baotanglichsu.vn/vi/Articles/2001/65748/suc-manh-thuy-quan-qua-cac-vuong-trieu-djai-viet-ky-2.html";
const museumCapital = "https://baotanglichsu.vn/vi/Articles/3096/12687/7-lan-giai-phong-thu-djo-trong-lich-su-dan-toc.html";
const militaryOverview = "https://btlsqsvn.mod.gov.vn/trung-bay/chu-de-trung-bay/chi-tiet/chu-de-4-3ba2836e-d737-42e7-aa0d-932c1d620207";

const seeds: Seed[] = [
  {
    id: "bach-dang-981", date: "Mùa xuân năm 981",
    dek: "Lê Hoàn tổ chức kháng chiến trên nhiều hướng, chặn cả cánh quân bộ và thủy của nhà Tống; Bạch Đằng là một không gian tác chiến quan trọng của chiến cuộc.",
    context: ["Sau biến động triều Đinh, nhà Tống đưa quân tiến vào Đại Cồ Việt bằng cả đường bộ và đường thủy.", "Lê Hoàn nắm quyền chỉ huy, huy động lực lượng bảo vệ các cửa ngõ phía bắc và tuyến sông dẫn vào đồng bằng."],
    sides: [["Đại Cồ Việt", "Lê Hoàn", "Quân bộ, thủy quân và lực lượng địa phương bố trí trên các tuyến hiểm yếu.", "Làm chậm, chia cắt rồi đánh bại các cánh quân Tống trước khi chúng hợp lực."], ["Nhà Tống", "Hầu Nhân Bảo; Lưu Trừng", "Các đạo quân tiến theo hướng Lạng Sơn và đường biển vào vùng Bạch Đằng.", "Hợp quân, tiến vào trung tâm Đại Cồ Việt và áp đặt quyền kiểm soát."]],
    phases: [["Chặn các hướng tiến", "Quân Đại Cồ Việt tổ chức phòng ngự và tập kích trên cả đường bộ lẫn đường sông."], ["Phá thế phối hợp", "Các cánh quân Tống không duy trì được nhịp hiệp đồng; Hầu Nhân Bảo bị đánh bại."], ["Buộc quân Tống rút", "Thủy quân và bộ binh Tống lần lượt mất ưu thế, chiến dịch xâm nhập thất bại."]],
    turns: ["Tổ chức kháng chiến thống nhất dưới quyền Lê Hoàn.", "Khai thác địa hình sông ngòi và đánh vào sự phối hợp giữa các đạo quân.", "Thất bại của cánh quân Hầu Nhân Bảo làm thay đổi cục diện toàn chiến cuộc."],
    outcome: "Cuộc tiến công của nhà Tống bị đẩy lùi; chính quyền Tiền Lê củng cố nền độc lập của Đại Cồ Việt.",
    significance: ["Bảo vệ nền tự chủ vừa được xác lập trong thế kỷ X.", "Khẳng định năng lực điều hành quân sự và chính trị của Lê Hoàn.", "Tiếp nối truyền thống phòng thủ cửa sông Bạch Đằng trong chiến lược bảo vệ vùng đồng bằng."],
    certainty: "Sử liệu thống nhất về kết quả chiến cuộc năm 981 nhưng mô tả địa điểm, thứ tự và quy mô từng trận trên sông khác nhau; hồ sơ không đồng nhất toàn bộ chiến cuộc với một trận đơn lẻ.",
    sources: [["Sức mạnh thủy quân qua các vương triều Đại Việt", "Bảo tàng Lịch sử Quốc gia", museumNaval, "Đặt chiến thắng năm 981 trong lịch sử tổ chức thủy quân."], ["Vietnam from the 1st to the 10th centuries AD", "Bảo tàng Lịch sử Quốc gia", "https://baotanglichsu.vn/en/Articles/4196/vietnam-from-the-1st-to-the-10th-centuries-ad", "Khái quát bối cảnh độc lập thế kỷ X."]],
  },
  {
    id: "ung-chau-1075", date: "10/1075 – 03/1076",
    dek: "Lý Thường Kiệt chủ động tiến sang Khâm, Liêm và Ung Châu nhằm phá cơ sở hậu cần trước khi nhà Tống mở cuộc tiến công vào Đại Việt.",
    context: ["Căng thẳng Tống – Đại Việt tăng cao khi nhà Tống tập trung quân và vật lực ở vùng biên Quảng Tây.", "Triều Lý lựa chọn đánh trước vào các căn cứ chuẩn bị chiến tranh rồi rút về xây dựng phòng tuyến trong nước."],
    sides: [["Đại Việt", "Lý Thường Kiệt; Tông Đản", "Các đạo quân bộ từ biên giới và thủy quân tiến vào Khâm, Liêm, Ung.", "Phá kho tàng, căn cứ và khả năng tập kết của Tống trước cuộc xâm nhập."], ["Nhà Tống", "Tô Giám và lực lượng địa phương", "Quân đồn trú trong các châu thành Quảng Tây.", "Giữ hệ thống thành và duy trì bàn đạp quân sự sát biên giới Đại Việt."]],
    phases: [["Đánh Khâm – Liêm", "Các cánh thủy bộ nhanh chóng chiếm mục tiêu ven biển và phá cơ sở hậu cần."], ["Vây Ung Châu", "Quân Đại Việt tập trung đánh thành Ung Châu trong một cuộc vây hãm kéo dài."], ["Chủ động rút quân", "Sau khi hoàn thành mục tiêu quân sự, lực lượng Đại Việt rút về chuẩn bị phòng thủ."]],
    turns: ["Đòn tiến công được mở trước khi đại quân Tống hoàn tất chuẩn bị.", "Sự phối hợp giữa cánh quân bộ và thủy tạo sức ép trên một không gian rộng.", "Việc rút quân có kế hoạch chuyển trọng tâm sang phòng tuyến Như Nguyệt."],
    outcome: "Các căn cứ Khâm, Liêm và Ung bị đánh phá; nhà Tống sau đó vẫn tiến công nhưng mất một phần cơ sở chuẩn bị gần biên giới.",
    significance: ["Là ví dụ nổi bật về tư duy chủ động phòng vệ từ xa của nhà Lý.", "Gắn trực tiếp với chiến cuộc Như Nguyệt 1077.", "Cho thấy khả năng tổ chức chiến dịch thủy bộ vượt biên giới ở thế kỷ XI."],
    certainty: "Niên đại và các mục tiêu chính được ghi tương đối rõ; quân số, thương vong và diễn biến chi tiết cuộc vây Ung Châu chênh lệch đáng kể giữa các nguồn.",
    sources: [["Sức mạnh thủy quân qua các vương triều Đại Việt", "Bảo tàng Lịch sử Quốc gia", museumNaval, "Khái quát chiến dịch Khâm – Liêm – Ung năm 1075."], ["Lý Thường Kiệt", "Bách khoa toàn thư Britannica", "https://www.britannica.com/biography/Ly-Thuong-Kiet", "Thông tin tham khảo về nhân vật và chiến tranh Tống – Việt."]],
  },
  {
    id: "nhu-nguyet-1077", date: "Đầu năm 1077",
    dek: "Phòng tuyến sông Như Nguyệt chặn đạo quân Tống tiến về Thăng Long và tạo điều kiện cho Đại Việt phản công, đi đến kết thúc chiến tranh.",
    context: ["Sau chiến dịch Ung Châu, nhà Tống tổ chức đại quân tiến vào Đại Việt từ phía bắc.", "Lý Thường Kiệt chọn bờ nam sông Như Nguyệt làm tuyến phòng ngự chính, đồng thời bố trí lực lượng ngăn thủy quân Tống hội quân."],
    sides: [["Đại Việt", "Lý Thường Kiệt; Lý Kế Nguyên", "Quân phòng tuyến, thủy quân và lực lượng cơ động bảo vệ các bến vượt sông.", "Giữ tuyến sông, làm suy yếu đối phương rồi phản công trong thời cơ thuận lợi."], ["Nhà Tống", "Quách Quỳ; Triệu Tiết", "Đại quân bộ tiến từ Quảng Tây; thủy quân bị chặn ở vùng ven biển.", "Vượt sông, phá phòng tuyến và tiến vào trung tâm Đại Việt."]],
    phases: [["Lập tuyến sông", "Đại Việt xây dựng hệ thống phòng ngự dọc bờ nam và kiểm soát các bến quan trọng."], ["Chống vượt sông", "Nhiều đợt quân Tống tìm cách qua sông nhưng không tạo được đột phá bền vững."], ["Phản công và giảng hòa", "Quân Đại Việt tập kích, làm suy yếu đối phương; hai bên đi đến giải pháp chấm dứt giao tranh."]],
    turns: ["Thủy quân Tống không thể phối hợp với cánh quân bộ.", "Phòng tuyến giữ vững trước các nỗ lực vượt sông.", "Cuộc phản công giúp Đại Việt tạo thế chủ động cho kết thúc chiến tranh."],
    outcome: "Quân Tống rút khỏi Đại Việt; đường biên và quan hệ hai nước tiếp tục được xử lý bằng thương lượng sau chiến tranh.",
    significance: ["Bảo vệ trung tâm chính trị của Đại Việt.", "Thể hiện sự kết hợp phòng ngự tuyến, thủy quân và phản công.", "Gắn với ký ức văn hóa về bài thơ Nam quốc sơn hà, dù hoàn cảnh văn bản còn được nghiên cứu."],
    certainty: "Vị trí chung và kết quả chiến cuộc được xác nhận; phạm vi chính xác của phòng tuyến, trình tự các đợt vượt sông và thời điểm xuất hiện bài thơ còn có cách giải thích khác nhau.",
    sources: [["Sức mạnh thủy quân qua các vương triều Đại Việt", "Bảo tàng Lịch sử Quốc gia", museumNaval, "Vai trò phòng tuyến sông Cầu và chốt thủy quân."], ["Nam quốc sơn hà", "Bảo tàng Lịch sử Quốc gia", "https://baotanglichsu.vn/vi/Articles/3098/18515/nam-quoc-son-ha-ban-tuyen-ngon-djoc-lap-djau-tien.html", "Tham khảo ký ức văn hóa gắn với chiến cuộc."]],
  },
  {
    id: "dong-bo-dau-1258", date: "Cuối tháng 01/1258",
    dek: "Sau khi tạm rời Thăng Long và làm trống nguồn tiếp tế, quân Trần phản công ở Đông Bộ Đầu, buộc quân Mông Cổ rút khỏi Đại Việt.",
    context: ["Đạo quân Mông Cổ từ Vân Nam tiến xuống, thắng tại Bình Lệ Nguyên rồi chiếm Thăng Long.", "Triều Trần bảo toàn lực lượng, di tản dân và lương thực, khiến đối phương khó duy trì quân ở kinh thành."],
    sides: [["Đại Việt", "Trần Thái Tông; Trần Thủ Độ", "Quân triều đình rút lui có tổ chức rồi tập trung phản công.", "Bảo toàn chủ lực, cắt tiếp tế và giành lại Thăng Long."], ["Quân Mông Cổ", "Ngột Lương Hợp Thai", "Đạo kỵ binh và bộ binh từ Vân Nam tiến theo hành lang sông Hồng.", "Nhanh chóng khuất phục Đại Việt để mở đường xuống phía nam."]],
    phases: [["Rút khỏi kinh thành", "Quân Trần tránh quyết chiến bất lợi và làm trống Thăng Long."], ["Làm suy yếu đối phương", "Quân Mông Cổ thiếu lương thực, bị quấy rối và không củng cố được quyền kiểm soát."], ["Phản công Đông Bộ Đầu", "Quân Trần đánh mạnh, buộc đối phương rút lên phía bắc."]],
    turns: ["Quyết định không cố thủ Thăng Long giúp bảo toàn lực lượng.", "Nguồn tiếp tế tại chỗ của quân Mông Cổ bị triệt giảm.", "Phản công đúng lúc khi đội hình đối phương suy yếu."],
    outcome: "Quân Mông Cổ rút khỏi Đại Việt; triều Trần nhanh chóng khôi phục quyền kiểm soát kinh thành.",
    significance: ["Kết thúc cuộc kháng chiến chống Mông Cổ lần thứ nhất.", "Định hình cách đánh tránh chỗ mạnh, kéo dài và phản công của nhà Trần.", "Là lần đầu Thăng Long được giải phóng khỏi quân Mông – Nguyên."],
    certainty: "Mốc thời gian theo lịch hiện đại có thể khác nhau do quy đổi âm – dương lịch; vị trí Đông Bộ Đầu thường được đặt gần bến sông Hồng nhưng ranh giới khảo cổ chưa hoàn toàn xác định.",
    sources: [["7 lần giải phóng Thủ đô trong lịch sử dân tộc", "Bảo tàng Lịch sử Quốc gia", museumCapital, "Tường thuật khái quát chiến cuộc năm 1258."], ["Mongol invasions of Vietnam", "Encyclopaedia Britannica", "https://www.britannica.com/place/Vietnam/The-Ly-dynasty", "Bối cảnh khu vực của các cuộc xâm nhập Mông – Nguyên."]],
  },
  {
    id: "chuong-duong-ham-tu-1285", date: "05–06/1285",
    dek: "Hai thắng lợi Hàm Tử và Chương Dương mở nhịp phản công lớn của nhà Trần, cắt thế liên kết và dẫn đến việc giải phóng Thăng Long.",
    context: ["Đầu năm 1285, quân Nguyên chiếm Thăng Long và tạo sức ép từ nhiều hướng, trong khi triều Trần rút để bảo toàn lực lượng.", "Khi đối phương kéo dài tuyến tiếp tế, quân Trần chuyển sang phản công trên hành lang sông Hồng."],
    sides: [["Đại Việt", "Trần Nhật Duật; Trần Quang Khải; Trần Quốc Toản", "Thủy bộ quân triều đình phối hợp với lực lượng địa phương và quân Tống lưu vong.", "Phá các cụm quân Nguyên trên sông, khôi phục hành lang tiến về Thăng Long."], ["Quân Nguyên", "Toa Đô và các tướng đóng dọc sông", "Các đơn vị thủy bộ phân tán bảo vệ tuyến vận chuyển và khu vực kinh thành.", "Giữ liên lạc các cánh quân, duy trì quyền kiểm soát Thăng Long."]],
    phases: [["Đánh Hàm Tử", "Lực lượng Trần Nhật Duật đánh cụm quân đối phương ở bến Hàm Tử."], ["Tiến công Chương Dương", "Quân Trần đánh vào căn cứ và thuyền chiến dọc sông Hồng."], ["Giải phóng Thăng Long", "Thế phòng ngự Nguyên bị phá, quân Trần tiến lên giành lại kinh thành."]],
    turns: ["Đối phương bị kéo giãn và gặp khó về tiếp tế.", "Thắng lợi Hàm Tử tạo đà tinh thần và chiến dịch.", "Mất Chương Dương làm suy yếu tuyến sông bảo vệ Thăng Long."],
    outcome: "Quân Trần giành lại Thăng Long; quân Nguyên rút lui và tiếp tục bị đánh trên đường rút.",
    significance: ["Đảo chiều cục diện cuộc kháng chiến lần thứ hai.", "Cho thấy vai trò quyết định của hành lang sông Hồng.", "Gắn với nhiều chỉ huy tiêu biểu của nhà Trần."],
    certainty: "Các nguồn thống nhất về thứ tự tương đối và vai trò hai trận; ngày cụ thể, quân số và đóng góp của từng cánh quân có sai khác.",
    sources: [["7 lần giải phóng Thủ đô trong lịch sử dân tộc", "Bảo tàng Lịch sử Quốc gia", museumCapital, "Khái quát phản công Hàm Tử – Chương Dương."], ["Sức mạnh thủy quân qua các vương triều Đại Việt", "Bảo tàng Lịch sử Quốc gia", museumNaval, "Vai trò các tướng và lực lượng thủy quân nhà Trần."]],
  },
  {
    id: "tot-dong-chuc-dong-1426", date: "11/1426",
    dek: "Nghĩa quân Lam Sơn đánh bại đạo quân Minh cơ động ở vùng Tốt Động – Chúc Động, tạo thế bao vây Đông Quan.",
    context: ["Sau khi làm chủ nhiều vùng từ Thanh Hóa trở vào, nghĩa quân Lam Sơn tiến ra Bắc và uy hiếp Đông Quan.", "Quân Minh từ Đông Quan tổ chức lực lượng lớn nhằm đánh tan các đạo nghĩa quân mới triển khai ở đồng bằng."],
    sides: [["Nghĩa quân Lam Sơn", "Lý Triện; Đinh Lễ; Nguyễn Xí", "Các đạo quân cơ động, dựa vào địa hình ruộng trũng và làng mạc phía tây nam Đông Quan.", "Nhử đạo quân Minh rời vị trí, phục kích và phá khả năng phản công."], ["Quân Minh", "Vương Thông; Mã Kỳ", "Đạo quân từ Đông Quan tiến về vùng Chương Mỹ.", "Tiêu diệt lực lượng Lam Sơn, giải tỏa sức ép quanh Đông Quan."]],
    phases: [["Nhử quân Minh", "Nghĩa quân tạo thế khiến đối phương tiến sâu vào khu vực đã lựa chọn."], ["Phục kích ở vùng trũng", "Các cánh quân Lam Sơn đánh mạnh khi đội hình Minh bị chia cắt và khó cơ động."], ["Truy kích", "Quân Minh chịu thiệt hại nặng và rút về cố thủ Đông Quan."]],
    turns: ["Lựa chọn địa hình hạn chế ưu thế đội hình lớn của quân Minh.", "Nghi binh khiến đối phương rời khu vực phòng thủ.", "Đòn đánh nhiều hướng biến cuộc tiến quân thành rút chạy."],
    outcome: "Đạo quân Minh thất bại, Vương Thông rút về Đông Quan; nghĩa quân Lam Sơn mở rộng thế bao vây.",
    significance: ["Là thắng lợi chiến dịch lớn của Lam Sơn tại đồng bằng Bắc Bộ.", "Chuyển quân Minh ở Đông Quan từ thế tiến công sang phòng thủ.", "Chuẩn bị cho giai đoạn đánh viện Chi Lăng – Xương Giang năm 1427."],
    certainty: "Địa danh và kết quả chính rõ trong sử liệu; quân số và thương vong thường mang tính ước lệ, còn vị trí chính xác của từng ổ phục kích được địa phương hóa theo nhiều truyền thống.",
    sources: [["7 lần giải phóng Thủ đô trong lịch sử dân tộc", "Bảo tàng Lịch sử Quốc gia", museumCapital, "Đặt Tốt Động – Chúc Động trong tiến trình giải phóng Đông Quan."], ["Bình Ngô đại cáo", "Thư viện Quốc gia Việt Nam", "https://nlv.gov.vn/", "Cổng tra cứu văn bản và thư mục về khởi nghĩa Lam Sơn."]],
  },
  {
    id: "chi-lang-1427", date: "10–11/1427",
    dek: "Chuỗi trận từ Chi Lăng đến Xương Giang đánh bại các đạo viện binh Minh, buộc lực lượng cố thủ ở Đông Quan chấp nhận rút quân.",
    context: ["Quân Minh trong Đông Quan bị vây, triều Minh phái hai đạo viện binh lớn từ Quảng Tây và Vân Nam.", "Bộ chỉ huy Lam Sơn chủ trương tiếp tục vây thành nhưng tập trung chủ lực đánh viện trên các hành lang biên giới."],
    sides: [["Nghĩa quân Lam Sơn", "Lê Lợi; Lê Sát; Lưu Nhân Chú; Trần Nguyên Hãn", "Các đạo quân chặn đèo, phục kích đường rút và bao vây Xương Giang.", "Tiêu diệt viện binh trước khi chúng hợp với quân ở Đông Quan."], ["Quân Minh", "Liễu Thăng; Mộc Thạnh; Thôi Tụ; Hoàng Phúc", "Hai đạo viện từ Quảng Tây và Vân Nam tiến vào Đại Việt.", "Giải vây Đông Quan và phục hồi thế chiến lược của nhà Minh."]],
    phases: [["Chi Lăng", "Quân Lam Sơn nhử tiền quân Minh vào địa hình hiểm; Liễu Thăng tử trận."], ["Cần Trạm – Phố Cát", "Đạo quân viện tiếp tục bị chặn đánh, mất chỉ huy và tan rã dần."], ["Xương Giang", "Phần còn lại bị bao vây, chia cắt và đánh bại trước khi tới Đông Quan."]],
    turns: ["Chọn đánh viện thay vì công phá trực diện Đông Quan.", "Cái chết của Liễu Thăng làm rối loạn hệ thống chỉ huy.", "Thành Xương Giang đã bị hạ, khiến viện quân mất điểm tựa dự kiến."],
    outcome: "Hai đạo viện binh thất bại; Vương Thông tham gia hội thề Đông Quan và quân Minh rút về nước.",
    significance: ["Quyết định kết cục khởi nghĩa Lam Sơn.", "Mở đường cho việc khôi phục quốc gia độc lập dưới triều Lê.", "Là mẫu hình chiến lược vây thành, đánh viện trong lịch sử quân sự Việt Nam."],
    certainty: "Trình tự chiến dịch và các chỉ huy chính tương đối rõ; số lượng quân, tù binh và thương vong khác nhau giữa sử liệu Việt Nam và Trung Quốc.",
    sources: [["7 lần giải phóng Thủ đô trong lịch sử dân tộc", "Bảo tàng Lịch sử Quốc gia", museumCapital, "Tóm lược vai trò Chi Lăng – Xương Giang đối với Đông Quan."], ["Di tích chiến thắng Xương Giang", "Cổng thông tin Bắc Giang", "https://bacgiang.gov.vn/", "Cổng thông tin địa phương về không gian di tích chiến trường."]],
  },
  {
    id: "tra-ban-1471", date: "02–03/1471",
    dek: "Chiến dịch của Lê Thánh Tông vượt cửa Thị Nại và hạ kinh đô Vijaya, làm thay đổi sâu sắc cục diện chính trị miền Trung.",
    context: ["Quan hệ Đại Việt – Champa căng thẳng sau các xung đột biên giới và cuộc tiến công vào Hóa Châu năm 1470.", "Lê Thánh Tông tổ chức lực lượng thủy bộ quy mô lớn tiến về Vijaya, trung tâm của vương triều Champa đương thời."],
    sides: [["Đại Việt", "Lê Thánh Tông", "Quân thủy bộ từ các vệ quân triều đình và lực lượng Thuận Hóa.", "Đánh bại quân Champa, kiểm soát Vijaya và ổn định biên giới phía nam."], ["Champa", "Trà Toàn", "Quân bảo vệ cửa Thị Nại, thành Trà Bàn và vùng kinh đô.", "Giữ tuyến cửa biển và bảo vệ trung tâm Vijaya."]],
    phases: [["Vượt tuyến Cu Đê", "Tiền quân Đại Việt qua Hải Vân, đánh các vị trí chặn đường."], ["Hạ cửa Thị Nại", "Thủy bộ quân phá tuyến bảo vệ cửa ngõ vào vùng Vijaya."], ["Vây hạ Trà Bàn", "Kinh đô bị bao vây và thất thủ; Trà Toàn bị bắt."]],
    turns: ["Khả năng tổ chức đồng thời đường bộ và đường biển của Đại Việt.", "Mất cửa Thị Nại khiến Vijaya bị cô lập.", "Kinh đô thất thủ làm cấu trúc quyền lực Champa ở phía bắc suy sụp."],
    outcome: "Vijaya thất thủ; Đại Việt lập Quảng Nam thừa tuyên, trong khi các thực thể Champa tiếp tục tồn tại ở phía nam.",
    significance: ["Làm thay đổi lâu dài bản đồ quyền lực miền Trung.", "Đánh dấu sự kết thúc vai trò trung tâm của Vijaya.", "Tạo ra biến động dân cư, hành chính và văn hóa cần được nhìn từ cả nguồn Việt và Champa."],
    certainty: "Niên đại và kết quả chính được sử liệu ghi rõ; quân số và cách diễn giải nguyên nhân, mức độ kiểm soát lãnh thổ sau 1471 còn khác biệt giữa các truyền thống sử học.",
    sources: [["Nguyễn Hoàng và bước đầu tiến vào vùng Nam Trung Bộ", "Bảo tàng Lịch sử Quốc gia", "https://baotanglichsu.vn/vi/Articles/3096/70731/nguyen-hoang-va-buoc-djau-tien-vao-vung-nam-trung-bo.html", "Dẫn sử liệu về Thị Nại, Trà Bàn và hậu quả lãnh thổ."], ["Hoang tàn thủ phủ Tây Sơn", "Bảo tàng Lịch sử Quốc gia", "https://baotanglichsu.vn/vi/Articles/3091/5522/hoang-tan-thu-phu-tay-son.html", "Thông tin về lớp di tích Vijaya – Đồ Bàn – Hoàng Đế."]],
  },
  {
    id: "nhat-le-1648", date: "Năm 1648",
    dek: "Trận đánh trên hệ thống lũy Quảng Bình là một đợt giao tranh lớn trong chiến tranh Trịnh – Nguyễn, kết thúc bằng thất bại của quân Trịnh ở tuyến Nhật Lệ – Trường Dục.",
    context: ["Từ 1627, hai tập đoàn Trịnh và Nguyễn nhiều lần giao chiến quanh sông Gianh và hệ thống lũy bảo vệ Đàng Trong.", "Lũy Trường Dục, Đầu Mâu và Nhật Lệ dựa vào sông, đầm và dải cát để khóa các cửa tiến quân từ phía bắc."],
    sides: [["Đàng Trong", "Trương Phúc Phấn; các tướng Nguyễn", "Quân giữ lũy, thủy quân cửa Nhật Lệ và lực lượng cơ động địa phương.", "Giữ hệ thống phòng tuyến và ngăn quân Trịnh vượt vào Thuận Hóa."], ["Đàng Ngoài", "Trịnh Tráng và các tướng Trịnh", "Quân bộ, thủy phối hợp tiến vào Quảng Bình.", "Phá lũy, mở đường tiến sâu vào vùng kiểm soát của chúa Nguyễn."]],
    phases: [["Áp sát phòng tuyến", "Quân Trịnh tiến vào vùng Nhật Lệ – Trường Dục và tổ chức công phá."], ["Giằng co tại lũy", "Hai bên giao chiến quanh cửa lũy và các tuyến sông."], ["Phản kích", "Quân Nguyễn giữ được phòng tuyến và đẩy lùi lực lượng tiến công."]],
    turns: ["Hệ thống lũy tận dụng địa hình hẹp giữa núi và biển.", "Quân giữ lũy duy trì được liên lạc giữa các đoạn phòng tuyến.", "Phản kích khiến đội hình tiến công không thể mở rộng cửa đột phá."],
    outcome: "Quân Trịnh rút lui; tuyến phòng thủ Quảng Bình tiếp tục là ranh giới quân sự chủ yếu giữa hai miền.",
    significance: ["Cho thấy vai trò của công trình phòng thủ trong chiến tranh thế kỷ XVII.", "Kéo dài thế cân bằng Trịnh – Nguyễn.", "Để lại hệ thống di tích Lũy Thầy và Quảng Bình Quan."],
    certainty: "Tên gọi “Nhật Lệ 1648” bao quát nhiều điểm giao tranh trên một hệ thống lũy; vị trí và trình tự từng đợt đánh trong nguồn hậu kỳ không hoàn toàn thống nhất.",
    sources: [["Mến dòng sông Gianh biết danh Lũy Thầy", "Bảo tàng Lịch sử Quốc gia", "https://baotanglichsu.vn/vi/Articles/3096/12338/men-dong-song-gianh-biet-danh-luy-thay.html", "Dẫn Đại Nam nhất thống chí về trận năm 1648."], ["Khám phá công trình quân sự độc đáo tại Quảng Bình", "Bảo tàng Lịch sử Quốc gia", "https://baotanglichsu.vn/vi/Articles/3096/16130/kham-pha-cong-trinh-quan-su-djoc-djao-tai-quang-binh.html", "Mô tả cấu trúc và địa hình hệ thống lũy."]],
  },
  {
    id: "rach-gam-1785", date: "Đêm 19 rạng 20/01/1785",
    dek: "Nguyễn Huệ bố trí thế trận mai phục trên sông Tiền, đánh tan lực lượng Xiêm và quân Nguyễn tại đoạn Rạch Gầm – Xoài Mút.",
    context: ["Trong cuộc tranh chấp với Tây Sơn, Nguyễn Ánh cầu viện Xiêm; một lực lượng Xiêm tiến vào vùng Tây Nam Bộ.", "Sau các hoạt động thăm dò và kiềm chế, Nguyễn Huệ chọn khúc sông có cù lao và rạch nhánh gần Mỹ Tho làm khu vực quyết chiến."],
    sides: [["Quân Tây Sơn", "Nguyễn Huệ", "Thủy quân, pháo bố trí ven bờ và trên cù lao, cùng lực lượng chặn đầu – khóa đuôi.", "Dụ hạm đội đối phương vào trận địa, tiêu diệt sức mạnh thủy quân trong một trận quyết định."], ["Quân Xiêm và Nguyễn", "Chiêu Tăng; Chiêu Sương; lực lượng Nguyễn Ánh", "Hạm đội và bộ binh hoạt động dọc sông Tiền.", "Mở rộng kiểm soát Gia Định và đánh bại lực lượng Tây Sơn ở Nam Bộ."]],
    phases: [["Thăm dò và nhử địch", "Tây Sơn vừa đàm phán, vừa trinh sát để khiến đối phương chủ quan tiến theo sông."], ["Khóa đoạn sông", "Khi đội hình lọt vào giữa Rạch Gầm và Xoài Mút, các mũi chặn đầu – cuối đồng loạt xuất hiện."], ["Hỏa lực hợp kích", "Pháo binh và thuyền chiến đánh từ bờ, cù lao và mặt sông, làm đội hình đối phương tan vỡ."]],
    turns: ["Lựa chọn khúc sông nhiều nhánh, cù lao thuận lợi cho mai phục.", "Nghi binh khiến hạm đội đối phương đi sâu trong đội hình kéo dài.", "Hỏa lực từ nhiều hướng khóa không gian cơ động trên sông."],
    outcome: "Lực lượng Xiêm bị đánh bại và rút khỏi Gia Định; Nguyễn Ánh phải tạm lánh sang Xiêm.",
    significance: ["Là một trong những trận thủy chiến lớn của phong trào Tây Sơn.", "Chấm dứt đợt can thiệp quân sự Xiêm năm 1784–1785.", "Thể hiện nghệ thuật lựa chọn chiến trường và hợp kích sông – bờ."],
    certainty: "Địa điểm và kết quả chính được ghi nhận rộng rãi; số chiến thuyền, quân tham chiến và thương vong thay đổi mạnh giữa nguồn Việt, Xiêm và các tường thuật về sau.",
    sources: [["Di tích chiến thắng Rạch Gầm – Xoài Mút", "Cục Di sản văn hóa", "http://dsvh.gov.vn/di-tich-lich-su-rach-gam-xoai-mut-1519", "Thông tin về không gian di tích quốc gia đặc biệt."], ["Nhà Tây Sơn", "Bảo tàng Lịch sử Quốc gia", "https://baotanglichsu.vn/", "Cổng tra cứu trưng bày và bài nghiên cứu về thời Tây Sơn."]],
  },
  {
    id: "ngoc-hoi-1789", date: "Tết Kỷ Dậu 1789",
    dek: "Quang Trung tổ chức cuộc hành quân thần tốc ra Bắc và liên tiếp đánh các đồn Hà Hồi, Ngọc Hồi, Đống Đa, buộc quân Thanh rút khỏi Thăng Long.",
    context: ["Cuối năm 1788, quân Thanh tiến vào Thăng Long với danh nghĩa hỗ trợ Lê Chiêu Thống.", "Nguyễn Huệ lên ngôi Quang Trung tại Phú Xuân, tập hợp quân và tiến nhanh ra Bắc trong dịp Tết."],
    sides: [["Tây Sơn", "Quang Trung – Nguyễn Huệ", "Nhiều đạo quân bộ, tượng binh và lực lượng địa phương tiến theo các hướng nam Thăng Long.", "Đánh nhanh các cụm đồn, giải phóng Thăng Long trước khi quân Thanh củng cố."], ["Quân Thanh và lực lượng Lê", "Tôn Sĩ Nghị; Sầm Nghi Đống", "Các đồn từ Hà Hồi, Ngọc Hồi đến Khương Thượng và quân đóng trong Thăng Long.", "Giữ Thăng Long, duy trì chính quyền Lê Chiêu Thống và chờ tăng viện."]],
    phases: [["Hành quân ra Bắc", "Quân Tây Sơn tuyển thêm lực lượng, chia đạo và tiếp cận tuyến phòng ngự phía nam Thăng Long."], ["Hạ Hà Hồi – Ngọc Hồi", "Các đồn tiền tiêu bị cô lập; Ngọc Hồi bị công phá trong trận đánh ác liệt."], ["Đống Đa – Thăng Long", "Cánh quân phía tây đánh Khương Thượng; Tôn Sĩ Nghị rút qua sông Hồng."]],
    turns: ["Tốc độ hành quân làm quân Thanh không kịp hoàn chỉnh phòng bị.", "Các đạo quân Tây Sơn tiến đồng thời, gây chia cắt chỉ huy.", "Mất Ngọc Hồi và Khương Thượng khiến hệ thống phòng thủ Thăng Long sụp đổ."],
    outcome: "Quân Thanh rút khỏi Đại Việt; Quang Trung vào Thăng Long và sau đó chủ động bình thường hóa quan hệ với nhà Thanh.",
    significance: ["Bảo vệ quyền tự chủ của Đại Việt.", "Là chiến dịch tiến công ngắn ngày với tốc độ và sự phối hợp nổi bật.", "Trở thành một lớp ký ức quan trọng của Tết và lễ hội Đống Đa."],
    certainty: "Kết quả và các địa điểm chính rõ; lịch ngày, tuyến đi của từng đạo, quân số và mô tả chiến thuật lá chắn rơm có nhiều dị bản.",
    sources: [["7 lần giải phóng Thủ đô trong lịch sử dân tộc", "Bảo tàng Lịch sử Quốc gia", museumCapital, "Khái quát cuộc tiến công Tết Kỷ Dậu."], ["Di tích Gò Đống Đa", "Cổng thông tin Hà Nội", "https://hanoi.gov.vn/", "Cổng tra cứu thông tin di tích và lễ hội địa phương."]],
  },
  {
    id: "thi-nai-1801", date: "27/02/1801",
    dek: "Hạm đội Nguyễn Ánh đột kích đầm Thị Nại và phá phần lớn thủy quân Tây Sơn, tạo bước ngoặt trong giai đoạn cuối cuộc chiến.",
    context: ["Năm 1800–1801, thành Quy Nhơn do quân Nguyễn giữ bị Tây Sơn vây ép, còn cửa Thị Nại được một hạm đội lớn bảo vệ.", "Nguyễn Ánh quyết định mở cuộc tiến công đường biển nhằm phá vòng vây và tiêu diệt lực lượng thủy quân đối phương."],
    sides: [["Quân Nguyễn", "Nguyễn Ánh; Võ Di Nguy; Lê Văn Duyệt", "Hạm đội chiến thuyền, pháo hạm và lực lượng đột kích dùng hỏa công.", "Phá hạm đội Tây Sơn, mở đường tiếp ứng Quy Nhơn."], ["Quân Tây Sơn", "Võ Văn Dũng và các tướng thủy quân", "Chiến thuyền lớn, pháo đài hai bên cửa đầm và tuyến phòng thủ nhiều lớp.", "Khóa cửa Thị Nại và duy trì vòng vây thành Quy Nhơn."]],
    phases: [["Thâm nhập cửa đầm", "Các toán tiên phong lợi dụng đêm tối, triều nước và nghi binh để vượt tuyến ngoài."], ["Đánh pháo đài – chiến thuyền", "Giao tranh ác liệt diễn ra tại cửa đầm; Võ Di Nguy tử trận."], ["Hỏa công", "Quân Nguyễn dùng thuyền lửa và pháo đánh vào đội hình neo đậu, gây tổn thất lớn cho Tây Sơn."]],
    turns: ["Đột kích ban đêm làm giảm hiệu quả tuyến phòng thủ cửa đầm.", "Hỏa công lan trong khu vực hạm đội tập trung.", "Tổn thất chiến thuyền làm Tây Sơn suy giảm khả năng kiểm soát biển."],
    outcome: "Phần lớn lực lượng thủy quân Tây Sơn tại Thị Nại bị phá; quân Nguyễn giành ưu thế chiến lược dù chưa giải vây ngay được thành Quy Nhơn.",
    significance: ["Là trận thủy chiến quy mô lớn nhất của nội chiến Tây Sơn – Nguyễn.", "Làm thay đổi tương quan lực lượng trên biển.", "Góp phần mở đường cho việc Nguyễn Ánh thống nhất quyền lực năm 1802."],
    certainty: "Ngày và kết quả chính tương đối rõ; số tàu, pháo và thiệt hại trong các tường thuật thường rất khác nhau nên hồ sơ tránh khẳng định con số tuyệt đối.",
    sources: [["Biển lửa Thị Nại", "Bảo tàng Lịch sử Quốc gia", "https://baotanglichsu.vn/vi/Articles/2001/65786/bien-lua-thi-nai-tran-xich-bich-bi-trang-cua-nguoi-viet.html", "Tường thuật khái quát trận ngày 27/2/1801."], ["Phát hiện khẩu thần công ở đầm Thị Nại", "Bảo tàng Lịch sử Quốc gia", "https://baotanglichsu.vn/vi/Articles/1508/51919/phat-hien-khau-than-cong-o-djam-thi-nai.html", "Thông tin hiện vật liên quan chiến trường."]],
  },
  {
    id: "da-nang-1858", date: "01/09/1858 – 03/1860",
    dek: "Quân triều Nguyễn và dân binh cầm chân liên quân Pháp – Tây Ban Nha tại Đà Nẵng, khiến kế hoạch đánh nhanh vào Huế không đạt mục tiêu.",
    context: ["Ngày 1/9/1858, liên quân Pháp – Tây Ban Nha nổ súng vào hệ thống phòng thủ bán đảo Sơn Trà và cửa biển Đà Nẵng.", "Triều Nguyễn điều Nguyễn Tri Phương tổ chức lại mặt trận, xây đồn lũy và thực hiện chiến thuật vây ép, không giao chiến theo cách có lợi cho hỏa lực hạm tàu."],
    sides: [["Đại Nam", "Nguyễn Tri Phương; Lê Đình Lý", "Quân triều đình, dân binh và hệ thống đồn lũy quanh Đà Nẵng.", "Chặn đường tiến vào Huế, cô lập lực lượng đổ bộ và kéo dài chiến sự."], ["Pháp – Tây Ban Nha", "Charles Rigault de Genouilly và các chỉ huy kế nhiệm", "Hạm đội, pháo hạm, lính thủy đánh bộ và bộ binh viễn chinh.", "Chiếm Đà Nẵng làm bàn đạp tiến nhanh đến kinh đô Huế."]],
    phases: [["Pháo kích và đổ bộ", "Liên quân chiếm các vị trí đầu tiên ở Sơn Trà và cửa biển."], ["Hình thành vòng vây", "Quân Đại Nam dựng phòng tuyến liên hoàn, quấy rối và hạn chế mở rộng vùng chiếm đóng."], ["Rút khỏi Đà Nẵng", "Bệnh tật, hậu cần và thế bế tắc khiến liên quân chuyển trọng tâm vào Gia Định rồi rút hẳn."]],
    turns: ["Nguyễn Tri Phương tránh đối đầu trực diện với hỏa lực hải quân.", "Hệ thống lũy và chiến thuật vườn không nhà trống cô lập khu chiếm đóng.", "Môi trường, dịch bệnh và hậu cần làm suy giảm lực lượng viễn chinh."],
    outcome: "Liên quân rút khỏi Đà Nẵng tháng 3/1860; mục tiêu đánh nhanh chiếm Huế thất bại, nhưng chiến tranh xâm lược tiếp tục ở Nam Kỳ.",
    significance: ["Là mặt trận mở đầu cuộc chiến Pháp – Việt 1858–1884.", "Thể hiện một cách phòng thủ hiệu quả trước ưu thế hạm tàu.", "Để lại hệ thống di tích Thành Điện Hải và các nghĩa trủng Đà Nẵng."],
    certainty: "Mốc mở đầu và kết thúc rõ; quân số, thương vong và ranh giới từng tuyến đồn lũy khác nhau giữa báo cáo Pháp và sử liệu triều Nguyễn.",
    sources: [["Cuộc kháng chiến chống xâm lược Pháp đầu tiên tại Đà Nẵng", "Cổng thông tin Đà Nẵng", "https://danang.gov.vn/w/cuoc-khang-chien-chong-xam-luoc-phap-dau-tien-cua-quan-va-dan-ta-o-mat-tran-da-nang-nam-1858-i", "Khái quát diễn biến và vai trò Nguyễn Tri Phương."], ["Vai trò của Thành Điện Hải", "Cổng thông tin Đà Nẵng", "https://danang.gov.vn/vi/web/dng/-/vai-tro-cua-thanh-dien-hai-trong-cuoc-chien-tranh-mau-ngo-1858-1860-i", "Thông tin về công trình phòng thủ và chiến trường."]],
  },
  {
    id: "cau-giay-1873", date: "21/12/1873",
    dek: "Lực lượng Hoàng Tá Viêm và quân Cờ Đen phục kích đoàn quân Francis Garnier tại Cầu Giấy, làm thay đổi tình thế sau khi thành Hà Nội bị chiếm.",
    context: ["Tháng 11/1873, Francis Garnier chiếm thành Hà Nội và mở rộng hoạt động quân sự ở Bắc Kỳ.", "Quân triều đình cùng lực lượng Cờ Đen của Lưu Vĩnh Phúc tập trung ở vùng phía tây Hà Nội, tìm cơ hội kéo đối phương ra khỏi công sự."],
    sides: [["Quân triều Nguyễn và Cờ Đen", "Hoàng Tá Viêm; Lưu Vĩnh Phúc", "Lực lượng phục kích ở khu vực làng và cầu trên đường đi Sơn Tây.", "Nhử quân Pháp ra khỏi thành và đánh vào đội hình nhỏ, cơ động."], ["Quân Pháp", "Francis Garnier", "Một phân đội từ thành Hà Nội tiến về phía tây sau khi nhận tin giao chiến.", "Giải tỏa sức ép quanh thành và đánh bật lực lượng đối phương."]],
    phases: [["Khiêu chiến ngoài thành", "Lực lượng phối hợp tạo sức ép để kéo quân Pháp ra truy kích."], ["Giao chiến tại Cầu Giấy", "Đội hình Garnier bị chặn và phân tán trong khu vực nhiều làng, ruộng và ngòi nước."], ["Garnier tử trận", "Chỉ huy Pháp bị giết; phân đội còn lại rút về Hà Nội."]],
    turns: ["Đối phương bị kéo xa khỏi thành và hỏa lực yểm trợ.", "Địa hình hạn chế khả năng quan sát và cơ động của phân đội nhỏ.", "Cái chết của Garnier gây khủng hoảng chỉ huy và tác động đến đàm phán."],
    outcome: "Francis Garnier tử trận; Pháp sau đó rút quân theo thỏa thuận ngoại giao, dù quá trình xâm chiếm Bắc Kỳ tiếp tục trong thập niên sau.",
    significance: ["Là thắng lợi quân sự đáng chú ý sau thất thủ Hà Nội năm 1873.", "Cho thấy hiệu quả của phục kích và phối hợp lực lượng địa phương.", "Tác động trực tiếp đến cách Pháp xử lý cuộc khủng hoảng Bắc Kỳ lần thứ nhất."],
    certainty: "Địa điểm chung và cái chết của Garnier được xác nhận; tên gọi địa danh, số người tham chiến và trình tự truy kích có khác nhau trong nguồn Pháp, Việt và Hoa.",
    sources: [["Dấu tích chiến trường Cầu Giấy", "Viện Quy hoạch Hà Nội", "https://vienktxh.hanoi.gov.vn/lap-quy-hoach-thu-do-thoi-ky-2021-2030/nhung-yeu-to-tam-linh-phong-thuy-can-chu-y-khi-lap-quy-hoach-thu-do-ha-noi-thoi-ky-2021-2030-tam-nhin-den-nam-2050-126747.html", "Ghi nhận địa điểm hai trận Cầu Giấy."], ["Francis Garnier", "Encyclopaedia Britannica", "https://www.britannica.com/biography/Francis-Garnier", "Tiểu sử và bối cảnh hoạt động tại Bắc Kỳ."]],
  },
  {
    id: "ba-dinh-1886", date: "12/1886 – 01/1887",
    dek: "Nghĩa quân Cần Vương xây dựng cụm cứ điểm làng Ba Đình và cầm cự nhiều tuần trước cuộc vây hãm quy mô lớn của quân Pháp.",
    context: ["Sau chiếu Cần Vương năm 1885, nhiều lực lượng kháng Pháp hình thành ở Thanh Hóa và Bắc Trung Bộ.", "Ba làng Mậu Thịnh, Thượng Thọ và Mỹ Khê được liên kết thành căn cứ có lũy tre, hào nước và công sự dựa trên địa hình chiêm trũng."],
    sides: [["Nghĩa quân Cần Vương", "Đinh Công Tráng; Phạm Bành; Hoàng Bật Đạt", "Nghĩa quân địa phương phòng thủ trong hệ thống làng lũy liên hoàn.", "Giữ căn cứ, thu hút và làm tiêu hao lực lượng bình định của Pháp."], ["Quân Pháp và lực lượng thuộc địa", "Các chỉ huy quân sự Pháp ở Bắc Trung Kỳ", "Bộ binh, pháo binh và lực lượng bao vây được tăng cường nhiều đợt.", "Cô lập, phá công sự và dập tắt trung tâm kháng chiến Ba Đình."]],
    phases: [["Củng cố căn cứ", "Nghĩa quân gia cố lũy tre, hào và tuyến liên lạc giữa ba làng."], ["Vây hãm – pháo kích", "Quân Pháp bao vây, dùng pháo và công binh thu hẹp vòng phòng thủ."], ["Phá vây", "Khi căn cứ không thể giữ, một bộ phận nghĩa quân phá vòng vây rút ra ngoài."]],
    turns: ["Địa hình đồng lầy ban đầu hỗ trợ phòng thủ.", "Pháo binh và vòng vây kéo dài làm suy kiệt căn cứ.", "Mất khả năng tiếp tế buộc nghĩa quân rời Ba Đình."],
    outcome: "Căn cứ Ba Đình bị phá; các thủ lĩnh và lực lượng còn lại tiếp tục chiến đấu ở nơi khác trước khi phong trào bị đàn áp.",
    significance: ["Là một trung tâm tiêu biểu của phong trào Cần Vương.", "Thể hiện cách biến làng xã thành hệ thống phòng thủ.", "Tên Ba Đình về sau được dùng cho quảng trường trung tâm tại Hà Nội."],
    certainty: "Khung thời gian và các thủ lĩnh chính rõ; quân số, thương vong và ngày kết thúc vây hãm có khác nhau giữa nguồn đương thời và ký ức địa phương.",
    sources: [["Ba Đình – bản hùng ca từ lịch sử", "Cổng thông tin xã Ba Đình, Thanh Hóa", "https://badinh.thanhhoa.gov.vn/thong-tin/ba-dinh-ban-hung-ca-tu-lich-su-den-khat-vong-tuong-lai-602094", "Bối cảnh, địa hình và ký ức địa phương."], ["Bảo tàng tỉnh Thanh Hóa", "Bảo tàng tỉnh Thanh Hóa", "https://baotang.thanhhoa.gov.vn/", "Cổng tra cứu trưng bày về khởi nghĩa Ba Đình."]],
  },
  {
    id: "viet-bac-1947", date: "07/10 – 20/12/1947",
    dek: "Quân và dân Việt Bắc bẻ gãy cuộc tiến công nhiều gọng kìm của Pháp, bảo vệ cơ quan đầu não kháng chiến và làm thất bại ý đồ kết thúc chiến tranh nhanh.",
    context: ["Sau khi chiến tranh toàn quốc bùng nổ, Việt Bắc là căn cứ của Chính phủ Việt Nam Dân chủ Cộng hòa và Bộ Tổng chỉ huy.", "Pháp mở cuộc hành binh Léa, kết hợp quân dù, bộ binh cơ giới và lực lượng đường sông nhằm bắt cơ quan lãnh đạo, phá chủ lực và căn cứ hậu cần."],
    sides: [["Việt Nam Dân chủ Cộng hòa", "Bộ Tổng chỉ huy; Võ Nguyên Giáp", "Bộ đội chủ lực, địa phương, dân quân du kích và nhân dân trên các hướng.", "Bảo vệ cơ quan đầu não, bẻ gãy từng gọng kìm và buộc quân Pháp rút."], ["Liên hiệp Pháp", "Bộ chỉ huy quân Pháp ở Bắc Đông Dương", "Quân dù xuống Bắc Kạn, cánh bộ theo Đường số 4 và cánh đường sông Lô.", "Đánh vào trung tâm Việt Bắc để kết thúc kháng chiến trong thời gian ngắn."]],
    phases: [["Đổ bộ và tiến quân", "Quân dù bất ngờ xuống Bắc Kạn trong khi hai cánh quân tiến theo đường bộ và đường sông."], ["Chặn các gọng kìm", "Lực lượng Việt Nam phân tán, bảo vệ cơ quan, đánh giao thông và tập kích trên sông Lô, Đường số 4."], ["Truy kích quân rút", "Khi kế hoạch hội quân thất bại, quân Pháp rút và tiếp tục bị đánh trên nhiều tuyến."]],
    turns: ["Cơ quan đầu não kịp phân tán, không bị bắt.", "Các gọng kìm Pháp không khép được đúng kế hoạch.", "Chiến tranh du kích và phục kích giao thông làm suy giảm khả năng tiếp tế."],
    outcome: "Cuộc tiến công Pháp thất bại trong mục tiêu chiến lược; căn cứ Việt Bắc và lực lượng chủ lực được bảo toàn, phát triển.",
    significance: ["Làm phá sản chiến lược “đánh nhanh, thắng nhanh” của Pháp.", "Là chiến dịch phản công quy mô lớn đầu tiên của lực lượng vũ trang cách mạng.", "Củng cố khả năng tiến hành kháng chiến lâu dài."],
    certainty: "Thời gian và mục tiêu chiến dịch tương đối thống nhất; thống kê lực lượng, thương vong và cách chia các trận thành phần khác nhau giữa nguồn Việt và Pháp.",
    sources: [["Chiến thắng Việt Bắc Thu-Đông 1947", "Báo Quân đội nhân dân", "https://www.qdnd.vn/vung-buoc-duoi-quan-ky-quyet-thang/lich-su-quan-doi-nhan-dan-viet-nam/chien-thang-viet-bac-thu-dong-1947-buoc-truong-thanh-cua-luc-luong-vu-trang-nhan-dan-viet-nam-797321", "Khái quát diễn biến và ý nghĩa chiến dịch."], ["Kháng chiến chống thực dân Pháp 1945–1954", "Bảo tàng Lịch sử Quân sự Việt Nam", militaryOverview, "Trưng bày tổng quan đặt chiến dịch trong tiến trình kháng chiến."]],
  },
  {
    id: "bien-gioi-1950", date: "16/09 – 14/10/1950",
    dek: "Chiến dịch mở đầu ở Đông Khê, vận dụng đánh điểm – diệt viện để phá tuyến Đường số 4 và khai thông một phần biên giới Việt – Trung.",
    context: ["Đến năm 1950, Pháp duy trì hệ thống cứ điểm dọc Đường số 4 nhằm khóa biên giới và cô lập căn cứ Việt Bắc.", "Bộ Tổng tư lệnh quyết định mở chiến dịch tiến công quy mô lớn, chọn Đông Khê làm trận then chốt mở màn."],
    sides: [["Quân đội Nhân dân Việt Nam", "Võ Nguyên Giáp; Hoàng Văn Thái", "Các đại đoàn, trung đoàn chủ lực cùng lực lượng địa phương và dân công.", "Tiêu diệt một bộ phận quân Pháp, phá tuyến biên giới và mở đường liên lạc quốc tế."], ["Liên hiệp Pháp", "Các chỉ huy khu biên giới Cao Bằng – Lạng Sơn", "Cụm cứ điểm Đông Khê, Cao Bằng, Thất Khê và các binh đoàn cơ động ứng cứu.", "Giữ Đường số 4, bảo vệ hệ thống đồn và rút lực lượng khi tuyến bị uy hiếp."]],
    phases: [["Đánh Đông Khê", "Cứ điểm then chốt bị tiến công và thất thủ sau hai ngày."], ["Diệt các binh đoàn ứng cứu", "Quân Việt Nam chặn lực lượng từ Thất Khê lên và cánh rút từ Cao Bằng xuống."], ["Phát triển chiến quả", "Hệ thống đồn Đường số 4 bị bỏ; khu vực biên giới rộng lớn được giải phóng."]],
    turns: ["Chuyển mục tiêu mở màn từ Cao Bằng sang Đông Khê.", "Mất Đông Khê buộc Pháp đưa lực lượng vào thế cứu viện và rút lui.", "Các trận Cốc Xá – điểm cao 477 chia cắt những cánh quân Pháp."],
    outcome: "Pháp mất phần lớn tuyến phòng thủ Đường số 4; biên giới được khai thông và thế chủ động chiến lược của Việt Nam tăng lên.",
    significance: ["Là chiến dịch tiến công quy mô lớn đầu tiên có ý nghĩa chiến lược.", "Mở rộng khả năng tiếp nhận viện trợ và liên lạc quốc tế.", "Đánh dấu bước trưởng thành của bộ đội chủ lực và chỉ huy chiến dịch."],
    certainty: "Ngày mở màn và cấu trúc chính rõ; thống kê chiến lợi phẩm, thương vong và phạm vi giải phóng thay đổi theo tiêu chí từng nguồn.",
    sources: [["Trận then chốt Đông Khê", "Báo Quân đội nhân dân", "https://www.qdnd.vn/quoc-phong-an-ninh/xay-dung-quan-doi/tran-then-chot-dong-khe-440782", "Mục tiêu mở màn và thời gian chiến dịch."], ["Kháng chiến chống thực dân Pháp 1945–1954", "Bảo tàng Lịch sử Quân sự Việt Nam", militaryOverview, "Tổng quan vai trò chiến dịch Biên giới."]],
  },
  {
    id: "khe-sanh-1968", date: "20/01 – 09/07/1968",
    dek: "Chuỗi giao tranh quanh Đường 9 – Khe Sanh buộc Hoa Kỳ tập trung lực lượng lớn vào vùng biên giới và cuối cùng rời căn cứ chiến đấu Khe Sanh.",
    context: ["Khe Sanh nằm gần đường 9 và khu phi quân sự, có vai trò giám sát hành lang phía tây Quảng Trị.", "Đầu năm 1968, Quân đội Nhân dân Việt Nam mở chiến dịch trên hướng Đường 9 trong bối cảnh Tổng tiến công Tết Mậu Thân."],
    sides: [["Quân đội Nhân dân Việt Nam", "Bộ Tư lệnh chiến dịch Đường 9 – Khe Sanh", "Bộ binh, pháo binh, phòng không và lực lượng hoạt động quanh các cứ điểm.", "Bao vây, đánh các vị trí ngoại vi, thu hút và tiêu hao lực lượng Mỹ trên hướng chiến lược."], ["Hoa Kỳ và Việt Nam Cộng hòa", "Bộ chỉ huy Thủy quân lục chiến Mỹ", "Lực lượng đồn trú Khe Sanh, không quân, pháo binh và các đơn vị giải tỏa.", "Giữ căn cứ, bảo đảm tiếp tế đường không và kiểm soát hướng tây Quảng Trị."]],
    phases: [["Đánh các cứ điểm ngoại vi", "Giao tranh mở màn ở Hướng Hóa, Làng Vây và các cao điểm quanh căn cứ."], ["Vây ép Khe Sanh", "Pháo kích kéo dài, đường bộ bị uy hiếp; Hoa Kỳ tổ chức cầu hàng không tiếp tế."], ["Giải tỏa và rút căn cứ", "Lực lượng Mỹ mở Pegasus; sau đó phá bỏ và rời căn cứ chiến đấu Khe Sanh."]],
    turns: ["Làng Vây thất thủ làm tăng sức ép quanh Khe Sanh.", "Không vận giúp căn cứ duy trì nhưng buộc Hoa Kỳ tập trung nguồn lực rất lớn.", "Quyết định rời căn cứ làm kết thúc vai trò của Khe Sanh theo mô hình cũ."],
    outcome: "Hoa Kỳ giữ được căn cứ trong giai đoạn vây ép nhưng rút khỏi Khe Sanh vào tháng 7/1968; hai bên đưa ra cách đánh giá thắng lợi khác nhau.",
    significance: ["Thu hút sự chú ý và lực lượng lớn trong thời điểm Tết Mậu Thân.", "Là một trong những trận pháo kích, vây ép và tiếp tế đường không lớn của chiến tranh.", "Cho thấy sự khác biệt giữa thắng lợi chiến thuật và mục tiêu chiến lược."],
    certainty: "Mốc thời gian cơ bản rõ; ý định “nghi binh” và thống kê thương vong còn tranh luận mạnh giữa sử liệu Việt Nam, Hoa Kỳ và nghiên cứu quốc tế.",
    sources: [["Chiến dịch Đường 9 – Khe Sanh: Đòn nghi binh chiến lược", "Báo Quân đội nhân dân", "https://www.qdnd.vn/vung-buoc-duoi-quan-ky-quyet-thang/nghe-thuat-quan-su/chien-dich-duong-9-khe-sanh-don-nghi-binh-chien-luoc-cho-cuoc-tong-tien-cong-va-noi-day-xuan-mau-than-1968-805926", "Quan điểm sử học quân sự Việt Nam về mục tiêu chiến dịch."], ["The Siege of Khe Sanh", "U.S. Marine Corps History Division", "https://www.usmcu.edu/Research/Marine-Corps-History-Division/", "Cổng nghiên cứu chính thức của Thủy quân lục chiến Hoa Kỳ để đối chiếu."]],
  },
  {
    id: "duong-9-nam-lao-1971", date: "30/01 – 23/03/1971",
    dek: "Chiến dịch phản công chống cuộc hành quân Lam Sơn 719 diễn ra dọc Đường 9 và Nam Lào, làm suy giảm mục tiêu cắt tuyến hậu cần chiến lược.",
    context: ["Đầu năm 1971, lực lượng Việt Nam Cộng hòa với hỗ trợ không quân, pháo binh và hậu cần Hoa Kỳ tiến qua biên giới Lào.", "Mục tiêu của Lam Sơn 719 là đánh vào hệ thống hậu cần trên đường mòn Hồ Chí Minh và thử nghiệm chính sách Việt Nam hóa chiến tranh."],
    sides: [["Quân đội Nhân dân Việt Nam và lực lượng Pathet Lào", "Bộ Tư lệnh Mặt trận Đường 9 – Nam Lào", "Các sư đoàn bộ binh, xe tăng, pháo binh, phòng không và lực lượng bảo vệ tuyến hậu cần.", "Chặn, chia cắt và đánh bại lực lượng tiến sâu trên hành lang Đường 9."], ["Việt Nam Cộng hòa và Hoa Kỳ", "Hoàng Xuân Lãm; hỗ trợ của Bộ chỉ huy Mỹ", "Quân bộ Việt Nam Cộng hòa; trực thăng, không quân và pháo binh Mỹ yểm trợ.", "Chiếm các mục tiêu Tchepone, phá hệ thống hậu cần và rút về theo kế hoạch."]],
    phases: [["Mở hành lang", "Lực lượng Mỹ hoạt động ở phía đông biên giới; quân Việt Nam Cộng hòa tiến theo Đường 9."], ["Giao chiến các điểm cao", "Các trận đánh lớn diễn ra quanh Bản Đông, các điểm cao và tuyến tiếp tế bằng trực thăng."], ["Rút quân", "Sau khi tiến đến khu vực Tchepone, lực lượng hành quân rút về trong các đợt đánh chặn quyết liệt."]],
    turns: ["Địa hình và phòng không hạn chế ưu thế trực thăng.", "Các cứ điểm phân tán bị chia cắt khỏi tuyến tiếp tế.", "Cuộc rút quân chịu sức ép liên tục, làm mục tiêu chiến dịch không được duy trì."],
    outcome: "Lam Sơn 719 kết thúc mà không cắt được lâu dài tuyến hậu cần; lực lượng tham chiến chịu tổn thất nặng và hai phía tiếp tục tuyên bố thắng lợi theo tiêu chí khác nhau.",
    significance: ["Tác động lớn đến đánh giá về Việt Nam hóa chiến tranh.", "Cho thấy vai trò hiệp đồng bộ binh – xe tăng – pháo binh – phòng không.", "Bảo toàn được hành lang hậu cần chiến lược qua Nam Lào."],
    certainty: "Các giai đoạn và địa bàn được ghi tương đối rõ; thương vong, số phương tiện bị phá hủy và cách đánh giá thành công của Lam Sơn 719 khác biệt sâu giữa nguồn hai phía.",
    sources: [["Chiến thắng Đường 9 – Nam Lào 1971", "Báo Quân đội nhân dân", "https://www.qdnd.vn/vung-buoc-duoi-quan-ky-quyet-thang/lich-su-quan-doi-nhan-dan-viet-nam/chien-thang-duong-9-nam-lao-1971-pha-san-mot-buoc-co-ban-chien-luoc-viet-nam-hoa-chien-tranh-cua-my-803354", "Phân kỳ ba đợt và đánh giá từ nguồn Việt Nam."], ["Lam Son 719", "U.S. Army Center of Military History", "https://history.army.mil/", "Cổng lịch sử quân sự Hoa Kỳ để đối chiếu chiến dịch."]],
  },
  {
    id: "xuan-loc-1975", date: "09–21/04/1975",
    dek: "Trận Xuân Lộc là cuộc đối đầu lớn trên cửa ngõ đông Sài Gòn; sau nhiều ngày giao tranh, tuyến phòng thủ rút bỏ và đường tiến vào chiến dịch cuối cùng được mở rộng.",
    context: ["Sau khi Huế, Đà Nẵng và phần lớn miền Trung thất thủ, Xuân Lộc trở thành nút phòng thủ quan trọng trên quốc lộ 1, phía đông Sài Gòn.", "Quân đoàn 4 và lực lượng phối thuộc mở chiến dịch nhằm phá tuyến phòng thủ, trong khi Quân lực Việt Nam Cộng hòa tăng cường lực lượng giữ thị xã."],
    sides: [["Quân Giải phóng", "Bộ Tư lệnh Quân đoàn 4", "Các sư đoàn bộ binh, pháo binh, xe tăng và lực lượng địa phương.", "Đánh chiếm khu vực Xuân Lộc, cắt các đường tiếp viện và mở cửa ngõ phía đông."], ["Việt Nam Cộng hòa", "Sư đoàn 18 và các lực lượng tăng viện", "Bộ binh, thiết giáp, pháo binh và không quân bảo vệ Long Khánh.", "Giữ nút giao chiến lược, làm chậm hướng tiến về Sài Gòn."]],
    phases: [["Tiến công thị xã", "Các mũi đánh vào Xuân Lộc gặp sức kháng cự mạnh và giao tranh giằng co."], ["Chuyển hóa cách đánh", "Lực lượng tiến công chuyển trọng tâm cắt quốc lộ, đánh hậu cứ và cô lập khu phòng thủ."], ["Rút khỏi Xuân Lộc", "Khi nguy cơ bị bao vây tăng, lực lượng phòng thủ rút theo hướng Bà Rịa."]],
    turns: ["Đánh trực diện ban đầu không tạo được đột phá nhanh.", "Chuyển sang cắt đường 1, đường 20 và đánh sở chỉ huy – hậu cứ làm thay đổi thế trận.", "Biến động chỉ huy chiến lược và nguy cơ cô lập dẫn đến lệnh rút."],
    outcome: "Xuân Lộc được kiểm soát ngày 21/4; cửa ngõ phía đông Sài Gòn không còn tuyến phòng thủ quy mô tương đương.",
    significance: ["Là trận đánh lớn cuối cùng trước Chiến dịch Hồ Chí Minh.", "Cho thấy khả năng điều chỉnh cách đánh giữa chiến dịch.", "Tác động mạnh đến đánh giá về khả năng tiếp tục phòng thủ của chính quyền Sài Gòn."],
    certainty: "Thời gian chiến dịch thống nhất; số thương vong, ranh giới từng ngày và nguyên nhân quyết định rút được diễn giải khác nhau trong hồi ký và nguồn của hai phía.",
    sources: [["Chiến dịch Xuân Lộc trong Đại thắng mùa Xuân 1975", "Báo Quân đội nhân dân", "https://www.qdnd.vn/quoc-phong-an-ninh/xay-dung-quan-doi/chien-dich-xuan-loc-trong-dai-thang-mua-xuan-1975-va-nhung-bai-hoc-kinh-nghiem-ve-chi-dao-nghe-thuat-quan-su-viet-nam-439640", "Bối cảnh và diễn biến chiến dịch."], ["Ngày 21-4-1975: Chiến dịch Xuân Lộc kết thúc", "Báo Quân đội nhân dân", "https://media.qdnd.vn/tiep-lua-truyen-thong/ngay-nay-nam-xua-21-4-1975-chien-dich-tien-cong-xuan-loc-ket-thuc-thang-loi-54412", "Mốc kết thúc và ý nghĩa cửa ngõ phía đông."]],
  },
  {
    id: "ho-chi-minh-1975", date: "26–30/04/1975",
    dek: "Năm cánh quân tiến vào Sài Gòn – Gia Định, đánh chiếm các mục tiêu chủ yếu và kết thúc chiến tranh trưa 30/4/1975.",
    context: ["Sau các chiến dịch Tây Nguyên, Huế – Đà Nẵng và Xuân Lộc, cục diện quân sự thay đổi nhanh trong tháng 3–4/1975.", "Bộ Chính trị quyết định mở chiến dịch cuối cùng với mục tiêu giải phóng Sài Gòn trước mùa mưa, sử dụng lực lượng hợp thành trên nhiều hướng."],
    sides: [["Quân Giải phóng", "Bộ Tư lệnh Chiến dịch Hồ Chí Minh; Văn Tiến Dũng", "Năm cánh quân gồm các quân đoàn chủ lực, binh chủng kỹ thuật và lực lượng tại chỗ.", "Đánh chiếm các mục tiêu chỉ huy, sân bay, căn cứ và trung tâm chính quyền Sài Gòn."], ["Việt Nam Cộng hòa", "Bộ Tổng tham mưu và các quân đoàn phòng thủ", "Các sư đoàn, biệt khu, lực lượng không quân – hải quân và phòng thủ đô thành.", "Giữ vành đai, bảo vệ trung tâm Sài Gòn và duy trì bộ máy chính quyền."]],
    phases: [["Phá tuyến ngoài", "Từ 26/4, các cánh quân đánh vào căn cứ và tuyến phòng thủ quanh Sài Gòn."], ["Tổng công kích", "Rạng sáng 30/4, năm hướng đồng loạt tiến tới các mục tiêu then chốt trong nội đô."], ["Kết thúc chiến dịch", "Xe tăng tiến vào Dinh Độc Lập; Tổng thống Dương Văn Minh tuyên bố đầu hàng trưa 30/4."]],
    turns: ["Xuân Lộc thất thủ và chính quyền Nguyễn Văn Thiệu sụp đổ làm suy giảm khả năng phòng thủ.", "Ưu thế lực lượng hợp thành trên năm hướng chia cắt hệ thống chỉ huy.", "Việc kiểm soát nhanh các mục tiêu then chốt hạn chế giao tranh kéo dài trong đô thị."],
    outcome: "Sài Gòn – Gia Định được kiểm soát, chính quyền Việt Nam Cộng hòa chấm dứt; chiến tranh Việt Nam kết thúc.",
    significance: ["Hoàn tất cuộc Tổng tiến công mùa Xuân 1975.", "Mở đường cho thống nhất nhà nước năm 1976.", "Tạo ra biến đổi sâu rộng về chính trị, xã hội và đời sống của hàng triệu người Việt Nam trong và ngoài nước."],
    certainty: "Mốc 26–30/4 và các mục tiêu chính rõ; giờ tiếp quản từng nơi, danh xưng đơn vị và trải nghiệm dân sự có thể khác nhau giữa tài liệu chính thức, báo chí và hồi ký.",
    sources: [["Chiến dịch Hồ Chí Minh lịch sử", "Báo Quân đội nhân dân", "https://www.qdnd.vn/vung-buoc-duoi-quan-ky-quyet-thang/lich-su-quan-doi-nhan-dan-viet-nam/chien-dich-ho-chi-minh-lich-su-ket-thuc-thang-loi-cuoc-khang-chien-chong-my-cuu-nuoc-807001", "Khái quát chiến dịch và mốc kết thúc."], ["Ngày 26-4-1975, Chiến dịch Hồ Chí Minh mở màn", "Báo Quân đội nhân dân", "https://www.qdnd.vn/45-mua-xuan-toan-thang/ngay-26-4-1975-chien-dich-ho-chi-minh-chinh-thuc-mo-man-616315", "Mốc mở màn và tổ chức chỉ huy."]],
  },
];

const illustrationByEventId: Record<string, string> = {
  "bach-dang-981": "/event-illustrations/unique/bach-dang-981.webp",
  "ung-chau-1075": "/event-illustrations/unique/ung-chau-1075.webp",
  "nhu-nguyet-1077": "/event-illustrations/unique/nhu-nguyet-1077.webp",
  "dong-bo-dau-1258": "/event-illustrations/unique/dong-bo-dau-1258.webp",
  "chuong-duong-ham-tu-1285": "/event-illustrations/unique/chuong-duong-ham-tu-1285.webp",
  "tot-dong-chuc-dong-1426": "/event-illustrations/unique/tot-dong-chuc-dong-1426.webp",
  "chi-lang-1427": "/event-illustrations/unique/chi-lang-1427.webp",
  "tra-ban-1471": "/event-illustrations/unique/tra-ban-1471.webp",
  "nhat-le-1648": "/event-illustrations/unique/nhat-le-1648.webp",
  "rach-gam-1785": "/event-illustrations/unique/rach-gam-1785.webp",
  "ngoc-hoi-1789": "/event-illustrations/unique/ngoc-hoi-1789.webp",
  "thi-nai-1801": "/event-illustrations/unique/thi-nai-1801.webp",
  "da-nang-1858": "/event-illustrations/unique/da-nang-1858.webp",
  "cau-giay-1873": "/event-illustrations/unique/cau-giay-1873.webp",
  "ba-dinh-1886": "/event-illustrations/unique/ba-dinh-1886.webp",
  "viet-bac-1947": "/event-illustrations/unique/viet-bac-1947.webp",
  "bien-gioi-1950": "/event-illustrations/unique/bien-gioi-1950.webp",
  "khe-sanh-1968": "/event-illustrations/unique/khe-sanh-1968.webp",
  "duong-9-nam-lao-1971": "/event-illustrations/unique/duong-9-nam-lao-1971.webp",
  "xuan-loc-1975": "/event-illustrations/unique/xuan-loc-1975.webp",
  "ho-chi-minh-1975": "/event-illustrations/unique/ho-chi-minh-1975.webp",
};

for (const eventId of Object.keys(illustrationByEventId)) {
  illustrationByEventId[eventId] = illustrationByEventId[eventId].replace("/unique/", "/labeled/");
}

const projectMedia = (summary: HistoricalEventSummary) => {
  const src = illustrationByEventId[summary.id];
  if (!src) throw new Error(`Không tìm thấy minh họa riêng cho ${summary.id}`);

  return {
    src,
    alt: `Minh họa diễn giải bối cảnh ${summary.name} ${summary.yearLabel}`,
    caption: `Minh họa AI diễn giải riêng bối cảnh ${summary.name} ${summary.yearLabel}; không phải ảnh tư liệu hay phục dựng chính xác trận đánh.`,
    credit: "Minh họa AI: Việt Niên Sử / Venn",
    license: "Tài sản dự án · xem điều kiện sử dụng",
    kind: "generated" as const,
    licenseUrl: "/phap-ly",
    sourceUrl: "/phap-ly",
  };
};

export function buildResearchedEventDetails(summaries: HistoricalEventSummary[]): HistoricalEventDetail[] {
  return seeds.map((seed) => {
    const summary = summaries.find((item) => item.id === seed.id);
    if (!summary) throw new Error(`Không tìm thấy sự kiện ${seed.id}`);
    return {
      ...summary,
      hasDetail: true,
      dateLabel: seed.date,
      dek: seed.dek,
      context: seed.context,
      objectives: seed.sides.map(([side, , , objective]) => ({ side, objective })),
      forces: seed.sides.map(([side, commanders, note]) => ({ side, commanders, note })),
      phases: seed.phases.map(([title, description], index) => ({ label: String(index + 1).padStart(2, "0"), title, description })),
      turningPoints: seed.turns,
      outcome: seed.outcome,
      significance: seed.significance,
      certaintyNote: seed.certainty,
      reviewedAt: "20/08/2026",
      media: projectMedia(summary),
      sources: seed.sources.map(([title, publisher, url, note]) => ({
        title,
        publisher,
        url,
        note,
        level: /Bảo tàng|Lưu trữ|Quân đội nhân dân|U\.S\.|UNESCO|Chính phủ|Cục/.test(publisher)
          ? "Nguồn chính thức" as const
          : "Nguồn tham khảo" as const,
      })),
    };
  });
}
