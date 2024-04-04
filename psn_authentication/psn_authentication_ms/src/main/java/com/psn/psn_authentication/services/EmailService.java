package com.psn.psn_authentication.services;

import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.JavaMailSender;
import com.psn.psn_authentication.domain.User;
import java.io.UnsupportedEncodingException;
import java.util.function.Predicate;

import jakarta.mail.internet.MimeMessage;
import jakarta.mail.MessagingException;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService implements Predicate<String> {

    @Value("${psn_wa.dir}")
    private String psn_wa_dir;

    private static Logger LOGGER;
    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender){
        this.mailSender = mailSender;
        LOGGER = LoggerFactory.getLogger(EmailService.class);
    }


    @Override
    public boolean test(String email){
        return true;
    }

    @Async
    public void send(String toEmail, String subject, String content) throws UnsupportedEncodingException {
        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setFrom("pawnetworkapp@gmail.com", "pawsome network");
            helper.setSubject(subject);
            helper.setTo(toEmail);
            helper.setText(content, true);
            mailSender.send(mimeMessage);
        }catch (MessagingException e){
            LOGGER.error("failed to send email", e);
            throw new IllegalStateException("Failed to send email");
        }
    }

    public void sendEmailToVerifyAccount(User user, String randomCode) throws UnsupportedEncodingException {
        String verifyURL = psn_wa_dir + "/verify-token/" + randomCode + "/" + user.getId();
        String content = "Querid@ "+user.getName()+",<br>"
                + "Por favor haga click en el siguiente link para verificar su cuenta:<br>"
                + "<h3><a href=\""+verifyURL+"\" target=\"_self\">VERIFY</a></h3>"
                + "Gracias,<br>"
                + "Pawsome network.";
        String subject = "Verifique su registro";
        send(user.getEmail(), subject, content);
    }

    public void sendEmailToChangeUserPassword(User user, String randomCode) throws UnsupportedEncodingException {
        String subject = "Cambio de contraseña";
        String verifyURL = psn_wa_dir + "/reset-password-confirmed/" + randomCode + "/" + user.getId();
        String content = "Haga click en el siguiente link para cambiar su contraseña:<br>"
                + "<h3><a href=\""+verifyURL+"\" target=\"_self\">VERIFY</a></h3>"
                + "Gracias,<br>"
                + "Pawsome network.";
        send(user.getEmail(), subject, content);
    }

}
