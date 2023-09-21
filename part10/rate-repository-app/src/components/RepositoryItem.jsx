import { View, StyleSheet, Image, Dimensions } from 'react-native'
import Text from './Text'
import theme from '../theme'
import Tag from './Tag'
import { kFormatter } from '../utils'

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.bgColors.item,
        flex: 1,
        width: '100%',
        paddingTop: 10,
        padding: 5,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 20,
        marginLeft: 10,
    }
})

const RepositoryItem = ({item}) => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <Image style={styles.image} source={{uri: item.ownerAvatarUrl}}/>
                <View style={{gap: 10, flexShrink: 1}}>
                    <Text type="header">{item.fullName}</Text>
                    <Text style={{}}>{item.description}</Text>
                </View>
            </View>

            <View style={{paddingLeft: 110, width: 200}}>
                <Tag style={{flex:0}} text={item.language} />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', padding: 10}}>
                <View>
                    <Text fontWeight={'bold'}>Stars</Text>
                    <Text>{kFormatter(item.stargazersCount
                    )}</Text>
                </View>
                <View>
                    <Text fontWeight={'bold'}>Forks</Text>
                    <Text>{kFormatter(item.forksCount)}</Text>
                </View>
                <View>
                    <Text fontWeight={'bold'}>Reviews</Text>
                    <Text>{item.reviewCount}</Text>
                </View>
                <View>
                    <Text fontWeight={'bold'}>Rating</Text>
                    <Text>{item.ratingAverage}</Text>
                </View>
            </View>
        </View>
    )
}

export default RepositoryItem