import { h } from 'preact';

const instagramPhishingStyle = {
  backgroundColor: '#ffffff',
  color: '#000000',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: '14px',
  padding: '20px',
  lineHeight: '1.6',
};

const logoPlaceholderStyle = {
  display: 'block',
  maxWidth: '100px',
  height: 'auto',
  border: '1px solid #ddd',
  padding: '5px',
  marginBottom: '20px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const InstagramPhishingEmail = () => {
  const rawHtmlContent = `
    <p>Hey there,</p>
    <p>We noticed suspicious activity on your Instagram account. To keep your account safe, please verify your identity immediately by clicking the link below:</p>
    <p><a href='http://instagram.verify-security.com/login'>Verify Your Account</a></p>
    <p>If you don’t verify within 24 hours, your account will be permanently deleted.</p>
    <p>Thanks,<br/>Instagram Security Team</p>
  `;

  let processedHtml = rawHtmlContent.replace(/href='[^']*'/g, "href='javascript:void(0);'");
  processedHtml = processedHtml.replace(
    /(<a href='javascript:void\(0\);'>Verify Your Account<\/a>)/,
    '<span data-hint-id="insta-verify-link">$1</span>'
  );
  processedHtml = processedHtml.replace(
    /(If you don’t verify within 24 hours, your account will be permanently deleted\.)/,
    '<span data-hint-id="insta-urgency-threat">$1</span>'
  );


  return (
    <div style={instagramPhishingStyle}>
      <div data-hint-id="insta-logo">
        <img
          src="https://img.freepik.com/premium-psd/instagram-logo_971166-164497.jpg"
          alt="Instagram Logo?"
          style={logoPlaceholderStyle}
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
    </div>
  );
};

export default InstagramPhishingEmail;
