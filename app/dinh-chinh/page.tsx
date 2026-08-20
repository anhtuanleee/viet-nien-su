/* eslint-disable @next/next/no-html-link-for-pages -- Vinext preview requires full-page navigation for these routes. */
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, BadgeCheck, CircleAlert, FileWarning } from "lucide-react";
import BrandMark from "../components/BrandMark";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Đính chính & báo lỗi",
  description: "Quy trình tiếp nhận, kiểm tra và công bố đính chính của Việt Niên Sử.",
};

export default function CorrectionsPage() {
  return (
    <main className="legal-page">
      <header className="event-site-header">
        <a className="event-brand" href="/" aria-label="Trở về bản đồ Việt Niên Sử">
          <BrandMark />
          <div><strong>Việt Niên Sử</strong><small>Đính chính &amp; báo lỗi</small></div>
        </a>
        <a className="event-back-link" href="/"><ArrowLeft size={15} /> Trở về bản đồ</a>
      </header>

      <article className="legal-content">
        <header className="legal-hero">
          <p className="event-kicker">Minh bạch biên tập · cập nhật 20/08/2026</p>
          <h1>Báo lỗi<br />&amp; đính chính.</h1>
          <p>Venn tiếp nhận phản hồi về sự kiện, tọa độ, bản đồ, nguồn dẫn, bản quyền và hình ảnh để kiểm tra và sửa công khai.</p>
        </header>

        <section className="legal-summary" aria-label="Tóm tắt quy trình">
          <article><FileWarning size={18} /><span>Tiếp nhận</span><strong>GitHub Issues</strong></article>
          <article><BadgeCheck size={18} /><span>Đối chiếu</span><strong>Ưu tiên nguồn gốc</strong></article>
          <article><CircleAlert size={18} /><span>Tranh chấp</span><strong>Có thể tạm ẩn</strong></article>
        </section>

        <section className="legal-section">
          <span>01</span><div><p className="event-kicker">Gửi phản hồi</p><h2>Nêu rõ trang, nội dung và căn cứ</h2><p>Phản hồi nên kèm URL trang, đoạn cần sửa, lý do, nguồn đối chiếu và thông tin giấy phép nếu liên quan đến tài sản hình ảnh.</p><a className="legal-source-link" href="https://github.com/anhtuanleee/viet-nien-su/issues/new" target="_blank" rel="noreferrer">Mở yêu cầu đính chính trên GitHub <ArrowUpRight size={14} /></a></div>
        </section>
        <section className="legal-section">
          <span>02</span><div><p className="event-kicker">Quy trình kiểm tra</p><h2>Không sửa theo khẳng định không có nguồn</h2><p>Dự án ưu tiên văn bản pháp luật, cơ quan lưu trữ, bảo tàng, cơ quan chuyên môn và nghiên cứu có thể truy nguyên. Những cách diễn giải còn tranh luận sẽ được trình bày như quan điểm, không biến thành kết luận tuyệt đối.</p></div>
        </section>
        <section className="legal-section">
          <span>03</span><div><p className="event-kicker">Bản quyền và nội dung nhạy cảm</p><h2>Tạm ẩn khi chưa đủ căn cứ tiếp tục công bố</h2><p>Tài sản bị khiếu nại có căn cứ ban đầu hoặc nội dung có nguy cơ gây hiểu nhầm nghiêm trọng có thể được tạm ẩn trong khi xác minh. Việc khôi phục phải kèm căn cứ sử dụng hoặc nguồn đã được kiểm tra.</p></div>
        </section>
        <section className="legal-section">
          <span>04</span><div><p className="event-kicker">Lịch sử thay đổi</p><h2>Mọi sửa đổi quan trọng được lưu trong kho mã nguồn</h2><p>Thay đổi về tọa độ, chủ quyền, mốc thời gian, kết luận, nguồn hoặc giấy phép phải có mô tả rõ trong lịch sử phiên bản để người đọc có thể truy vết.</p></div>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
