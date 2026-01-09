import { Text, View, StyleSheet } from "react-native";

export default function EntryContent() {
    return(
        <View style={{paddingTop: 16}}>
            <Text style={styles.textContent}>Finally kicked off the design sprint today. It was intense but rewarding. I found myself really getting into the flow state around noon. The weather was...</Text>

            <View style={[{paddingTop: 16}, styles.imageContainer]}>
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
        backgroundColor: '#777777'
    }

})