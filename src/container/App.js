import Main from './main';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SignIn from './employerlogin';
import SignInC from './candidatelogin';
import SignUp from './employersignup';
import Home from './employerhome';
import Jobs from './employerjob';
import Create from './createjob';
import Edit from './editjob';
import JobCandidate from './jobcandidates';
import SignUpC from './candidatesignup';
import HomeC from './candidatehome';
import Companylist from './candidatecompany';
import JobsC from './companyjobs';

function App() {
  // let a=JSON.parse(localStorage.getItem('user'));
  // let path=a.name;
  // path.trim();
  let a=window.location.pathname.split('/')[1]
  console.log(a)
   return (
     <Router>
      <Switch>
      <Route exact path='/' component={Main} />
      <Route exact path='/employerlogin' component={SignIn} />
      <Route exact path='/employersignup' component={SignUp} />
      <Route  exact path='/employerhome' component={Home} />
      <Route  exact path='/employerjob' component={Jobs} />
      <Route  exact path='/createjob' component={Create} />
      <Route   path='/editjob/' component={Edit} />
      <Route   path='/jobcandidates/' component={JobCandidate} />
      <Route exact path='/candidatelogin' component={SignInC} />
      <Route exact path='/candidatesignup' component={SignUpC} />
      <Route  exact path='/candidatehome' component={HomeC} />
      <Route  exact path='/candidatecompany' component={Companylist} />
      <Route  exact path={`/${a}/jobs`} component={JobsC} />
      <Redirect to="/" />
      </Switch>
     </Router>

  );
}

export default App;
