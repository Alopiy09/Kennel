import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"

import AnimalList from './animal/AnimalList'
import LocationList from './locations/LocationList'
import EmployeeList from './employees/Employees'
import OwnerList from './owners/OwnersList'

import AnimalManager from "../modules/AnimalManager"
import EmployeeManager from '../modules/EmployeeManager';
import OwnerManager from '../modules/OwnerManager';
import LocationManager from '../modules/LocationManager';

import AnimalDetail from './animal/AnimalDetail';
import AnimalForm from './animal/AnimalForm';
import EmployeeForm from './employees/EmployeeForm';

import Login from './authentication/Login'
import settings from "../modules/settings";
import AnimalEditForm from "./animal/AnimalEditForm";

export default class ApplicationViews extends Component {

    // Check if credentials are in local storage
    isAuthenticated = () => sessionStorage.getItem("credentials") !== null


    state = {
        employees: [],
        locations: [],
        animals: [],
        owners: [],
        animalOwners: []
    }

    componentDidMount() {
        const newState = {}

        AnimalManager.getAll().then(allAnimals => {
            this.setState({
                animals: allAnimals
            })
        })
        EmployeeManager.getAll().then(allEmployees => {
            this.setState({
                employees: allEmployees
            })
        })
        OwnerManager.getAll().then(allOwners => {
            this.setState({
                owners: allOwners
            })
        })
        LocationManager.getAll().then(allLocations => {
            this.setState({
                locations: allLocations
            })
        })
            .then(() => this.setState(newState))
    }



    deleteAnimal = id => {
        return fetch(`http://localhost:5002/animals/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(() => fetch(`http://localhost:5002/animals`))
            .then(e => e.json())
            .then(animals => this.setState({
                animals: animals
            })
            )
    }
    addAnimal = animal =>
        AnimalManager.addNewAnimal(animal)
            .then(() => AnimalManager.getAll())
            .then(animals =>
                this.setState({
                    animals: animals
                })
            );

    deleteEmployee = id => {
        return fetch(`http://localhost:5002/employees/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(() => fetch(`http://localhost:5002/employees`))
            .then(e => e.json())
            .then(employees => this.setState({
                employees: employees
            })
            )
    }
    addEmployee = employee =>
        EmployeeManager.addNewEmployee(employee)
            .then(() => EmployeeManager.getAll())
            .then(employees =>
                this.setState({
                    employees: employees
                })
            );
    deleteOwner = id => {
        return fetch(`http://localhost:5002/owners/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(() => fetch(`http://localhost:5002/owners`))
            .then(e => e.json())
            .then(owners => this.setState({
                owners: owners
            })
            )
    }
    put(editedAnimal) {
        return fetch(`${settings}/animals/${editedAnimal.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedAnimal)
        }).then(data => data.json());
      }

      updateAnimal = (editedAnimalObject) => {
        return AnimalManager.addNewAnimal(editedAnimalObject)
        .then(() => AnimalManager.getAll())
        .then(animals => {
          this.setState({
            animals: animals
          })
        });
      };
    componentDidUpdate() {
        console.log("componentDidUpdate -- ApplicationViews")
    }

    // addOwner = owner =>
    // OwnerManager.addNewOwner(owner)
    //   .then(() => OwnerManager.getAll())
    //   .then(owners =>
    //     this.setState({
    //       owners: owners
    //     })
    //   );

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <LocationList {...props} locations={this.state.locations} />
                }} />
                <Route exact path="/animals" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <AnimalList {...props}
                            deleteAnimal={this.deleteAnimal}
                            animals={this.state.animals} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                {/* Our shiny new route. We pass employees to the AnimalForm so a dropdown can be populated */}
                <Route path="/animals/new" render={(props) => {
                    return <AnimalForm {...props}
                        addAnimal={this.addAnimal}
                        employees={this.state.employees} />
                }} />
                <Route exact path="/employees" render={props => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList deleteEmployee={this.deleteEmployee}
                            animals={this.state.animals}
                            employees={this.state.employees} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/employee/new" render={(props) => {
                    return <EmployeeForm {...props}
                        addEmployee={this.addNewEmployee}
                        employees={this.state.employees} />
                }} />
                <Route path="/owners" render={(props) => {
                    return <OwnerList {...props}
                    deleteOwner={this.deleteOwner}
                    owners={this.state.owners} />
                }} />
                <Route
                    exact path="/animals/:animalId(\d+)"
                    render={props => {
                        return (
                            <AnimalDetail
                                {...props}
                                deleteAnimal={this.deleteAnimal}
                                animals={this.state.animals}
                            />
                        );
                    }}
                />
                <Route
                    path="/animals/:animalId(\d+)/edit" render={props => {
                        return <AnimalEditForm {...props}
                        employees={this.state.employees}
                        updateAnimal={this.updateAnimal} />
                    }}
                />
                <Route path="/login" component={Login} />
            </React.Fragment>
        )
    }
}

