import {SText, SView} from "../../../nativewindTypes";
import IconButton from "../../elements/IconButton";
import React from "react";
import Button from "../../elements/Button";

const ProductHeader = ({ product, onEditHandler, onRemoveHandler, onAddStockHandler }) => {
    return <SView className="mt-4 mx-2 flex-row">
        <SView className="shrink basis-2/3 flex-col flex-auto">
            <SText className="font-theme-light text-3xl">{product.name}</SText>
            <SView className="bg-zinc-200 self-start rounded-xl justify-center px-2 py-2">
                <SText className="font-theme-regular">{product.category.name}</SText>
            </SView>
        </SView>
        <SView className="basis-1/3 shrink-0 ">
            <SView className="flex-row-reverse">
                <IconButton size={22} buttonStyle={{margin: 8}} onPressHandler={onRemoveHandler} name="delete"/>
                <IconButton size={22} buttonStyle={{margin: 8}} onPressHandler={onEditHandler} name="edit"/>
            </SView>
            <SView>
                <Button onPressHandler={onAddStockHandler}>Afegeix stock</Button>
            </SView>
        </SView>
    </SView>;
}

export default ProductHeader