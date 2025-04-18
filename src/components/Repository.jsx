import { View, Image, StyleSheet, Pressable, FlatList } from 'react-native';
import theme from '../theme';
import Text from './Text';
import * as Linking from 'expo-linking'
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import { format } from "date-fns";


const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    fullName: {
        fontWeight: theme.fontWeights.bold
    },
    flexContainer: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'white',
    },
    flexContainerColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5,
    },
    flexContainerReview: {
        flexDirection: 'column',
        alignItems: 'left',
        padding: 5,
    },
    tinyLogo: {
        padding: 5,
        width: 50,
        height: 50,
        borderRadius: 4,
    },
    raitingBox: {
        padding: 5,
        width: 34,
        height: 34,
        borderRadius: 17,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        alignItems: 'center',
    },
    button: {
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        padding: 18,
        borderRadius: 2,
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const NumbersDisplay = (repository) => {
    if (repository.number >= 1000) {
        return (
            <View style={styles.flexContainerColumn}>
                <Text style={{ fontWeight: theme.fontWeights.bold }}>
                    {(repository.number / 1000).toFixed(1)}k
                </Text>
                <Text color="textSecondary">
                    {repository.string}
                </Text>
            </View>
        )
    } else {
        return (
            <View style={styles.flexContainerColumn}>
                <Text style={{ fontWeight: theme.fontWeights.bold }}>
                    {repository.number}
                </Text>
                <Text color="textSecondary">
                    {repository.string}
                </Text>
            </View>
        )
    }
}

const RepositoryDisplay = () => {
    const id = useParams().id
    const { repository } = useRepository({ repositoryId: id, first: 2 })

    if (repository) {
        return (
            <View testID="repository" style={{ backgroundColor: 'white', padding: 8, marginBottom: 10 }}>
                <View style={styles.flexContainer}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: repository.ownerAvatarUrl
                        }} />
                    <Text style={{
                        fontWeight: theme.fontWeights.bold, fontSize: 20
                    }}>
                        {repository.fullName}
                    </Text>
                </View>
                <Text color="textSecondary" style={{ padding: 3 }}>
                    {repository.description}
                </Text>
                <View style={{
                    backgroundColor: theme.colors.primary,
                    padding: 5,
                    alignSelf: 'flex-start',
                    borderRadius: 2,
                }}>
                    <Text style={{ color: theme.colors.white }}>
                        {repository.language}
                    </Text>
                </View>
                <View style={styles.flexContainer}>
                    <NumbersDisplay number={repository.stargazersCount} string={'Stars'} />
                    <NumbersDisplay number={repository.forksCount} string={'Forks'} />
                    <NumbersDisplay number={repository.reviewCount} string={'Reviews'} />
                    <NumbersDisplay number={repository.ratingAverage} string={'Raiting'} />
                </View>
                <Pressable style={styles.button} onPress={() => Linking.openURL(repository.url)}>
                    <Text style={{ color: theme.colors.white, fontWeight: theme.fontWeights.bold }}>Open in GitHub</Text>
                </Pressable>
            </View>
        )
    }
    else {
        return (
            null
        )
    }

}

const Repository = () => {
    const id = useParams().id
    const { repository, fetchMore } = useRepository({ repositoryId: id, first: 4 })


    const onEndReach = () => {
        fetchMore();
    };

    if (repository) {
        return (
            <View testID="repository" style={{ backgroundColor: '#e1e4e8', padding: 8, marginBottom: 200 }}>
                <FlatList
                    ListHeaderComponent={RepositoryDisplay}
                    data={repository.reviews.edges}
                    ItemSeparatorComponent={ItemSeparator}
                    onEndReach={onEndReach}
                    onEndReached={onEndReach}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => (
                        <View>
                            <View style={styles.flexContainer}>
                                <View style={styles.raitingBox}>
                                    <Text style={{ fontWeight: theme.fontWeights.bold, color: theme.colors.primary }}>
                                        {item.node.rating}
                                    </Text>
                                </View>
                                <View style={styles.flexContainerReview}>
                                    <Text style={styles.fullName}>
                                        {item.node.user.username}
                                    </Text>
                                    <Text color="textSecondary">
                                        {format(item.node.createdAt, "dd/MM/yyyy")}
                                    </Text>
                                    <Text>
                                        {item.node.text}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )
                    }
                />
            </View>
        )
    }
    else {
        return (
            null
        )
    }
}

export default Repository