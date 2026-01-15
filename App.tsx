import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Platform, Text } from 'react-native';

//Components
import Diary from './screens/Diary';
import EditPage from './screens/EditPage';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// db
import { SQLiteProvider } from 'expo-sqlite';
//@ts-ignore
import { db, expoDb, DATABASE_NAME } from './db';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';
import {useDrizzleStudio} from 'expo-drizzle-studio-plugin';


export default function App() {
  const isWeb = Platform.OS === 'web';
  const { success, error } = useMigrations(db, migrations);
  useDrizzleStudio(expoDb);

  if (error) {
    return (
      <SafeAreaProvider>
        <Text>Migration Error: {error.message}</Text>
      </SafeAreaProvider>
    )
  }

  if (!success) {
    return (
      <SafeAreaProvider>
        <ActivityIndicator size={'large'} />
      </SafeAreaProvider>
    );
  }

  const appContent = (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Diary" component={Diary} />
          <Stack.Screen name="Edit" component={EditPage} />
        </Stack.Navigator>
      </NavigationContainer>
  )

  return (
      <SafeAreaProvider>
        {isWeb ? appContent : <SQLiteProvider databaseName={DATABASE_NAME} options={{enableChangeListener: true}}>{appContent}</SQLiteProvider>}
      </SafeAreaProvider>
  );
}

const Stack = createNativeStackNavigator();