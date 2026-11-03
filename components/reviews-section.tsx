import { Star } from 'lucide-react'

const reviews = [
  {
    quote: '아이 돌잔치 답례떡으로 주문했는데 하객분들이 떡이 너무 맛있다고 따로 연락을 주셨어요. 이름 스티커도 정말 예뻤습니다.',
    name: '김지은',
    meta: '돌잔치 답례떡 · 150개',
  },
  {
    quote: '전국 지점 12곳에 같은 날 배송이 필요했는데, 한 곳도 빠짐없이 신선하게 도착했습니다. 매년 명절 선물은 소담으로 정했어요.',
    name: '박준호 팀장',
    meta: '기업 명절 선물 · 2,400개',
  },
  {
    quote: '이바지떡을 보고 시부모님께서 정성이 느껴진다며 크게 기뻐하셨어요. 보자기 포장까지 하나하나 단정했습니다.',
    name: '이수민',
    meta: '혼례 이바지떡 세트',
  },
]

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <p className="text-sm font-medium tracking-[0.25em] text-accent">REVIEWS</p>
          <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">떡을 받은 분들의 이야기</h2>
          <p className="mt-4 text-muted-foreground">
            평균 만족도 <strong className="font-bold text-primary">4.9</strong> / 5.0 · 리뷰 38,000건
          </p>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <li key={review.name}>
              <figure className="flex h-full flex-col rounded-lg border border-border bg-card p-8">
                <div className="flex gap-0.5 text-primary" aria-label="별점 5점 만점에 5점">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-6 flex-1 leading-relaxed text-foreground/85">
                  {`"${review.quote}"`}
                </blockquote>
                <figcaption className="mt-8 border-t border-border pt-5">
                  <p className="font-medium">{review.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{review.meta}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
