import{ React,Component} from "react";
import HomeNav from "../component/employernav";
import { Avatar } from '@mui/material';


function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

function stringAvatar(name) {
    name=name.trim();
    return {
      style: {
        background: stringToColor(name),
      },
      children: (name.split(' ')[1]?`${name.split(' ')[0][0]}${name.split(' ')[1][0]}`:`${name.split(' ')[0][0]}${name.split(' ')[0][1]}`),
    };
  }


class Home extends Component{
    constructor(props){
        super(props);
        this.state={
           employer:JSON.parse(localStorage.getItem('employer')),
           editmode:JSON.parse(localStorage.getItem('editmode'))||"false"
        }
        this.EditMode=this.EditMode.bind(this)
        this.Save=this.Save.bind(this)
        this.onCompanyChange=this.onCompanyChange.bind(this)
        this.locationchange=this.locationchange.bind(this)
        this.rolechange=this.rolechange.bind(this)
        this.websitechange=this.websitechange.bind(this)
    }
    onCompanyChange(event){
        Object.assign(this.state.employer,{companyname:event.target.value})

    }
    locationchange(event){
        Object.assign(this.state.employer,{location:event.target.value})

    }
    websitechange(event){
        Object.assign(this.state.employer,{website:event.target.value})

    }
    rolechange(event){
        Object.assign(this.state.employer,{role:event.target.value})
    }
    EditMode(){
        this.setState({editmode:"true"})
        localStorage.setItem("editmode",JSON.stringify("true"))
    }
    Save(){
        let {employer}=this.state;
        fetch('https://rocky-woodland-82032.herokuapp.com/api/employer/edit',
        {
            method:'post',
            headers:{'Content-Type':'application/json','Accept':'*/*','Connection':'keep-alive','Accept-Encoding' : 'gzip, deflate, br'},
            body:JSON.stringify({
                employer_id:employer._id,
                companyname:employer.companyname,
                location:employer.location,
                role:employer.role,
                website:employer.website
            })
        }
        )
        .then(res => res.json())
        .then(data =>{
            localStorage.setItem('employer',JSON.stringify(data))
            this.setState({editmode:"false"})
            localStorage.setItem("editmode",JSON.stringify("false"))
        })
        
    }
    componentDidMount(){
    }
    render(){
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
          window.history.pushState(null, document.title, window.location.href);
        });
        localStorage.removeItem("candidates")
        let {employer,editmode}=this.state;
        console.log(editmode)
        return(
            <div className="bg-gray-50">
                <HomeNav />
                <div className=" max-w-7xl mx-auto px-4 sm:px-6 z-2  my-10 bg-gray-50">
                <div className="grid grid-cols-2 sm:grid-cols-6 justify-items-center ... gap-20"> 
                <div className=" sm:col-start-2 z-0 my-2 py-12 sm:py-10 md:py-8 lg:py-0">
                <div {...stringAvatar(employer.name)} className="py-7 px-7 md:py-10 md:px-10 lg:py-20 lg:px-20 rounded-full text-2xl md:text-4xl lg:text-5xl w-100px h-100px md:w-200px md:h-200px "/>
                </div>
                <div className="py-20 sm:col-start-4">
                    <h1 className="text-5xl not-italic ... font-semibold ...">{employer.name}</h1>
                    <p className="text-l font-light ... py-3">{employer.email}</p>
                </div>
                </div>
                <div className="mx-3 pl-2 sm:mx-20 sm:px-20">
                <div className="my-5 py-2">
                    {editmode==="true"?
                    <div>
                        <label htmlFor="companyname" className="block text-sm font-medium text-gray-700">
                            Company Name
                        </label>
                         <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                        type="text"
                        name="companyname"
                        id="companyname"
                        onChange={this.onCompanyChange}
                        defaultValue={employer.companyname}
                        className="appearance-none r relative block w-50 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-md"
                        />
                        </div>
                    </div>
                    :
                    <p>Company Name : {employer.companyname}</p>
                    }
                    
                </div>
                <div className="my-5 py-2">
                {editmode==="true"?
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                         <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                        type="text"
                        name="location"
                        id="location"
                        onChange={this.locationchange}
                        defaultValue={employer.location}
                        className="appearance-none r relative block w-50 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-md"
                        />
                        </div>
                    </div>
                    :
                    <p>Location : {employer.location}</p>
                    }
                    
                </div>
                <div className="my-5 py-2">
                {editmode==="true"?
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role
                        </label>
                         <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                        type="text"
                        name="role"
                        id="role"
                        onChange={this.rolechange}
                        defaultValue={employer.role}
                        className="appearance-none r relative block w-50 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-md"
                        />
                        </div>
                    </div>
                    :
                    <p>Role : {employer.role}</p>
                    }
                    
                </div>
                <div className="my-5 py-2">
                {editmode==="true"?
                    <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Website 
                        </label>
                         <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                        type="text"
                        name="website"
                        id="website"
                        onChange={this.websitechange}
                        defaultValue={employer.website}
                        className="appearance-none r relative block w-50 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-md"
                        />
                        </div>
                    </div>
                    :
                    <p>Website : {employer.website} </p>
                    }
                    
                </div>
                </div>
                <div className="flex justify-center">
                    {editmode==="true"?
                    <button onClick={this.Save} className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Save</button>
                :
                <button onClick={this.EditMode}  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Edit</button>
                }
                    
                </div>
                </div>      
            </div>
            
        );
    }


}
export default Home;