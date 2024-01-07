import {SText} from "../nativewindTypes";

const ProductListItem = ({ item }) => {
    return (
        <SText className="font-theme-regular">{item.name}</SText>
    )
}

export default ProductListItem