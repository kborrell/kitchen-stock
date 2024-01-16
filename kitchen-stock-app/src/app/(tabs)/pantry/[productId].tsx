import React from 'react';
import {useLocalSearchParams} from "expo-router";
import {Text} from 'react-native';

const Page = () => {
    const { productId } = useLocalSearchParams()

    return (
        <Text>{productId}</Text>
    );
};

export default Page;