import { FC, useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import BoxToggle from "../../../property-templates/editable/checkbox-variants/BoxToggle";
import DropdownDisplay from "../../../property-templates/display/dropdowns/DropdownDisplay";
import MultiselectDisplay from "../../../property-templates/display/multiselect/MultiselectDisplay";
import { db } from "../../../../db";
import { propertiesTable, templateTable } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import { DiaryTableTypes } from "../EntryBody";

type ModalType = 'create' | 'edit' | null;
type ComponentList = Record<string, FC<Properties>>;
type Props = {
    visible: boolean,
    onClose: () => void,
};
type Properties = {
    id: number,
    name: string,
    icon: string,
    color: string,
    variant: string,
    diaryProps: DiaryTableTypes,
}

export default function ReorderProperties({ diaryProps }: Properties) {
    // visible is a prop passed in, carries a boolean that is used for the built-in isVisible prop
    // onClose is a callback function prop
    const [template, setTemplate] = useState<Properties[]>([]);
    const [showPropertySettings, setShowPropertySettings] = useState<ModalType>(null);
    const createPropertyRef = useRef<View>(null);

    // Store the template into state
    useEffect(() => {
        async function fetchTemplate() {
            try {
                const result = await db.select().from(templateTable).orderBy(templateTable.position);

                setTemplate(result);
                console.log("Template fetched and stored in state, array", Array.isArray(result), result.length)
            } catch (err) {
                console.error('Error fetching template, ', err);
            };
        }

        fetchTemplate();
    }, [])

    const componentList: ComponentList = {
        'box-toggle': BoxToggle,
        'dropdown': DropdownDisplay,
        'multiselect': MultiselectDisplay,
    };

    const handleDragEnd = async (newData: Properties[]) => {
        console.log("handleDragEnd reached, type: ", typeof newData)

        if (!newData) return;
        setTemplate(newData)

        try {
            await db.transaction(async (tx) => {
                for (let i = 0; i < newData.length; i++) {
                    const item = newData[i]
                    if (item && item.id) {
                        await tx
                            .update(templateTable)
                            .set({ position: i })
                            .where(eq(templateTable.id, item.id))
                    }
                }
            })
        } catch (error) {
            console.error("Failed to persist order: ", error)
        }
    }

    const renderItem = ({ item, drag, isActive }) => {

        const Property = componentList[item.variant];
        if (!Property) return <Text>Not Found</ Text>

        return (
            <ScaleDecorator>
                <Property
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    icon={item.icon}
                    color={item.color}
                    variant={item.variant}
                    diaryProps={diaryProps}
                    handleDrag={drag}
                />
            </ScaleDecorator>
        )
    }

    return (
        <DraggableFlatList
            data={template}
            keyExtractor={(item) => item.id.toString()}
            onDragEnd={({ data }) => handleDragEnd(data)}
            renderItem={renderItem}
        />
    )
}