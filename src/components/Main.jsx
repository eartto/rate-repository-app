import { View } from 'react-native';
import { Route, Routes, Navigate, useParams } from 'react-router-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import Repository from './Repository';

const Main = () => {
  const l = useParams()

  console.log(l)

  return (
    <View style={{ backgroundColor: '#e1e4e8' }}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/repository:id" element={<Repository />} />
      </Routes>
    </View>
  );
};

export default Main;