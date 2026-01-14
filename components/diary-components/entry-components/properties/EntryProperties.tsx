import { View, Text, StyleSheet } from "react-native";
import MainDate from "../MainDate";
import Checkmark from "./checklists/CheckboxTemplate";
import Dropdown from "./dropdowns/Dropdown";
import MultiselectTemplate from "./multi-select/MultiselectTemplate";

export default function EntryProperties() {
    return(
        <View style={{ paddingTop: 21 }}>
            <MainDate date="08, Jan 2026" />

            <View style={styles.container}>
                <Text style={styles.categoryName}>Category Name</Text>

                <View style={{ display: 'flex', gap: 14 }}>
                    <Dropdown />
                    <MultiselectTemplate />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 7,
        padding: 14,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#00000024'
    },

    categoryName: {
        paddingBottom: 7,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 2,
        color: '#64748B',
    }
})