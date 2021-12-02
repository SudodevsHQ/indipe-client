import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import * as React from "react";
import { View, Text, Button } from "react-native";

async function signOut() {
  try {
    GoogleSignin.signOut();
    await auth().signOut();
  } catch (error) {
    console.error(error);
  }
}

function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home</Text>
      <Button title="LOGOUT" onPress={() => signOut()}>
        LOGIN
      </Button>
    </View>
  );
}

export default Home;
