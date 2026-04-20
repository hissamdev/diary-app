import { Text, View, StyleSheet } from "react-native";
import { DiaryTableTypes } from "./EntryBody";

export default function EntryContent({ entryProps }: { entryProps: DiaryTableTypes }) {

    return(
        <View>
            {entryProps.textContent && <Text style={styles.textContent}>{entryProps.textContent}</Text>}

            <View style={[{paddingTop: 20}, styles.imageContainer]}>
                <View style={styles.imageItem}>

                </View>

                <View style={styles.imageItem}>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textContent: {
        paddingTop: 6,
        fontSize: 14,
        lineHeight: 22,
    },

    imageContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 18
    },

    imageItem: {
        width: 58,
        height: 58,
        borderRadius: 4,
        backgroundColor: '#777777',
    }

})