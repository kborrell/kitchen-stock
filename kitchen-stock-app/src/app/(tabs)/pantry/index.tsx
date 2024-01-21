import {FlatList, SafeAreaView, Text} from "react-native";
import {useGetProductsQuery} from "../../../services/api";
import ProductListItem from "../../../components/pantry/ProductListItem";
import {SText, SView} from "../../../nativewindTypes";
import Button from "../../../components/elements/Button";
import IconButton from "../../../components/elements/IconButton";

export default function Page() {
    const { data, error, isLoading } = useGetProductsQuery()

    if (isLoading) return <Text>Loading...</Text>
    if (!data) return <Text>Missing products!</Text>

    const addProductHandler = () => {
        console.log("ADD PRODUCT")
    }

    const addStockHandler = () => {
        console.log("ADD STOCK")
    }

    return (
        <SafeAreaView className="bg-white">
            <SView className="p-3">
                <SView>
                    <SText className="font-theme-light text-3xl">El rebost</SText>
                </SView>
                <SView className="flex-grow flex-row">
                    <Button buttonStyle={{ flex: 1, margin: 10 }} onPressHandler={addProductHandler}>Afegeix Producte</Button>
                    <Button buttonStyle={{ flex: 1, margin: 10  }} onPressHandler={addStockHandler}>Afegeix Stock</Button>
                </SView>
                <SView className="my-2">
                    <SText className="font-theme-header text-xl">Caduquen aviat</SText>
                    <SText> Coming soon... </SText>
                </SView>
                <SView className="my-2">
                    <SText className="font-theme-header text-xl">Oberts</SText>
                    <SText> Coming soon... </SText>
                </SView>
                <SView className="my-2">
                    <SView className="flex-row content-center, justify-between">
                        <SView>
                            <SText className="font-theme-header text-xl">Productes</SText>
                        </SView>
                    </SView>
                    <FlatList
                        data={data}
                        renderItem={({item}) => <ProductListItem item={item} />}
                    />
                </SView>
            </SView>
        </SafeAreaView>
    )
}