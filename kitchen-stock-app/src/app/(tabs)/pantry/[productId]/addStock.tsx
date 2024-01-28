import {Formik} from "formik";
import * as yup from 'yup';
import {router, useLocalSearchParams} from "expo-router";
import {useAddStockMutation} from "../../../../services/api";
import AddStockForm from "../../../../components/AddStockForm";

export default function Page() {
    const { productId } = useLocalSearchParams()
    const [addStock, result] = useAddStockMutation()

    const initialValues = {
        format: "",
        expireDate: new Date(),
        amount: 0,
    }

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