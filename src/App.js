import React,{Component}from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import displayTable from './components/displayTable';

function App(props){
 
      return(
        <BrowserRouter>
            <Switch>
              <Route path='/' exact component = {displayTable}/>
             
            </Switch>
        </BrowserRouter>
      );
}

export default App;
