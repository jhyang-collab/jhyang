# 이메일 자동 전송 설정 가이드

## Cloudflare Workers를 사용한 이메일 전송 설정

### 1. Resend API 계정 생성 및 API 키 발급

1. https://resend.com/ 에서 무료 계정 생성
2. API Keys 메뉴에서 새 API 키 생성
3. 생성된 API 키 복사

### 2. Cloudflare Workers 배포

1. Cloudflare 대시보드에서 Workers & Pages로 이동
2. 새 Worker 생성
3. `workers/send-email.js` 파일 내용을 Worker에 복사
4. Settings > Variables에서 환경 변수 추가:
   - Variable name: `RESEND_API_KEY`
   - Value: Resend에서 받은 API 키
5. Worker 저장 및 배포
6. 배포된 Worker의 URL 확인 (예: `https://send-email-api.your-subdomain.workers.dev`)

### 3. index.html 업데이트

`index.html` 파일에서 `API_ENDPOINT` 변수를 배포된 Worker URL로 변경:

```javascript
const API_ENDPOINT = "https://send-email-api.your-subdomain.workers.dev";
```

### 4. 테스트

1. 견적서를 생성하고 버튼 클릭
2. 이메일이 `consulting@malgnsoft.com`으로 자동 전송되는지 확인

## 대안: 다른 이메일 서비스 사용

Resend 대신 다른 이메일 서비스를 사용하려면 `workers/send-email.js` 파일을 수정하세요:

- SendGrid: https://sendgrid.com/
- Mailgun: https://www.mailgun.com/
- AWS SES: https://aws.amazon.com/ses/

## 문제 해결

- 이메일이 전송되지 않으면 브라우저 콘솔에서 오류 확인
- Workers 로그에서 오류 확인
- Resend API 키가 올바르게 설정되었는지 확인

