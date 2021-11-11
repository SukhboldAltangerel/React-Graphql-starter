import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ThemeStore } from 'utilities/contexts/theme.context'
import { UserStore } from 'utilities/contexts/user.context'
import { RecoilRoot } from 'recoil'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ThemeStore>
            <UserStore>
              <App />
            </UserStore>
          </ThemeStore>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
