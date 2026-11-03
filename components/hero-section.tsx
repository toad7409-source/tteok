import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 md:grid-cols-2 md:pb-28 md:pt-20">
        <div className="flex flex-col items-start">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-1.5 text-xs font-medium tracking-wider text-primary">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            SINCE 1998 · 3대째 이어온 떡집
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight text-balance md:text-6xl md:leading-[1.15]">
            고마운 마음,
            <br />
            <span className="text-primary">떡 한 상자</span>에
            <br />
            소담히 담았습니다
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            백일과 돌잔치, 결혼과 기업 행사까지. 매일 새벽 국산 쌀을 쪄서 빚은 답례떡으로 소중한 분들께 감사의 인사를 전하세요.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              답례떡 둘러보기
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#story"
              className="inline-flex items-center rounded-full border border-foreground/20 px-7 py-3.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              브랜드 이야기
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full border border-border bg-secondary md:aspect-[4/5]">
            <Image
              src="/images/hero.png"
              alt="한지와 나무 상자에 담긴 알록달록한 답례떡 선물 세트"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 rounded-lg border border-border bg-card px-6 py-4 shadow-sm md:-left-10">
            <p className="font-serif text-3xl font-bold text-primary">120만+</p>
            <p className="mt-1 text-xs text-muted-foreground">누적 답례떡 판매 개수</p>
          </div>
        </div>
      </div>
    </section>
  )
}
