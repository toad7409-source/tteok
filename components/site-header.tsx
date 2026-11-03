'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '#story', label: '브랜드 이야기' },
  { href: '#products', label: '답례떡' },
  { href: '#promise', label: '소담의 약속' },
  { href: '#reviews', label: '고객 후기' },
  { href: '#contact', label: '단체 주문' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20">
        <a href="#top" className="flex items-center gap-3" aria-label="소담떡방 홈">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary font-serif text-lg font-bold text-primary-foreground">
            소
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-bold tracking-tight">소담떡방</span>
            <span className="mt-1 text-[10px] tracking-[0.3em] text-muted-foreground">SODAM TTEOK</span>
          </span>
        </a>

        <nav aria-label="주요 메뉴" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-foreground/80 transition-colors hover:text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 md:inline-flex"
        >
          주문 상담하기
        </a>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">메뉴 {open ? '닫기' : '열기'}</span>
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="모바일 메뉴"
        className={cn('border-t border-border bg-background md:hidden', open ? 'block' : 'hidden')}
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-5 py-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base text-foreground/80 hover:text-primary"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
