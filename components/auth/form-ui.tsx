// 로그인·회원가입 폼에서 함께 쓰는 스타일과 작은 컴포넌트
// 입력칸 공통 스타일
export const inputClass =
  'mt-2 block h-12 w-full rounded-lg border border-input bg-background px-4 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-3 focus:ring-ring/20'

export const labelClass = 'block text-sm font-medium'

export const submitClass =
  'inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'

// 버튼 안에 표시되는 로딩 표시
export function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  )
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm whitespace-pre-line break-all text-destructive">
      {message}
    </p>
  )
}
