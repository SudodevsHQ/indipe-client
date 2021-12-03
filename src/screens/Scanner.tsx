import React, { Component } from "react";

import { StyleSheet, Text, Linking, View } from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import CloseX from "../components/CloseX";
import { themes } from "../constants/colors";
import { useNavigation } from "@react-navigation/core";

const Scanner = () => {
  const navigation = useNavigation();

  const onSuccess = (e) => {
    const [, upiAddress, name] = e.data.match(/pa=(.*?)&pn=(.*?)&/) ?? [];

    navigation.navigate("Send Money", {
      upiAddress: upiAddress,
      receiverName: name,
    });
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.auto}
      topContent={<Text style={styles.centerText}>Scan a QR code to pay</Text>}
      bottomContent={
        <View style={styles.bottomContent}>
          <CloseX />
        </View>
      }
      bottomViewStyle={{ backgroundColor: themes.light.backgroundColor }}
      topViewStyle={{ backgroundColor: themes.light.backgroundColor }}
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    fontFamily: "DMSans_500Medium",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonTouchable: {
    padding: 16,
  },
  bottomContent: {
    flexDirection: "row",
    // position: "absolute",
    // bottom: "10%",
  },
});

export default Scanner;
