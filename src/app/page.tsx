import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ContactForms } from "@/components/contact-forms"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <div className="main">
        <Header />
        <HeroSection />
      </div>
      <ContactForms />
      <Footer />
    </>
  )
}
