import Image from 'next/image'

const stats = [
  { value: '27년', label: '한 자리에서 지켜온 손맛' },
  { value: '100%', label: '국내산 햅쌀 사용' },
  { value: '3,800+', label: '함께한 기업·기관' },
]

export function StorySection() {
  return (
    <section id="story" className="border-y border-border bg-secondary/60 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[5fr_6fr] md:gap-20">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
          <Image
            src="/images/story.png"
            alt="장인이 나무 도마 위에서 떡 반죽을 빚는 모습"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-medium tracking-[0.25em] text-accent">OUR STORY</p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-snug text-balance md:text-4xl">
            할머니의 떡시루에서
            <br />
            시작된 이야기
          </h2>
          <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
            <p>
              1998년, 시장 골목의 작은 방앗간에서 소담떡방은 시작되었습니다. 이웃의 경사에 떡을 나누던 할머니의 마음처럼, 우리는 떡 한 조각에도 축하와 감사를 담아야 한다고 믿습니다.
            </p>
            <p>
              3대째 이어온 지금도 변하지 않은 것이 있습니다. 매일 새벽 4시 쌀을 불리고, 당일 만든 떡만 당일 보내는 것. 방부제와 인공 감미료 없이, 정직한 재료로만 빚습니다.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-2xl font-bold text-primary md:text-3xl">{stat.value}</dd>
                <dd className="mt-2 text-xs leading-relaxed text-muted-foreground md:text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
