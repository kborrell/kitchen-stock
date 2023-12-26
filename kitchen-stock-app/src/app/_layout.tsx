import { Slot } from 'expo-router';
import Header from '../components/Header'
import {NativeWindStyleSheet} from "nativewind";
import {SafeAreaView} from "react-native";
import {Provider} from "react-redux";
import {store} from "../store";

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function Layout() {
    return (
        <Provider store={store}>
            <SafeAreaView>
                <Header />
                <Slot />
            </SafeAreaView>
        </Provider>
    );
}
