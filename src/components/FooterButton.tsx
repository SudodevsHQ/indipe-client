import Ionicons from "@expo/vector-icons/build/Ionicons";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { themes } from "../constants/colors";

const FooterButtons = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.ctaButton,
          { backgroundColor: themes.light.buttonBackground[0] },
        ]}
      >
        <Ionicons
          name="scan-circle"
          size={25}
          color={themes.light.buttonText}
          style={{ marginRight: 6 }}
        />

        <Text style={styles.buttonText}>Scan & Pay</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.ctaButton,
          { backgroundColor: themes.light.buttonBackground[1] },
        ]}
      >
        <Text style={styles.buttonText}>Recieve Money</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 8,
    width: "48%",
  },
  buttonText: {
    color: themes.light.buttonText,
    fontFamily: "DMSans_500Medium",
    fontSize: 16,
  },
});

export default FooterButtons;
