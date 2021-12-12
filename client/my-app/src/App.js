import React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordRepeat: '',
      resFromBack: '',
      err: ''
    };  
  }

  handleChange = (event) => {
    this.setState({
    [event.target.name]: event.target.value,
      err: ''
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.firstName, 
      this.state.lastName, 
      this.state.email,
      this.state.password,
      this.state.passwordRepeat === ''){
        this.setState({
        err: "Please fill in all the required fields."
      })
    }else if(this.state.password !== this.state.passwordRepeat){
        this.setState({
          err: "Password confirmation doesn't match."
        })
      }else {
        axios.post('http://localhost:5000', 
          {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
          }).then((res) => {
              console.log(res.status);
              if (res.status === 200) {
                this.setState({
                  resFromBack: res.data, 
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  passwordRepeat: ''
                }) 
              }
            }).catch((err) => {
              this.setState({
                err: err.response.data.message, 
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                passwordRepeat: ''
              });
            })
        }

  }
  
  render() {
    return (
      <div className="container">
        <form 
        onSubmit={this.handleSubmit}>
          <div className="form-group">
          <input
            type="text"
            name= "firstName"
            placeholder="first name"
            value={this.state.firstName}
            onChange={this.handleChange}
            className='form-control mt-5'
          />

          <input
            type="text"
            name= "lastName"
            placeholder="last name"
            value={this.state.lastName}
            onChange={this.handleChange}
            className='form-control mt-5'
          />

          <input
            type="text"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
            className='form-control mt-5'
          />

          <input
            type="password"
            name= "password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
            className='form-control mt-5'
          />

          <input
            type="password"
            name= "passwordRepeat"
            placeholder="passwordRepeat"
            value={this.state.passwordRepeat}
            onChange={this.handleChange}
            className='form-control mt-5'
          />

          <input type="submit" 
          value="Submit"
          className='btn btn-danger mt-3'
           />
           
          <div>{this.state.err ?
            <span className="text-danger">
              {this.state.err}
            </span> :
            <span className="text-success">
               {this.state.resFromBack}
            </span>
             
            }</div> 

          </div>
        </form>
      </div>
    );
  }
 
}

export default App;
