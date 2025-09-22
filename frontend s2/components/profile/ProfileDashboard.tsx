"use client"

import { motion } from "framer-motion"
import { Building, Target, Eye, Crown, Phone, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// --- CẢI TIẾN: ĐỊNH NGHĨA KIỂU DỮ LIỆU ---
// Giúp code an toàn hơn, dễ bảo trì và được hỗ trợ tốt hơn từ trình soạn thảo.
interface Cofounder {
  name: string;
  title: string;
  company: string;
  imageSrc: string;
  specialties: string[];
}

// --- DỮ LIỆU ĐỘI NGŨ ĐỒNG SÁNG LẬP ---
// Áp dụng kiểu dữ liệu Cofounder[] để đảm bảo dữ liệu luôn đúng cấu trúc.
const cofoundersData: Cofounder[] = [
  {
    name: "TS. Phan Huỳnh Anh",
    title: "Tiến Sĩ Kinh tế",
    company: "Chủ tịch HĐQT Công ty Smentor",
    imageSrc: "/Mentors/PHA.webp",
    specialties: ["Leadership", "Strategic Management", "Business Coaching"],
  },
  {
    name: "Phạm Hoàng Minh Khánh",
    title: "Giám Đốc MSC",
    company: "Điều hành & Phát triển chương trình",
    imageSrc: "/MSCers/PHMK.webp",
    specialties: ["Academic Affairs", "Curriculum Development", "Quality Assurance"],
  },
  {
    name: "Dương Thế Khải",
    title: "Phó Giám Đốc MSC",
    company: "Chiến lược & Phát triển kinh doanh",
    imageSrc: "/MSCers/DTK.webp",
    specialties: ["Strategic Leadership", "Business Development", "Management"],
  },
  {
    name: "Đoàn Đức Minh",
    title: "Thạc Sĩ - Nghiên cứu sinh",
    company: "Giảng viên Đại học Western Sydney",
    imageSrc: "/Mentors/DDM.webp",
    specialties: ["Project Management", "Agile", "Digital Transformation"],
  },
  {
    name: "Quách Thành Long",
    title: "Trưởng phòng CNTT",
    company: "Hạ tầng & Công nghệ",
    imageSrc: "/MSCers/QTL.webp",
    specialties: ["IT Infrastructure", "Cybersecurity", "Cloud Computing"],
  },
];

// --- COMPONENT TRANG CHÍNH: HỒ SƠ NĂNG LỰC CÔNG TY MSC ---
const ProfileDashboard = () => {
  return (
    <div className="bg-white dark:bg-gray-950">
      {/* ===== HERO SECTION: LỜI GIỚI THIỆU ẤN TƯỢNG ===== */}
      <section className="relative bg-gray-900 text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-purple-600/70"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/grid-pattern.svg')" }}></div>
        <div className="relative container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Building className="mx-auto h-16 w-16 mb-6" />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Hồ Sơ Năng Lực Doanh Nghiệp MSC
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
              Tiên phong kiến tạo tương lai số qua các chương trình đào tạo Marketing & Communication thực chiến.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto py-16 px-4 space-y-24">
        {/* ===== SỨ MỆNH & TẦM NHÌN: KIM CHỈ NAM CỦA MSC ===== */}
        <section className="grid md:grid-cols-2 gap-8 items-stretch">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Card className="h-full bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 shadow-lg">
              <CardHeader><CardTitle className="flex items-center gap-3 text-2xl font-bold"><Target className="text-green-500" /> Sứ Mệnh</CardTitle></CardHeader>
              <CardContent><p className="text-lg text-gray-700 dark:text-gray-300">"Kiến tạo tương lai số bằng việc cung cấp các chương trình đào tạo thực chiến, chất lượng cao, giúp học viên làm chủ năng lực cạnh tranh trong kỷ nguyên Marketing & Communication."</p></CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Card className="h-full bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 shadow-lg">
              <CardHeader><CardTitle className="flex items-center gap-3 text-2xl font-bold"><Eye className="text-purple-500" /> Tầm Nhìn</CardTitle></CardHeader>
              <CardContent><p className="text-lg text-gray-700 dark:text-gray-300">"Trở thành biểu tượng của sự uy tín và chất lượng trong lĩnh vực đào tạo thực chiến tại Việt Nam, là bệ phóng vững chắc cho mọi thế hệ Marketer chuyên nghiệp."</p></CardContent>
            </Card>
          </motion.div>
        </section>

        {/* ===== ĐỘI NGŨ ĐỒNG SÁNG LẬP: NHỮNG NGƯỜI ĐẶT NỀN MÓNG ===== */}
        <section>
          <div className="text-center mb-12">
            <Crown className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Những Người Đặt Nền Móng Cho MSC</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              Hội tụ những bộ óc chiến lược và trái tim nhiệt huyết, đội ngũ đồng sáng lập là những người định hình tầm nhìn và cam kết cho sự phát triển bền vững của MSC.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {cofoundersData.map((person) => (
              <motion.div
                key={person.name}
                className="lg:col-span-1 md:col-span-1"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="flex flex-col h-full text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 dark:bg-gray-900">
                  <CardHeader>
                    <Avatar className="w-32 h-32 mx-auto mb-4 ring-4 ring-offset-4 dark:ring-offset-gray-900 ring-blue-500"><AvatarImage src={person.imageSrc} alt={person.name} /><AvatarFallback>{person.name.split(" ").slice(-2).map(n => n[0]).join("")}</AvatarFallback></Avatar>
                    <h3 className="text-xl font-bold">{person.name}</h3>
                    <p className="text-blue-500 font-semibold">{person.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 h-5">{person.company}</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="font-semibold text-left mb-2 text-gray-800 dark:text-gray-200">Lĩnh vực chuyên môn:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {person.specialties.map((spec) => <Badge key={spec} variant="secondary">{spec}</Badge>)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== CALL TO ACTION: LỜI KÊU GỌI HÀNH ĐỘNG ===== */}
        <section className="bg-gray-800 text-white rounded-xl py-16 px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold mb-4">Đồng hành cùng MSC trên hành trình sự nghiệp</h2>
            <p className="max-w-2xl mx-auto mb-8 text-gray-300">Khám phá các khóa học được thiết kế bởi những chuyên gia hàng đầu và sẵn sàng bứt phá trong sự nghiệp của bạn.</p>
            <div className="flex justify-center items-center gap-6 mb-8">
              <span className="flex items-center gap-2"><Phone size={18}/> (+84) 329 381 489</span>
              <span className="flex items-center gap-2"><Mail size={18}/>  msc.edu.vn@gmail.com</span>
            </div>
            <Button size="lg" className="bg-white text-blue-600 font-bold hover:bg-gray-200 transition-colors text-lg px-8 py-6">
              Xem Toàn Bộ Khóa Học
            </Button>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default ProfileDashboard;