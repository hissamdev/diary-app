import { Text, StyleSheet } from "react-native";

type Props = {
    dateProps: string,
}

export default function MainDate({ dateProps }: Props) {
    return(
        <Text style={styles.dateText}>{dateProps}</Text>
    )
}

const styles = StyleSheet.create({
        dateText: {
        color: '#94A3B8',
        fontFamily: '',
        fontSize: 11.5,
        fontWeight: 700,
    }
})