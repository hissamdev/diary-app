import { DiaryTableTypes } from "./EntryBody";
import { FC, useEffect, useState } from "react";
import { db } from "../../../db";
import { templateTable } from "../../../db/schema";
import { View, StyleSheet } from "react-native";

// Property Components
import BoxToggle from "../../property-templates/editable/checkbox-variants/BoxToggle";


type TemplateProperties = {
    id: number,
    name: string,
    icon: string,
    color: string,
    variant: string,
    data: any,
    entryProps: DiaryTableTypes,
};

export default function EditProperties({ entryProps }: { entryProps: DiaryTableTypes }) {
    const [templateProperties, setTemplateProperties] = useState<TemplateProperties[]>([]);

    useEffect(() => {
        async function fetchTemplateProperties() {
            const result = await db.select().from(templateTable);
            setTemplateProperties(result);
        };

        fetchTemplateProperties();
    }, []);

    const componentList: Record<string, FC<TemplateProperties>> = {
        'box-toggle': BoxToggle,
    }

    return (
        <View style={styles.container}>
            {templateProperties.map((p) => {
                const Property = componentList[p.variant];

                return <Property key={p.id} name={p.name} icon={p.icon} color={p.color}  data={p.data} id={p.id} variant={p.variant} entryProps={entryProps} />;
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