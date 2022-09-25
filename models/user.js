//dependencies
const { Schema, model } = require("mongoose");

//Schema data with MongoDB and Mongoose
const UserSchema = new Schema(
  {
    username: {
      //entry type
      type: String,
      //username must be "unique" or different
      unique: true,
      //required to be entered
      required: "Please enter a username. Thank you!:)",
      //removes empty white space
      trim: true,
    },
    email: {
      //entry type
      type: String,
      //required to be entered
      required: "Please enter a password. Thank you!:)",
      //each email must be different, never the same
      unique: true,
      //must have specific rules for the email, characters/numbers before the @, must have the @, must have the . after the @, only 2-6 characters and only letters and period
      match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/],
    },
    thoughts:
      //Array of _id values referencing the Thought model must use []
      [
        {
          //Schema.Types.ObjectId connects with the Thought.js, stating where the data is coming from
          type: Schema.Types.ObjectId,
          ref: "Thought",
        },
      ],
    friends:
      //Array of _id values referencing the User model  must use []
      [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
  },
  {
    toJSON: {
      //virtuals is what we would want to display on the client side
      virtuals: true,
      //getter is typically a special type of function that takes the stored data youve already looking to retrieve and modifyies or formats it upon return. In this case, we are retriving the lengh of the user's friends
      getters: true,
    },
    //set to false because this is a virtual that Mongoose returns, we dont need
    id: false,
  }
);

//getters's true function, retriving the length of friends. Wish I have as many friends
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);
//export the User Model
module.exports = User;
