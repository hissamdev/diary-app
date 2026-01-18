import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, processColor, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import Popover from 'react-native-popover-view';
import { db } from "../../../../db";
import { templateTable } from "../../../../db/schema";

type Props = {
    visible: boolean,
    onClose: () => void,
}

type PropertyType = 'checkbox' | 'dropdown' | 'slider' | null;
type PropertyArray = {
    id: PropertyType,
    text: string,
    icon: string,
}

export default function CreateProperty({ visible, onClose }: Props) {
    const propertyTypes: PropertyArray[] = [
        { id: 'checkbox', text: 'Checkbox', icon: 'square-check' },
        { id: 'dropdown', text: 'Dropdown', icon: 'arrow-down' },
        { id: 'slider', text: 'Slider', icon: 'sliders' }
    ]

    const [propertyName, setPropertyName] = useState('');
    const [selectedType, setSelectedType] = useState<PropertyType>(null); // Consider setting default to checkbox
    const [propertyVariant, setPropertyVariant] = useState('box-toggle');
    const [propertyIcon, setPropertyIcon] = useState('check');
    const [propertyColor, setPropertyColor] = useState('#10B9811a');
    const [propertyData, setPropertyData] = useState({ isChecked: false }); // Default data will be passed through the creation process

    const handleCreate = async () => {
        try { await db.insert(templateTable).values(
            {
                name: propertyName,
                type: selectedType,
                variant: propertyVariant,
                icon: propertyIcon,
                color: propertyColor,
                data: propertyData,
            })
        } catch(err) {
            console.error('Error: ', err);
        }
    }

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.boxContainer}>
                        <Text style={styles.boxHeading}>Create Property</Text>

                        <View style={styles.boxContent}>
                            <View style={styles.infoRow}>
                                <View>
                                    <Text style={{ paddingBottom: 6, textAlign: 'center' }}>Icon</Text>
                                    <View style={styles.iconPicker}><Pressable></Pressable></View>
                                </View>
                                <View style={{ flex: 1, }}>
                                    <Text style={{ paddingBottom: 6 }}>Property Name</Text>
                                    <TextInput id="property-name" textAlignVertical="center" onChangeText={setPropertyName} style={styles.nameInput} />
                                </View>
                            </View>

                            {/* Select property type boxes */}
                            <View style={styles.propertyTypeRow}>
                                { propertyTypes.map(type => {
                                    const active = selectedType === type.id;
                                    return (
                                        <Pressable key={type.id} onPress={() => setSelectedType(type.id)} style={[styles.typeStructure, styles.typeInactive, active && styles.typeActive]}>
                                            <FontAwesome6 name={type.icon} size={15} color={active ? "white" : "#94a3b8"} />
                                            <Text style={[styles.labelStructure, styles.labelInactive, active && styles.labelActive]}>{type.text}</Text>
                                        </Pressable>
                                    )})}
                            </View>

                            <Pressable onPress={handleCreate} style={styles.createButton}>
                                <FontAwesome6 name={'check'} color='white' size={14} />
                                <Text style={styles.createText}>Create Property</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 0,
    },

    boxContainer: {
        width: 298,
        height: 300,
        paddingTop: 25,
        paddingHorizontal: 14,
        display: 'flex',
        backgroundColor: 'white'
    },

    boxHeading: {
        fontSize: 13,
        fontWeight: 900,
        letterSpacing: 0.5,
    },

    boxContent: {
        paddingTop: 18,
        display: 'flex',
        gap: 24.5
    },

    infoRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8.5,
    },

    iconPicker: {
        width: 31.5,
        aspectRatio: 1,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#0000004d'
    },

    nameInput: {
        paddingVertical: 0,
        paddingHorizontal: 9,
        height: 31.5,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#0000004d',
        fontSize: 10.5,
        fontWeight: 500,
        letterSpacing: 0.5,
    },

    propertyTypeRow: {
        height: 29.5,
        display: 'flex',
        flexDirection: 'row',
        gap: 7,
    },

    createButton: {
        marginTop: 33,
        width: '100%',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 6,
        backgroundColor: '#0F172A',
    },

    createText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 900,
        letterSpacing: 1,
    },

    typeStructure: {
        height: 60,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5.25,
        borderRadius: 8.75,
    },

    typeInactive: {
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)',
    },

    typeActive: {
        backgroundColor: '#4F46E5',
    },

    iconActive: {
        color: '#FFFFFF'
    },

    iconInactive: {
        color: '#94a3b8'
    },

    labelStructure: {
        fontSize: 8,
        fontWeight: 900,
        textTransform: 'uppercase',
    },

    labelActive: {
        color: 'white',
    },

    labelInactive: {
        color: '#94a3b8',
    }
})

/*

<Modal isVisible={visible} onBackdropPress={onClose} style={[styles.container, {position: 'absolute', top: 10}]}>
<View style={styles.modalContainer}>

</View>
</Modal>

*/