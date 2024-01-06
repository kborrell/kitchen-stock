import {SView} from "../nativewindTypes";
import {Link} from "expo-router";

const Header = () => {
    return (
        <SView className="bg-blue-400 flex flex-row space-x-2 py-4">
            <Link href="/" className="flex-1 text-center">Inici</Link>
            <Link href="/products" className="flex-1 text-center">Productes</Link>
            <Link href="/addProduct" className="flex-1 text-center">Afegeix</Link>
        </SView>
    )
}

export default Header