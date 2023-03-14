const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true, 
      getters: true // this line is to show the virtuals in the response
    },
    id: false // prevents virtuals from creating duplicate of _id as `id`
  }
);

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
}); // this is a virtual that retrieves the length of the user's friends array field on query

const User = model('User', UserSchema);

module.exports = User;