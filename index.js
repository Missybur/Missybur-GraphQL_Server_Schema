var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');

// Import our data set from above
var data = require('./data.json');

// Define our user type, with two string fields; `id` and `name`
var studentsType = new graphql.GraphQLObjectType({
  name: 'Students',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    gpa: {type: graphql.GraphQLString},
    level: {type: graphql.GraphQLString},
    course: {type: graphql.GraphQLString},
    grade: {type: graphql.GraphQLString},
    instructor:  {type: graphql.GraphQLString}
  }
});


var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      students: {
        type: studentsType,
        args: {
          id: { type: graphql.GraphQLString },
          gpa: {type: graphql.GraphQLString},
          level: {type: graphql.GraphQLString},
          course: {type: graphql.GraphQLString},
          grade: {type: graphql.GraphQLString},
          instructor:  {type: graphql.GraphQLString}

      },
        resolve: function (_, args) {
          return data[args.id];
        }
      }
    }
  })
});

console.log('Server online!');
express()
  .use('/graphql', graphqlHTTP({ schema: schema, pretty: true }))
  .listen(3000);