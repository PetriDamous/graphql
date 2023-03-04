const authUtils = require("../utils/auth");

module.exports = {
  createSession: async (parent, args, { dataSources, user }, info) => {
    // If user cannot be verified we just return null.
    // You really will do some sort of error handling.
    if (!user) {
      return null;
    }

    const session = await dataSources.sessionDataSource.createSession(
      args.session
    );
    return session;
  },
  signUp: async (parent, { credentials }, { dataSources }, info) => {
    // user credentials will come from the args provided  by
    // the Credentials input.
    const { email, password } = credentials;

    // We make the email case safe.
    const userCredentials = { email: email.toLowerCase(), password };

    // We check for an exising user.
    const existingUser = dataSources.userDataSource.getUserByEmail(
      userCredentials.email
    );

    // If the user is in our database we throw an error.
    if (existingUser) {
      throw new Error("A user account with that email already exists.");
    }

    // We hash the password so it can be stored securely in our
    // database.
    const hash = authUtils.hashPassword(userCredentials.password);

    // We then create the user account with our hashed password
    // and user's email.
    const dbUser = dataSources.userDataSource.createUser({
      email: userCredentials.email,
      hash,
    });

    // We then create a token to send back to the user.
    const token = authUtils.createToken(dbUser);

    // We then return the token and user credentials back to the user.
    // The user will use this info to keep a secured connection to the server.
    return {
      token,
      user: {
        id: dbUser.id,
        email: dbUser.email,
      },
    };
  },
  signIn: async (parent, { credentials }, { dataSources }, info) => {
    // user credentials will come from the args provided  by
    // the Credentials input.
    const { email, password } = credentials;

    // We make the email case safe.
    const userCredentials = { email: email.toLowerCase(), password };

    // Check to see if user is in database by using provided email.
    const existingUser = dataSources.userDataSource.getUserByEmail(
      userCredentials.email
    );

    // Send error back if provided email is not found in
    // database.
    if (!existingUser) {
      throw new Error("Incorrect email address or password.");
    }

    // We validate the password provided password to see
    // if it matches the password retrived from the
    // database.
    const isValidPassword = authUtils.verifyPassword(
      password,
      existingUser.hash
    );

    // If password is not valid we throw an error.
    if (!isValidPassword) {
      throw new Error("Incorrect email address or password.");
    }

    // If everything checks out we create a token to be sent back.
    const token = authUtils.createToken(existingUser);

    // We then return the token and user credentials back to the user.
    // The user will use this info to keep a secured connection to the server.
    return {
      token,
      user: {
        id: existingUser.id,
        email: existingUser.email,
      },
    };
  },
  toggleFavoriteSession: async (parent, args, { dataSources }, info) => {
    const speaker = await dataSources.sessionDataSource.toggleFavoriteSession(
      args.id
    );
    return speaker;
  },
};
