import { Slot } from 'expo-router';
import Header from '../components/Header'
import {NativeWindStyleSheet} from "nativewind";
import {SafeAreaView} from "react-native";

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function Layout() {
    return (
        <SafeAreaView>
            <Header />
            <Slot />
        </SafeAreaView>
    );
}
