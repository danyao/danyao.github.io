import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import './index.css';

class ProtoWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      userInfo: undefined,
    };
  }

  handleSignIn(name, email, idToken) {
    this.setState({
      signedIn: true,
      userInfo: {
        name,
        email,
        idToken,
      }
    });
  }

  handleSignOut() {
    this.setState({
      signedIn: false,
      userInfo: undefined,
    });
  }

  render() {
    return (
      <div className="proto-wallet">
        <h1>Proto Wallet</h1>
        <p>-- Web Payments Made Easy</p>
        <Profile
          value={this.state.signedIn}
          onSignIn={(a, b, c) => this.handleSignIn(a, b, c)}
          onSignOut={() => this.handleSignOut()}
        />
      </div>
    );
  }
}

class Profile extends React.Component {
  onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    // Propate state changes back to parent.
    this.props.onSignIn(profile.getName(), profile.getEmail(), id_token);
  }

  render() {
    return (
      <div className="profile-card">
        <GoogleLogin
          clientId="88174584943-5qup1g3ag0ve8oj1mpoa7ppsqn5nf0tt.apps.googleusercontent.com"
          buttonText="Login using Google"
          onSuccess={(r) => this.onSignIn(r) }
        />
        <div>Signed-in: {this.props.value ? "true" : "false"}</div>
      </div>
    );
  }
}

ReactDOM.render(
  <ProtoWallet />,
  document.querySelector("#root")
);
