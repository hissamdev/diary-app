import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/edit-page-components/Header";
import TopSection from "../components/edit-page-components/TopSection";
import EditBody from "../components/edit-page-components/EditBody";

// Types
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../App";
import EditProperties from "../components/diary-components/entry-components/EditProperties";

type Props = NativeStackScreenProps<RootStackParamList, 'Edit'>;

export default function EditPage({ route }: Props) {
    const { entryProps } = route.params;

    return (
        <SafeAreaView>
            <Header entryProps={entryProps} />
            <TopSection />
            <EditBody entryProps={entryProps} />
            <EditProperties entryProps={entryProps} />
        </SafeAreaView>
    )
}

