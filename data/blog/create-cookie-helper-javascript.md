---
title: Cookie Utility Functions - set, get, and delete
date: '2023-04-16'
tags: ['Javascript']
draft: false
summary: Cookies are a useful way to store information in a user's browser. They can be used to save user preferences, login credentials, and other data that can be accessed across multiple pages or sessions.
images: []
layout: PostNew
canonicalUrl: canonical/url
postImg: /static/images/Cookies-in-JavaScript.jpeg
authors: ['beaf']
readTime: '4 min'
category: Frontend
---

Cookies are a useful way to store information in a user's browser. They can be used to save user preferences, login credentials, and other data that can be accessed across multiple pages or sessions. Here, we'll explore three utility functions that make working with cookies in JavaScript a little easier.

## The `setCookie()` Function

The `setCookie()` function is used to set a cookie with a given name, value, and expiration time. It takes three arguments: `name` (string), `value` (string), and `hours` (optional number, defaults to 24). Here's how it works:

```js
function setCookie(name, value, hours = 24) {
  let expires = ''
  if (hours) {
    const date = new Date()
    date.setTime(date.getTime() + hours * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/'
}
```

This function first checks if an `hours` argument was provided. If it was, it creates a new `Date` object and sets the expiration time to `hours` in the future. The `expires` variable is then set to a string that includes this date in UTC format. Finally, the cookie is set by assigning a string to the `document.cookie` property. This string includes the cookie name, value (which is first encoded using `encodeURIComponent()`), the expiration time, and the cookie path ("/" means the cookie is available to all pages on the domain).

## The `getCookie()` Function

The `getCookie()` function is used to retrieve a cookie value by its name. It takes one argument: `name` (string). Here's how it works:

```js
function getCookie(name) {
  const nameEQ = name + '='
  const ca = document?.cookie?.split(';') || []
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length))
    }
  }
  return ''
}
```

This function first creates a string (`nameEQ`) that includes the cookie name followed by an equal sign. It then splits the `document.cookie` string into an array of cookie strings using the semicolon as a delimiter. It loops through this array, removing any whitespace from each cookie string and checking if it starts with `nameEQ`. If it does, it returns the value of the cookie (which is decoded using `decodeURIComponent()`). If the loop finishes without finding a matching cookie, it returns an empty string.

### The `deleteCookie()` Function

The `deleteCookie()` function is used to delete a cookie by its `name`. It takes one argument: name (string). Here's how it works:

```js
function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}
```

This function simply sets the value of the cookie with the given name to an empty string and sets the expiration time to a date in the past. This effectively deletes the cookie.

## Exporting the Functions

To use these functions in other JavaScript files, we need to `export` them. We can do this using the export statement at the bottom of the file:

```js
export { setCookie, getCookie, deleteCookie }
```

## Conclusion

In conclusion, these three cookie utility functions make it easy to work with cookies in JavaScript. The `setCookie()` function lets you set a cookie with a given name, value, and expiration time. The `getCookie()` function retrieves a cookie value by its name. Finally, the `deleteCookie()` function deletes a cookie by its name. These functions can be used to store and retrieve user preferences, session data, and other important information in a user's browser. By exporting these functions, you can use them across multiple JavaScript files and make your code more modular and reusable.
