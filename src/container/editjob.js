import { React,Component} from 'react';
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';

class Edit extends Component {
  constructor(props){
    super(props);
    this.state={
      role:'',
        description:'',
        Salary:'',
        job_id:window.location.pathname.split('/')[2]
    }
    this.data = this.data.bind(this);
    this.onEdit = this.onEdit.bind(this);
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
data(){
    fetch('https://rocky-woodland-82032.herokuapp.com/api/job/data',
  {
      method:'post',
      headers:{'Content-Type':'application/json','Accept':'*/*','Connection':'keep-alive','Accept-Encoding' : 'gzip, deflate, br'},
      body:JSON.stringify({
          job_id:this.state.job_id
      })
  }
  )
  .then(res => res.json())
  .then(data =>{
    if (data){
        this.setState({role:data.job_title})
        this.setState({description:data.job_description})
        this.setState({Salary:data.Salary})
    }
  })
}
onEdit(){
  fetch('https://rocky-woodland-82032.herokuapp.com/api/job/edit',
  {
      method:'post',
      headers:{'Content-Type':'application/json','Accept':'*/*','Connection':'keep-alive','Accept-Encoding' : 'gzip, deflate, br'},
      body:JSON.stringify({
          job_id:this.state.job_id,
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
componentDidMount(){
    this.data();
}
render(){
    let {role,description,Salary}=this.state
  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className=" max-w-md w-full space-y-8">
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src={logo}
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Edit The  Job</h2>
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
              defaultValue={role}
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
              defaultValue={description}
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
              defaultValue={Salary}
              className="appearance-none  rounded-md relative block w-full mt-5 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Salary"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          
        </div>

        <div>
        
            
            <a 
            onClick={this.onEdit}
            className="group cursor-pointer ... relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Edit Job
          </a>

    </div>
      </form>
    </div>
  </div>
  );
}

}
export default Edit;