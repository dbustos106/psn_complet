//
// Este archivo ha sido generado por Eclipse Implementation of JAXB v3.0.0 
// Visite https://eclipse-ee4j.github.io/jaxb-ri 
// Todas las modificaciones realizadas en este archivo se perderán si se vuelve a compilar el esquema de origen. 
// Generado el: 2023.06.05 a las 05:35:17 PM COT 
//


package localhost.soap.api.welcomepost;

import jakarta.xml.bind.annotation.XmlRegistry;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the localhost.soap.api.welcomepost package. 
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


    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: localhost.soap.api.welcomepost
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link PostType }
     * 
     */
    public PostType createPostType() {
        return new PostType();
    }

    /**
     * Create an instance of {@link GetPostRequest }
     * 
     */
    public GetPostRequest createGetPostRequest() {
        return new GetPostRequest();
    }

}
