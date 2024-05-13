import NavigationBar from '../../components/NavigationBar'
import {SafeAreaView, Text} from "react-native"
import Header from "../../components/Header";

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
