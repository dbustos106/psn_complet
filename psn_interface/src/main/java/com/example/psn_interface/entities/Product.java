package com.example.psn_interface.entities;

import java.math.BigInteger;

public class Product {

  public String name;
  public BigInteger price;

  public Product(String name, BigInteger price) {
      this.name = name;
      this.price = price;
  }
}
