export type HistoricalEventSummary = {
  id: string;
  slug: string;
  name: string;
  year: number;
  yearLabel: string;
  periodId: string;
  location: string;
  summary: string;
  coordinates: [number, number];
  category: "Thủy chiến" | "Chiến dịch" | "Phòng tuyến" | "Chuỗi trận";
  hasDetail: boolean;
};

export type EventPhase = {
  label: string;
  title: string;
  description: string;
};

export type EventSource = {
  title: string;
  publisher: string;
  url: string;
  note: string;
};

export type EventMedia = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  license: string;
  licenseUrl?: string;
  sourceUrl: string;
};

export type HistoricalEventDetail = HistoricalEventSummary & {
  dateLabel: string;
  dek: string;
  context: string[];
  objectives: Array<{ side: string; objective: string }>;
  forces: Array<{ side: string; commanders: string; note: string }>;
  phases: EventPhase[];
  turningPoints: string[];
  outcome: string;
  significance: string[];
  certaintyNote: string;
  reviewedAt: string;
  media: EventMedia;
  sources: EventSource[];
};

export const historicalEvents: HistoricalEventSummary[] = [
  {
    id: "bach-dang-938",
    slug: "bach-dang-938",
    name: "Bạch Đằng",
    year: 938,
    yearLabel: "938",
    periodId: "ngo-quyen",
    location: "Cửa sông Bạch Đằng",
    summary: "Chiến thắng mở đầu thời kỳ độc lập tự chủ lâu dài.",
    coordinates: [106.78, 20.91],
    category: "Thủy chiến",
    hasDetail: true,
  },
  {
    id: "nhu-nguyet-1077",
    slug: "nhu-nguyet-1077",
    name: "Phòng tuyến Như Nguyệt",
    year: 1077,
    yearLabel: "1077",
    periodId: "dai-viet-1069",
    location: "Sông Cầu",
    summary: "Phòng tuyến bảo vệ trung tâm Đại Việt trong cuộc kháng chiến chống Tống.",
    coordinates: [106.05, 21.22],
    category: "Phòng tuyến",
    hasDetail: false,
  },
  {
    id: "bach-dang-1288",
    slug: "bach-dang-1288",
    name: "Bạch Đằng",
    year: 1288,
    yearLabel: "1288",
    periodId: "dai-viet-1306",
    location: "Vùng Tràng Kênh – Bạch Đằng",
    summary: "Trận thủy chiến tiêu biểu trong cuộc kháng chiến chống Nguyên lần thứ ba.",
    coordinates: [106.79, 20.92],
    category: "Thủy chiến",
    hasDetail: true,
  },
  {
    id: "chi-lang-1427",
    slug: "chi-lang-xuong-giang-1427",
    name: "Chi Lăng – Xương Giang",
    year: 1427,
    yearLabel: "1427",
    periodId: "hau-le-1428",
    location: "Lạng Sơn – Bắc Giang",
    summary: "Chuỗi trận quyết định ở giai đoạn cuối khởi nghĩa Lam Sơn.",
    coordinates: [106.45, 21.55],
    category: "Chuỗi trận",
    hasDetail: false,
  },
  {
    id: "rach-gam-1785",
    slug: "rach-gam-xoai-mut-1785",
    name: "Rạch Gầm – Xoài Mút",
    year: 1785,
    yearLabel: "1785",
    periodId: "tay-son",
    location: "Sông Tiền",
    summary: "Trận thủy chiến tiêu biểu do Nguyễn Huệ chỉ huy.",
    coordinates: [106.26, 10.34],
    category: "Thủy chiến",
    hasDetail: false,
  },
  {
    id: "ngoc-hoi-1789",
    slug: "ngoc-hoi-dong-da-1789",
    name: "Ngọc Hồi – Đống Đa",
    year: 1789,
    yearLabel: "1789",
    periodId: "tay-son",
    location: "Thăng Long",
    summary: "Chiến thắng đầu xuân Kỷ Dậu dưới thời Quang Trung.",
    coordinates: [105.84, 20.99],
    category: "Chuỗi trận",
    hasDetail: false,
  },
  {
    id: "dien-bien-phu-1954",
    slug: "dien-bien-phu-1954",
    name: "Điện Biên Phủ",
    year: 1954,
    yearLabel: "1954",
    periodId: "chia-cat-1954",
    location: "Lòng chảo Điện Biên",
    summary: "Chiến dịch kết thúc ngày 7/5/1954, tạo bước ngoặt cho tiến trình Genève.",
    coordinates: [103.01, 21.39],
    category: "Chiến dịch",
    hasDetail: true,
  },
];

export const eventDetails: HistoricalEventDetail[] = [
  {
    ...historicalEvents[0],
    dateLabel: "Cuối năm 938",
    dek: "Ngô Quyền biến quy luật thủy triều và địa hình cửa sông thành một thế trận chủ động, đánh bại đoàn thuyền Nam Hán tiến vào từ biển.",
    context: [
      "Sau khi Kiều Công Tiễn giết Dương Đình Nghệ và cầu viện Nam Hán, Ngô Quyền tiến quân ra Bắc để xử lý cuộc khủng hoảng quyền lực.",
      "Nam Hán đưa thủy quân do Lưu Hoằng Tháo chỉ huy tiến vào cửa sông Bạch Đằng. Đây là tuyến đường thủy quan trọng từ biển vào vùng trung tâm đồng bằng Bắc Bộ.",
    ],
    objectives: [
      { side: "Ngô Quyền", objective: "Chặn đạo viện binh Nam Hán ngay tại cửa ngõ đường thủy và bảo vệ nền tự chủ vừa giành lại." },
      { side: "Nam Hán", objective: "Theo đường biển tiến vào nội địa, hỗ trợ lực lượng thân Kiều Công Tiễn và tái lập ảnh hưởng." },
    ],
    forces: [
      { side: "Lực lượng Ngô Quyền", commanders: "Ngô Quyền", note: "Bố trí lực lượng ven sông, thuyền nhẹ và trận địa cọc tại khu vực cửa sông." },
      { side: "Thủy quân Nam Hán", commanders: "Lưu Hoằng Tháo", note: "Đoàn chiến thuyền từ biển tiến sâu vào sông Bạch Đằng." },
    ],
    phases: [
      { label: "01", title: "Chuẩn bị cửa sông", description: "Trận địa được chuẩn bị theo nhịp thủy triều; lực lượng phục kích bố trí hai bên bờ và các nhánh sông." },
      { label: "02", title: "Dẫn thuyền vào sâu", description: "Khi nước lên, lực lượng thuyền nhẹ giao chiến rồi chủ động lui, kéo đội hình Nam Hán qua khu vực đã chọn." },
      { label: "03", title: "Phản công khi nước rút", description: "Mực nước hạ làm đội hình đối phương mất khả năng cơ động; lực lượng chủ lực từ nhiều hướng phản công." },
      { label: "04", title: "Kết thúc trận đánh", description: "Đoàn thuyền Nam Hán tan vỡ; kế hoạch can thiệp từ biển thất bại." },
    ],
    turningPoints: [
      "Chọn đúng khu vực cửa sông có nhiều nhánh, bãi triều và núi đá ven bờ.",
      "Điều khiển thời điểm giao chiến theo chu kỳ nước lên – nước xuống.",
      "Kết hợp nghi binh trên sông với lực lượng mai phục từ hai bờ.",
    ],
    outcome: "Đạo thủy quân Nam Hán bị đánh bại. Ngô Quyền sau đó xưng vương và chọn Cổ Loa làm trung tâm chính trị.",
    significance: [
      "Chấm dứt một giai đoạn lệ thuộc kéo dài và mở ra thời kỳ độc lập tự chủ lâu dài.",
      "Đặt nền tảng cho nhà Ngô và quá trình xây dựng chính quyền độc lập trong thế kỷ X.",
      "Trở thành một mẫu mực sớm của nghệ thuật tổ chức thủy chiến trên sông ở Việt Nam.",
    ],
    certaintyNote: "Sử liệu xác nhận vai trò của Ngô Quyền, hướng tiến quân của Nam Hán và việc lợi dụng thủy triều. Vị trí, quy mô chính xác của từng bãi cọc và đội hình chiến đấu vẫn đang được khảo cổ học tiếp tục nghiên cứu.",
    reviewedAt: "16/08/2026",
    media: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Model_of_Battle_in_Bach_Dang_River_in_938_AD_-_DSC05544.JPG/960px-Model_of_Battle_in_Bach_Dang_River_in_938_AD_-_DSC05544.JPG",
      alt: "Mô hình trưng bày trận Bạch Đằng năm 938 tại Bảo tàng Lịch sử Quốc gia",
      caption: "Mô hình trưng bày trận thủy chiến Bạch Đằng năm 938 tại Bảo tàng Lịch sử Quốc gia.",
      credit: "Ảnh: Daderot / Wikimedia Commons",
      license: "CC0 1.0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Model_of_Battle_in_Bach_Dang_River_in_938_AD_-_DSC05544.JPG",
    },
    sources: [
      { title: "Ngô Quyền và chiến thắng Bạch Đằng năm 938", publisher: "Bảo tàng Lịch sử Quốc gia", url: "https://baotanglichsu.vn/vi/Articles/3098/13934/ngo-quyen-va-chien-thang-bach-djang-nam-938.html", note: "Khái quát nhân vật, bối cảnh và ý nghĩa lịch sử." },
      { title: "Chiến thắng Bạch Đằng lần thứ nhất", publisher: "Bảo tàng Lịch sử Quốc gia", url: "https://baotanglichsu.vn/vi/Articles/3097/15404/ky-niem-1075-nam-11-938-11-2013-chien-thang-bach-djang-lan-thu-nhat.html", note: "Địa hình cửa sông và không gian trận đánh." },
      { title: "Trận địa cọc Bạch Đằng", publisher: "Bảo tàng Lịch sử Quốc gia", url: "https://baotanglichsu.vn/vi/Articles/3096/13426/tran-djia-coc-bach-djang.html", note: "Thông tin trưng bày và nghiên cứu về các bãi cọc." },
    ],
  },
  {
    ...historicalEvents[2],
    dateLabel: "Mùa xuân năm 1288",
    dek: "Trong giai đoạn rút lui của quân Nguyên, Trần Quốc Tuấn tổ chức một trận quyết chiến trên sông Bạch Đằng, phối hợp bãi cọc, thủy triều và lực lượng mai phục.",
    context: [
      "Cuộc xâm lược Đại Việt lần thứ ba của nhà Nguyên gặp khó khăn về tiếp tế. Sau khi đoàn thuyền lương bị đánh, lực lượng Nguyên phải tính đường rút.",
      "Đạo thủy quân do Ô Mã Nhi và Phàn Tiếp chỉ huy rút theo tuyến sông Bạch Đằng, nơi quân Đại Việt đã chủ động chuẩn bị chiến trường.",
    ],
    objectives: [
      { side: "Đại Việt", objective: "Đánh vào đạo thủy quân trên đường rút, không để lực lượng này rời chiến trường trong đội hình nguyên vẹn." },
      { side: "Quân Nguyên", objective: "Đưa đội thuyền và lực lượng còn lại theo đường sông ra biển để rút về." },
    ],
    forces: [
      { side: "Quân Đại Việt", commanders: "Trần Quốc Tuấn; triều đình Trần Thánh Tông – Trần Nhân Tông", note: "Thủy quân, lực lượng ven bờ và các đơn vị mai phục tại những nhánh sông." },
      { side: "Thủy quân Nguyên", commanders: "Ô Mã Nhi, Phàn Tiếp", note: "Đội chiến thuyền rút theo sông trong điều kiện tiếp tế và phối hợp bị suy yếu." },
    ],
    phases: [
      { label: "01", title: "Chuẩn bị thế trận", description: "Bãi cọc được bố trí ở khu vực phù hợp; lực lượng thủy quân và ven bờ chiếm các vị trí chờ sẵn." },
      { label: "02", title: "Ép đội hình vào trận địa", description: "Các đơn vị cơ động quấy rối và dẫn đội thuyền Nguyên đi sâu vào tuyến sông khi nước còn cao." },
      { label: "03", title: "Khóa đường rút", description: "Khi thủy triều xuống, bãi cọc và địa hình sông làm đội hình thuyền lớn bị rối loạn, khó quay trở lại." },
      { label: "04", title: "Tổng công kích", description: "Thủy quân cùng lực lượng hai bờ đánh từ nhiều hướng, kết thúc trận quyết chiến trên sông." },
    ],
    turningPoints: [
      "Khủng hoảng tiếp tế khiến quân Nguyên phải rút khỏi Đại Việt.",
      "Đường rút của đạo thủy quân đã được dự đoán và chuẩn bị trước.",
      "Thời điểm phản công được lựa chọn khi thủy triều làm giảm khả năng cơ động của thuyền lớn.",
    ],
    outcome: "Đạo thủy quân Nguyên bị đánh bại; Ô Mã Nhi cùng nhiều tướng bị bắt. Cuộc xâm lược Đại Việt lần thứ ba kết thúc.",
    significance: [
      "Bảo toàn nền độc lập của Đại Việt sau ba lần đối đầu với quân Mông – Nguyên trong thế kỷ XIII.",
      "Thể hiện khả năng phối hợp chiến lược giữa hậu cần, nghi binh, địa hình và thời cơ.",
      "Để lại hệ thống di tích, bãi cọc và ký ức lịch sử phong phú tại vùng Quảng Yên – Hải Phòng ngày nay.",
    ],
    certaintyNote: "Các nguồn thống nhất về kết quả và vai trò chỉ huy của Trần Quốc Tuấn. Phạm vi từng bãi cọc, luồng tiến cụ thể và mối liên hệ giữa các di tích hiện còn là chủ đề nghiên cứu liên ngành.",
    reviewedAt: "16/08/2026",
    media: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Battle_of_B%E1%BA%A1ch_%C4%90%E1%BA%B1ng_1288_map_vi.png/960px-Battle_of_B%E1%BA%A1ch_%C4%90%E1%BA%B1ng_1288_map_vi.png",
      alt: "Bản đồ khái quát trận Bạch Đằng năm 1288",
      caption: "Bản đồ khái quát trận Bạch Đằng năm 1288; dùng để tham khảo diễn biến, không phải bản đồ tọa độ khảo cổ.",
      credit: "Lưu Ly / Wikimedia Commons",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Battle_of_B%E1%BA%A1ch_%C4%90%E1%BA%B1ng_1288_map_vi.png",
    },
    sources: [
      { title: "Tìm hiểu về những chiếc cọc Bạch Đằng năm 1288", publisher: "Bảo tàng Lịch sử Quốc gia", url: "https://baotanglichsu.vn/VI/Articles/3096/18594/tim-hieu-ve-nhung-chiec-coc-bach-djang-nam-1288-hien-djang-trung-bay-o-bao-tang-lich-su-quoc-gia.html", note: "Hiện vật cọc và khái quát trận đánh." },
      { title: "Chiến thắng Bạch Đằng 1288 là đỉnh cao nghệ thuật thủy chiến", publisher: "Bảo tàng Lịch sử Quốc gia", url: "https://baotanglichsu.vn/vi/Articles/1508/51843/nha-nghien-cuu-le-djong-son-chien-thang-bach-djang-1288-la-djinh-cao-cua-nghe-thuat-thuy-chien.html", note: "Phân tích chuẩn bị chiến trường và chiến thuật." },
      { title: "Phát hiện bãi cọc trong trận thủy chiến Bạch Đằng năm 1288", publisher: "Bảo tàng Lịch sử Quốc gia", url: "https://baotanglichsu.vn/vi/Articles/3127/71253/phat-hien-bai-coc-trong-tran-thuy-chien-tren-song-bach-djang-nam-1288.html", note: "Cập nhật khảo cổ và những vấn đề còn nghiên cứu." },
    ],
  },
  {
    ...historicalEvents[6],
    dateLabel: "13/3–7/5/1954",
    dek: "Sau 56 ngày đêm, chiến dịch Điện Biên Phủ kết thúc với việc toàn bộ tập đoàn cứ điểm của Pháp tại lòng chảo Điện Biên bị đánh bại.",
    context: [
      "Cuối năm 1953, quân đội Pháp xây dựng Điện Biên Phủ thành tập đoàn cứ điểm nhằm kiểm soát khu vực Tây Bắc và tạo một vị trí chiến lược trong Kế hoạch Navarre.",
      "Bộ chỉ huy Việt Minh quyết định mở chiến dịch và chuyển phương châm sang “đánh chắc, tiến chắc”, xây dựng hệ thống hậu cần, trận địa pháo và giao thông hào bao quanh lòng chảo.",
    ],
    objectives: [
      { side: "Việt Minh", objective: "Tiêu diệt tập đoàn cứ điểm, làm thay đổi cục diện chiến tranh và tạo điều kiện thuận lợi cho đàm phán." },
      { side: "Liên hiệp Pháp", objective: "Giữ căn cứ chiến lược, thu hút và làm suy yếu lực lượng chủ lực Việt Minh tại một trận địa đã chuẩn bị." },
    ],
    forces: [
      { side: "Quân đội Nhân dân Việt Nam", commanders: "Đại tướng Võ Nguyên Giáp", note: "Các đại đoàn chủ lực, pháo binh, công binh cùng hệ thống dân công và hậu cần quy mô lớn." },
      { side: "Quân Liên hiệp Pháp", commanders: "Christian de Castries", note: "Các đơn vị bộ binh, pháo binh và không quân tiếp tế cho hệ thống cứ điểm trong lòng chảo." },
    ],
    phases: [
      { label: "13–17/3", title: "Phá vỡ phân khu phía bắc", description: "Các cứ điểm Him Lam, Độc Lập và khu vực Bản Kéo lần lượt bị loại khỏi hệ thống phòng thủ." },
      { label: "30/3–30/4", title: "Siết chặt phân khu trung tâm", description: "Các trận đánh diễn ra quanh những cao điểm phía đông; giao thông hào được mở rộng để thu hẹp không gian phòng thủ." },
      { label: "1–7/5", title: "Tổng công kích", description: "Lực lượng tiến công đánh vào các cứ điểm còn lại và sở chỉ huy; chiến dịch kết thúc chiều 7/5." },
    ],
    turningPoints: [
      "Chuyển phương châm tác chiến sang “đánh chắc, tiến chắc”.",
      "Hệ thống hậu cần và trận địa pháo được duy trì qua địa hình núi cao, đường xa.",
      "Mạng lưới giao thông hào ngày càng áp sát, làm thu hẹp khả năng cơ động và tiếp tế của tập đoàn cứ điểm.",
    ],
    outcome: "Tập đoàn cứ điểm Điện Biên Phủ thất thủ ngày 7/5/1954. Kế hoạch Navarre bị phá sản và cục diện đàm phán tại Genève thay đổi căn bản.",
    significance: [
      "Tạo bước ngoặt quyết định trong cuộc kháng chiến chống Pháp của Việt Nam.",
      "Góp phần dẫn đến Hiệp định Genève năm 1954 và việc lập lại hòa bình ở Đông Dương.",
      "Trở thành một trường hợp nghiên cứu lớn về hậu cần, công sự và chiến dịch bao vây trong thế kỷ XX.",
    ],
    certaintyNote: "Mốc 13/3–7/5 và ba đợt tiến công được nhiều nguồn thống nhất. Cách gọi, phiên âm tên cứ điểm và thống kê lực lượng có thể khác nhau giữa tài liệu Việt Nam và Pháp; trang này tránh dùng số liệu khi chưa đối chiếu đồng nhất.",
    reviewedAt: "16/08/2026",
    media: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Victory_in_Battle_of_Dien_Bien_Phu.jpg/960px-Victory_in_Battle_of_Dien_Bien_Phu.jpg",
      alt: "Lực lượng Việt Minh tại sở chỉ huy Pháp ở Điện Biên Phủ năm 1954",
      caption: "Khung hình tư liệu về thời điểm lực lượng Việt Minh chiếm sở chỉ huy Pháp tại Điện Biên Phủ.",
      credit: "Hệ thống Bảo tàng Lịch sử Quân sự Việt Nam / Wikimedia Commons",
      license: "Phạm vi công cộng tại Việt Nam",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Victory_in_Battle_of_Dien_Bien_Phu.jpg",
    },
    sources: [
      { title: "Điện Biên Phủ, chiến dịch mang lại hòa bình ở Đông Dương", publisher: "Trung tâm Lưu trữ quốc gia I", url: "https://archives.org.vn/gioi-thieu-tai-lieu-nghiep-vu/dien-bien-phu-chien-dich-mang-lai-hoa-binh-o-dong-duong.htm", note: "Bối cảnh quốc tế và hệ quả đối với Hội nghị Genève." },
      { title: "Không quân Pháp trong chiến dịch Điện Biên Phủ", publisher: "Cục Văn thư và Lưu trữ nhà nước", url: "https://www.archives.org.vn/gioi-thieu-tai-lieu-nghiep-vu/khong-quan-phap-trong-chien-dich-dien-bien-phu.htm", note: "Tài liệu lưu trữ về hoạt động không quân và tiếp tế." },
      { title: "Trận mở màn tiêu diệt trung tâm đề kháng Him Lam", publisher: "Bảo tàng Lịch sử Quốc gia", url: "https://baotanglichsu.vn/vi/Articles/3097/15919/ky-niem-60-nam-chien-thang-lich-su-djien-bien-phu-1954-2014tran-mo-man-tieu-diet-trung-tam-dje-khang-him-lam-13-3-1954.html", note: "Mốc mở màn và cấu trúc ba đợt của chiến dịch." },
    ],
  },
];

export const publishedEventDetails = eventDetails;

export const getEventDetail = (slug: string) => eventDetails.find((event) => event.slug === slug);

