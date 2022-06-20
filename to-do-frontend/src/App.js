import React from 'react';
import axios from 'axios';
import './App.css';
import UserList from './components/User.js';
import Footer from './components/Footer.js';
import Menu from './components/Menu.js';
import ProjectList from './components/Projects.js';
import UserProjectList from './components/UserProject';
//import TODOList from './components/TODO.js';
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
    const users = [user1, user2]
    const project1 = {id: 1, name: 'Homework 6', user: user1}
    const project2 = {id: 2, name: 'Homework 7', user: user1}
    const project3 = {id: 3, name: 'Homework 8', user: user2}
    const projects = [project1, project2, project3]
    this.state = {
      'users': users,
      'projects': projects
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

    axios.get('http:127.0.0.1:8000/api/Projects')
      .then(response => {
        const projects = response.data
          this.setState(
            {
              'projects':projects
            }
          )
      }).catch(error => console.log(error))

    axios.get('http:127.0.0.1:8000/api/TODO')
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
        <p className="Table-header">User Table</p>
        <Table users={users}/>
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
              <Route exact path='/' element={() => <UserList items={this.state.users} />} />
              <Route exact path='/projects' element={() => <ProjectList items={this.state.projects} />} />
            
              {/* <Route path="/user/:id"> 
                <UserProjectList items={this.state.projects} />
              </Route> */}

              <Route element={NotFound404} />
            </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    )
  }
}
  
export default App;