import React from 'react';
import {SView} from "../../../nativewindTypes";
import StockList from "./StockList";
import {Stock} from "../../../services/types";

const StockOverview = ({ product }) => {

    return (
        <SView className="flex-row h-screen">
            <SView className="w-1/2 border-r-2 border-zinc-300">
                <StockList name="Oberts" items={product.stocks.filter((item : Stock) => item.isOpen)} />
            </SView>
            <SView className="w-1/2">
                <StockList name="Stock" items={product.stocks.filter((item : Stock) => !item.isOpen)} />
            </SView>
        </SView>
    );
};

export default StockOverview;