import { useField } from 'formik';
import {SText} from "../nativewindTypes";
import RNPickerSelect from 'react-native-picker-select';
import {useEffect} from "react";

const FormikPicker = ({ name, items, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    useEffect(() => {
        if (!field.value && items.length > 0) {
            helpers.setValue(items[0].value)
        }
    }, [])

    return (
        <>
            <RNPickerSelect
                onValueChange={value => helpers.setValue(value)}
                value={field.value}
                items={items}
                {...props}
            />
            {showError && <SText className="text-red-800">{meta.error}</SText>}
        </>
    );
};

export default FormikPicker;