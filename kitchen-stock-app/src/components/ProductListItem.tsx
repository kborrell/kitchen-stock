import {Text} from "react-native";

const ProductListItem = ({ item }) => {
    return (
        <Text>{item.name}</Text>
    )
}

export default ProductListItem