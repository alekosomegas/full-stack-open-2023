import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './components/RepositoryList';
import AppBar from './components/AppBar';
import SignIn from './components/SignIn';
import theme from './theme';

const Main = () => {
  return (
    <View style={styles.container}>
        <AppBar />
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexShrink: 1,
    backgroundColor: theme.bgColors.base,
  },
});

export default Main