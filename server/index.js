const express = require('express');
const app = express();
const PORT = 3030;
const path = '/graphql';
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { ApolloServer, gql } = require('apollo-server-express');
const { User } = require('./models/index');

User.sequelize.sync().then(() => {
  console.log("sequelize success")
}).catch(err => {
  console.log("sequelize fail", err)
})

require("dotenv").config();



app.post('/tokenIsValid', async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) return res.json(false);

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified) return res.json(false);

  const user = await Users.findOne({ where: { id: verified.id } });
  if (!user) return res.json(false);

  return res.json(true);
})



const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path });

// The `listen` method launches a web server.
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${path}`)
)
