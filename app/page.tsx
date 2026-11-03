import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { StorySection } from '@/components/story-section'
import { ProductsSection } from '@/components/products-section'
import { PromiseSection } from '@/components/promise-section'
import { ReviewsSection } from '@/components/reviews-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <StorySection />
        <ProductsSection />
        <PromiseSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
