import React from 'react';
import {SText, SView} from "../../../nativewindTypes";
import {Pressable} from "react-native";
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
            <SView className="border rounded-md p-2 flex-row my-1">
                <SView className="grow flex-col gap-1 justify-center">
                    <SText className="font-theme-medium"> {item.isOpen ? `${item.remaining} restant` : `${item.amount} ${item.format}`}</SText>
                    {
                        item.expireDate ?
                            <SText className="font-theme-regular text-xs">Expira el {new Date(item.expireDate).toLocaleDateString()}</SText>
                            : undefined
                    }
                </SView>
            </SView>
        </Pressable>
    )
}

export default StockListItem;