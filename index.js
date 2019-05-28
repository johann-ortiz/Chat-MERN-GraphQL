"use strict";
const { graphql, buildSchema } = require("graphql");

const db = {
  users: [
    { id: "1", email: "mei@gmail.com", name: "Mei" },
    { id: "2", email: "guillo@gmail.com", name: "Guillo" }
  ]
};

const schema = buildSchema(`
    type Query {
        users: [User!]!
    }

    type User {
        id: ID!
        email: String!
        name: String
        avatarUrl: String
    }
`);

const rootValue = {
  users: () => db.users
};

graphql(
  schema,
  `
    {
      users {
        email
        name
      }
    }
  `,
  rootValue
)
  .then(res => console.dir(res, { depth: null }))
  .catch(console.error);
