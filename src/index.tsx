import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProviders } from './context';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


ReactDOM.render(
  <AppProviders>
    <BrowserRouter>
      {/* 使用了路由懒加载，所以需要使用<Suspense>包起来 */}
      <Suspense fallback={<div></div>}>
        <Switch>
          <Route path="/" render={routerProps => {
            return <App {...routerProps}/>
          }}/>
        </Switch>
      </Suspense>
    </BrowserRouter>
  </AppProviders>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
