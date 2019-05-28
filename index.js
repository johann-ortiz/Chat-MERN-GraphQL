"use strict";
const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql");
const { graphql, buildSchema } = require("graphql");

const db = {
  users: [
    { id: "1", email: "mei@gmail.com", name: "Mei" },
    { id: "2", email: "guillo@gmail.com", name: "Guillo" }
  ],

  messages: [
    { id: "1", userId: "1", body: "GraphQL Message", createdAt: Date.now() },
    {
      id: "2",
      userId: "2",
      body: "GraphQL Message Meow",
      createdAt: Date.now()
    }
  ]
};

const schema = buildSchema(`
      type Query {
          users: [User!]!
          messages: [Message!]!
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

      type Message {
          id: ID!,
          body: String!
          createdAt: String
          userId: String!
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
  },
  messages: () => db.messages
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
