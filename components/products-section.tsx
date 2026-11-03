import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const products = [
  {
    tag: '백일 · 돌잔치',
    title: '아기 첫 경사 답례떡',
    description: '무병장수를 기원하는 백설기와 액운을 막는 수수팥떡. 아기 이름을 새긴 맞춤 스티커로 포장해 드립니다.',
    price: '개당 1,200원부터',
    image: '/images/product-baekil.png',
    alt: '리본 라벨로 개별 포장된 백설기와 수수팥떡',
  },
  {
    tag: '결혼 · 이바지',
    title: '혼례 이바지떡 세트',
    description: '오색 꽃절편과 약식, 정과를 정갈한 찬합과 비단 보자기에 담아 양가에 귀한 마음을 전합니다.',
    price: '세트 89,000원부터',
    image: '/images/product-wedding.png',
    alt: '비단 보자기에 싸인 찬합 속 오색 꽃떡',
  },
  {
    tag: '기업 · 단체',
    title: '기업 행사 답례떡',
    description: '창립기념일, 명절 선물, 세미나 간식까지. 로고 각인 패키지와 전국 동시 배송으로 대량 주문도 간편하게.',
    price: '100개 이상 단체 할인',
    image: '/images/product-corporate.png',
    alt: '크라프트 선물 상자에 담긴 개별 포장 인절미와 송편',
  },
]

export function ProductsSection() {
  return (
    <section id="products" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium tracking-[0.25em] text-accent">COLLECTION</p>
            <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">마음을 전하는 순간마다</h2>
          </div>
          <p className="max-w-sm leading-relaxed text-muted-foreground">
            인생의 소중한 날, 그 의미에 꼭 맞는 떡을 골라 정성껏 준비합니다.
          </p>
        </div>

        <ul className="mt-14 grid gap-8 md:grid-cols-3">
          {products.map((product) => (
            <li key={product.title}>
              <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-primary">
                    {product.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-xl font-bold">{product.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                    <span className="text-sm font-medium text-primary">{product.price}</span>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
                    >
                      자세히
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                      <span className="sr-only">{product.title} 상담</span>
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
