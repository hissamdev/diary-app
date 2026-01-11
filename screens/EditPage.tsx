import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/edit-page-components/Header";
import TopSection from "../components/edit-page-components/TopSection";
import EditBody from "../components/edit-page-components/EditBody";

export default function EditPage() {
    return (
        <SafeAreaView style={{ backgroundColor: "#1F1F1F" }}>
            <Header />
            <TopSection />
            <EditBody />
        </SafeAreaView>
    )
}

