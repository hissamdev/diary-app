import { DiaryTableTypes } from "./EntryBody";
import { FC, useEffect, useState } from "react";
import { db } from "../../../db";
import { propertiesTable, templateTable } from "../../../db/schema";
import { View, StyleSheet } from "react-native";

// Property Components
import BoxToggle from "../../property-templates/editable/checkbox-variants/BoxToggle";


type TemplateProperties = {
    id: number,
    name: string,
    icon: string,
    color: string,
    variant: string,
    diaryProps: DiaryTableTypes,
    propertiesTable: any,
};

export default function EditProperties({ entryProps }: { entryProps: DiaryTableTypes }) {
    const [templateProperties, setTemplateProperties] = useState<TemplateProperties[]>([]);
    
    useEffect(() => {
        async function fetchTemplate() {
            const result = await db.select().from(templateTable);
            const fetchPropertyTable = await db.select().from(propertiesTable);
            
            const templateWithProperties = result.map(t => ({
                ...t,
                properties: fetchPropertyTable
            }))

            setTemplateProperties(templateWithProperties);
            
        };

        fetchTemplate();
    }, []);

    const componentList: Record<string, FC<TemplateProperties>> = {
        'box-toggle': BoxToggle,
    }

    return (
        <View style={styles.container}>
            {templateProperties.map((p) => {
                const Property = componentList[p.variant];

                return <Property
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    icon={p.icon}
                    color={p.color}
                    variant={p.variant}
                    diaryProps={entryProps}
                    propertiesTable={p.propertiesTable}
                    />
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 21,
        width: '100%',
        height: 500,
        display: 'flex',
        gap: 10,
    }
});