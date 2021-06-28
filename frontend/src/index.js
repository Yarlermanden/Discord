import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MetaTags from 'react-meta-tags';

ReactDOM.render(
  <React.StrictMode>
    <MetaTags>
		<title>Website Name</title>
		<meta content="Embed Title" property="og:title"/>
		<meta content="Site Description" property="og:description"/>
		<meta content="https://embed.com/this-is-the-site-url" property="og:url"/>
		<meta content="https://embed.com/embedimage.png" property="og:image"/>
		<meta content="#43B581" data-react-helmet="true" name="theme-color"/>
	  </MetaTags>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
