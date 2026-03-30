import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, Platform, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//Components
import Diary from './screens/Diary/Diary';
import EditPage from './screens/Diary/EditPage';

// db
import { SQLiteProvider } from 'expo-sqlite';
//@ts-ignore
import { db, expoDb, DATABASE_NAME } from './db';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';
import {useDrizzleStudio} from 'expo-drizzle-studio-plugin';
import { DiaryTableTypes } from './components/diary-components/entry-components/EntryBody';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Necessary types for screen names.
// e.g. 'Edit' should match the navigator name string
export type RootStackParamList = {
  DiarySection: undefined,
  Diary: undefined,
  Edit: {
    entryProps: DiaryTableTypes,
  }
}

const RootStack = createNativeStackNavigator<RootStackParamList>();
const DiaryStack = createNativeStackNavigator<RootStackParamList>();

// Grouped stack for diary screens
function DiaryNavigator() {
  return (
    <DiaryStack.Navigator>
      <DiaryStack.Screen name="Diary" component={Diary} />
      <DiaryStack.Screen name="Edit" component={EditPage} />
    </DiaryStack.Navigator>
  )
}

export default function App() {
  const isWeb = Platform.OS === 'web';
  const { success, error } = useMigrations(db, migrations);
  useDrizzleStudio(expoDb);

  if (!isWeb && error) {
    return (
      <SafeAreaProvider>
        <Text>Migration Error: {error.message}</Text>
      </SafeAreaProvider>
    )
  }
  if (!isWeb && !success) {
    return (
      <SafeAreaProvider>
        <ActivityIndicator size={'large'} />
      </SafeAreaProvider>
    );
  }

  // Separated for conditional rendering
  const appContent = (
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }} >
          <RootStack.Screen name="DiarySection" component={DiaryNavigator} />
          <RootStack.Screen name="DiarySection" component={DiaryNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
  )

  return (
      <GestureHandlerRootView>
        <SafeAreaProvider>
          {isWeb ? appContent : <SQLiteProvider databaseName={DATABASE_NAME} options={{enableChangeListener: true}}>{appContent}</SQLiteProvider>}
        </SafeAreaProvider>
      </GestureHandlerRootView>
  );
}

