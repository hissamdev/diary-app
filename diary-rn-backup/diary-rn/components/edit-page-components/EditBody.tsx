import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { DiaryTableTypes } from "../diary-components/entry-components/EntryBody";
import ReorderProperties from "../diary-components/entry-components/properties/ReorderProperties";

export default function EditBody({ entryProps }: { entryProps: DiaryTableTypes }) {
    const [text, setTest] = useState(entryProps.textContent);

    return (
        <View style={styles.container}>
            <TextInput multiline={true} textAlignVertical="top" style={styles.inputField} >{text}</TextInput>
        
            
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
        height: 100,
    }
})