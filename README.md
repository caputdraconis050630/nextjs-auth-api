# nextjs-auth-api
NextJS와 TypeScript를 사용하여 인증 관련 API를 개발합니다.

## 요구사항
- NextJS, Typescript
- “JWT + 쿠키” 사용 (인증 프로세스는 자유 → 설명 필요)
- 아이디와 비밀번호를 통해 로그인
- POST /api/auth/login : 아이디와 비밀번호를 입력하면 로그인
- GET /api/auth/login : 현재 로그인된 사용자를 조회합니다. 로그인한 사용자가 없으면 에러 처리를 합니다.
- GET /api/users : 현재 회원가입한 사용자를 모두 보여줍니다.
- GET /api/users/:userId : 특정 유저 아이디로 사용자를 조회합니다.
- POST /api/auth/register : 아이디 입력, 닉네임 입력, 비밀번호 입력, 비밀번호 재입력 검사 → 회원가입
- PUT /api/users/:userId : 특정 유저 아이디로 해당 사용자 닉네임 수정합니다. 

