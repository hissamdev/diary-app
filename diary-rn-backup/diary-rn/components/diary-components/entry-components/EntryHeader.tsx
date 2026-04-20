import { View, Text, Pressable, StyleSheet } from "react-native";
import MainDate from "./MainDate";
import MainTime from "./MainTime";
import EntryTags from "./EntryTags";
import EditButton from "./EditButton";
import EntryIcon from "./EntryIcon"
import { DiaryTableTypes } from "./EntryBody";

type EntryHeaderProps = {
    entryProps: DiaryTableTypes,
}


export default function EntryHeader({ entryProps }: EntryHeaderProps) {
    return(
        <>
            <View style={styles.topContainer}>
                <View style={[styles.topContainer, {gap: 20}]}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <EntryIcon />
                        <MainDate dateProps={entryProps.date} />
                    </View>
                    <View>
                        <MainTime timeProps={entryProps.time} />
                    </View>
                </View>

                <EditButton entryProps={entryProps} />
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