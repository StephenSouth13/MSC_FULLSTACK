// File: app/dao-tao/layout.tsx
import type { Metadata } from "next";

// Định nghĩa metadata cho trang đào tạo
export const metadata: Metadata = {
  title: "Đào tạo - MSC Center",
  description: "Khám phá các chương trình đào tạo chuyên nghiệp được thiết kế để phát triển kỹ năng và nâng cao năng lực cạnh tranh trong thời đại số.",
};

// Component layout này sẽ bao bọc component page.tsx
export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}