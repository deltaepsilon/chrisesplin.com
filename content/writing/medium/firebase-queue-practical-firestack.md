---
layout:  medium
slug: firebase-queue-practical-firestack
date: 2016-11-07T15:07:19.402Z
author: "Chris Esplin"
title: "Firebase Queue&#58; Practical FIRE Stack"
subtitle: "Client-server communication via WebSockets"
tags:
  - javascript
  - firebase
  - nosql
  - google-cloud-platform
  - firestack
keywords:
  - javascript
  - firebase
  - nosql
  - google-cloud-platform
  - firestack
draft: true
---

One of the most popular questions that I hear is how to implement a server for a Firebase app. Firebase provides great client-side tooling, but what about server architecture?


## FIRE Stack, the easy way

Firebase lends itself to an entirely new architecture that I’m calling [FIRE Stack](https://howtofirebase.com/fire-stack-4195a13daf96). FIRE stands for (F)irebase + (I)nterface + (Re)actor functions. (F)irebase acts as a message bus, your client-side app is your (I)nterface, and your server runs (Re)actor functions. So what are reactor functions anyway?

### Reactor Functions

Reactor functions live on your server and handle secure operations that you can’t trust to your client-side app. Android and iOS apps can sometimes fake their way around the server, because their app code is not as easily discoverable by the end user… but us web devs have to be paranoid about what we expose to our client-side apps, because our browser code is always public.

Enter reactor functions. Instead of communicating between client and server with a REST API as we’ve all been accustomed to, reactor functions use Firebase as a message bus. The client app pushes some data to a job queue, and our server listens to that queue and reacts to the incoming data.

A great example of this that I use on all of my apps is user management. Firebase handles the client-side auth just fine, but I want to manage user profiles and permissions in a read-only fashion. I can’t have my clients writing their permissions to their own accounts!

## Firebase Queue

The FIRE Stack solution to our user-permissions problem is to have our client app log each authentication event to a job queue. In this example, we’ll have them log to */firebase-queue/login-queue/tasks*. The */tasks* part of the path is required by Firebase Queue. Every Firebase Queue job queue must end in */tasks.*

**Client-Side Code**


The client-side JavaScript simply listens to the *onAuthStateChanged* event and pushes some user data to our *firebase-queue/login-queue/tasks* endpoint. You can push whatever data you like. This example is pretty minimal. You’ll need to push a uid and an email address if you want to do anything useful on the server.

**Server-Side Code**


Your server-side code needs to be a live, running Node.js process. You’ll need to run

```
*npm install --save firebase firebase-queue*
```


You’ll also need to initialize your Firebase app with *initializeApp(). *You can copy/paste the example above, but make sure to reference your own *serviceAccount* and *databaseURL* values. See [Save and Query Firebase Data](https://howtofirebase.com/save-and-query-firebase-data-ed73fb8c6e3a) if you’re fuzzy on how this works.

The great thing about this Node.js process is that the server running it does not need to be publicly accessible. You don’t need to open port 80 or 443 on your server for HTTP traffic… because we’re not using HTTP at all in this process. The entire exchange is handled over a WebSocket.

**Line-by-Line Walkthrough**

* Lines 7–9: Save refs for both the login-queue and wherever you want to save your user accounts. Also pull in an array of email addresses for admin users.

* Line 11: Create your new Firebase Queue object. The first argument is the queue ref that we’re listening to, minus the */tasks *part of the path. The second argument is the queue options. This second argument is optional, but we’ll typically use *{sanitize: false} *to prevent Firebase Queue from removing the metadata off of the incoming data. The last part of line 11 is the queue handler. The queue handler has four arguments, the incoming data from the */tasks* endpoint, and functions for registering function progress, resolving the function and rejecting it.

* Line 12: The *progress* function is useful for debugging purposes. It updates a *_progress* attribute on the relevant task, so if the handler function fails for some reason, check *_progress *to aid in debugging.

* Line 13: Make the incoming user an admin user if appropriate

* Line 14: Write the user object to the *accountRef.*

* Line 17: Remove the queue task.

* Lines 19–20: Resolve or reject the queue task based on the success or failure of the *accountRef* set operation.

## Security

You’ll need a security rule to manage your task queue. You wouldn’t want it to get hijacked by some hacker. Here’s an example rule that will provide some basic endpoint security for your queue.

```
“firebase-queue”: {
  “login-queue”: {
   “tasks”: {
     “.indexOn”: [“_state”],
     “$task”: {
       ".validate": "auth.uid == newData.child('user').child('uid').val() && auth.email == newData.child('user').child('email').val()"
      }
    }
  }
}
```


Security rules need to be tested carefully for your specific app. An example like this is great to get you started, but make sure you have a good idea of how security rules work before taking something like this to production. Security rules are powerful if used correctly… or completely worthless if you don’t test them thoroughly.

## Questions?

Hit me up on [Twitter](https://twitter.com/ChrisEsplin), [YouTube](https://www.youtube.com/playlist?list=PLdssc-pDiZ7MJeKr4k5r33jCGOT2H_iKB) or Medium comments with your questions and comments. I try to respond quickly.

And don’t forget…

### Read The Docs

No tutorial or video can take the place of [reading the docs](https://github.com/firebase/firebase-queue/blob/master/docs/guide.md). The Firebase Queue docs are great, and you’ll find a bunch of useful features that I haven’t covered here.

### Test Your Architecture

At some point you’ll want to take a FIRE Stack app into production. Make sure to get your security rules and server scaling worked out early, because these issues can be thorny if you wait to long to sort them out.