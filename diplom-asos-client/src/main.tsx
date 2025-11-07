import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {GoogleOAuthProvider} from "@react-oauth/google";
import {Provider} from "react-redux";
import {store} from "./store";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <GoogleOAuthProvider clientId={"688315354046-isd3q5qkjaj88uaj9oudrldsf18bm592.apps.googleusercontent.com"}>
          <App />
      </GoogleOAuthProvider>
  </Provider>,
)
