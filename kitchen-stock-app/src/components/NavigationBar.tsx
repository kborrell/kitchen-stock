import {Tabs} from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const NavigationBar = () => {
    return (
        <Tabs
            initialRouteName="pantry"
            sceneContainerStyle={{
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderRadius: 20,
                borderColor: "#d1d1d1",
                padding: 20,
                backgroundColor: "#ffffff"
            }}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen name="home" options={
                {
                    tabBarLabel: "Inici",
                    href: "/home",
                    tabBarIcon: ({focused, color, size}) => (<AntDesign name="home" size={size} color={color} />)
                }
            } />
            <Tabs.Screen name="pantry" options={
                {
                    tabBarLabel: "Rebost",
                    href: "/pantry",
                    tabBarIcon: ({focused, color, size}) => (<MaterialCommunityIcons name="fridge" size={size} color={color} />)
                }
            } />
            <Tabs.Screen name="shopping" options={
                {
                    tabBarLabel: "Compra",
                    href: "/shopping",
                    tabBarIcon: ({focused, color, size}) => (<AntDesign name="shoppingcart" size={size} color={color} />)
                }
            } />
            <Tabs.Screen name="account" options={
                {
                    tabBarLabel: "Compte",
                    href: "/account",
                    tabBarIcon: ({focused, color, size}) => (<AntDesign name="user" size={size} color={color} />)
                }
            } />
        </Tabs>
    )
}

export default NavigationBar