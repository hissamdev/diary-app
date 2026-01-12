import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

type Props = {
    visible: boolean,
    onClose: () => void,
}

export default function CreateProperty({ visible, onClose }: Props) {
    return (
        <>
            
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 0,
    },

    modalContainer: {
        width: 298,
        height: 450,
        backgroundColor: 'white'
    }
})

/*

<Modal isVisible={visible} onBackdropPress={onClose} style={[styles.container, {position: 'absolute', top: 10}]}>
<View style={styles.modalContainer}>

</View>
</Modal>

*/