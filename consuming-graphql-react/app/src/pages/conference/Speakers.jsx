import * as React from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import "./style-sessions.css";
import { TOGGLE_FAV_SESSION, SPEAKERS, SPEAKER_BY_ID } from "./graphql";

const SpeakerList = () => {
  const { data, error, loading } = useQuery(SPEAKERS);

  const [toggleFavSession] = useMutation(TOGGLE_FAV_SESSION);

  if (loading) return <p style={{ fontWeight: 700 }}>Fetching your shit....</p>;

  if (error)
    return (
      <p style={{ fontWeight: 700 }}>
        Opps we ran into an error. Try again later.
      </p>
    );

  return data?.speakers.map((speaker) => {
    return (
      <div
        key={speaker.id}
        className="col-xs-12 col-sm-6 col-md-6"
        style={{ padding: 5 }}
      >
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{`Speaker: ${speaker.name}`}</h3>
          </div>
          <div className="panel-body">
            <h5>{`Bio: ${speaker.bio} `}</h5>
          </div>
          <div className="panel-footer">
            <h4>Sessions</h4>
            {speaker.sessions.map((session) => (
              <p key={session.id}>{session.title}</p>
            ))}
            <span>
              <button
                type="button"
                className="btn btn-default btn-lg"
                onClick={() => {
                  toggleFavSession({ variables: { speakerId: speaker.id } });
                }}
              >
                <i
                  className={`fa ${speaker.featured ? "fa-star" : "fa-star-o"}`}
                  aria-hidden="true"
                  style={{
                    color: speaker.featured ? "gold" : undefined,
                  }}
                ></i>
                Featured Speaker
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  });
};

const SpeakerDetails = () => {
  /* ---> Replace hardcoded speaker values with data that you get back from GraphQL server here */

  const { speaker_id } = useParams();

  const { data, error, loading } = useQuery(SPEAKER_BY_ID, {
    variables: { speakerId: speaker_id },
  });

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error....</p>;

  const {
    speakerById: { id, bio, name, sessions },
  } = data;

  return (
    <div key={id} className="col-xs-12" style={{ padding: 5 }}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{name}</h3>
        </div>
        <div className="panel-body">
          <h5>{bio}</h5>
        </div>
        <div className="panel-footer">
          {sessions.map((session) => (
            <p key={session.id}>{session.title}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export function Speaker() {
  return (
    <>
      <div className="container">
        <div className="row">
          <SpeakerDetails />
        </div>
      </div>
    </>
  );
}

export function Speakers() {
  return (
    <>
      <div className="container">
        <div className="row">
          <SpeakerList />
        </div>
      </div>
    </>
  );
}
