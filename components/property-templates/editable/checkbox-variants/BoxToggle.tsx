import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
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
    data: any,
    entryProps: DiaryTableTypes,
}

const props = {
        id: 'prop_1',
        name: 'Workout Done',
        icon: 'check',
        color: '#10B981',
        variant: 'box-toggle',
        checked: true,
    }

export default function BoxToggle({ id, name, icon, color, data, variant, entryProps }: Props) {
    const [checked, setChecked] = useState<boolean>(data.isChecked);
    console.log(checked)

    async function toggleCheck() {
        const newChecked = !checked;
        setChecked(newChecked);

        try {
            await db.update(propertiesTable).set({ data: { isChecked: newChecked } }).where(and(eq(propertiesTable.templatePropertyId, id), eq(propertiesTable.dailyEntryId, entryProps.id)));

            console.log('id is: ', propertiesTable.id)
            console.log('')
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <Pressable onPress={toggleCheck} style={[styles.container, checked && styles.containerActive]}>
                <View style={[styles.iconContainer, checked ? styles.iconActive : styles.iconInactive]}>
                    <FontAwesome6 name={icon} size={12} color={checked ? 'white' : '#475569'} />
                </View>
                <Text style={[styles.text, checked ? styles.textActive : styles.textInactive]}>{name}</Text>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
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

    containerActive: {
        backgroundColor: `${props.color}1a`,
        borderColor: `${props.color}1a`
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

    iconActive: {
        backgroundColor: props.color,
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