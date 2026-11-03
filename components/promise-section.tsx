import { Wheat, Sunrise, Package, Truck } from 'lucide-react'

const promises = [
  {
    icon: Wheat,
    title: '국내산 햅쌀',
    description: '경기 이천과 전남 해남 계약 농가에서 받은 햅쌀만 사용합니다.',
  },
  {
    icon: Sunrise,
    title: '당일 생산 · 당일 출고',
    description: '새벽에 쪄낸 떡을 그날 바로 포장해 가장 말랑한 상태로 보냅니다.',
  },
  {
    icon: Package,
    title: '맞춤 패키지',
    description: '이름·문구·로고를 새긴 스티커와 상자로 특별한 날을 기억하게 합니다.',
  },
  {
    icon: Truck,
    title: '전국 신선 배송',
    description: '보냉 포장과 지정일 배송으로 행사 당일에 맞춰 정확히 도착합니다.',
  },
]

export function PromiseSection() {
  return (
    <section id="promise" className="bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-[0.25em] text-primary-foreground/70">OUR PROMISE</p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-balance md:text-4xl">
            정직한 떡을 위한 소담의 네 가지 약속
          </h2>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-lg bg-primary-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((item, index) => (
            <li key={item.title} className="flex flex-col bg-primary p-8">
              <span className="font-serif text-sm text-primary-foreground/60">0{index + 1}</span>
              <item.icon className="mt-6 size-8" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-6 font-serif text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
