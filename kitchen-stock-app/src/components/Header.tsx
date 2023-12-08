import {SText, SView} from "../nativewindTypes";
import {Link} from "expo-router";

const Header = () => {
    return (
        <SView className="bg-blue-400">
            <Link href="/products">Products</Link>
            <Link href="/addProduct">Add</Link>
        </SView>
    )
}

export default Header