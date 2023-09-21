import { View, StyleSheet } from "react-native"
import theme from "../theme"
import Text from "./Text"

const styles = StyleSheet.create({
    tag: {
        backgroundColor: theme.bgColors.tag,
        padding: 5,
        borderRadius: 5,
        width: '100%',
        flex: 0
    }
})

const Tag = ({text}) => {
    return (
        <View style={styles.tag}>
            <Text style={{textAlign: 'center'}} color={"white"}>{text}</Text>
        </View>
    )
}

export default Tag