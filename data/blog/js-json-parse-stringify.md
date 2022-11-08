---
title: How To Use JSON.parse() and JSON.stringify()
date: '2022-09-28'
tags: ['Javascript']
draft: false
summary: The JSON object, available in all modern browsers, has two useful methods to deal with JSON-formatted content - parse and stringify.
images: []
layout: PostNew
canonicalUrl: canonical/url
postImg: /static/images/js-json-parse-stringify.png
authors: ['beaf']
readTime: '12 min'
category: Frontend
---

## Introduction

The JSON object, available in all modern browsers, has two useful methods to deal with JSON-formatted content: parse and stringify.

_JSON.parse()_ takes a JSON string and transforms it into a JavaScript object.

```js
let userStr = '{"name":"Sammy","email":"sammy@example.com","plan":"Pro"}'

let userObj = JSON.parse(userStr)

console.log(userObj)
```

Executing this code will produce the following output:

```bash
> Output
{name: 'Sammy', email: 'sammy@example.com', plan: 'Pro'}
  email: "sammy@example.com"
  name: "Sammy"
  plan: "Pro"
```

Trailing commas are not valid in JSON, so _JSON.parse()_ throws an error if the string passed to it has trailing commas.

_JSON.parse()_ can take a function as a second argument that can transform the object values before they are returned.

Here the object’s values are transformed to uppercase in the returned object of the parse method:

```javascript
let userStr = '{"name":"Sammy","email":"sammy@example.com","plan":"Pro"}'

let userObj = JSON.parse(userStr, (key, value) => {
  if (typeof value === 'string') {
    return value.toUpperCase()
  }
  return value
})

console.log(userObj)
```

Executing this code will produce the following output:

```bash
> Output
{name: 'SAMMY', email: 'SAMMY@EXAMPLE.COM', plan: 'PRO'}
  email: "SAMMY@EXAMPLE.COM"
  name: "SAMMY"
  plan: "PRO"
```

The values have been transformed to uppercase characters.

**JSON.stringify()**
_JSON.stringify()_ takes a JavaScript object and transforms it into a JSON string.

```js
let userObj = {
  name: 'Sammy',
  email: 'sammy@example.com',
  plan: 'Pro',
}

let userStr = JSON.stringify(userObj)

console.log(userStr)
```

Executing this code will produce the following output:

```bash
> Output
{"name":"Sammy","email":"sammy@example.com","plan":"Pro"}
```

_JSON.stringify()_ can take two additional arguments. The first one is a replacer function. The second is a String or Number value to use as a space in the returned string.

The replacer function can be used to filter out values, as any value returned as undefined will be out of the returned string:

```js
let userObj = {
  name: 'Sammy',
  email: 'sammy@example.com',
  plan: 'Pro',
}

function replacer(key, value) {
  console.log(typeof value)
  if (key === 'email') {
    return undefined
  }
  return value
}

let userStrReplacer = JSON.stringify(userObj, replacer)

console.log(userStrReplacer)
```

Executing this code will produce the following output:

```bash
> Output
{"name":"Sammy","plan":"Pro"}
The email key-value pair has been removed from the object.
```

And an example with a space argument passed-in:

```js
let userObj = {
  name: 'Sammy',
  email: 'sammy@example.com',
  plan: 'Pro',
}

let userStrSpace = JSON.stringify(user, null, '...')

console.log(userStrSpace)
```

Executing this code will produce the following output:

```bash
Output
{
..."name": "Sammy",
..."email": "sammy@example.com",
..."plan": "Pro"
}
```

The indentation has been replaced with ....

## Conclusion

In this tutorial, you used the _JSON.parse()_ and _JSON.stringify()_ methods. If you’d like to learn more about working with JSON in Javascript, check out our How To Work with JSON in JavaScript tutorial.

For more information on coding in JavaScript, take a look at our How To Code in JavaScript series, or check out our JavaScript topic page for exercises and programming projects.
