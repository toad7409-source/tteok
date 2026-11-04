import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { hasSupabaseEnv, supabaseKey, supabaseUrl } from './env'

// 로그인해야 들어갈 수 있는 페이지
const PROTECTED_PATHS = ['/mypage']
// 이미 로그인한 사람은 볼 필요 없는 페이지
const GUEST_ONLY_PATHS = ['/auth/login', '/auth/sign-up']

const startsWithAny = (path: string, list: string[]) =>
  list.some((p) => path === p || path.startsWith(`${p}/`))

/**
 * 모든 요청마다 로그인 세션(토큰)을 갱신하고,
 * 보호된 페이지는 로그인 여부를 확인합니다.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  // Supabase 설정 전에는 아무것도 하지 않음
  if (!hasSupabaseEnv) return response

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        // 로그인 쿠키가 담긴 응답이 캐시되지 않도록 하는 헤더
        Object.entries(headers ?? {}).forEach(([key, value]) => response.headers.set(key, value))
      },
    },
  })

  // 주의: createServerClient 와 getClaims 사이에 다른 코드를 넣지 마세요.
  const { data } = await supabase.auth.getClaims()
  const isLoggedIn = Boolean(data?.claims?.sub)
  const path = request.nextUrl.pathname

  // 갱신된 쿠키를 유지한 채로 다른 주소로 보내는 함수
  const redirectTo = (pathname: string, params?: Record<string, string>) => {
    const url = request.nextUrl.clone()
    url.pathname = pathname
    url.search = ''
    Object.entries(params ?? {}).forEach(([k, v]) => url.searchParams.set(k, v))
    const redirect = NextResponse.redirect(url)
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie))
    for (const header of ['cache-control', 'expires', 'pragma']) {
      const value = response.headers.get(header)
      if (value) redirect.headers.set(header, value)
    }
    return redirect
  }

  if (!isLoggedIn && startsWithAny(path, PROTECTED_PATHS)) {
    return redirectTo('/auth/login', { next: path })
  }

  if (isLoggedIn && startsWithAny(path, GUEST_ONLY_PATHS)) {
    return redirectTo('/')
  }

  return response
}
