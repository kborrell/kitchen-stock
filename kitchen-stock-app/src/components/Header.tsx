import React from 'react';
import {SText, SView} from "../nativewindTypes";
import {Pressable, View} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from 'expo-router';


const Header = () => {
    return (
        <View>
            <SView className="h-14 flex-row items-center justify-center">
                {
                    router.canGoBack() ? (
                    <SView className="absolute left-3">
                        <Pressable onPress={ () => router.back() }><AntDesign name="left" size={20} /></Pressable>
                    </SView>) : null
                }
                <SText className="font-theme-medium font-bold text-lg">Kitchen Stock</SText>
            </SView>
        </View>
    );
};

export default Header;