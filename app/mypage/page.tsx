import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { AuthShell } from '@/components/auth/auth-shell'
import { signOut } from '@/app/auth/actions'
import { createClient, getCurrentUser } from '@/lib/supabase/server'

export const metadata: Metadata = { title: '마이페이지 | 소담떡방' }

function formatDate(value?: string | null) {
  if (!value) return '-'
  return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long', timeZone: 'Asia/Seoul' }).format(new Date(value))
}

export default async function MyPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/auth/login?next=/mypage')

  // 데이터베이스(profiles 테이블)에서 회원 정보 불러오기
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('name, phone, created_at')
    .eq('id', user.id)
    .maybeSingle()

  const rows = [
    { label: '이름', value: profile?.name || '-' },
    { label: '이메일', value: user.email || '-' },
    { label: '휴대폰 번호', value: profile?.phone || '-' },
    { label: '가입일', value: formatDate(profile?.created_at) },
  ]

  return (
    <AuthShell
      eyebrow="MY PAGE"
      title={`${profile?.name || '회원'}님, 반갑습니다`}
      description="소담떡방 회원 정보입니다."
    >
      {!profile && (
        <p className="mb-6 rounded-lg bg-secondary/70 p-4 text-sm leading-relaxed text-muted-foreground">
          회원 정보 테이블을 찾지 못했습니다. Supabase에서 <code>supabase/schema.sql</code>을 실행했는지 확인해 주세요.
        </p>
      )}

      <dl className="divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 py-4 first:pt-0">
            <dt className="text-sm text-muted-foreground">{row.label}</dt>
            <dd className="text-right font-medium break-all">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full border border-border font-medium transition-colors hover:border-primary hover:text-primary"
        >
          홈으로
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            로그아웃
          </button>
        </form>
      </div>
    </AuthShell>
  )
}
