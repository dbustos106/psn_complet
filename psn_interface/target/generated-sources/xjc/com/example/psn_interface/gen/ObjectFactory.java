//
// Este archivo ha sido generado por la arquitectura JavaTM para la implantación de la referencia de enlace (JAXB) XML v2.3.0 
// Visite <a href="https://javaee.github.io/jaxb-v2/">https://javaee.github.io/jaxb-v2/</a> 
// Todas las modificaciones realizadas en este archivo se perderán si se vuelve a compilar el esquema de origen. 
// Generado el: 2023.06.05 a las 05:35:18 PM COT 
//


package com.example.psn_interface.gen;

import java.math.BigInteger;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.example.psn_interface.gen package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _GetAllProducts_QNAME = new QName("your-namespace", "getAllProducts");
    private final static QName _Producto_QNAME = new QName("your-namespace", "Producto");
    private final static QName _ProductoArray_QNAME = new QName("your-namespace", "ProductoArray");
    private final static QName _GetAllProductsResponse_QNAME = new QName("your-namespace", "getAllProductsResponse");
    private final static QName _GetAllProductsResponseGetAllProductsResult_QNAME = new QName("your-namespace", "getAllProductsResult");
    private final static QName _ProductoIdProducto_QNAME = new QName("your-namespace", "idProducto");
    private final static QName _ProductoNombre_QNAME = new QName("your-namespace", "nombre");
    private final static QName _ProductoDescripcion_QNAME = new QName("your-namespace", "descripcion");
    private final static QName _ProductoPrecio_QNAME = new QName("your-namespace", "precio");
    private final static QName _ProductoCantidadDisponible_QNAME = new QName("your-namespace", "cantidadDisponible");
    private final static QName _ProductoCategoria_QNAME = new QName("your-namespace", "categoria");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.example.psn_interface.gen
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link GetAllProducts }
     * 
     */
    public GetAllProducts createGetAllProducts() {
        return new GetAllProducts();
    }

    /**
     * Create an instance of {@link Producto }
     * 
     */
    public Producto createProducto() {
        return new Producto();
    }

    /**
     * Create an instance of {@link ProductoArray }
     * 
     */
    public ProductoArray createProductoArray() {
        return new ProductoArray();
    }

    /**
     * Create an instance of {@link GetAllProductsResponse }
     * 
     */
    public GetAllProductsResponse createGetAllProductsResponse() {
        return new GetAllProductsResponse();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetAllProducts }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link GetAllProducts }{@code >}
     */
    @XmlElementDecl(namespace = "your-namespace", name = "getAllProducts")
    public JAXBElement<GetAllProducts> createGetAllProducts(GetAllProducts value) {
        return new JAXBElement<GetAllProducts>(_GetAllProducts_QNAME, GetAllProducts.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Producto }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link Producto }{@code >}
     */
    @XmlElementDecl(namespace = "your-namespace", name = "Producto")
    public JAXBElement<Producto> createProducto(Producto value) {
        return new JAXBElement<Producto>(_Producto_QNAME, Producto.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ProductoArray }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link ProductoArray }{@code >}
     */
    @XmlElementDecl(namespace = "your-namespace", name = "ProductoArray")
    public JAXBElement<ProductoArray> createProductoArray(ProductoArray value) {
        return new JAXBElement<ProductoArray>(_ProductoArray_QNAME, ProductoArray.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetAllProductsResponse }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link GetAllProductsResponse }{@code >}
     */
    @XmlElementDecl(namespace = "your-namespace", name = "getAllProductsResponse")
    public JAXBElement<GetAllProductsResponse> createGetAllProductsResponse(GetAllProductsResponse value) {
        return new JAXBElement<GetAllProductsResponse>(_GetAllProductsResponse_QNAME, GetAllProductsResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ProductoArray }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link ProductoArray }{@code >}
     */
    @XmlElementDecl(namespace = "your-namespace", name = "getAllProductsResult", scope = GetAllProductsResponse.class)
    public JAXBElement<ProductoArray> createGetAllProductsResponseGetAllProductsResult(ProductoArray value) {
        return new JAXBElement<ProductoArray>(_GetAllProductsResponseGetAllProductsResult_QNAME, ProductoArray.class, GetAllProductsResponse.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link BigInteger }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link BigInteger }{@code >}
     */
    @XmlElementDecl(namespace = "your-namespace", name = "idProducto", scope = Producto.class)
    public JAXBElement<BigInteger> createProductoIdProducto(BigInteger value) {
        return new JAXBElement<BigInteger>(_ProductoIdProducto_QNAME, BigInteger.class, Producto.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link String }{@code >}
     */
    @XmlElementDecl(namespace = "your-namespace", name = "nombre", scope = Producto.class)
    public JAXBElement<String> createProductoNombre(String value) {
        return new JAXBElement<String>(_ProductoNombre_QNAME, String.class, Producto.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link String }{@code >}
     */
    @XmlElementDecl(namespace = "your-namespace", name = "descripcion", scope = Producto.class)
    public JAXBElement<String> createProductoDescripcion(String value) {
        return new JAXBElement<String>(_ProductoDescripcion_QNAME, String.class, Producto.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link BigInteger }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link BigInteger }{@code >}
     */
    @XmlElementDecl(namespace = "your-namespace", name = "precio", scope = Producto.class)
    public JAXBElement<BigInteger> createProductoPrecio(BigInteger value) {
        return new JAXBElement<BigInteger>(_ProductoPrecio_QNAME, BigInteger.class, Producto.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link BigInteger }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link BigInteger }{@code >}
     */
    @XmlElementDecl(namespace = "your-namespace", name = "cantidadDisponible", scope = Producto.class)
    public JAXBElement<BigInteger> createProductoCantidadDisponible(BigInteger value) {
        return new JAXBElement<BigInteger>(_ProductoCantidadDisponible_QNAME, BigInteger.class, Producto.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link String }{@code >}
     */
    @XmlElementDecl(namespace = "your-namespace", name = "categoria", scope = Producto.class)
    public JAXBElement<String> createProductoCategoria(String value) {
        return new JAXBElement<String>(_ProductoCategoria_QNAME, String.class, Producto.class, value);
    }

}
