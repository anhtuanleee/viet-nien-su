/* eslint-disable @next/next/no-html-link-for-pages -- Vinext preview requires full-page navigation for these routes. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, CalendarDays, CheckCircle2, ExternalLink, MapPin, ShieldCheck, UsersRound } from "lucide-react";
import { eventDetails, getEventDetail } from "../../data/events";
import BrandMark from "../../components/BrandMark";
import SiteFooter from "../../components/SiteFooter";

type EventPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return eventDetails.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventDetail(slug);
  if (!event) return { title: "Không tìm thấy sự kiện" };
  return {
    title: `${event.name} ${event.yearLabel}`,
    description: event.dek,
    openGraph: {
      title: `${event.name} ${event.yearLabel}`,
      description: event.dek,
      images: [{ url: event.media.src, alt: event.media.alt }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.name} ${event.yearLabel}`,
      description: event.dek,
      images: [event.media.src],
    },
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventDetail(slug);
  if (!event) notFound();

  const eventIndex = eventDetails.findIndex((item) => item.slug === event.slug);
  const previousEvent = eventDetails[eventIndex - 1];
  const nextEvent = eventDetails[eventIndex + 1];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${event.name} ${event.yearLabel}`,
    description: event.dek,
    dateModified: "2026-08-16",
    inLanguage: "vi-VN",
    image: event.media.src,
    author: { "@type": "Organization", name: "Việt Niên Sử" },
  };

  return (
    <main className="event-detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <header className="event-site-header event-detail-header">
        <a className="event-brand" href="/" aria-label="Trở về bản đồ Việt Niên Sử">
          <BrandMark />
          <div><strong>Việt Niên Sử</strong><small>Hồ sơ sự kiện</small></div>
        </a>
        <nav aria-label="Điều hướng hồ sơ">
          <a href="/su-kien">Tất cả sự kiện</a>
          <a className="event-back-link" href={`/?period=${event.periodId}`}><MapPin size={14} /> Xem trên bản đồ</a>
        </nav>
      </header>

      <article>
        <section className="event-detail-hero">
          <div className="event-detail-hero-copy">
            <a className="event-breadcrumb" href="/su-kien"><ArrowLeft size={14} /> Hồ sơ sự kiện</a>
            <div className="event-hero-meta"><span>{event.category}</span><span>{event.dateLabel}</span></div>
            <h1>{event.name}<sup>{event.yearLabel}</sup></h1>
            <p>{event.dek}</p>
            <div className="event-hero-facts">
              <span><MapPin size={15} /><small>Không gian</small><strong>{event.location}</strong></span>
              <span><CalendarDays size={15} /><small>Thời gian</small><strong>{event.dateLabel}</strong></span>
              <span><ShieldCheck size={15} /><small>Đối chiếu</small><strong>{event.sources.length} nguồn chính</strong></span>
            </div>
            <p className="event-coordinate-note">
              <MapPin size={14} /> Tọa độ bản đồ: {event.coordinates[1].toFixed(3)}°N, {event.coordinates[0].toFixed(3)}°E · {event.coordinateNote}
            </p>
          </div>
          <figure className="event-hero-media">
            {event.media.kind === "generated" && <span className="event-media-kind">Minh họa AI · không phải ảnh tư liệu</span>}
            {/* Ảnh giữ nguyên URL nguồn hoặc dùng minh họa nhận diện thuộc dự án. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={event.media.src} alt={event.media.alt} referrerPolicy="no-referrer" />
            <figcaption>
              <span>{event.media.caption}</span>
              <a href={event.media.sourceUrl} target="_blank" rel="noreferrer">{event.media.credit} · {event.media.license} <ExternalLink size={11} /></a>
            </figcaption>
          </figure>
        </section>

        <div className="event-article-layout">
          <aside className="event-toc" aria-label="Mục lục bài viết">
            <span>Trong hồ sơ</span>
            <a href="#boi-canh">01 · Bối cảnh</a>
            <a href="#luc-luong">02 · Lực lượng</a>
            <a href="#dien-bien">03 · Diễn biến</a>
            <a href="#buoc-ngoat">04 · Bước ngoặt</a>
            <a href="#ket-qua">05 · Kết quả</a>
            <a href="#nguon">06 · Nguồn</a>
            <small>Cập nhật {event.reviewedAt}</small>
          </aside>

          <div className="event-article-body">
            <section id="boi-canh" className="event-article-section">
              <div className="event-section-number">01</div>
              <div>
                <p className="event-kicker">Vì sao trận đánh diễn ra?</p>
                <h2>Bối cảnh chiến lược</h2>
                {event.context.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <div className="event-objective-grid">
                  {event.objectives.map((item) => <article key={item.side}><span>{item.side}</span><p>{item.objective}</p></article>)}
                </div>
              </div>
            </section>

            <section id="luc-luong" className="event-article-section">
              <div className="event-section-number">02</div>
              <div>
                <p className="event-kicker">Hai phía trên chiến trường</p>
                <h2>Lực lượng và chỉ huy</h2>
                <div className="event-forces-grid">
                  {event.forces.map((force) => (
                    <article key={force.side}>
                      <UsersRound size={18} />
                      <span>{force.side}</span>
                      <h3>{force.commanders}</h3>
                      <p>{force.note}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="dien-bien" className="event-article-section event-phases-section">
              <div className="event-section-number">03</div>
              <div>
                <p className="event-kicker">Sơ đồ khái quát · không theo tỷ lệ tọa độ</p>
                <h2>Diễn biến theo giai đoạn</h2>
                <div className="event-phase-flow">
                  {event.phases.map((phase, index) => (
                    <article key={phase.label}>
                      <div><span>{phase.label}</span>{index < event.phases.length - 1 && <ArrowRight aria-hidden="true" size={16} />}</div>
                      <h3>{phase.title}</h3>
                      <p>{phase.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="buoc-ngoat" className="event-article-section">
              <div className="event-section-number">04</div>
              <div>
                <p className="event-kicker">Những yếu tố thay đổi cục diện</p>
                <h2>Bước ngoặt</h2>
                <ol className="event-turning-points">
                  {event.turningPoints.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, "0")}</span><p>{point}</p></li>)}
                </ol>
              </div>
            </section>

            <section id="ket-qua" className="event-article-section">
              <div className="event-section-number">05</div>
              <div>
                <p className="event-kicker">Tác động sau trận đánh</p>
                <h2>Kết quả và ý nghĩa</h2>
                <p className="event-outcome">{event.outcome}</p>
                <ul className="event-significance-list">
                  {event.significance.map((item) => <li key={item}><CheckCircle2 size={16} /><span>{item}</span></li>)}
                </ul>
                <aside className="event-certainty-note">
                  <ShieldCheck size={18} />
                  <div><strong>Điều đã chắc chắn và phần còn tranh luận</strong><p>{event.certaintyNote}</p></div>
                </aside>
              </div>
            </section>

            <section id="nguon" className="event-article-section">
              <div className="event-section-number">06</div>
              <div>
                <p className="event-kicker">Đọc và kiểm chứng thêm</p>
                <h2>Nguồn tham khảo</h2>
                <div className="event-source-list">
                  {event.sources.map((source, index) => (
                    <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div><small>{source.level ?? "Nguồn tham khảo"} · {source.publisher}</small><strong>{source.title}</strong><p>{source.note}</p></div>
                      <ArrowUpRight size={17} />
                    </a>
                  ))}
                </div>
                <p className="event-editorial-note"><BookOpen size={15} /> Nội dung được biên tập lại bằng lời văn riêng; nguồn mở trong tab mới để người đọc tự đối chiếu.</p>
              </div>
            </section>
          </div>
        </div>

        <nav className="event-pagination" aria-label="Hồ sơ trước và sau">
          {previousEvent ? <a href={`/su-kien/${previousEvent.slug}`}><small>Hồ sơ trước</small><strong><ArrowLeft size={16} /> {previousEvent.name} {previousEvent.yearLabel}</strong></a> : <span />}
          {nextEvent ? <a href={`/su-kien/${nextEvent.slug}`}><small>Hồ sơ sau</small><strong>{nextEvent.name} {nextEvent.yearLabel} <ArrowRight size={16} /></strong></a> : <a href="/su-kien"><small>Tiếp tục khám phá</small><strong>Tất cả sự kiện <ArrowRight size={16} /></strong></a>}
        </nav>
      </article>
      <SiteFooter />
    </main>
  );
}
