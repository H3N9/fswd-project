import moment from 'moment'

import { PostTC, UserTC } from '../../models'

PostTC.addRelation(
  'postBy',
  {
    resolver: () => UserTC.getResolver('findById'),
    prepareArgs: {
      _id: (source) => source.postById,
    },
    projection: { postById: 1 },
  },
)
PostTC.addFields({
  timestampWithFormat: {
    type: 'String',
    resolve: (source) => moment(source.timestamp).fromNow(),
    projection: { timestamp: 1 },
  },
})