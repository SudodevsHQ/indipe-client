import * as React from "react";
import { View, StyleSheet } from "react-native";
import ProfileAvatar from "../components/ProfileAvatar";
import MoneyInfo from "../components/MoneyInfo";
import UpiInfo from "../components/UpiInfo";
import GetStartedIllustration from "../components/GetStartedIllustration";
import FooterButtons from "../components/FooterButton";

function Home() {
  return (
    <View style={styles.pageStyles}>
      <View style={styles.header}>
        <MoneyInfo />
        <ProfileAvatar />
      </View>

      <UpiInfo />

      <GetStartedIllustration />

      <FooterButtons />

      {/* <Button title="LOGOUT" onPress={() => signOut()}>
        LOGIN
      </Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  pageStyles: {
    backgroundColor: "white",
    flex: 1,
    padding: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Home;
