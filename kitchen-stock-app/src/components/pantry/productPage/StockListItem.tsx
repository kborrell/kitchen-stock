import React from 'react';
import {Pressable, Text, View} from "react-native";
import {router} from "expo-router";
import {Stock} from "../../../services/types";

type StockListItemProps = {
    item: Stock
}

const StockListItem = ({item} : StockListItemProps ) => {
    const editHandler = () => {
        router.push({pathname:"/pantry/[productId]/stocks/[stockId]", params: {"productId": item.productId, "stockId": item.id}})
    }

    return (
        <Pressable onPress={editHandler}>
            <View className="border rounded-md p-2 flex-row my-1">
                <View className="grow flex-col gap-1 justify-center">
                    <Text className="font-theme-medium"> {item.isOpen ? `${item.remaining} restant` : `${item.amount} ${item.format}`}</Text>
                    {
                        item.expireDate ?
                            <Text className="font-theme-regular text-xs">Expira el {new Date(item.expireDate).toLocaleDateString()}</Text>
                            : undefined
                    }
                </View>
            </View>
        </Pressable>
    )
}

export default StockListItem;