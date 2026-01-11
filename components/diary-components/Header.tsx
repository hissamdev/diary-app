import { View, Pressable, StyleSheet } from "react-native";
import { Bell, Menu } from "lucide-react-native";

export default function Header() {
    return (
        <>
            <View style={styles.container}>
                <Pressable>
                    <Menu width={23} height={23} color={'#627093'} />
                </Pressable>

                <View style={styles.headerRight}>
                    <Pressable>
                        <Bell width={23} height={23} color={'#627093'} />
                    </Pressable>

                    <Pressable>
                        <View style={styles.profileIcon} >
                        </View>
                    </Pressable>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 13,
        paddingRight: 21,
        paddingBottom: 13,
        paddingLeft: 21,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },

    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,
    },

    profileIcon: {
        width: 32,
        height: 32,
        borderRadius: 9999,
        backgroundColor: 'black'
    }
})