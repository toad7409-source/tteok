import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthShell } from '@/components/auth/auth-shell'
import { SignUpForm } from '@/components/auth/sign-up-form'

export const metadata: Metadata = { title: '회원가입 | 소담떡방' }

export default function SignUpPage() {
  return (
    <AuthShell
      eyebrow="JOIN US"
      title="회원가입"
      description="간단한 정보만 입력하면 가입이 완료됩니다."
      footer={
        <>
          이미 회원이신가요?{' '}
          <Link href="/auth/login" className="font-medium text-primary underline-offset-4 hover:underline">
            로그인
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthShell>
  )
}
