import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';



const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

export const RepositoryListContainer = ({ repositories }) => {
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <RepositoryItem item={item} />
            )
            }
        />
    );
};

const SearchBar = (props) => {

    return (
        <View>
            <TextInput
                placeholder='search'
                style={{ backgroundColor: 'white', padding: 4 }}
                value={props.searchInput}
                onChangeText={(text) => props.setSearchInput(text)}
            />
            <Picker selectedValue={props.sortBy}
                style={{ padding: 30 }}
                onValueChange={(itemValue, ItemIndex) =>
                    props.setSortBy(itemValue)
                }>
                <Picker.Item label='Sort repositories:' />
                <Picker.Item label='Latest repositories' value={{
                    orderBy: "CREATED_AT",
                    orderDirection: "DESC",
                }} />
                <Picker.Item label='Highest rated repositories' value={{
                    orderBy: "RATING_AVERAGE",
                    orderDirection: "DESC",
                }} />
                <Picker.Item label='Lowest rated repositories' value={{
                    orderBy: "RATING_AVERAGE",
                    orderDirection: "ASC",
                }} />
            </Picker>
        </View>
    )
}

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const [sortBy, setSortBy] = useState({})
    const [searchInput, setSearchInput] = useState('');
    const [debounceValue] = useDebounce(searchInput, 500);
    const { repositories, fetchMore } = useRepositories({ ...sortBy, searchKeyword: debounceValue, first: 6 });


    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];


    const onEndReach = () => {
        fetchMore();
    };

    return (
        <View>
            <FlatList
                ListHeaderComponent={<SearchBar searchInput={searchInput} setSearchInput={setSearchInput} sortBy={sortBy} setSortBy={setSortBy} />}
                style={{ paddingTop: 8, marginBottom: 210 }}
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                onEndReach={onEndReach}
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => (
                    <RepositoryItem item={item} />
                )
                }
            />
        </View>
    );
};

export default RepositoryList;