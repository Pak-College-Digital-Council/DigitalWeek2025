import { h } from 'preact';

const passwordResetStyle = {
  backgroundColor: '#f9f9f9',
  color: '#333333',
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontSize: '15px',
  padding: '25px',
  lineHeight: '1.7',
  border: '1px solid #e0e0e0',
  maxWidth: '600px',
  margin: '0 auto',
};

const headerStyle = {
  fontSize: '20px',
  color: '#222222',
  paddingBottom: '15px',
  borderBottom: '1px solid #dddddd',
  marginBottom: '20px',
};

const footerStyle = {
  fontSize: '12px',
  color: '#777777',
  paddingTop: '20px',
  borderTop: '1px solid #dddddd',
  marginTop: '30px',
  textAlign: 'center',
};

const linkStyle = {
  color: '#0066cc',
  textDecoration: 'none',
};

const PasswordResetPhishingEmail = () => {
  return (
    <div style={passwordResetStyle}>
      <div style={headerStyle} data-hint-id="pr-sender">Important Security Notifcation from Helpdesk</div>
      <div style={{textAlign: 'left'}}>
        <p>Dear User,</p>
        <p data-hint-id="pr-vague-body">Our system detect unusual activity. For your security, a password reset is requir for your account.</p>
        <p>Please to click following link for make new password:</p>
        <p><a style={linkStyle} href="javascript:void(0);" data-hint-id="pr-link">Reset Your Passwod Here</a></p>
        <p>If this action not done by you, please ignore this electronical mail. <span data-hint-id="pr-grammar">This link expire in short time.</span></p>
        <p data-hint-id="pr-spasibo">Spasibo,<br/>Helpdesk Servic Team</p>
      </div>
      <div style={footerStyle}>
        This is an automated message. Please do not reply to this email address.
      </div>
    </div>
  );
};

export default PasswordResetPhishingEmail;
