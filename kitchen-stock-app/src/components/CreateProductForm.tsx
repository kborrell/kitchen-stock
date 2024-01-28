import {Pressable, Text} from "react-native";
import FormikTextInput from "./elements/forms/FormikTextInput";
import FormikPicker from "./elements/forms/FormikPicker";
import {useGetCategoriesQuery} from "../services/api";

const CreateProductForm = ({ onSubmit }) => {
    const { data, error, isLoading } = useGetCategoriesQuery()

    if (isLoading) return <Text>Loading...</Text>
    if (!data) return <Text>Missing categories!</Text>

    return (
        <>
            <FormikTextInput name="name" placeholder="Nom del producte" />
            <FormikPicker name="categoryId" items={data.map(element => ({label: element.name, value: element.id}))} />

            <Pressable onPress={onSubmit}>
                <Text>Afegir</Text>
            </Pressable>
        </>
    )
}

export default CreateProductForm