import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import CreateProperty from "./CreateProperty";
import { useState } from "react";

type Props = {
    visible: boolean,
    onClose: () => void,
}
type ModalType = 'create' | 'edit' | null;

// visible is a prop passed in, carries a boolean that is used for the built-in isVisible prop
// onClose is a callback function prop

export default function PropertySettings({ visible, onClose }: Props) {
    const [showPropertySettings, setShowPropertySettings] = useState<ModalType>(null);

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
                                <View style={{position: 'relative'}}>
                                    <Pressable onPress={() => setShowPropertySettings("create")} style={{width: 17.5, height: 17.5, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5.25, backgroundColor: '#4F46E5'}}><FontAwesome6 name={'plus'} size={9} color={'white'} /></Pressable>
                                    <CreateProperty visible={showPropertySettings === "create"} onClose={() => setShowPropertySettings(null)} />
                                </View>
                            </View>
                            <Text style={styles.modalSubheading}>Create, delete and update your properties from here</Text>
                        </View>

                        <Pressable style={{width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center', borderColor: '#94A3B8', borderRadius: 7, borderWidth: 1}}><FontAwesome6 name={'gear'} size={12} color={'#94A3B8'} /></Pressable>
                    </View>

                    <View style={styles.modalBody}>
                        <Text>Test</Text>
                    </View>
                </View>
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
    }
})