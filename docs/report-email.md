# Cấu hình email báo cáo dữ liệu

Form “Báo sai dữ liệu” gọi `POST /api/report` và gửi email qua Resend.

## Biến môi trường bắt buộc

```text
RESEND_TOKEN=re_...
REPORT_EMAIL_TO=owner@example.com
REPORT_EMAIL_FROM=Việt Niên Sử <report@updates.example.com>
```

Nếu chưa đặt `REPORT_EMAIL_FROM`, ứng dụng dùng `Việt Niên Sử <onboarding@resend.dev>` để test. Sender thử nghiệm này chỉ gửi được tới email chủ tài khoản Resend. Khi chạy production, `REPORT_EMAIL_FROM` phải thuộc domain đã xác minh; nên dùng một subdomain riêng như `updates.example.com`.

`REPORT_EMAIL_TO` nhận một hoặc nhiều địa chỉ, phân cách bằng dấu phẩy.

Thiết lập các biến trên dashboard của môi trường deploy. Với local development, đặt chúng trong `.env.local` (file này đã được gitignore).

## Kiểm tra

1. Xác minh SPF và DKIM của sending domain trong Resend.
2. Gửi thử một báo cáo từ giao diện.
3. Kiểm tra email nhận, `Reply-To` và log gửi trong Resend.
