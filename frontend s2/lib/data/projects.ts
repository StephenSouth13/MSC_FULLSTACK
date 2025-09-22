// src/lib/data/projects.ts

// 1. Định nghĩa kiểu dữ liệu (Type Definitions) để đảm bảo code nhất quán và an toàn
export type MentorType = {
  name: string;
  avatar: string;
};

export type ProjectType = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  mentors: MentorType[];
};

// 2. Nguồn dữ liệu duy nhất (Single Source of Truth) cho tất cả dự án
// Dữ liệu đã được làm sạch (không chứa emoji, tiền tố...)
export const allProjects: ProjectType[] = [
  {
    id: "fdeli",
    slug: "fdeli",
    title: "Công ty TNHH F-Deli",
    description: "Chuẩn hoá quy trình làm việc toàn diện, tối ưu hóa hiệu suất và xây dựng văn hóa doanh nghiệp bền vững thông qua mentoring & coaching chuyên sâu.",
    image: "/Projects/Fdeli.webp",
    category: "Mentoring & Coaching",
    mentors: [
      { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
      { name: "ThS. Đoàn Đức Minh", avatar: "/Mentors/DDM.webp" },
    ],
  },
  {
    id: "happyland",
    slug: "happyland",
    title: "Khu du lịch Happy Land",
    description: "Nâng cao năng lực cho đội ngũ Sales & Marketing, tập trung vào chiến lược thu hút khách hàng và kỹ năng bán hàng hiệu quả trong ngành du lịch.",
    image: "/Projects/Happyland.webp",
    category: "Đào tạo In-house",
    mentors: [
      { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
      { name: "MSC Teams", avatar: "/MSCers/mscteam.webp" },
    ],
  },
  {
    id: "einstein-school",
    slug: "einstein-school",
    title: "Einstein School HCM - ESH",
    description: "Tư vấn chiến lược tuyển sinh và đào tạo đội ngũ Sales & Marketing, giúp nhà trường đạt mục tiêu tăng trưởng và nhận diện thương hiệu.",
    image: "/Projects/einsteinschool.webp",
    category: "Tư vấn & Đào tạo",
    mentors: [
      { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
      { name: "Th.S Đoàn Đức Minh", avatar: "/Mentors/DDM.webp" },
    ],
  },
  {
    id: "tam-chau",
    slug: "tam-chau",
    title: "Công ty Tâm Châu",
    description: "Phát triển năng lực đội ngũ quản lý cấp trung, tập trung vào kỹ năng quản lý dự án hiệu quả và tư duy lãnh đạo chiến lược.",
    image: "/Projects/Tam-Chau.webp",
    category: "Quản lý dự án",
    mentors: [
      { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
      { name: "MSC Teams", avatar: "/MSCers/mscteam.webp" },
    ],
  },
  {
    id: "doi-dep",
    slug: "doi-dep",
    title: "Đôi Dép - Không thể thiếu nhau",
    description: "Dịch vụ coaching 1-1 chuyên sâu, giúp các cá nhân khai phá tiềm năng, vượt qua rào cản để đạt được mục tiêu trong sự nghiệp và cuộc sống.",
    image: "/Projects/DoiDep.webp",
    category: "Coaching 1-1",
    mentors: [
      { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
      { name: "MSC Teams", avatar: "/MSCers/mscteam.webp" },
    ],
  },
  {
    id: "vnpt",
    slug: "vnpt",
    title: "Tập đoàn VNPT",
    description: "Tổ chức chuỗi workshop về xây dựng văn hóa doanh nghiệp, thúc đẩy sự gắn kết, tinh thần đổi mới và sáng tạo trong toàn Tập đoàn.",
    image: "/Projects/VNPT.webp",
    category: "Workshop",
    mentors: [
      { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
      { name: "Nguyễn Chí Thành", avatar: "/Mentors/NCT.webp" },
    ],
  },
  // Bạn có thể dễ dàng thêm các dự án khác vào đây trong tương lai
];