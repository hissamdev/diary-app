import { Plus } from "lucide-react-native";
import { Text, View, Pressable, StyleSheet } from "react-native";

import MainDate from "./entry-components/MainDate";

export default function DailyCreate() {
    return(
        <>
            <View style={{paddingTop: 38, paddingRight: 21, paddingLeft: 21}}>
                <MainDate date="Today, 09 Jan" />

                <Pressable style={styles.createBox}>
                    <View style={styles.plusContainer}>
                        <Plus color={'#94A3B8'} />
                    </View>

                    <Text style={styles.createBoxHeading}>How was your day, Name?</Text>
                    <Text style={styles.createBoxSubheading}>Tap to write  today’s entry</Text>
                </Pressable>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    createBox: {
        marginTop: 10.5,
        width: '100%',
        height: 152,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
        borderStyle: 'dashed',
    },

    plusContainer: {
        width: 49,
        height: 49,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 9999,
    },

    createBoxHeading: {
        paddingTop: 14,
        fontSize: 12.25,
        color: '#94A3B8',
        fontWeight: 700
    },

    createBoxSubheading: {
        paddingTop: 3.5,
        fontSize: 11,
        color: '#BFC3C8',
        fontWeight: 700
    }
})