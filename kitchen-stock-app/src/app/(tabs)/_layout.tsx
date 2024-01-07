import NavigationBar from '../../components/NavigationBar'
import {NativeWindStyleSheet} from "nativewind";
import {Provider} from "react-redux";
import {store} from "../../store";
import {SafeAreaView, Text} from "react-native"
import Header from "../../components/Header";
import {SView} from "../../nativewindTypes";

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function Layout() {
    return (
        <>
            <SafeAreaView>
                <Header />
            </SafeAreaView>
            <NavigationBar />
        </>
    );
}
