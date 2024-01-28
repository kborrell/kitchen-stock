import { useField } from 'formik';
import {Text, TextInput} from "react-native";
import {SText} from "../../../nativewindTypes";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const FormikDateInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <RNDateTimePicker
                onChange={(event, date) => helpers.setValue(date)}
                value={field.value}
                {...props}
            />
            {showError && <SText className="text-red-800">{meta.error}</SText>}
        </>
    );
};

export default FormikDateInput;