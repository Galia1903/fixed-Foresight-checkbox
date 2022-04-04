import React from 'react';
import Select from './Select'
import './App.css';

class App extends React.Component {
          constructor(props) {
              super(props);
              this.state = {
                  optionsName: 'options',
                  options: [{
                      label: 'image',
                      value: 'image'
                  }, {
                      label: 'live',
                      value: 'live'
                  }, {
                      label: 'notes',
                      value: 'notes'
                  }, {
                      label: 'presentation',
                      value: 'presentetion'
                  }, {
                      label: 'report',
                      value: 'report'
                  }, {
                      label: 'video',
                      value: 'video'
                  }],
                  optionsName2: 'options2',
                  options2: [{
                      label: 'Uruguay',
                      value: 'Uruguay'
                  }, {
                      label: 'Marshall Islands',
                      value: 'Marshall Islands'
                  }, {
                      label: 'Botswana',
                      value: 'Botswana'
                  }, {
                      label: 'Lithuania',
                      value: 'Lithuania'
                  }],

                  multiChoice: true,
                  multiChoice2: true,
                  name: '',
                  email: '',
                  selected: [],
                  selected2: []
              }

              this.handleEmail = this.handleEmail.bind(this);
              this.handleName = this.handleName.bind(this);
              this.handleSubmit = this.handleSubmit.bind(this);
              this.handleSelect = this.handleSelect.bind(this);
              this.handleSelect2 = this.handleSelect2.bind(this);
          }

          validation(mail) {
              let email = mail;
              let text = document.getElementById('text')
              let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

              if (email.match(pattern)) {
                  text.innerHTML = "Your Email Address in valid"
                  text.style.color = '#00ff00'
              } else {
                  text.innerHTML = "Please Enter Valid Email Address"
                  text.style.color = '#ff0000'
              }
              if (email == '') {
                  text.innerHTML = ""
                  text.style.color = '#00ff00'
              }
          }


          handleName(event) {
              this.setState({
                  name: event.target.value
              });
          }

          handleEmail(event) {

              const varified = this.validation(event.target.value);
              this.setState({
                  email: event.target.value
              });
          }

          handleSubmit(event) {
              event.preventDefault();
              console.log(`name: ${this.state.name} email: ${this.state.email} options: ${this.state.selected} options2: ${this.state.selected2}`);
          }

          handleSelect(selected) {
               
               this.setState({
                  selected: selected
              })
          }

          handleSelect2(selected) {
              this.setState({
                  selected2: selected
              })
          }

   render() {

   return (
      <div className="container">
     <form className="form" onSubmit={this.handleSubmit} action="">
        <input id="name" type="text" value={this.state.name} onChange={this.handleName} placeholder="Name" className="tField"/>
        <input id="mail" type="text" placeholder="E-mail" onChange={this.handleEmail} className="tField"/>
        <div id="text" className="email-validation"> </div>
        <div className="line"></div>
        <Select
           options = {this.state.options}
           optionsName = {this.state.optionsName}
           multiChoice = {this.state.multiChoice}
           onSelect = {this.handleSelect}
           />

        <Select
           options = {this.state.options2}
           optionsName = {this.state.optionsName2}
           multiChoice = {this.state.multiChoice2}
           onSelect = {this.handleSelect2}
           /> 

       <div className="end">
          <div className="line"></div>
          <input className="btn" type="submit" value="Submit" />
        </div>
     </form>
  </div>
    );
  }
}

export default App;
