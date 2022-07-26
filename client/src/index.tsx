import ReactDOM from 'react-dom/client';
import App from './App';
import { createContext } from 'react';
import { storeBuilder } from "./store/store.builder";
import './index.css';

export const Context = createContext(storeBuilder)

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Context.Provider value={storeBuilder}>
        <App />
    </Context.Provider>
);
