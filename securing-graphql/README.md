Securing a GraphQL API with Apollo

Project state at the end of Module 2

Usage:
Run `npm install` in the root, as well as the app and api directories.

Run with `npm start`

Exercise:

Create authentication using JWT headers for authentication.

Requirements:

1. Setup server to use JWT authentication.
2. Protect the createSession mutation resolver from un-authenticated users.
3. Setup authentication on the front-end.
4. On the front-end authenticate users through the sign-in form.
5. Allow a user to create an account.
6. Only authenticated users can have access to the create sessions button.

Game plan:

- Api

  - Schema
    - Create User object/type - complete
    - Create Auth object/type - complete
    - Create two mutations - complete
      - SignUp - complete
      - SignIn - complete
      - Create input that takes in - complete
        - email
        - password
  - Resolvers
    - Create signUp and signIn resolvers - complete
    - Remember to hash passwords before storing in database - complete
    - Always check to see if user is in DB before moving on to more heavy complex stuff - complete
    - We have methods for handling auth and DB related stuff so you don't have to write that from scratch - complete
    - Protect the createSessions resolver
      - You will need to setup context with user auth first
  - Setup context
    - setup context in main server file
    - We are looking at auth headers that come back on a req
  - Added bonus for fun.
    - protect a resolver that brings back user info

- App

  - Wire up sign up and sign in form components
    - Creat mutation queries - complete
    - bring in that useMutation hook baby - complete
    - We will need to bring in state to our from our authContext to update the state in our app
  - Create authContext - complete
    - authContext should have the following:
      - state to capture if a user is authenticated or not - complete
      - boolean value to check if user is authenticated or not - complete
      - Wrap the provider around the root of the app so everyone can get some love - complete
  - Add headers to ApolloContext
    - make sure to check if a token is present from the sign up or sign in process - complete
    - Use that context to bring in token data from the mentioned processes
  - Added bonus
    - Hide create session button from user if they are not authenticated into the app

- Test along the way keeps the bugs away
