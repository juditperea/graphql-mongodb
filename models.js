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

const typeDefs = gql`
  type User {
    id: ID
    username: String
    name: String
    surname: String
    country: String
  }

  type Group {
    id: ID
    name: String
    members: [User]
  }

  type Mutation {
    createUser(username: String, name: String, surname: String, country: String): User
    createGroup(name: String, memberIds: [String]): Group
  }
`;

const resolvers = {
    Mutation: {
      createUser: async (_, { username, name, surname, country }) => {
        const user = new UserModel({ username, name, surname, country });
        await user.save();
        return user;
      },
      createGroup: async (_, { name, memberIds }) => {
        const members = await UserModel.find({ id: { $in: memberIds } });
        const group = new GroupModel({ name, members });
        await group.save();
        return group;
      },
    },
  };
  
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
  country: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
});

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [{
    type: mongoose.Types.ObjectId,
    ref: 'User',
  }],
});

const UserModel = mongoose.model('User', userSchema);
const GroupModel = mongoose.model('Group', groupSchema);


/*const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);*/