import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RazorpayCheckout from "react-native-razorpay";

import { themes } from "../constants/colors";
import { pageStyles } from "./Home";
import { hugeText, mutedTextStyle } from "../components/MoneyInfo";
import { TextInput } from "react-native-gesture-handler";
import { GenericButton } from "../components/FooterButton";
import CloseX from "../components/CloseX";
import CurrencySelect, { TCurrencyProps } from "../components/CurrencySelect";
import { RAZORPAY_API_KEY } from "../../keys";

const AddMoney = () => {
  const [amount, onChangeAmount] = React.useState("");
  const [currencyData, setCurrencyData] = React.useState<TCurrencyProps>(null);

  const handleMoneyValueChange = (value) => {
    // add validation
    if (value.length < 6) {
      onChangeAmount(value);
    }
  };

  console.log(currencyData);

  const handleDonePress = () => {
    const options = {
      description: "Wallet credit",
      image: "https://i.imgur.com/3g7nmJC.png",
      currency: currencyData?.currencyCode ?? "USD",
      key: RAZORPAY_API_KEY, // Your api key
      amount: parseFloat(amount) * 100,
      name: "Test",
      prefill: {
        email: "void@razorpay.com",
        contact: "9191919191",
        name: "Razorpay Software",
      },
      theme: { color: themes.light.auxiliaryBackgroundColor },
    };

    console.log("----- OPTIONS", options);

    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // handle failure
        console.log(error);
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <View style={styles.pageStyles}>
      <View style={styles.header}>
        <Text style={hugeText}>Add Money</Text>

        <CloseX />
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.inputContainer}>
          <Text style={hugeText}>{currencyData?.symbol ?? "$"}</Text>

          <TextInput
            style={styles.input}
            onChangeText={handleMoneyValueChange}
            value={amount}
            placeholder="0"
            keyboardType="decimal-pad"
            autoFocus
            textAlign="center"
          />
        </View>
        <CurrencySelect onCurrencyChange={(c) => setCurrencyData(c)} />
      </View>

      <View style={styles.taxes}>
        <Text style={mutedTextStyle}>Some charges here</Text>
      </View>

      <View style={styles.row}>
        <View>
          <Text style={styles.totalPayableText}>
            {currencyData?.symbol ?? "$"} {amount === "" ? 0 : amount}
          </Text>

          <Text style={mutedTextStyle}>(Total Payable)</Text>
        </View>

        {amount.length > 0 ? (
          <GenericButton
            onPress={handleDonePress}
            text=""
            type="primary"
            customStyles={{ width: "15%" }}
            icon={
              <Ionicons
                name="checkmark-sharp"
                size={20}
                color={themes.light.buttonText}
              />
            }
          />
        ) : null}
      </View>
    </View>
  );
};

export const semiHugeText = {
  fontFamily: "DMSans_700Bold",
  fontSize: 24,
};

const styles = StyleSheet.create({
  pageStyles: { ...pageStyles },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hugeText: hugeText,
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },

  input: {
    backgroundColor: "#F8F8F8",
    minWidth: "25%",

    margin: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    includeFontPadding: false,
    borderRadius: 10,

    ...hugeText,
  },
  taxes: {
    marginBottom: 12,
  },

  totalPayableText: semiHugeText,
});

export default AddMoney;
