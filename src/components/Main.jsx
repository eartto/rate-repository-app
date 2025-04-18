import { View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import Repository from './Repository';
import CreateReview from './CreateReview';
import UserReviews from './UserReviews';
import SignUp from './SignUp';

const Main = () => {

  return (
    <View style={{ backgroundColor: '#e1e4e8' }}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/repository/:id" element={<Repository />} />
        <Route path="/createreview" element={<CreateReview />} />
        <Route path="/userreviews" element={<UserReviews />} />
      </Routes>
    </View>
  );
};

export default Main;