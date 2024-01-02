import { useField } from 'formik';
import {Text, TextInput} from "react-native";
import {SText} from "../nativewindTypes";

const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <TextInput
                onChangeText={value => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                {...props}
            />
            {showError && <SText className="text-red-800">{meta.error}</SText>}
        </>
    );
};

export default FormikTextInput;