export const activeAccountEmail = (host: any, verifyToken: any) => {
  const message = {
    subject: 'Verify your email',
    text:
      `${'To activate your account, click on the link below.\n' +
      'http://'}${host}/verify/${verifyToken}\n\n` +
      `If you did not request this, please ignore this email and your account will remain inactive.\n` +
      `see you soon`
  };
  return message;
}

export const resetEmail = (host: any, resetToken: any) => {
  const message = {
    subject: 'Reset Password',
    text:
      `${'You are receiving this because you have requested to reset your password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to reset your password:\n\n' +
      'http://'
      }${host}/reset/${resetToken}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };

  return message;
};

export const confirmResetPasswordEmail = () => {
  const message = {
    subject: 'Password Changed',
    text:
      `You are receiving this email because you changed your password. \n\n` +
      `If you did not request this change, please contact us immediately.`
  };

  return message;
};

export const merchantSignup = (host: any, { resetToken, email }: any) => {
  const message = {
    subject: 'Merchant Registration',
    text: `${'Congratulations! Your application has been accepted. Please complete your Merchant account signup by clicking on the link below. \n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://'
      }${host}/merchant-signup/${resetToken}?email=${email}\n\n`
  };

  return message;
};

export const merchantWelcome = (name: any) => {
  const message = {
    subject: 'Merchant Registration',
    text:
      `Hi ${name}! Congratulations! Your application for merchant account has been accepted. \n\n` +
      `It looks like you already have a member account with us. Please sign in with your member credentials and you will be able to see your merchant account.`
  };

  return message;
};

export const signupEmail = (name: { firstName: any; lastName: any; }) => {
  const message = {
    subject: 'Account Registration',
    text: `Hi ${name.firstName} ${name.lastName}! Thank you for creating an account with us!.`
  };

  return message;
};

export const newsletterSubscriptionEmail = () => {
  const message = {
    subject: 'Newsletter Subscription',
    text:
      `You are receiving this email because you subscribed to our newsletter. \n\n` +
      `If you did not request this change, please contact us immediately.`
  };

  return message;
};

export const contactEmail = () => {
  const message = {
    subject: 'Contact Us',
    text: `We received your message! Our team will contact you soon. \n\n`
  };

  return message;
};

export const merchantApplicationEmail = () => {
  const message = {
    subject: 'Sell on MERN Store',
    text: `We received your request! Our team will contact you soon. \n\n`
  };

  return message;
};

export const merchantDeactivateAccount = () => {
  const message = {
    subject: 'Merchant account on MERN Store',
    text:
      `Your merchant account has been disabled. \n\n` +
      `Please contact admin to request access again.`
  };

  return message;
};

export const orderConfirmationEmail = (order: { _id: any; user: { profile: { firstName: any; }; }; }) => {
  const message = {
    subject: `Order Confirmation ${order._id}`,
    text:
      `Hi ${order.user.profile.firstName}! Thank you for your order!. \n\n` +
      `We've received your order and will contact you as soon as your package is shipped. \n\n`
  };

  return message;
};
