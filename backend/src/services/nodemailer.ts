import nodemailer from "nodemailer";

import * as template from '../config/template';
import keys from '../config/keys';

const { sender, password } = keys.nodemailer;

export const sendEmail = async (email: any, type: any, host?: any, data?: any) => {
  try {

    const message: any = prepareTemplate(type, host, data);

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: sender,
        pass: password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: sender,
      to: email,
      subject: type,
      text: message.text,
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending email for ${type}: ${error}`);
    return error;
  }
};

const prepareTemplate = (type: any, host: any, data: any) => {
  let message;

  switch (type) {
    case 'reset':
      message = template.resetEmail(host, data);
      break;

    case 'reset-confirmation':
      message = template.confirmResetPasswordEmail();
      break;

    case 'signup':
      message = template.signupEmail(data);
      break;

    case 'merchant-signup':
      message = template.merchantSignup(host, data);
      break;

    case 'merchant-welcome':
      message = template.merchantWelcome(data);
      break;

    case 'newsletter-subscription':
      message = template.newsletterSubscriptionEmail();
      break;

    case 'contact':
      message = template.contactEmail();
      break;

    case 'merchant-application':
      message = template.merchantApplicationEmail();
      break;

    case 'merchant-deactivate-account':
      message = template.merchantDeactivateAccount();
      break;

    case 'order-confirmation':
      message = template.orderConfirmationEmail(data);
      break;

    default:
      message = '';
  }

  return message;
};
