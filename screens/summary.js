import { Text, View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { selectHighestSpending, selectLeastAmountTransaction, selectTotalAmount, selectTotalTransactions } from '../redux/transactionSlice';

export default function SummaryScreen() {

    const totalAmount = useSelector(selectTotalAmount)
    const totalTransactions = useSelector(selectTotalTransactions)
    const highestSpending = useSelector(selectHighestSpending)
    const lowestSpending = useSelector(selectLeastAmountTransaction)


    return (
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Summary</Text>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Total Amount:</Text>
              <Text style={styles.value}>${totalAmount}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Total Transactions:</Text>
              <Text style={styles.value}>{totalTransactions}</Text>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.title}>Spending Analysis</Text>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Highest Spending:</Text>
              <Text style={styles.value}>{highestSpending.title} - Amount: ${highestSpending.amount}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Lowest Spending:</Text>
              <Text style={styles.value}>{lowestSpending.title} - Amount: ${lowestSpending.amount}</Text>
            </View>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
      flex: 1,
      margin: 10,
      backgroundColor: '#ffffff',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    detailContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 10,
    },
    value: {
      fontSize: 16,
    },
  });
