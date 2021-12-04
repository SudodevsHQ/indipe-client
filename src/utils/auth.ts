import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();

    // console.log(Buffer.from(idToken).toString("base64"));

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
}

export async function signOut() {
    try {
        GoogleSignin.signOut();
        await auth().signOut();
    } catch (error) {
        console.error(error);
    }
}
