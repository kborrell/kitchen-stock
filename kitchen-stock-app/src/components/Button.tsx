import React from 'react';
import {Pressable, Text, StyleSheet} from "react-native";

const Button = ({onPressHandler, children, ...props}) => {

    const getStyle = ({ pressed }) => {

        return [
            {
                backgroundColor: pressed ? "#e8e8e8" : "#ffffff",
            },
            props.buttonStyle ? props.buttonStyle : {},
            styles.button
        ]
    }

    return (
        <Pressable onPress={onPressHandler} style={getStyle}>
            <Text className="font-theme-light">{children}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 6,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default Button;