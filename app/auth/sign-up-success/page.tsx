import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { AuthShell } from '@/components/auth/auth-shell'

export const metadata: Metadata = { title: '가입 신청 완료 | 소담떡방' }

export default async function SignUpSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const { email } = await searchParams

  return (
    <AuthShell eyebrow="ALMOST DONE" title="메일함을 확인해 주세요">
      <div className="flex flex-col items-center text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
          <Mail className="size-7" aria-hidden="true" />
        </span>
        <p className="mt-5 leading-relaxed">
          {email ? <strong className="font-medium">{email}</strong> : '입력하신 이메일'}
          {' '}로 인증 메일을 보냈습니다.
          <br />
          메일 속 링크를 누르면 가입이 완료됩니다.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          메일이 보이지 않으면 스팸함도 확인해 주세요. 인증 링크는 가입한 기기의 브라우저에서 여는 것이 가장 확실합니다.
        </p>
        <Link
          href="/auth/login"
          className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full border border-border bg-background font-medium transition-colors hover:border-primary hover:text-primary"
        >
          로그인 화면으로
        </Link>
      </div>
    </AuthShell>
  )
}
