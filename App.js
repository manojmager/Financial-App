import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import store from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import TransactionScreen from './screens/transaction';
import SummaryScreen from './screens/summary';
import { Ionicons } from '@expo/vector-icons';
import TransactionDetailScreen from './screens/transactionDetail';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
	return (
		<Tab.Navigator>
			<Tab.Screen 
				name="Transactions" 
				component={TransactionStack} 
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="receipt-outline" color={color} size={size} />
					),
					headerShown: false
    			}}
			/>
			<Tab.Screen 
				name="Summary" 
				component={SummaryScreen} 
				options={{
					tabBarLabel: 'Summary',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="stats-chart-outline" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

const TransactionStack = () => {
	return (
	  <Stack.Navigator>
      <Stack.Screen name="Transaction" component={TransactionScreen} />
      <Stack.Screen name="Detail" component={TransactionDetailScreen} />
	  </Stack.Navigator>
	);
  };

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<MyTabs />
			</NavigationContainer>
		</Provider>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
