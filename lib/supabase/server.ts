import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { hasSupabaseEnv, supabaseKey, supabaseUrl } from './env'

/**
 * 서버(페이지·서버 액션·라우트)에서 쓰는 Supabase 클라이언트.
 * 요청마다 새로 만들어야 하므로 전역 변수에 저장하지 마세요.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // 서버 컴포넌트에서는 쿠키를 쓸 수 없어 오류가 나지만,
          // proxy.ts 가 로그인 세션을 갱신하므로 무시해도 됩니다.
        }
      },
    },
  })
}

/** 로그인한 사용자 정보 (로그인 안 했으면 null) */
export async function getCurrentUser() {
  if (!hasSupabaseEnv) return null
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const claims = data?.claims
  if (!claims?.sub) return null
  return { id: claims.sub, email: (claims.email as string | undefined) ?? '' }
}

/** 헤더에 표시할 회원 이름 (profiles 테이블 → 없으면 이메일 앞부분) */
export async function getCurrentMember() {
  const user = await getCurrentUser()
  if (!user) return null
  const supabase = await createClient()
  const { data } = await supabase.from('profiles').select('name').eq('id', user.id).maybeSingle()
  return { name: data?.name || user.email.split('@')[0] || '회원' }
}
