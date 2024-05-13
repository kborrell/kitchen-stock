import { useField } from 'formik';
import {Text, TextInput} from "react-native";
import {Checkbox} from "expo-checkbox";

const FormikCheckboxInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <Checkbox
                onValueChange={value => helpers.setValue(value)}
                value={field.value}
                {...props}
            />
            {showError && <Text className="text-red-800">{meta.error}</Text>}
        </>
    );
};

export default FormikCheckboxInput;