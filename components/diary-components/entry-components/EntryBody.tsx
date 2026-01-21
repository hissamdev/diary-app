
import { View, StyleSheet } from "react-native";
import EntryHeader from "./EntryHeader";
import EntryContent from "./EntryContent";
import EntryProperties from "./properties/EntryProperties";
import { useEffect, useState } from "react";
import { db } from "../../../db";
import { dailyTable } from "../../../db/schema";
import { asc, desc } from "drizzle-orm";

export type DiaryTableTypes = {
    id: number,
    date: string,
    time: string,
}

export default function EntryBody() {
    const [allEntries, setAllEntries] = useState<DiaryTableTypes[]>([]);

    useEffect(() => {
        async function fetchDiary() {
            const result = await db.select().from(dailyTable).orderBy(desc(dailyTable.id));
            setAllEntries(result);
        };

        fetchDiary();
    }, []);

    return(
            <View style={styles.entryBody}>
                {allEntries.map((entry) => {
                    return (
                        <View key={entry.id} >
                            <EntryHeader entryProps={entry} />
                            <EntryContent />
                            <EntryProperties />
                        </ View>
                    )
                })}
                
            </View>
    )
}

const styles = StyleSheet.create({
    entryBody: {
        paddingTop: 69,
        paddingRight: 21,
        paddingLeft: 21,
        display: 'flex',
        flexDirection: 'column',
        gap: 100,

    }
})