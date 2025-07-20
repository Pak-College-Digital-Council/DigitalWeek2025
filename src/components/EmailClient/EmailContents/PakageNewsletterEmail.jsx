import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

const PakageNewsletterEmail = () => {
  const [processedHtml, setProcessedHtml] = useState('');

  const originalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>THE PAKAGE: ISSUE 2, 2025</title>
  <style>
    body,
    .main {
      margin: 0;
      padding: 0;
    }

    .wrapper {
      border-collapse: collapse;
      table-layout: fixed;
      min-width: 320px;
      width: 100%;
      background-color: #fbfbfb;
    }

    .hidden-preheader-text {
      height: 0;
      max-height: 0;
      overflow: hidden;
      font-size: 0;
    }

    .preheader {
      Margin: 0 auto;
      max-width: 560px;
      min-width: 280px;
      width: 280px;
      width: calc(28000% - 167440px);
    }

    .preheader-inner {
      border-collapse: collapse;
      display: table;
      width: 100%;
    }

    .snippet {
      display: table-cell;
      float: left;
      font-size: 12px;
      line-height: 19px;
      max-width: 280px;
      min-width: 140px;
      width: 140px;
      width: calc(14000% - 78120px);
      padding: 10px 0 5px 0;
      color: #999;
      font-family: Georgia, serif;
    }

    .webversion {
      display: table-cell;
      float: left;
      font-size: 12px;
      line-height: 19px;
      max-width: 280px;
      min-width: 139px;
      width: 139px;
      width: calc(14100% - 78680px);
      padding: 10px 0 5px 0;
      text-align: right;
      color: #999;
      font-family: Georgia, serif;
    }

    .webversion p {
      Margin-top: 0;
      Margin-bottom: 0;
    }

    .webversion a {
      text-decoration: underline;
      color: #999;
      cursor: default;
    }

    .layout {
      Margin: 0 auto;
      max-width: 600px;
      min-width: 320px;
      width: 320px;
      width: calc(28000% - 167400px);
      word-wrap: break-word;
      word-break: break-word;
    }

    .layout__inner {
      border-collapse: collapse;
      display: table;
      width: 100%;
      background-color: #ffffff;
    }

    .column {
      text-align: left;
      color: #565656;
      font-size: 14px;
      line-height: 21px;
      font-family: Georgia, serif;
    }

    .content-padding {
      Margin-left: 20px;
      Margin-right: 20px;
    }

    .content-padding-top {
      Margin-top: 20px;
    }

    .content-padding-top-large {
      Margin-top: 24px;
    }

    .content-padding-bottom {
      Margin-bottom: 24px;
    }

    .v-align-middle {
      vertical-align: middle;
    }

    .size-18 {
      Margin-top: 0;
      Margin-bottom: 0;
      font-family: Verdana, sans-serif;
      font-size: 17px;
      line-height: 26px;
    }

    .size-13 {
      Margin-top: 20px;
      Margin-bottom: 20px;
      font-family: Verdana, sans-serif;
      font-size: 13px;
      line-height: 21px;
    }

    .text-primary {
      color: #0081b3;
    }

    .text-secondary {
      color: #797979;
    }

    .text-inherit-decoration {
        text-decoration: inherit;
    }

    .image-wrapper {
      font-size: 12px;
      font-style: normal;
      font-weight: normal;
      line-height: 19px;
      text-align: center;
    }

    .responsive-img {
      border: 0;
      display: block;
      height: auto;
      width: 100%;
      max-width: 900px;
    }

    .image-link {
        text-decoration: underline;
        color: #41637e;
        cursor: default;
    }

    .btn {
      text-align: center;
    }

    .btn-primary {
      border-radius: 4px;
      display: inline-block;
      font-size: 12px;
      font-weight: bold;
      line-height: 22px;
      padding: 10px 20px 11px 20px;
      text-align: center;
      text-decoration: none !important;
      color: #ffffff !important;
      background-color: #0081b3;
      font-family: Verdana, sans-serif;
      cursor: default;
    }

    .spacer-sm {
      line-height: 20px;
      font-size: 1px;
    }

    .spacer-lg {
      line-height: 20px;
      font-size: 20px;
    }

    #footer-top-spacing {
        line-height: 4px;
        font-size: 4px;
    }

    #footer-bottom-spacing {
        line-height: 40px;
        font-size: 40px;
    }

    .email-footer .column {
        text-align: center;
        font-size: 12px;
        line-height: 19px;
        color: #999;
        font-family: Georgia, serif;
    }

    .email-footer .column-hidden {
        display: none;
    }

    .footer-logo {
        font-size: 26px;
        line-height: 32px;
        Margin-top: 10px;
        Margin-bottom: 20px;
        color: #7b663d;
        font-family: Roboto, Tahoma, sans-serif;
        text-align: center;
    }

    .footer-table {
        border-collapse: collapse;
        table-layout: fixed;
        width: 100%;
    }

    .footer-column {
        display: inline;
        width: 100%;
    }

    .footer-column-inner {
        margin-left: 0;
        margin-right: 0;
        Margin-top: 10px;
        Margin-bottom: 10px;
    }

    .email-footer__additional-info {
        font-size: 12px;
        line-height: 19px;
        margin-bottom: 18px;
        margin-top: 0px;
    }

    .email-flexible-footer__additionalinfo--center {
        Margin-top: 0;
        Margin-bottom: 0;
        font-family: Verdana, sans-serif;
        text-align: center;
    }

    .email-flexible-footer__additionalinfo--center a {
        text-decoration: underline;
        color: #999;
        cursor: default;
    }

    .email-footer__additional-info-unsubscribe {
        font-size: 12px;
        line-height: 19px;
        margin-bottom: 15px;
        Margin-top: 18px;
    }

    .email-footer__additional-info-unsubscribe a {
        text-decoration: underline;
        color: #999;
        cursor: default;
    }

    .social-icons {
      padding-top: 8px;
      text-align: center;
    }

    .social-icon-wrapper {
        padding-right: 4px;
    }

    .social-icon-link {
      text-decoration: underline;
      color: #41637e;
      display: inline-block;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      max-height: 32px;
      background-color: #808080;
      cursor: default;
    }

    .social-icon-img {
      border: 0;
    }
  </style>
</head>
<body>
  <div class="main">
    <div class="hidden-preheader-text">The second issue of the student magazine for 2025! Filled with student work and accomplishments, this is one to read!</div>
    <table class="wrapper" cellpadding="0" cellspacing="0" role="presentation">
      <tbody>
        <tr>
          <td>
            <div role="banner">
              <div class="preheader">
                <div class="preheader-inner">
                  <div class="snippet">
                  </div>
                  <div class="webversion">
                    <p>No images? <a href="javascript:void(0);">Click here</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="layout one-col fixed-width stack">
                <div class="layout__inner">
                  <div class="column">
                    <div class="image-wrapper">
                      <img class="responsive-img" alt="" width="600" src="https://i1.cmail19.com/ei/y/1C/627/20C/072457/csfinal/111-9900000000079e3c.png">
                    </div>
                    <div class="content-padding content-padding-top">
                      <div class="v-align-middle">
                        <p class="size-18" lang="x-size-18">
                            <span class="text-inherit-decoration"><strong><span class="text-inherit-decoration text-primary">THE PAKAGE: ISSUE 2, 2025</span></strong></span>
                        </p>
                        <p class="size-13" lang="x-size-13">
                            <span class="text-inherit-decoration"><span class="text-inherit-decoration text-primary">Sharing Your Story</span><br>
                            <span class="text-inherit-decoration text-secondary">Stories from students, for students. Once a term, get a taste of the student voice and experience, straight from the source.</span></span>
                        </p>
                      </div>
                    </div>
                    <div class="content-padding content-padding-bottom">
                      <div class="btn">
                        <a class="btn-primary" href="javascript:void(0);">CLICK FOR THE COMPLETE PAKAGE</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="layout one-col fixed-width stack">
                <div class="layout__inner">
                  <div class="column">
                    <div class="content-padding content-padding-top-large">
                      <div class="spacer-sm"></div>
                    </div>
                    <div class="image-wrapper">
                      <a class="image-link" href="javascript:void(0);">
                        <img class="responsive-img" alt="" width="600" src="https://i6.cmail19.com/ei/y/1C/627/20C/072457/csfinal/pakurangaemailfooter600pxx180px_Gotham-9900000000079e3c.jpg">
                      </a>
                    </div>
                    <div class="content-padding content-padding-top content-padding-bottom">
                      <div>
                        <div class="social-icons">
                          <span class="social-icon-wrapper"><a class="social-icon-link" href="javascript:void(0);"><img class="social-icon-img" src="https://i1.cmail19.com/static/eb/master/13-the-blueprint-3/images/socialmedia/facebook-white-medium.png" alt="Facebook" height="32" width="32"></a></span><span class="social-icon-wrapper"><a class="social-icon-link" href="javascript:void(0);"><img class="social-icon-img" src="https://i10.cmail19.com/static/eb/master/13-the-blueprint-3/images/socialmedia/instagram-white-medium.png" alt="Instagram" height="32" width="32"></a></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="spacer-lg"></div>
            </div>
            <div role="contentinfo">
              <div id="footer-top-spacing"></div>
              <div class="layout email-flexible-footer email-footer" id="footer-content">
                <div class="layout__inner center-aligned-footer">
                  <div class="column column-hidden" align="center">
                    <div class="footer-logo">
                      <div align="center"></div>
                    </div>
                  </div>
                  <div class="column column-hidden" align="center">
                  </div>
                  <table class="footer-table" cellpadding="0" cellspacing="0">
                    <tbody>
                      <tr>
                        <td>
                          <div class="column footer-column" align="center">
                            <div class="footer-column-inner">
                              <div class="email-footer__additional-info">
                                <div>
                                  <p class="email-flexible-footer__additionalinfo--center"><span class="text-inherit-decoration"><span class="text-inherit-decoration text-primary">PAKŪRANGA COLLEGE</span><br> Pigeon Mountain Road, Half Moon Bay, Auckland 2012<br> PO Box 82090, Highland Park, Auckland 2143<br> <br> Phone: (09) 5347159 Fax: (09) 5342365<br> Email: <a href="javascript:void(0);">info@pakuranga.school.nz</a></span></p>
                                </div>
                              </div>
                              <div class="email-footer__additional-info-unsubscribe">
                                <a href="javascript:void(0);" lang="en">Unsubscribe</a>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div id="footer-bottom-spacing"></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>`;

  useEffect(() => {
    const processed = originalHtml.replace(/href="[^"]*"/g, 'href="javascript:void(0);"');
    setProcessedHtml(processed);
  }, [originalHtml]);

  return (
    <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
  );
};

export default PakageNewsletterEmail;
