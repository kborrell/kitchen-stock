import React from 'react';
import {SText, SView} from "../../../nativewindTypes";
import IconButton from "../../elements/IconButton";
import {Pressable} from "react-native";
import {router} from "expo-router";
import {Stock} from "../../../services/types";

const StockListItem = ({item} : { item: Stock} ) => {
    const editHandler = () => {
        router.push({pathname:"/pantry/[productId]/stocks/[stockId]", params: {"productId": item.productId, "stockId": item.id}})
    }

    return (
        <Pressable onPress={editHandler}>
            <SView className="border rounded-md p-2 flex-row my-1">
                <SView className="grow flex-col gap-1 justify-center">
                    <SText className="font-theme-medium">{item.format} {item.isOpen ? `- ${item.remaining} restant` : ""}</SText>
                    {
                        item.expires ?
                            <SText className="font-theme-regular text-xs">Expira el {new Date(item.expireDate).toLocaleDateString()}</SText>
                            : undefined
                    }
                </SView>
            </SView>
        </Pressable>
    )
}

export default StockListItem;