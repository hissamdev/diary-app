import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Header from './components/app-components/Header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppToolbar from './components/app-components/AppToolbar';
import DailyCreate from './components/app-components/DailyCreate';
import EntryBody from './components/app-components/entry-components/EntryBody';

export default function App() {
  return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} >
            <Header />
            <AppToolbar />
            <DailyCreate />
            <EntryBody />
            <View style={styles.container}>
              <Text>Open up App.tsx to start working on your app!</Text>
              <StatusBar style="auto" />
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
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
