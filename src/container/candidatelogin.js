import {Component, React} from 'react';
import { LockClosedIcon } from '@heroicons/react/solid'
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
const a=window.location.pathname.split('/')[1];
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <a color="inherit" href="#">
        Your Website
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class SignInC extends Component {
  constructor(props){
    super(props);
    this.state={
        email:'',
        password:''
    }
    
    this.onSignin = this.onSignin.bind(this);
}
onEmailChange=(event)=>{
    this.setState({email:event.target.value})
}
onPasswordChange=(event)=>{
    this.setState({password:event.target.value})
}
onSignin(){
  fetch('https://rocky-woodland-82032.herokuapp.com/api/candidate/login',
  {
      method:'post',
      headers:{'Content-Type':'application/json','Accept':'*/*','Connection':'keep-alive','Accept-Encoding' : 'gzip, deflate, br'},
      body:JSON.stringify({
          email:this.state.email,
          password:this.state.password
      })
  }
  )
  .then(res => res.json())
  .then(data =>{
      if ((data==='wrong password' )||(data==='Not Found')){
          window.alert('Wrong Id or Password')
      }
      else if(data._id){
        localStorage.setItem('candidate',JSON.stringify(data))
        window.location.replace('/candidatehome')
        
      }
  })
  

}
render(){
  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className=" max-w-md w-full space-y-8">
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src={logo}
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Sign in to your account</h2>
      </div>
      <form className="mt-8 space-y-6" >
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px"> 
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              onChange={this.onEmailChange}
              autoComplete="email"
              required
              className="appearance-none r relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-md"
              placeholder="Email address"
            />
          </div>
          <br />
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={this.onPasswordChange}
              autoComplete="current-password"
              required
              className="appearance-none  rounded-md relative block w-full mt-5 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          
        </div>

        <div>
          <a
            onClick={this.onSignin}
            type="submit"
            className="cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Sign In
           
          </a>
        </div>
        <div className="flex justify-end ... blue">
          
          <NavLink to="/candidatesignup" variant="body2" className="text-blue-600">
          {"Don't have an account? Sign Up"}
        </NavLink>
       
        </div>
        <div>
          <Copyright />
        </div>
      </form>
    </div>
  </div>
  );
}
 
}

export default SignInC;