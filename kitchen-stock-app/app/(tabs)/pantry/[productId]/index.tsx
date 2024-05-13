import React from 'react';
import {router, useLocalSearchParams} from "expo-router";
import {Image, View} from 'react-native';
import {useGetProductsQuery} from "../../../../services/api";
import ProductHeader from "../../../../components/pantry/productPage/ProductHeader";
import StockOverview from "../../../../components/pantry/productPage/StockOverview";

const Page = () => {
    const { productId } = useLocalSearchParams()
    const { product } = useGetProductsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            product: data?.find((product) => product.id === productId)
        })
    })

    const addStockHandler = () => {
        router.push({pathname:"/pantry/[productId]/addStock", params: {"productId": productId}})
    }

    return (
        <View>
            <View className="h-40 shadow-sm shadow-gray-900 bg-white">
                <Image className="flex-1"
                       source={{uri: "https://images.immediate.co.uk/production/volatile/sites/30/2023/06/Ultraprocessed-food-58d54c3.jpg"}}></Image>
            </View>
            <View className="mt-1">
                <ProductHeader product={product}
                               onEditHandler={() => console.log("edit")}
                               onRemoveHandler={() => console.log("remove")}
                               onAddStockHandler={addStockHandler}
                />
            </View>
            <View className="mt-4">
                <StockOverview product={product}/>
            </View>
        </View>
    );
};

export default Page;