import React from 'react';
import {FlatList, Text, View} from "react-native";
import StockListItem from "./StockListItem";
import {Stock} from "../../../services/types";

type StockListProps = {
    name: string,
    items: Stock[]
}

const StockList = ({name, items} : StockListProps) => {
    return (
        <View>
            <View className="flex-row gap-2 justify-center items-center">
                <Text className="font-theme-light">{name}</Text>
                <Text className="mt-4 font-theme-regular text-3xl">{items.map(item => item.amount).reduce((sum, current) => sum + current, 0)}</Text>
            </View>
            <View className="mx-2">
                <FlatList
                    data={items}
                    renderItem={({item}) => <StockListItem item={item} />}
                />
            </View>
        </View>
    );
};

export default StockList;