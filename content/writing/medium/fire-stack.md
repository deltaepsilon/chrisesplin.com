---
layout:  medium
slug: fire-stack
date: 2016-09-02T15:29:10.831Z
author: "Chris Esplin"
title: "🔥🔥🔥 FIRE Stack 🔥🔥🔥"
subtitle: "I recently ran across an old blog post by Michael Bleigh of DivShot fame and a current Firebase team member. In the post Michael describes my favorite Firebase architecture and gives it a name:"
tags:
  - firebase
  - javascript
  - front-end-development
keywords:
  - firebase
  - javascript
  - front-end-development
draft: true
---

🔥🔥🔥 **FIRE Stack** 🔥🔥🔥 [emoji added]

## **FIRE = (F)irebase + (I)nterface + (Re)actors**

**Firebase**: The Firebase Realtime Database that stores your data

**Interface**: Any client-side app—Android, iOS, Angular, React, Polymer, etc.

**Reactors**: Server functions that react to changes in your Firebase database

I’ve been using this architecture for over a year now without putting a name on it. Other architectures have snazzy names, why not FIRE? Regardless, it’s a fantastic architecture with the potential to make you give up HTTP APIs for good. Sure, we’ll be consuming HTTP for a while until HTTP/2 takes over, but we don’t have to write HTTP any longer.

Firebase already handles most of the API surface area, so FIRE stack development hands it the last bit of the API and kisses HTTP goodbye.

## Why FIRE stack?

**WebSockets**: FIRE stack uses WebSockets. The fastest [HTTP server can’t beat WebSockets](http://blog.arungupta.me/rest-vs-websocket-comparison-benchmarks/) on performance benchmarks. Of course, HTTP/2 will help if your server supports it.

**Schema-less NoSQL**: Store and retrieve your data as raw JSON, exactly like you generate and consume it in the front-end client.

**Minimal server code**: You won’t need to write fancy APIs. Write your server code as discrete “reactor” functions that each handle one task. It’s like every reactor function is its own micro-service, portable, reusable and decoupled from the rest of your architecture.

**Testability**: Reactor functions are discrete and accept Firebase snapshots as input. Writing integration tests is as easy as pushing mock objects to your Firebase queues. And you can even mock your Firebase snapshots and write blazing fast unit tests if you’re so inclined.

## **Example Time!**

Let’s code and see how simple this architecture really is.

The following gist has three files. I’ll cover each file on its own.


### fires-stack.js

This is the Node.js server process that will house our (RE)actor function. It initializes Firebase and then starts listening to the **/queues-test/presses** endpoint with a **child_added** event. The callback is the reactor function that will handle the queue items as they’re added to the endpoint.

This example has a simple reactor function. It’s setting **/queues-test/presses/&lt;uid&gt;/response** or **…/error **based on whether *click.random* is greater than or less than 0.5. The reactor function then removes the queue item.

### index.html

This is our client app or (I)nterface. It first forces anonymous authentication for security purposes and then adds queue jobs to the **/queues-test/presses/&lt;uid&gt; **endpoint. At the same time that it’s adding the queue job, it’s listening to **child_added** events on the same endpoint. This will enable the client app to receive the **…/response** or **…/error** results of the reactor function. Note, the reactor function deletes the queue item immediately, so you’ll need to be listening to **child_added** events before the reactor function has a chance to delete the queue item.

### security-rules.json

This is the primary *gotcha *in this architecture. Remember how **index.html** forced anonymous authentication on line 26? Also remember how **index.html** used *firebase.auth().currentUser.uid* on line 34?

The anonymous auth establishes a secure connection to Firebase. It gives us a uid that’s unique to this session and can be used in our security rules.

Our security rules have two wildcards in the path, *$queue* and *$uid*. Each wildcard will apply to all matching paths, so we could create a new queue list under **/queues-test/clicks** and the same rules would apply to that node as apply to **/queues-test/presses**. The next and most crucial step is the *$uid* wildcard, because it matches all of the *currentUser.uid* values that our client app is using on line 37 of **index.html**.

Now that we have *$uid* in our path, we get access to *$uid* in our security rules. Our client app also has an anonymous auth session with Firebase, which gives us access to *auth.uid* in our security rules. Now we grant read and write access based on a simple equality test.
> “.read”: “auth.uid == $uid”,
> “.write”: “auth.uid == $uid”

## In Short

The pie-in-the-sky goal of Firebase is to create server-less, static applications for web, iOS and Android. The reality of most development is that you’ll need a server for something, be it data fan-outs, sending email, completing a financial transaction or anything else requiring a secure operation.

But we already have the Realtime Database with it’s blazing fast WebSockets connection, so why not use that instead of HTTP? The FIRE stack architecture makes this easy, giving us the speed of WebSockets, the security of Firebase and the modular, micro-services architecture of Node.js reactor functions.

My experience is that most Firebase devs gravitate toward this architecture over time. It’s quite intuitive once you understand how it works. It’s also incredibly flexible and fast to develop.

## **Video**

I posted a little walkthrough to YouTube if you’d like to see this in action :)

Go ahead and subscribe to my updates on Medium and/or YouTube to get more Firebase tutorials as I post them.

Even better, sign up for my FREE 📬 [Firebase Newsletter](http://eepurl.com/ceGkov) 📬 to get all of these FREE goodies sent to your inbox! Did I mention that it’s FREE??? 💵 💵 💵 This has got to be *at least* a $5000 value. You don’t want to be old and gray, thinking… “If only I’d signed up for the [Firebase Newsletter](http://eepurl.com/ceGkov) when I had the chance…”
