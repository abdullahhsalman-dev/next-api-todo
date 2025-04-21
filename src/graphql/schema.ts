// src/graphql/schema.ts
import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Todo {
    id: Int!
    title: String!
    completed: Boolean!
    createdAt: String!
  }

  type Query {
    todos: [Todo!]!
    todo(id: Int!): Todo
  }

  type Mutation {
    createTodo(title: String!): Todo!
    updateTodo(id: Int!, completed: Boolean!): Todo!
    deleteTodo(id: Int!): Boolean!
  }
`;
