import React from "react";
import { createRoot} from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { store } from './store'
import { Provider } from 'react-redux'
// Vision UI Dashboard React Context Provider
import { VisionUIControllerProvider } from "context";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(<BrowserRouter>
  <VisionUIControllerProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </VisionUIControllerProvider>
</BrowserRouter>)

