import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import DataLoader from './components/DataLoader';
import LeftPanel from './pages/LeftPanel';
import CenterPanel from './pages/CenterPanel';
import RightPanel from './pages/RightPanel';
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