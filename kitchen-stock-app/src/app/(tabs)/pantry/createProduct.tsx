import {Formik} from "formik";
import CreateProductForm from "../../../components/CreateProductForm";
import * as yup from 'yup';
import {router} from "expo-router";
import {useCreateProductMutation} from "../../../services/api";

export default function Page() {
    const [createProduct, result] = useCreateProductMutation()

    const initialValues = {
        name: "",
        format: "",
        category: ""
    }

    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required('El nom és obligatori'),
        format: yup
            .string()
            .required('El format és obligatori'),
        categoryId: yup
            .string()
            .required('La categoria és obligatòria')
    })

    const onSubmit = (values) => {
        console.log(values.name, values.format, values.categoryId)
        createProduct(values)
        router.replace('/products')
    }

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit }) => <CreateProductForm onSubmit={handleSubmit} />}
            </Formik>
        </>
    )
}