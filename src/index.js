import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Routes/RoutesHome.js';
import Cookies from './Routes/RoutesCookies.js'
import PrivacyPolicy from './Routes/RoutesPrivacyPolicy.js'
import TermsConditions from './Routes/RoutesTerms&Conditions.js'
import Copyright from './Routes/RoutesCopyright.js'
import Search from './Routes/RoutesSearch.js'
import RoutesDocuments from './Routes/RoutesDocuments.js'
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import RoutesCreateDocuments from './Routes/RoutesCreateDocuments.js';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow-x: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  li {
    list-style: none;    
  }

  a {
    text-decoration: none; /* Remove o sublinhado padrão */
    color: inherit; /* Herda a cor do pai */
  }
`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle/>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cookies' element={<Cookies/>}/>
        <Route path='/privacypolicy' element={<PrivacyPolicy/>}/>
        <Route path='/copyright' element={<Copyright/>}/>
        <Route path='/terms&conditions' element={<TermsConditions/>}/>
        <Route path='/search/:query' element={<Search/>}/>
        <Route path='/search/document/:id' element={<RoutesDocuments/>}/>
        <Route path='/teste/create' element={<RoutesCreateDocuments/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
