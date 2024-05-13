import {Pressable, Text} from "react-native";
import FormikTextInput from "./elements/forms/FormikTextInput";
import FormikPicker from "./elements/forms/FormikPicker";
import {useGetCategoriesQuery} from "../services/api";
import FormikCheckboxInput from "./elements/forms/FormikCheckboxInput";
import FormikDateInput from "./elements/forms/FormikDateInput";

const AddStockForm = ({ onSubmit }) => {
    return (
        <>
            <FormikTextInput name="format" placeholder="Format del producte" />
            <FormikDateInput name="expireDate"/>
            <FormikTextInput name="amount" placeholder="Quantitat" />

            <Pressable onPress={onSubmit}>
                <Text>Afegir</Text>
            </Pressable>
        </>
    )
}

export default AddStockForm