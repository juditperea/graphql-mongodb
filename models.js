const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Conexión a MongoDB establecida');
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    country: String,
    street: String,
    city: String,
  },
});

const UserModel = mongoose.model('user', userSchema);

const typeDefs = gql`
  input AddressInput {
    street: String
    city: String
    country: String
  }

  type Address {
    country: String
    street: String
    city: String
  }

  type User {
    id: String
    username: String
    name: String
    surname: String
    address: Address
  }

  type Mutation {
    createUser(id: String!, username: String!, name: String!, surname: String!, address: AddressInput): User
  }
  
  type Query {
    getUser(id: String!): User
  }
`;

const resolvers = {
  Mutation: {
    createUser: async (_, { id, username, name, surname, address }) => {
      try {
        const user = new UserModel({ id, username, name, surname, address });
        await user.save();
        return user;
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
      }
    },
  },
  Query: {
    getUser: async (_, { id }) => {
      try {
        const user = await UserModel.findOne({ id });
        return user;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Error fetching user');
      }
    },
  },
};

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer().catch((error) => {
  console.error('Error starting server:', error.message);
  process.exit(1);
});
