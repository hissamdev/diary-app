import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MultiselectDisplay({ name, color, icon, handleDrag }) {
    return(
        <TouchableOpacity onLongPress={handleDrag} style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10.5 }}>
                <View style={styles.propertyIcon}>
                    <FontAwesome6 name="spa" color="#10B981" />
                </View>

                <Text>{name}</Text>
            </View>
            
            <Text style={[styles.tag, {color: '#4F46E5', backgroundColor: '#4F46E51a'}]}>Casual</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    propertyName: {
        fontSize: 12,
        color: '#475569'
    },

    propertyIcon: {
        width: 24,
        height: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        backgroundColor: '#10B9811a',
    },

    tag: {
        paddingTop: 3.5,
        paddingRight: 8.75,
        paddingBottom: 3.5,
        paddingLeft: 8.75,
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: 0.45,
        borderRadius: 3,
        textTransform: 'uppercase'
    }
})