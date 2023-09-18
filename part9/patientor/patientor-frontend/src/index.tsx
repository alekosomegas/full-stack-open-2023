import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import AffiliateProvider from "./Wrapper"


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AffiliateProvider>
        <Router>
            <App />
        </Router>
    </AffiliateProvider>
)