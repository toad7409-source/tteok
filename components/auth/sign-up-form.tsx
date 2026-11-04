'use client'

import { useActionState } from 'react'
import { signUp, type AuthFormState } from '@/app/auth/actions'
import { FormError, Spinner, inputClass, labelClass, submitClass } from './form-ui'

export function SignUpForm() {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(signUp, {})

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="name" className={labelClass}>
          이름 <span className="text-primary">*</span>
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          maxLength={30}
          placeholder="홍길동"
          defaultValue={state.values?.name}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          이메일 <span className="text-primary">*</span>
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
          비밀번호 <span className="text-primary">*</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          placeholder="8자 이상"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="passwordConfirm" className={labelClass}>
          비밀번호 확인 <span className="text-primary">*</span>
        </label>
        <input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          required
          placeholder="비밀번호를 한 번 더 입력하세요"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          휴대폰 번호 <span className="text-xs font-normal text-muted-foreground">(선택)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="010-1234-5678"
          defaultValue={state.values?.phone}
          className={inputClass}
        />
      </div>

      <label className="flex items-start gap-3 rounded-lg bg-secondary/60 p-4 text-sm leading-relaxed">
        <input
          type="checkbox"
          name="agree"
          required
          defaultChecked={state.values?.agree === 'on'}
          className="mt-1 size-4 shrink-0 accent-primary" />
        <span>
          <span className="font-medium">[필수] 개인정보 수집·이용에 동의합니다.</span>
          <span className="mt-1 block text-muted-foreground">
            수집 항목: 이름, 이메일, 휴대폰 번호(선택) · 이용 목적: 회원 관리, 주문 상담 · 보유 기간: 회원 탈퇴 시까지
          </span>
        </span>
      </label>

      <FormError message={state.error} />

      <button type="submit" disabled={pending} className={submitClass}>
        {pending && <Spinner />}
        {pending ? '가입 처리 중…' : '회원가입'}
      </button>
    </form>
  )
}
