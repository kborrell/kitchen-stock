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
            <FormikCheckboxInput name="expires"/>
            <FormikDateInput name="expireDate"/>
            <FormikCheckboxInput name="isOpen"/>
            <FormikTextInput name="remaining" placeholder="Quantitat restant" />

            <Pressable onPress={onSubmit}>
                <Text>Afegir</Text>
            </Pressable>
        </>
    )
}

export default AddStockForm