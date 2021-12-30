# Introduction

ps: This is for my self study. It's is incomplete and not have a purpose of to extendeds more that it. Sorry for en.

## Core concepts

You'll learn about fundamentals that’s include syntax for defining types as well as sending queries and mutations.

### SDL - Schema Definition Language

The SDL is used for define the schema of an API. It's like a contract between API and GraphQL. The main components of schema definition are the types and their fields. Additional information can be provider as custom directives like @default values specifies for likes fields.

**Type**

A type has a name and can implement one or more interfaces:

```nodejs
Type Post Implements Item
  {
  #comments
  }
```

**Field**

A field has a name and a type:

`Age: **Int**`

The GraphQl spec defines some built-in scalar values but more can defined by a concreted implementation. The built in scalar types are:
Int, Float, string, Boolean, ID

Non-nullable fields are denoted by as exclamation mark:
`Age: Int!`

Lists are denoted by square brackets,([]):
Names: [String!]

Enum
An enum is scalar values that has a specified set of possible values:


```javascript
enum Category {
    HOMES
    APARTAMENT
    CONDOS
    HOUSE PARTS
    STUDIOS
}
```

**Interface**

In GraphQl an interface is a list of fields.  A GraphQl type must have the same fields as all the interfaces it implements and all interface fields must be of the same type.


```javascript
Interface Item {
  title: String!
}
```

**Schema directive**

A directive allows you to attach arbitrary information to any other schema definition element. Directives are always placed behind the element they describe.

`name: String! @defaultValue(value: "new blogpost")`

**Queries with Arguments**

In GraphQL, each field can have zero or more arguments if that’s specified in the schema. For example, the allPersons field could have a last parameter to only return up to a specific number of persons. Here’s what a corresponding query would look like:


```nodejs
{
  allPersons(last: 2) {
    name
  }
}
```

**Mutations**

When we need to do some changes to ddata that';s current stored in the backend we use mutation. There are three kinds of mutations:

- Create
- Update
- Delete


```javascript
Mutation  
{
	CreatePerson(name: "rodrigo", age: 40){
	  name
	  age
	}
	
}
```

**Realtime updated with subscriptions**

Another important requirement for many applications today is to have a realtime connection to the server in order to get immediately informed about important events. For this use case, GraphQL offers the concept of subscriptions.

When a client subscribes to an event, it will initiate and hold a steady connection to the server. Whenever that particular event then actually happens, the server pushes the corresponding data to the client. Unlike queries and mutations that follow a typical “request-response-cycle”, subscriptions represent a stream of data sent over to the client.

Generally, a schema is simply a collection of GraphQL types. However, when writing the schema for an API, there are some special root types:


```javascript
type Query { ... }
type Mutation { ... }
type Subscription { ... }
```

The Query, Mutation, and Subscription types are the entry points for the requests sent by the client. To enable the allPersons-query that we saw before, the Query type would have to be written as follows:
From <https://www.howtographql.com/basics/2-core-concepts/> 

Putting it all together, this is the full schema for all the queries and mutation that you have seen in this chapter:


```javascript
type Query {
  allPersons(last: Int): [Person!]!
  allPosts(last: Int): [Post!]!
}
type Mutation {
  createPerson(name: String!, age: Int!): Person!
  updatePerson(id: ID!, name: String!, age: String!): Person!
  deletePerson(id: ID!): Person!
}
type Subscription {
  newPerson: Person!
}
type Person {
  id: ID!
  name: String!
  age: Int!
  posts: [Post!]!
}
type Post {
  title: String!
  author: Person!
}
```

From <https://www.howtographql.com/basics/2-core-concepts/> 

## Architecture (Big Picture)

GraphQL has been released only as a specification. This means that GraphQL is in fact not more than a long document that describes in detail the behaviour of a GraphQL server.

*From <https://www.howtographql.com/basics/3-big-picture/>*

### 1. GraphQL server with a connected database

This architecture will be the most common for greenfield projects. In the setup, you have a single (web) server that implements the GraphQL specification. When a query arrives at the GraphQL server, the server reads the query’s payload and fetches the required information from the database. This is called resolving the query. It then constructs the response object as described in the official specification and returns it to the client.
It’s important to note that GraphQL is actually transport-layer agnostic. This means it can potentially be used with any available network protocol. So, it is potentially possible to implement a GraphQL server based on TCP, WebSockets, etc.
GraphQL also doesn’t care about the database or the format that is used to store the data. You could use a SQL database like AWS Aurora or a NoSQL database like MongoDB.

### 2. GraphQL layer that integrates existing systems

Another major use case for GraphQL is the integration of multiple existing systems behind a single, coherent GraphQL API. This is particularly compelling for companies with legacy infrastructures and many different APIs that have grown over years and now impose a high maintenance burden. One major problem with these legacy systems is that they make it practically impossible to build innovative products that need access to multiple systems.
In that context, GraphQL can be used to unify these existing systems and hide their complexity behind a nice GraphQL API. This way, new client applications can be developed that simply talk to the GraphQL server to fetch the data they need. The GraphQL server is then responsible for fetching the data from the existing systems and package it up in the GraphQL response format.
Just like in the previous architecture where the GraphQL server didn’t care about the type of database being used, this time it doesn’t care about the data sources that it needs to fetch the data that’s needed to resolve a query.

### 3. Hybrid approach with connected database and integration of existing system

Finally, it’s possible to combine the two approaches and build a GraphQL server that has a connected database but still talks to legacy or third—party systems.
When a query is received by the server, it will resolve it and either retrieve the required data from the connected database or some of the integrated APIs.

Both approaches can also be combined and the GraphQL server can fetch data from a single database as well as from an existing system - allowing for complete flexibility and pushing all data management complexity to the server.
