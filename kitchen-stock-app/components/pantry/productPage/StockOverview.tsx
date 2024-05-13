import React from 'react';
import StockList from "./StockList";
import {Product, Stock} from "../../../services/types";
import {View} from "react-native";

type StockOverviewProps = {
    product: Product
}

const StockOverview = ({ product }: StockOverviewProps) => {
    return (
        <View className="flex-row h-screen">
            <View className="w-1/2 border-r-2 border-zinc-300">
                <StockList name="Oberts" items={product.stocks.filter((item : Stock) => item.isOpen)} />
            </View>
            <View className="w-1/2">
                <StockList name="Stock" items={product.stocks.filter((item : Stock) => !item.isOpen)} />
            </View>
        </View>
    );
};

export default StockOverview;