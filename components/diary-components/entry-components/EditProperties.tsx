import { DiaryTableTypes } from "./EntryBody";
import { FC, useEffect, useState } from "react";
import { db } from "../../../db";
import { propertiesTable, templateTable } from "../../../db/schema";
import { View, StyleSheet } from "react-native";

// Property Components
import BoxToggle from "../../property-templates/editable/checkbox-variants/BoxToggle";
import Dropdown from "../../property-templates/display/dropdowns/DropdownDisplay";
import MultiselectTemplate from "../../property-templates/display/multiselect/MultiselectDisplay";
import ReorderProperties from "./properties/ReorderProperties";


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
            
            try {
                const result = await db.select().from(templateTable);

                setTemplateProperties(result);
                console.log("Fetched template table successfully")
            } catch (error) {
                console.error("Error fetching template table: ", error)
            }
            
        };

        fetchTemplate();
    }, []);

    const componentList: Record<string, FC<TemplateProperties>> = {
        'box-toggle': BoxToggle,
        'dropdown': Dropdown,
        'multiselect': MultiselectTemplate,
    }

    return (
        <View style={styles.container}>
            <ReorderProperties diaryProps={entryProps} />
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