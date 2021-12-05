import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export async function onGoogleButtonPress() {
    try {
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        return auth().signInWithCredential(googleCredential);
    } catch (error) {
        if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            Alert.alert('Install Google Play Services to use the app');
        }
    }

    // console.log(Buffer.from(idToken).toString("base64"));
}

export async function signOut() {
    try {
        GoogleSignin.signOut();
        await auth().signOut();
    } catch (error) {
        console.error(error);
    }
}
