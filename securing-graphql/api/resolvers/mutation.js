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

    const doesUserExist = await userDataSource.getUserByEmail(email);

    if (doesUserExist) {
      throw new Error("User already exists");
    }

    const hashedPassword = authUtils.hashPassword(password);

    const newUser = await userDataSource.createUser({
      email,
      password: hashedPassword,
    });

    const token = authUtils.createToken({
      id: newUser.id,
      email: newUser.email,
    });

    return { token, user: { ...newUser } };
  },
  signIn: async (parent, { input }, { dataSources }, info) => {
    const { userDataSource } = dataSources;

    input.email = input.email.toLowerCase();

    const { email, password } = input;

    const user = userDataSource.getUserByEmail(email);

    if (!user) {
      throw new Error("Account cannot be found.  Please create an account.");
    }

    const isValidPassword = authUtils.verifyPassword(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid password.");
    }
    const token = authUtils.createToken({
      ...user,
    });

    return {
      token,
      user: { ...user },
    };
  },
  toggleFavoriteSession: async (parent, args, { dataSources }, info) => {
    const speaker = await dataSources.sessionDataSource.toggleFavoriteSession(
      args.id
    );
    return speaker;
  },
};
