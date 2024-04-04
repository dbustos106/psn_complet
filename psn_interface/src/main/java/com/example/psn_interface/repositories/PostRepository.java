package com.example.psn_interface.repositories;
import com.example.psn_interface.entities.Post;
import org.springframework.graphql.client.HttpGraphQlClient;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class PostRepository {

    private final HttpGraphQlClient graphQlClient;

    public PostRepository() {
        WebClient client = WebClient.builder()
                //URL de la API
                .baseUrl("http://psn-ag-service:4500/")
                .build();
        graphQlClient = HttpGraphQlClient.builder(client).build();
    }

    public Post getPost() {
        //language=GraphQL
        String document = "query {\n" +
                  "    findWelcomePost {\n" +
                  "        _id\n" +
                  "        ownerId\n" +
                  "        location\n" +
                  "        description\n" +
                  "    }\n" +
        "}";

        Mono <Post> response = graphQlClient.document(document).retrieve("findWelcomePost").toEntity(Post.class);

        response.subscribe(
                post -> {
                    System.out.println("Consulta exitosa:");
                    System.out.println(post);
                },
                error -> {
                    System.out.println(error);
                }
        );

        return response.block();
    }
}
