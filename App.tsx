import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./src/screens/AuthNavigator";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import AddMoney from "./src/screens/AddMoney";
import Profile from "./src/screens/Profile";
import Scanner from "./src/screens/Scanner";
import SendMoney from "./src/screens/SendMoney";

const Stack = createNativeStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add Money"
          component={AddMoney}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Send Money"
          component={SendMoney}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
