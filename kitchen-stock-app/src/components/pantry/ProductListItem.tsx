import {SText, SView} from "../../nativewindTypes";
import {Image, Pressable} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {router} from "expo-router";

const ProductListItem = ({ item }) => {
    const pressHandler = () => {
        router.push({pathname:"/pantry/[productId]", params: {"productId": item.id}})
    }

    return (
        <Pressable onPress={pressHandler}>
            <SView className="h-16 border rounded-xl border-gray-400 flex-row overflow-hidden my-1 justify-between">
                <SView className="flex-row">
                    <SView>
                        <Image className="h-16 w-28" source={{uri: "https://images.immediate.co.uk/production/volatile/sites/30/2023/06/Ultraprocessed-food-58d54c3.jpg"}}></Image>
                    </SView>
                    <SView className="ml-2 justify-center">
                        <SText className="font-theme-regular">{item.name}</SText>
                        <SText className="font-theme-light">{item.category.name}</SText>
                    </SView>
                </SView>
                <SView className="justify-center mr-3">
                    <AntDesign name="right" size={20} color="black" />
                </SView>
            </SView>
        </Pressable>
    )
}

export default ProductListItem