package com.example.psn_interface.soapConfig.client;

import javax.xml.bind.JAXBElement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;
import com.example.psn_interface.gen.GetAllProducts;
import com.example.psn_interface.gen.GetAllProductsResponse;


public class ProductClient extends WebServiceGatewaySupport {

    private static final Logger logger = LoggerFactory.getLogger(ProductClient.class);

    public GetAllProductsResponse getAllProducts() {

        GetAllProducts request = new GetAllProducts();

        logger.info("Requesting information for products");

        JAXBElement<GetAllProductsResponse> response = (JAXBElement<GetAllProductsResponse>) getWebServiceTemplate().marshalSendAndReceive(
            "http://34.72.168.189:100/?wsdl",
            request
        );

        return response.getValue();
    }

}