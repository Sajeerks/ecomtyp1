import nodemailer from 'nodemailer'
interface SendMailOptionType{
    [key:string]:string
}
export const sendEmail =async (options:SendMailOptionType)=>{
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.SMTP_USER!,
          pass: process.env.SMTP_PASSWORD!
        }
    })


    const mailOptions:nodemailer.SendMailOptions ={
        from:"sajeersayed@gmail.com",
        to:options.email,
        subject:options.subject,
        text:options.message
    
    }
    await transporter.sendMail(mailOptions);
}

