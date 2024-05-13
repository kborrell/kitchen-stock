import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, Text} from 'react-native';

export default function Page() {
    return (
        <SafeAreaView>
            <Text>Welcome!</Text>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}