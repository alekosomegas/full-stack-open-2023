import { View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: theme.bgColors.base
	},
    heading: {
        fontSize: theme.fontSizes.heading,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.white,
        padding: 20,
        flexGrow: 1,
        textAlign: 'left',
        
    }
})

const AppBar = ({ title }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>
			    {title}
            </Text>
		</View>
	)
}

export default AppBar
