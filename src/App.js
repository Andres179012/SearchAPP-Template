import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import firebase from './firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    form:{
      name: '',
      url: '',
      user: '',
      password: '',
      search:"",
    },
    id: 0
  };

  peticionGet = () => {
    firebase.child("webs").on("value", (web) => {
      if (web.val() !== null) {
        this.setState({ ...this.state.data, data: web.val() });
      } else {
        this.setState({ data: [] });
      }
    });
  };

  peticionPost=()=>{
    firebase.child("webs").push(this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalInsertar: false});
  }

  peticionPut=()=>{
    firebase.child(`webs/${this.state.id}`).set(
      this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalEditar: false});
  }

  peticionDelete=()=>{
    if(window.confirm(`You're sure you want to remove the channel? ${this.state.form && this.state.form.canal}?`))
    {
    firebase.child(`webs/${this.state.id}`).remove(
      error=>{
        if(error)console.log(error)
      });
    }
  }

  handleChange=e=>{
    this.setState({form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }})
    console.log(this.state.form);
  }

  seleccionarWeb=async(web, id, caso)=>{

    await this.setState({form: web, id: id});

    (caso==="Editar")?this.setState({modalEditar: true}):
    this.peticionDelete()

  }

  componentDidMount() {
    this.peticionGet();
  }


  /* search functions */
  onChange = async e=>{
    e.persist();
    await this.setState({search: e.target.value});
    console.log(this.state.search);
  }

  /* Filter */
/*
  filterWebs=() => {
    var searh= data.filter(item =>{
      if(item.name.toString().includes(this.state.form[i].name)){
        return item;
      }
    });
    this.setState({item: i});
  }
*/

  render() {
    return (
      <div className="App">
        <div className="barraBusqueda">
            <input
              type="text"
              placeholder="Search"
              className="textField"
              name="search"
              value={this.state.search}
              onChange={this.onChange}
            />
             <button className="add faEdit" onClick={()=>this.setState({modalInsertar: true})}><FontAwesomeIcon icon={faPlus}/></button>
        </div>
        <br />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>URL</th>
              <th>User</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map(i=>{
             // console.log(i);
              return <tr key={i}>
                <td>{this.state.data[i].name}</td>
                <td>{this.state.data[i].url}</td>
                <td>{this.state.data[i].user}</td>
                <td>{this.state.data[i].password}</td>
                <td className="content_button">
                  <button className="update" onClick={()=>this.seleccionarWeb(this.state.data[i], i, 'Editar')}><FontAwesomeIcon icon={faEdit}/></button>
                  <button className="delete" onClick={()=>this.seleccionarWeb(this.state.data[i], i, 'Eliminar')}><FontAwesomeIcon icon={faTrash}/></button>
                </td>

              </tr>
            })}
          </tbody>
        </table>


        <Modal isOpen={this.state.modalInsertar}>
      <ModalHeader>Insert Record</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Web: </label>
          <br />
          <input type="text" className="form-control" name="name" onChange={this.handleChange}/>
          <br />
          <label>URL: </label>
          <br />
          <input type="text" className="form-control" name="url" onChange={this.handleChange}/>
          <br />
          <label>User: </label>
          <br />
          <input type="text" className="form-control" name="user" onChange={this.handleChange}/>
          <br />
          <label>Password: </label>
          <br />
          <input type="text" className="form-control" name="password" onChange={this.handleChange}/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPost()}>Add</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalInsertar: false})}>Cancel</button>
      </ModalFooter>
    </Modal>



    <Modal isOpen={this.state.modalEditar}>
      <ModalHeader>Editar Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Name: </label>
          <br />
          <input type="text" className="form-control" name="name" onChange={this.handleChange} value={this.state.form && this.state.form.name}/>
          <br />
          <label>URL: </label>
          <br />
          <input type="text" className="form-control" name="url" onChange={this.handleChange} value={this.state.form && this.state.form.url}/>
          <br />
          <label>User: </label>
          <br />
          <input type="text" className="form-control" name="user" onChange={this.handleChange} value={this.state.form && this.state.form.user}/>
          <br />
          <label>Password: </label>
          <br />
          <input type="text" className="form-control" name="password" onChange={this.handleChange} value={this.state.form && this.state.form.password}/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalEditar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>
      </div>
    );
  }
}

export default App;
