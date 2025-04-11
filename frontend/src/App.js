import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import DataLoader from './components/DataLoader';
import LeftPanel from './components/LeftPanel';
import CenterPanel from './components/CenterPanel';
import RightPanel from './components/RightPanel';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <DataLoader>
        <div className="app-container">
          <LeftPanel />
          <CenterPanel />
          <RightPanel />
        </div>
      </DataLoader>
    </Provider>
  );
}

export default App;