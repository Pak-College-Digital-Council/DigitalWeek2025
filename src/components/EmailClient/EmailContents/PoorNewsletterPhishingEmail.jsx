import { h } from 'preact';

const newsletterStyle = {
  fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Arial', sans-serif",
  fontSize: '14px',
  color: '#000000',
  backgroundColor: '#FFFF99',
  padding: '15px',
  border: '3px dashed #FF00FF',
  maxWidth: '700px',
  margin: '0 auto',
};

const headerStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#0000FF',
  textAlign: 'center',
  textDecoration: 'underline blink',
  marginBottom: '20px',
};

const sectionStyle = {
  marginBottom: '15px',
  padding: '10px',
  backgroundColor: '#CCFFFF',
  border: '1px solid #00AAAA',
};

const linkStyle = {
  color: '#FF0000',
  fontWeight: 'bold',
  textDecoration: 'none',
};

const PoorNewsletterPhishingEmail = () => {
  return (
    <div style={newsletterStyle}>
      <div style="text-align: center;">
        <h1 style={Object.assign({}, headerStyle, {textDecoration: 'underline'})}>
          !! URGENT NEWS FLASH FROM YOUR TRUST BANK !!
        </h1>
      </div>

      <div style={sectionStyle} data-hint-id="pn-font-style">
        <h2 style={{color: '#FF6600', fontSize: '18px'}}>Dear Esteemed Customer Sir/Madam,</h2>
        <p data-hint-id="pn-grammar">We are messaging you today with some very important notice. It has come to our attention some unusal and also unathorised login attempt has been made upon your SecurBank acount from foreign IP address.</p>
        <p>For your own good security, we are doing the needful and have temporary suspended your online acess facility.</p>
      </div>

      <div style={sectionStyle}>
        <h2 style={{color: '#009900', fontSize: '18px'}}>What You Must Be Doing Now! (VERY URGENT)</h2>
        <p>You must be please verifying your identity and restoring your acess immediatly only by clicking this official link we are providing below:</p>
        <p style={{textAlign:'center', margin: '20px 0'}}>
          <a style={linkStyle} href="javascript:void(0);" data-hint-id="pn-link">
            CLICK HERE FOR SECURE LOGIN & VERIFY ACCOONT NOW PLEASE
          </a>
        </p>
        <p>If you are not verifying in the next 24 of hours, your acount will be subject for permanent locking. This may also be resulting in possible FINES and other legal actions as per bank policy.</p>
        <p><em>Do not delay! This is for your account safety and security from hackers!</em></p>
      </div>

      <div style={{marginTop: '25px', fontSize: '12px', textAlign: 'right'}}>
        <p>Thanking you for your full cooperation,<br/>
        The SecurBank Head Office Security Team Division<br/>
        Customer Service Number: 123-456-7890 (International Rates May Apply)</p>
      </div>
    </div>
  );
};

export default PoorNewsletterPhishingEmail;
