import { StyleSheet } from "react-native"
import { Link } from "react-router-native";

import Text from "./Text"

import theme from "../theme"

const styles = StyleSheet.create({
    heading: {
        fontSize: theme.fontSizes.heading,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.white,
        padding: 20,
        flexGrow: 1,
        textAlign: 'left',
        
    }
})

const AppBarTab = ({title, link}) => {
    return (
        <Link to={`/${link}`} >
            <Text style={styles.heading}>
                {title}
            </Text>
        </Link>
    )
}

export default AppBarTab