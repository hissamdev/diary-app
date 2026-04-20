import { SquarePen } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function EntryTags() {
    return(
        <View style={styles.container}>
            <View style={styles.tagsContainer}>
                    <Text style={[styles.tag, {color: '#4F46E5', backgroundColor: '#4F46E51a'}]}>Casual</Text>

                    <Text style={[styles.tag, {color: '#4F46E5', backgroundColor: '#4F46E51a'}]}>Memory</Text>
            </View>

            <Pressable>
                <SquarePen color={'#464646'} size={17} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9
    },
    tagsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5
    },
    tag: {
        paddingTop: 5,
        paddingRight: 9,
        paddingBottom: 5,
        paddingLeft: 9,
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: 0.45,
        borderRadius: 3,
        textTransform: 'uppercase'
    }
})