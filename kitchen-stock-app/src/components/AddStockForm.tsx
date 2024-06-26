import {Pressable, Text} from "react-native";
import FormikTextInput from "./elements/forms/FormikTextInput";
import FormikDateInput from "./elements/forms/FormikDateInput";
import FormikNumericInput from "./elements/forms/FormikNumericInput";

const AddStockForm = ({ onSubmit, isOpen }) => {
    return (
        <>
            <FormikTextInput name="format" placeholder="Format del producte" />
            <FormikDateInput name="expireDate"/>
            <FormikNumericInput name="amount" placeholder="Quantitat" />
            {
                isOpen ?
                    <FormikTextInput name="remaining" placeholder="Quantitat restant" />
                    : undefined
            }

            <Pressable onPress={onSubmit}>
                <Text>Guardar</Text>
            </Pressable>
        </>
    )
}

export default AddStockForm