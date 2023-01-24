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

```python
mkvirtualenv -p python3.9.7 venvname
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

That's it, you can send in a PR if you have more tips to help.

Thank you.
