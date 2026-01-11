import { StyleSheet, TextInput, View } from "react-native";

export default function EditBody() {
    return (
        <View style={styles.container}>
            <TextInput multiline={true} textAlignVertical="top" style={styles.inputField} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 0,
        paddingRight: 21,
        paddingLeft: 21,
    },

    inputField: {
        height: 1000,
    }
})