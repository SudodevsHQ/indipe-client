import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { themes } from "../constants/colors";
import { pageStyles } from "./Home";
import { hugeText, mutedTextStyle } from "../components/MoneyInfo";
import { useNavigation } from "@react-navigation/core";
import { TextInput } from "react-native-gesture-handler";
import { GenericButton } from "../components/FooterButton";

const AddMoney = () => {
  const navigation = useNavigation();
  const [number, onChangeNumber] = React.useState("");

  const handleMoneyValueChange = (value) => {
    // add validation
    if (value.length < 6) {
      onChangeNumber(value);
    }
  };

  return (
    <View style={styles.pageStyles}>
      <View style={styles.header}>
        <Text style={hugeText}>Add Money</Text>

        <TouchableOpacity
          style={{ paddingLeft: 4, paddingVertical: 4 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="close-outline"
            size={32}
            color={themes.light.titleText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={hugeText}>$</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleMoneyValueChange}
          value={number}
          placeholder="0"
          keyboardType="decimal-pad"
          autoFocus
          textAlign="center"
          //   caretHidden
        />
      </View>
      <View style={styles.taxes}>
        <Text style={mutedTextStyle}>Some charges here</Text>
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.totalPayableText}>
            $ {number === "" ? 0 : number}
          </Text>
          <Text style={mutedTextStyle}>(Total Payable)</Text>
        </View>

        <GenericButton
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
    flex: 1,
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
