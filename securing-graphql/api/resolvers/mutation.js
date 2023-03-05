const authUtils = require("../utils/auth");

module.exports = {
  createSession: async (parent, args, { dataSources }, info) => {
    const session = await dataSources.sessionDataSource.createSession(
      args.session
    );
    return session;
  },
  signUp: async (parent, { input }, { dataSources }, info) => {
    const { userDataSource } = dataSources;

    input.email = input.email.toLowerCase();
    const { email, password } = input;

    // Check to see if user is in DB
    const doesUserExist = await userDataSource.getUserByEmail(email);

    console.log(doesUserExist);

    console.log(doesUserExist);
    // If in DB return apollo error
    if (doesUserExist) {
      throw new Error("User already exists");
    }

    // If user is found hash password

    const hashedPassword = authUtils.hashPassword(password);

    // store user creds in db

    const newUser = await userDataSource.createUser({
      email,
      password: hashedPassword,
    });

    // create token

    const token = authUtils.createToken({
      id: newUser.id,
      email: newUser.email,
    });

    // Return auth token

    console.log(newUser);

    return { token, user: { id: newUser.id, email: newUser.email } };
  },

  toggleFavoriteSession: async (parent, args, { dataSources }, info) => {
    const speaker = await dataSources.sessionDataSource.toggleFavoriteSession(
      args.id
    );
    return speaker;
  },
};
