package com.example.psn_interface.controllers;

import org.springframework.stereotype.Controller;

import java.math.BigInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;

import com.example.psn_interface.entities.Product;
import com.example.psn_interface.soapConfig.client.ProductClient;
import com.example.psn_interface.gen.GetAllProductsResponse;


@Controller
public class ProductController {

  @Autowired
  public ProductClient client;

  @QueryMapping
  public Product getProduct() {
      GetAllProductsResponse response = this.client.getAllProducts();
      String name = response.getGetAllProductsResult().getValue().getProducto().get(0).getNombre().getValue();
      BigInteger price = response.getGetAllProductsResult().getValue().getProducto().get(0).getPrecio().getValue();
      return new Product(name, price);
  }
}
