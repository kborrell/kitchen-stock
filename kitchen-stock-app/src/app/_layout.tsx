import {Stack} from "expo-router";
import {store} from "../store";
import {Provider} from "react-redux";
import {Poppins_300Light, Poppins_400Regular, Poppins_500Medium, useFonts} from "@expo-google-fonts/poppins";
import {Roboto_700Bold} from '@expo-google-fonts/roboto'
import {
    ThemeProvider,
    DefaultTheme,
} from "@react-navigation/native";

const StackLayout = () => {
    const AppTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'rgb(255,255,255)',
        },
    };

    const [fontsLoaded, fontError] = useFonts({
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_500Medium,
        Roboto_700Bold
    })

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <ThemeProvider value={AppTheme}>
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
        </ThemeProvider>
    )
}

export default StackLayout