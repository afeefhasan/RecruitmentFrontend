import{ React,Component} from "react";
import HomeNav from "../component/candidatenav";
import Loader from "react-loader-spinner";
import { Avatar } from "@mui/material";


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

const Card=({name,email,role,location,website,id,onclick})=>{
    console.log(id)
    return(
        <div>
            <div className="w-72 h-96 mx-5  mt-8 px-4 py-8  justify-center content-center bg-gray  rounded-lg shadow-lg border-4 border-purple-400 ...">
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
                <h1>Role: {role}</h1>
            </div>
            <div className="mt-3  mx-5">
                <h1>location: {location}</h1>
            </div>
            <div className="mt-3  mx-5">
                <h1>website: {website}</h1>
            </div>
            <div className="flex flex-row mt-5 gap-4 pt-10    justify-center">
                <div className="ml-5">
                    <button onClick={()=>onclick(id)} className=" whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">See Jobs</button>
                </div>
            </div>
        </div>
        </div>
        
    );
}
const Cardlist = ({Companylist,onclick}) => {
    return (
        <div className="grid gap-4 grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-4">
        {
            Companylist.map((user, i) => {
            return (<>
                <Card
                key={i}
                in={i+1}
                id={Companylist[i]._id}
                name={Companylist[i].companyname}
                email={Companylist[i].email}
                role={Companylist[i].role}
                location={Companylist[i].location}
                website={Companylist[i].website}
                onclick={onclick}
                />
                </>
            );

            })
        }
        </div>
    );
    }

class Companylist extends Component{
    constructor(props){
        super(props);
        this.state={
           companies:JSON.parse(localStorage.getItem('companies'))||[],
           loading:true
        }

        this.getcompanies=this.getcompanies.bind(this)
    }
    SeeJobs(id){
        window.location.replace(`/${id}/jobs`)
    }
    getcompanies(){
        fetch('https://rocky-woodland-82032.herokuapp.com/api/employer/list',
        {
            method:'get',
        }
        )
        .then(res => res.json())
        .then(data =>{
            this.setState({companies:data})
            localStorage.setItem('companies',JSON.stringify(data))
            this.setState({loading:false})
        })
        
    }
    componentDidMount(){
        this.getcompanies();
    }

    render(){
        let {companies,loading}=this.state;
        console.log(companies)
        return(
            <div className=" h-screen w-screen">
                <HomeNav />
                {
                    !loading?
                    companies.length?
                    <Cardlist Companylist={companies} onclick={this.SeeJobs}/>
                    :
                    <h1 className="flex justify-center align-center text-3xl">No companies Yet</h1>
                    :
                    <div className="flex justify-center align-center">
                        <Loader type="TailSpin" color="blue" height={80} width={80} />
                    </div>
                    
                }
            </div>
            
        );
    }


}
export default Companylist;