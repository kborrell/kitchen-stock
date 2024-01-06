import {FlatList, Text, View} from "react-native";
import {useGetProductsQuery} from "../services/api";
import ProductListItem from "../components/ProductListItem";

export default function Page() {
    const { data, error, isLoading } = useGetProductsQuery()

    if (isLoading) return <Text>Loading...</Text>
    if (!data) return <Text>Missing products!</Text>

    return (
        <View>
            <FlatList
                data={data}
                renderItem={({item}) => <ProductListItem item={item} />}
            />
        </View>
    )
}