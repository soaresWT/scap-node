import e from "express";
import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'victorsuares2014@gmail.com',
        pass: 'cdnb agie vdog xphy '
    }
})

function email(emailTo, subject, text) {
    const emailASerEnviado = {
        from: 'victorsuares2014@gmail.com',
        to: emailTo,
        subject: subject,
        text: text,
    }
    transporter.sendMail(emailASerEnviado, (error, info) => {
        if (error) {
            console.log('Erro ao enviar e-mail:', error);
        } else {
            console.log('E-mail enviado:', info.response);
        }
    });
}

export default email;