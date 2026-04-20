import { FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { db } from "../../../../db";
import { dailyTable, propertiesTable, templateTable } from "../../../../db/schema";
import { and, eq } from "drizzle-orm";
import { DiaryTableTypes } from "../../../diary-components/entry-components/EntryBody";

type Props = {
    id: number,
    name: string,
    icon: string,
    color: string,
    variant: string,
    diaryProps: DiaryTableTypes,
}

// id is the current row id in template table
// diaryProps is passed through route props
export default function BoxToggle({ id, name, icon, color, variant, diaryProps, handleDrag }: Props) {
    const [checked, setChecked] = useState<boolean>(false);
    if (!diaryProps?.id) return console.warn("Missing diaryProps.id!")
    
    useEffect(() => {
        const fetchProertyRow = async () => {
            try {
                const result = await db
                    .select()
                    .from(propertiesTable)
                    .where(and(eq(propertiesTable.dailyEntryId, diaryProps.id), eq(propertiesTable.templatePropertyId, id)))
                
                setChecked(result[0].data.isChecked)
                console.log("Property row fetched")
                } catch (error) {
                console.error("Failed to fetch property row, ", error)
            }

            
        }

        fetchProertyRow()
        
    }, [checked])

    async function toggleCheck() {
        const newChecked = !checked;
        setChecked(newChecked);

        try {
            await db.update(propertiesTable)
            .set({ data: { isChecked: newChecked } })
            .where(and(eq(propertiesTable.dailyEntryId, diaryProps.id), eq(propertiesTable.templatePropertyId, id)))

            console.log("Updated data", "id: ", diaryProps.id, "propId: ", id)
        } catch (err) {
            console.error("Error updating property: ", err, "id: ", diaryProps.id, "propId: ", id);
        }
    }

    return (
        <Pressable onPress={toggleCheck} onLongPress={handleDrag} style={[styles.container, checked && { backgroundColor: `${color}1a`, borderColor: `${color}1a` }]}>
            <View style={[styles.iconContainer, checked ? { backgroundColor: color } : styles.iconInactive]}>
                <FontAwesome6 name={icon} size={12} color={checked ? 'white' : '#475569'} />
            </View>
            <Text style={[styles.text, checked ? styles.textActive : styles.textInactive]}>{name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
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

    iconContainer: {
        paddingLeft: 0.7,
        width: 24,
        aspectRatio: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
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