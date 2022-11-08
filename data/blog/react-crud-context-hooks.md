---
title: How To Build a CRUD App with React Hooks and the Context API
date: '2022-03-16'
tags: ['ReactJs', 'Javascript']
draft: false
summary: The introduction of the Context API solves one major problem - prop drilling. The process of getting our data from one component to another through layers of nested deep components.
images: []
layout: PostNew
canonicalUrl: canonical/url
postImg: /static/images/react-crud-context-hooks.jpeg
authors: ['beaf']
readTime: '15 min'
category: Frontend
---

The introduction of the Context API solves one major problem: prop drilling. The process of getting our data from one component to another through layers of nested deep components. React hooks allows the use of functional rather than class-based components. Where we needed to utilize a lifecycle method, we had to use a class-based approach. And we now no longer have to call _super(props)_ or worry about binding methods or the [^this] keyword.

In this article, you will use Context API and React hooks together to build a fully functional CRUD application that emulates a list of employees. It will read employee data, create new employees, update employee data, and delete employees. Note, that this tutorial will not be using any external API calls. For the sake of demonstration, it will be using hard-coded objects which will serve as the state.

## Step 1 — Setting Up the Project

First, start with setting up the React project using [Create React App](https://www.digitalocean.com/community/tutorials/react-create-react-app 'Title') with the following command:

```bash
npx create-react-app react-crud-employees-example
```

Navigate to the newly created project directory:

```bash
cd react-crud-employees-example
```

Next, add react-router-dom as a dependency by running the following command:

```bash
npm install react-router-dom@5.2.0
```

Next, open index.js in your code editor and modify it to use tailwind.css and BrowserRouter:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './tailwind.css';
import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  <BrowserRouter>
  document.getElementById('root')
);
```

At this point, you will have a new React project with Tailwind CSS and react-router-dom.

## Building the AppReducer and GlobalContext

First, under the src directory, create a new context directory.

In this new directory, create a new AppReducer.js file. This reducer will define CRUD actions like ADD_EMPLOYEE, EDIT_EMPLOYEE, and REMOVE_EMPLOYEE. Open this file in your code editor and add the following lines of code:

```js
export default function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        employees: [...state.employees, action.payload],
      }

    case 'EDIT_EMPLOYEE':
      const updatedEmployee = action.payload

      const updatedEmployees = state.employees.map((employee) => {
        if (employee.id === updatedEmployee.id) {
          return updatedEmployee
        }
        return employee
      })

      return {
        ...state,
        employees: updatedEmployees,
      }

    case 'REMOVE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter((employee) => employee.id !== action.payload),
      }

    default:
      return state
  }
}
```

ADD_EMPLOYEES will take a payload value containing new employees and return the updated employee state.

EDIT_EMPLOYEE will take a payload value and compare the id with the employees - if it finds a match, it will use the new payload values and return the updated employee state.

REMOVE_EMPLOYEE will take a payload value and compare the id with the employees - if it finds a match, it will remove that employee and return the updated employee state.

While remaining in the context directory, create a new GlobalState.js file. It will contain an initial hard-coded value to emulate employee data returned from a request. Open this file in your code editor and add the following lines of code:

```js
import React, { createContext, useReducer } from 'react'

import appReducer from './AppReducer'

const initialState = {
  employees: [
    {
      id: 1,
      name: 'Sammy',
      location: 'DigitalOcean',
      designation: 'Shark',
    },
  ],
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  function addEmployee(employee) {
    dispatch({
      type: 'ADD_EMPLOYEE',
      payload: employee,
    })
  }

  function editEmployee(employee) {
    dispatch({
      type: 'EDIT_EMPLOYEE',
      payload: employee,
    })
  }

  function removeEmployee(id) {
    dispatch({
      type: 'REMOVE_EMPLOYEE',
      payload: id,
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        employees: state.employees,
        addEmployee,
        editEmployee,
        removeEmployee,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
```

This code adds some functionality to dispatch an action that goes into the reducer file to switch upon the case that corresponds to each action.

At this point, you should have a React application with AppReducer.js and GlobalState.js.

Let’s create an EmployeeList component to verify that the application is in working order. Navigate to the src directory and create a new components directory. In that directory, create a new EmployeeList.js file and add the following code:

```js
import React, { useContext } from 'react'

import { GlobalContext } from '../context/GlobalState'

export const EmployeeList = () => {
  const { employees } = useContext(GlobalContext)
  return (
    <React.Fragment>
      {employees.length > 0 ? (
        <React.Fragment>
          {employees.map((employee) => (
            <div className="mb-10 flex items-center bg-gray-100 shadow" key={employee.id}>
              <div className="m-2 flex-auto px-4 py-2 text-left">
                <p className="leading-none text-gray-900">{employee.name}</p>
                <p className="text-gray-600">{employee.designation}</p>
                <span className="mt-1 inline-block text-sm font-semibold">{employee.location}</span>
              </div>
            </div>
          ))}
        </React.Fragment>
      ) : (
        <p className="bg-gray-100 py-5 text-center text-gray-500">No data.</p>
      )}
    </React.Fragment>
  )
}
```

This code will display the employee.name, employee.designation, and employee.location for all employees.

Next, open App.js in your code editor. And add EmployeeList and GlobalProvider.

```js
import { EmployeeList } from './components/EmployeeList'

import { GlobalProvider } from './context/GlobalState'

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <EmployeeList />
      </div>
    </GlobalProvider>
  )
}

export default App
```

Run your application and observe it in a web browser:

## Building the AddEmployee and EditEmployee Components

In this step, you will build the components to supporting creating a new employee and updating an existing employee.

Now, navigate back to the components directory. Create a new AddEmployee.js file. This will serve as the AddEmployee component which will include an onSubmit handler to push the values of the form field into the state:

```js
import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'

export const AddEmployee = () => {
  let history = useHistory()

  const { addEmployee, employees } = useContext(GlobalContext)

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [designation, setDesignation] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const newEmployee = {
      id: employees.length + 1,
      name,
      location,
      designation,
    }
    addEmployee(newEmployee)
    history.push('/')
  }

  return (
    <React.Fragment>
      <div className="container mx-auto mt-20 w-full max-w-sm">
        <form onSubmit={onSubmit}>
          <div className="mb-5 w-full">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="name"
            >
              Name of employee
            </label>
            <input
              className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:text-gray-600 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </div>
          <div className="mb-5 w-full">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:text-gray-600"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              placeholder="Enter location"
            />
          </div>
          <div className="mb-5 w-full">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="designation"
            >
              Designation
            </label>
            <input
              className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:text-gray-600 focus:outline-none"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              type="text"
              placeholder="Enter designation"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="focus:shadow-outline mt-5 w-full rounded bg-green-400 py-2 px-4 font-bold text-white hover:bg-green-500 focus:outline-none">
              Add Employee
            </button>
          </div>
          <div className="mt-4 text-center text-gray-500">
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}
```

In this code setName, setLocation, and setDesignation will take the current values that users enter into the form fields. These values will be wrapped in a new constant, newEmployee, with a unique id (adding one to the total length). Then, the route will be changed to the main screen which will display the updated list of employees - including the newly added employee.

The AddEmployee component imported GlobalState and useContext, one of the built-in React Hooks, giving functional components easy access to our context.

The employees object, removeEmployee, and editEmployees were imported from the GlobalState.js file.

While still in the components directory, create a new EditEmployee.js file. This will serve as the editEmployee component which will include functionality for editing the existing objects from the state:

```js
import React, { useState, useContext, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'

export const EditEmployee = (route) => {
  let history = useHistory()

  const { employees, editEmployee } = useContext(GlobalContext)

  const [selectedUser, setSelectedUser] = useState({
    id: null,
    name: '',
    designation: '',
    location: '',
  })

  const currentUserId = route.match.params.id

  useEffect(() => {
    const employeeId = currentUserId
    const selectedUser = employees.find(
      (currentEmployeeTraversal) => currentEmployeeTraversal.id === parseInt(employeeId)
    )
    setSelectedUser(selectedUser)
  }, [currentUserId, employees])

  const onSubmit = (e) => {
    e.preventDefault()
    editEmployee(selectedUser)
    history.push('/')
  }

  const handleOnChange = (userKey, newValue) =>
    setSelectedUser({ ...selectedUser, [userKey]: newValue })

  if (!selectedUser || !selectedUser.id) {
    return <div>Invalid Employee ID.</div>
  }

  return (
    <React.Fragment>
      <div className="container mx-auto mt-20 w-full max-w-sm">
        <form onSubmit={onSubmit}>
          <div className="mb-5 w-full">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="name"
            >
              Name of employee
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:text-gray-600"
              value={selectedUser.name}
              onChange={(e) => handleOnChange('name', e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </div>
          <div className="mb-5  w-full">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:text-gray-600"
              value={selectedUser.location}
              onChange={(e) => handleOnChange('location', e.target.value)}
              type="text"
              placeholder="Enter location"
            />
          </div>
          <div className="mb-5  w-full">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="designation"
            >
              Designation
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:text-gray-600"
              value={selectedUser.designation}
              onChange={(e) => handleOnChange('designation', e.target.value)}
              type="text"
              placeholder="Enter designation"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="focus:shadow-outline mt-5 block w-full rounded bg-green-400 py-2 px-4 font-bold text-white hover:bg-green-500 focus:text-gray-600">
              Edit Employee
            </button>
          </div>
          <div className="mt-4 text-center text-gray-500">
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}
```

This code uses the useEffect hook, which is invoked when the component is mounted. Inside this hook, the current route parameter will be compared with the same parameter in the employees object from the state.

onChange event listeners are triggered when the user makes a change to the form fields. The userKey and the newValue are passed to setSelectedUser. selectedUser is spread and userKey is set as the key and newValue is set as the value.

## Step 4 — Setting Up Routes

In this step, you will update the EmployeeList to link to the AddEmployee and EditEmployee components.

Revisit EmployeeList.js and modify it to use Link and removeEmployee:

```js
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'

export const EmployeeList = () => {
  const { employees, removeEmployee } = useContext(GlobalContext)
  return (
    <React.Fragment>
      {employees.length > 0 ? (
        <React.Fragment>
          {employees.map((employee) => (
            <div className="mb-10 flex items-center bg-gray-100 shadow" key={employee.id}>
              <div className="m-2 flex-auto px-4 py-2 text-left">
                <p className="leading-none text-gray-900">{employee.name}</p>
                <p className="text-gray-600">{employee.designation}</p>
                <span className="mt-1 inline-block text-sm font-semibold">{employee.location}</span>
              </div>
              <div className="m-2 flex-auto px-4 py-2 text-right">
                <Link to={`/edit/${employee.id}`} title="Edit Employee">
                  <div className="mr-3 inline-flex items-center rounded-full bg-gray-300 py-2 px-4 font-semibold text-gray-800 hover:bg-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-edit"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </div>
                </Link>
                <button
                  onClick={() => removeEmployee(employee.id)}
                  className="block inline-flex items-center rounded-full bg-gray-300 py-2 px-4 font-semibold text-gray-800 hover:bg-gray-400"
                  title="Remove Employee"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-trash-2"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </React.Fragment>
      ) : (
        <p className="bg-gray-100 py-5 text-center text-gray-500">No data.</p>
      )}
    </React.Fragment>
  )
}
```

This code will add two icons next to the employee information. The pencil and paper icon represents “Edit” and links to the EditEmployee component. The trashbin icon represents “Remove” and clicking on it will fire removeEmployee.

Next, you will create two new components - Heading and Home - to display the EmployeeList component and provide users with access to the AddEmployee component.

In the components directory, create a new Heading.js file:

```js
import React from 'react'
import { Link } from 'react-router-dom'

export const Heading = () => {
  return (
    <div>
      <div className="mt-24 mb-10 flex items-center">
        <div className="m-2 flex-grow px-4 py-2 text-left">
          <h5 className="text-xl font-bold text-gray-900">Employee Listing</h5>
        </div>
        <div className="m-2 flex-grow px-4 py-2 text-right">
          <Link to="/add">
            <button className="inline-flex items-center rounded bg-green-400 py-2 px-4 font-semibold text-white hover:bg-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-plus-circle"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <span className="pl-2">Add Employee</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
```

In the components directory, create a new Home.js file:

```js
import React from 'react'
import { Heading } from './Heading'
import { EmployeeList } from './EmployeeList'

export const Home = () => {
  return (
    <React.Fragment>
      <div className="container mx-auto">
        <h3 className="mt-20 text-center text-3xl text-base font-bold uppercase leading-8 tracking-wide text-black">
          CRUD with React Context API and Hooks
        </h3>
        <Heading />
        <EmployeeList />
      </div>
    </React.Fragment>
  )
}
```

Revisit App.js and import Route and Switch from react-router-dom. Assign the Home, AddeEmployee and EditEmployee components to each route:

```js
import { Route, Switch } from 'react-router-dom'

import { GlobalProvider } from './context/GlobalState'

import { Home } from './components/Home'
import { AddEmployee } from './components/AddEmployee'
import { EditEmployee } from './components/EditEmployee'

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/add" component={AddEmployee} exact />
          <Route path="/edit/:id" component={EditEmployee} exact />
        </Switch>
      </div>
    </GlobalProvider>
  )
}

export default App
```

Compile the app and observe it in your browser.

You will be routed to the Home component with the Heading and EmployeeList components:

## Conclusion

In this article, you used Context API and React hooks together to build a fully functional CRUD application.

If you’d like to learn more about React, take a look at our How To Code in React.js series, or check out our React topic page for exercises and programming projects.
