import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Button,
} from "react-native";

import auth from "@react-native-firebase/auth";
import { GoogleSignin, Soc } from "@react-native-google-signin/google-signin";

async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.signinContainer}>
        <Button
          title="yes"
          style={styles.social}
          onPress={() =>
            onGoogleButtonPress()
              .then(() => console.log("Signed in with Google!"))
              .catch((e) => console.log(e))
          }
        >
          LOGIN
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  subtitle: { color: "#FFF", textAlign: "center" },
  social: {
    padding: 30,
    backgroundColor: "white",
    color: "black",
    borderRadius: 15,
  },
  signinContainer: {
    position: "absolute",
    top: "70%",
    padding: 0,
    margin: 0,
  },
  signInButton: {
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default OnboardingScreen;
