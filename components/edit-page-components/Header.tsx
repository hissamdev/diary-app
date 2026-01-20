import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function Header() {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Pressable onPress={() => navigation.goBack()}>
                <FontAwesome6 name={'angle-left'} color={'gray'} size={24} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#0000001a'
    }
})