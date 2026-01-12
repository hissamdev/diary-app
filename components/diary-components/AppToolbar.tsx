import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import TagsModal from "./menus/TagsModal";
import PropertySettings from "./menus/PropertySettings";

export default function AppToolbar() {

    type ModalType = "property-settings" | "tag-settings" | null;

    const [ showModal, setShowModal ] = useState<ModalType>(null);


    return (
        <>
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: '100%', height: 56, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.largeBox}>
                            <FontAwesome6 name="layer-group" size={12} color="#334155" />
                            <Text style={styles.textStyle} >Mode</Text>
                        </Pressable>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable onPress={() => setShowModal("property-settings")} style={[styles.largeBox]}>
                            <FontAwesome6 name="sliders" size={12} color="#334155" />
                            <Text style={styles.textStyle}>Properties</Text>

                            <PropertySettings visible={showModal === "property-settings"} onClose={() => setShowModal(null)}/>
                        </Pressable>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable style={[styles.largeBox]}>
                            <FontAwesome6 name="tags" size={12} color="#334155" />
                            <Text style={styles.textStyle}>Tags</Text>
                        </Pressable>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable onPress={() => setShowModal("tag-settings")} style={[styles.largeBox]}>
                            <FontAwesome6 name="plus" size={12} color="#334155" />
                            <Text style={styles.textStyle}>Note</Text>
                        </Pressable>

                        <TagsModal visible={showModal === "tag-settings"} onClose={() => setShowModal(null)}/>
                    </View>
                </View>
            </View>
        </>
    );
}

const {width} = Dimensions.get('window');
const NUM_BOXES = 4;
const GAP = 10;
const totalGap = GAP * (NUM_BOXES - 1);

const boxWidth = (width - totalGap - 21*2) / NUM_BOXES;


const styles = StyleSheet.create({
    buttonContainer: {
    flex: 1,
    },

    largeBox: {
        height: '100%',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5.25,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

    textStyle: {
        textTransform: 'uppercase',
        fontSize: 10,
        letterSpacing: 1,
        textAlign: 'center',
        color: '#64748B',
        fontWeight: 600
    }
})