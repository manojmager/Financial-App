import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit';
import { db, firebaseHelper } from '../firebase';

export const transactionSlice = createSlice({
	name: 'transaction',
	initialState: [],
	reducers: {
		fetchDataSuccess: (state, action) => {
			return action.payload
		},
		addTransaction: (state, action) => {
			state.push(action.payload)
		}
	}
})

const saveTransactionToFB = (title, address, amount, date) => {
	db.collection("transactions").add({
		title: title,
		address: address,
		amount: amount,
		date: date
	})
	.then((docRef) => {
		console.log("Document with ID: ", docRef.id);
	})
	.catch((error) => {
		console.error("Error adding document: ", error);
	});
}

export const selectTotalAmount = (state) => state.transaction.reduce((total, { amount }) => total + parseFloat(amount), 0);
export const selectTotalTransactions = (state) => state.transaction.length;

export const selectHighestSpending = createSelector(
	state => state.transaction,
	transactions => {
		if (transactions.length === 0) return null;
		return transactions.reduce((max, current) => {
			return parseFloat(current.amount) > parseFloat(max.amount) ? current : max;
		});
	}
);

export const selectLeastAmountTransaction = createSelector(
	state => state.transaction,
	transactions => {
		if (transactions.length === 0) return null;
		return transactions.reduce((min, current) => {
			return parseFloat(current.amount) < parseFloat(min.amount) ? current : min;
		});
	}
);

export const { fetchDataSuccess, addTransaction} = transactionSlice.actions;

export default transactionSlice.reducer