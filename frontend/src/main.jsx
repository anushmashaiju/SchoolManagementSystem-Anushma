import 'bootstrap/dist/css/bootstrap.min.css'; 
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './App';
import store from './redux-toolkit/store'; 
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </StrictMode>
);
