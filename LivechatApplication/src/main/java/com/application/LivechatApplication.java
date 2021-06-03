package com.application;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

@SpringBootApplication
public class LivechatApplication 
{
	@Autowired
    private JavaMailSender javaMailSender;
	
	public static void main(String[] args) 
	{
		SpringApplication.run(LivechatApplication.class, args);
	}
	
	public void sendEmail(String email)
	{
		try {
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        System.out.println("mail sent successfully!!!");
        String message = "<html><h2><b><font color='brown'>Hello "+email+", </font></h2><h3>Your Friends have Invited you for a virtual chat. <br>Please join the conversation using the below Link:<p>http://localhost:8080/</p></h3><h3><font color='navy'>Thanks & regards,</font><br><font color='red'>- WE-CHAT (we connect you virtually)</font><br></h3></b></html>";
        helper.setTo("gowthamraj692@gmail.com");
        helper.setSubject("Invitation to Join Chat - regarding");
        helper.setText(message,true);
        javaMailSender.send(mimeMessage);
		} 
		catch(Exception ex) 
		{
            System.out.println(ex);
        }

    }
}
