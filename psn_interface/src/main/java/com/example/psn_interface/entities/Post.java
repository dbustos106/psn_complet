package com.example.psn_interface.entities;

import lombok.Data;

@Data
public class Post {
        private String _id;
        private Integer ownerId;
        private String location;
        private String description;
}
