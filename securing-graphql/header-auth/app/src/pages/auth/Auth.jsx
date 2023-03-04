import * as React from "react";
import { Switch, Route, Link, useRouteMatch, Redirect } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { useMutation, gql } from "@apollo/client";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

function FormLayout({ children }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        padding: 10,
      }}
    >
      <div style={{ width: "100%", maxWidth: 500 }}>{children}</div>
    </div>
  );
}

const AuthForm = ({ onSubmit, children }) => (
  <Formik initialValues={{ email: "", password: "" }} onSubmit={onSubmit}>
    <Form className="form-signin">
      <div className="mb-3" style={{ paddingBottom: 5 }}>
        <label htmlFor="inputEmail">Email address</label>
        <Field
          name="email"
          type="email"
          id="inputEmail"
          className="form-control"
          required
          autoFocus
        />
      </div>

      <div className="mb-3" style={{ paddingBottom: 5 }}>
        <label htmlFor="inputPassword">Password</label>
        <Field
          name="password"
          type="password"
          id="inputPassword"
          className="form-control"
          required
        />
      </div>
      <button className="btn btn-lg btn-primary btn-block" type="submit">
        {children}
      </button>
    </Form>
  </Formik>
);

// Mutation string for signing up.
const signUpMutation = gql`
  mutation signUpUser($email: String!, $password: String!) {
    signUp(credentials: { email: $email, password: $password }) {
      token
      user {
        id
        email
      }
    }
  }
`;

function SignUpForm() {
  // Mutation for signing up.
  const [signUpUser] = useMutation(signUpMutation);

  // Brining in our authContext object
  // so we can setup authentication info in our
  // authContext state.
  const authContext = useContext(AuthContext);

  // When submit is clicked the action begins.
  const handleSubmit = async (values) => {
    // Run the signUpUser mutation function.
    const {
      data: { signUp },
    } = await signUpUser({ variables: values });

    // Once mutation is complete grab returned data with the signUp object.
    // This object will contain the token and the user data (email and password).
    // We then set the state for our authContext so it now has access to anything
    // dealing with user authentication.
    authContext.setAuthInfo({ token: signUp.token, userData: signUp.user });
  };

  return (
    <FormLayout>
      <span>
        <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
        <h6>
          Already have an account? <Link to={`/auth/sign-in`}>Sign In</Link>
        </h6>
      </span>
      <AuthForm onSubmit={handleSubmit}>Sign up</AuthForm>
    </FormLayout>
  );
}

// Mutation for Signing in.
const signInMutation = gql`
  mutation signInUser($email: String!, $password: String!) {
    signIn(credentials: { email: $email, password: $password }) {
      token
      user {
        id
        email
      }
    }
  }
`;

function SignInForm() {
  // Using mutation to get the mutation function.
  const [signInUser] = useMutation(signInMutation);

  // Bringing in our authContext object.
  const authContext = useContext(AuthContext);

  // Where the fun starts.
  const handleSubmit = async (values) => {
    // Basically the same thing we did for signUp
    const {
      data: { signIn },
    } = await signInUser({ variables: values });
    authContext.setAuthInfo({ token: signIn.token, userData: signIn.user });
  };

  return (
    <FormLayout>
      <span>
        <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
        <h6>
          Need an account? <Link to={`/auth/sign-up`}>Sign Up</Link>
        </h6>
      </span>
      <AuthForm onSubmit={handleSubmit}>Sign in</AuthForm>
    </FormLayout>
  );
}

export function Auth() {
  const { path, url } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${path}/sign-in`}>
          <SignInForm />
        </Route>
        <Route path={`${path}/sign-up`}>
          <SignUpForm />
        </Route>
        <Route path={`${path}`}>
          <Redirect to={`${url}/sign-in`} />
        </Route>
      </Switch>
    </>
  );
}
