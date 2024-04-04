//
// Este archivo ha sido generado por la arquitectura JavaTM para la implantación de la referencia de enlace (JAXB) XML v2.3.0 
// Visite <a href="https://javaee.github.io/jaxb-v2/">https://javaee.github.io/jaxb-v2/</a> 
// Todas las modificaciones realizadas en este archivo se perderán si se vuelve a compilar el esquema de origen. 
// Generado el: 2023.06.05 a las 05:35:18 PM COT 
//


package com.example.psn_interface.gen;

import java.math.BigInteger;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Clase Java para Producto complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="Producto"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="idProducto" type="{http://www.w3.org/2001/XMLSchema}integer" minOccurs="0"/&gt;
 *         &lt;element name="nombre" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="descripcion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="precio" type="{http://www.w3.org/2001/XMLSchema}integer" minOccurs="0"/&gt;
 *         &lt;element name="cantidadDisponible" type="{http://www.w3.org/2001/XMLSchema}integer" minOccurs="0"/&gt;
 *         &lt;element name="categoria" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Producto", propOrder = {
    "idProducto",
    "nombre",
    "descripcion",
    "precio",
    "cantidadDisponible",
    "categoria"
})
public class Producto {

    @XmlElementRef(name = "idProducto", namespace = "your-namespace", type = JAXBElement.class, required = false)
    protected JAXBElement<BigInteger> idProducto;
    @XmlElementRef(name = "nombre", namespace = "your-namespace", type = JAXBElement.class, required = false)
    protected JAXBElement<String> nombre;
    @XmlElementRef(name = "descripcion", namespace = "your-namespace", type = JAXBElement.class, required = false)
    protected JAXBElement<String> descripcion;
    @XmlElementRef(name = "precio", namespace = "your-namespace", type = JAXBElement.class, required = false)
    protected JAXBElement<BigInteger> precio;
    @XmlElementRef(name = "cantidadDisponible", namespace = "your-namespace", type = JAXBElement.class, required = false)
    protected JAXBElement<BigInteger> cantidadDisponible;
    @XmlElementRef(name = "categoria", namespace = "your-namespace", type = JAXBElement.class, required = false)
    protected JAXBElement<String> categoria;

    /**
     * Obtiene el valor de la propiedad idProducto.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link BigInteger }{@code >}
     *     
     */
    public JAXBElement<BigInteger> getIdProducto() {
        return idProducto;
    }

    /**
     * Define el valor de la propiedad idProducto.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link BigInteger }{@code >}
     *     
     */
    public void setIdProducto(JAXBElement<BigInteger> value) {
        this.idProducto = value;
    }

    /**
     * Obtiene el valor de la propiedad nombre.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link String }{@code >}
     *     
     */
    public JAXBElement<String> getNombre() {
        return nombre;
    }

    /**
     * Define el valor de la propiedad nombre.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link String }{@code >}
     *     
     */
    public void setNombre(JAXBElement<String> value) {
        this.nombre = value;
    }

    /**
     * Obtiene el valor de la propiedad descripcion.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link String }{@code >}
     *     
     */
    public JAXBElement<String> getDescripcion() {
        return descripcion;
    }

    /**
     * Define el valor de la propiedad descripcion.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link String }{@code >}
     *     
     */
    public void setDescripcion(JAXBElement<String> value) {
        this.descripcion = value;
    }

    /**
     * Obtiene el valor de la propiedad precio.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link BigInteger }{@code >}
     *     
     */
    public JAXBElement<BigInteger> getPrecio() {
        return precio;
    }

    /**
     * Define el valor de la propiedad precio.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link BigInteger }{@code >}
     *     
     */
    public void setPrecio(JAXBElement<BigInteger> value) {
        this.precio = value;
    }

    /**
     * Obtiene el valor de la propiedad cantidadDisponible.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link BigInteger }{@code >}
     *     
     */
    public JAXBElement<BigInteger> getCantidadDisponible() {
        return cantidadDisponible;
    }

    /**
     * Define el valor de la propiedad cantidadDisponible.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link BigInteger }{@code >}
     *     
     */
    public void setCantidadDisponible(JAXBElement<BigInteger> value) {
        this.cantidadDisponible = value;
    }

    /**
     * Obtiene el valor de la propiedad categoria.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link String }{@code >}
     *     
     */
    public JAXBElement<String> getCategoria() {
        return categoria;
    }

    /**
     * Define el valor de la propiedad categoria.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link String }{@code >}
     *     
     */
    public void setCategoria(JAXBElement<String> value) {
        this.categoria = value;
    }

}
