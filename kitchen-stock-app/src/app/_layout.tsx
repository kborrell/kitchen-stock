import {Stack} from "expo-router";
import {store} from "../store";
import {Provider} from "react-redux";
import {Poppins_300Light, Poppins_400Regular, Poppins_500Medium, useFonts} from "@expo-google-fonts/poppins";

const StackLayout = () => {
    const [fontsLoaded, fontError] = useFonts({
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_500Medium
    })

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{
                      headerShown: false
                    }}
                />
            </Stack>
        </Provider>
    )
}

export default StackLayout