'use client'

import { useActionState } from 'react'
import { signIn, type AuthFormState } from '@/app/auth/actions'
import { FormError, Spinner, inputClass, labelClass, submitClass } from './form-ui'

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(signIn, {})

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <input type="hidden" name="next" value={next ?? ''} />

      <div>
        <label htmlFor="email" className={labelClass}>
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="sodam@example.com"
          defaultValue={state.values?.email}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="비밀번호를 입력하세요"
          className={inputClass}
        />
      </div>

      <FormError message={state.error} />

      <button type="submit" disabled={pending} className={submitClass}>
        {pending && <Spinner />}
        {pending ? '로그인 중…' : '로그인'}
      </button>
    </form>
  )
}
