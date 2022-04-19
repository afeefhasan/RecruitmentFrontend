import { React,Component} from 'react';
import Typography from '@mui/material/Typography';
import { LockClosedIcon } from '@heroicons/react/solid'
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';

class Create extends Component {
  constructor(props){
    super(props);
    this.state={
      role:'',
        description:'',
        Salary:''
    }
    
    this.onCreate = this.onCreate.bind(this);
}
onRoleChange=(event)=>{
  this.setState({role:event.target.value})
}
onDescriptionChange=(event)=>{
    this.setState({description:event.target.value})
}
onsalaryChange=(event)=>{
    this.setState({Salary:event.target.value})
}
onCreate(){
    let emp=JSON.parse(localStorage.getItem('employer'));
        let emp_id=emp._id
  fetch('https://rocky-woodland-82032.herokuapp.com/api/job/create',
  {
      method:'post',
      headers:{'Content-Type':'application/json','Accept':'*/*','Connection':'keep-alive','Accept-Encoding' : 'gzip, deflate, br'},
      body:JSON.stringify({
          employer_id:emp_id,
          job_title:this.state.role,
          job_description:this.state.description,
          Salary:this.state.Salary
      })
  }
  )
  .then(res => res.json())
  .then(data =>{
    if (data){
        window.location.replace("/employerjob")
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
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Post A New Job</h2>
      </div>
      <form className="mt-8 space-y-6" >
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px"> 
         <div className="m">
            <label htmlFor="role" className="sr-only">
              Role
            </label>
            <input
              id="role"
              name="role"
              type="text"
              onChange={this.onRoleChange}
              autoComplete="role"
              required
              className="appearance-none rounded-md relative block w-full mt-5 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Role"
            />
          </div>
          <br />
          <div>
            <label htmlFor="description" className="sr-only">
              Job Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              onChange={this.onDescriptionChange}
              autoComplete="description"
              required
              className="appearance-none r relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-md"
              placeholder="Description"
            />
          </div>
        
          <div>
            <label htmlFor="salary" className="sr-only">
              Salary
            </label>
            <input
              id="salary"
              name="salary"
              type="text"
              onChange={this.onsalaryChange}
              autoComplete="salary"
              required
              className="appearance-none  rounded-md relative block w-full mt-5 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Salary"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          
        </div>

        <div>
          {
            (!this.state.role || !this.state.description || !this.state.Salary) ?
            <a 
            className="group cursor-not-allowed ... relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled>
              Post Job
          </a>
            :
            <a 
            onClick={this.onCreate}
            className="group cursor-pointer ... relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Post Job
          </a>
          }
    </div>
      </form>
    </div>
  </div>
  );
}

}
export default Create;