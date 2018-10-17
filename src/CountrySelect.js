import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Dropdown from './Dropdown.js';

var CancelToken = axios.CancelToken;
var cancel;

export default class CountrySelect extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        value: '',
        nameField: this.props.nameField ? this.props.nameField : 'name',
        flagField: this.props.flagField ? this.props.flagField : 'flag',
        apiURL: this.props.apiURL ? this.props.apiURL : `https://restcountries.eu/rest/v2/name/`,
        dropdownOpen: false,
        selectedItem: 0
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.handleNavigation = this.handleNavigation.bind(this);
  }

  /**
   * Fetching data from API
   * @param  {string} input - user input from field
   * @return {void}         - we're just leaving promises
   *                          and updating state in that method 
   */
  fetchData(input) {
    if (cancel != undefined) {
        cancel();
    }
    return axios.get( this.state.apiURL + input, {
        cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
        }),
    })
    .then(response => {
      this.fillData(response.data);
    })
    .catch(error => {
        if (!!error.data && error.data.status === 404) {
          this.setState({data: []});
        }
    });
}


  /**
   * Method composing array of data based on 
   *  response and updating state of 
   * a component
   * @param  {object} response - contains objects recieved from api
   * @return {void}            - just updating state here
   */
  fillData(resData){
    let data = [];
    for (var i = 0; i <= resData.length - 1; i++) {
      if (typeof this.props.dataCallback === 'function') {
        data.push(this.props.dataCallback(resData[i]));
      }
      else{
        data.push({
          name: resData[i][this.state.nameField],
          flag: resData[i][this.state.flagField]
        });
      }
    }
    this.setState({
      data: data,
      selectedItem: 0
    });
  }

  handleChange(event) {
      this.setState({value: event.target.value});
      if (event.target.value !== '') {
        this.fetchData(event.target.value)
      }
  }

  handleClick(i){
    this.setState({
      value: this.state.data[i].name,
      data: {}
    });
  }

  toggleDropdown(){
    // я это исправлю, честно, но уже не сегодня :'D
    setTimeout(() => { this.setState({dropdownOpen: !this.state.dropdownOpen}) }, 200);
  }

  handleNavigation(e){
    if (!!this.state.data) {
      // Moving up
      if (e.keyCode === 40 && this.state.selectedItem < this.state.data.length - 1) {
        e.preventDefault();
        this.setState({selectedItem: this.state.selectedItem + 1});
      }
      // Moving down
      else if (e.keyCode === 38 && this.state.selectedItem > 0) {
        e.preventDefault();
        this.setState({selectedItem: this.state.selectedItem - 1});
      }
      // handle enter
      if (e.keyCode === 13 && !!this.state.data[this.state.selectedItem]) {
        this.setState({
          value: this.state.data[this.state.selectedItem].name,
        });
        var input = ReactDOM.findDOMNode(this.refs.input);
        input.blur();
      }
    }
  }

  render() {
    let dropdown = '';
    if (this.state.dropdownOpen) {
      dropdown = <Dropdown 
                  selectedItem={this.state.selectedItem} 
                  handleHover={ this.handleHover } 
                  handleClick={  this.handleClick } 
                  data={ this.state.data } 
                />
    }
    return (
        <div onBlur={this.toggleDropdown} className="country-select">
          <input 
              type="text"
              ref="input"
              onFocus={this.toggleDropdown}
              value={this.state.value} 
              onChange={this.handleChange} 
              onKeyDown={this.handleNavigation} 
              placeholder="Choose country..." 
            />
              {
                dropdown
              }
        </div> 
    );
  }
}



