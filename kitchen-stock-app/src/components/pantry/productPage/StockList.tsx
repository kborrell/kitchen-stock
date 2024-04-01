import React from 'react';
import {SText, SView} from "../../../nativewindTypes";
import {FlatList} from "react-native";
import StockListItem from "./StockListItem";
import {Stock} from "../../../services/types";

type StockListProps = {
    name: string,
    items: Stock[]
}

const StockList = ({name, items} : StockListProps) => {
    return (
        <SView>
            <SView className="flex-row gap-2 justify-center items-center">
                <SText className="font-theme-light">{name}</SText>
                <SText className="mt-4 font-theme-regular text-3xl">{items.map(item => item.amount).reduce((sum, current) => sum + current, 0)}</SText>
            </SView>
            <SView className="mx-2">
                <FlatList
                    data={items}
                    renderItem={({item}) => <StockListItem item={item} />}
                />
            </SView>
        </SView>
    );
};

export default StockList;