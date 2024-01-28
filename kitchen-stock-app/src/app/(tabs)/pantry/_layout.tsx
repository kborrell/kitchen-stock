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
            <Stack.Screen
                name="createProduct"
                options={{
                    headerShown: false,
                    presentation: 'card'
                }}
            />
        </Stack>
    )
}

export default PantryLayout