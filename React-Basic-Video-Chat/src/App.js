import React from "react";
import "./index.css";
import axios from "axios";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      connection: "Connecting",
      publishVideo: true,
      publishAudio: true,
      token: "",
      sessionId: "",
    };
    this.sessionEventHandlers = {
      sessionConnected: () => {
        this.setState({ connection: "Connected" });
      },
      sessionDisconnected: () => {
        this.setState({ connection: "Disconnected" });
      },
      sessionReconnected: () => {
        this.setState({ connection: "Reconnected" });
      },
      sessionReconnecting: () => {
        this.setState({ connection: "Reconnecting" });
      },
    };

    this.publisherEventHandlers = {
      accessDenied: () => {
        console.log("User denied access to media source");
      },
      streamCreated: () => {
        console.log("Publisher stream created");
      },
      streamDestroyed: ({ reason }) => {
        console.log(`Publisher stream destroyed because: ${reason}`);
      },
      videoEnabled: () => {
        console.log("Publisher video enabled");
      },
      videoDisabled: () => {
        console.log("Publisher video disabled");
      },
    };

    this.subscriberEventHandlers = {
      videoEnabled: () => {
        console.log("Subscriber video enabled");
      },
      videoDisabled: () => {
        console.log("Subscriber video disabled");
      },
    };
  }

  componentWillMount() {
    console.log("qwqwqwqwqw");
    this.getData();
  }

  getData() {
    axios
      .get("http://localhost:8000/home")
      .then((res) => {
        // SESSION_ID = res.sessionId;
        this.setState({ token: res.data.token });
        this.setState({ sessionId: res.data.sessionId });
        console.log("this is session", res);
      })
      .catch((err) => console.log("this is error", err));
    console.log("hellfire");
  }

  onSessionError = (error) => {
    this.setState({ error });
  };

  onPublish = () => {
    console.log("Publish Success");
  };

  onPublishError = (error) => {
    this.setState({ error });
  };

  onSubscribe = () => {
    console.log("Subscribe Success");
  };

  onSubscribeError = (error) => {
    this.setState({ error });
  };

  toggleVideo = () => {
    this.setState((state) => ({
      publishVideo: !state.publishVideo,
    }));
  };

  toggleAudio = () => {
    this.setState((state) => ({
      publishAudio: !state.publishAudio,
    }));
  };

  render() {
    // const { apiKey, sessionId, token } = this.props.credentials;
    const { error, connection, publishVideo, publishAudio } = this.state;
    console.log("sessionID", this.state.sessionId);
    return (
      <div>
        <div id="sessionStatus">Session Status: {connection}</div>
        {error ? (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        ) : null}
        <OTSession
          apiKey="47161024"
          sessionId={this.state.sessionId}
          token={this.state.token}
          onError={this.onSessionError}
          eventHandlers={this.sessionEventHandlers}
        >
          <button id="videoButton" onClick={this.toggleVideo}>
            {publishVideo ? "Disable" : "Enable"} Video
          </button>
          <button id="audioButton" onClick={this.toggleAudio}>
            {publishAudio ? "Disable" : "Enable"} Audio
          </button>
          <OTPublisher
            properties={{ publishVideo, publishAudio, width: 100, height: 100 }}
            onPublish={this.onPublish}
            onError={this.onPublishError}
            eventHandlers={this.publisherEventHandlers}
          />
          <OTStreams>
            <OTSubscriber
              properties={{ width: 100, height: 100 }}
              onSubscribe={this.onSubscribe}
              onError={this.onSubscribeError}
              eventHandlers={this.subscriberEventHandlers}
            />
          </OTStreams>
        </OTSession>
      </div>
    );
  }
}
