//D:\Website\msc\MSC_FULLSTACK\frontend\data\mentor-detail.ts
export type MentorDetail = {
  id: string;
  slug: string;
  name: string;
  title: string;
  avatar?: string;
  bio?: string;
  role?: string;
  personalInfo?: {
    [key: string]: string;
  };
  organization?: string[];
  education?: (string | { degree: string; school: string; year: string; thesis?: string })[];
  workHistory?: string[];
  subjects?: string[];
  practicalWorks?: string[];
  researchProjects?: string[];
  awards?: string[];
  achievements?: string[];
  research?: {
    teachingAreas: string[];
    publications: string[];
  };
};

export const mentorDetails: MentorDetail[] = [
  {
    id: "phan-huynh-anh",
    slug: "phan-huynh-anh",
    name: "Phan Huỳnh Anh",
    title: "Tiến sĩ Kinh tế",
    avatar: "/Mentors/PHA.webp",
    role: "Chủ tịch HĐQT Smentor | CEO Quỹ FFVN | Giảng viên Đại học",
    personalInfo: {
      "Họ và tên": "Phan Huỳnh Anh",
      "Học vị": "Tiến sĩ (2019)",

    },
    organization: [
      "Giảng viên Đại học UEH",
      "Giảng viên khởi nghiệp quốc gia (VCCI)",
      "Founder Viện Việt Nam Bách Nghệ Thực Hành (Smentor)",
      "Founder VSM – Vietnam Student Marathon",
      "Founder/CEO Quỹ FFVN",
    ],
    education: [
      "Tiến sĩ Kinh tế",
      "Thạc sĩ Kinh tế",
      "Cử nhân Kinh tế",
      "Cử nhân Công nghệ Thông tin",
      "Chuyên viên Microsoft (MCSE)",
      "Chuyên viên Cisco (CCNP)",
      "Giảng viên Khởi nghiệp Quốc gia (VCCI)",
    ],
    workHistory: [
      "2007–2008: Nhân viên IT – Ngân hàng Sacombank",
      "2008–2012: Trưởng phòng IT & Kinh doanh online – Vietmark",
      "2013–2017: Giám đốc Marketing – Exotic Việt Nam",
      "2017–2019: Giám đốc Điều hành – Smentor",
      "2017–2020: Giám đốc Đào tạo & Marketing – Happyland Vietnam",
      "2019–nay: Chủ tịch HĐQT – Smentor",
      "2019–2022: Viện trưởng – Viện Việt Nam Bách Nghệ Thực Hành",
      "2017–nay: Giảng viên – Hội đồng Khởi nghiệp Quốc gia (VCCI)",
      "2020–nay: Giảng viên – Đại học UEH",
      "2022–nay: Founder – Vietnam Student Marathon",
      "2023–nay: Founder/CEO – Quỹ FFVN",
    ],
    subjects: [
      "Kỹ năng mềm",
      "Quản trị và khởi nghiệp",
      "Giao tiếp kinh doanh",
      "Sales và marketing",
      "Lập kế hoạch và thực thi",
      "Khởi nghiệp số - Kinh tế số",
      "Đổi mới sáng tạo",
      "Xây dựng nhân sự kế thừa",
      "Thẩm định và Quản lý dự án",
    ],
    practicalWorks: [
      "Chương trình học kỳ doanh nghiệp – 50 doanh nghiệp tham gia (2018–2020)",
      "Chương trình Mentoring – 10 doanh nghiệp, 5 trường đại học tham gia (2019–nay)",
      "Kỹ năng định vị bản thân – UEH (2019–nay)",
      "Kỹ năng định vị doanh nghiệp – Viện Việt Nam Bách Nghệ Thực Hành (2019–nay)",
      "Cổ tháp bảo vật – tinh hoa giá trị Việt – KDL Happyland Long An (2019–nay)",
    ],
    researchProjects: [
      "Xúc tiến du lịch tỉnh Long An (2018–2019) – Cấp tỉnh – Đã nghiệm thu",
      "Xúc tiến du lịch đêm Sóc Trăng, Bà Rịa - Vũng Tàu, Kiên Giang... (2020–nay) – Cấp tỉnh",
      "Giảng viên nguồn/Ủy viên Hội đồng Khởi nghiệp quốc gia (VCCI) – (2017–nay) – Cấp Quốc gia",
      "Ban chấp hành Hiệp hội Du lịch Việt Nam – (2015–nay) – Cấp Quốc gia",
      "CLB Giám đốc Sales & Marketing Việt Nam – (2017–nay) – Cấp Quốc gia",
    ],
    awards: [
      "Bằng khen của Trung Ương Hội Kỷ lục gia Việt Nam – 2019",
      "Bằng khen của Cục Sở hữu Trí tuệ Việt Nam – 2019",
      "Giấy khen của HĐ Khởi nghiệp Quốc gia (VCCI) – 2019, 2020, 2021",
    ],
    achievements: [
      "Đồng sáng lập Exotic Vietnam (2013)",
      "Đồng sáng lập Smentor (2017)",
      "Đồng sáng lập Viện Việt Nam Bách Nghệ Thực Hành (2019)",
      "Đồng sáng lập công ty cổ phần Smar (2020)",
      "Người sáng lập CLB Action Media (2017)",
      "Đồng sáng lập SRun Vietnam (2023)",
      "Người sáng lập giải chạy Vietnam Student Marathon (2022)",
    ],
    research: {
      teachingAreas: ["Khởi nghiệp số", "Marketing", "Quản trị dự án"],
      publications: [],
    },
  },
  {
    id: "hoang-cuu-long",
    slug: "hoang-cuu-long",
    name: "Hoàng Cửu Long",
    title: "Phó Giáo sư, Tiến sĩ Quản trị kinh doanh",
    avatar: "/Mentors/HCL.webp",
    role: "Phó Trưởng khoa, Khoa Kinh doanh quốc tế - Marketing, ĐH Kinh tế TP.HCM",
    personalInfo: {
      "Họ và tên": "Hoàng Cửu Long",
      "Ngày sinh": "30/04/1977",
      "Email": "hoangcuulong@ueh.edu.vn",
      "Điện thoại": "0903923590",
    },
    organization: [
      "Khoa Kinh doanh quốc tế - Marketing, Trường Đại học Kinh tế TP. Hồ Chí Minh",
    ],
    education: [
      { degree: "Tiến sĩ", school: "Trường Đại học Kinh tế TP.HCM", year: "2019" },
      { degree: "Thạc sĩ", school: "James Cook University", year: "2006" },
      { degree: "Cử nhân", school: "Trường Đại học Kinh tế TP.HCM", year: "1999" },
    ],
    subjects: [
      "Quản trị kinh doanh",
      "Kinh doanh thương mại",
      "Quản lý công",
      "Quản trị nhân lực",
    ],
    researchProjects: [
      "Factors affecting customer engagement and brand loyalty in Vietnam FMCG (2023–2024)",
      "Xây dựng chiến lược phát triển kinh tế xã hội thị xã Bình Minh tỉnh Vĩnh Long (2024)",
      "Nghiên cứu hoạt động khởi nghiệp trực tuyến của sinh viên đại học tại Việt Nam (2023)",
      "Hình thành & phát triển bền vững: Quản trị & vận hành chuỗi bán lẻ Bánh Mì Má Hải (2023)",
    ],
    research: {
      teachingAreas: ["Quản trị kinh doanh", "Marketing", "Kinh doanh quốc tế", "Khởi nghiệp"],
      publications: [
        "Factors affecting green purchase behaviour of young people with dairy products through new trends and packaging (2025)",
        "Mindfulness Practice and Work Performance: The Mediating Role of Emotional Intelligence and Psychological Capital (2025)",
        "Blockchain technology applications in retail branding: Insights from retailers in the developing world (2023)",
        "The impact of business simulation games on Vietnamese students’ entrepreneurial intention (2023)",
        "Strategic Groups Assessment: The Case of Vietnam Beer Market (2020)",
      ],
    },
  },
  {
    id: "doan-duc-minh",
    slug: "doan-duc-minh",
    name: "Đoàn Đức Minh",
    title: "Chuyên gia tư vấn & huấn luyện, Nghiên cứu sinh Tiến sĩ",
    avatar: "/Mentors/DDM.webp",
    role: "Đồng sáng lập HuyDong.com | Giảng viên thỉnh giảng",
    personalInfo: {
      "Họ và tên": "Đoàn Đức Minh",
      "Học vị": "Thạc Sĩ, Nghiên cứu sinh Tiến sĩ",
    },
    organization: [
      "Đồng sáng lập & Giám đốc chiến lược – HuyDong.com/LoanVi.com",
      "Giảng viên thỉnh giảng – ĐH Kinh tế TP.HCM, ĐH Tôn Đức Thắng, ĐH KHXH&NV",
      "Giảng viên cao cấp – John & Partners, Trường Doanh nhân PTI",
    ],
    education: [
      { degree: "Nghiên cứu sinh Tiến sĩ Quản trị Kinh Doanh", school: "Viện Đào tạo quốc tế, ĐH Kinh tế TP.HCM", year: "2015 - nay" },
      { degree: "Thạc sĩ Quản trị Kinh doanh", school: "Viện Đào tạo quốc tế, ĐH Kinh tế TP.HCM", year: "2014" },
      { degree: "Cử nhân Quản trị Kinh Doanh", school: "ĐH Kinh tế TP.HCM", year: "2008" },
    ],
    workHistory: [
      "05/2014–nay: Đồng sáng lập và Giám đốc chiến lược – Công ty tài chính công nghệ HuyDong.com/LoanVi.com",
      "01/2014–12/2016: Giám đốc chương trình - Viện đào tạo Quốc tế (Đại học Kinh tế TP.HCM)",
      "06/2012–09/2013: Giám đốc Quan hệ khách hàng Doanh nghiệp và Quản trị rủi ro – Ngân hàng Shinhan Việt Nam",
      "04/2010–06/2012: Chuyên viên Quan hệ khách hàng – Ngân hàng United Overseas (UOB)",
      "09/2009–04/2010: Trưởng phòng kinh doanh – Khách sạn Ramana Saigon",
    ],
    subjects: [
      "Kỹ năng mềm",
      "Kỹ năng bán hàng",
      "Tài chính cho người không chuyên",
      "Xây dựng và phát triển đội nhóm",
      "Tư duy sáng tạo và phản biện",
      "Phát triển đội ngũ đào tạo nội bộ (Train the Trainer)",
      "Chiến lược kinh doanh",
    ],
    achievements: [
      "Đồng sáng lập công ty Fintech HuyDong.com/LoanVi.com",
      "Kinh nghiệm quản lý cấp cao tại các ngân hàng quốc tế như Shinhan, UOB",
      "Giảng viên thỉnh giảng tại nhiều trường đại học và tổ chức giáo dục uy tín",
    ],
  },
  {
    id: "nguyen-chi-thanh",
    slug: "nguyen-chi-thanh",
    name: "Nguyễn Chí Thành",
    title: "CEO",
    avatar: "/Mentors/NCT.webp",
    role: "CEO Làng Kết nối Kinh doanh VABIX",
    personalInfo: {
      "Họ và tên": "Nguyễn Chí Thành",
      "Chức vụ": "CEO",
    },
    organization: [
      "Làng Kết nối Kinh doanh VABIX",
    ],
    subjects: [
      "Personal Coaching",
      "Career Development",
      "Mindfulness",
      "Leadership",
    ],
    achievements: [
      "Founder Làng Kết nối Kinh doanh VABIX",
      "Chuyên gia coaching cá nhân",
    ],
  },
  {
    id: "le-nhat-truong-chinh",
    slug: "le-nhat-truong-chinh",
    name: "Lê Nhật Trường Chinh",
    title: "CEO & Founder",
    avatar: "/Mentors/LNTC.webp",
    role: "CEO & Founder SUCCESS Partner Co.Ltd",
    personalInfo: {
      "Họ và tên": "Lê Nhật Trường Chinh",
      "Chức vụ": "CEO & Founder",
    },
    organization: [
      "SUCCESS Partner Co.Ltd",
    ],
    subjects: [
      "Innovation",
      "Entrepreneurship",
      "Design Thinking",
      "Startup Development",
    ],
    achievements: [
      "Founder SUCCESS Partner Co.Ltd",
      "Chuyên gia đổi mới sáng tạo",
    ],
  },
  {
    id: "phan-phat-huy",
    slug: "phan-phat-huy",
    name: "Phan Phát Huy",
    title: "CEO & Founder",
    avatar: "/Mentors/PPH.webp",
    role: "CEO & Founder HILTOW LANDMARK",
    personalInfo: {
      "Họ và tên": "Phan Phát Huy",
      "Chức vụ": "CEO & Founder",
    },
    organization: [
      "HILTOW LANDMARK",
    ],
    subjects: [
      "Soft Skills",
      "Public Speaking",
      "Emotional Intelligence",
      "Communication",
    ],
    achievements: [
      "Founder HILTOW LANDMARK",
      "Chuyên gia phát triển kỹ năng mềm",
    ],
  },
];