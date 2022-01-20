const nodemailer = require('nodemailer');
require('dotenv').config();

const { CLIENT_ID, CLIENT_SECRET, USER_EMAIL, REFRESH_TOKEN } =
  process.env;
// console.log(process.env);
module.exports= (MAIL_TO)=>{
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: USER_EMAIL,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
        },
        tls: {
            rejectUnauthorized: false
        }
      });
    
      const message = `Welcome new Tribe member! This email confirms that now youwill be able to book any of Shida's Broom Closet services and see the meet up locations! check your email often for updates.`;
    
      const mailOptions = {
        from: USER_EMAIL,
        to: MAIL_TO,
        subject: "Shida's Broom Closet Confirmation Email",
        html: `<p>${message}</p>`,
      };
    
      return transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log('Error', error.toString())
          return (error.toString()); 
        }
        console.log('Success sent email too', MAIL_TO)
        return ({ success: true });
      });
}
