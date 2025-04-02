import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  })
  if (loading) {
    return { undefined, loading, refetch };
  }
  else {
    const repositories = data.repositories
    return { repositories, loading, refetch };

  }
};

export default useRepositories;