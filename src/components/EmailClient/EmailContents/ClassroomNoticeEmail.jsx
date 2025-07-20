import { useEffect, useState } from 'preact/hooks';

const ClassroomNoticeEmail = () => {
  const [processedHtml, setProcessedHtml] = useState('');

  const originalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Classroom Notification</title>
  <style>
    .classroom-email-body-wrapper { /* Scoped body styles */
      font-family: Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
    }

    table {
      border-collapse: collapse;
    }

    img {
      border: 0;
      display: block;
    }

    a.disabled-link {
      text-decoration: none;
      pointer-events: none;
      cursor: default;
    }

    /* Layout */
    .container {
      background-color: #ffffff;
      max-width: 632px;
      min-width: 256px;
      word-break: break-word;
      width: 100%;
      margin: 0 auto;
    }

    .main-padding {
      padding: 16px;
    }

    .clearfix::after {
      content: "";
      display: table;
      clear: both;
    }

    .header {
      padding-bottom: 16px;
      width: 100%;
    }

    .header-logo-wrapper {
      float: left;
      line-height: 32px;
    }

    .header-logo {
      margin: 0;
    }

    .header-settings-wrapper {
      float: right;
      padding-left: 32px;
      vertical-align: top;
      text-align: right;
    }

    .header-settings-link-table {
      border-collapse: collapse;
    }

    .header-settings-icon-cell {
      padding-top: 6px;
    }

    .header-settings-icon {
      vertical-align: middle;
    }

    .header-settings-text {
      font-family: 'Google Sans', Roboto, Helvetica, Arial, sans-serif;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.25px;
      line-height: 20px;
      color: #3c4043;
      padding-left: 4px;
      white-space: nowrap;
      padding-top: 8px;
    }

    .card {
      border: 1px solid #dadce0;
      border-collapse: separate;
      border-radius: 8px;
      width: 100%;
    }

    .card-header {
      padding: 24px 24px 0;
      border-bottom: 1px solid #dadce0;
      width: 100%;
    }

    .card-header-inner {
      padding-bottom: 8px;
    }

    .card-title-text {
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0.1px;
      line-height: 24px;
      color: #007b83;
      vertical-align: top;
    }

    .card-title-icon-cell {
      padding-top: 3px;
      padding-left: 4px;
      vertical-align: top;
    }

    .card-body {
      padding: 24px 24px 32px 24px;
    }

    .card-body-table {
      width: 100%;
      border: 0;
    }

    .due-header {
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.8px;
      line-height: 16px;
      text-transform: uppercase;
      color: #5f6368;
      padding-bottom: 8px;
    }

    .assignment-icon-cell {
      padding-right: 12px;
      vertical-align: top;
      width: 40px;
    }

    .assignment-icon-wrapper {
      border-radius: 50%;
      background-color: #129eaf;
      height: 24px;
      width: 24px;
      padding: 8px;
    }

    .assignment-details-table {
      width: 100%;
      word-break: break-word;
    }

    .assignment-title {
      font-family: 'Google Sans', Roboto, Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 0.1px;
      line-height: 24px;
      color: #000000;
      padding-bottom: 4px;
    }

    .assignment-due-date {
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.3px;
      line-height: 16px;
      color: #3c4043;
      padding-bottom: 16px;
    }

    .assignment-due-date-strong {
      font-weight: 700;
      line-height: 18px;
    }

    .assignment-due-date-icon {
        vertical-align: top;
    }

    .assignment-button-cell {
      border: 1px solid #dadce0;
      border-radius: 4px;
      padding: 8px 24px;
    }

    .assignment-button-link {
      font-family: 'Google Sans', Roboto, Helvetica, Arial, sans-serif;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.25px;
      line-height: 20px;
      color: #007b83;
    }

    .footer-wrapper {
      padding-bottom: 24px;
    }

    .footer-logo-wrapper {
      float: left;
      margin-right: 12px;
    }

    .footer-text-wrapper {
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.3px;
      line-height: 16px;
      color: #9aa0a6;
      width: 80%;
      float: left;
      margin-top: 4px;
    }

    .footer-link {
      color: #9aa0a6;
    }
  </style>
</head>
<div class="classroom-email-body-wrapper"> <!-- Replaced body tag -->
  <table class="container" cellpadding="0" cellspacing="0" dir="ltr" role="presentation">
    <tbody>
      <tr>
        <td class="main-padding">
          <table cellpadding="0" cellspacing="0" dir="ltr" role="presentation">
            <tbody>
              <tr>
                <td class="header clearfix">
                  <div class="header-logo-wrapper">
                    <img class="header-logo" alt="Classroom Logo" height="32" width="190" src="https://ci3.googleusercontent.com/meips/ADKq_NYh_H6gQSejabPhR3sIjb37H6IEc0jZNcr63H8eWpQgol4H1ewjVDL1mMLG_SMp38n-zbU20OmQw7kiFeUQVRecxEq4Z7d_vpTaEbQO3MuoE3Fmz1l2PXw-3B-nwrP_s-ou=s0-d-e1-ft#https://www.gstatic.com/classroom/email/classroom_text_with_logo_grey700.png">
                  </div>
                  <div class="header-settings-wrapper">
                    <a href="javascript:void(0);" class="disabled-link">
                      <table class="header-settings-link-table" cellpadding="0" cellspacing="0" dir="ltr" role="presentation">
                        <tbody>
                          <tr>
                            <td class="header-settings-icon-cell">
                              <img class="header-settings-icon" alt="Notifications Icon" height="18" width="18" src="https://ci3.googleusercontent.com/meips/ADKq_NZuoSB5ta5hLeqwATif3L6UhSEVU-am-YgiMr2kUPHzUc3XtWQ-LXVo1T1Fqy45ar3HpwYj3uBnWMjfVaxuKPHs4w0-cnXRm_C5iMC95VK_ttnmG_c-Cr9wimf2ndEdR8gLOu3wUAMo0xGLpRYXKXzdJiwlS6ofJA--YWMr5_qhs1nnfYCvQxJM9_A=s0-d-e1-ft#https://fonts.gstatic.com/s/i/googlematerialicons/notifications/v18/gm_grey-24dp/1x/gm_notifications_gm_grey_24dp.png">
                            </td>
                            <td class="header-settings-text">Notification settings</td>
                          </tr>
                        </tbody>
                      </table>
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="footer-wrapper">
                  <table class="card" cellpadding="0" cellspacing="0" dir="ltr" role="presentation">
                    <tbody>
                      <tr>
                        <td class="card-header">
                          <div class="card-header-inner">
                            <a href="javascript:void(0);" class="disabled-link">
                              <table cellpadding="0" cellspacing="0" dir="ltr" role="presentation">
                                <tbody>
                                  <tr>
                                    <td class="card-title-text">12COM SMH 2025</td>
                                    <td class="card-title-icon-cell">
                                      <img alt="Open in new tab" height="18" src="https://ci3.googleusercontent.com/meips/ADKq_NbYvB7pFfLlj-dnbah7wXKoiUmU6lwbU-gQnnTUc3gGx-KNBGrtsfZm6n-UtIzmPOQS69KNSOzQBBLGp25lcjlTvo6cYiGMGKkdNmMwfy6K7IQMyaX_bk8ww9PceXcaZMlubINc--yQ51Nvd__Xr7lx0HZqBIxwwGnHT4ZRANVLhEE_zt8Sfg=s0-d-e1-ft#https://fonts.gstatic.com/s/i/googlematerialicons/open_in_new/v21/gm_grey-24dp/1x/gm_open_in_new_gm_grey_24dp.png" width="18">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="card-body">
                          <table class="card-body-table" cellpadding="0" cellspacing="0" dir="ltr" role="presentation">
                            <tbody>
                              <tr>
                                <td colspan="2" class="due-header">Due tomorrow</td>
                              </tr>
                              <tr>
                                <td class="assignment-icon-cell">
                                  <span>
                                    <div class="assignment-icon-wrapper">
                                      <img height="24" src="https://ci3.googleusercontent.com/meips/ADKq_Na70ZPYqrkd0LRcBYu8iz7JgjWCzojzDAf9Yq2Ma5EMDJiwU30gbJp8xuPuRDM14DY3VR-YzPPsD103RHvndxf35ilEd4kaT8yB9Q4gx9328rR7OXsFdZ75HnyEGapx9TPOdUSFgSpOFQwGEbMkbzrZAVZKe7hfp1SY_Dz9PVaPnsVBSIR5v67_MKTBIIn4-cdZFH4w1QoOfcY=s0-d-e1-ft#https://fonts.gstatic.com/s/i/googlematerialicons/notification_important/v11/white-48dp/1x/gm_notification_important_white_48dp.png" width="24" role="presentation">
                                    </div>
                                  </span>
                                </td>
                                <td>
                                  <table class="assignment-details-table" cellpadding="0" cellspacing="0" dir="ltr" role="presentation">
                                    <tbody>
                                      <tr>
                                        <td class="assignment-title">
                                          <div>Task Submission</div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <table cellpadding="0" cellspacing="0" dir="ltr" role="presentation">
                                            <tbody>
                                              <tr>
                                                <td class="assignment-button-cell">
                                                  <a href="javascript:void(0);" class="disabled-link assignment-button-link">View assignment</a>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="clearfix">
                    <div class="footer-logo-wrapper">
                      <img alt="Google logo" src="https://ci3.googleusercontent.com/meips/ADKq_NbJM6jSzd9bOy29POoMXuH_zMVzGnEst-GlRkCbB5ST8MP2Zu3HKQQdMhH09Dkwg9y4_U39Tj_gbi9dCgjOBbd0GtFGaGtazjDz1Q6-BiuvRsdBWhc=s0-d-e1-ft#https://www.gstatic.com/classroom/email/google_logo_grey700.png" height="26" width="64">
                    </div>
                    <div class="footer-text-wrapper">Google LLC 1600 Amphitheatre Parkway, Mountain View, CA 94043 USA<br>This email was sent to you because you indicated that you'd like to receive email notifications from Google Classroom. If you don't want to receive emails like this, you can <a href="javascript:void(0);" class="disabled-link footer-link">unsubscribe or change your settings</a>.</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</html>`;

  useEffect(() => {
    let processed = originalHtml.replace(/href="[^"]*"/g, 'href="javascript:void(0);"');
    processed = processed.replace(/href='[^']*'/g, "href='javascript:void(0);'");
    setProcessedHtml(processed);
  }, [originalHtml]);

  return (
    <div className="classroom-email-container" dangerouslySetInnerHTML={{ __html: processedHtml }} />
  );
};

export default ClassroomNoticeEmail;
