---
title: How To Use *.map()* to Iterate Through Array Items in JavaScript
date: '2022-10-28'
tags: ['Javascript']
draft: false
summary: From the classic for loop to the forEach() method, various techniques and methods are used to iterate through datasets in JavaScript.
images: []
layout: PostNew
canonicalUrl: canonical/url
postImg: /static/images/map-in-javascript.jpeg
authors: ['JoeHaddad']
readTime: '4 min'
category: Frontend
---

From the classic for loop to the _forEach()_ method, various techniques and methods are used to iterate through datasets in JavaScript. One of the most popular methods is the _map()_ method. _.map()_ creates an array from calling a specific function on each item in the parent array. _map()_ is a non-mutating method that creates a new array, as opposed to mutating methods, which only make changes to the calling array.

This method can have many uses when working with arrays. In this tutorial, you’ll look at four noteworthy uses of _map()_ in JavaScript: calling a function of array elements, converting strings to arrays, rendering lists in JavaScript libraries, and reformatting array objects.

## Step 1 — Calling a Function on Each Item in an Array

_.map()_ accepts a callback function as one of its arguments, and an important parameter of that function is the current value of the item being processed by the function. This is a required parameter. With this parameter, you can modify each item in an array and return it as a modified member of your new array.

Here’s an example:

```js
const sweetArray = [2, 3, 4, 5, 35]
const sweeterArray = sweetArray.map((sweetItem) => {
  return sweetItem * 2
})

console.log(sweeterArray)
```

This output is logged to the console:

```bash
Output
[ 4, 6, 8, 10, 70 ]
```

This can be simplified further to make it cleaner with:

```js
// create a function to use
const makeSweeter = (sweetItem) => sweetItem * 2

// we have an array
const sweetArray = [2, 3, 4, 5, 35]

// call the function we made. more readable
const sweeterArray = sweetArray.map(makeSweeter)

console.log(sweeterArray)
```

The same output is logged to the console:

```bash
Output
[ 4, 6, 8, 10, 70 ]
```

Having code like sweetArray.map(makeSweeter) makes your code a bit more readable.

## Step 2 — Converting a String to an Array

_.map()_ is known to belong to the array prototype. In this step you will use it to convert a string to an array. You are not developing the method to work for strings here. Rather, you will use the special .call() method.

Everything in JavaScript is an object, and methods are functions attached to these objects. .call() allows you to use the context of one object on another. Therefore, you would be copying the context of _.map()_ in an array over to a string.

.call() can be passed arguments of the context to be used and parameters for the arguments of the original function.

Here’s an example:

```js
const name = 'Sammy'
const map = Array.prototype.map

const newName = map.call(name, (eachLetter) => {
  return `${eachLetter}a`
})

console.log(newName)
```

This output is logged to the console:

```bash
Output
[ "Sa", "aa", "ma", "ma", "ya" ]
```

Here, you used the context of _.map()_ on a string and passed an argument of the function that _.map()_ expects.

This works like the .split() method of a string, except that each individual string characters can be modified before being returned in an array.

### Step 3 — Rendering Lists in JavaScript Libraries

JavaScript libraries like React use _.map()_ to render items in a list. This requires JSX syntax, however, as the _.map()_ method is wrapped in JSX syntax.

Here’s an example of a React component:

```js
import React from 'react'
import ReactDOM from 'react-dom'

const names = ['whale', 'squid', 'turtle', 'coral', 'starfish']

const NamesList = () => (
  <div>
    <ul>
      {names.map((name) => (
        <li key={name}> {name} </li>
      ))}
    </ul>
  </div>
)

const rootElement = document.getElementById('root')
ReactDOM.render(<NamesList />, rootElement)
```

This is a stateless component in React, which renders a div with a list. The individual list items are rendered using _.map()_ to iterate over the names array. This component is rendered using ReactDOM on the DOM element with Id of root.

## Step 4 — Reformatting Array Objects

_.map()_ can be used to iterate through objects in an array and, in a similar fashion to traditional arrays, modify the content of each individual object and return a new array. This modification is done based on what is returned in the callback function.

Here’s an example:

```js
const myUsers = [
  { name: 'shark', likes: 'ocean' },
  { name: 'turtle', likes: 'pond' },
  { name: 'otter', likes: 'fish biscuits' },
]

const usersByLikes = myUsers.map((item) => {
  const container = {}

  container[item.name] = item.likes
  container.age = item.name.length * 10

  return container
})

console.log(usersByLikes)
```

This output is logged to the console:

```bash
Output
[
    {shark: "ocean", age: 50},
    {turtle: "pond", age: 60},
    {otter: "fish biscuits", age: 50}
]
```

Here, you modified each object in the array using the bracket and dot notation. This use case can be employed to process or condense received data before being saved or parsed on a front-end application.

## Conclusion

In this tutorial, we looked at four uses of the _.map()_ method in JavaScript. In combination with other methods, the functionality of _.map()_ can be extended. For more information, see our How To Use Array Methods in JavaScript: Iteration Methods article.
