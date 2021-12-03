import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { themes } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

const ProfileAvatar = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.circularButton}
      onPress={() => navigation.navigate("Profile")}
    >
      <Image
        style={styles.avatar}
        source={{
          uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAY1BMVEUAAAD39/f////i4uL7+/tLS0vp6enu7u6Li4vx8fGjo6M4ODiPj4/X19eXl5eAgIAPDw++vr4aGhoVFRUgICDGxsaurq5nZ2diYmJWVlbMzMx5eXk/Pz8pKSkzMzO4uLhxcXGPXEJRAAAEE0lEQVRoge2a2baiMBBFK6EEZXREQUX//yubIGAIlRAg9uqHPk9XJeybqVJDgP0FwX/IbyCIXAix/8MxRLw2yeNrtIdG++ga54kguYIgxyTdAKFHmqANZxJSE7ITRWj7lJWMr4MgD8KHnvBRFAYT3TFCeBAbOvHVaesbe2OAIE9tCB/FaMBoIcgve3tGrYN+zHQQHtxmIWoV2jHTQOZ2o+vMHAiPFyBqbekhoyDIZg9VpxujKAQEg8mtoVcVEJQxBIPncgbA2R9TRhAMjmsY9c4cU1QIsvM6BsBxp1JGkBXz0SmagPD3egbAlZsgPHTBAEi5HoKJGwZAiVoIW7V4ZZ13OgjfumIAZJyGuBssoQRJCHewer+qOAXhB5cMgJxTEGez/tERxxCeu2XIXekhLuzJUBWqECxdMwAuqEDcGK2hbnwIQd89A6A7WeBX0y4U8iFksetgUjHsye4XDIDWq/hA8PIbyEGGLHXmptTa4hZCBlLrFQ0gv2EASMOFnvjidF7iZOt1PHanygfSWPljmvieRvpXXTQt/CSMAF4SpHVSzrHPaX3n7CG6+/34ZHQDJhDddmwg0uG+RbLN11USwXb0tQ9vmhG2vm4mQd5y/6lG2P98qAPJ4jt8CfV0UnU/XyVIIY/ynWrXnwSe+LTrguKUelaKZzcSZLhNNtQ4e/GmccWD5pM4qvePe0kx7mADgQ09Mbsyj9vBTLK01CySO9hBdNNpo6E3bYIAOQ42UnbURjfxQo+lkEwPeauQzyKaL1RecyM3Y6fDMojqKkibEcexT74MovrsqQQZu8EvNxDZQI6tLGlcpqX6CpKpJw6tZjsivSlJYZMNVTfD4IxXN8rp1qcMzkUWJloaenl87e0hbKLBa4bH72QgV4SEFWH51dxq4EhYuURXxax798kmL3m4LJ27ayD1Ipt+fujcMbRzU/f9ovNsUjDFQoe73aR2gbLicNuHDo29MXgvspTQgfGJdSK1rNdtNP0YjIOgGS53wW2T0gc1nJsRmHrMztOsulcvCbGzl91z4TjEZmibFzzbTd+eSBYwbvkP2opMezBeTbe015NM4DhORZV0KoqprsYa3TVJtVqrc8KdToPc8DDR6SzBchmkU5WU7YwCk0mmlO0cE2bSzZh8rkfMzvYZVSnvHEN2K4sO9VYflVDGpQ3fqrRoYHiTpQ1BWbWQT2MGXW5aYV+eRCFIUzgbxSu2KkYFGh2kdjgXZu0z+iaArpi5KN39mlXMFGXZ2UM2uywrhmzmIfaaX2AWncEZM7M13S8wF/39rZ1jknlLi/5MjJkfTm6aKvXXXF9oMKw0hgjvkk1e+LC6UsLKmDTOVWxBsIM0HI5lnhW9VTsX27xEh5djOlAbq37v+Vg3/ccuLP2H1PoDTvMvaFYIBb4AAAAASUVORK5CYII=",
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circularButton: {
    borderRadius: 60,
  },
  avatar: {
    borderRadius: 60,
    resizeMode: "cover",
    width: 60,
    height: 60,
  },
});

export default ProfileAvatar;
