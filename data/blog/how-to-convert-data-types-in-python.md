---
title: How To Convert Data Types in Python 3
date: '2022-06-28'
tags: ['Python']
draft: false
summary: In Python, data types are used to classify one particular type of data, determining the values that you can assign to the type and the operations you can perform on it.
images: []
layout: PostNew
canonicalUrl: canonical/url
postImg: /static/images/how-to-convert-data-types-in-python.webp
authors: ['beaf']
readTime: '9 min'
category: Backend
---

### Introduction

In Python, data types are used to classify one particular type of data, determining the values that you can assign to the type and the operations you can perform on it. When programming, there are times we need to convert values between types in order to manipulate values in a different way. For example, we may need to concatenate numeric values with strings, or represent decimal places in numbers that were initialized as integer values.

This tutorial will guide you through converting numbers, strings, tuples and lists, as well as provide examples to help familiarize yourself with different use cases.

## Converting Number Types

In Python, there are two number data types: integers and floating-point numbers or floats. Sometimes you are working on someone else’s code and will need to convert an integer to a float or vice versa, or you may find that you have been using an integer when what you really need is a float. Python has built-in methods to allow you to easily convert integers to floats and floats to integers.

Converting Integers to Floats
Python’s method _float()_ will convert integers to floats. To use this function, add an integer inside of the parentheses:

```python
float(57)
```

In this case, 57 will be converted to 57.0.

You can also use this with a variable. Let’s declare f as equal to 57, and then print out the new float:

```python
f = 57
print(float(f))
```

```bash
> Output
57.0
```

By using the _float()_ function, we can convert integers to floats.

## Converting Floats to Integers

Python also has a built-in function to convert floats to integers: _int()_.

The _int()_ function works similarly to the _float()_ function: you can add a floating-point number inside of the parentheses to convert it to an integer:

```python
int(390.8)
```

In this case, 390.8 will be converted to 390.

You can also use this with variables. Let’s declare b as equal to 125.0, and c as equal to 390.8, then print out the new floats:

```python
b = 125.0
c = 390.8

print(int(b))
print(int(c))
```

```bash
Output
125
390
```

When converting floats to integers with the _int()_ function, Python cuts off the decimal and remaining numbers of a float to create an integer. Even though we may want to round 390.8 up to 391, Python will not do this through the _int()_ function.

## Numbers Converted Through Division

In Python 3, relevant quotients are converted from integers to floats when doing division though they are not in Python 2. That is, when you divide 5 by 2, in Python 3 you will get a float for an answer (2.5):

```python
a = 5 / 2
print(a)
```

```bash
Output
2.5
```

In Python 2, since you were dealing with two integers, you would receive an integer back as your answer, instead: _5 / 2 = 2_.

## Converting with Strings

A string is a sequence of one or more characters (letters, numbers, symbols). Strings are a common form of data in computer programs, and we may need to convert strings to numbers or numbers to strings fairly often, especially when we are taking in user-generated data.

### Converting Numbers to Strings

We can convert numbers to strings through using the _str()_ method. We’ll pass either a number or a variable into the parentheses of the method and then that numeric value will be converted into a string value.

Let’s first look at converting integers. To convert the integer 12 to a string value, you can pass 12 into the _str()_ method:

```python
str(12)
```

When running _str(12)_ in the Python interactive shell with the python command in a terminal window, you’ll receive the following output:

```bash
> Output
'12'
```

The quotes around the number 12 signify that the number is no longer an integer but is now a string value.

With variables we can begin to see how practical it can be to convert integers to strings. Let’s say we want to keep track of a user’s daily programming progress and are inputting how many lines of code they write at a time. We would like to show this feedback to the user and will be printing out string and integer values at the same time:

```python
user = "Sammy"
lines = 50

print("Congratulations, " + user + "! You just wrote " + lines + " lines of code.")
```

When we run this code, we receive the following error:

```bash
> Output
TypeError: can only concatenate str (not "int") to str
```

We’re not able to concatenate strings and integers in Python, so we’ll have to convert the variable lines to be a string value:

```python
user = "Sammy"
lines = 50

print("Congratulations, " + user + "! You just wrote " + str(lines) + " lines of code.")
```

Now, when we run the code, we receive the following output that congratulates our user on their progress:

```bash
> Output
Congratulations, Sammy! You just wrote 50 lines of code.
```

If we are looking to convert a float to a string rather than an integer to a string, we follow the same steps and format. When we pass a float into the _str()_ method, a string value of the float will be returned. We can use either the float value itself or a variable:

```python
print(str(421.034))

f = 5524.53
print(str(f))
```

```bash
> Output
421.034
5524.53
```

We can test to make sure it’s right by concatenating with a string:

```python
f = 5524.53
print("Sammy has " + str(f) + " points.")
```

```bash
> Output
Sammy has 5524.53 points.
```

We can be sure our float was properly converted to a string because the concatenation was performed without error.

## Converting Strings to Numbers

Strings can be converted to numbers by using the _int()_ and _float()_ methods.

If your string does not have decimal places, you’ll most likely want to convert it to an integer by using the _int()_ method.

Let’s use the example of the user Sammy keeping track of lines of code written each day. We may want to manipulate those values with math to provide more interesting feedback for the user, but those values are currently stored in strings:

```python
lines_yesterday = "50"
lines_today = "108"

lines_more = lines_today - lines_yesterday

print(lines_more)
```

```bash
> Output
TypeError: unsupported operand type(s) for -: 'str' and 'str'
```

Because the two numeric values were stored in strings, we received an error. The operand - for subtraction is not a valid operand for two string values.

Let’s modify the code to include the _int()_ method that will convert the strings to integers, and allow us to do math with values these that were originally strings.

```python
lines_yesterday = "50"
lines_today = "108"

lines_more = int(lines_today) - int(lines_yesterday)

print(lines_more)
```

```bash
Output
58
```

The variable lines_more is automatically an integer, and it is equal to the numeric value of 58 in this example.

We can also convert the numbers in the example above to float values by using the _float()_ method in place of the _int()_ method. Instead of receiving the output of 58, we’ll receive the output of 58.0, a float.

The user Sammy is earning points in decimal values

```python
total_points = "5524.53"
new_points = "45.30"

new_total_points = total_points + new_points

print(new_total_points)
```

```bash
> Output
5524.5345.30
```

In this case, using the _+_ operand with two strings is a valid operation, but it is concatenating two strings rather than adding two numeric values together. So, our output looks unusual since it just places the two values next to each other.

We’ll want to convert these strings to floats prior to performing any math with the _float()_ method:

```python
total_points = "5524.53"
new_points = "45.30"

new_total_points = float(total_points) + float(new_points)

print(new_total_points)
```

```bash
> Output
5569.83
```

Now that we have converted the two strings to floats, we receive the anticipated result that adds 45.30 to 5524.53.

If we try to convert a string value with decimal places to an integer, we’ll receive an error:

```python
f = "54.23"
print(int(f))
```

```bash
Output
ValueError: invalid literal for int() with base 10: '54.23'
```

If we pass a decimal value in a string to the _int()_ method we’ll receive an error because it will not convert to an integer.

Converting strings to numbers enables us to quickly modify the data type we are working with so that we can perform operations on numeric values that were originally cast as strings.

## Converting to Tuples and Lists

You can use the methods _list()_ and _tuple()_ to convert the values passed to them into the list and tuple data type respectively. In Python:

- a list is a mutable ordered sequence of elements that is contained within square brackets [ ].
- a tuple is an immutable ordered sequence of elements contained within parentheses ( ).

### Converting to Tuples

Let’s start with converting a list to a tuple. Converting a list to a tuple, because it’s an immutable data type, can allow substantial optimization to the programs that we create. When we use the method _tuple()_ it will return the tuple version of the value passed to it.

```python
print(tuple(['pull request', 'open source', 'repository', 'branch']))
```

```bash
> Output
('pull request', 'open source', 'repository', 'branch')
```

We see that a tuple is printed out in the output, as the items are now contained within parentheses rather than square brackets.

Let’s use _tuple()_ with a variable that represents a list:

```python
sea_creatures = ['shark', 'cuttlefish', 'squid', 'mantis shrimp']
print(tuple(sea_creatures))
```

```bash
> Output
('shark', 'cuttlefish', 'squid', 'mantis shrimp')
```

Again, we see that the list value is changed to a tuple value, indicated by the parentheses. We can convert any iterable type to a tuple, including strings:

```python
print(tuple('Sammy'))
```

```bash
> Output
('S', 'a', 'm', 'm', 'y')
```

Because we can iterate through strings, we can convert them to tuples with the _tuple()_ method. With data types that are not iterable, however, like integers and floats, we will receive a type error:

```python
print(tuple(5000))
```

```bash
> Output
TypeError: 'int' object is not iterable
```

While it is possible to convert the integer to a string and then convert to a tuple, as in _tuple(str(5000))_, it is best to opt for readable code over complicated conversions.

### Converting to Lists

Converting values, especially tuples, to lists can be useful when you need to have a mutable version of that value.

We’ll use the _list()_ method to convert the following tuple to a list. Because the syntax for creating a list uses parentheses, be sure to include the parentheses of the _list()_ method, and in this case the _print()_ method as well:

```python
print(list(('blue coral', 'staghorn coral', 'pillar coral')))
```

```bash
> Output
['blue coral', 'staghorn coral', 'pillar coral']
```

The square brackets signal that a list has been returned from the original tuple value that was passed through the _list()_ method.

To make the code more readable, we can remove one of the pairs of parentheses by using a variable:

```python
coral = ('blue coral', 'staghorn coral', 'pillar coral')
list(coral)
```

If we print _list(coral)_ we would receive the same output as above.

Just like tuples, strings can be converted to lists:

```python
print(list('shark'))
```

```bash
> Output
['s', 'h', 'a', 'r', 'k']
```

Here the string 'shark' was converted to a list, providing a mutable version of the original value.

## Conclusion

This Python tutorial demonstrated how to convert several of the important native data types to other data types, primarily through built-in methods. Being able to convert data types in Python provides you with extra flexibility when writing your programs.
