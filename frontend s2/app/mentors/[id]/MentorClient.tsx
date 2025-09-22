"use client";

import Image from "next/image";
import Link from "next/link";

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
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2">{title}</h2>
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
      {/* ===== Bố cục mới: Header nền xanh đậm ===== */}
      <div className="relative bg-blue-950 text-white rounded-2xl py-12 px-6 flex flex-col items-center text-center">
        {/* Nút EN */}
        <div className="absolute top-4 left-4">
          <button className="px-4 py-2 bg-yellow-400 text-blue-950 font-bold rounded-full text-sm">EN</button>
        </div>

        {/* Nút Về Trang Mentors */}
        <Link href="/mentors">
          <div className="absolute top-4 right-4">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full text-sm">
              Về Trang Mentors
            </button>
          </div>
        </Link>

        {/* Nội dung chính giữa: Avatar, Tên, Chức vụ */}
        <div className="flex flex-col items-center space-y-4">
          <Image
            src={mentor.avatar || "/placeholder.svg"}
            alt={mentor.name}
            width={150}
            height={150}
            className="rounded-full object-cover border-4 border-gray-400/50"
          />
          <h1 className="text-3xl font-bold">{mentor.name}</h1>
          {mentor.title && <p className="text-lg opacity-80">{mentor.title}</p>}
          {mentor.role && <p className="text-sm opacity-60">{mentor.role}</p>}
        </div>
      </div>

      {/* ===== Các Section thông tin chi tiết ===== */}
      <div className="space-y-8">
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
