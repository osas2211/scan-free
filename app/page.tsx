import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { QRGenerator } from "@/components/qr-generator"
import { HowItWorks } from "@/components/how-it-works"
import { HowItWorksSteps } from "@/components/how-it-works-steps"
import { BlogPosts } from "@/components/blog-posts"
import { Footer } from "@/components/footer"
import { FAQ } from "@/components/faq"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <QRGenerator />
        <HowItWorks />
        <HowItWorksSteps />
        <BlogPosts />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
