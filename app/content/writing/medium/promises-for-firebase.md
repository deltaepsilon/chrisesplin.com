---
layout:  medium
slug: promises-for-firebase
date: 2016-11-05T00:19:30.223Z
author: "Chris Esplin"
title: "Promises for Firebase"
subtitle: "You’ve got to know Promises if you want to Firebase in JavaScript"
tags:
  - javascript
  - es6
  - promises
  - firebase
  - google-cloud-platform
keywords:
  - javascript
  - es6
  - promises
  - firebase
  - google-cloud-platform
draft: true
---

JavaScript Promises are a prerequisite for productivity with the Firebase JavaScript SDK. Firebase does support callbacks, but Promises are so much cleaner and easier to read!


## Read the Docs

You know a spec is good when the docs are this concise: [MDN Promise Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Promises are a way to avoid 👹👹👹 [CALLBACK HELL](http://callbackhell.com/) 👹👹👹. You know you’ve done it.


## Cut down those Promise trees!

Firebase emits promises, so most of the time you won’t have to create your own, you’ll just consume the Promise API that Firebase produces. A typical bit of code might look like this.


The bit of code above is something that I use in production to handle the checkout process for my shopping cart. It’s the most critical bit of code in my entire app and, therefore, livelihood. Every *CheckoutService* function returns a Promise, so I can chain them and avoid callback hell.

Notice how the *checkout* function has **9** asynchronous steps? Node.js relies on asynchronous operations for performance reasons. Node.js has only one thread, and you do **not** want to block it with a synchronous operation that takes more than a few milliseconds. The browser is similar, so any sophisticated use of JavaScript is going to end up with a lot of async operations.

Anyway, the key to understanding promises, is to recognize that they’re just a fancy, flat way of handling callbacks. They’re just callbacks. That’s it.

## Roll Your Own

To make this abundantly clear, let’s roll a promise of our own.


This example has a function named *waitForIt. waitForIt* takes an argument *N* and waits *N* milliseconds before continuing. *waitForIt* returns a Promise. The Promise takes an *executor* function, which has two arguments, *resolve*, and *reject*. The *executor* function then uses *setTimeout* to wait *N* milliseconds before calling *resolve.*

Because *waitForIt* returns a Promise, we can register callbacks against that Promise using *.then()*. The beauty of *.then()* is that it can return it’s own Promise, which can then register its own *.then()* callback.

## Getting Fancy

Read through the following example to see some of the fun stuff that Promises can do.


* Lines 1–3 are a new Promise that waits 1000 milliseconds before resolving itself with the number *10*.

* Lines 4–7 receive the number *10* from the earlier promise and immediately returns a resolves promise using *Promise.resolve()*;

* Lines 8–11 do the exact same thing as the previous *.then()* callback, but they don’t wrap the result in *Promise.resolve()*. Returning a value out of a *.then()* callback and returning *Promise.resolve()* has the same result.

* Lines 12–21 are the fanciest yet. They use *Promise.all()* to take an array of 10 Promises and wait for all of them to resolve before continuing on. *Promise.all()* itself returns a Promise, and that Promise resolves with an array of it’s child Promises’ results. See line 23.

* Lines 22–25 logs out the array of results from the previous Promise and then throws a rejection with *Promise.reject()*;

* Lines 26–28 will never execute, because an earlier link in the *.then() *chain returned a rejected Promise.

* Lines 29–31 will catch the rejected Promise in the preceding chain and log it out.

## Firebase Promises

The Firebase JavaScript SDK uses Promises. You’ll see them everywhere, but just to give you a taste, check out this chunk of code.


This file relies on two libraries that both emit Promises, *firebase *and *axios*. The code uses *axios* to get a list of Star Wars characters from the Star Wars API—[SWAPI](http://swapi.co/api/people/)—and save them to Firebase. It also queries the Firebase collection via the Firebase REST API to get a JSON list of the saved Star Wars characters.

## That’s All Folks

There’s not much more to Promises. It’s a small API, and you’ll use it a lot, so [read the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), get comfortable with using Promises instead of callbacks, and let me know if you have any questions!