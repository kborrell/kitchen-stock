import {FlatList, SafeAreaView, Text, View} from "react-native";
import {useGetProductsQuery} from "../../../services/api";
import ProductListItem from "../../../components/pantry/ProductListItem";
import Button from "../../../components/elements/Button";
import {router} from "expo-router";

export default function Page() {
    const { data, error, isLoading } = useGetProductsQuery()

    if (isLoading) return <Text>Loading...</Text>
    if (!data) return <Text>Missing products!</Text>

    const addProductHandler = () => {
        router.push({ pathname:"/pantry/createProduct" })
    }

    const addStockHandler = () => {
        console.log("ADD STOCK")
    }

    return (
    <SafeAreaView className="bg-white">
            <View className="p-3">
                <View>
                    <Text className="font-theme-light text-3xl">El rebost</Text>
                </View>
                <View className="flex-grow flex-row">
                    <Button buttonStyle={{ flex: 1, margin: 10 }} onPressHandler={addProductHandler}>Afegeix Producte</Button>
                    {/*<Button buttonStyle={{ flex: 1, margin: 10  }} onPressHandler={addStockHandler}>Afegeix Stock</Button>*/}
                </View>
                <View className="my-2">
                    <Text className="font-theme-header text-xl">Caduquen aviat</Text>
                    <Text> Coming soon... </Text>
                </View>
                <View className="my-2">
                    <Text className="font-theme-header text-xl">Oberts</Text>
                    <Text> Coming soon... </Text>
                </View>
                <View className="my-2">
                    <View className="flex-row content-center, justify-between">
                        <View>
                            <Text className="font-theme-header text-xl">Productes</Text>
                        </View>
                    </View>
                    <FlatList
                        data={data}
                        renderItem={({item}) => <ProductListItem item={item} />}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}