/* eslint-disable @next/next/no-html-link-for-pages -- Vinext preview requires full-page navigation for these routes. */
import { ArrowLeft, ArrowUpRight, BookOpen, Clock3, MapPin } from "lucide-react";
import { historicalEvents, publishedEventDetails } from "../data/events";
import BrandMark from "../components/BrandMark";
import SiteFooter from "../components/SiteFooter";
import { createPageMetadata } from "../site-metadata";

export const metadata = createPageMetadata({
  title: "Hồ sơ sự kiện",
  description: "Hồ sơ có nguồn dẫn về những trận đánh và chiến dịch tiêu biểu trong lịch sử Việt Nam.",
  path: "/su-kien",
});

export default function EventsPage() {
  const upcomingEvents = historicalEvents
    .filter((event) => !event.hasDetail)
    .sort((left, right) => left.year - right.year);

  return (
    <main className="event-library-page">
      <header className="event-site-header">
        <a className="event-brand" href="/" aria-label="Trở về bản đồ Việt Niên Sử">
          <BrandMark />
          <div><strong>Việt Niên Sử</strong><small>Hồ sơ sự kiện</small></div>
        </a>
        <a className="event-back-link" href="/"><ArrowLeft size={15} /> Trở về bản đồ</a>
      </header>

      <section className="event-library-hero">
        <div>
          <p className="event-kicker">Thư viện lịch sử · giai đoạn thử nghiệm</p>
          <h1>Đọc sâu hơn<br />từ từng điểm trên bản đồ.</h1>
        </div>
        <div className="event-library-intro">
          <p>Mỗi hồ sơ tách sự kiện khỏi lớp lãnh thổ kéo dài, trình bày bối cảnh, diễn biến, bước ngoặt và nguồn tham khảo.</p>
          <div className="event-library-stats">
            <span><strong>{publishedEventDetails.length}</strong> hồ sơ đã mở</span>
            <span><strong>{upcomingEvents.length}</strong> hồ sơ tiếp theo</span>
          </div>
        </div>
      </section>

      <section className="event-library-section" aria-labelledby="published-events-title">
        <div className="event-section-heading">
          <div><span>01</span><h2 id="published-events-title">Hồ sơ đã xuất bản</h2></div>
          <p>Nội dung được đối chiếu từ bảo tàng, cơ quan lưu trữ và tư liệu mở có giấy phép.</p>
        </div>
        <div className="event-library-grid">
          {publishedEventDetails.map((event, index) => (
            <article className="event-library-card" key={event.id}>
              <a href={`/su-kien/${event.slug}`} className="event-library-image" aria-label={`Đọc hồ sơ ${event.name} ${event.yearLabel}`}>
                {/* Mỗi hình giữ nguyên URL nguồn hoặc dùng minh họa nhận diện thuộc dự án. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={event.media.src} alt={event.media.alt} loading={index === 0 ? "eager" : "lazy"} referrerPolicy="no-referrer" />
                {event.media.kind === "generated" && <em>Minh họa AI</em>}
                <span>{String(index + 1).padStart(2, "0")}</span>
              </a>
              <div className="event-library-card-body">
                <div className="event-card-meta"><span>{event.category}</span><span><Clock3 size={12} /> {event.yearLabel}</span></div>
                <h3><a href={`/su-kien/${event.slug}`}>{event.name} <span>{event.yearLabel}</span></a></h3>
                <p>{event.dek}</p>
                <div className="event-card-footer">
                  <span><MapPin size={13} /> {event.location}</span>
                  <a href={`/su-kien/${event.slug}`} aria-label={`Mở hồ sơ ${event.name}`}><ArrowUpRight size={16} /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {upcomingEvents.length > 0 && (
        <section className="event-library-section event-library-upcoming" aria-labelledby="upcoming-events-title">
          <div className="event-section-heading">
            <div><span>02</span><h2 id="upcoming-events-title">Đang biên soạn</h2></div>
            <p>Các hồ sơ này vẫn hiển thị trên bản đồ; trang chi tiết sẽ mở sau khi hoàn tất đối chiếu nguồn.</p>
          </div>
          <div className="event-upcoming-list">
            {upcomingEvents.map((event) => (
              <article key={event.id}>
                <span>{event.yearLabel}</span>
                <div><h3>{event.name} {event.yearLabel}</h3><p>{event.location}</p></div>
                <small><BookOpen size={13} /> Đang biên soạn</small>
              </article>
            ))}
          </div>
        </section>
      )}
      <SiteFooter />
    </main>
  );
}
