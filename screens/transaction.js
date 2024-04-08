import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator, Button, Modal, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ListItem from '../components/listItem';
import { firebaseHelper } from '../firebase';
import { addTransaction, fetchDataSuccess } from '../redux/transactionSlice';


function TransactionScreen(props) {
	const transactions = useSelector((store) => store.transaction)
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("")
	const [modalVisible, setModalVisible] = useState(false);
	const [newTransaction, setNewTransaction] = useState({ title: '', amount: '', address: '', date: '' });


	const dispatch = useDispatch()

	useEffect(() => {
		fetchItems();
	}, [dispatch]);

	const fetchItems = async () => {
		const fetchedItems = [];
		setLoading(true)
		setError('')

		await firebaseHelper.fetchTransactions()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					var data = doc.data()
					data.id = doc.id
					fetchedItems.push(data)
				});
				dispatch(fetchDataSuccess(fetchedItems));
			})
			.catch((error) => {
				setError("Error fetching data")
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const handleAddTransaction = async () => {
		try {
			const docRef = await firebaseHelper.addTransaction(newTransaction);
			const newTransactionWithId = { id: docRef.id, ...newTransaction };
			dispatch(addTransaction(newTransactionWithId))
			setModalVisible(false);
			setNewTransaction({ title: '', amount: '', address: '', date: '' });
		} catch (error) {
			console.error('Error adding transaction:', error);
		}
	};

	if (loading) {
		return <Text>Loading...</Text>;
	}

	if (transactions.length < 1) {
		return (
			<View style={styles.container}>
				<AddModal
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					newTransaction={newTransaction}
					setNewTransaction={setNewTransaction}
					handleAddTransaction={handleAddTransaction}
				/>

				<Text>You don't have any transactions.</Text>
				<Button title="Add Transaction" onPress={() => setModalVisible(true)} />
			</View>
		)
	}

	if (error) {
		return <Text>Error: {error}</Text>;
	}

	return (
		<View style={styles.container}>
			<AddModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				newTransaction={newTransaction}
				setNewTransaction={setNewTransaction}
				handleAddTransaction={handleAddTransaction}
			/>

			<FlatList
				data={transactions}
				renderItem={({ item }) => <ListItem transaction={item} navigation={props.navigation} />}
				keyExtractor={(item) => item.id}
			/>
			<Button title="Add Transaction" onPress={() => setModalVisible(true)} />
		</View>
	);

}

const AddModal = ({ modalVisible, setModalVisible, newTransaction, setNewTransaction, handleAddTransaction }) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => setModalVisible(false)}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<TextInput
						style={styles.input}
						placeholder="Title"
						value={newTransaction.title}
						onChangeText={(text) => setNewTransaction({ ...newTransaction, title: text })}
					/>
					<TextInput
						style={styles.input}
						placeholder="Amount"
						value={newTransaction.amount}
						onChangeText={(text) => setNewTransaction({ ...newTransaction, amount: text })}
						keyboardType="numeric"
					/>
					<TextInput
						style={styles.input}
						placeholder="Address"
						value={newTransaction.address}
						onChangeText={(text) => setNewTransaction({ ...newTransaction, address: text })}
					/>
					<TextInput
						style={styles.input}
						placeholder="Date"
						value={newTransaction.date}
						onChangeText={(text) => setNewTransaction({ ...newTransaction, date: text })}
					/>
					<View style={styles.buttonContainer}>
                        <Button style={styles.button} title="Save" onPress={handleAddTransaction} />
                    </View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	},
	separator: {
	  height: 1,
	  backgroundColor: '#ccc',
	},
	emptyText: {
	  alignSelf: 'center',
	  marginTop: 20,
	  fontSize: 16,
	  color: '#999',
	},
	modalContainer: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
	  backgroundColor: '#fff',
	  borderRadius: 15,
	  width: '90%',
	  maxWidth: 400,
	  height: '40%',
	  padding: 20,
	  shadowColor: '#000',
	  shadowOffset: {
		width: 0,
		height: 3,
	  },
	  shadowOpacity: 0.27,
	  shadowRadius: 4.65,
	  elevation: 6,
	},
	inputContainer: {
	  marginBottom: 20,
	},
	inputLabel: {
	  marginBottom: 5,
	  fontSize: 16,
	  fontWeight: 'bold',
	  color: '#333',
	},
	input: {
	  height: 40,
	  borderColor: '#ccc',
	  borderWidth: 1,
	  borderRadius: 5,
	  margin: 5,
	  paddingHorizontal: 10,
	},
	buttonContainer: {
		marginTop: 60,
		justifyContent: 'center',
	},
	button: {
		borderRadius: 5,
		backgroundColor: '#007AFF',
	},
	buttonText: {
	  color: '#fff',
	  fontSize: 16,
	},
  });

export default TransactionScreen;