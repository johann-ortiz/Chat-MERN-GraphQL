"use strict";
const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql");
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
  
      type Mutation {
          addUser(email: String!, name: String): User
      }

      type User {
          id: ID!,
          email: String!
          name: String
          avatarUrl: String
      }
  `);

const rootValue = {
  users: () => db.users,
  addUser: ({ email, name }) => {
    const user = {
      id: Date.now,
      email,
      name
    };

    db.users.push(user);
    return user;
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
  })
);

app.listen(process.env.PORT || 3000, () => console.log("Server Running"));
