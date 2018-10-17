import React from 'react';
import ReactDOM from 'react-dom';

import CountrySelect from './CountrySelect.js';

var callback = function dataManage(resp){
	let data = {
		name: resp.nativeName,
		flag: "https://www.countryflags.io/"+resp.alpha2Code+"/shiny/64.png",
	}
	return data;
}

ReactDOM.render(
  <CountrySelect 
	  // apiURL="https://restcountries.eu/rest/v2/name/"
	  // nameField="name" 
	  // flagField="flag" 
	  // dataCallback={callback}
	/>,
  document.getElementById('root')
);
