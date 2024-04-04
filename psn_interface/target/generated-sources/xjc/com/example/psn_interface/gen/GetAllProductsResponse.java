//
// Este archivo ha sido generado por la arquitectura JavaTM para la implantación de la referencia de enlace (JAXB) XML v2.3.0 
// Visite <a href="https://javaee.github.io/jaxb-v2/">https://javaee.github.io/jaxb-v2/</a> 
// Todas las modificaciones realizadas en este archivo se perderán si se vuelve a compilar el esquema de origen. 
// Generado el: 2023.06.05 a las 05:35:18 PM COT 
//


package com.example.psn_interface.gen;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.*;


/**
 * <p>Clase Java para getAllProductsResponse complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="getAllProductsResponse"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="getAllProductsResult" type="{your-namespace}ProductoArray" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "getAllProductsResponse", propOrder = {
    "getAllProductsResult"
})
@XmlRootElement(name = "getAllProductsResponse")
public class GetAllProductsResponse {

    @XmlElementRef(name = "getAllProductsResult", namespace = "your-namespace", type = JAXBElement.class, required = false)
    protected JAXBElement<ProductoArray> getAllProductsResult;

    /**
     * Obtiene el valor de la propiedad getAllProductsResult.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link ProductoArray }{@code >}
     *     
     */
    public JAXBElement<ProductoArray> getGetAllProductsResult() {
        return getAllProductsResult;
    }

    /**
     * Define el valor de la propiedad getAllProductsResult.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link ProductoArray }{@code >}
     *     
     */
    public void setGetAllProductsResult(JAXBElement<ProductoArray> value) {
        this.getAllProductsResult = value;
    }

}
