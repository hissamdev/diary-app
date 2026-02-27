
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
    textContent: string,
}

export default function EntryBody() {
    const [allEntries, setAllEntries] = useState<DiaryTableTypes[]>([]);

    const dailyTablePc = [{"customDate": null, "customTime": null, "date": "2026-01-21", "id": 19, "images": null, "textContent": "Aloha miamor", "time": "03:50:04"}, {"customDate": null, "customTime": null, "date": "2026-01-20", "id": 18, "images": null, "textContent": "Finally kicked off the design sprint today. It was intense but rewarding. I found myself really getting into the flow state around noon. The weather was...", "time": "06:48:32"}, {"customDate": null, "customTime": null, "date": "2026-01-19", "id": 17, "images": null, "textContent": null, "time": "04:19:17"}, {"customDate": null, "customTime": null, "date": "2026-01-19", "id": 16, "images": null, "textContent": null, "time": "04:17:56"}, {"customDate": null, "customTime": null, "date": "2026-01-19", "id": 15, "images": null, "textContent": null, "time": "04:16:54"}]


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
                            <EntryContent entryProps={entry} />
                            <EntryProperties />
                        </ View>
                    )
                })}
                
            </View>
    )
}

const styles = StyleSheet.create({
    entryBody: {
        paddingTop: 68,
        paddingRight: 21,
        paddingLeft: 21,
        display: 'flex',
        flexDirection: 'column',
        gap: 60,

    }
})