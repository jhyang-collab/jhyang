// Cloudflare Pages Functions를 사용한 이메일 전송 API
// Cloudflare Email Routing과 호환되는 이메일 전송
// consulting@malgnsoft.com으로 이메일 전송

export async function onRequestPost(context) {
  const { request, env } = context;
  
  // CORS 헤더 설정
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const emailData = await request.json();
    
    // Resend API를 사용한 이메일 전송
    const RESEND_API_KEY = env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Resend API key not configured' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Resend API로 이메일 전송 (consulting@malgnsoft.com으로 전송)
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: '견적서 시스템 <noreply@malgnsoft.com>',
        to: 'consulting@malgnsoft.com',
        subject: emailData.subject || '견적서 요청',
        html: `
          <h2>견적서 요청 정보</h2>
          <p><strong>업체명:</strong> ${emailData.company_name || '-'}</p>
          <p><strong>담당자:</strong> ${emailData.contact_name || '-'}</p>
          <p><strong>이메일:</strong> ${emailData.contact_email || '-'}</p>
          <p><strong>연락처:</strong> ${emailData.contact_phone || '-'}</p>
          <p><strong>상품 구분:</strong> ${emailData.plan || '-'}</p>
          <p><strong>월 이용료:</strong> ${emailData.monthly_fee || '-'}</p>
          <p><strong>이용 기간:</strong> ${emailData.usage_months || '-'}</p>
          <p><strong>부가서비스:</strong> ${emailData.services || '-'}</p>
          <p><strong>년 계약총액:</strong> ${emailData.total || '-'}</p>
          <p><strong>계약금:</strong> ${emailData.deposit || '-'}</p>
          <p><strong>작업:</strong> ${emailData.action || '-'}</p>
          <p><strong>요청 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
          <hr>
          <pre>${emailData.body || ''}</pre>
        `,
      }),
    });

    const result = await resendResponse.json();

    if (resendResponse.ok) {
      return new Response(
        JSON.stringify({ success: true, message: '이메일이 성공적으로 전송되었습니다.' }), 
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    } else {
      return new Response(
        JSON.stringify({ error: result.message || '이메일 전송 실패' }), 
        { 
          status: resendResponse.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || '서버 오류' }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
}

// OPTIONS 요청 처리 (CORS preflight)
export async function onRequestOptions(context) {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

