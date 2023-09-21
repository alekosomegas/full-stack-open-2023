import { View, StyleSheet, ScrollView } from 'react-native'

import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'

import theme from '../theme'

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: theme.bgColors.base,
        justifyContent: 'space-around'
	},
})

const AppBar = () => {
	return (
		<View style={styles.container}>
            <ScrollView horizontal >
                <AppBarTab title={"Repositories"} link={'repositories'}/>
                <AppBarTab title={"SignIn"} link={'sign-in'} />
            </ScrollView>
		</View>
	)
}

export default AppBar
