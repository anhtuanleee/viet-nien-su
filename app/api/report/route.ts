const resendEndpoint = "https://api.resend.com/emails";
const maximumBodyBytes = 12_000;

type ReportPayload = {
  type?: unknown;
  message?: unknown;
  email?: unknown;
  periodId?: unknown;
  periodName?: unknown;
  displayYear?: unknown;
  pageUrl?: unknown;
  website?: unknown;
};

const reportTypes = new Set([
  "Ranh giới bản đồ",
  "Mốc thời gian",
  "Nguồn tư liệu",
  "Nhãn hoặc chú thích",
  "Lỗi hiển thị",
  "Khác",
]);

const cleanText = (value: unknown, maximumLength: number) =>
  typeof value === "string" ? value.trim().replace(/\0/g, "").slice(0, maximumLength) : "";

const validEmail = (value: string) =>
  !value || (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 160);

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;",
}[character] ?? character));

const json = (body: Record<string, unknown>, status = 200) => Response.json(body, {
  status,
  headers: { "Cache-Control": "no-store" },
});

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maximumBodyBytes) return json({ error: "Nội dung báo cáo quá lớn." }, 413);

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "same-site") {
    return json({ error: "Yêu cầu không hợp lệ." }, 403);
  }

  let payload: ReportPayload;
  try {
    payload = await request.json() as ReportPayload;
  } catch {
    return json({ error: "Dữ liệu gửi lên không hợp lệ." }, 400);
  }

  // Honeypot: bots commonly fill every available field.
  if (cleanText(payload.website, 200)) return json({ ok: true });

  const type = cleanText(payload.type, 60);
  const message = cleanText(payload.message, 2_500);
  const email = cleanText(payload.email, 160).toLowerCase();
  const periodId = cleanText(payload.periodId, 80).replace(/[^a-z0-9-]/g, "");
  const periodName = cleanText(payload.periodName, 120);
  const displayYear = cleanText(payload.displayYear, 40);
  const pageUrl = cleanText(payload.pageUrl, 500);

  if (!reportTypes.has(type)) return json({ error: "Loại báo cáo không hợp lệ." }, 400);
  if (message.length < 12) return json({ error: "Vui lòng mô tả lỗi rõ hơn một chút." }, 400);
  if (!validEmail(email)) return json({ error: "Địa chỉ email không hợp lệ." }, 400);

  const apiKey = process.env.RESEND_TOKEN;
  const to = process.env.REPORT_EMAIL_TO;
  const from = process.env.REPORT_EMAIL_FROM?.trim() || "Việt Niên Sử <onboarding@resend.dev>";
  if (!apiKey || !to) {
    console.error(JSON.stringify({ event: "report_email_not_configured" }));
    return json({ error: "Kênh nhận báo cáo chưa được cấu hình." }, 503);
  }
  const recipients = to.split(",").map((address) => address.trim()).filter(Boolean);
  if (!recipients.length || recipients.some((address) => !validEmail(address))) {
    console.error(JSON.stringify({ event: "report_email_recipient_invalid" }));
    return json({ error: "REPORT_EMAIL_TO không phải địa chỉ email hợp lệ." }, 503);
  }

  const reportId = crypto.randomUUID();
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const subject = `[Việt Niên Sử] ${type} · ${displayYear || periodId || "Không rõ mốc"}`;
  const text = [
    `Mã báo cáo: ${reportId}`,
    `Loại: ${type}`,
    `Thời kỳ: ${periodName || "Không rõ"} (${displayYear || "không rõ"})`,
    `Period ID: ${periodId || "không rõ"}`,
    `Email phản hồi: ${email || "không cung cấp"}`,
    `Trang gửi: ${pageUrl || "không rõ"}`,
    "",
    message,
  ].join("\n");

  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `map-report-${reportId}`,
      "User-Agent": "viet-nien-su/0.1",
    },
    body: JSON.stringify({
      from,
      to: recipients,
      ...(email ? { reply_to: email } : {}),
      subject,
      text,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.55;color:#17201e">
          <h2 style="margin:0 0 16px">Báo cáo dữ liệu bản đồ</h2>
          <table style="border-collapse:collapse;width:100%;max-width:680px">
            <tr><td style="padding:6px 12px 6px 0;color:#66706d">Mã</td><td>${reportId}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;color:#66706d">Loại</td><td>${escapeHtml(type)}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;color:#66706d">Thời kỳ</td><td>${escapeHtml(periodName)} · ${escapeHtml(displayYear)}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;color:#66706d">Period ID</td><td>${escapeHtml(periodId)}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;color:#66706d">Email</td><td>${escapeHtml(email || "Không cung cấp")}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;color:#66706d">Trang gửi</td><td>${escapeHtml(pageUrl)}</td></tr>
          </table>
          <div style="margin-top:18px;padding:16px;background:#f3f0e8;border-left:3px solid #a86043">${safeMessage}</div>
        </div>`,
      tags: [
        { name: "source", value: "historical-map-report" },
        { name: "period", value: periodId || "unknown" },
      ],
    }),
  });

  if (!response.ok) {
    const resendError = await response.json().catch(() => null) as { type?: string; name?: string; message?: string } | null;
    const resendRequestId = response.headers.get("x-request-id");
    console.error(JSON.stringify({
      event: "report_email_failed",
      status: response.status,
      reportId,
      resendRequestId,
      errorType: resendError?.type ?? resendError?.name ?? "unknown",
      errorMessage: resendError?.message ?? "No error body returned by Resend",
    }));
    if (response.status === 429) {
      return json({ error: "Hệ thống đang nhận quá nhiều báo cáo. Vui lòng thử lại sau." }, 502);
    }
    if (response.status === 422 || response.status === 403) {
      return json({
        error: resendError?.message
          ? `Resend từ chối cấu hình email: ${resendError.message}`
          : "Resend từ chối địa chỉ gửi hoặc nhận. Hãy kiểm tra REPORT_EMAIL_FROM và REPORT_EMAIL_TO.",
      }, 502);
    }
    return json({ error: "Không thể gửi báo cáo lúc này." }, 502);
  }

  return json({ ok: true, reportId });
}
