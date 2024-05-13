import {Pressable, Text, View} from "react-native";
import FormikTextInput from "./elements/forms/FormikTextInput";
import FormikPicker from "./elements/forms/FormikPicker";
import {useGetCategoriesQuery} from "../services/api";
import FormikCheckboxInput from "./elements/forms/FormikCheckboxInput";
import FormikNumericInput from "./elements/forms/FormikNumericInput";

const CreateProductForm = ({ onSubmit }) => {
    const { data, error, isLoading } = useGetCategoriesQuery()

    if (isLoading) return <Text>Loading...</Text>
    if (!data) return <Text>Missing categories!</Text>

    return (
        <>
            <View>
                <Text>Nom del producte</Text>
                <FormikTextInput name="name" placeholder="Introdueix nom del producte" />
            </View>
            <View>
                <Text>Categoria</Text>
                <FormikPicker name="categoryId" items={data.map(element => ({label: element.name, value: element.id}))} />
            </View>
            <View>
                <Text>Vols fer seguiment dels productes oberts?</Text>
                <FormikCheckboxInput name="trackOpen" />
            </View>
            <View>
                <Text>El producte te data de caducitat?</Text>
                <FormikCheckboxInput name="expires" />
            </View>
            <View>
                <Text>Quants dies es pot mantenir després d'obrirlo?</Text>
                <FormikNumericInput name="daysToKeep" minValue={0} />
            </View>
            <Pressable onPress={onSubmit}>
                <Text>Afegir</Text>
            </Pressable>
        </>
    )
}

export default CreateProductForm