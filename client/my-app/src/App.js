import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailSaBackenda: '',
      err: ''
    };  
  }

  handleChange = (event) => {
    this.setState({
      email: event.target.value,
      err: ''
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.email !== ''){
      axios.post('http://localhost:5000', {email : this.state.email})
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            this.setState({
              emailSaBackenda: res.data, 
              email: ''}) 
          }
        }).catch((err) => {
          this.setState({
            emailSaBackenda: err.response.data.message, 
            email: ''});
        })
    } else {
      this.setState({
        err: "Cannot be empty"
      })
    }
  }
  
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <input type="submit" value="Submit" />
          <p>{this.state.err ?
           `${this.state.err}`:
           `${this.state.emailSaBackenda} `
            }</p> 
        </form>
      </div>
    );
  }
 
}

export default App;
