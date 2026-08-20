/* eslint-disable @next/next/no-html-link-for-pages -- Vinext preview requires full-page navigation for these routes. */
import type { Metadata } from "next";
import { ArrowLeft, Database, Eye, Globe2 } from "lucide-react";
import BrandMark from "../components/BrandMark";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Quyền riêng tư",
  description: "Chính sách quyền riêng tư của Việt Niên Sử.",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <header className="event-site-header">
        <a className="event-brand" href="/" aria-label="Trở về bản đồ Việt Niên Sử">
          <BrandMark />
          <div><strong>Việt Niên Sử</strong><small>Quyền riêng tư</small></div>
        </a>
        <a className="event-back-link" href="/"><ArrowLeft size={15} /> Trở về bản đồ</a>
      </header>

      <article className="legal-content">
        <header className="legal-hero">
          <p className="event-kicker">Cập nhật 20/08/2026</p>
          <h1>Quyền<br />riêng tư.</h1>
          <p>Việt Niên Sử được thiết kế để người xem có thể khám phá nội dung mà không cần tạo tài khoản hoặc cung cấp thông tin cá nhân trực tiếp.</p>
        </header>

        <section className="legal-summary" aria-label="Tóm tắt quyền riêng tư">
          <article><Eye size={18} /><span>Tài khoản</span><strong>Không yêu cầu</strong></article>
          <article><Database size={18} /><span>Lưu cục bộ</span><strong>Tùy chọn hiển thị</strong></article>
          <article><Globe2 size={18} /><span>Nguồn ngoài</span><strong>Có liên kết</strong></article>
        </section>

        <section className="legal-section">
          <span>01</span><div><p className="event-kicker">Dữ liệu người dùng</p><h2>Không có tài khoản, cookie quảng cáo hoặc công cụ phân tích riêng</h2><p>Phiên bản hiện tại không cung cấp đăng ký tài khoản, bình luận, thanh toán, tải tệp hoặc biểu mẫu liên hệ; đồng thời không chủ động cài cookie quảng cáo hay công cụ phân tích hành vi. Chủ sở hữu không yêu cầu tên, email, số điện thoại, địa chỉ hay thông tin định danh khác qua trang web.</p></div>
        </section>
        <section className="legal-section">
          <span>02</span><div><p className="event-kicker">Bộ nhớ thiết bị</p><h2>Chỉ lưu tùy chọn chất lượng hiển thị</h2><p>Trình duyệt có thể dùng localStorage để ghi nhớ mức chất lượng render mà người xem đã chọn. Dữ liệu này nằm trên thiết bị của người xem, không dùng để lập hồ sơ cá nhân và có thể xóa bằng chức năng xóa dữ liệu trang web của trình duyệt.</p></div>
        </section>
        <section className="legal-section">
          <span>03</span><div><p className="event-kicker">Hạ tầng và nội dung bên ngoài</p><h2>Yêu cầu kỹ thuật có thể đi qua nhà cung cấp dịch vụ</h2><p>Nền tảng lưu trữ có thể xử lý nhật ký kỹ thuật cơ bản như địa chỉ IP, thời gian truy cập, loại trình duyệt và lỗi hệ thống để vận hành và bảo mật dịch vụ. Ảnh tư liệu hoặc liên kết ngoài có thể khiến trình duyệt kết nối tới Wikimedia và các website nguồn; chính sách riêng tư của các bên đó được áp dụng độc lập.</p></div>
        </section>
        <section className="legal-section">
          <span>04</span><div><p className="event-kicker">Thay đổi và yêu cầu</p><h2>Chính sách sẽ được cập nhật khi tính năng thay đổi</h2><p>Nếu dự án bổ sung tài khoản, phân tích người dùng, biểu mẫu hoặc dịch vụ mới có xử lý dữ liệu cá nhân, nội dung trang này cần được cập nhật trước hoặc cùng thời điểm tính năng được đưa vào sử dụng. Yêu cầu liên quan đến dữ liệu hoặc quyền riêng tư có thể gửi qua <a href="/dinh-chinh">kênh đính chính &amp; báo lỗi</a>.</p></div>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
