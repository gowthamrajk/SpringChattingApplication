package com.application.controller;

import java.io.IOException;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.application.LivechatApplication;

@RestController
public class SendEmailController 
{
	@Autowired
	LivechatApplication sendingEmailApplication;

	@RequestMapping(value = "/sendemail/{email}")
	public String send(@PathVariable String email) throws AddressException, MessagingException, IOException {
		sendingEmailApplication.sendEmail(email);
		//sendingEmailApplication.sendEmailWithAttachment();
	    return "success";   
	}
}