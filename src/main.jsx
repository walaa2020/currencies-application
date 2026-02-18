
import { createRoot } from 'react-dom/client'
import './index.css'
import CurrencyConverter from "./pages/currencyConverter/CurrencyConverter.jsx"

import { Provider } from 'react-redux'
import store from './store'
createRoot(document.getElementById('root')).render(
<Provider store={store}> 
    <CurrencyConverter />
  
    </Provider>
   
  
)
