import React from 'react';
import axios from 'axios';
import './App.css';
import UserList from './components/User.js';
import Footer from './components/Footer.js';
import Menu from './components/Menu.js';
import ProjectList from './components/Projects.js';
import TODOList from './components/TODO.js';
import UserProjectList from './components/UserProject.js';
import ProjectTODOList from './components/ProjectTODO.js';
import LoginForm from './components/Auth.js';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom'
import Cookies from 'universal-cookie';



const NotFound404 = ({ location }) => {
  return (
    <div>
      <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}
  

class App extends React.Component {

  constructor(props) {
    super(props)
      this.state = {
      'users': [],
      'projects': [],
      'TODOs': [],
      'token': ''
    }
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token}, ()=>this.load_data())
  } 

  is_authenticated() {
    return this.state.token != ''
  }
      
  logout() {
      this.set_token('')
  }
      
  get_token_from_storage() {
      const cookies = new Cookies()
      const token = cookies.get('token')
      this.setState({'token': token}, ()=>this.load_data())
  }
      
  get_token(username, password) {
      axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
      .then(response => {
        this.set_token(response.data['token'])
      }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
  if (this.is_authenticated())
    {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }
  
  deleteProject(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers: headers})
      .then(response => {
      this.setState({projects: this.state.projects.filter((item)=>item.id !== id)})
    }).catch(error => console.log(error))
  }

  deleteTODO(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/TODOs/${id}`, {headers: headers})
      .then(response => {
      this.setState({TODOs: this.state.TODOs.filter((item)=>item.id !== id)})
    }).catch(error => console.log(error))
  }
    
  createProject(name, user) {
    const headers = this.get_headers()
    const data = {name: name, user: user}
    axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers, headers})
      .then(response => {
        let new_project = response.data
        const user = this.state.user.filter((item) => item.id === new_project.user)[0]
        new_project.user = user
        this.setState({projects: [...this.state.projects, new_project]})
        }).catch(error => console.log(error))
  }
    
  createTODO(name, project) {
    const headers = this.get_headers()
    const data = {name: name, project: project}
    axios.post(`http://127.0.0.1:8000/api/TODOs/`, data, {headers, headers})
      .then(response => {
        let new_TODO = response.data
        const project = this.state.project.filter((item) => item.id === new_TODO.project)[0]
        new_TODO.project = project
        this.setState({TODOs: [...this.state.TODOs, new_TODO]})
        }).catch(error => console.log(error))
  }

  load_data() {
    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/api/users/', {headers})
      .then(response => {
        this.setState({users: response.data})
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/projects/', {headers})
      .then(response => {
        this.setState({projects: response.data})
      }).catch(error => {
        console.log(error)
        this.setState({projects: []})
      })

    axios.get('http://127.0.0.1:8000/api/TODO/', {headers})
      .then(response => {
        this.setState({TODOs: response.data})
      }).catch(error => {
        console.log(error)
        this.setState({TODOs: []})
      })        
  }
    
  componentDidMount() {
    this.get_token_from_storage()
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <Menu />  
        <nav>
            <ul>
              <li>
                <Link to='/'>Users</Link>
              </li>
              <li>
                <Link to='/projects'>Projects</Link>
              </li>
              <li>
                <Link to='/TODOs'>TODOs</Link>
              </li>
              <li>
                {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
              </li>
            </ul>
        </nav>
            <Routes>
                <Route path='/' element={<UserList items={this.state.users} />} />
                  <Route path='/user/:id' element={<UserProjectList items={this.state.projects} />} />
                
                <Route exact path='/projects' element={<ProjectList items={this.state.projects} />} />
                  <Route path='/project/:id' element={<ProjectTODOList items={this.state.TODOs} />} />

                <Route path='/TODOs' element={<TODOList items={this.state.TODOs} />} />

                <Route exact path='/login' component={() => <LoginForm />} />

                <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />

                <Route exact path='/projects' component={() => <ProjectList items={this.state.projects} deleteProject={(id)=>this.deleteProject(id)} />} />
                <Route exact path='/TODOs' component={() => <TODOList items={this.state.TODOs} deleteTODO={(id)=>this.deleteTODO(id)} />} />

                <Route exact path='/projects/create' component={() => <ProjectForm createProject={(name, user) => this.createProject(name, user)} />} />
                <Route exact path='/TODOs/create' component={() => <TODOForm createTODO={(name, project) => this.createTODO(name, project)} />} />
                
                <Route element={NotFound404} />
            </Routes> 
        <Footer />
        </BrowserRouter>
      </div>
    )
  }
}
  
export default App;