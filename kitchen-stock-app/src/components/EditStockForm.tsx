import {Pressable, Text} from "react-native";
import FormikTextInput from "./elements/forms/FormikTextInput";
import FormikDateInput from "./elements/forms/FormikDateInput";
import FormikNumericInput from "./elements/forms/FormikNumericInput";

const EditStockForm = ({ onSubmit, onDelete, stock}) => {
    return (
        <>
            <FormikTextInput name="format" placeholder="Format del producte" />
            <FormikDateInput name="expireDate"/>
            <FormikNumericInput name="amount" placeholder="Quantitat" />

            {
                stock.isOpen
                    ? (
                        <FormikTextInput name="remaining" placeholder="Quantitat restant" />
                    ) : undefined
            }

            <Pressable onPress={onSubmit}>
                <Text>Afegir</Text>
            </Pressable>
        </>
    )
}

export default EditStockForm