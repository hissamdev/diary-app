import { View, Text, StyleSheet } from "react-native";
import { FC, useEffect, useState } from "react";
import { propertiesTable, templateTable } from "../../../../db/schema";
import { db } from "../../../../db";
import CheckboxDisplay from "../../../property-templates/display/checkbox/CheckboxDisplay";
import MultiselectDisplay from "../../../property-templates/display/multiselect/MultiselectDisplay";
import DropdownDisplay from "../../../property-templates/display/dropdowns/DropdownDisplay";

type ComponentProperties = {
    id: number,
    variant: string,
}

export default function EntryProperties({ entryProps }: { entryProps: any }) {
    const [template, setTemplate] = useState<ComponentProperties[]>([])

    useEffect(() => {
        const fetchTemplate = async () => {
            const getTemplate = await db.select().from(templateTable)

            setTemplate(getTemplate)
        } 

        fetchTemplate()
    }, [])

    const componentList: Record<string, FC<ComponentProperties>> = {
        'box-toggle': CheckboxDisplay,
        'dropdown': DropdownDisplay,
        'multiselect': MultiselectDisplay
    }

    return(
        <View style={{ paddingTop: 20 }}>

            <View style={styles.container}>
                <Text style={styles.categoryName}>Category Name</Text>

                <View style={{ display: 'flex', gap: 14 }}>
                    {template.map((t) => {
                        const Display = componentList[t.variant]
                        if (!Display) return <View><Text>Not found</Text></ View>

                        return <Display key={t.id} id={t.id} name={t.name} color={t.color} icon={t.icon} variant={t.variant} diaryProps={entryProps}  />
                    })}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        padding: 14,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#00000024',
    },

    categoryName: {
        paddingBottom: 7,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 2,
        color: '#64748B',
    }
})