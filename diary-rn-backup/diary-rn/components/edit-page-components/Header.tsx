import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MainTime from "../diary-components/entry-components/MainTime";
import { DiaryTableTypes } from "../diary-components/entry-components/EntryBody";

type Props = {
    entryProps: DiaryTableTypes,
}

export default function Header({ entryProps }: Props) {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Pressable onPress={() => navigation.goBack()}>
                <FontAwesome6 name={'angle-left'} color={'gray'} size={24} />
            </Pressable>

            <MainTime timeProps={entryProps.time} />
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
});