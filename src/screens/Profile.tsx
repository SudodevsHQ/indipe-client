import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MoneyInfo, { hugeText } from "../components/MoneyInfo";
import ProfileAvatar from "../components/ProfileAvatar";
import UpiInfo from "../components/UpiInfo";
import { semiHugeText } from "./AddMoney";
import { pageStyles } from "./Home";

const Profile = () => {
  return (
    <View style={styles.pageStyles}>
      <View style={styles.header}>
        <Text style={semiHugeText}>Hi, Gabe Itch</Text>
        <ProfileAvatar />
      </View>

      <View style={{ flexDirection: "row" }}>
        <MoneyInfo showTransferButton />
      </View>
      <UpiInfo />
    </View>
  );
};

const styles = StyleSheet.create({
  pageStyles: pageStyles,
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Profile;
