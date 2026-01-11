import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

//Components
import Diary from './screens/Diary';
import EditPage from './screens/EditPage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Diary" component={Diary} />
            <Stack.Screen name="Edit" component={EditPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  );
}

const Stack = createNativeStackNavigator();