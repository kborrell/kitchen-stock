import React from 'react';
import {SView} from "../../../nativewindTypes";
import StockList from "./StockList";
import {Stock} from "../../../services/types";

const StockOverview = ({ product }) => {

    return (
        <SView className="flex-row h-full">
            <SView className="grow border-r-2 border-zinc-300">
                <StockList name="Oberts" items={product.stocks.filter((item : Stock) => item.isOpen)} />
            </SView>
            <SView className="grow">
                <StockList name="Stock" items={product.stocks.filter((item : Stock) => !item.isOpen)} />
            </SView>
        </SView>
    );
};

export default StockOverview;