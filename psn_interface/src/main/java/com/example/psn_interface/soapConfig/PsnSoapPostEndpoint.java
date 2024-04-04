package com.example.psn_interface.soapConfig;


import com.example.psn_interface.controllers.PostController;
import com.example.psn_interface.soapConfig.SoapClasses.GetPostRequest;
import com.example.psn_interface.soapConfig.SoapClasses.PostType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

@Endpoint
public class PsnSoapPostEndpoint {

	private static final String NAMESPACE_URI = "http://localhost/soap/api/WelcomePost";

	private PostController controller;
	@Autowired
	private PsnSoapPostEndpoint(PostController controller){this.controller = controller;}

	@PayloadRoot(namespace = NAMESPACE_URI, localPart = "GetPostRequest")
	@ResponsePayload
	public PostType getWelcomePost(@RequestPayload GetPostRequest request) {
		PostType response  = controller.getWelcomePost(request);
		return  response;
	}

}
