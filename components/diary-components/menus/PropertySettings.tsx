import { View } from "react-native";
import Modal from "react-native-modal";

type Props = {
    visible: boolean,
    onClose: () => void,
}

export default function PropertySettings({ visible, onClose }: Props) {
    return (
        <>
            <Modal isVisible={visible}  >
                <View>

                </View>
            </Modal>
        </>
    )
}