import { StyleSheet, View } from "react-native";
import EntryTags from "../diary-components/entry-components/EntryTags";
import EntryIcon from "../diary-components/entry-components/EntryIcon";

export default function TopSection() {
    return (
        <>
            <View style={styles.container}>
                <EntryTags />
                <EntryIcon />
            </View>
            
            <View style={{paddingHorizontal: 21}}>
                <View style={styles.divider}></View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 21,
        paddingHorizontal: 21,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    divider: {
        width: '100%',
        paddingTop: 12,
        paddingHorizontal: 21,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#0000001a'
    }
})