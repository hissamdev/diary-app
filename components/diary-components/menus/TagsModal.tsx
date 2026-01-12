import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Modal from 'react-native-modal';

type Props = {
    visible: boolean,
    onClose: () => void
}

export default function TagsModal({ visible, onClose }: Props) {
    return (
        <Modal isVisible={visible} animationIn={'slideInUp'} onBackdropPress={onClose} backdropTransitionOutTiming={1} 

        swipeDirection={'down'}
        onSwipeComplete={onClose}
        swipeThreshold={70}
        propagateSwipe={true}
        
        style={{ margin: 0, width: '100%', justifyContent: 'flex-end', alignItems: 'center'}}
        >
            
            <View style={styles.modalContainer}>
                <ScrollView showsVerticalScrollIndicator={true}>
                    <View style={{justifyContent: 'flex-end', height: 2000}}>
                        <Text>Hey</Text>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({

    modalContainer: {
        width: '100%',
        height: '70%',
        backgroundColor: 'white',
    }
})