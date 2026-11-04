import Link from 'next/link'
import { hasSupabaseEnv } from '@/lib/supabase/env'

// 로그인·회원가입 화면 공통 틀 (사이트 색감 그대로)
export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  eyebrow: string
  title: string
  description?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="border-b border-border/70">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-5 md:h-20">
          <Link href="/" className="flex items-center gap-3" aria-label="소담떡방 홈">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary font-serif text-lg font-bold text-primary-foreground">
              소
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-serif text-lg font-bold tracking-tight">소담떡방</span>
              <span className="mt-1 text-[10px] tracking-[0.3em] text-muted-foreground">SODAM TTEOK</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-start justify-center px-5 py-12 md:items-center md:py-20">
        <div className="w-full max-w-md">
          <div className="text-center">
            <p className="text-sm font-medium tracking-[0.25em] text-accent">{eyebrow}</p>
            <h1 className="mt-3 font-serif text-3xl font-bold">{title}</h1>
            {description && <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>}
          </div>

          {!hasSupabaseEnv && (
            <p className="mt-8 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm leading-relaxed text-destructive">
              Supabase 연결 정보(환경변수)가 아직 설정되지 않았습니다. README의 설정 순서를 먼저 진행해 주세요.
            </p>
          )}

          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">{children}</div>

          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </main>
    </div>
  )
}
