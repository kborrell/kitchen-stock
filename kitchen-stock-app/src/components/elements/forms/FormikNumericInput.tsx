import { useField } from 'formik';
import NumericInput from 'react-native-numeric-input'
import {Text} from "react-native";

const FormikNumericInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <NumericInput
                onChange={value => helpers.setValue(value)}
                value={field.value}
                {...props}
            />
            {showError && <Text className="text-red-800">{meta.error}</Text>}
        </>
    );
};

export default FormikNumericInput;