import{ React,Component} from "react";
import HomeNav from "../component/employernav";
import Loader from "react-loader-spinner";
import { NavLink } from "react-router-dom";
const Card=({role,description,salary,id})=>{
    return(
        <div style={{width:"300px"}}className="w-3/12 relative h-96 mx-5  mt-8 px-4 py-8  justify-center content-center bg-gray  rounded-lg shadow-lg border-4 border-purple-400 ...">
            <div className="my-2  ">
                <h1 className="text-3xl font-bold mx-10 flex justify-center">{role}</h1>
            </div>
            <div className="my-5 py-3 mx-5">
                <h1 >Description: {description}</h1>
            </div>
            <div className="my-3  mx-5">
                <h1>Salary: {salary}</h1>
            </div>
            <div className="flex flex-row my-3 gap-4 py-2 absolute bottom-2 justify-center">
                <div className="ml-5">
                    <NavLink to={`/editjob/${id}`} className=" whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Edit Job</NavLink>
                </div>
                <div className="">
                    <NavLink to={`/jobcandidates/${id}` } className=" whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Candidates</NavLink>
                </div>
            </div>
        </div>
    );
}
const Cardlist = ({joblist}) => {
    return (
        <div className="grid gap-4 grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
            joblist.map((user, i) => {
            return (<>
                <Card
                key={i}
                in={i+1}
                id={joblist[i]._id}
                role={joblist[i].job_title}
                description={joblist[i].job_description}
                salary={joblist[i].Salary}
                />
                </>
            );

            })
        }
         <div style={{width:"300px"}}className="mb-3 pb-2 mt-2 group mx-5 w-3/12 h-96 min-w-3/12  cursor-pointer mt-8 px-4 py-8 flex flex-col justify-center content-center bg-gray border-2 border-purple-400 rounded-lg  hover:bg-indigo-300 hover:shadow-lg hover:border-transparent ... transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ...">
                
                
                <div className="mt-2 py-3 px-7 bg-indigo-300 self-center rounded-lg  group-hover:bg-gray-50  ...">
                    <NavLink to="/createjob" className="text-gray-50 group-hover:text-indigo-300">
                    Create New
                    </NavLink>
                    </div>
                
                </div>
        </div>
    );
    }

class Jobs extends Component{
    constructor(props){
        super(props);
        this.state={
           jobs:[]
        }

        this.getjobs=this.getjobs.bind(this)
    }

    getjobs(){
        let emp=JSON.parse(localStorage.getItem('employer'));
        let emp_id=emp._id
        fetch('https://rocky-woodland-82032.herokuapp.com/api/job/list',
        {
            method:'post',
            headers:{'Content-Type':'application/json','Accept':'*/*','Connection':'keep-alive','Accept-Encoding' : 'gzip, deflate, br'},
            body:JSON.stringify({
                employer_id:emp_id,
            })
        }
        )
        .then(res => res.json())
        .then(data =>{
            this.setState({jobs:data})
        })
        
    }
    componentDidMount(){
        this.getjobs();
    }

    render(){
        localStorage.removeItem("candidates");
        let {jobs}=this.state;
        console.log(jobs)
        return(
            <div className="bg-gray-50 min-h-full">
                <HomeNav />
                <div className="flex justify-end max-w-7xl py-3 mx-5">
                    <NavLink to="/createjob" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"> Create New</NavLink>
                </div>
                {
                    jobs?
                    <Cardlist joblist={jobs}/>
                    :
                    <Loader type="TailSpin" color="blue" height={80} width={80} />
                }
            </div>
            
        );
    }


}
export default Jobs;