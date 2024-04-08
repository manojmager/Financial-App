import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function ListItem({navigation, transaction}) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{transaction.title}</Text>

            <TouchableOpacity onPress={() => {navigation.navigate('Detail', transaction)}}>
                <View style={styles.clickable}>
                    <Text style={{fontWeight: "bold", color: "blue"}}>${transaction.amount}</Text>
                    <Ionicons name="chevron-forward-sharp" color="blue" size={20} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: 10,
        borderBottomWidth: 2,
        borderColor: 'grey',
        borderRadius: 1,
    },
    clickable: {
        display: "flex",
        flexDirection: "row",
        color: "blue"
    },
    text: {
        fontSize: 15,
        fontWeight: "bold"
    },
})