# 이메일 자동 전송 설정 가이드

## Cloudflare Email Routing을 사용한 이메일 전송 설정

이 설정은 Cloudflare Email Routing과 호환되며, `consulting@malgnsoft.com`으로 이메일을 자동 전송합니다.

### 1. Resend API 계정 생성 및 API 키 발급

1. https://resend.com/ 에서 무료 계정 생성
2. API Keys 메뉴에서 새 API 키 생성
3. 생성된 API 키 복사

### 2. Cloudflare Email Routing 설정 (선택사항)

Cloudflare Email Routing을 사용하여 `consulting@malgnsoft.com`으로 받는 메일을 라우팅할 수 있습니다:

1. Cloudflare 대시보드에서 Email > Email Routing으로 이동
2. 도메인 추가 및 확인
3. 받는 주소 규칙 설정 (consulting@malgnsoft.com)

### 3. Cloudflare Pages Functions 환경 변수 설정

**중요:** Pages Functions를 사용하는 경우, 환경 변수를 Pages 프로젝트 설정에서 추가해야 합니다.

1. Cloudflare 대시보드에서 **Pages** → **jhyang** 프로젝트 선택
2. **Settings** 탭 클릭
3. **Environment variables** 섹션으로 스크롤
4. **Add variable** 버튼 클릭
5. 다음 정보 입력:
   - **Variable name:** `RESEND_API_KEY`
   - **Value:** Resend에서 받은 API 키
   - **Environment:** **Production** 선택 (필수!)
6. **Save** 클릭
7. **Deployments** 탭으로 이동하여 최신 배포를 다시 배포하거나, 새로운 커밋을 푸시하여 재배포

**⚠️ 주의사항:**
- 환경 변수는 **Production** 환경에 반드시 설정해야 합니다
- 환경 변수 추가 후 **재배포**가 필요합니다
- 배포가 완료되면 `https://jhyang.pages.dev/api/send-email` 엔드포인트가 환경 변수를 읽을 수 있습니다

### 4. (선택사항) Cloudflare Workers 배포

Workers를 별도로 사용하려면:

1. Cloudflare 대시보드에서 Workers & Pages로 이동
2. 새 Worker 생성
3. `workers/send-email.js` 파일 내용을 Worker에 복사
4. Settings > Variables에서 환경 변수 추가:
   - Variable name: `RESEND_API_KEY`
   - Value: Resend에서 받은 API 키
5. Worker 저장 및 배포
6. 배포된 Worker의 URL 확인 (예: `https://send-email-api.your-subdomain.workers.dev`)
7. `index.html`의 `API_ENDPOINT`를 Worker URL로 변경

### 5. 테스트

1. 견적서를 생성하고 버튼 클릭
2. 이메일이 `consulting@malgnsoft.com`으로 자동 전송되는지 확인

**참고:** 이메일은 항상 `consulting@malgnsoft.com`으로 전송됩니다.

## 대안: 다른 이메일 서비스 사용

Resend 대신 다른 이메일 서비스를 사용하려면 `workers/send-email.js` 파일을 수정하세요:

- SendGrid: https://sendgrid.com/
- Mailgun: https://www.mailgun.com/
- AWS SES: https://aws.amazon.com/ses/

## 문제 해결

- 이메일이 전송되지 않으면 브라우저 콘솔에서 오류 확인
- Workers 로그에서 오류 확인
- Resend API 키가 올바르게 설정되었는지 확인

