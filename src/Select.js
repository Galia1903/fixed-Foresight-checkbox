import React from 'react';
import './App.css';


class Select extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                options: this.props.options,
                optionsName: this.props.optionsName,
                multiChoice: this.props.multiChoice,
                selected: [],
                searchString: '',
                changeSelectAllBtn: 'select all',
                listId: new Date().getTime(),
                // selectAllBtnId: new Date().getTime(),
            }

            this.handleOnChange = this.handleOnChange.bind(this);
            this.handleSearchChange = this.handleSearchChange.bind(this);
            this.checkAll = this.checkAll.bind(this);
        }

        queryHelper() {
            let listId = this.state.listId;
            let elm = document.querySelectorAll('.options[data-id="' + listId + '"] .row .option-row .check');
            return elm
        }


        handleOnChange(e) {
            if (this.state.multiChoice === false) {
                this.uncheckOthers(e.target.id);
            };
            let selected = [];
            let elm = this.queryHelper();
            for (let i = 0; i < elm.length; i++) {
                let listContainer = elm.item(i).parentNode.parentNode.parentNode;
                if (elm.item(i).type == "checkbox" && elm.item(i).checked === true && listContainer.id == this.state.listId) {
                    selected.push(elm.item(i).value);
                }
            }
            this.props.onSelect(selected);
        }


        uncheckOthers(id) {
            let elm = this.queryHelper();
            for (let i = 0; i < elm.length; i++) {
                let listContainer = elm.item(i).parentNode.parentNode.parentNode;
                console.log(listContainer.id);
                if (elm.item(i).type == "checkbox" && elm.item(i).id != id && listContainer.id == this.state.listId)
                    elm.item(i).checked = false;
            }
        }


        checkAll(e) {
            let thisContainer = e.target.parentNode.parentNode.parentNode;
            const allSelected = [];
            let elmCurrentList = this.queryHelper();
            for (let i = 0; i < elmCurrentList.length; i++) {
                let listContainer = elmCurrentList.item(i).parentNode.parentNode.parentNode;
                if (elmCurrentList.item(i).type == "checkbox" && listContainer.id == this.state.listId) {
                    elmCurrentList.item(i).checked = e.target.checked;
                }
            }
            if (e.target.checked == true && thisContainer.id === this.state.listId) {
                this.state.options.forEach(item => {
                    allSelected.push(item.value);
                })
                this.setState({
                    selected: allSelected,
                    changeSelectAllBtn: 'deselect all'
                })
            }
            if (e.target.checked == false && thisContainer.id === this.state.listId) {
                this.setState({
                    changeSelectAllBtn: 'select all',
                    selected: []
                })
            }
            this.props.onSelect(allSelected);
        }


        renderCheckAll() {
        	let btnId = String(this.state.listId).slice(-4);
            if (this.state.multiChoice == true)
                return ( <
                    div className = "reset" >
                    <
                    input className = "select-all select-all-btn"
                    type = "checkbox"
                    id = {btnId}
                    onChange = {
                        this.checkAll
                    }
                    /> <
                    label className = "select-all-label"
                    htmlFor = {btnId} > {
                        this.state.changeSelectAllBtn
                    } < /label> < /
                    div >
                )
        }


        handleSearchChange(e) {
            this.setState({
                searchString: e.target.value
            });
        }

        toggleOptionsSection(e) {
            let opt = e.target.nextSibling;
            opt.classList.toggle('closed');
            const optBtn = document.querySelector('.optBtn');
            optBtn.classList.toggle('off');
        }


		render(){
		  	 let listClass = Date.now()
		     let options = this.props.options;
		     let libraries = this.props.items,
		        searchString = this.state.searchString.trim().toLowerCase();
		     if(searchString.length > 0) {
		        options = options.filter( l => {
		        return l.label.toLowerCase().match( searchString );
		       });
		      }
		    return (
		         <div>
		         <div className="optBtn off" onClick={this.toggleOptionsSection}>{this.state.optionsName}</div>
		    	<div className="grow options closed" data-id={this.state.listId} id={this.state.listId}>
		      <input className="search  tField"  type = "text" value = {this.state.searchString} onChange = {this.handleSearchChange} placeholder = "Search" />
		        {options.map((l,index) => {
		          return  <div className="row" key={index}>
		             <div className="option-row">
		                  <input
		                    className= "check" 
		                    type="checkbox"
		                    id={index}
		                    name={l.label}
		                    value={l.value}
		                    onChange={this.handleOnChange}
		                  />
		       <label htmlFor={index}>{l.label}</label>
		            </div>  
		           </div>
		        })}
		       <div className="spacer"></div>
		       <div className="reset">  {this.renderCheckAll()} </div>
		      
		      </div>
		      </div>
		      );
		}
}


export default Select;