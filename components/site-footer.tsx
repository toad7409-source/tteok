export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-serif text-2xl font-bold">소담떡방</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/70">
            고마운 마음을 떡 한 상자에 소담히 담아 전합니다.
          </p>
          <address className="mt-8 space-y-1 text-xs not-italic leading-relaxed text-background/60">
            <p>(주)소담푸드 · 대표 정소담 · 사업자등록번호 123-45-67890</p>
            <p>통신판매업신고 제2026-서울종로-0000호</p>
            <p>서울특별시 종로구 떡전골목길 12 · 고객센터 1588-1234</p>
          </address>
        </div>

        <nav aria-label="회사 정보">
          <p className="text-sm font-medium">회사</p>
          <ul className="mt-4 space-y-3 text-sm text-background/70">
            <li><a href="#story" className="hover:text-background">브랜드 이야기</a></li>
            <li><a href="#promise" className="hover:text-background">소담의 약속</a></li>
            <li><a href="#reviews" className="hover:text-background">고객 후기</a></li>
          </ul>
        </nav>

        <nav aria-label="고객 지원">
          <p className="text-sm font-medium">고객 지원</p>
          <ul className="mt-4 space-y-3 text-sm text-background/70">
            <li><a href="#products" className="hover:text-background">답례떡 둘러보기</a></li>
            <li><a href="#contact" className="hover:text-background">단체 주문 상담</a></li>
            <li><a href="#contact" className="hover:text-background">배송 안내</a></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-background/10">
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-background/50">
          © 2026 SODAM TTEOK. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
