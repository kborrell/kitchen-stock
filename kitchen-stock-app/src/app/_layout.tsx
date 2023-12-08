import { Slot } from 'expo-router';
import Header from '../components/Header'
import {NativeWindStyleSheet} from "nativewind";

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function Layout() {
    return (
        <>
            <Header />
            <Slot />
        </>
    );
}
