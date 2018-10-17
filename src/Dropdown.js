import React from 'react';
import ReactDOM from 'react-dom';

export default class Dropdown extends React.Component{
  renderRows(rows){
    let renderedRows = [];
    if (!!rows) {
      for (var i = 0; i < rows.length; i++) {
        renderedRows.push( 
          this.renderRow(i)
        );
      }
    }
    return renderedRows;
  }

  renderRow(i){
    const active = i === this.props.selectedItem ? 'active' : '';  
    return(
        <div className={active} onClick={ () =>  { this.props.handleClick(i) } } key={i} >
          <img src={this.props.data[i].flag} /> 
          {this.props.data[i].name}
        </div>
    )
  }

  render() {
    const rows = this.renderRows(this.props.data);
    return (
      <div>
        {rows}
      </div>
    );
  }
}