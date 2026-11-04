// Supabase 연결 정보가 설정돼 있는지 확인
// (설정 전에도 사이트 홈 화면은 정상적으로 열리도록 하기 위해 사용)
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? ''

export const hasSupabaseEnv = Boolean(supabaseUrl && supabaseKey)

// 로그인 후 돌아갈 경로가 사이트 내부 주소인지 확인 (외부 사이트로 튕기는 것 방지)
export function safeNextPath(next: string | null | undefined, fallback = '/') {
  if (!next || !next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) {
    return fallback
  }
  return next
}
