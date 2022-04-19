import{ React,Component} from "react";
import HomeNav from "../component/candidatenav";
import { Avatar } from '@mui/material';
import axios from "axios";

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

class HomeC extends Component{
    constructor(props){
        super(props);
        this.state={
           candidate:JSON.parse(localStorage.getItem('candidate')),
           editmode:JSON.parse(localStorage.getItem('editmode'))||"false",
           selectedFile:null
        }
        this.EditMode=this.EditMode.bind(this)
        this.Save=this.Save.bind(this)
        this.locationchange=this.locationchange.bind(this)
        this.rolechange=this.rolechange.bind(this)
        this.onFileChange=this.onFileChange.bind(this)
        this.onFileUpload=this.onFileUpload.bind(this)
    }
    locationchange(event){
        Object.assign(this.state.candidate,{location:event.target.value})

    }
    rolechange(event){
        Object.assign(this.state.candidate,{Stream:event.target.value})
    }
    EditMode(){
        this.setState({editmode:"true"})
        localStorage.setItem("editmode",JSON.stringify("true"))
    }
    Save(){
        let {candidate}=this.state;
        fetch('https://rocky-woodland-82032.herokuapp.com/api/candidate/edit',
        {
            method:'post',
            headers:{'Content-Type':'application/json','Accept':'*/*','Connection':'keep-alive','Accept-Encoding' : 'gzip, deflate, br'},
            body:JSON.stringify({
                candidate_id:candidate._id,
                location:candidate.location,
                Stream:candidate.Stream,

            })
        }
        )
        .then(res => res.json())
        .then(data =>{
            localStorage.setItem('candidate',JSON.stringify(data))
            this.setState({editmode:"false"})
            localStorage.setItem("editmode",JSON.stringify("false"))
        })
        
    }
    onFileChange = event => {
    
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
      
      };
      onFileUpload = () => {
    
        // Create an object of formData
        const formData = new FormData();
      
        // Update the formData object
        formData.append(
          "resume",
          this.state.selectedFile
        );
        formData.append(
            "candidate_id",
            this.state.candidate._id
        )
      
        // Details of the uploaded file
        console.log(this.state.selectedFile);
      
        // Request made to the backend api
        // Send formData object
        fetch("https://rocky-woodland-82032.herokuapp.com/api/candidate/upload",{
            method:'post',
            headers:{'Accept':'*/*','Connection':'keep-alive','Accept-Encoding' : 'gzip, deflate, br'},
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            localStorage.setItem('candidate',JSON.stringify(data))
            window.alert("uploaded")
            window.location.reload()
        })
      };
    componentDidMount(){
    }
    render(){
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
          window.history.pushState(null, document.title, window.location.href);
        });
        let {candidate,editmode}=this.state;
        console.log(editmode)
        return(
            <div className=" min-h-full min-w-full">

                <HomeNav />
                <div className=" sm:max-w-7xl md:mx-auto  sm:px-6 z-2  sm:my-10 bg-gray-50">
                <div className=" grid grid-cols-2 sm:grid-cols-6 justify-items-center ... gap-20"> 
                <div className=" sm:col-start-2 z-0 my-2 py-12 sm:py-10 md:py-8 lg:py-0">
                <div {...stringAvatar(candidate.name)} className="py-7 px-7 md:py-10 md:px-10 lg:py-20 lg:px-20 rounded-full text-2xl md:text-4xl lg:text-5xl w-100px h-100px md:w-200px md:h-200px "/>
                </div>
                <div className="py-20 sm:col-start-4">
                    <h1 className="text-5xl not-italic ... font-semibold ...">{candidate.name}</h1>
                    <p className="text-l font-light ... py-3">{candidate.email}</p>
                </div>
                </div>
                <div className="ml-2 pl-2 sm:mx-20 sm:px-20">
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
                        defaultValue={candidate.location}
                        className="appearance-none r relative block w-50 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-md"
                        />
                        </div>
                    </div>
                    :
                    <p>Location : {candidate.location}</p>
                    }
                    
                </div>
                <div className="my-5 py-2">
                {editmode==="true"?
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Stream
                        </label>
                         <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                        type="text"
                        name="role"
                        id="role"
                        onChange={this.rolechange}
                        defaultValue={candidate.STream}
                        className="appearance-none r relative block w-50 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-md"
                        />
                        </div>
                    </div>
                    :
                    <p>Stream : {candidate.Stream}</p>
                    }
                    
                </div>
                <div className="flex flex-col md:flex-row ">
                <div className="w">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Resume
                        </label>
                {
                    candidate.resume.length?
                    <p>{candidate.resume}</p>
                    :null
                }
                <input type="file" accept=".pdf" onChange={this.onFileChange} ></input>
                </div>

                <div className="py-3 md:py-0">
                    <button onClick={this.onFileUpload} className=" ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Upload</button>
                </div>
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
export default HomeC;