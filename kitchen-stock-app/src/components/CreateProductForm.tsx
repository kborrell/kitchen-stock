import {Pressable, Text} from "react-native";
import FormikTextInput from "./elements/forms/FormikTextInput";
import FormikPicker from "./elements/forms/FormikPicker";
import {useGetCategoriesQuery} from "../services/api";
import FormikCheckboxInput from "./elements/forms/FormikCheckboxInput";
import {SText, SView} from "../nativewindTypes";
import FormikNumericInput from "./elements/forms/FormikNumericInput";

const CreateProductForm = ({ onSubmit }) => {
    const { data, error, isLoading } = useGetCategoriesQuery()

    if (isLoading) return <Text>Loading...</Text>
    if (!data) return <Text>Missing categories!</Text>

    return (
        <>
            <SView>
                <SText>Nom del producte</SText>
                <FormikTextInput name="name" placeholder="Introdueix nom del producte" />
            </SView>
            <SView>
                <SText>Categoria</SText>
                <FormikPicker name="categoryId" items={data.map(element => ({label: element.name, value: element.id}))} />
            </SView>
            <SView>
                <SText>Vols fer seguiment dels productes oberts?</SText>
                <FormikCheckboxInput name="trackOpen" />
            </SView>
            <SView>
                <SText>El producte te data de caducitat?</SText>
                <FormikCheckboxInput name="expires" />
            </SView>
            <SView>
                <SText>Quants dies es pot mantenir després d'obrirlo?</SText>
                <FormikNumericInput name="daysToKeep" minValue={0} />
            </SView>
            <Pressable onPress={onSubmit}>
                <Text>Afegir</Text>
            </Pressable>
        </>
    )
}

export default CreateProductForm