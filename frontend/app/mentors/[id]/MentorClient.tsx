"use client";

import Image from "next/image";
import MentorQr from "./MentorQR";

type Mentor = {
  id: string;
  name: string;
  title?: string;
  role?: string;
  avatar?: string;
  bio?: string;
  personalInfo?: Record<string, string>;
  organization?: string[];
  education?: (string | { degree: string; school: string; year: string })[];
  workHistory?: string[];
  subjects?: string[];
  practicalWorks?: string[];
  researchProjects?: string[];
  awards?: string[];
  achievements?: string[];
  research?: {
    teachingAreas?: string[];
    publications?: string[];
  };
};

export default function MentorClient({
  mentor,
  slug,
}: {
  mentor: Mentor;
  slug: string;
}) {
  const personalInfoItems = mentor.personalInfo
    ? Object.entries(mentor.personalInfo).map(([k, v]) => `${k}: ${v}`)
    : [];

  const educationItems = mentor.education?.map((item) =>
    typeof item === "string"
      ? item
      : `${item.degree} - ${item.school} (${item.year})`
  );

  const Section = ({ title, items }: { title: string; items?: string[] }) => {
    if (!items || items.length === 0) return null;
    return (
      <div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10 text-gray-800 dark:text-gray-100">
      {/* ===== Header: Avatar + Info (trái) | QR (phải) ===== */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-start gap-12">
        {/* Trái: Avatar + Thông tin */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl space-y-4">
          <Image
            src={mentor.avatar || "/placeholder.svg"}
            alt={mentor.name}
            width={200}
            height={200}
            className="rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{mentor.name}</h1>
            {mentor.title && (
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {mentor.title}
              </p>
            )}
            {mentor.role && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {mentor.role}
              </p>
            )}
          </div>
          {mentor.bio && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg w-full">
              <h2 className="text-xl font-semibold mb-2">📋 Giới thiệu</h2>
              <p className="text-gray-700 dark:text-gray-300">{mentor.bio}</p>
            </div>
          )}
        </div>

        {/* Phải: QR code */}
        <div className="flex-shrink-0 ml-40">
          <MentorQr slug={slug} />
        </div>
      </div>

      {/* ===== Các Section thông tin chi tiết ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section title="🔹 Thông tin cá nhân" items={personalInfoItems} />
        <Section title="🔹 Tổ chức làm việc" items={mentor.organization} />
        <Section title="🔹 Bằng cấp và chuyên môn" items={educationItems} />
        <Section title="🔹 Quá trình và đơn vị công tác" items={mentor.workHistory} />
        <Section title="🔹 Bộ môn giảng dạy và nghiên cứu" items={mentor.subjects} />
        <Section title="🔹 Công trình áp dụng thực tiễn" items={mentor.practicalWorks} />
        <Section title="🔹 Đề tài và dự án nghiên cứu" items={mentor.researchProjects} />
        <Section title="🔹 Giải thưởng" items={mentor.awards} />
        <Section title="🔹 Thành tựu KH&CN và sản xuất kinh doanh" items={mentor.achievements} />
        {mentor.research?.teachingAreas && (
          <Section title="🔹 Lĩnh vực giảng dạy" items={mentor.research.teachingAreas} />
        )}
        {mentor.research?.publications && (
          <Section title="🔹 Công trình xuất bản" items={mentor.research.publications} />
        )}
      </div>
    </div>
  );
}