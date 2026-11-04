'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import type { AuthError } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import { hasSupabaseEnv, safeNextPath } from '@/lib/supabase/env'

export type AuthFormState = {
  error?: string
  values?: Record<string, string>
}

const NOT_CONFIGURED = '회원 기능이 아직 설정되지 않았습니다. 관리자에게 문의해 주세요.'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^01[0-9]-?\d{3,4}-?\d{4}$/

// Supabase 오류를 한국어 안내 문구로 변환
function toKoreanMessage(error: AuthError, where: string) {
  // 원인 확인용: npm run dev 를 실행한 cmd 창(또는 Vercel 로그)에 실제 오류가 찍힙니다.
  console.error(`[${where}] Supabase 오류`, { code: error.code, status: error.status, message: error.message })

  const message = (() => {
    switch (error.code) {
      case 'invalid_credentials':
        return '이메일 또는 비밀번호가 올바르지 않습니다.'
      case 'email_not_confirmed':
        return '이메일 인증이 아직 완료되지 않았습니다. 메일함에서 인증 링크를 눌러 주세요.'
      case 'user_already_exists':
      case 'email_exists':
        return '이미 가입된 이메일입니다. 로그인해 주세요.'
      case 'weak_password':
        return '비밀번호가 너무 단순합니다. 영문·숫자를 섞어 8자 이상으로 입력해 주세요.'
      case 'email_address_invalid':
        return '사용할 수 없는 이메일 주소입니다.'
      case 'email_address_not_authorized':
        return '인증 메일을 보낼 수 없는 주소입니다. (Supabase에서 Confirm email 설정을 확인해 주세요)'
      case 'over_email_send_rate_limit':
      case 'over_request_rate_limit':
        return '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.'
      case 'signup_disabled':
      case 'email_provider_disabled':
        return '현재 회원가입을 받지 않고 있습니다.'
      case 'unexpected_failure':
        return '회원 정보를 저장하지 못했습니다. (데이터베이스 설정을 확인해 주세요)'
    }
    if (/invalid api key/i.test(error.message)) return '서버 연결 키가 올바르지 않습니다. (.env.local 의 키를 확인해 주세요)'
    if (/database error/i.test(error.message)) return '회원 정보를 저장하지 못했습니다. (데이터베이스 설정을 확인해 주세요)'
    if (/fetch failed|network/i.test(error.message)) return '서버에 연결하지 못했습니다. (.env.local 의 주소를 확인해 주세요)'
    return '처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'
  })()

  // 개발 중(npm run dev)에는 화면에도 실제 오류 내용을 함께 표시
  if (process.env.NODE_ENV !== 'production') {
    return `${message}\n[개발용 상세] ${error.code ?? error.status ?? ''} ${error.message}`
  }
  return message
}

// 이메일 인증 링크에 넣을 사이트 주소 (localhost / vercel.app 자동 구분)
async function getSiteOrigin() {
  const h = await headers()
  const origin = h.get('origin')
  if (origin) return origin
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000'
  const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https')
  return `${proto}://${host}`
}

/** 회원가입 */
export async function signUp(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const phone = String(formData.get('phone') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const passwordConfirm = String(formData.get('passwordConfirm') ?? '')
  const agreed = formData.get('agree') === 'on'
  const values = { name, email, phone, agree: agreed ? 'on' : '' }

  if (!hasSupabaseEnv) return { error: NOT_CONFIGURED, values }
  if (!name || name.length > 30) return { error: '이름을 30자 이내로 입력해 주세요.', values }
  if (!EMAIL_RE.test(email)) return { error: '이메일 주소를 정확히 입력해 주세요.', values }
  if (phone && !PHONE_RE.test(phone)) return { error: '휴대폰 번호를 010-1234-5678 형식으로 입력해 주세요.', values }
  if (password.length < 8) return { error: '비밀번호는 8자 이상으로 입력해 주세요.', values }
  if (password !== passwordConfirm) return { error: '비밀번호 확인이 일치하지 않습니다.', values }
  if (!agreed) return { error: '개인정보 수집·이용에 동의해 주세요.', values }

  const supabase = await createClient()
  const origin = await getSiteOrigin()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // 이름·휴대폰 번호는 가입과 동시에 profiles 테이블에 저장됩니다 (supabase/schema.sql 참고)
      data: { name, phone },
      emailRedirectTo: `${origin}/auth/confirm?next=/mypage`,
    },
  })

  if (error) return { error: toKoreanMessage(error, 'signUp'), values }

  // 이메일 인증을 켜 둔 경우, 이미 가입된 이메일이면 오류 대신 빈 identities 가 돌아옵니다.
  if (data.user && data.user.identities?.length === 0) {
    return { error: '이미 가입된 이메일입니다. 로그인해 주세요.', values }
  }

  // 이메일 인증을 꺼 둔 경우: 바로 로그인 상태
  if (data.session) {
    revalidatePath('/', 'layout')
    redirect('/')
  }

  // 이메일 인증을 켜 둔 경우: 인증 메일 안내 화면으로
  redirect(`/auth/sign-up-success?email=${encodeURIComponent(email)}`)
}

/** 로그인 */
export async function signIn(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const next = safeNextPath(String(formData.get('next') ?? ''))
  const values = { email }

  if (!hasSupabaseEnv) return { error: NOT_CONFIGURED, values }
  if (!email || !password) return { error: '이메일과 비밀번호를 입력해 주세요.', values }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return { error: toKoreanMessage(error, 'signIn'), values }

  revalidatePath('/', 'layout')
  redirect(next)
}

/** 로그아웃 */
export async function signOut() {
  if (hasSupabaseEnv) {
    const supabase = await createClient()
    await supabase.auth.signOut()
  }
  revalidatePath('/', 'layout')
  redirect('/')
}
