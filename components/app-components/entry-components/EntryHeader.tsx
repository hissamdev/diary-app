import { View, Text, Pressable, StyleSheet } from "react-native";
import MainDate from "./MainDate";
import MainTime from "./MainTime";
import EntryTags from "./EntryTags";
import EditButton from "./EditButton";


export default function EntryHeader() {
    return(
        <>
            <View style={styles.topContainer}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <View style={{ width: 24, height: 24, backgroundColor: '#8D8D8D', borderRadius: 999, }}></View>
                    <MainDate date="Yesterday, 08 Jan" />
                </View>

                <View>
                    <MainTime time="10:49 PM" />
                </View>
            </View>
            <View>
                <View style={[{paddingTop: 10}, styles.bottomContainer]} >
                    <EntryTags />
                    <EditButton />
                </View>
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
    },
    bottomContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})