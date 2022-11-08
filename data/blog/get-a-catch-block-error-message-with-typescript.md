---
title: Get a catch block error message with TypeScript
date: '2021-10-20'
tags: ['JavaScript', 'TypeScript']
draft: false
summary: I think the key takeaway here is to remember that while TypeScript has its funny bits, don't dismiss a compilation error or warning from TypeScript just because you think it's impossible or whatever. Most of the time it absolutely is possible for the unexpected to happen and TypeScript does a pretty good job of forcing you to handle those unlikely cases... And you'll probably find they're not as unlikely as you think.
images: []
layout: PostNew
canonicalUrl: canonical/url
postImg: /static/images/p1.webp
authors: ['kentcdodd']
readTime: '3 min'
category: Frontend
---

## Overview

I think the key takeaway here is to remember that while TypeScript has its funny bits, don't dismiss a compilation error or warning from TypeScript just because you think it's impossible or whatever. Most of the time it absolutely is possible for the unexpected to happen and TypeScript does a pretty good job of forcing you to handle those unlikely cases... And you'll probably find they're not as unlikely as you think.

Alright, let's talk about this:

```js
const reportError = ({ message }) => {
  // send the error to our logging service...
}

try {
  throw new Error('Oh no!')
} catch (error) {
  // we'll proceed, but let's report it
  reportError({ message: error.message })
}
```

Good so far? Well, that's because this is JavaScript. Let's throw TypeScript at this:

```js
const reportError = ({ message }: { message: string }) => {
  // send the error to our logging service...
}

try {
  throw new Error('Oh no!')
} catch (error) {
  // we'll proceed, but let's report it
  reportError({ message: error.message })
}
```

That reportError call there isn't happy. Specifically it's the error.message bit. It's because (as of recently) TypeScript defaults our error type to unknown. Which is truly what it is! In the world of errors, there's not much guarantees you can offer about the types of errors that are thrown. In fact, this is the same reason you can't provide the type for the `js .catch(error => {})`of a promise rejection with the promise generic `js(Promise<ResolvedValue, NopeYouCantProvideARejectedValueType>)`. In fact, it might not even be an error that's thrown at all. It could be just about anything:

```js
throw 'What the!?'
throw 7
throw { wut: 'is this' }
throw null
throw new Promise(() => {})
throw undefined
```

Seriously, you can throw anything of any type. So that's easy right? We could just add a type annotation for the error to say this code will only throw an error right?

```js
try {
  throw new Error('Oh no!')
} catch (error: Error) {
  // we'll proceed, but let's report it
  reportError({message: error.message})
}
```

Not so fast! With that you'll get the following TypeScript compilation error:

```js
Catch clause variable type annotation must be 'any' or 'unknown' if specified. ts(1196)
```

The reason for this is because even though in our code it looks like there's no way anything else could be thrown, JavaScript is kinda funny and so its perfectly possible for a third party library to do something funky like monkey-patching the error constructor to throw something different:

```js
Error = function () {
  throw 'Flowers'
} as any
```

So what's a dev to do? The very best they can! So how about this:

```js
try {
  throw new Error('Oh no!')
} catch (error) {
  let message = 'Unknown Error'
  if (error instanceof Error) message = error.message
  // we'll proceed, but let's report it
  reportError({ message })
}
```

There we go! Now TypeScript isn't yelling at us and more importantly we're handling the cases where it really could be something completely unexpected. Maybe we could do even better though:

```js
try {
  throw new Error('Oh no!')
} catch (error) {
  let message
  if (error instanceof Error) message = error.message
  else message = String(error)
  // we'll proceed, but let's report it
  reportError({ message })
}
```

So here if the error isn't an actual Error object, then we'll just stringify the error and hopefully that will end up being something useful.

Then we can turn this into a utility for use in all our catch blocks:

```ts
function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

const reportError = ({ message }: { message: string }) => {
  // send the error to our logging service...
}

try {
  throw new Error('Oh no!')
} catch (error) {
  // we'll proceed, but let's report it
  reportError({ message: getErrorMessage(error) })
}
```

This has been helpful for me in my projects. Hopefully it helps you as well.

Update: Nicolas had a nice suggestion for handling situations where the error object you're dealing with isn't an actual error. And then Jesse had a suggestion to stringify the error object if possible. So all together the combined suggestions looks like this:

```ts
type ErrorWithMessage = {
  message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  )
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError))
  }
}

function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message
}
```

Handy!
