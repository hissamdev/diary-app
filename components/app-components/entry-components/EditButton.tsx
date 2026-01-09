import { SquarePen } from "lucide-react-native";
import { Pressable, Text, StyleSheet } from "react-native";

export default function EditButton() {
    return(
        <Pressable style={styles.container}>
            <SquarePen color={'#4338CA'} size={12} />
            <Text style={styles.text}>Edit</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        paddingRight: 9,
        paddingBottom: 5,
        paddingLeft: 9,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderRadius: 4,
        backgroundColor: '#4338CA1a'
    },
    text: {
        color: '#4338CA',
        fontSize: 10.5,
        fontWeight: 700,
        textTransform: 'uppercase',
    }
    
})