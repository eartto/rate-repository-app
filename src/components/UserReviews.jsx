import { View, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import * as Linking from 'expo-linking'
import theme from '../theme';
import Text from './Text';
import { format } from "date-fns";
import { CURRENT_USER } from '../graphql/queries';
import { DELETEREVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    flexContainerRow: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'white',
    },
    flexContainerColumn: {
        flexDirection: 'column',
        padding: 5,
        backgroundColor: 'white',
    },
    flexContainerRoot: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        padding: 10,
    },
    flexContainerReview: {
        flexDirection: 'column',
        alignItems: 'left',
        padding: 5,
    },
    flexContainerButtons: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        width: '100%',
    },
    fullName: {
        fontWeight: theme.fontWeights.bold
    },
    tinyLogo: {
        padding: 5,
        width: 50,
        height: 50,
        borderRadius: 4,
    },
    raitingBox: {
        marginTop: 6,
        marginRight: 3,
        padding: 6,
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        alignItems: 'center',
    },
    button: {
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        paddingHorizontal: 35,
        paddingVertical: 10,
        borderRadius: 2,
    },
    buttonRed: {
        backgroundColor: theme.colors.error,
        alignItems: 'center',
        paddingHorizontal: 35,
        paddingVertical: 10,
        borderRadius: 2,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
    const { data, loading, refetch } = useQuery(CURRENT_USER, {
        variables:
            { includeReviews: true }
    }
    )
    const [mutate, result] = useMutation(DELETEREVIEW);


    const createTwoButtonAlert = (id) =>
        Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
            {
                text: 'CANCEL',
                style: 'cancel',
            },
            { text: 'DELETE', onPress: () => deleteReview(id) },
        ]);

    const deleteReview = async (id) => {
        const response = await mutate({
            variables:
                { deleteReviewId: id }
        })
        refetch()
        return response
    };


    if (!loading) {
        return (
            <View testID="userReviews" style={{ backgroundColor: '#e1e4e8', marginBottom: 210, }}>
                <FlatList
                    data={data.me.reviews.edges}
                    ItemSeparatorComponent={ItemSeparator}
                    renderItem={({ item }) => (
                        <View>
                            <View style={styles.flexContainerRoot}>
                                <View style={styles.flexContainerReview}>
                                    <View style={styles.flexContainerRow}>
                                        <View style={styles.raitingBox}>
                                            <Text style={{ fontWeight: theme.fontWeights.bold, color: theme.colors.primary }}>
                                                {item.node.rating}
                                            </Text>
                                        </View>
                                        <View style={styles.flexContainerColumn}>
                                            <Text style={styles.fullName}>
                                                {item.node.repository.fullName}
                                            </Text>
                                            <Text color="textSecondary">
                                                {format(item.node.createdAt, "dd/MM/yyyy")}
                                            </Text>
                                            <Text style={{ paddingRight: 30 }}>
                                                {item.node.text}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.flexContainerButtons}>
                                    <Pressable style={styles.button} onPress={() => Linking.openURL(item.node.repository.url)}>
                                        <Text style={{ color: theme.colors.white, fontWeight: theme.fontWeights.bold }}>View repository</Text>
                                    </Pressable>
                                    <Pressable style={styles.buttonRed} onPress={() => createTwoButtonAlert(item.node.id)}>
                                        <Text style={{ color: theme.colors.white, fontWeight: theme.fontWeights.bold }}>Delete review</Text>
                                    </Pressable>
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

export default UserReviews