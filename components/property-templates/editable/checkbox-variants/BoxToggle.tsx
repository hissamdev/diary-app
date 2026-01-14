import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

const props = {
        id: 'prop_1',
        name: 'Workout Done',
        icon: 'check',
        color: '#10B981',
        variant: 'box-toggle',
        checked: true,
    }

export default function BoxToggle({  }) {

    return (
        <>
            <Pressable style={[styles.container, props.checked && styles.containerActive]}>
                <View style={[styles.iconContainer, props.checked ? styles.iconActive : styles.iconInactive]}>
                    <FontAwesome6 name={props.icon} size={12} color={props.checked ? 'white' : '#475569'} />
                </View>
                <Text style={[styles.text, props.checked ? styles.textActive : styles.textInactive]}>{props.name}</Text>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20.5,
        width: '100%',
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#10B9811a'
    },

    containerInactive: {
        backgroundColor: 'transparent',
    },

    containerActive: {
        backgroundColor: `${props.color}1a`,
        borderColor: `${props.color}1a`
    },

    iconContainer: {
        paddingLeft: 0.7,
        width: 24,
        aspectRatio: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    },

    iconActive: {
        backgroundColor: props.color,
    },

    iconInactive: {
        backgroundColor: '#94a3b81a',
    },

    text: {
        fontSize: 11,
        letterSpacing: 0.55,
        fontWeight: 900,
    },

    textInactive: {
        color: '#94a3b8',
    },

    textActive: {
        color: '#475569',
    }


})