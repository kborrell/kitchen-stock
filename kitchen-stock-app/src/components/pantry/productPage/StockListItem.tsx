import React from 'react';
import {SText, SView} from "../../../nativewindTypes";
import IconButton from "../../elements/IconButton";

const StockListItem = ({item}) => {

    const editHandler = () => {

    }

    const removeHandler = () => {

    }

    return (
        <SView className="border rounded-md p-2 flex-row my-1">
            <SView className="grow flex-col gap-1 justify-center">
                <SText className="font-theme-medium">{item.format} {item.isOpened ? `- ${item.remaining} restant` : ""}</SText>
                {
                    item.expires ?
                        <SText className="font-theme-regular text-xs">Expira el {item.expireDate}</SText>
                        : undefined
                }
            </SView>
            <SView className="justify-end grow-0">
                <IconButton size={18} buttonStyle={{margin: 3}} onPressHandler={editHandler} name="edit"/>
                <IconButton size={18} buttonStyle={{margin: 3}} onPressHandler={removeHandler} name="delete"/>
            </SView>
        </SView>
    )
}

export default StockListItem;