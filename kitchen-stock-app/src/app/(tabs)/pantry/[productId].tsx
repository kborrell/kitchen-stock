import React from 'react';
import {useLocalSearchParams} from "expo-router";
import {Image, Pressable} from 'react-native';
import {useGetProductsQuery} from "../../../services/api";
import {SText, SView} from "../../../nativewindTypes";
import ProductHeader from "../../../components/pantry/productPage/ProductHeader";
import StockOverview from "../../../components/pantry/productPage/StockOverview";
import Button from "../../../components/elements/Button";

const Page = () => {
    const { productId } = useLocalSearchParams()
    const { product } = useGetProductsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            product: data?.find((product) => product.id === productId)
        })
    })

    const addStockHandler = () => {
        console.log("Add Stock")
    }

    return (
        <SView>
            <SView className="h-40 shadow-sm shadow-gray-900 bg-white">
                <Image className="flex-1"
                       source={{uri: "https://images.immediate.co.uk/production/volatile/sites/30/2023/06/Ultraprocessed-food-58d54c3.jpg"}}></Image>
            </SView>
            <SView className="mt-1">
                <ProductHeader product={product}
                               onEditHandler={() => console.log("edit")}
                               onRemoveHandler={() => console.log("remove")}
                               onAddStockHandler={addStockHandler}
                />
            </SView>
            <SView className="mt-4">
                <StockOverview />
            </SView>
        </SView>
    );
};

export default Page;