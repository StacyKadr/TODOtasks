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
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom'


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
    const user1 = {id: 1, name: 'User001', birthday_year: 1980}
    const user2 = {id: 2, name: 'User002', birthday_year: 1999}
    const user3 = {id: 3, name: 'User003', birthday_year: 1989}
    const users = [user1, user2, user3]
    const project1 = {id: 1, name: 'Homework 6', user: user1}
    const project2 = {id: 2, name: 'Homework 7', user: user1}
    const project3 = {id: 3, name: 'Homework 8', user: user2}
    const projects = [project1, project2, project3]
    const TODOs1 = {id: 1, description: 'Task 1', created: '01.04.2022', project: project1}
    const TODOs2 = {id: 2, description: 'Task 2', created: '06.04.2022', project: project1}
    const TODOs3 = {id: 3, description: 'Task 1', created: '10.04.2022', project: project2}
    const TODOs4 = {id: 4, description: 'Task 2', created: '15.04.2022', project: project2}
    const TODOs5 = {id: 5, description: 'Task 1', created: '21.04.2022', project: project3}
    const TODOs6 = {id: 6, description: 'Task 2', created: '23.04.2022', project: project3}
    const TODOs = [TODOs1, TODOs2, TODOs3, TODOs4, TODOs5, TODOs6]
    this.state = {
      'users': users,
      'projects': projects,
      'TODOs': TODOs
    }
  }

  componentDidMount() {
    axios.get('http:127.0.0.1:8000/api/users')
    .then(response => {
      const users = response.data
        this.setState(
          {
            'users':users
          }
        )
    }).catch(error => console.log(error))

  axios.get('http:127.0.0.1:8000/api/projects')
    .then(response => {
      const projects = response.data
        this.setState(
          {
            'projects':projects
          }
        )
    }).catch(error => console.log(error))

  axios.get('http:127.0.0.1:8000/api/TODOs')
    .then(response => {
      const TODOs = response.data
        this.setState(
          {
            'TODOs':TODOs
          }
        )
    }).catch(error => console.log(error))
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
            </ul>
        </nav>
            <Routes>
                <Route path='/' element={<UserList items={this.state.users} />} />
                  <Route path='/user/:id' element={<UserProjectList items={this.state.projects} />} />
                
                <Route exact path='/projects' element={<ProjectList items={this.state.projects} />} />
                  <Route path='/project/:id' element={<ProjectTODOList items={this.state.TODOs} />} />

                <Route path='/TODOs' element={<TODOList items={this.state.TODOs} />} />

                <Route element={NotFound404} />
            </Routes> 
        <Footer />
        </BrowserRouter>
      </div>
    )
  }
}
  
export default App;