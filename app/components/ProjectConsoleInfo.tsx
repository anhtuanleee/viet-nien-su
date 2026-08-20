"use client";

import { useEffect } from "react";

export default function ProjectConsoleInfo() {
  useEffect(() => {
    console.info(
      "%cViệt Niên Sử%c\nChủ sở hữu: Venn\nPhiên bản: 0.1.0\nGiấy phép: MIT (toàn bộ mã nguồn và dữ liệu do dự án cung cấp; tài sản bên thứ ba theo giấy phép riêng)",
      "color:#d7a75a;font-size:18px;font-weight:700;",
      "color:#8d8577;font-size:12px;line-height:1.6;",
    );
  }, []);

  return null;
}
