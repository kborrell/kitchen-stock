import React from 'react';
import {Pressable, Text, View} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from 'expo-router';


const Header = () => {
    return (
        <View>
            <View className="h-14 flex-row items-center justify-center">
                {
                    router.canGoBack() ? (
                    <View className="absolute left-3">
                        <Pressable onPress={ () => router.back() }><AntDesign name="left" size={20} /></Pressable>
                    </View>) : null
                }
                <Text className="font-theme-medium font-bold text-lg">Kitchen Stock</Text>
            </View>
        </View>
    );
};

export default Header;