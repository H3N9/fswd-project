import { schemaComposer } from 'graphql-compose'
//import { GraphQLUpload } from 'apollo-server-express';

import './relations'
import * as queryFields from './queries'
import * as mutationFields from './mutations'

//schemaComposer.add(GraphQLUpload);
schemaComposer.Query.addFields(queryFields)
schemaComposer.Mutation.addFields(mutationFields)

const GQLSchema = schemaComposer.buildSchema()

export default GQLSchema