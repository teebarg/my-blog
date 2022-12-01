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

That's it, you can send in a PR if you have more tips to help.

Thank you.
