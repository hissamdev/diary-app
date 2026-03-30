import { ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

//Components
import Header from '../../components/diary-components/Header';
import AppToolbar from '../../components/diary-components/AppToolbar';
import DailyCreate from '../../components/diary-components/DailyCreate';
import EntryBody from '../../components/diary-components/entry-components/EntryBody';

export default function Diary() {
  return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} >

                <Header />
                <AppToolbar />
                <DailyCreate />
                <EntryBody />

            </ScrollView>
        </SafeAreaView>
  );
}