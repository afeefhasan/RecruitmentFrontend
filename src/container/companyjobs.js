import{ React,Component} from "react";
import HomeNav from "../component/candidatenav";
import Loader from "react-loader-spinner";
import { NavLink } from "react-router-dom";
const Card=({role,description,salary,id,appliedJobs,onApply})=>{
    return(
        <div style={{width:"300px"}}className="sm:w-3/12  relative h-96 mx-5  mt-8 px-4 py-8  justify-center content-center bg-gray  rounded-lg shadow-lg border-4 border-purple-400 ...">
            <div className="my-2  ">
                <h1 className="text-3xl font-bold mx-10 flex justify-center">{role}</h1>
            </div>
            <div className="my-5 py-3 mx-5">
                <h1 >Description: {description}</h1>
            </div>
            <div className="my-3  mx-5">
                <h1>Salary: {salary}</h1>
            </div>
            {
                appliedJobs.includes(id)?
                <div className="flex  my-3  py-2 absolute bottom-2 justify-center">
                <div className="">
                    <button disabled className=" whitespace-nowrap opacity-50 ... inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Applied</button>
                </div>
            </div>
            :
            <div className="flex  my-3  py-2 absolute bottom-2 justify-center">
                <div className="">
                    <button onClick={()=>onApply(id)} className=" whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Apply</button>
                </div>
            </div>
            }
            
        </div>
    );
}
const Cardlist = ({joblist,appliedJobs,onApply}) => {
    return (
        <div className="grid gap-4 grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
            joblist.map((user, i) => {
            return (<>
                <Card
                key={i}
                in={i+1}
                id={joblist[i]._id}
                onApply={onApply}
                appliedJobs={appliedJobs}
                role={joblist[i].job_title}
                candidates={joblist[i].candidates}
                description={joblist[i].job_description}
                salary={joblist[i].Salary}
                />
                </>
            );

            })
        }
        </div>
    );
    }

class JobsC extends Component{
    constructor(props){
        super(props);
        this.state={
           jobs:[],
           emp_id:window.location.pathname.split('/')[1],
           loader:true,
           candidate:JSON.parse(localStorage.getItem('candidate'))
           
        }

        this.getjobs=this.getjobs.bind(this)
        this.Apply=this.Apply.bind(this)
    }

    getjobs(){
        fetch('https://rocky-woodland-82032.herokuapp.com/api/job/list',
        {
            method:'post',
            headers:{'Content-Type':'application/json','Accept':'*/*','Connection':'keep-alive','Accept-Encoding' : 'gzip, deflate, br'},
            body:JSON.stringify({
                employer_id:this.state.emp_id,
            })
        }
        )
        .then(res => res.json())
        .then(data =>{
            this.setState({jobs:data})
            this.setState({loader:false})
        })
        
    }
    Apply(id){
        
        fetch('https://rocky-woodland-82032.herokuapp.com/api/job/saccept',
        {
            method:'post',
            headers:{'Content-Type':'application/json','Accept':'*/*','Connection':'keep-alive','Accept-Encoding' : 'gzip, deflate, br'},
            body:JSON.stringify({
               job_id:id,
               candidate_id:this.state.candidate._id
            })
        }
        )
        .then(res => res.json())
        .then(data =>{
            this.setState({jobs:data})
        })

        fetch('https://rocky-woodland-82032.herokuapp.com/api/candidate/jaccept',
        {
            method:'post',
            headers:{'Content-Type':'application/json','Accept':'*/*','Connection':'keep-alive','Accept-Encoding' : 'gzip, deflate, br'},
            body:JSON.stringify({
               job_id:id,
               candidate_id:this.state.candidate._id
            })
        }
        )
        .then(res => res.json())
        .then(data =>{
            localStorage.setItem('candidate',JSON.stringify(data))
            window.location.reload()
            
        })
    }
    componentDidMount(){
        this.getjobs();
    }

    render(){
        let {jobs,loader,candidate}=this.state;
        console.log(jobs)
        return(
            <div className=" min-h-full min-w-full ">
                <HomeNav />
                {
                    !loader?
                    <Cardlist joblist={jobs} appliedJobs={candidate.job} onApply={this.Apply}/>
                    :
                    <div className="flex justify-center align-center">
                        <Loader type="TailSpin" color="blue" height={80} width={80} />
                    </div>
                    
                }
            </div>
            
        );
    }


}
export default JobsC;