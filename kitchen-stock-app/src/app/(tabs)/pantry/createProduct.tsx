import {Formik} from "formik";
import CreateProductForm from "../../../components/CreateProductForm";
import * as yup from 'yup';
import {router} from "expo-router";
import {useCreateProductMutation} from "../../../services/api";

export default function Page() {
    const [createProduct, result] = useCreateProductMutation()

    const initialValues = {
        name: "",
        category: ""
    }

    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required('El nom és obligatori'),
        categoryId: yup
            .string()
            .required('La categoria és obligatòria')
    })

    const onSubmit = async (values) => {
        try {
            const result = await createProduct(values).unwrap();
            console.log(result)
            router.push("/pantry")
        } catch {
            console.error("ERROR CREATING PRODUCT", values)
        }
    }

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit }) => <CreateProductForm onSubmit={handleSubmit} />}
            </Formik>
        </>
    )
}