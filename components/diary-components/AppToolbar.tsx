import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import TagsModal from "./menus/TagsModal";

export default function AppToolbar() {
    const [ showModal, setShowModal ] = useState(false);


    return (
        <>
            <View style={{paddingTop: 29, paddingRight: 21, paddingLeft: 21,  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                        <Pressable style={[styles.largeBox, {backgroundColor: '#A855F71a'}]}>
                            <FontAwesome6 name="images" size={20} color="#A855F7" />
                        </Pressable>
                        <Text style={{textAlign: 'center', color: '#64748B', fontWeight: 600}} >Photos</Text>
                    </View>

                    <View>
                        <Pressable style={[styles.largeBox, {backgroundColor: '#F59E0B1a',}]}>
                            <FontAwesome6 name="wand-magic-sparkles" size={19} color="#F59E0B" />
                        </Pressable>
                        <Text style={{textAlign: 'center', color: '#64748B', fontWeight: 600}} >Template</Text>
                    </View>

                    <View>
                        <Pressable style={[styles.largeBox, {backgroundColor: '#6366F11a',}]}>
                            <FontAwesome6 name="pen-to-square" size={20} color="#6366F1" />
                        </Pressable>
                        <Text style={{textAlign: 'center', color: '#64748B', fontWeight: 600}} >Write</Text>
                    </View>

                    <View>
                        <Pressable onPress={() => setShowModal(true)} style={[styles.largeBox, {backgroundColor: '#10B9811a',}]}>
                            <FontAwesome6 name="tags" size={20} color="#10B981" />
                        </Pressable>
                        <Text style={{textAlign: 'center', color: '#64748B', fontWeight: 600}} >Tags</Text>

                        <TagsModal visible={showModal} onClose={() => setShowModal(false)}/>
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
    largeBox: {
        width: boxWidth,
        aspectRatio: 1,
        marginBottom: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 14
    }
})