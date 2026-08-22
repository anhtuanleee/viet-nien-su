/* eslint-disable @next/next/no-html-link-for-pages -- Vinext preview requires full-page navigation for these routes. */
import { ArrowLeft, ExternalLink, Scale, ShieldCheck } from "lucide-react";
import BrandMark from "../components/BrandMark";
import SiteFooter from "../components/SiteFooter";
import { createPageMetadata } from "../site-metadata";

export const metadata = createPageMetadata({
  title: "Chủ sở hữu & giấy phép",
  description: "Thông tin chủ sở hữu, phiên bản và giấy phép của dự án Việt Niên Sử.",
  path: "/phap-ly",
});

export default function LegalPage() {
  return (
    <main className="legal-page">
      <header className="event-site-header">
        <a className="event-brand" href="/" aria-label="Trở về bản đồ Việt Niên Sử">
          <BrandMark />
          <div><strong>Việt Niên Sử</strong><small>Thông tin dự án</small></div>
        </a>
        <a className="event-back-link" href="/"><ArrowLeft size={15} /> Trở về bản đồ</a>
      </header>

      <article className="legal-content">
        <header className="legal-hero">
          <p className="event-kicker">Minh bạch quyền sở hữu · phiên bản 0.1.0</p>
          <h1>Chủ sở hữu<br />&amp; giấy phép.</h1>
          <p>Dự án được phát triển và phát hành bởi Venn với mục đích khám phá, trực quan hóa và đối chiếu lịch sử.</p>
        </header>

        <section className="legal-summary" aria-label="Thông tin chính">
          <article><ShieldCheck size={18} /><span>Chủ sở hữu</span><strong>Venn</strong></article>
          <article><Scale size={18} /><span>Giấy phép</span><strong>MIT License</strong></article>
          <article><span className="legal-version-mark">v</span><span>Phiên bản</span><strong>0.1.0</strong></article>
        </section>

        <section className="legal-section">
          <span>01</span>
          <div>
            <p className="event-kicker">Phạm vi cấp phép</p>
            <h2>Mã nguồn và dữ liệu của dự án</h2>
            <p>Toàn bộ mã nguồn, giao diện và dữ liệu gốc mà Venn có quyền cấp phép trong Việt Niên Sử được phát hành theo MIT License. Người dùng có thể sử dụng, sao chép, sửa đổi, hợp nhất, xuất bản, phân phối, cấp phép lại hoặc bán bản sao, với điều kiện giữ nguyên thông báo bản quyền và giấy phép.</p>
          </div>
        </section>

        <section className="legal-section">
          <span>02</span>
          <div>
            <p className="event-kicker">Tư liệu bên thứ ba</p>
            <h2>Giấy phép gốc vẫn được bảo lưu</h2>
            <p>MIT License của dự án không thay thế quyền và điều kiện sử dụng của thư viện, ảnh tư liệu, dữ liệu địa lý hoặc tài liệu tham khảo do bên thứ ba cung cấp. Các nội dung này tiếp tục thuộc chủ sở hữu tương ứng và được sử dụng theo nguồn, giấy phép hoặc điều kiện được ghi kèm.</p>
            <a className="legal-source-link" href="https://github.com/anhtuanleee/viet-nien-su/blob/main/THIRD_PARTY_NOTICES.md" target="_blank" rel="noreferrer">Xem thông báo tài sản bên thứ ba <ExternalLink size={14} /></a>
          </div>
        </section>

        <section className="legal-section">
          <span>03</span>
          <div>
            <p className="event-kicker">Minh họa do dự án tạo</p>
            <h2>Ảnh phục dựng được ghi nhãn riêng</h2>
            <p>Các hình mang nhãn “Minh họa AI” được Việt Niên Sử tạo mới theo bối cảnh biên tập và không được trình bày như ảnh tư liệu lịch sử. MIT chỉ áp dụng trong phạm vi quyền mà Venn thực tế có thể cấp; dự án không tuyên bố độc quyền vượt quá quyền phát sinh theo pháp luật áp dụng.</p>
          </div>
        </section>

        <section className="legal-section legal-license-text">
          <span>04</span>
          <div>
            <p className="event-kicker">MIT License · Copyright © 2026 Venn</p>
            <h2>Toàn văn giấy phép</h2>
            <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
            <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
            <p>THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
          </div>
        </section>
        <aside className="legal-notice"><ShieldCheck size={20} /><p>Phát hiện sai nguồn, sai giấy phép hoặc nội dung cần đính chính? Hãy gửi hồ sơ tại <a href="/dinh-chinh">trang đính chính &amp; báo lỗi</a>.</p></aside>
      </article>

      <SiteFooter />
    </main>
  );
}
