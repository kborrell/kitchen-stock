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
                name="[productId]/index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="[productId]/editProduct"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="[productId]/addStock"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="[productId]/stocks/[stockId]"
                options={{
                    headerShown: false
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