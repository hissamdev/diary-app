
import { View, StyleSheet } from "react-native";
import EntryHeader from "./EntryHeader";
import EntryContent from "./EntryContent";
import EntryProperties from "./EntryProperties";

export default function EntryBody() {
    return(
            <View style={styles.entryBody}>
                <EntryHeader />
                <EntryContent />
                <EntryProperties />
            </View>
    )
}

const styles = StyleSheet.create({
    entryBody: {
        paddingTop: 69,
        paddingRight: 21,
        paddingLeft: 21
    }
})