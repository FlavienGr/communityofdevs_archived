const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendWelcomeEmail = email => {
  const msg = {
    to: `${email}`,
    from: `${process.env.email}`,
    subject: 'Bienvenue chez CommunityOfDevs',
    html: `<strong>Welcome !</strong>
    Nous vous remerçions pour votre confiance et nous espérons pouvoir vous aider.
    <a href="http://localhost:3000">Connectez-vous</a>
    <br><br>
    A bientôt
    `
  };
  sgMail.send(msg);
};
const sendAfterChangeEmail = email => {
  const msg = {
    to: `${email}`,
    from: `${process.env.email}`,
    subject: 'Changement de votre adresse email',
    html: `Vous avez recemment demandé le changement de votre adresse email. <br><br>
    Si vous n'êtes pas l'auteur de cette demande, merci de nous contacter dans les meilleurs délais
    <br><br>
    <a href="http://localhost:3000/contact">Contacter nous</a>
    `
  };
  sgMail.send(msg);
};
const sendQuitEmail = email => {
  const msg = {
    to: `${email}`,
    from: `${process.env.email}`,
    subject: 'Suppression de votre compte',
    html: `Nous sommes désolé de voir partir.
    <br><br>
    A bientôt.
    `
  };
  sgMail.send(msg);
};
const sendResetPassword = (email, resetUrl) => {
  const msg = {
    to: `${email}`,
    from: `${process.env.email}`,
    subject: 'Changement de votre mot de passe',
    html: `<strong>Nouveau mot de passe</strong>
    Vous recevez cette email parce que vous avez demandé un changement de votre mot de passe. Merci de cliquer sur le lien ci-dessous afin que ce changement soit pris en compte.
    <a href=${resetUrl}>Cliquez ici</a>
    <br><br>
    Ou copier coller le ce lien dans votre navigateur internet: ${resetUrl}
    <br><br>
    Au plaisir`
  };
  sgMail.send(msg);
};
module.exports = {
  sendWelcomeEmail,
  sendQuitEmail,
  sendResetPassword,
  sendAfterChangeEmail
};
