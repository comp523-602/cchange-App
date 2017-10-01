import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createHistory from 'history/createBrowserHistory';
import {autorun} from 'mobx';

const app = new App();

const history = createHistory({ basename: process.env.PUBLIC_URL});

history.listen((location, action) => {
    if(action === "POP") {
        console.log('route to', location.pathname);
    }
});

//app.doRoute(history.location.pathname);

autorun(() => {
    const path = app.currentPath;
    if(path !== history.location.pathname) {
        console.log('push', path);
        history.push(path);
    }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
