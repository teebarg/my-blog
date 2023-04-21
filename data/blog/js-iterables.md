---
title: Introduction to Iterables and Iterators in JavaScript
date: '2022-10-28'
tags: ['Javascript']
draft: false
summary: The concept of the iterable protocol can be split into the iterable, the data structure itself, and the iterator, a pointer that moves over the iterable
images: []
layout: PostNew
canonicalUrl: canonical/url
postImg: /static/images/js-iterable.jpeg
authors: ['beaf']
readTime: '15 min'
category: Frontend
---

JavaScript supports looping through data set objects such as arrays using control structures such as for…of and the spread operator .... This is referred to as the iterable and the data structures that support this functionality are called iterables. While JavaScript provides maps, arrays and sets with an iterable property by default, regular JavaScript objects do not have this by default.

Iterables are data structures which provide a mechanism to allow other data consumers to publicly access its elements in a sequential manner. Imagine a self-packaged data structure that unloads data one-by-one in order when put inside of a for...of loop.

The concept of the iterable protocol can be split into the iterable, the data structure itself, and the iterator, a pointer that moves over the iterable. Consider an array for example. When the array is used in a for...of loop, the iterable property is called which returns an iterator. This iterable property is namespaced as Symbol.iterator and the object that it returns can be used on a common interface that is shared by all looping control structures.

In a way, the Symbol.iterator can be compared to an iterator factory that produces an iterator whenever the data structure is placed in a loop.

As an iterator moves over the data structure and provides the elements sequentially, the object returned by the iterable contains a value and a done property.

The value indicates the current data value pointed by the iterator and done is a boolean that tells us if the iterator has reached the last element in the data structure.

In order for the iterator method to call the next object, a _next()_ method that’s defined within the Symbol.iterator method.

In other words, the iterator property can be defined as a property that knows how to access elements from a collection one by one. It also contains the logic to stop, such as when there are no more elements in an array.

## Understanding Objects and Iterables

JavaScript objects don’t come with iterables by default. Here are some potential rationales:

- One of the key features of objects is that it’s user defined. So slipping in a silent Symbol.iterator into the object could result in unexpected behavior.
- The previous point also means that it can be added manually by the user, considering that all object compositions might not be similar. So having a common iterable property can be meaningless.
- If you want to loop over the top level elements in the object, you can use a for...in loop.
- The usage of the Maps object type might be more appropriate.
- If you still need an iterable, a simple iterable implementation on objects would look like this:

```js
let Reptiles = {
  biomes: {
    water: ['Alligators', 'Crocs'],
    land: ['Snakes', 'Turtles'],
  },

  [Symbol.iterator]() {
    let reptilesByBiome = Object.values(this.biomes)
    let reptileIndex = 0
    let biomeIndex = 0
    return {
      next() {
        if (reptileIndex >= reptilesByBiome[biomeIndex].length) {
          biomeIndex++
          reptileIndex = 0
        }

        if (biomeIndex >= reptilesByBiome.length) {
          return { value: undefined, done: true }
        }

        return {
          value: reptilesByBiome[biomeIndex][reptileIndex++],
          done: false,
        }
      },
    }
  },
}

// now iterate over the new `Reptiles` iterable:
for (let reptile of Reptiles) console.log(reptile)
```

The output would be:

```bash
Alligators
Crocs
Snakes
Turtles
```

With this example, you can see iterators can be implemented within the object. Iterables can be powerful properties for objects that provide ease of use while handling certain situations and help us avoid writing long path names.

## Getting at the Iterator

Loops like for...of have a built-in mechanism to consume iterables until the done value evaluates to true. If you want to consume the iterable on your own though, without a built-in loop, you can get the iterator from the iterable and then call _next()_ on it manually.

Given the same example as above, you could get an iterator from Reptiles by calling its Symbol.iterator like this:

```js
let reptileIterator = Reptiles[Symbol.iterator]()
```

You can then use the iterator like this:

```js
console.log(reptileIterator.next())
// {value: "Alligators", done: false}
console.log(reptileIterator.next())
// {value: "Crocs", done: false}
console.log(reptileIterator.next())
// {value: "Snakes", done: false}
console.log(reptileIterator.next())
// {value: "Turtles", done: false}
console.log(reptileIterator.next())
// {value: undefined, done: true}

console.log(reptileIterator.next())
// TypeError: Cannot read property 'length' of undefined
```

As you can see, the iterator has a _next()_ method that returns the next value in the iterable. The value for done only evaluates to true after another _next()_ call once the last value has been returned, so to go over the entire iterable there will always be one more call to _next()_ than there is data in the iterable. Calling _next()_ again after an iterator has reached the end of the iterable will result in a TypeError being thrown.

### Conclusion

With this tutorial, you have gone through the different parts and mechanisms behind looping through a data set with JavaScript. You’ve gone through the reasons JavaScript objects do not come with this ability to iterate innately, and demonstrated the option to manually implement your own iterables.
