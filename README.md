npm install @apollo/server graphql apollo-server-micro micro-cors

@apollo/server: Core Apollo Server for GraphQL.
graphql: GraphQL.js library.
apollo-server-micro: Apollo Server integration for Next.js API routes (works with micro).
micro-cors: CORS middleware for handling GraphQL requests.

1. Ask for what you need, get exactly that
   In REST, you often get fixed data structures. With GraphQL, you define the shape of the response right in your query.

graphql
Copy
Edit
query {
user(id: "123") {
name
email
}
}

Instead of multiple REST endpoints like:

bash
Copy
Edit
GET /users
GET /users/123/posts
GET /users/123/friends

GraphQL uses a single endpoint, usually /graphql, and allows you to ask for everything you need in one go.

graphql
Copy
Edit
query {
user(id: "123") {
name
posts {
title
}
friends {
name
}
}
}

3. Strongly Typed Schema
   GraphQL APIs are built around a schema — a contract between client and server. It defines:

What queries and mutations are possible

What types exist

What fields each type has

Example of a schema:

graphql
Copy
Edit
type User {
id: ID!
name: String!
email: String!
posts: [Post]
}

type Post {
id: ID!
title: String!
content: String!
}

4. Real-time Data with Subscriptions
   GraphQL supports subscriptions, which allow clients to receive real-time updates over WebSockets.

graphql
Copy
Edit
subscription {
messageAdded {
id
content
sender {
name
}
}
}

5. Mutations for Data Changes
   While queries fetch data, mutations are used to modify it (like POST, PUT, DELETE in REST).

graphql
Copy
Edit
mutation {
createUser(name: "Iram", email: "iram@example.com") {
id
name
}
}

💡 1. Schema – “The blueprint of your API”
A GraphQL schema defines:

What types your API supports (e.g., User, Post)

What queries can be made (read data)

What mutations can be done (modify data)

Optional: subscriptions (real-time updates)

Think of it like a contract between client and server:

“Here’s what you can ask for, and this is what you’ll get back.”

📦 Example:
graphql
Copy
Edit
type User {
id: ID!
name: String!
email: String!
}

type Query {
getUser(id: ID!): User
}

type Mutation {
createUser(name: String!, email: String!): User
}
This schema says:

There's a User type with id, name, email

You can get a user by ID (query)

You can create a user (mutation)

⚙️ 2. Resolvers – “The logic behind your schema”
Resolvers are functions that run when a field in the schema is queried. They define how to fetch or compute the data.

Each field in the schema has a resolver function behind it (unless it's a simple scalar, then GraphQL can auto-resolve).

🧠 Example:
If someone runs this query:

graphql
Copy
Edit
query {
getUser(id: "1") {
name
}
}
Then this resolver will run:

js
Copy
Edit
const resolvers = {
Query: {
getUser: (\_, { id }, context) => {
// fetch user from DB or mock
return { id: "1", name: "Iram", email: "iram@example.com" };
}
}
}
You can have resolvers for:

Query (read data)

Mutation (write/change data)

Specific fields (for nested or computed fields)
🔥 3. Apollo Server – “The engine that runs your GraphQL API”
Apollo Server is a library that connects:

Your schema

Your resolvers

And creates a GraphQL server endpoint

🚀 Example setup:
js
Copy
Edit
const { ApolloServer, gql } = require('apollo-server');

// 1. Define schema
const typeDefs = gql`
type User {
id: ID!
name: String!
email: String!
}

type Query {
getUser(id: ID!): User
}
`;

// 2. Define resolvers
const resolvers = {
Query: {
getUser: (\_, { id }) => {
return { id, name: "Iram", email: "iram@example.com" };
}
}
};

// 3. Create and start Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
console.log(`🚀 Server ready at ${url}`);
});
