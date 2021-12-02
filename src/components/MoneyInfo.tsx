import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { themes } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const MoneyInfo = () => {
  console.log("hrer");
  return (
    <View style={styles.container}>
      <Text style={styles.subText}>Balance</Text>

      <View style={styles.row}>
        <Text style={styles.hugeText}>₹ 0.00</Text>

        <Text style={styles.subText}>$ 0.00</Text>
      </View>

      <TouchableOpacity style={[styles.borderBtn, styles.row]}>
        <Ionicons name="add-circle" size={20} color={themes.light.titleText} />
        <Text style={styles.subText}>Add Money</Text>
      </TouchableOpacity>
    </View>
  );
};

export const mutedTextStyle = {
  fontFamily: "DMSans_400Regular",
  color: themes.light.subText,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  subText: mutedTextStyle,

  hugeText: {
    fontSize: 36,
    color: themes.light.titleText,
    fontFamily: "DMSans_700Bold",
    marginRight: 10,
  },

  borderBtn: {
    padding: 6,
    marginTop: 4,
    backgroundColor: "white",
    borderColor: themes.light.titleText,
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default MoneyInfo;
