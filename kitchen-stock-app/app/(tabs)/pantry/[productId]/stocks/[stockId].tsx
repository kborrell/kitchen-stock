import React from 'react';
import {router, useLocalSearchParams} from "expo-router";
import {Product, Stock} from "../../../../../services/types";
import {useEditStockMutation, useGetProductsQuery, useRemoveStockMutation} from "../../../../../services/api";
import AddStockForm from "../../../../../components/AddStockForm";
import * as yup from "yup";
import {Formik} from "formik";
import {Alert, Pressable, Text, View} from "react-native";

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

    const [editStock, editResult] = useEditStockMutation()
    const [removeStock, deleteResult] = useRemoveStockMutation()

    // TODO: Extract into common class
    const validationSchema = yup.object().shape({
        format: yup
            .string()
            .required('El format és obligatòri'),
        amount: yup
            .number()
            .moreThan(0, "La quantitat ha de ser major de 0")
            .required("La quantitat es obligatòria"),
        expireDate: yup
            .date(),
    })

    const initialValues = {
        ...stock,
        expireDate: new Date(stock.expireDate)
    }

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
                    onPress: () => {
                        removeStock(stock.id)
                        router.back()
                    },
                    style: "destructive",
                }
            ]
        )
    }

    // TODO: Edit stock only if something changed
    const saveStockHandler = (values) => {
        const updateStock = {
            ...stock,
            ...values
        }

        editStock(updateStock)
        router.back()
    }

    return (
        <View>
            <Formik initialValues={initialValues} onSubmit={saveStockHandler} validationSchema={validationSchema}>
                {({ handleSubmit }) => <AddStockForm onSubmit={handleSubmit} />}
            </Formik>
            <Pressable onPress={askRemoveStockHandler}>
                <Text>Elimina el stock</Text>
            </Pressable>
        </View>
    );
};

export default Page;