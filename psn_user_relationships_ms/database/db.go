package database

import (
	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
)

type Neo4jConfig struct {
	Uri, Username, Password string
}

func (c *Neo4jConfig) CreateDriver() (neo4j.DriverWithContext, error) {
	return neo4j.NewDriverWithContext(c.Uri, neo4j.BasicAuth(c.Username, c.Password, ""))
}
