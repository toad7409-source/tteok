import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { StorySection } from '@/components/story-section'
import { ProductsSection } from '@/components/products-section'
import { PromiseSection } from '@/components/promise-section'
import { ReviewsSection } from '@/components/reviews-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'
import { getCurrentMember } from '@/lib/supabase/server'

export default async function Page() {
  // 로그인한 회원이면 이름을, 아니면 null
  const member = await getCurrentMember()

  return (
    <>
      <SiteHeader member={member} />
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
