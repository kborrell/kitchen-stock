import {Formik} from "formik";
import CreateProductForm from "../../../../components/CreateProductForm";
import * as yup from 'yup';
import {router, useLocalSearchParams} from "expo-router";
import {useCreateProductMutation, useEditProductMutation, useGetProductsQuery} from "../../../../services/api";

export default function Page() {
    const { productId } = useLocalSearchParams()
    const { product } = useGetProductsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            product: data?.find((product) => product.id === productId)
        })
    })

    const [editProduct, result] = useEditProductMutation()

    const initialValues = {
        name: product.name,
        categoryId: product.category.id,
        trackOpen: product.trackOpen,
        expires: product.expires,
        daysToKeep: product.daysToKeep
    }

    // TODO: Extract into common class
    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required('El nom és obligatori'),
        categoryId: yup
            .string()
            .required('La categoria és obligatòria'),
        trackOpen: yup.boolean(),
        expires: yup.boolean(),
        daysToKeep: yup.number().when("trackOpen", {
            is: true,
            then: (schema) => schema.required("Indica el número de dies que el producte es pot conservar una vegada obert")
        })
    })

    const onSubmit = async (values) => {
        const updatedProduct = {
            ...product,
            ...values
        }

        editProduct(updatedProduct)
        router.back()
    }

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit }) => <CreateProductForm onSubmit={handleSubmit} />}
            </Formik>
        </>
    )
}