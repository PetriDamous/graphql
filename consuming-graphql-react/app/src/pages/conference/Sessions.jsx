import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import "./style-sessions.css";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { SESSIONS, CREATE_SESSION } from "./graphql";
import { updateSessions } from "./helper";

/* ---> Define queries, mutations and fragments here */

function AllSessionList() {
  /* ---> Invoke useQuery hook here to retrieve all sessions and call SessionItem */
  const { data, error, loading } = useQuery(SESSIONS);

  if (loading) return <p style={{ fontWeight: 700 }}>Loading Sessions...</p>;

  if (error)
    return (
      <p style={{ fontWeight: 700 }}>
        Shit got fucked up.....please try again later.
      </p>
    );

  console.log(data);

  return [<div>dog</div>, <div>cat</div>, <div>monkey</div>];

  // return data?.sessions.map((session) => {
  //   return <SessionItem key={session.id} session={session} />;
  // });
}

function SessionList({ day }) {
  /* ---> Invoke useQuery hook here to retrieve sessions per day and call SessionItem */
  const { data, error, loading } = useQuery(SESSIONS, {
    variables: { day },
  });

  console.log(data);

  if (loading) return <p style={{ fontWeight: 700 }}>Loading Sessions...</p>;

  if (error)
    return (
      <p style={{ fontWeight: 700 }}>
        Shit got fucked up.....please try again later.
      </p>
    );

  console.log(data);

  return data?.sessions.map((session) => {
    return <SessionItem key={session.id} session={session} />;
  });
}

function SessionItem(props) {
  /* ---> Replace hard coded session values with data that you get back from GraphQL server here */

  const { session } = props;

  return (
    <div key={session.id} className="col-xs-12 col-sm-6" style={{ padding: 5 }}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{session.title}</h3>
          <h5>{`Level: ${session.level}`}</h5>
        </div>
        <div className="panel-body">
          <h5>{`Day: ${session.day}`}</h5>
          <h5>{`Room Number: ${session.room}`}</h5>
          <h5>{`Starts at: ${session.startsAt}`}</h5>
          <section>{session.description}</section>
        </div>
        <div className="panel-footer"></div>
      </div>
    </div>
  );
}

export function Sessions() {
  const [day, setDay] = useState("All");

  return (
    <>
      <section className="banner">
        <div className="container">
          <div className="row" style={{ padding: 10 }}>
            <Link
              className="btn btn-lg center-block"
              to={`/conference/sessions/new`}
            >
              Submit a Session!
            </Link>
          </div>
          <div className="row">
            <button
              type="button"
              onClick={() => setDay("All")}
              className="btn-oval"
            >
              All Sessions
            </button>
            <button
              type="button"
              onClick={() => setDay("Wednesday")}
              className="btn-oval"
            >
              Wednesday
            </button>
            <button
              type="button"
              onClick={() => setDay("Thursday")}
              className="btn-oval"
            >
              Thursday
            </button>
            <button
              type="button"
              onClick={() => setDay("Friday")}
              className="btn-oval"
            >
              Friday
            </button>
          </div>
          {day !== "All" && <SessionList day={day} />}
          {day === "All" && <AllSessionList />}
        </div>
      </section>
    </>
  );
}

export function SessionForm() {
  /* ---> Call useMutation hook here to create new session and update cache */

  const [createSession, { called, error }] = useMutation(CREATE_SESSION, {
    update: updateSessions,
  });

  if (called) return <p>Session has been submited</p>;

  if (error) return <p>Shit got fucked up....</p>;

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
      <Formik
        initialValues={{
          title: "",
          description: "",
          day: "",
          level: "",
        }}
        onSubmit={(value) => {
          /* ---> Call useMutation mutate function here to create new session */
          createSession({ variables: { session: value } });
        }}
      >
        {() => (
          <Form style={{ width: "100%", maxWidth: 500 }}>
            <h3 className="h3 mb-3 font-weight-normal">Submit a Session!</h3>
            <div className="mb-3" style={{ paddingBottom: 5 }}>
              <label htmlFor="inputTitle">Title</label>
              <Field
                id="inputTitle"
                className="form-control"
                required
                autoFocus
                name="title"
              />
            </div>
            <div className="mb-3" style={{ paddingBottom: 5 }}>
              <label htmlFor="inputDescription">Description</label>
              <Field
                type="textarea"
                id="inputDescription"
                className="form-control"
                required
                name="description"
              />
            </div>
            <div className="mb-3" style={{ paddingBottom: 5 }}>
              <label htmlFor="inputDay">Day</label>
              <Field
                name="day"
                id="inputDay"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3" style={{ paddingBottom: 5 }}>
              <label htmlFor="inputLevel">Level</label>
              <Field
                name="level"
                id="inputLevel"
                className="form-control"
                required
              />
            </div>
            <div style={{ justifyContent: "center", alignContent: "center" }}>
              <button className="btn btn-primary">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export function AddSession() {
  return (
    <>
      <section className="banner">
        <div className="container">
          <div className="row">
            <SessionForm />
          </div>
        </div>
      </section>
    </>
  );
}
