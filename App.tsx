import * as React from 'react';

import AuthNavigator from './src/screens/AuthNavigator';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';

function App() {
    const [fontsLoaded] = useFonts({
        DMSans_400Regular,
        DMSans_500Medium,
        DMSans_700Bold,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return <AuthNavigator />;
    }
}

export default App;
