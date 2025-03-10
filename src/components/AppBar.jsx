import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

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
};

export default AppBar;