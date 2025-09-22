import type { Metadata } from "next"
import ContactForm from "@/components/ContactForm"

export const metadata: Metadata = {
  title: "Liên hệ - MSC Center",
  description: "Liên hệ với MSC Center để được tư vấn về các chương trình đào tạo phù hợp",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactForm />
    </div>
  )
}
