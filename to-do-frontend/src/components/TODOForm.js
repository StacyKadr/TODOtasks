import React from 'react'


class TODOForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', project:props.projects[0].id }
    }


    handleChange(event){
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createTODO(this.state.name, this.state.project)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        value={this.state.name} 
                        onChange={(event)=>this.handleChange(event)} 
                    />
                </div>
                
                <div className="form-group">
                    <label for="project">Project</label>

                    <select 
                    name = "project"
                    className="form-control" 
                    onChange={(event)=>this.handleChange(event)} 
                    >
                    {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>                     
        );
    }
}

export default TODOForm