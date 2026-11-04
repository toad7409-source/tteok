import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthShell } from '@/components/auth/auth-shell'

export const metadata: Metadata = { title: '인증 안내 | 소담떡방' }

const MESSAGES: Record<string, { title: string; body: string }> = {
  link: {
    title: '인증 링크를 확인했어요',
    body: '가입한 기기와 다른 브라우저에서 링크를 열면 자동 로그인이 되지 않습니다. 이메일 인증은 완료되었을 수 있으니 로그인해 보세요.',
  },
  expired: {
    title: '인증 링크가 만료되었어요',
    body: '링크의 유효 시간이 지났거나 이미 사용된 링크입니다. 로그인해 보시고, 안 되면 다시 가입을 시도해 주세요.',
  },
  invalid: {
    title: '잘못된 접근이에요',
    body: '인증 정보가 올바르지 않습니다. 메일 속 링크를 다시 눌러 주세요.',
  },
}

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>
}) {
  const { reason } = await searchParams
  const message = MESSAGES[reason ?? ''] ?? MESSAGES.invalid

  return (
    <AuthShell eyebrow="NOTICE" title={message.title}>
      <p className="text-center leading-relaxed text-muted-foreground">{message.body}</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link
          href="/auth/login"
          className="inline-flex h-12 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          로그인하기
        </Link>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full border border-border font-medium transition-colors hover:border-primary hover:text-primary"
        >
          홈으로
        </Link>
      </div>
    </AuthShell>
  )
}
