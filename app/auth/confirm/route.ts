import { type EmailOtpType } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { safeNextPath } from '@/lib/supabase/env'

// 인증 메일 속 링크를 눌렀을 때 들어오는 주소
// (Supabase 기본 메일은 ?code=..., 메일 템플릿을 바꾼 경우 ?token_hash=...&type=... 형태)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = safeNextPath(searchParams.get('next'), '/mypage')

  const supabase = await createClient()

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) redirect(next)
    // 다른 기기·브라우저에서 링크를 연 경우: 인증 자체는 끝났을 수 있으니 로그인 안내
    redirect('/auth/error?reason=link')
  }

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
    if (!error) redirect(next)
    redirect('/auth/error?reason=expired')
  }

  redirect('/auth/error?reason=invalid')
}
