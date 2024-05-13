import {Image, Pressable, Text, View} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {router} from "expo-router";

const ProductListItem = ({ item }) => {
    const pressHandler = () => {
        router.push({pathname:"/pantry/[productId]", params: {"productId": item.id}})
    }

    return (
        <Pressable onPress={pressHandler}>
            <View className="h-16 border rounded-xl border-gray-400 flex-row overflow-hidden my-1 justify-between">
                <View className="flex-row">
                    <View>
                        <Image className="h-16 w-28" source={{uri: "https://images.immediate.co.uk/production/volatile/sites/30/2023/06/Ultraprocessed-food-58d54c3.jpg"}}></Image>
                    </View>
                    <View className="ml-2 justify-center">
                        <Text className="font-theme-regular">{item.name}</Text>
                        <Text className="font-theme-light">{item.category.name}</Text>
                    </View>
                </View>
                <View className="justify-center mr-3">
                    <AntDesign name="right" size={20} color="black" />
                </View>
            </View>
        </Pressable>
    )
}

export default ProductListItem