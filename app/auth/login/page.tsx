import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthShell } from '@/components/auth/auth-shell'
import { LoginForm } from '@/components/auth/login-form'
import { safeNextPath } from '@/lib/supabase/env'

export const metadata: Metadata = { title: '로그인 | 소담떡방' }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams
  const nextPath = safeNextPath(next, '/')

  return (
    <AuthShell
      eyebrow="LOGIN"
      title="로그인"
      description="소담떡방 회원으로 로그인하고 회원 정보를 확인하세요."
      footer={
        <>
          아직 회원이 아니신가요?{' '}
          <Link href="/auth/sign-up" className="font-medium text-primary underline-offset-4 hover:underline">
            회원가입
          </Link>
        </>
      }
    >
      <LoginForm next={nextPath} />
    </AuthShell>
  )
}
