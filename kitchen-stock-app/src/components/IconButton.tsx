import React, {useState} from 'react';
import {Pressable} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

const IconButton = ({onPressHandler, name, size, ...props}) => {
    const [isPressed, setIsPressed] = useState(false)

    return (
        <Pressable
            onPress={onPressHandler}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            style={[
                    {
                        justifyContent: "center",
                    },
                    props.buttonStyle ? props.buttonStyle : {},
                ]}
        >
            <AntDesign className="font-theme-light" name={name} size={size} color={isPressed ? "#adadad" : "#000000"} />
        </Pressable>
    );
};

export default IconButton;