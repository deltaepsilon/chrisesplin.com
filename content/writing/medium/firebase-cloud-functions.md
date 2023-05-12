---
layout:  medium
slug: firebase-cloud-functions
date: 2017-03-25T22:42:59.983Z
author: "Chris Esplin"
title: "Cloud Functions for Firebase"
subtitle: "Cloud Functions for Firebase are Google’s serverless solution for Firebase apps. They can be used as the (R)eactor functions for FIRE Stack app architecture. If you’ve developed with firebase-queue, AWS Lambda or some other Functions-as-a-Service architecture, Cloud Functions for Firebase should feel natural… just a lot slicker and easier to use :)"
tags:
  - nodejs
  - firebase
  - javascript
  - google-cloud-platform
keywords:
  - nodejs
  - firebase
  - javascript
  - google-cloud-platform
draft: true
---

If you’re wondering where to start… well, read on my friend.


## **FIRE Stack**

[FIRE Stack architecture](https://howtofirebase.com/fire-stack-4195a13daf96) replaces the typical REST API, with its endpoints and HTTP calls, with standalone functions — written by you and running on Google’s infrastructure — that react to changes in your app and can run any Node.js or Java that your heart desires.

As of this writing, there are six types of triggers:

1. [Firebase Realtime Database](https://firebase.google.com/docs/functions/database-events) triggers

2. [Firebase Authentication](https://firebase.google.com/docs/functions/auth-events) triggers

3. [Firebase Analytics](https://firebase.google.com/docs/functions/analytics-events) triggers

4. [Cloud Storage](https://firebase.google.com/docs/functions/gcp-storage-events) triggers

5. [HTTP](https://firebase.google.com/docs/functions/http-events) triggers

6. [Cloud Pub/Sub](https://firebase.google.com/docs/functions/pubsub-events) triggers

You can read the docs on each of those triggers for the full rundown. They’re not hard to use, although they can be tricky to test. I’m going to start with Authentication and Firebase Realtime Database triggers. If you can get those working, you shouldn’t have trouble with the other event types.

## **Node Environment**

Cloud Functions supports Node.js LTS releases. The current release is v6.9.1, but [check the docs](https://cloud.google.com/functions/docs/writing/) to make sure that you’re developing against the freshest-possible version of Node.js.

If you need help jumping between Node.js versions, check out [n](https://github.com/tj/n) for fast version switching.

To get started, I’m running ***$: n 6.9.1*** to switch to v6.9.1.

## **Authentication Triggers**

Authentication triggers track creation and deletion of Firebase Authentication users. That’s about it. Here are the examples from [the docs](https://firebase.google.com/docs/functions/auth-events).


That’s really all there is to it. **event.data** is the user data from your newly minted or deleted [currentUser JWT (JavaScript Web Token)](https://firebase.google.com/docs/auth/users).

If you want to access your Realtime Database, you can’t get it from the event :( Fortunately, *functions.config().firebase* contains your initialization details, so you can use *firebase-admin* to create whatever refs you need.


## **Realtime Database Triggers**

This is the trigger that you need for [FIRE Stack architecture](https://howtofirebase.com/fire-stack-4195a13daf96))

It’s also the most complicated trigger, because of all of the attributes on the event itself. You need to read up on these attributes. I’ll only be summarizing a few here.

First, [scan the docs](https://firebase.google.com/docs/reference/functions/functions.Event#properties) about event properties. Focus on the following:

- **event.data**

- **event.params**

Next, read a bit more carefully through the docs on [DataSnapshot](https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot), a.k.a. **event.data**. This is the crux of Realtime Database events. Pay attention to everything, but read the following word-for-word.

- **DeltaSnapshot.adminRef**

**- DeltaSnapshot.current**

**- DeltaSnapshot.key**

**- DeltaSnapshot.previous**

**- DeltaSnapshot.ref**

**- DeltaSnapshot.val()**

**- DeltaSnapshot.toJSON()**

**- DeltaSnapshot.numChildren()**

You’re back already? Have you understood the docs? If so, GREAT! If not, for shame! Go back and read ’em :)

Once you understand the **event** object, database triggers aren’t tough to figure out. I have an architectural pattern where I like to track user logins. It’s kind of an important metric, and it’s a good opportunity to update the user’s account. I have my client app push data to */queues/current-user/{uid}*, something like this…


Then I register a Firebase Function to listen to *queues/login/{uid}* and do whatever I need.


### **Use event.data.adminRef and event.data.ref**

**event.data.adminRef** is a ref with full admin privileges over your entire database. **event.data.ref **is a ref as well, but is has the same authentication permissions as the user who triggered the event. This is **super useful**. It enables you to impersonate a user from within your function, security-rules restrictions and all!

Also, if you try to do something “admin-like” from **event.data.ref**, don’t be surprised when you get weird *permission denied* errors in your Cloud Functions logs.

### Use event.params

In the earlier example I registered my *onWrite* event like so:

```
functions.database.ref(‘queues/login/{uid}’).onWrite(event => {…});
```


Notice the wildcard *{uid}*. That wildcard ends up as **event.params.uid**. So if write something to */queues/login/fake-uid-123*, then **event.params.uid** will be *’fake-uid-123'*. Pretty simple.

But the plot thickens, because you can do crazy stuff like

```
functions.database.ref(‘/queues/{queueType}/{uid}’).onWrite(event => {…});
```


See that! You can use multiple wildcards in a path! I don’t know how *many* wildcards you can use, and I’ve never used more than two… but go hog-wild and let me know if you find the limits!

## **Use environment variables!**

The docs on [environment variables](https://firebase.google.com/docs/functions/config-env) show how you can use *firebase-tools* to set your functions environment variables from the command line. Basically, you install *firebase-tools* globally with *yarn global add firebase-tools* (or *npm install -g firebase-tools*). Then you use the CLI to do the work.

```
firebase functions:config:set access-control-lists.admin-users=”chris@chrisesplin.com,someone-else@chrisesplin.com”
```


Notice that I used kebab case instead of camel case. Functions config does not allow uppercase characters in attribute keys. So *accessControlLists.adminUsers*, which is what I’d like to type here, ***will not work!!!*** 👹

Also notice that I passed in a comma-delimited string. Stick to strings. You can [coerce](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch4.md) these strings to other data types once you’re in the function… but don’t try to get cute with booleans, numbers or arrays. They’ll all get wrapped in double-quotes.

## **Require your dependencies within each function**

You’ll want to define most of your require statements, i.e., *const quiverFunctions = require(‘quiver-functions’)*, within the function itself. This will run the *require* function every time the function is run.

This won’t bite you often, but I’ve run into a few situations where my functions wouldn’t deploy until I moved a *require* call into the function. I suspect it has something to do with how the functions are triggered on Google’s end. If you see error messages when attempting to deploy functions, this tip might help.


## **Testing**

I’m using [Jasmine](https://jasmine.github.io/2.0/node.html) for my Node.js tests. It’s easy to get started on your own projects. Just do the following:
> *I’m using Yarn instead of NPM these days. NPM works almost the same, but let’s be honest, Yarn’s better :)*
> *Here are the [docs on installing Yarn](https://yarnpkg.com/lang/en/docs/install/).*
> *If you’re on OS X, you should be using [Homebrew](https://brew.sh/) for your own sanity.*
> *If you’re serious about dev on OS X, and you’re not using Homebrew, take a few minutes to get it set up. Thank me later.*
> *Installing Yarn with Homebrew is as easy as *brew update && brew install yarn*.*

1. Install Jasmine globally: *yarn global add jasmine*

2. Install Jasmine in your project: *yarn add jasmine*

3. Initialize Jasmin: *jasmine init*

4. Edit *./spec/support/jasmine.json* to make sure that the *spec_dir* and *spec_files* will pick up your tests.

You can run the test in this repo by simply installing and running *jasmine* at the top-level of the repo. Otherwise, you can *cd functions && yarn test* to get the same result. Note that you’ll need to copy */functions/config.json.dist* to */functions/config.json* and edit the file so that it contains your Firebase details. I’m not checking my *service-account.json* file into source control :)