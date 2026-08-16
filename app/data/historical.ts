export type ControlKind = "direct" | "autonomous" | "influence";

export type HistoricalPeriod = {
  id: string;
  year: number;
  displayYear: string;
  range: string;
  eyebrow: string;
  name: string;
  subtitle: string;
  description: string;
  territoryNote: string;
  confidence: "Cao" | "Trung bình" | "Thấp";
  color: string;
  center: [number, number];
  zoom: number;
  markers: Array<{ name: string; coordinates: [number, number]; role: string }>;
  sourceNote: string;
};

export type TerritoryFeature = {
  type: "Feature";
  properties: {
    periodId: string;
    name: string;
    control: ControlKind;
    confidence: "high" | "medium" | "low";
    height: number;
    color: string;
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
};

const polygon = (
  periodId: string,
  name: string,
  control: ControlKind,
  confidence: "high" | "medium" | "low",
  height: number,
  color: string,
  coordinates: number[][],
): TerritoryFeature => ({
  type: "Feature",
  properties: { periodId, name, control, confidence, height, color },
  geometry: { type: "Polygon", coordinates: [coordinates] },
});

export const periods: HistoricalPeriod[] = [
  {
    id: "van-lang", year: -2879, displayYear: "2879 TCN", range: "truyền thống: 2879–258 TCN",
    eyebrow: "Sơ kỳ dựng nước", name: "Văn Lang", subtitle: "Không gian các bộ lạc Lạc Việt",
    description: "Văn Lang được truyền thống sử học Việt Nam xem là nhà nước sớm của các vua Hùng; niên đại và ranh giới chưa thể xác định chính xác.",
    territoryNote: "Không gian lưu vực sông Hồng, sông Mã và sông Cả — thể hiện hoàn toàn ước lệ.", confidence: "Thấp", color: "#bfa96b",
    center: [105.6, 20.7], zoom: 4.6,
    markers: [{ name: "Phong Châu", coordinates: [105.3, 21.4], role: "Trung tâm truyền thống" }],
    sourceNote: "Mốc 2879 TCN thuộc niên đại truyền thống; polygon không phải đường biên được khảo cổ học xác nhận.",
  },
  {
    id: "au-lac",
    year: -257,
    displayYear: "257 TCN",
    range: "257–179 TCN",
    eyebrow: "Sơ kỳ dựng nước",
    name: "Âu Lạc",
    subtitle: "Thục Phán hợp nhất Âu Việt và Lạc Việt",
    description:
      "Một nhà nước sơ khai gắn với trung tâm Cổ Loa. Ranh giới thời kỳ này chỉ có thể phục dựng tương đối từ khảo cổ học và thư tịch.",
    territoryNote: "Bắc Bộ, Bắc Trung Bộ và vùng tiếp giáp phía bắc — phạm vi ước lệ.",
    confidence: "Thấp",
    color: "#d6b56a",
    center: [105.7, 20.7],
    zoom: 4.7,
    markers: [{ name: "Cổ Loa", coordinates: [105.87, 21.12], role: "Kinh đô" }],
    sourceNote: "Polygon minh họa; cần đối chiếu khảo cổ Đông Sơn và nghiên cứu về Cổ Loa.",
  },
  {
    id: "nam-viet", year: -204, displayYear: "204 TCN", range: "204–111 TCN",
    eyebrow: "Không gian Lĩnh Nam", name: "Nam Việt", subtitle: "Vương quốc do Triệu Đà thành lập",
    description: "Nam Việt có trung tâm tại Phiên Ngung và bao gồm nhiều cộng đồng ở vùng Lĩnh Nam. Cách xếp Nam Việt vào lịch sử Việt Nam còn có các quan điểm khác nhau.",
    territoryNote: "Quảng Đông, Quảng Tây và phần bắc Việt Nam ngày nay — ranh giới khái quát.", confidence: "Thấp", color: "#c8a85f",
    center: [108.4, 21.5], zoom: 3.7,
    markers: [{ name: "Phiên Ngung", coordinates: [113.27, 23.13], role: "Kinh đô" }],
    sourceNote: "Không đồng nhất lãnh thổ Nam Việt cổ với biên giới hay chủ quyền hiện đại.",
  },
  {
    id: "bac-thuoc-1", year: -111, displayYear: "111 TCN", range: "111 TCN–39",
    eyebrow: "Bắc thuộc", name: "Bắc thuộc lần I", subtitle: "Nhà Hán đặt bộ máy quận huyện",
    description: "Sau khi Nam Việt bị chinh phục, nhà Hán tổ chức các quận Giao Chỉ, Cửu Chân và Nhật Nam trên phần đất Việt Nam ngày nay.",
    territoryNote: "Phạm vi ba quận được giản lược theo địa lý hiện đại.", confidence: "Trung bình", color: "#7d7a72",
    center: [106.0, 18.8], zoom: 4.2,
    markers: [{ name: "Luy Lâu", coordinates: [106.06, 21.09], role: "Trị sở Giao Chỉ" }],
    sourceNote: "Ranh giới hành chính cổ thay đổi theo thời gian và chỉ được thể hiện gần đúng.",
  },
  {
    id: "trung-vuong", year: 40, displayYear: "40", range: "40–43",
    eyebrow: "Khởi nghĩa và tự chủ", name: "Trưng Vương", subtitle: "Hai Bà Trưng giành quyền quản lý nhiều quận",
    description: "Cuộc khởi nghĩa do Trưng Trắc và Trưng Nhị lãnh đạo giành lại quyền tự chủ trong một thời gian ngắn trên một phần rộng của Lĩnh Nam.",
    territoryNote: "Vùng kiểm soát và ảnh hưởng được thể hiện với độ chắc chắn thấp.", confidence: "Thấp", color: "#ca6f4c",
    center: [107.0, 20.2], zoom: 4.0,
    markers: [{ name: "Mê Linh", coordinates: [105.72, 21.18], role: "Trung tâm khởi nghĩa" }],
    sourceNote: "Không có dữ liệu đủ chi tiết để dựng đường biên chính xác cho toàn bộ 65 thành được thư tịch nhắc tới.",
  },
  {
    id: "bac-thuoc-2", year: 43, displayYear: "43", range: "43–544",
    eyebrow: "Bắc thuộc", name: "Bắc thuộc lần II", subtitle: "Giao Châu qua nhiều triều đại",
    description: "Khu vực tiếp tục nằm trong hệ thống hành chính của các triều đại Trung Quốc, đồng thời xuất hiện nhiều cuộc nổi dậy địa phương.",
    territoryNote: "Giao Châu và các quận phía nam — phạm vi thay đổi theo từng triều đại.", confidence: "Trung bình", color: "#777873",
    center: [106.0, 18.8], zoom: 4.2,
    markers: [{ name: "Long Biên", coordinates: [105.85, 21.05], role: "Trị sở khu vực" }],
    sourceNote: "Mốc gộp nhiều triều đại để timeline dễ đọc; bản đồ không đại diện mọi biến động nội bộ.",
  },
  {
    id: "van-xuan", year: 544, displayYear: "544", range: "544–602",
    eyebrow: "Tự chủ", name: "Vạn Xuân", subtitle: "Lý Bí lập quốc",
    description: "Lý Bí xưng đế, đặt quốc hiệu Vạn Xuân và xây dựng chính quyền tự chủ sau khi đánh đuổi bộ máy nhà Lương.",
    territoryNote: "Bắc Bộ và Bắc Trung Bộ — phạm vi miền núi được thể hiện khái quát.", confidence: "Trung bình", color: "#c99852",
    center: [105.8, 19.8], zoom: 4.5,
    markers: [{ name: "Long Biên", coordinates: [105.85, 21.05], role: "Trung tâm chính trị" }],
    sourceNote: "Biên giới phục dựng từ mô tả hành chính và địa danh lịch sử.",
  },
  {
    id: "bac-thuoc-3", year: 602, displayYear: "602", range: "602–905",
    eyebrow: "Bắc thuộc", name: "Bắc thuộc lần III", subtitle: "Tùy, Đường và An Nam đô hộ phủ",
    description: "Nhà Tùy rồi nhà Đường tái lập quyền quản lý; Đại La dần trở thành trung tâm hành chính quan trọng của vùng.",
    territoryNote: "An Nam đô hộ phủ — phạm vi quản lý thực tế không đồng đều.", confidence: "Trung bình", color: "#727570",
    center: [106.0, 19.2], zoom: 4.25,
    markers: [{ name: "Đại La", coordinates: [105.85, 21.03], role: "Trị sở" }],
    sourceNote: "Đường ranh là lớp khái quát theo tỷ lệ khu vực.",
  },
  {
    id: "tinh-hai-quan", year: 905, displayYear: "905", range: "905–938",
    eyebrow: "Giành quyền tự chủ", name: "Tĩnh Hải quân", subtitle: "Họ Khúc xây nền tự chủ",
    description: "Khúc Thừa Dụ và những người kế tục nắm quyền tại Tĩnh Hải quân, cải tổ bộ máy địa phương và tạo nền tảng cho nền độc lập.",
    territoryNote: "Các châu ở Bắc Bộ và Bắc Trung Bộ, với mức kiểm soát khác nhau.", confidence: "Trung bình", color: "#c49a55",
    center: [105.8, 20.0], zoom: 4.5,
    markers: [{ name: "Đại La", coordinates: [105.85, 21.03], role: "Trung tâm" }],
    sourceNote: "Phạm vi các châu được quy chiếu gần đúng lên bản đồ hiện đại.",
  },
  {
    id: "ngo-quyen", year: 938, displayYear: "938", range: "938–965",
    eyebrow: "Độc lập", name: "Ngô Quyền và nhà Ngô", subtitle: "Bạch Đằng mở kỷ nguyên độc lập",
    description: "Sau chiến thắng Bạch Đằng năm 938, Ngô Quyền xưng vương, chọn Cổ Loa làm trung tâm và củng cố chính quyền độc lập.",
    territoryNote: "Bắc Bộ và một phần Bắc Trung Bộ; quyền lực trung ương còn phân tán.", confidence: "Trung bình", color: "#cca052",
    center: [105.7, 20.3], zoom: 4.6,
    markers: [{ name: "Cổ Loa", coordinates: [105.87, 21.12], role: "Kinh đô" }],
    sourceNote: "Không gian kiểm soát thực tế có thể khác đáng kể giữa trung tâm và các vùng xa.",
  },
  {
    id: "dai-co-viet",
    year: 968,
    displayYear: "968",
    range: "968–1009",
    eyebrow: "Thống nhất",
    name: "Đại Cồ Việt",
    subtitle: "Đinh Bộ Lĩnh thống nhất các sứ quân",
    description:
      "Quốc gia độc lập được củng cố sau thời kỳ phân liệt, với trung tâm quyền lực tại Hoa Lư.",
    territoryNote: "Bắc Bộ và vùng Thanh–Nghệ; ranh giới miền núi mang tính vùng ảnh hưởng.",
    confidence: "Trung bình",
    color: "#d3a654",
    center: [105.5, 19.9],
    zoom: 4.6,
    markers: [{ name: "Hoa Lư", coordinates: [105.91, 20.28], role: "Kinh đô" }],
    sourceNote: "Phạm vi miền núi được thể hiện như vùng kiểm soát tương đối.",
  },
  {
    id: "dai-viet-1069", year: 1069, displayYear: "1069", range: "1069–1225",
    eyebrow: "Đại Việt thời Lý", name: "Mở cõi đến Ma Linh", subtitle: "Bố Chính, Địa Lý và Ma Linh nhập vào Đại Việt",
    description: "Sau chiến dịch năm 1069, ba châu phía bắc của Champa được sáp nhập, đưa biên giới phía nam của Đại Việt đến vùng Quảng Trị ngày nay.",
    territoryNote: "Bắc Bộ, Thanh–Nghệ và vùng Quảng Bình–bắc Quảng Trị.", confidence: "Trung bình", color: "#d7a050",
    center: [106.0, 19.0], zoom: 4.35,
    markers: [{ name: "Thăng Long", coordinates: [105.84, 21.03], role: "Kinh đô" }, { name: "Ma Linh", coordinates: [107.0, 17.0], role: "Biên viễn" }],
    sourceNote: "Tên và vị trí các châu cổ được quy chiếu gần đúng.",
  },
  {
    id: "dai-viet-1306",
    year: 1306,
    displayYear: "1306",
    range: "1306–1400",
    eyebrow: "Mở cõi về Nam",
    name: "Đại Việt thời Trần",
    subtitle: "Châu Ô và Châu Rí trở thành Thuận Châu, Hóa Châu",
    description:
      "Sau cuộc hôn phối Huyền Trân – Chế Mân, biên giới phía nam của Đại Việt tiến đến khu vực đèo Hải Vân.",
    territoryNote: "Từ vùng biên phía bắc đến Thuận Hóa; phía nam vẫn là các lãnh thổ Chăm.",
    confidence: "Trung bình",
    color: "#df9f4b",
    center: [106.0, 19.0],
    zoom: 4.35,
    markers: [
      { name: "Thăng Long", coordinates: [105.84, 21.03], role: "Kinh đô" },
      { name: "Hóa Châu", coordinates: [107.49, 16.47], role: "Biên viễn" },
    ],
    sourceNote: "Đường ranh phía tây và vùng dân tộc thiểu số là phục dựng khái quát.",
  },
  {
    id: "minh-thuoc", year: 1407, displayYear: "1407", range: "1407–1427",
    eyebrow: "Mất quyền tự chủ", name: "Minh thuộc", subtitle: "Đại Việt bị đặt dưới bộ máy nhà Minh",
    description: "Sau khi nhà Hồ thất bại, vùng đất Đại Việt bị tổ chức thành Giao Chỉ dưới quyền nhà Minh cho đến thắng lợi của khởi nghĩa Lam Sơn.",
    territoryNote: "Phần lớn không gian Đại Việt trước đó; việc kiểm soát thay đổi trong thời kỳ khởi nghĩa.", confidence: "Trung bình", color: "#6f7470",
    center: [106.0, 18.8], zoom: 4.2,
    markers: [{ name: "Đông Quan", coordinates: [105.84, 21.03], role: "Trị sở" }],
    sourceNote: "Bản đồ thể hiện hành chính danh nghĩa, không phải diễn biến kiểm soát theo từng năm.",
  },
  {
    id: "hau-le-1428", year: 1428, displayYear: "1428", range: "1428–1470",
    eyebrow: "Khôi phục", name: "Hậu Lê", subtitle: "Lê Lợi dựng lại Đại Việt",
    description: "Khởi nghĩa Lam Sơn kết thúc thời Minh thuộc. Nhà Hậu Lê được thành lập và khôi phục hệ thống quản lý trên lãnh thổ Đại Việt.",
    territoryNote: "Khôi phục phần lớn phạm vi thời Trần; biên giới phía tây vẫn là các vùng ảnh hưởng.", confidence: "Trung bình", color: "#d39b47",
    center: [106.0, 18.8], zoom: 4.25,
    markers: [{ name: "Đông Kinh", coordinates: [105.84, 21.03], role: "Kinh đô" }],
    sourceNote: "Ranh giới đầu thời Lê sơ được thể hiện ở mức khái quát.",
  },
  {
    id: "le-thanh-tong-1471", year: 1471, displayYear: "1471", range: "1471–1527",
    eyebrow: "Mở cõi", name: "Đại Việt thời Lê Thánh Tông", subtitle: "Biên giới phía nam tiến đến Cù Mông",
    description: "Sau chiến dịch năm 1471, vùng Vijaya được tổ chức thành thừa tuyên Quảng Nam, tạo thay đổi lớn ở miền Trung.",
    territoryNote: "Từ biên giới phía bắc đến vùng Bình Định–Phú Yên ngày nay.", confidence: "Trung bình", color: "#dc9140",
    center: [106.3, 17.8], zoom: 4.1,
    markers: [{ name: "Đông Kinh", coordinates: [105.84, 21.03], role: "Kinh đô" }, { name: "Vijaya", coordinates: [109.0, 13.78], role: "Vùng mới sáp nhập" }],
    sourceNote: "Không gian cư trú và quyền lực địa phương không trùng hoàn toàn với đường biên hành chính.",
  },
  {
    id: "nam-bac-trieu", year: 1527, displayYear: "1527", range: "1527–1592",
    eyebrow: "Phân tranh", name: "Nam–Bắc triều", subtitle: "Nhà Mạc và Lê trung hưng",
    description: "Nhà Mạc kiểm soát Đông Kinh và phần lớn miền Bắc, trong khi lực lượng Lê trung hưng xây dựng căn cứ từ Thanh Hóa và mở rộng dần.",
    territoryNote: "Hai vùng quyền lực biến động liên tục; lớp bản đồ chỉ là lát cắt khái quát.", confidence: "Trung bình", color: "#c87847",
    center: [105.8, 19.5], zoom: 4.35,
    markers: [{ name: "Đông Kinh", coordinates: [105.84, 21.03], role: "Bắc triều" }, { name: "Tây Đô", coordinates: [105.6, 19.8], role: "Nam triều" }],
    sourceNote: "Không dùng polygon này để suy ra ranh giới ổn định trong toàn bộ giai đoạn.",
  },
  {
    id: "dang-trong-ngoai",
    year: 1698,
    displayYear: "1698",
    range: "1627–1775",
    eyebrow: "Hai chính quyền",
    name: "Đàng Ngoài — Đàng Trong",
    subtitle: "Một không gian, hai trung tâm quyền lực",
    description:
      "Vua Lê – chúa Trịnh kiểm soát Đàng Ngoài; các chúa Nguyễn quản lý Đàng Trong và mở rộng hệ thống hành chính về phía Nam.",
    territoryNote: "Hai vùng kiểm soát trực tiếp cùng không gian tự trị của Trấn Thuận Thành.",
    confidence: "Trung bình",
    color: "#db7644",
    center: [106.3, 16.2],
    zoom: 3.95,
    markers: [
      { name: "Thăng Long", coordinates: [105.84, 21.03], role: "Đàng Ngoài" },
      { name: "Phú Xuân", coordinates: [107.58, 16.46], role: "Đàng Trong" },
      { name: "Gia Định", coordinates: [106.69, 10.78], role: "Phủ mới" },
    ],
    sourceNote: "Trấn Thuận Thành được phân lớp tự trị thay vì gộp hoàn toàn vào Đàng Trong.",
  },
  {
    id: "tay-son", year: 1788, displayYear: "1788", range: "1778–1802",
    eyebrow: "Thống nhất", name: "Tây Sơn", subtitle: "Quang Trung và quá trình thống nhất",
    description: "Phong trào Tây Sơn lần lượt kiểm soát Đàng Trong và Đàng Ngoài, chấm dứt cục diện Trịnh–Nguyễn và thiết lập một triều đại mới.",
    territoryNote: "Gần toàn bộ lãnh thổ từ Bắc Bộ đến Nam Bộ, với kiểm soát thay đổi theo từng năm.", confidence: "Trung bình", color: "#d66d3f",
    center: [106.4, 16.2], zoom: 3.95,
    markers: [{ name: "Phú Xuân", coordinates: [107.58, 16.46], role: "Kinh đô" }, { name: "Quy Nhơn", coordinates: [109.22, 13.78], role: "Căn cứ khởi phát" }],
    sourceNote: "Lát cắt đại diện, không mô tả đầy đủ nội chiến Tây Sơn–Nguyễn.",
  },
  {
    id: "gia-long-1802", year: 1802, displayYear: "1802", range: "1802–1832",
    eyebrow: "Thống nhất", name: "Việt Nam thời Gia Long", subtitle: "Một triều đình quản lý từ Bắc đến Nam",
    description: "Nguyễn Ánh lên ngôi Gia Long, lập triều Nguyễn và thống nhất lãnh thổ dưới một chính quyền trung ương đặt tại Huế.",
    territoryNote: "Lãnh thổ đất liền có hình dạng gần Việt Nam hiện đại.", confidence: "Cao", color: "#d6613c",
    center: [106.1, 16.2], zoom: 3.95,
    markers: [{ name: "Huế", coordinates: [107.58, 16.46], role: "Kinh đô" }],
    sourceNote: "Đường biên miền núi và quan hệ với các vùng phụ thuộc cần được đọc theo bối cảnh thế kỷ XIX.",
  },
  {
    id: "dai-nam-1835",
    year: 1835,
    displayYear: "1835",
    range: "1835–1841",
    eyebrow: "Thời Minh Mạng",
    name: "Đại Nam và Trấn Tây Thành",
    subtitle: "Kiểm soát trực tiếp và ảnh hưởng được tách riêng",
    description:
      "Triều Nguyễn hoàn thiện hệ thống tỉnh tại Đại Nam và thiết lập bộ máy quản lý Trấn Tây tại phần lớn Campuchia trong một giai đoạn ngắn.",
    territoryNote: "Đại Nam là lớp kiểm soát trực tiếp; Trấn Tây được thể hiện như lớp hành chính có độ chắc chắn thấp hơn.",
    confidence: "Trung bình",
    color: "#d75a3a",
    center: [105.8, 15.4],
    zoom: 3.8,
    markers: [
      { name: "Huế", coordinates: [107.58, 16.46], role: "Kinh đô" },
      { name: "Trấn Tây", coordinates: [104.92, 11.56], role: "Trung tâm hành chính" },
    ],
    sourceNote: "Không đồng nhất vùng ảnh hưởng với biên giới chủ quyền hiện đại.",
  },
  {
    id: "nam-ky-1867", year: 1867, displayYear: "1867", range: "1862–1867",
    eyebrow: "Thu hẹp lãnh thổ", name: "Nam Kỳ tách khỏi Đại Nam", subtitle: "Sáu tỉnh lần lượt rơi vào tay Pháp",
    description: "Ba tỉnh miền Đông được nhượng năm 1862 và ba tỉnh miền Tây bị Pháp chiếm năm 1867, tách Nam Kỳ khỏi quyền quản lý của triều Nguyễn.",
    territoryNote: "Đại Nam ở phía bắc và thuộc địa Nam Kỳ ở phía nam được tách thành hai lớp.", confidence: "Cao", color: "#b85a45",
    center: [106.1, 16.0], zoom: 3.95,
    markers: [{ name: "Huế", coordinates: [107.58, 16.46], role: "Kinh đô Đại Nam" }, { name: "Sài Gòn", coordinates: [106.69, 10.78], role: "Trung tâm Nam Kỳ" }],
    sourceNote: "Mốc 1867 nhấn mạnh thay đổi hành chính ở Nam Kỳ.",
  },
  {
    id: "phap-thuoc-1887", year: 1887, displayYear: "1887", range: "1887–1945",
    eyebrow: "Thời thuộc địa", name: "Liên bang Đông Dương", subtitle: "Bắc Kỳ, Trung Kỳ và Nam Kỳ dưới các chế độ khác nhau",
    description: "Không gian Việt Nam bị chia thành Bắc Kỳ, Trung Kỳ và Nam Kỳ trong Liên bang Đông Dương thuộc Pháp, với mô hình quản trị khác nhau.",
    territoryNote: "Biên giới đất liền gần hiện đại, nhưng ba kỳ không có cùng địa vị pháp lý.", confidence: "Cao", color: "#68746f",
    center: [106.1, 16.2], zoom: 3.95,
    markers: [{ name: "Hà Nội", coordinates: [105.84, 21.03], role: "Trung tâm liên bang" }, { name: "Huế", coordinates: [107.58, 16.46], role: "Kinh đô triều Nguyễn" }, { name: "Sài Gòn", coordinates: [106.69, 10.78], role: "Trung tâm Nam Kỳ" }],
    sourceNote: "Bản đồ chỉ phân lớp hành chính cấp lớn, không mô tả toàn bộ thay đổi theo thời gian.",
  },
  {
    id: "doc-lap-1945", year: 1945, displayYear: "1945", range: "1945–1954",
    eyebrow: "Độc lập", name: "Việt Nam Dân chủ Cộng hòa", subtitle: "Tuyên ngôn Độc lập và cuộc kháng chiến",
    description: "Nước Việt Nam Dân chủ Cộng hòa tuyên bố độc lập ngày 2/9/1945. Quyền kiểm soát lãnh thổ thay đổi nhiều trong cuộc kháng chiến sau đó.",
    territoryNote: "Thể hiện yêu sách lãnh thổ toàn quốc; không đồng nhất với vùng kiểm soát quân sự từng thời điểm.", confidence: "Trung bình", color: "#d34f3c",
    center: [106.1, 16.2], zoom: 3.95,
    markers: [{ name: "Hà Nội", coordinates: [105.84, 21.03], role: "Thủ đô" }],
    sourceNote: "Cần một lớp dữ liệu riêng nếu muốn mô tả diễn biến kiểm soát 1946–1954.",
  },
  {
    id: "chia-cat-1954",
    year: 1954,
    displayYear: "1954",
    range: "1954–1975",
    eyebrow: "Chia cắt tạm thời",
    name: "Hai vùng quản lý",
    subtitle: "Giới tuyến quân sự gần vĩ tuyến 17",
    description:
      "Sau Hiệp định Genève, lãnh thổ được phân thành hai vùng tập kết quân sự. Prototype này thể hiện ranh giới khái quát, không mô tả biến động kiểm soát theo từng năm chiến tranh.",
    territoryNote: "Miền Bắc và miền Nam được hiển thị như hai lớp chính quyền song song.",
    confidence: "Cao",
    color: "#cf4b36",
    center: [106.1, 16.2],
    zoom: 3.95,
    markers: [
      { name: "Hà Nội", coordinates: [105.84, 21.03], role: "Miền Bắc" },
      { name: "Sài Gòn", coordinates: [106.69, 10.78], role: "Miền Nam" },
    ],
    sourceNote: "Giới tuyến được giản lược cho tỷ lệ khu vực; không phải biên giới quốc gia vĩnh viễn.",
  },
  {
    id: "viet-nam-hien-dai",
    year: 1976,
    displayYear: "1976",
    range: "1976–nay",
    eyebrow: "Thống nhất",
    name: "Việt Nam hiện đại",
    subtitle: "Cộng hòa Xã hội Chủ nghĩa Việt Nam",
    description:
      "Đất nước thống nhất về mặt nhà nước. Lớp hiện đại dùng đường bờ và biên giới khái quát ở tỷ lệ khu vực.",
    territoryNote: "Lãnh thổ đất liền hiện đại; biển và vùng yêu sách cần một layer pháp lý riêng.",
    confidence: "Cao",
    color: "#c83d32",
    center: [106.1, 16.2],
    zoom: 3.95,
    markers: [
      { name: "Hà Nội", coordinates: [105.84, 21.03], role: "Thủ đô" },
      { name: "TP. Hồ Chí Minh", coordinates: [106.69, 10.78], role: "Đô thị lớn" },
    ],
    sourceNote: "Đường bờ hiện đại và lớp 34 tỉnh/thành dùng hình học WGS84 cập nhật sau sắp xếp năm 2025.",
  },
];

const vietnamNorth = [
  [102.2, 22.5], [103.4, 23.35], [105.3, 23.15], [106.8, 22.8], [107.8, 21.6],
  [107.1, 20.2], [106.5, 19.0], [105.4, 18.1], [104.5, 18.8], [103.1, 20.0],
  [102.2, 22.5],
];

const vietnamSpineToHue = [
  ...vietnamNorth.slice(0, -1), [105.8, 17.1], [107.6, 16.2], [108.2, 16.1],
  [106.8, 17.8], [105.4, 18.1], [104.5, 18.8], [103.1, 20.0], [102.2, 22.5],
];

const vietnamFull = [
  [102.2, 22.5], [103.4, 23.35], [105.3, 23.15], [106.8, 22.8], [107.8, 21.6],
  [106.8, 19.3], [107.7, 17.4], [108.9, 15.4], [109.3, 13.2], [109.2, 11.2],
  [107.6, 10.0], [106.7, 8.55], [104.75, 8.65], [104.55, 10.4], [105.1, 12.0],
  [106.2, 13.5], [106.0, 15.8], [105.2, 17.8], [104.4, 18.8], [103.1, 20.0],
  [102.2, 22.5],
];

export const territoryData = {
  type: "FeatureCollection" as const,
  features: [
    polygon("au-lac", "Âu Lạc", "direct", "low", 10500, "#d6b56a", [
      [103.0, 22.7], [104.4, 23.5], [106.6, 23.0], [108.1, 21.5], [107.0, 19.1],
      [105.0, 18.8], [103.2, 20.2], [103.0, 22.7],
    ]),
    polygon("dai-co-viet", "Đại Cồ Việt", "direct", "medium", 11500, "#d3a654", vietnamNorth),
    polygon("dai-viet-1306", "Đại Việt", "direct", "medium", 12500, "#df9f4b", vietnamSpineToHue),
    polygon("dang-trong-ngoai", "Đàng Ngoài", "direct", "medium", 12000, "#d8a34f", vietnamNorth),
    polygon("dang-trong-ngoai", "Đàng Trong", "direct", "medium", 13500, "#db7644", [
      [105.5, 17.5], [107.6, 17.2], [108.9, 15.0], [109.3, 12.8], [108.9, 11.5],
      [107.4, 10.1], [106.7, 9.1], [104.9, 9.4], [104.8, 10.6], [105.5, 12.3],
      [106.0, 14.0], [105.5, 17.5],
    ]),
    polygon("dang-trong-ngoai", "Trấn Thuận Thành", "autonomous", "low", 6500, "#8e7d72", [
      [107.7, 12.3], [109.3, 12.8], [109.2, 10.9], [108.4, 10.5], [107.4, 11.2], [107.7, 12.3],
    ]),
    polygon("dai-nam-1835", "Đại Nam", "direct", "high", 14500, "#d75a3a", vietnamFull),
    polygon("dai-nam-1835", "Trấn Tây", "influence", "low", 6500, "#77645e", [
      [102.8, 14.4], [105.5, 14.4], [106.2, 12.7], [105.9, 10.5], [104.4, 9.9],
      [102.8, 10.4], [102.4, 12.0], [102.8, 14.4],
    ]),
    polygon("chia-cat-1954", "Miền Bắc", "direct", "high", 13000, "#d6a04b", [
      [102.2, 22.5], [103.4, 23.35], [105.3, 23.15], [106.8, 22.8], [107.8, 21.6],
      [106.8, 19.3], [107.2, 17.1], [106.0, 16.9], [105.2, 17.8], [104.4, 18.8],
      [103.1, 20.0], [102.2, 22.5],
    ]),
    polygon("chia-cat-1954", "Miền Nam", "direct", "high", 13000, "#cf4b36", [
      [106.0, 16.9], [107.2, 17.1], [108.9, 15.4], [109.3, 13.2], [109.2, 11.2],
      [107.6, 10.0], [106.7, 8.55], [104.75, 8.65], [104.55, 10.4], [105.1, 12.0],
      [106.2, 13.5], [106.0, 16.9],
    ]),
    polygon("viet-nam-hien-dai", "Việt Nam", "direct", "high", 14500, "#c83d32", vietnamFull),
  ],
};

export const sourceLinks = [
  {
    label: "Bảo tàng Lịch sử Quốc gia — thời đại Hùng Vương",
    href: "https://baotanglichsu.vn/vi/Articles/3091/71651/nghien-cuu-phuc-dung-no-lien-chau-thoi-an-duong-vuong-lam-ro-hon-tinh-lich-su-cua-thoi-djai-hung-vuong.html",
  },
  {
    label: "Cổng TTĐT Chính phủ — Nghị quyết 202/2025/QH15 về 34 tỉnh, thành",
    href: "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-quyet-so-202-2025-qh15-ve-sap-xep-don-vi-hanh-chinh-cap-tinh-119250612174148722.htm",
  },
  {
    label: "Vietnamese Provinces Database — địa giới WGS84 của 34 tỉnh, thành",
    href: "https://github.com/thanglequoc/vietnamese-provinces-database/tree/master/json/geojson",
  },
  {
    label: "Cục Du lịch Quốc gia — các điểm đến biển đảo Việt Nam",
    href: "https://vietnamtourism.gov.vn/post/14752",
  },
  {
    label: "Office of the Historian — Hiệp định Genève 1954",
    href: "https://history.state.gov/milestones/1953-1960/dien-bien-phu",
  },
  {
    label: "Bảo tàng Lịch sử Quốc gia — triển lãm các trận đánh, chiến dịch tiêu biểu",
    href: "https://baotanglichsu.vn/vi/Articles/1508/50637/trien-lam-nhung-tran-djanh-chien-dich-noi-tieng-trong-lich-su-viet-nam.html",
  },
  {
    label: "Bảo tàng Lịch sử Quốc gia — chiến thắng Bạch Đằng năm 938",
    href: "https://baotanglichsu.vn/vi/Articles/3098/13934/ngo-quyen-va-chien-thang-bach-djang-nam-938.html",
  },
  {
    label: "Bảo tàng Lịch sử Quốc gia — di tích Rạch Gầm – Xoài Mút",
    href: "https://baotanglichsu.vn/vi/Articles/3091/19881/di-tich-lich-su-rach-gam-xoai-mut.html",
  },
  {
    label: "Cổng TTĐT Hà Nội — chiến thắng Ngọc Hồi – Đống Đa",
    href: "https://thanglong.chinhphu.vn/ky-niem-234-nam-chien-thang-ngoc-hoi-dong-da-103230126120842361.htm",
  },
];
