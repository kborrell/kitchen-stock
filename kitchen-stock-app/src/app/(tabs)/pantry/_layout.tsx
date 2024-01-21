import {Stack} from "expo-router";

const PantryLayout = () => {
    return (
        <Stack
            screenOptions={{
                presentation: 'modal'
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="[productId]"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    )
}

export default PantryLayout