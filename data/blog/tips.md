---
title: Useful Tips
date: '2021-07-20'
tags: ['React', 'Javascript', 'Python']
draft: false
summary: These are some useful tips that could come handle
images: []
layout: PostNew
canonicalUrl: canonical/url
postImg: /static/images/tips.png
authors: ['beaf']
readTime: '3 min'
category: Backend
---

### Overview

These are some useful tips i used whenever i'm solving peculiar problems.

### Create a debounce hook in react

```js
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [value])

  return debouncedValue
}
```

### Create a virtual environment with a specific python version

Create a python virtual environment using a specific python version. This allows you to have different environments in different versions.

```python
mkvirtualenv -p python3.9.7 myenv
```

This will create a new virtual environment called myenv with Python 3.9 as the default Python interpreter. You can activate the virtual environment by running the following command:

```python
source myenv/bin/activate
```

You can then use the python command to verify that the virtual environment is using Python 3.9:

```python
python -V
```

### Aborting http request in React using fetch

```js
export default function abortExample {
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { signal })
            .then((res) => res.json())
            .then((data) => {
                // handle data
            })
            .catch(err => {
                if(err.name === "AbortError") {
                    // handle abort error
                } else {
                    // handle api error
                }
            });

        return () => {
            controller.abort();
        };
    }, [id])
}
```

### Aborting http request in React using axios

```js
export default function abortExample {
    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`, { cancelToken: cancelToken.token })
            .then((data) => {
                // handle data
            })
            .catch(err => {
                if(axios.isCancel(err)) {
                    // handle abort error
                } else {
                    // handle api error
                }
            });

        return () => {
            cancelToken.cancel();
        };
    }, [id])
}
```

### ESLint tips

To ignore a specific line or block of code in ESLint, you can add a comment at the beginning of the line or block with the text /_eslint-disable_/. This will tell ESLint to ignore any linting errors for the code that follows. To re-enable linting, add the comment /_eslint-enable_/ at the end of the ignored block.

Alternatively, you can disable a specific rule for a line by adding a comment // eslint-disable-next-line rule-name or you can disable specific rule for a block by adding a comment /_eslint-disable rule-name_/ at the beginning of the block and /_eslint-enable rule-name_/ at the end of the block.

```js
/*eslint-disable*/

/*eslint-disable rule-name*/
```

### Audit Logger Python

To use this function, you'll need to make sure the Flask app is running in your program and that the current_app context is available.

```python
def audit_log(event, user, level='info'):
  """
  Logs an audit event.

  Parameters:
  - event (str): The event to log.
  - user (str): The user who triggered the event.
  - level (str, optional): The log level (default: 'info').

  Example:
  audit_log('User login', 'jane@example.com')
  """
  # Get the current time, the user's IP address, the request method, and the request payload
  timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
  ip_address = request.remote_addr
  method = request.method
  payload = request.get_json()

  # Format the log message
  message = f'[AUDIT LOG] [{timestamp}] {level}: {event} - User: {user} - IP: {ip_address} - Method: {method} - Payload: {payload}'

  # Write the message to the logger
  current_app.logger.info(message)
```

This documentation explains the purpose and parameters of the audit_log() function, as well as its return value (if any). It also provides an example of how to call the function.

### Check Number Tip

We can check if the input of a html element is a number using the function below.

```js
function isNumber(evt) {
  if (evt.type === 'keypress') {
    const charCode = evt.charCode
    if ((charCode < 48 || charCode > 57) && (charCode !== 46 || !this.context.float)) {
      evt.preventDefault()
    }
  }
}
```

### Handling float in Python

To round a float to 2 decimal places in Python, you can use the built-in round function. For example:

```python
x = 3.14159
y = round(x, 2)
print(y)  # prints 3.14
```

Alternatively, you can use the format function to achieve the same result:

```python
x = 3.14159
y = format(x, '.2f')
print(y)  # prints 3.14
```

Both of these approaches will give you a string representation of the float rounded to 2 decimal places. If you want to keep the result as a float, you can use the float function to convert the string back to a float.

```python
x = 3.14159
y = float(format(x, '.2f'))
print(y)  # prints 3.14
```

## Sleep in Javascript

Here is a simple sleep function in JavaScript that can be used to pause the execution of a script for a specified amount of time:

```js
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
```

The function returns a Promise that resolves after the specified time ms has passed. You can use it in your code like this:

```js
async function doSomething() {
  console.log('Doing something...')
  await sleep(2000)
  console.log('Done!')
}
```

In this example, the doSomething function will log "Doing something..." to the console, then pause for 2 seconds (2000 milliseconds), and finally log "Done!" to the console.

## Dynamic title in Vue3

Here is an example of how to add dynamic titles to your Vue3 application.

```js
// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title)

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags)

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map((el) =>
    el.parentNode.removeChild(el)
  )

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next()

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement('meta')

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key])
      })

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '')

      return tag
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag))

  next()
})
```

Add the code above to your route file.

You can add the title to your like using the example below.

```json
{
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard/Index.vue'),
    meta: {
      title: 'Welcome to the dashboard'
    }
}
```

## Build URL with Query Params

Here's an example of a JavaScript function that takes a base URL, along with an object containing query parameters, and returns the constructed URL with the query parameters appended:

```js
function buildUrl(baseUrl, queryParams) {
  let url = baseUrl
  let firstQueryParam = true

  for (let key in queryParams) {
    if (queryParams.hasOwnProperty(key)) {
      if (firstQueryParam) {
        url += `?${key}=${queryParams[key]}`
        firstQueryParam = false
      } else {
        url += `&${key}=${queryParams[key]}`
      }
    }
  }

  return url
}
```

You can use this function like this:

```js
const baseUrl = '/user'
const queryParams = {
  id: 2,
  type: 'male',
}
const newUrl = buildUrl(baseUrl, queryParams)
console.log(newUrl) // Output: "/user?id=2&type=male"
```

In this example, the baseUrl is the original URL, and queryParams is an object containing the key-value pairs for the query parameters you want to append to the URL. The function iterates over the keys and values in the queryParams object, constructs the URL by appending the query parameters using the "?" and "&" characters as appropriate, and returns the resulting URL.

## Simple local server

```python
python3 -m http.server

```

That's it, you can send in a PR if you have more tips to help.

Thank you.
