import React from 'react';
import {useLocalSearchParams} from "expo-router";
import {Product, Stock} from "../../../../../services/types";
import {useGetProductsQuery} from "../../../../../services/api";
import {SText, SView} from "../../../../../nativewindTypes";
import AddStockForm from "../../../../../components/AddStockForm";
import * as yup from "yup";
import {Formik} from "formik";
import {Alert, Pressable} from "react-native";

const Page = () => {
    const { productId, stockId } = useLocalSearchParams()
    const { stock } = useGetProductsQuery(undefined, {
        selectFromResult: ({ data }) => {
            let product = data?.find((product : Product) => product.id === productId)
            let stock = product?.stocks.find((stock : Stock) => stock.id === stockId)

            return {
                stock: stock
            }
        }
    })

    // TODO: Extract into common class
    const validationSchema = yup.object().shape({
        format: yup
            .string()
            .required('El format és obligatòri'),
        expires: yup
            .boolean(),
        expireDate: yup
            .date()
            .when("expires", {
                is: true,
                then: (schema) => schema.required("La data d'expiració és obligatòria")
            }),
        isOpen: yup
            .boolean(),
        remaining: yup
            .string()
    })

    const initialValues = {
        ...stock,
        expireDate: new Date(stock.expireDate)
    }

    console.log("VALUES:", initialValues)

    const askRemoveStockHandler = () => {
        Alert.alert(
            "Segur que vols eliminar aquest stock?",
            "",
            [
                {
                    text: "No",
                    onPress: () => console.log("Remove cancelled!"),
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => console.log("Remove confirmed!"),
                    style: "destructive",
                }
            ]
        )
    }

    // TODO: Edit stock only if something changed
    const saveStockHandler = () => {

    }

    return (
        <SView>
            <Formik initialValues={initialValues} onSubmit={saveStockHandler} validationSchema={validationSchema}>
                {({ handleSubmit }) => <AddStockForm onSubmit={handleSubmit} />}
            </Formik>
            <Pressable onPress={askRemoveStockHandler}>
                <SText>Elimina el stock</SText>
            </Pressable>
        </SView>
    );
};

export default Page;