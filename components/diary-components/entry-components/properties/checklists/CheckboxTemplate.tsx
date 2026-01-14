import { FontAwesome6 } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { StyleSheet, Text, View } from "react-native";

export default function CheckboxTemplate() {


    return(
        <View style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10.5 }}>
                <View style={styles.propertyIcon}>
                    <FontAwesome6 name="spa" color="#10B981" />
                </View>

                <Text>Workout</Text>
            </View>
            
            <Checkbox style={styles.checkbox} />
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

    checkbox: {
        borderWidth: 0,
        backgroundColor: '#10B981',
    }
})