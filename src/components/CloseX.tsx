import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { themes } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const CloseX = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ paddingLeft: 4, paddingVertical: 4 }}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="close-outline" size={32} color={themes.light.titleText} />
    </TouchableOpacity>
  );
};

export default CloseX;
