import App from './src/App'
import QueryClientProvider from './src/QueryClientProvider';
import { StyleSheet } from 'react-native';

export default function Main() {
  return (
    <QueryClientProvider>
      <App/>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
