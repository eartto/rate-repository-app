import { View, Image, StyleSheet, Pressable } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    fullName: {
        fontWeight: theme.fontWeights.bold
    },
    flexContainer: {
        flexDirection: 'row',
    },
    flexContainerColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5,
    },
    tinyLogo: {
        padding: 5,
        width: 50,
        height: 50,
    },
});


const NumbersDisplay = (props) => {
    if (props.number >= 1000) {
        return (
            <View style={styles.flexContainerColumn}>
                <Text style={{ fontWeight: theme.fontWeights.bold }}>
                    {(props.number / 1000).toFixed(1)}k
                </Text>
                <Text color="textSecondary">
                    {props.string}
                </Text>
            </View>
        )
    } else {
        return (
            <View style={styles.flexContainerColumn}>
                <Text style={{ fontWeight: theme.fontWeights.bold }}>
                    {props.number}
                </Text>
                <Text color="textSecondary">
                    {props.string}
                </Text>
            </View>
        )
    }
}

const RepositoryItem = (props) => {
    const navigate = useNavigate()

    return (
        <View testID="repositoryItem" style={{ backgroundColor: 'white' }}>
            <Pressable onPress={() => navigate('/:id')}>
                <View style={styles.flexContainer}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: props.item.ownerAvatarUrl
                        }} />
                    <Text style={{
                        fontWeight: theme.fontWeights.bold, fontSize: 20
                    }}>
                        {props.item.fullName}
                    </Text>
                </View>
                <Text color="textSecondary" style={{ padding: 3 }}>
                    {props.item.description}
                </Text>
                <View style={{
                    backgroundColor: theme.colors.primary,
                    padding: 5,
                    alignSelf: 'flex-start',
                    borderRadius: 2,
                }}>
                    <Text style={{ color: theme.colors.white }}>
                        {props.item.language}
                    </Text>
                </View>
                <View style={styles.flexContainer}>
                    <NumbersDisplay number={props.item.stargazersCount} string={'Stars'} />
                    <NumbersDisplay number={props.item.forksCount} string={'Forks'} />
                    <NumbersDisplay number={props.item.reviewCount} string={'Reviews'} />
                    <NumbersDisplay number={props.item.ratingAverage} string={'Raiting'} />
                </View>
            </Pressable>
        </View>
    )
}

export default RepositoryItem;
