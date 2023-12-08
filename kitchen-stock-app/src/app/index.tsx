import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import {SText} from "../nativewindTypes";

export default function Page() {
    return (
        <View>
            <SText className="font-bold">Open up App.js to start working on your app!</SText>
            <StatusBar style="auto" />
        </View>
    );
}