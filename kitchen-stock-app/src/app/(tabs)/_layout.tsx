import NavigationBar from '../../components/NavigationBar'
import {NativeWindStyleSheet} from "nativewind";
import {Provider} from "react-redux";
import {store} from "../../store";

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function Layout() {
    return (
        <Provider store={store}>
            <NavigationBar />
        </Provider>
    );
}
