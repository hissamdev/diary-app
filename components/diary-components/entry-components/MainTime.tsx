import { View, Text, StyleSheet } from "react-native";
import { Moon } from "lucide-react-native";

type Props = {
    timeProps: string
}

export default function MainTime({ timeProps }: Props) {
    return(
        <View style={styles.container}>
            <View>
                <Moon color="#94A3B8" size={12} />
            </View>

            <Text style={{ fontSize: 11, fontWeight: 700, color: '#6366F1' }}>{timeProps}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    }
})