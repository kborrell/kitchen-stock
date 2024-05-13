import IconButton from "../../elements/IconButton";
import React from "react";
import Button from "../../elements/Button";
import {Text, View} from "react-native";

const ProductHeader = ({ product, onEditHandler, onRemoveHandler, onAddStockHandler }) => {
    return <View className="mt-4 mx-2 flex-row">
        <View className="shrink basis-2/3 flex-col flex-auto">
            <Text className="font-theme-light text-3xl">{product.name}</Text>
            <View className="bg-zinc-200 self-start rounded-xl justify-center px-2 py-2">
                <Text className="font-theme-regular">{product.category.name}</Text>
            </View>
        </View>
        <View className="basis-1/3 shrink-0 ">
            <View className="flex-row-reverse">
                <IconButton size={22} buttonStyle={{margin: 8}} onPressHandler={onRemoveHandler} name="delete"/>
                <IconButton size={22} buttonStyle={{margin: 8}} onPressHandler={onEditHandler} name="edit"/>
            </View>
            <View>
                <Button onPressHandler={onAddStockHandler}>Afegeix stock</Button>
            </View>
        </View>
    </View>;
}

export default ProductHeader