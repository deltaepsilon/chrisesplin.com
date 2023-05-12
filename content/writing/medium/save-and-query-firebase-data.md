---
layout:  medium
slug: save-and-query-firebase-data
date: 2016-10-25T13:31:33.242Z
author: "Chris Esplin"
title: "Save and Query Firebase Data"
subtitle: "Connect to Firebase with the JavaScript SDK"
tags:
  - javascript
  - nodejs
  - firebase
  - google-cloud-platform
keywords:
  - javascript
  - nodejs
  - firebase
  - google-cloud-platform
draft: true
---


## Promises Review

Promises are a prerequisite for this walkthrough. If you’re not comfortable with promises, [read the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and/or watch the video below. The Firebase JavaScript SDK uses promises for async operations. You won’t get far without a basic understanding of promises.

## Video Walkthrough

Do you have a handle on promises? Great! The following video will walk you through the basics of saving and querying Firebase data.


### Exercise: Edit data from the Console

Firebase has a built-in console that you can use to edit your data.

1. Visit [https://console.firebase.google.com/project/](https://console.firebase.google.com/project/](https://console.firebase.google.com/project/)) and either create a new project or access a project that you’ve already created.
2. Navigate to the *Database *tab and add some arbitrary data by clicking on the green + buttons and building out nodes.

## Manage your Firebase from Node.js

The Firebase Node.js client requires a Google Cloud API key and the firebase Node library. Follow the steps below for success!

### Install the client and dependencies

* Visit your [Google Cloud API Console](https://console.cloud.google.com/apis/credentials) and select the project that matches up with the Firebase project that you just created. Notice the project selection dropdown at the top-right edge of the console.

* Open the Credentials tab and click *Create credentials*. You want the *API key* option. Create a server key. It will automatically download as a **.json* file. This file contains all of the credentials that your server will need to authenticate with Google Cloud and access the Firebase APIs… so protect it! Do not add this file to source control. You can always create new server keys if you lose this one. It’s meant to be revoked and recreated as often as needed.

* Create a new folder in your development directory called node-client-app and copy your *.json* credentials into this folder. Rename the *.json* file to *service-account.json*.

* Run *npm init* to initialize a *package.json* file. Click through the default *package.json* selections quickly.

* Install the Node.js Firebase client with

```
*npm install --save-dev firebase*
```


* Create a file titled *node-client.js*. This is where we’ll write our script to learn the Firebase Node client.

* Expected file tree up to this point 👇🏻

```
├── node-client.js
├── node_modules
│ ├── …
├── package.json
└── service-account.json
```


* Fill out *node-client.js* with the code below and run it with

```
node node-client.js
```



* *node-client.js* should read out whatever test data you’ve added manually with the Firebase Realtime Database console.

* Note that only the ```serviceAccount``` and ```databaseURL``` keys are required to initialize the app.

## Saving Data to Firebase

There are three *firebase* functions that will add or modify your data:

```
var ref = firebase.database().ref('/some/path');
var obj = {someAttribute: true};

ref.push(obj);   // Creates a new ref with a new "push key"
ref.set(obj);    // Overwrites the path
ref.update(obj); // Updates only the specified attributes 
```


### ref.push

There are two ways to use *ref.push()*. You can use it to create a new ref with an automatically generated **push key**, or you can save data to a new push key in a single step.


Both of these methods create new refs with their own **push keys**. Push keys are a critical concept in Firebase, because they enable us to save collections of data and sort them by creation date without key collisions. This would be impossible using zero-indexed arrays like you commonly find in Javascript.

Let’s unpack that last paragraph. First, imagine a realtime game with millions of users pushing data to your app at the same time. If there are 500 records in a collection and two users try to simultaneously push data to that collection within the same millisecond, could Firebase handle that with a zero-indexed array? No! That would be a mess. You’d have two users trying to push to */somePath/501* at the same time — a colliding keys disaster.

Instead of letting keys collide, Firebase enables us to create unique keys with *ref.push()*. These keys are fantastic in that they don’t collide while **also being sortable by time**. In case you missed that… huge concept here… the push keys are sortable by time. They’re generated using a timestamp plus some randomness to avoid collisions. If you sort a collection by its push keys, you’re effectively sorting by timestamp. You can test that with the following Node.js script.

**Note:** Change the values for *initializeApp* to match a Firebase that you own. I’ve created a gist for the code below:


### ref.set

The most straightforward way to save data is *ref.set()* It overwrites the ref with whatever object you pass it. So *usersRef.set({message: ‘I just overwrote your users’});* would replace your entire *usersRef* object with a single JSON object. You’ll typically do something like this:

```
var timestamp = new Date().getTime();
userRef.child(‘timestamp’).set(timestamp);
```


### ref.update

To update some keys without blowing away an entire object, use *ref.update()*. You could do something like *userRef.update({timestamp: 123456789});* and overwrite **only the timestamp attribute** of *userRef*.

You can also use *ref.update()* to execute [**atomic writes](https://www.firebase.com/blog/2015-09-24-atomic-writes-and-more.html)** by path. You can do something like the following:


Firebase calls these kinds of updates **multi-location updates**. A use case might be to update a user’s username in three different locations at the same time, or maybe to process a financial transaction and log it simultaneously.

Multi-location updates either succeed or fail as a batch operation. *ref.update()* returns a promise, so any errors on the write operation can be handled with a single *.catch()*.

## Quiz!

Review *ref.push()*, *ref.set()* and *ref.update()* in [the docs](https://firebase.google.com/docs/database/web/save-data) and answer the following questions:

* What is a “push key”? (note: the docs refer to “push keys” as unique ids)

* Why use push keys instead of zero-indexed arrays?

* How can you use *ref.update()* to update multiple paths in a single, atomic operation?

* What does *ref.transaction()* do and why would you use it instead of *ref.set()*?

## Querying Data from Firebase

The Firebase SDKs for Node.js and the browser are very, very similar. We’ll be able to copy/paste Node.js code directly into an HTML script tag and it will function the same. The difference between the two SDKs is how they handle authentication. Node.js auth is simple with a Google Cloud service account API key. You can’t put a Google Cloud service account in the browser without giving full read/write access to your Firebase to the world, so you’ll need to authenticate using Google’s generic browser API before accessing your Firebase from the client.

Once authenticated, both Javascript SDKs expose the same API for interacting with Firebase, so we’ll cover the API first in Node.js for simplicity.

### Firebase events

Firebase delivers data to us with five different events accessed with *ref.on(‘event’, callback)*:

1. *value*

1. *child_added*

1. *child_changed*

1. *child_removed*

1. *child_moved*

These events are mostly self-explanatory, and they’re [covered in the docs](https://firebase.google.com/docs/database/web/retrieve-data), but let’s get into the details.

### ref.on(‘value’, callback);

The *value* event fires once for an initial data load and again whenever any data changes. *value* is the event that we’ll use most, typically with *ref.once(‘value’, callback)*, because it returns a ref’s children in a single operation. You can also use *ref.on(‘value’, callback)* to keep an object in memory synced up with Firebase.


### ref.on(‘child_added’, callback);

The *child_added* event **fires once for every existing child** and then continues to fire every time a new child is added. It’s a lot like *value. Y*ou can use it with *ref.once(‘child_added’, callback), but that’s a less-common pattern*. *child_added* is often used as follows…


### child_changed, child_removed, child_moved

These events are less commonly used. Review *child_changed*, *child_removed* and *child_moved* in [the docs](https://developers.google.com/firebase/docs/database/web/retrieving-data#section-event-types). They do about what you’d think they do, but they’re mostly useful for advanced querying, so we’ll cover them later as needed.

### ref.off(‘some_event’, callback);

Use *ref.off()* to stop listening to a ref’s events. Just make sure to pass in the exact same callback function… not a copy of the function.

### ref.once(‘value’, callback);

The most common use of Firebase ref events is to listen to the *value* event for initial data load and then call *.off* on the listener as soon as the data has loaded. This is annoying to do over and over, so Firebase gives us *ref.once(‘value’, callback)* to listen to the initial load and then turn off the listener automatically. *ref.once()* takes an optional callback and returns a promise. You can use *ref.once() *with* child_added, child_changed *and* child_removed *events, but it’s a less-common pattern.

You’ll notice that *ref.on* requires a callback. DO NOT USE *ref.on(‘child_added’).then()*. It doesn’t make any sense to use *ref.on()* with a promise, because it is meant to fire over and over again like a normal event listener that you might use in the browser. *ref.once()* is a special case that returns a promise to make our lives easier.


### Data snapshots

Firebase ref events return data snapshots. So far we’ve just used *snap.val()* to get the snapshot’s JSON, but there are more snapshot functions…

* *snap.val()* — Gets the value

* *snap.exportVal()* — Also gets the value (kind of duplicative)

* *snap.child() *— Navigate to a child ref

* *snap.hasChild()* — Test whether there is at least one child

* *snap.getPriority()* — Priorities are mostly deprecated… don’t worry about this if you’re new to Firebase

* *snap.forEach(callback)* — Loop through child snapshots with a callback

* *snap.hasChildren()* — Test whether there are multiple children

* *snap.ref *— An attribute that holds the snapshot’s ref. Works with child snapshots within a *snap.forEach* as well.

* *snap.key *— An attribute that holds the ref’s key

* *snap.numChildren()* — How many children does the reference have?

You won’t need most of these. *snap.val(), snap.key, snap.ref *and *snap.forEach(callback)* are the most common use cases. *snap.forEach* is great when you want to loop through a bunch of children like this:


## Quiz!

Review *value* and *child_added* events in [the docs](https://firebase.google.com/docs/database/web/retrieve-data) and answer the following questions.

* Which event is best for returning a single item?

* Which event is best for returning lists of items?

* Can *value* be used to retrieve a shallow copy of a node?

* Which event consistently returns sorted data?