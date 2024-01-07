import React from 'react';
import {SText, SView} from "../nativewindTypes";

const Header = () => {
    return (
        <SView className="h-14 flex items-center justify-center">
            <SText className="font-theme-medium font-bold text-lg">Kitchen Stock</SText>
        </SView>
    );
};

export default Header;