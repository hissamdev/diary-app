import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function Dropdown() {
    return(
        <View style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10.5 }}>
                <View style={styles.propertyIcon}>
                    <FontAwesome6 name="spa" color="#10B981" />
                </View>

                <Text>Property2</Text>
            </View>
            
            <Text style={styles.dropdownBox}>Medium</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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

    dropdownBox: {
        fontSize: 11,
        paddingTop: 5.25,
        paddingRight: 57.25,
        paddingBottom: 5.25,
        paddingLeft: 8.75,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#00000025'
    }
})