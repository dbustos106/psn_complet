package models

import (
	"PSN_Projct/database"
	"context"
	"os"

	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
)

type User_to_user struct {
	Id_origin  int64 `json:"idO"`
	Id_destiny int64 `json:"idD"`
}

type Relationship struct {
	Id_origin int64 `json:"idO"`
	Name string `json:"name"`
}

var con = database.Neo4jConfig{Uri: os.Getenv("NEO4J_URI"), Username: os.Getenv("NEO4J_USERNAME"), Password: os.Getenv("NEO4J_PASSWORD")}

func (u *User_to_user) CreateUser(ctx context.Context, id int64) (interface{}, error) {
	driver, err := con.CreateDriver()

	if err != nil {
		return nil, err
	}

	defer driver.Close(ctx)

	session := driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite, DatabaseName: "neo4j"})
	defer session.Close(ctx)

	user, err := session.ExecuteWrite(ctx, func(transaction neo4j.ManagedTransaction) (any, error) {
		result, err := transaction.Run(ctx,
			"MERGE (n:User {id: $id}) "+
				"ON CREATE SET n.id = $id "+
				"RETURN n",
			map[string]interface{}{"id": id})

		if err != nil {
			return nil, err
		}

		return result.Collect(ctx)
	})
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u *User_to_user) DeleteUser(ctx context.Context, id int64) (interface{}, error) {
	driver, err := con.CreateDriver()

	if err != nil {
		return nil, err
	}

	defer driver.Close(ctx)

	session := driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite, DatabaseName: "neo4j"})
	defer session.Close(ctx)

	user, err := session.ExecuteWrite(ctx, func(transaction neo4j.ManagedTransaction) (any, error) {
		result, err := transaction.Run(ctx,
			"OPTIONAL MATCH (n {id: $idO}) "+
				"DETACH DELETE n",
			map[string]interface{}{"idO": id})

		if err != nil {
			return nil, err
		}

		return result.Collect(ctx)
	})
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u *User_to_user) RelationsToUser(ctx context.Context, idO, idD int64) (interface{}, error) {
	driver, err := con.CreateDriver()

	if err != nil {
		return "", err
	}

	defer driver.Close(ctx)

	session := driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	rrelations, err := session.ExecuteWrite(ctx, func(transaction neo4j.ManagedTransaction) (any, error) {
		result, err := transaction.Run(ctx,
			"MATCH (n:User {id: $idO})-[r]->(u:User {id: $idD}) "+
				"RETURN n.id AS id_origin, type(r) AS relationship",
			map[string]interface{}{"idO": idO, "idD": idD})

		if err != nil {
			return nil, err
		}

		relationships := make([]Relationship, 0)
		for result.Next(ctx) { 
			record := result.Record()
			id_origin, _ := record.Get("id_origin") 
			name, exists := record.Get("relationship")
			if exists {
				relationship := Relationship{
					Id_origin: id_origin.(int64),
					Name: name.(string),
				}
				relationships = append(relationships, relationship)
			}
		}
		return relationships, nil
	})
	if err != nil {
		return "", err
	}

	return rrelations, nil
}

func (u *User_to_user) IsBlockedUser(ctx context.Context, idO, idD int64) (interface{}, error) {
	driver, err := con.CreateDriver()

	if err != nil {
		return "", err
	}

	defer driver.Close(ctx)

	session := driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	rrelations, err := session.ExecuteWrite(ctx, func(transaction neo4j.ManagedTransaction) (any, error) {
		result, err := transaction.Run(ctx,
			"MATCH (n:User {id: $idD})-[r:BLOCK]->(u:User {id: $idO}) "+
				"RETURN COUNT(r) > 0 AS isBlock",
			map[string]interface{}{"idO": idO, "idD": idD})

		if err != nil {
			return nil, err
		}

		if result.Next(ctx) {
			record := result.Record()
			hasRelationship, exists := record.Get("isBlock")
			if exists {
				return hasRelationship.(bool), nil
			}
		}
	
		return false, nil
	})
	if err != nil {
		return "", err
	}

	return rrelations, nil
}

func (u *User_to_user) FollowUser(ctx context.Context, idO, idD int64) (interface{}, error) {
	driver, err := con.CreateDriver()

	if err != nil {
		return "", err
	}

	defer driver.Close(ctx)

	session := driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	rfollow, err := session.ExecuteWrite(ctx, func(transaction neo4j.ManagedTransaction) (any, error) {
		result, err := transaction.Run(ctx,
			"MATCH (n:User {id: $idO}), (u:User {id: $idD}) "+
				"MERGE (n)-[f:REQUEST_FOLLOW]->(u) ",
			map[string]interface{}{"idO": idO, "idD": idD})

		if err != nil {
			return nil, err
		}

		return result.Collect(ctx)
	})

	if err != nil {
		return "", err
	}

	return rfollow, nil
}

func (u *User_to_user) UnfollowUser(ctx context.Context, idO, idD int64) (interface{}, error) {
	driver, err := con.CreateDriver()

	if err != nil {
		return "", err
	}

	defer driver.Close(ctx)

	session := driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	unfollow, err := session.ExecuteWrite(ctx, func(transaction neo4j.ManagedTransaction) (any, error) {
		result, err := transaction.Run(ctx,
			"MATCH (n:User {id: $idO})-[f: FOLLOW]->(u:User {id: $idD}) "+
				"DELETE f",
			map[string]interface{}{"idO": idO, "idD": idD})

		if err != nil {
			return nil, err
		}

		return result.Collect(ctx)
	})

	if err != nil {
		return "", err
	}

	return unfollow, nil
}

func (u *User_to_user) BlockUser(ctx context.Context, idO, idD int64) (interface{}, error) {
	driver, err := con.CreateDriver()

	if err != nil {
		return "", err
	}

	defer driver.Close(ctx)

	session := driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	block, err := session.ExecuteWrite(ctx, func(transaction neo4j.ManagedTransaction) (any, error) {
		result, err := transaction.Run(ctx,
			"MATCH (n:User {id: $idO}), (u:User {id: $idD}) "+
				"MERGE (n)-[b:BLOCK]->(u)",
			map[string]interface{}{"idO": idO, "idD": idD})

		if err != nil {
			return nil, err
		}

		return result.Collect(ctx)
	})

	if err != nil {
		return "", err
	}

	return block, nil
}

func (u *User_to_user) UnblockUser(ctx context.Context, idO, idD int64) (interface{}, error) {
	driver, err := con.CreateDriver()

	if err != nil {
		return "", err
	}

	defer driver.Close(ctx)

	session := driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	unblock, err := session.ExecuteWrite(ctx, func(transaction neo4j.ManagedTransaction) (any, error) {
		result, err := transaction.Run(ctx,
			"MATCH (n:User {id: $idO})-[f: BLOCK]->(u:User {id: $idD}) "+
				"DELETE f",
			map[string]interface{}{"idO": idO, "idD": idD})

		if err != nil {
			return nil, err
		}

		return result.Collect(ctx)
	})

	if err != nil {
		return "", err
	}

	return unblock, nil
}

func (u *User_to_user) DenyFollowUser(ctx context.Context, idO, idD int64) (interface{}, error) {
	driver, err := con.CreateDriver()

	if err != nil {
		return "", err
	}

	defer driver.Close(ctx)

	session := driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	dfollow, err := session.ExecuteWrite(ctx, func(transaction neo4j.ManagedTransaction) (any, error) {
		result, err := transaction.Run(ctx,
			"MATCH (n:User {id: $idD})-[f:REQUEST_FOLLOW]->(u:User {id: $idO}) "+
				"DELETE f",
			map[string]interface{}{"idO": idO, "idD": idD})

		if err != nil {
			return nil, err
		}

		return result.Collect(ctx)
	})

	if err != nil {
		return "", err
	}

	return dfollow, nil
}

func (u *User_to_user) AcceptFollowUser(ctx context.Context, idO, idD int64) (interface{}, error) {
	driver, err := con.CreateDriver()

	if err != nil {
		return "", err
	}

	defer driver.Close(ctx)

	session := driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	follow, err := session.ExecuteWrite(ctx, func(transaction neo4j.ManagedTransaction) (any, error) {
		result, err := transaction.Run(ctx,
			"MATCH (n:User {id: $idD})-[g:REQUEST_FOLLOW]->(u:User {id: $idO}) "+
				"MERGE (n)-[f:FOLLOW]->(u) "+
				"DELETE g",
			map[string]interface{}{"idO": idO, "idD": idD})

		if err != nil {
			return nil, err
		}

		return result.Collect(ctx)
	})

	if err != nil {
		return "", err
	}

	return follow, nil
}

func (u *User_to_user) SearchUser(ctx context.Context, idO, idD int64) (interface{}, error) {
	driver, err := con.CreateDriver()

	if err != nil {
		return "", err
	}

	defer driver.Close(ctx)

	session := driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	search, err := session.ExecuteWrite(ctx, func(transaction neo4j.ManagedTransaction) (any, error) {
		result, err := transaction.Run(ctx,
			"MATCH (u:User {id:$idO}), (n:User {id:$idD}) "+
				"MERGE (u)-[rs:RECENT_SEARCHED]->(n) ",
			map[string]interface{}{"idO": idO, "idD": idD})

		if err != nil {
			return nil, err
		}

		return result.Collect(ctx)
	})

	if err != nil {
		return "", err
	}

	return search, nil
}

func (u *User_to_user) DeleteSearchedUsersRecently(ctx context.Context, idO int64) (interface{}, error) {
	driver, err := con.CreateDriver()

	if err != nil {
		return "", err
	}

	defer driver.Close(ctx)

	session := driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	dsearch, err := session.ExecuteWrite(ctx, func(transaction neo4j.ManagedTransaction) (any, error) {
		result, err := transaction.Run(ctx,
			"MATCH (n:User {id: $idO})-[f:RECENT_SEARCHED]->(u) "+
				"DELETE f",
			map[string]interface{}{"idO": idO})

		if err != nil {
			return nil, err
		}

		return result.Collect(ctx)
	})

	if err != nil {
		return "", err
	}

	return dsearch, nil
}

func (u *User_to_user) ListFollowedUser(ctx context.Context, idO int64) (interface{}, error) {
	driver, err := con.CreateDriver()

	if err != nil {
		return "", err
	}

	defer driver.Close(ctx)

	session := driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	lfollow, err := session.ExecuteWrite(ctx, func(transaction neo4j.ManagedTransaction) (any, error) {
		result, err := transaction.Run(ctx,
			"MATCH (n:User {id: $idO})-[f:FOLLOW]->(u) "+
				"WHERE NOT (n)-[:BLOCK]->(u) "+
				"AND NOT (u)-[:BLOCK]->(n) "+
				"RETURN u.id AS id",
			map[string]interface{}{"idO": idO})

		if err != nil {
			return nil, err
		}

		ids := make([]int64, 0)
		for result.Next(ctx) { 
			record := result.Record()
			id, exists := record.Get("id") 
			if exists {
				ids = append(ids, id.(int64))
			}
		}
		return ids, nil
	})

	if err != nil {
		return "", err
	}

	return lfollow, nil
}

func (u *User_to_user) ListBlockUser(ctx context.Context, idO int64) (interface{}, error) {
	driver, err := con.CreateDriver()

	if err != nil {
		return "", err
	}

	defer driver.Close(ctx)

	session := driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	lblock, err := session.ExecuteWrite(ctx, func(transaction neo4j.ManagedTransaction) (any, error) {
		result, err := transaction.Run(ctx,
			"MATCH (n:User {id: $idO})-[f: BLOCK]->(u) "+
				"RETURN u.id AS id",
			map[string]interface{}{"idO": idO})

		if err != nil {
			return nil, err
		}

		ids := make([]int64, 0)
		for result.Next(ctx) { 
			record := result.Record()
			id, exists := record.Get("id") 
			if exists {
				ids = append(ids, id.(int64))
			}
		}
		return ids, nil
	})

	if err != nil {
		return "", err
	}

	return lblock, nil
}

func (u *User_to_user) ListSuggestedFriends(ctx context.Context, idO int64) (interface{}, error) {
	driver, err := con.CreateDriver()

	if err != nil {
		return "", err
	}

	defer driver.Close(ctx)

	session := driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	lfollow, err := session.ExecuteWrite(ctx, func(transaction neo4j.ManagedTransaction) (any, error) {
		result, err := transaction.Run(ctx,
			"MATCH (n:User {id: $idO})-[:FOLLOW]->(f:User)-[:FOLLOW]->(s:User) "+
				"WHERE NOT (n)-[:REQUEST_FOLLOW]->(s) "+
				"AND NOT (n)-[:BLOCK]->(s) "+
				"AND NOT (s)-[:BLOCK]->(n) "+
				"RETURN s.id AS id "+
				"LIMIT 10",
			map[string]interface{}{"idO": idO})

		if err != nil {
			return nil, err
		}

		ids := make([]int64, 0)
		for result.Next(ctx) { 
			record := result.Record()
			id, exists := record.Get("id") 
			if exists {
				ids = append(ids, id.(int64))
			}
		}
		return ids, nil
	})

	if err != nil {
		return "", err
	}

	return lfollow, nil
}

func (u *User_to_user) ListRequestFollowUser(ctx context.Context, idO int64) (interface{}, error) {
	driver, err := con.CreateDriver()

	if err != nil {
		return "", err
	}

	defer driver.Close(ctx)

	session := driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	rfollow, err := session.ExecuteWrite(ctx, func(transaction neo4j.ManagedTransaction) (any, error) {
		result, err := transaction.Run(ctx,
			"MATCH (u:User)-[f:REQUEST_FOLLOW]->(n:User {id: $idO}) "+
				"WHERE NOT (n)-[:BLOCK]->(u) "+
				"AND NOT (u)-[:BLOCK]->(n) "+
				"RETURN u.id AS id",
			map[string]interface{}{"idO": idO})

		if err != nil {
			return nil, err
		}

		ids := make([]int64, 0)
		for result.Next(ctx) { 
			record := result.Record()
			id, exists := record.Get("id") 
			if exists {
				ids = append(ids, id.(int64))
			}
		}
		return ids, nil
	})

	if err != nil {
		return "", err
	}

	return rfollow, nil
}

func (u *User_to_user) ListSearchedUsers(ctx context.Context, idO int64) (interface{}, error) {
	driver, err := con.CreateDriver()

	if err != nil {
		return "", err
	}

	defer driver.Close(ctx)

	session := driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	lsearch, err := session.ExecuteWrite(ctx, func(transaction neo4j.ManagedTransaction) (any, error) {
		result, err := transaction.Run(ctx,
			"MATCH (n:User {id: $idO})-[f:RECENT_SEARCHED]->(u) "+
				"WHERE NOT (u)-[:BLOCK]->(n) "+
				"RETURN u.id AS id",
			map[string]interface{}{"idO": idO})

		if err != nil {
			return nil, err
		}

		ids := make([]int64, 0)
		for result.Next(ctx) { 
			record := result.Record()
			id, exists := record.Get("id") 
			if exists {
				ids = append(ids, id.(int64))
			}
		}
		return ids, nil
	})

	if err != nil {
		return "", err
	}

	return lsearch, nil
}
