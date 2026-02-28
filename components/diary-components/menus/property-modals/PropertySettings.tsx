import { FontAwesome6 } from "@expo/vector-icons";
import { Easing, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import CreateProperty from "./CreateProperty";
import { useState, useRef, useEffect, FC } from "react";
import Popover, { PopoverMode, PopoverPlacement, Rect } from "react-native-popover-view";
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist'

// Components
import BoxToggle from "../../../property-templates/editable/checkbox-variants/BoxToggle";
import { db } from "../../../../db";
import { templateTable } from "../../../../db/schema";
import { DiaryTableTypes } from "../../entry-components/EntryBody";
import DropdownDisplay from "../../../property-templates/display/dropdowns/DropdownDisplay";
import MultiselectDisplay from "../../../property-templates/display/multiselect/MultiselectDisplay";
import { eq } from "drizzle-orm";

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

// visible is a prop passed in, carries a boolean that is used for the built-in isVisible prop
// onClose is a callback function prop

export default function PropertySettings({ visible, onClose }: Props) {
    const [template, setTemplate] = useState<Properties[]>([]);
    const [showPropertySettings, setShowPropertySettings] = useState<ModalType>(null);
    const createPropertyRef = useRef<View>(null);

    // Store the template into state
    useEffect(() => {
        async function fetchTemplate() {
            try {
                const result = await db.select().from(templateTable);

                setTemplate(result);
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

    const handleDragEnd = async (newData) => {
        setTemplate(newData)

        try {
            await db.transaction(async (tx) => {
                for (let i = 0; i < newData.length; i++) {
                    await tx
                        .update(templateTable)
                        .set({ order: i })
                        .where(eq(templateTable.id, newData[i].id))
                }
            })
        } catch (error) {
            console.error("Failed to persist order: ", error)
        }
        await db.transaction(async (tx) => {
            for (let i = 0; i < newData.length; i++) {
                await tx
                    .update(templateTable)
                    .set({ order: i })
                    .where(eq(templateTable.id, newData[i].id))
            }
        })
    }

    const renderItem = ({ item, drag, isActive }) => {
        const Property = componentList[item.variant];
        if (!Property) return <Text>Not Found</ Text>

        return (
            <ScaleDecorator>
                <TouchableOpacity
                    onLongPress={drag}
                    disabled={isActive}


                >
                    <Property
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        icon={item.icon}
                        color={item.color}
                        variant={item.variant}
                    />
                </TouchableOpacity>
            </ScaleDecorator>
        )
    }
    


    return (
        <>
            <Modal
                isVisible={visible} onBackdropPress={onClose}
                style={styles.container}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <View>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 7}}>
                                <Text style={styles.modalHeading}>Property Settings</Text>
                                <View ref={createPropertyRef} collapsable={false}>
                                    <Pressable onPressIn={() => setShowPropertySettings("create")} style={styles.createPropertyIcon}><FontAwesome6 name={'plus'} size={9} color={'white'} /></Pressable>
                                    
                                </View>
                            </View>
                            <Text style={styles.modalSubheading}>Create, delete and update your properties from here</Text>
                        </View>

                        <Pressable style={{width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center', borderColor: '#94A3B8', borderRadius: 7, borderWidth: 1}}><FontAwesome6 name={'gear'} size={12} color={'#94A3B8'} /></Pressable>
                    </View>

                    <View style={styles.modalBody}>
                        <DraggableFlatList
                            data={template}
                            onDragEnd={({data}) => handleDragEnd(data)}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                        />
                    </View>
                </View>
                
                {/* @ts-ignore */}
                <Popover
                    isVisible={showPropertySettings === "create"}
                    onRequestClose={() => setShowPropertySettings(null)}
                    backgroundStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                    popoverStyle={styles.popoverStyles}
                    arrowSize={{width: 0, height: 0,}}
                    offset={5}
                    animationConfig={{
                        duration: 200,

                    }}>
                        <CreateProperty visible={showPropertySettings === "create"} onClose={() => setShowPropertySettings(null)} />
                        
                </Popover>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 0,
        justifyContent: 'flex-end',
    },

    modalContent: {
        paddingTop: 31,
        paddingHorizontal: 21,
        height: '60%',
        backgroundColor: 'white',
        borderTopRightRadius: 13,
        borderTopLeftRadius: 13,
    },

    modalHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    createPropertyIcon: {
        width: 17.5, height: 17.5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5.25,
        backgroundColor: '#4F46E5'
    },

    modalHeading: {
        fontSize: 10,
        letterSpacing: 0.5,
        fontWeight: 900,
        textTransform: 'uppercase',
    },

    modalSubheading: {
        paddingTop: 3.5,
        fontSize: 10,
        color: '#64748B'
    },
    
    modalBody: {
        paddingTop: 21,
        display: 'flex',
        gap: 10,
    },

    popoverStyles: {
        borderWidth: 0,
        backgroundColor: 'black'
    }
})

//mode={PopoverMode.JS_MODAL}
// placement={PopoverPlacement.BOTTOM}
// easing: Easing.out(Easing.back(1.5)),