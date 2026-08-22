/* eslint-disable @next/next/no-html-link-for-pages -- Vinext preview requires full-page navigation for these routes. */
import { ArrowLeft, BookOpen, CircleAlert, SearchCheck } from "lucide-react";
import BrandMark from "../components/BrandMark";
import SiteFooter from "../components/SiteFooter";
import { createPageMetadata } from "../site-metadata";

export const metadata = createPageMetadata({
  title: "Miễn trừ trách nhiệm",
  description: "Phạm vi sử dụng và giới hạn độ chính xác của nội dung Việt Niên Sử.",
  path: "/mien-tru-trach-nhiem",
});

export default function DisclaimerPage() {
  return (
    <main className="legal-page">
      <header className="event-site-header">
        <a className="event-brand" href="/" aria-label="Trở về bản đồ Việt Niên Sử">
          <BrandMark />
          <div><strong>Việt Niên Sử</strong><small>Miễn trừ trách nhiệm</small></div>
        </a>
        <a className="event-back-link" href="/"><ArrowLeft size={15} /> Trở về bản đồ</a>
      </header>

      <article className="legal-content">
        <header className="legal-hero">
          <p className="event-kicker">Mục đích học tập · không phải tài liệu chính thức</p>
          <h1>Giới hạn<br />thông tin.</h1>
          <p>Việt Niên Sử là dự án độc lập phục vụ học tập, tìm hiểu kiến thức và trực quan hóa thông tin lịch sử được tổng hợp từ các nguồn công khai trên Internet.</p>
        </header>

        <section className="legal-summary" aria-label="Tóm tắt giới hạn thông tin">
          <article><BookOpen size={18} /><span>Mục đích</span><strong>Học tập</strong></article>
          <article><SearchCheck size={18} /><span>Phương pháp</span><strong>Tổng hợp nguồn mở</strong></article>
          <article><CircleAlert size={18} /><span>Độ chính xác</span><strong>Không tuyệt đối</strong></article>
        </section>

        <section className="legal-section">
          <span>01</span><div><p className="event-kicker">Không phải nguồn chính thức</p><h2>Không thay thế tài liệu pháp lý hoặc nghiên cứu chuyên ngành</h2><p>Nội dung không phải bản đồ pháp lý, tài liệu địa giới hành chính, tuyên bố chủ quyền, văn bản của cơ quan nhà nước, giáo trình chính thức hay kết luận nghiên cứu chuyên ngành. Không nên dùng trang web làm căn cứ duy nhất cho quyết định pháp lý, hành chính, học thuật hoặc chính sách.</p></div>
        </section>
        <section className="legal-section">
          <span>02</span><div><p className="event-kicker">Phục dựng lịch sử</p><h2>Tách biệt lớp lịch sử với lãnh thổ hiện tại</h2><p>Nhiều thời kỳ lịch sử không có đường biên chính xác theo cách hiểu hiện đại. Các vùng kiểm soát, tự trị và ảnh hưởng là mô hình phục dựng có mức độ bất định, không phải địa giới hiện hành. Lớp địa danh hiện đại được trình bày riêng; Hoàng Sa và Trường Sa được ghi nhận là các quần đảo của Việt Nam theo thông tin hành chính hiện hành.</p></div>
        </section>
        <section className="legal-section">
          <span>03</span><div><p className="event-kicker">Hình ảnh diễn giải</p><h2>Minh họa AI không phải ảnh tư liệu</h2><p>Những hình có nhãn “Minh họa AI” chỉ nhằm gợi bối cảnh không gian, vật liệu và không khí của một giai đoạn. Hình có thể kết hợp nhiều yếu tố cùng thời kỳ, không chứng minh diện mạo chính xác của nhân vật, trận địa, quân phục, khí tài hoặc diễn biến một trận đánh cụ thể.</p></div>
        </section>
        <section className="legal-section">
          <span>04</span><div><p className="event-kicker">Không bảo đảm 100%</p><h2>Thông tin có thể thiếu, lỗi thời hoặc còn tranh luận</h2><p>Dự án cố gắng dẫn nguồn và phân biệt mức độ chắc chắn, nhưng không cam kết mọi nội dung luôn đầy đủ, cập nhật hoặc chính xác tuyệt đối. Niên đại, tên gọi, địa danh, diễn giải sự kiện và phạm vi lãnh thổ có thể khác nhau giữa các nguồn và trường phái nghiên cứu.</p></div>
        </section>
        <section className="legal-section">
          <span>05</span><div><p className="event-kicker">Tự kiểm chứng</p><h2>Hãy đối chiếu nguồn trước khi trích dẫn</h2><p>Người xem nên mở các liên kết nguồn, tham khảo tài liệu của cơ quan có thẩm quyền và ý kiến chuyên gia khi cần độ chính xác cao. Việc truy cập hoặc sử dụng thông tin trên trang web đồng nghĩa với việc người xem hiểu các giới hạn nêu tại đây.</p><a className="legal-source-link" href="/dinh-chinh">Gửi yêu cầu đính chính</a></div>
        </section>
        <aside className="legal-notice"><CircleAlert size={20} /><p>Trang miễn trừ này nhằm minh bạch phạm vi dự án; nó không loại trừ các nghĩa vụ bắt buộc theo pháp luật hiện hành.</p></aside>
      </article>
      <SiteFooter />
    </main>
  );
}
