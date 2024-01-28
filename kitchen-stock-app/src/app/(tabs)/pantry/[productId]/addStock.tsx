import {Formik} from "formik";
import CreateProductForm from "../../../../components/CreateProductForm";
import * as yup from 'yup';
import {router, useLocalSearchParams} from "expo-router";
import {useAddStockMutation, useCreateProductMutation} from "../../../../services/api";
import AddStockForm from "../../../../components/AddStockForm";

export default function Page() {
    const { productId } = useLocalSearchParams()
    const [addStock, result] = useAddStockMutation()

    const initialValues = {
        format: "",
        expireDate: new Date(),
        isOpen: false,
        expires: false,
        remaining: ""
    }

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

    const onSubmit = async (values) => {
        try {
            const result = await addStock({ productId: productId, ...values }).unwrap();
            console.log(result)
            router.back()
        } catch {
            console.error("ERROR ADDING STOCK", values)
        }
    }

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit }) => <AddStockForm onSubmit={handleSubmit} />}
            </Formik>
        </>
    )
}