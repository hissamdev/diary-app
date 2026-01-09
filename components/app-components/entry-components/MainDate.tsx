import { Text, StyleSheet } from "react-native";

type MainDateProps = {
    date: string;
}

export default function MainDate({ date }: MainDateProps) {
    return(
        <Text style={styles.dateText}>{date}</Text>
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