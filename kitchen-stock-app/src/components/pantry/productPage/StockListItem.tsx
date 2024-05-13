import React from 'react';
import {Pressable, Text, View} from "react-native";
import {router} from "expo-router";
import {Product, Stock} from "../../../services/types";
import IconButton from "../../elements/IconButton";
import {useEditStockMutation, useGetProductsQuery, useOpenStockMutation} from "../../../services/api";
import {addDaysToDate} from "../../../utils";

type StockListItemProps = {
    item: Stock
}

const StockListItem = ({item}: StockListItemProps) => {
    const { product } = useGetProductsQuery(undefined, {
        selectFromResult: ({ data }) => {
            let product = data?.find((product : Product) => product.id === item.productId)

            return {
                product: product
            }
        }
    })

    const [openStock, openStockResult] = useOpenStockMutation()

    const onOpenStock = () => {
        console.log(item)
        openStock({ id: item.id, expireDate: addDaysToDate(new Date(item.expireDate), product.daysToKeep) })
    }

    const onEditStock = () => {
        router.push({
            pathname: "/pantry/[productId]/stocks/[stockId]",
            params: {"productId": item.productId, "stockId": item.id}
        })
    }

    return (
        <View className="border rounded-md p-2 flex-row my-1">
            <View className="grow flex-col gap-1 justify-center">
                <Text
                    className="font-theme-medium"> {`${item.amount} ${item.format}`} {item.remaining ? `- ${item.remaining}` : ''}</Text>
                {
                    item.expireDate ?
                        <Text className="font-theme-regular text-xs">Expira
                            el {new Date(item.expireDate).toLocaleDateString()}</Text>
                        : undefined
                }
            </View>
            <View className="justify-center">
                <IconButton size={22} buttonStyle={{margin: 0}} onPressHandler={onEditStock} name="edit"/>
                {
                    item.isOpen ?
                        undefined
                        : <IconButton size={22} buttonStyle={{marginTop: 10}} onPressHandler={onOpenStock} name="rest"/>
                }

            </View>
        </View>
    )
}

export default StockListItem;