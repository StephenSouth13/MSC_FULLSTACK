// Extended MSCer data for detail pages
//data/mscer.ts
export interface MSCerDetail {
  id: string;
  name: string;
  company: string;
  position: string;
  avatar: string;
  achievement: string;
  testimonial: string;
  graduationYear: string;
  promotion: string;
  socialImpact: string;
  course: string;
  skills: string[];
  achievements: string[];
  mentoring: string;
  background: {
    education: string;
    previousRole: string;
    experience: string;
  };
}

export const mscersData: MSCerDetail[] = [
  {
    id: "pham-hoang-minh-khanh",
    name: "Phạm Hoàng Minh Khánh",
    company: "MSC",
    position: "GIÁM ĐỐC MSC",
    avatar: "/MSCers/PHMK.webp",
    achievement: "Nhà sáng lập đa ngành, Giảng viên & Chuyên gia tư vấn chiến lược",
    testimonial: "Kiến thức và kỹ năng được hệ thống hóa tại các trung tâm đào tạo đã trở thành nền tảng vững chắc, giúp tôi tự tin sáng lập và điều hành hiệu quả nhiều doanh nghiệp. Đây là nơi cung cấp tư duy chiến lược để biến ý tưởng thành hiện thực.",
    graduationYear: "2022",
    promotion: "Từ Trưởng phòng Marketing → Giám đốc → Nhà sáng lập & Viện phó",
    socialImpact: "Sáng lập và vận hành 3+ công ty trong lĩnh vực tư vấn, công nghệ và nông nghiệp. Giảng dạy và định hướng cho hàng ngàn sinh viên tại Đại học UEF.",
    course: "Leadership Excellence & Strategic Management",
    skills: [
      "Lãnh đạo & Quản trị",
      "Chiến lược Marketing",
      "Khởi nghiệp & Xây dựng doanh nghiệp",
      "Tư vấn doanh nghiệp",
      "Giảng dạy & Đào tạo"
    ],
    achievements: [
      "Sáng lập & Giám đốc Công ty TNHH Smentor (2017-nay)",
      "Sáng lập & Giám đốc Công ty cổ phần SMAR (2020-nay)",
      "Sáng lập & Giám đốc Công ty phát triển Nông Nghiệp Xanh SGA (2022-nay)",
      "Viện Phó, Viện Việt Nam Bách Nghệ Thực Hành (2021-nay)",
      "Giảng viên, Đại học Kinh Tế Tài Chính – TP.HCM (UEF) (2022-nay)"
    ],
    mentoring: "Với kinh nghiệm đa ngành, tôi tập trung mentoring cho các nhà sáng lập trẻ về xây dựng mô hình kinh doanh, chiến lược marketing và quản trị nhân sự. Đồng thời, tôi cũng hướng dẫn sinh viên về định hướng nghề nghiệp và khởi nghiệp.",
    background: {
      education: "Thạc sĩ Quản trị hệ điều hành, Đại học Kinh tế TP.HCM (2022); Cử nhân Marketing, Đại học Tài chính - Marketing (2017)",
      previousRole: "Trưởng phòng Marketing, Phó Giám đốc tại Smentor",
      experience: "Hơn 7 năm kinh nghiệm thực chiến trong lĩnh vực Marketing, tư vấn chiến lược và điều hành doanh nghiệp. Có chuyên môn sâu về giảng dạy và quản lý giáo dục."
    }
  },
  {
    id: "duong-the-khai",
    name: "Dương Thế Khải",
    company: "MSC",
    position: "PHÓ GIÁM ĐỐC",
    avatar: "/MSCers/DTK.webp",
    achievement: "Founder giải chạy Vietnam Student Marathon & Quản lý dự án chuyên nghiệp",
    testimonial: "Quá trình học tập và làm việc trong các dự án đã cho tôi khả năng quản lý và điều hành. Tôi tự hào khi sáng lập Vietnam Student Marathon, một sân chơi ý nghĩa cho cộng đồng sinh viên.",
    graduationYear: "2024",
    promotion: "Từ Chuyên viên ngân hàng → Quản lý dự án → Founder",
    socialImpact: "Sáng lập và tổ chức thành công giải chạy Vietnam Student Marathon, thu hút hàng ngàn sinh viên tham gia.",
    course: "Project Management & Community Building",
    skills: ["Quản lý dự án", "Tổ chức sự kiện", "Quan hệ khách hàng", "Lãnh đạo cộng đồng", "Đầu tư"],
    achievements: [
      "Founder và Trưởng BTC Vietnam Student Marathon (2023-nay)",
      "Quản lý dự án tại Công ty CP Tập đoàn Nam Quốc (2025-nay)",
      "Trợ lý Giám đốc tại Công ty TNHH F FOUNDATION (2024-nay)",
      "Quản lý dự án tại Công ty phát triển Nông Nghiệp Xanh SGA (2024-2025)"
    ],
    mentoring: "Tôi chia sẻ kinh nghiệm về cách quản lý dự án từ A-Z, từ lên kế hoạch, điều phối nguồn lực đến thực thi và đo lường hiệu quả, đặc biệt trong lĩnh vực tổ chức sự kiện và xây dựng cộng đồng.",
    background: {
      education: "Cử nhân Ngân hàng đầu tư - Đại học Kinh tế TP.HCM (2024)",
      previousRole: "Chuyên viên quan hệ khách hàng tại TP Bank",
      experience: "Kinh nghiệm đa dạng từ lĩnh vực tài chính - ngân hàng đến quản lý các dự án phát triển cộng đồng và nông nghiệp công nghệ cao."
    }
  },
  {
    id: "quach-thanh-long",
    name: "Quách Thành Long",
    company: "MSC",
    position: "TRƯỞNG PHÒNG CNTT",
    avatar: "/MSCers/QTL.webp",
    achievement: "Developer đa năng, Business Analyst & Nhà đầu tư",
    testimonial: "Áp dụng kiến thức từ các khoá học, tôi đã xây dựng và dẫn dắt nhiều dự án công nghệ, từ website msc.edu.vn đến các phần mềm quản lý, đồng thời phát triển kỹ năng phân tích kinh doanh để tạo ra giải pháp tối ưu.",
    graduationYear: "2024",
    promotion: "Từ Business Analyst (Thực tập) → Web Developer → Trưởng phòng CNTT",
    socialImpact: "Leader và developer chính của website msc.edu.vn; Tổ chức lớp lập trình cơ bản miễn phí cho cộng đồng.",
    course: "Technology Leadership & Business Analysis",
    skills: ["Full-Stack Development (React, Next.js, Node.js)", "Game Development (Unity, Godot)", "Business Analysis", "Database Management (MySQL)", "DevOps"],
    achievements: [
      "Trưởng phòng Công nghệ thông tin – Trung tâm MSC (05/2025 – nay)",
      "Giải Nhất Học bổng Tài năng VTC Academy – Ngành Phát triển Game (2024)",
      "Leader & Developer website giáo dục msc.edu.vn",
      "Vô địch Marathon VSM 2024 – Cự ly 42km",
      "Top 3 Dự án Business Analyst – BAC 2024"
    ],
    mentoring: "Tổ chức các lớp lập trình miễn phí và chia sẻ kinh nghiệm về phát triển sự nghiệp trong ngành CNTT, đặc biệt là về C#, C++, và các framework JavaScript hiện đại.",
    background: {
      education: "Cử nhân Kinh tế Đầu tư & Phát triển Game (đang theo học), Cử nhân Quản trị Nhân lực (2024)",
      previousRole: "Web Developer, Business Analyst (Intern), Strategic Advisor",
      experience: "Kinh nghiệm đa dạng từ Business Analyst, Web/Game Developer đến tư vấn chiến lược. Có khả năng kết hợp giữa tư duy kinh doanh và kỹ thuật."
    }
  },
  {
    id: "la-phuong-uyen",
    name: "Lã Phương Uyên",
    position: "Thực tập sinh Quản lý đơn hàng",
    company: "Mercedes-Benz Vietnam",
    avatar: "/MSCers/LPU.webp",
    achievement: "Thực tập sinh hiệu suất cao tại Mercedes-Benz Vietnam",
    testimonial: "Môi trường đào tạo chuyên nghiệp đã giúp tôi trang bị các kỹ năng cần thiết để tự tin ứng tuyển và hoàn thành tốt vai trò thực tập sinh tại một tập đoàn đa quốc gia như Mercedes-Benz.",
    graduationYear: "2024",
    promotion: "Sinh viên → Trợ lý dự án → Thực tập sinh tại Mercedes-Benz",
    socialImpact: "Áp dụng thành công các công cụ như SAP và Excel VBA để tối ưu hóa quy trình quản lý đơn hàng.",
    course: "Supply Chain Management & Business Communication",
    skills: ["Quản lý đơn hàng", "SAP", "VBA Excel", "Điều phối logistics", "Giải quyết vấn đề", "Giao tiếp"],
    achievements: [
      "Hoàn thành xuất sắc kỳ thực tập 6 tháng tại Mercedes-Benz Vietnam",
      "Thành thạo sử dụng SAP và Excel VBA trong công việc thực tế",
      "Hoàn thành các khóa học nội bộ về Quản lý chuỗi cung ứng"
    ],
    mentoring: "Tôi có thể chia sẻ kinh nghiệm về cách chuẩn bị CV, phỏng vấn và làm việc hiệu quả trong môi trường doanh nghiệp lớn, đặc biệt là các kỹ năng thực tiễn về quản lý chuỗi cung ứng.",
    background: {
      education: "Cử nhân Kinh doanh - Đại học Kinh tế TP.HCM (2024)",
      previousRole: "Trợ lý dự án",
      experience: "Kinh nghiệm làm trợ lý dự án và hỗ trợ khách hàng, có kỹ năng thực tế về quản lý đơn hàng và chuỗi cung ứng trong ngành công nghiệp ô tô."
    }
  },
  {
    id: "nguyen-ngoc-thien-huong",
    name: "Nguyễn Ngọc Thiên Hương",
    position: "Sinh viên Thương mại điện tử",
    company: "Đại học Công Nghệ TP.HCM (HUTECH)",
    avatar: "/MSCers/NNTH.webp",
    achievement: "Sinh viên năng nổ trong các hoạt động cộng đồng",
    testimonial: "Tham gia các hoạt động và các khoá học kỹ năng mềm đã giúp tôi trở nên tự tin hơn trong giao tiếp và làm việc nhóm. Tôi đã học được cách xây dựng kịch bản và quản lý thời gian hiệu quả.",
    graduationYear: "Dự kiến 2026",
    promotion: "Học sinh → Sinh viên năm 3, Thực tập sinh",
    socialImpact: "Tích cực tham gia các hoạt động tình nguyện như Tiếp sức mùa thi, Mùa hè xanh, Xuân tình nguyện.",
    course: "Soft Skills & Content Creation",
    skills: ["Tư duy sáng tạo", "Quản lý thời gian", "Làm việc nhóm", "Giao tiếp", "Tin học văn phòng"],
    achievements: [
      "Thực tập tại Công ty ITECHCO, xây dựng kịch bản đào tạo (4/2023)",
      "Tham gia 5+ chiến dịch tình nguyện và hoạt động ngoại khóa lớn",
      "Đạt chứng chỉ Tin học ứng dụng (11/2023)"
    ],
    mentoring: "Tôi muốn chia sẻ với các bạn sinh viên về tầm quan trọng của hoạt động ngoại khóa và cách cân bằng giữa việc học và tham gia các chương trình xã hội để phát triển bản thân.",
    background: {
      education: "Sinh viên năm 3, chuyên ngành Thương mại điện tử - HUTECH",
      previousRole: "Học sinh",
      experience: "Kinh nghiệm thực tập ban đầu trong lĩnh vực xây dựng nội dung đào tạo và tham gia tích cực các hoạt động, sự kiện của trường và xã hội."
    }
  },
  {
    id: "pham-ngoc-thuy-trang",
    name: "Phạm Ngọc Thuỳ Trang",
    position: "Thực tập sinh Sales & Marketing",
    company: "Đại học Kinh tế TP.HCM",
    avatar: "/MSCers/PNTT.webp",
    achievement: "Quán quân & Á quân các cuộc thi học thuật",
    testimonial: "Các khóa học kỹ năng mềm và kinh nghiệm từ học kỳ doanh nghiệp đã giúp tôi hệ thống hóa kiến thức và áp dụng hiệu quả vào thực tế, từ việc phân tích SWOT đến quản lý nội dung truyền thông.",
    graduationYear: "Dự kiến 2026",
    promotion: "Sinh viên năm 2 → Thực tập sinh Marketing",
    socialImpact: "Đóng góp vào các hoạt động truyền thông và phân tích thị trường trong kỳ thực tập doanh nghiệp.",
    course: "Marketing Fundamentals & Public Speaking",
    skills: ["Tin học văn phòng (Excel)", "Thiết kế (Canva)", "Làm việc nhóm", "Giải quyết vấn đề", "Giao tiếp & Thuyết trình"],
    achievements: [
      "Quán quân – Cuộc thi Kể chuyện Bác Hồ 'Có Bác trong tim' (05/2024)",
      "Á Quân – Cuộc thi lý luận chính trị 'Coeus' (11/2024)",
      "Đạt chứng chỉ Microsoft Office Excel 2019",
      "Quản lý nội dung truyền thông và thiết kế hình ảnh trong kỳ thực tập"
    ],
    mentoring: "Tôi có thể chia sẻ kinh nghiệm về cách tham gia và đạt giải trong các cuộc thi học thuật, cũng như các kỹ năng cần thiết cho một thực tập sinh Marketing.",
    background: {
      education: "Sinh viên năm 2, chuyên ngành Kinh doanh Quốc tế - Đại học Kinh tế TP.HCM (GPA 3.5)",
      previousRole: "PG Freelancer",
      experience: "Kinh nghiệm thực tập trong lĩnh vực Marketing, bao gồm viết báo cáo, phân tích thị trường, quản lý nội dung và thiết kế. Có kinh nghiệm làm PG."
    }
  },
  {
    id: "tran-hoang-minh-thu",
    name: "Trần Hoàng Minh Thư",
    position: "Thư ký dự án",
    company: "Nam Quốc Group, MSC Center",
    avatar: "/MSCers/THMT.webp",
    achievement: "Có kinh nghiệm làm việc tại nhiều dự án và tổ chức",
    testimonial: "Nhờ tham gia vào nhiều dự án, tôi đã học được cách làm việc có quy trình, từ lập kế hoạch, viết báo cáo đến điều phối công việc. Đây là những kỹ năng quý giá cho sự nghiệp tương lai.",
    graduationYear: "Dự kiến 2026",
    promotion: "Sinh viên → Thư ký dự án",
    socialImpact: "Hỗ trợ điều phối và truyền thông cho nhiều dự án tại RICHS, Nam Quốc Group và MSC Center.",
    course: "Project Coordination & Communication",
    skills: ["Lập kế hoạch truyền thông", "Quản lý & điều phối dự án", "Viết content & thiết kế cơ bản", "Teamwork", "Giao tiếp"],
    achievements: [
      "Hỗ trợ các dự án tại MSC Center (05/2025-nay)",
      "Phụ trách content và thiết kế cho các thương hiệu tại Nam Quốc Group (03/2025-nay)",
      "Lập master plan, action plan truyền thông tại RICHS (11/2024 - 03/2025)"
    ],
    mentoring: "Tôi có thể chia sẻ về kinh nghiệm làm thư ký dự án, cách tổ chức công việc, và làm thế nào để hòa nhập nhanh chóng vào các môi trường làm việc khác nhau.",
    background: {
      education: "Sinh viên năm 3, chuyên ngành Thuế trong kinh doanh - Đại học Kinh tế TP.HCM (GPA 3.3)",
      previousRole: "Sinh viên",
      experience: "Kinh nghiệm thực chiến trong việc hỗ trợ, điều phối và lên kế hoạch cho các dự án tại nhiều tổ chức, viện nghiên cứu khác nhau."
    }
  },
  {
    id: "huynh-nguyen-quan",
    name: "Huỳnh Nguyễn Quân",
    position: "Sinh viên Sales & Marketing",
    company: "Đại học Kinh tế TP.HCM (UEH)",
    avatar: "/MSCers/HNQ.webp",
    achievement: "Sinh viên năng động, có kỹ năng lãnh đạo và nghiên cứu thị trường",
    testimonial: "Chương trình học tại UEH cùng với học kỳ doanh nghiệp đã giúp tôi kết nối mục tiêu học thuật với thực tiễn kinh doanh, nuôi dưỡng tư duy khởi nghiệp và phát triển chuyên môn.",
    graduationYear: "Dự kiến 2026",
    promotion: "Sinh viên năm 2",
    socialImpact: "Góp phần thiết kế và cải thiện chương trình học tại UEH.",
    course: "Sales, Marketing & Business English",
    skills: ["Giải quyết vấn đề", "Thuyết trình", "Kỹ năng lãnh đạo", "Nghiên cứu thị trường", "Làm việc nhóm", "Sử dụng AI"],
    achievements: [
      "Phân tích dữ liệu bằng Excel (Đạt được tháng 12/2024 – Trường ĐH Kinh tế TP.HCM)"
    ],
    mentoring: "Chia sẻ kinh nghiệm học tập và áp dụng kiến thức sales & marketing vào các dự án thực tế cho sinh viên khóa dưới.",
    background: {
      education: "Đại học Kinh tế TP.HCM (Ngành Sales & Marketing, Tiếng Anh thương mại)",
      previousRole: "Sinh viên",
      experience: "Tham gia học kỳ doanh nghiệp, góp phần cải thiện chương trình học và liên kết với thực tiễn kinh doanh."
    }
  },
  {
    id: "phan-bich-hop",
    name: "Phan Bích Hợp",
    position: "Founder & Trưởng BTC",
    company: "Vietnam Student Marathon",
    avatar: "/MSCers/PBH.webp",
    achievement: "Sinh viên xuất sắc (GPA 3.92), Project Manager và Founder giải chạy cộng đồng",
    testimonial: "Kinh nghiệm quản lý dự án từ DS Bridge, VSM và TORCH Project đã cho tôi những bài học thực tiễn quý giá về lãnh đạo, marketing và xây dựng cộng đồng, bổ sung hoàn hảo cho kiến thức chuyên ngành Kinh doanh quốc tế.",
    graduationYear: "Dự kiến 2025",
    promotion: "Cộng tác viên dự án → Trưởng Ban Marketing → Project Manager & Founder",
    socialImpact: "Sáng lập và điều hành giải chạy VSM; Quản lý chương trình khởi nghiệp cho sinh viên (DS Bridge 2024); Góp phần vào dự án cộng đồng được tài trợ bởi Mỹ.",
    course: "International Business & Project Management",
    skills: ["Quản lý dự án", "Khởi nghiệp", "Marketing", "Xây dựng cộng đồng", "Lãnh đạo", "Tiếng Anh (Thường xuyên)"],
    achievements: [
      "Project Manager cho dự án DS Bridge 2024 - The Startup Program",
      "Trưởng BTC Vietnam Student Marathon (VSM)",
      "Trưởng Ban Marketing của VSM & Run For Green (2023)",
      "Cộng tác viên trong TORCH Project (Dự án được tài trợ bởi Mỹ)",
      "GPA 3.92/4.00 - Đại học Kinh tế TP.HCM"
    ],
    mentoring: "Chia sẻ kinh nghiệm về quản lý dự án khởi nghiệp và tổ chức sự kiện cộng đồng cho các bạn sinh viên có cùng đam mê.",
    background: {
      education: "Cử nhân Kinh doanh quốc tế - Đại học Kinh tế TP.HCM (GPA 3.92)",
      previousRole: "Cộng tác viên dự án, Trưởng ban Marketing",
      experience: "Kinh nghiệm dày dặn trong việc quản lý các dự án khởi nghiệp, marketing cho các sự kiện thể thao cộng đồng và tham gia các dự án quốc tế."
    }
  },
  {
    id: "nguyen-tuan-dung",
    name: "Nguyễn Tuấn Dũng",
    position: "Web Developer Intern",
    company: "Metech Company",
    avatar: "/MSCers/NTD.webp",
    achievement: "Sinh viên Kỹ thuật Phần mềm với kinh nghiệm thực tập và các dự án cá nhân ấn tượng",
    testimonial: "Quá trình thực tập tại Metech và tự phát triển các dự án cá nhân đã giúp tôi biến kiến thức lý thuyết về ReactJS, Node.js thành kỹ năng thực tế, sẵn sàng cho các thách thức lớn hơn.",
    graduationYear: "N/A",
    promotion: "Sinh viên → Web Developer Intern",
    socialImpact: "Xây dựng các dự án mã nguồn mở hữu ích như website E-commerce và tạo email tạm thời.",
    course: "Software Engineering & Web Development",
    skills: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "RESTful APIs", "Git", "Agile", "AWS (định hướng)"],
    achievements: [
      "Web Developer Intern tại Metech Company",
      "Xây dựng dự án E-commerce Website (React, Node, MongoDB)",
      "Xây dựng dự án Temporary Email Website",
      "Đạt TOEIC 600"
    ],
    mentoring: "Chia sẻ kiến thức và kinh nghiệm phát triển web với React.js và Node.js, cũng như quy trình làm việc chuyên nghiệp với Git và Trello.",
    background: {
      education: "Sinh viên ngành Kỹ thuật Phần mềm - Đại học Kinh tế TP.HCM (UEH)",
      previousRole: "Sinh viên",
      experience: "Kinh nghiệm thực tập phát triển web theo mô hình Agile, sử dụng các công nghệ hiện đại như React.js, Node.js. Có các dự án cá nhân trên GitHub."
    }
  }
];