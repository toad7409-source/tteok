# 소담떡방 웹사이트 — 회원 기능 (Supabase)

회원가입 · 로그인 · 로그아웃 · 마이페이지가 추가된 버전입니다.
데이터베이스와 인증은 [Supabase](https://supabase.com)(무료 플랜)를 사용합니다.

## 추가된 화면

| 주소 | 내용 |
|---|---|
| `/auth/sign-up` | 회원가입 (이름·이메일·비밀번호·휴대폰(선택)·개인정보 동의) |
| `/auth/login` | 로그인 |
| `/auth/sign-up-success` | 인증 메일 발송 안내 |
| `/auth/confirm` | 인증 메일 링크 처리 |
| `/mypage` | 회원 정보 (로그인해야 접근 가능) |
| 상단 회원 메뉴 줄 | 로그인/회원가입 ↔ ○○님 · 마이페이지 · 로그아웃 |

## 설정 순서

### 1. Supabase 프로젝트 만들기
1. supabase.com → **Start your project** → GitHub 계정으로 로그인
2. **New project** → 이름 `tteok`, 데이터베이스 비밀번호 입력(따로 보관), Region은 **Northeast Asia (Seoul)** → **Create new project**

### 2. 데이터베이스 테이블 만들기
왼쪽 메뉴 **SQL Editor** → **New query** → `supabase/schema.sql` 내용을 전부 붙여넣고 **Run**

### 3. 사이트 주소 등록
**Authentication → URL Configuration**
- Site URL: `https://tteok-mu.vercel.app`
- Redirect URLs에 두 줄 추가: `http://localhost:3000/**`, `https://tteok-mu.vercel.app/**`

### 4. 연결 키 복사
상단 **Connect** 버튼(또는 Project Settings → API Keys)에서
- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- Publishable key(`sb_publishable_…`) → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

> ⚠️ `secret` / `service_role` 키는 절대 넣지 마세요.

### 5. 내 PC에서 실행
```
copy .env.example .env.local     (메모장으로 열어 4번 값 붙여넣기)
npm install
npm run dev
```

### 6. Vercel에 환경변수 등록 후 배포
Vercel 프로젝트 → **Settings → Environment Variables** 에 4번의 두 값을 추가한 뒤
```
git add .
git commit -m "회원가입/로그인 기능 추가"
git push
```

## 참고
- **이메일 인증**: 기본으로 켜져 있어 가입 후 메일 링크를 눌러야 로그인됩니다.
  테스트 중에는 Authentication → Sign In / Providers → Email → **Confirm email** 을 꺼도 됩니다(가입 즉시 로그인).
  Supabase 기본 메일 발송은 시간당 발송 수가 매우 적은 테스트용이므로, 실제 운영 시에는 SMTP(메일 서버)를 따로 연결하세요.
- **회원 목록 보기**: Supabase → Table Editor → `profiles`, 또는 Authentication → Users
- **개인정보 동의 문구**: 실제 운영 시에는 개인정보처리방침 페이지를 만들고 내용을 실제 운영 방식에 맞게 수정하세요.
