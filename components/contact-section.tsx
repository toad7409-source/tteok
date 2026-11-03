import { Phone, MessageCircle, Clock } from 'lucide-react'

const steps = ['상담 접수', '시식 샘플 발송', '디자인 확정', '당일 생산·배송']

export function ContactSection() {
  return (
    <section id="contact" className="pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 rounded-2xl border border-border bg-secondary/70 p-8 md:grid-cols-2 md:p-14">
          <div>
            <p className="text-sm font-medium tracking-[0.25em] text-accent">GROUP ORDER</p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-snug text-balance md:text-4xl">
              특별한 날을 위한
              <br />
              맞춤 단체 주문
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              수량, 예산, 행사 일정만 알려주세요. 전담 매니저가 상황에 꼭 맞는 구성과 패키지를 제안해 드립니다.
            </p>

            <ol className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {steps.map((step, index) => (
                <li key={step} className="flex flex-col gap-2">
                  <span className="flex size-8 items-center justify-center rounded-full border border-primary font-serif text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <a
              href="tel:15881234"
              className="flex items-center gap-5 rounded-lg bg-primary p-6 text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Phone className="size-6 shrink-0" aria-hidden="true" />
              <span>
                <span className="block text-sm text-primary-foreground/75">전화 상담</span>
                <span className="mt-1 block font-serif text-2xl font-bold">1588-1234</span>
              </span>
            </a>
            <a
              href="#contact"
              className="flex items-center gap-5 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <MessageCircle className="size-6 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <span className="block text-sm text-muted-foreground">카카오톡 상담</span>
                <span className="mt-1 block font-serif text-xl font-bold">@소담떡방</span>
              </span>
            </a>
            <div className="flex items-center gap-5 p-6 pt-2 text-sm text-muted-foreground">
              <Clock className="size-5 shrink-0" aria-hidden="true" />
              <span>평일 08:00 – 18:00 · 토요일 08:00 – 13:00 (일요일·공휴일 휴무)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
