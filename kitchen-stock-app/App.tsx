import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import {SText} from "./src/nativewindTypes";

export default function App() {
  return (
    <View style={styles.container}>
      <SText className="font-bold">Open up App.js to start working on your app!</SText>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
