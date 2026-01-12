import { View, Text, Pressable, StyleSheet } from "react-native";
import MainDate from "./MainDate";
import MainTime from "./MainTime";
import EntryTags from "./EntryTags";
import EditButton from "./EditButton";
import EntryIcon from "./EntryIcon"


export default function EntryHeader() {
    return(
        <>
            <View style={styles.topContainer}>
                <View style={[styles.topContainer, {gap: 20}]}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <EntryIcon />
                        <MainDate date="Yesterday, 08 Jan" />
                    </View>
                    <View>
                        <MainTime time="10:49 PM" />
                    </View>
                </View>

                <EditButton />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})