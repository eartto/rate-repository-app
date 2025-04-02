import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { useQuery, useApolloClient } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import AuthStorage from '../utils/authStorage';

const styles = StyleSheet.create({
  flexContainer: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    paddingBottom: Constants.statusBarHeight,
    flexDirection: 'row',
  },
  text: {
    fontSize: 19,
    color: '#ffffff',
    padding: 8,
    fontFamily: theme.fonts.main,
  }
});

const AppBar = () => {
  const { data, loading } = useQuery(CURRENT_USER)
  const apolloClient = useApolloClient()
  const authStorage = new AuthStorage()


  const signOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.clearStore()
  }
  if (loading) {
    return null
  }

  if (data.me !== null) {
    return <View style={styles.flexContainer}>{/* ... */}
      <ScrollView horizontal >{/* ... */}
        <Link to="/">
          <Text style={styles.text}>
            Repositories
          </Text>
        </Link>
        <Pressable onPress={() => signOut()}>
          <Text style={styles.text}>
            Sign out
          </Text>
        </Pressable>
      </ScrollView>
    </View>;
  }
  else {
    return <View style={styles.flexContainer}>{/* ... */}
      <ScrollView horizontal >{/* ... */}
        <Link to="/">
          <Text style={styles.text}>
            Repositories
          </Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.text}>
            Sign in
          </Text>
        </Link>
      </ScrollView>
    </View>;
  }
};

export default AppBar;