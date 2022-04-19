import{ React,Component} from "react";
import HomeNav from "../component/employernav";
import Loader from "react-loader-spinner";
import { Avatar } from "@mui/material";
import { ImportantDevices } from "@mui/icons-material";

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
    console.log(name)
    name=name.name;
    name=name.trim();
    return {
      sx: {
        bgcolor: stringToColor(name),
        height:"50px",
        width:"50px",
        position: `none `
      },
      children: (name.split(' ')[1]?`${name.split(' ')[0][0]}${name.split(' ')[1][0]}`:`${name.split(' ')[0][0]}${name.split(' ')[0][1]}`),
    };
  }

const Card=({name,email,Stream,location,resume,id,onclick})=>{

    return(
        <div>
            <div style={{width:"300px"}}className="w-3/12  h-96 mx-5  mt-8 px-4 py-8  justify-center content-center bg-gray  rounded-lg shadow-lg border-4 border-purple-400 ...">
            <div className="flex flex-row ">
                <div className="ml-4  ">
                <Avatar {...stringAvatar({name})} />
                </div>
            
            <div className="my-2  mx-4">
                <h1 className="text-3xl font-bold mx-10 flex justify-center">{name}</h1>
            </div>
            </div>
            
            <div className="mt-5 pt-3 mx-5">
                <h1 > {email}</h1>
            </div>
            <div className="mt-3  mx-5">
                <h1>Stream: {Stream}</h1>
            </div>
            <div className="mt-3  mx-5">
                <h1>location: {location}</h1>
            </div>
            <div className="flex flex-row mt-5 gap-4 pt-10   justify-center">
                <div className="ml-5">
                    <button onClick={()=>onclick({resume})} className=" whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Resume</button>
                </div>
            </div>
        </div>
        </div>
        
    );
}
const Cardlist = ({candidatelist,onclick}) => {
    return (
        <div className="grid gap-4 grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-4">
        {
            candidatelist.map((user, i) => {
            return (<>
                <Card
                key={i}
                in={i+1}
                id={candidatelist[i]._id}
                name={candidatelist[i].name}
                email={candidatelist[i].email}
                Stream={candidatelist[i].Stream}
                location={candidatelist[i].location}
                resume={candidatelist[i].resume}
                onclick={onclick}
                />
                </>
            );

            })
        }
        </div>
    );
    }

class JobCandidate extends Component{
    constructor(props){
        super(props);
        this.state={
           candidates:JSON.parse(localStorage.getItem('candidates'))||[],
           job_id:window.location.pathname.split('/')[2],
           loading:true
        }

        this.getcandidate=this.getcandidate.bind(this)
    }
    SeeResume(resume){
        console.log(resume)
        fetch(`http://localhost:4000/api/candidate/getSignedURL?resume=${resume.resume}`)
        .then(res => res.json())
        .then(data =>{
            window.open(data)
        })
       
    }
    getcandidate(){
        fetch('https://rocky-woodland-82032.herokuapp.com/api/job/clist',
        {
            method:'post',
            headers:{'Content-Type':'application/json','Accept':'*/*','Connection':'keep-alive','Accept-Encoding' : 'gzip, deflate, br'},
            body:JSON.stringify({
                job_id:this.state.job_id,
            })
        }
        )
        .then(res => res.json())
        .then(data =>{
            this.setState({candidates:data})
            localStorage.setItem('candidates',JSON.stringify(data))
            this.setState({loading:false})
        })
        
    }
    componentDidMount(){
        this.getcandidate();
    }

    render(){
        let {candidates,loading}=this.state;
        console.log(candidates)
        return(
            <div className="bg-gray-50">
                <HomeNav />
                {
                    !loading?
                    candidates.length?
                    <Cardlist candidatelist={candidates} onclick={this.SeeResume}/>
                    :
                    <h1 className="flex justify-center align-center text-3xl">No candidates Yet</h1>
                    :
                    <div className="flex justify-center align-center">
                        <Loader type="TailSpin" color="blue" height={80} width={80} />
                    </div>
                    
                }
            </div>
            
        );
    }


}
export default JobCandidate;