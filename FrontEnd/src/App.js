import TodoApp from './Components/Todo/Todo';
import { Provider } from 'react-redux';
import store from './Redux/Store';

const  App = () => (
    <Provider store={store}>
        <TodoApp/>
    </Provider>
)

export default App;
