import React from 'react';
import { createStore} from 'redux';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import Home from './src/components/Home/Home';
import Stage from './src/components/Stage';
import rootReducer from './src/store/rootReducer';

const RootStack = createStackNavigator({
  Home: Home,
  Stage: Stage,
},
{
  initialRouteName: 'Home',
});

const store = createStore(rootReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack/>
      </Provider>
    );
  }
}
