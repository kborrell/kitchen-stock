import React from 'react';
import {SView} from "../../../nativewindTypes";
import StockList from "./StockList";

const StockOverview = () => {
    const stockItems = [
        {format: "Brick 250ml", expireDate:"02/12/24", isOpened:true, expires: true, remaining: "25%"},
        {format: "Brick 250ml", expireDate:"02/12/24", isOpened:false, expires: true, remaining: "100%"},
        {format: "Brick 1L", expireDate:"02/12/24", isOpened:false, expires: false, remaining: "100%"}
    ]

    return (
        <SView className="flex-row h-full">
            <SView className="grow border-r-2 border-zinc-300">
                <StockList name="Oberts" items={stockItems.filter(item => item.isOpened)} />
            </SView>
            <SView className="grow">
                <StockList name="Stock" items={stockItems.filter(item => !item.isOpened)} />
            </SView>
        </SView>
    );
};

export default StockOverview;