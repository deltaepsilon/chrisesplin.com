---
layout:  medium
slug: what-is-firebase
date: 2016-10-24T15:49:08.403Z
author: "Chris Esplin"
title: "What is Firebase?"
subtitle: "Firebase is a Backend-as-a-Service — BaaS — that started as a YC11 startup and grew up into a next-generation app-development platform on Google Cloud Platform."
tags:
  - firebase
  - android
  - nosql
  - javascript
  - google-cloud-platform
keywords:
  - firebase
  - android
  - nosql
  - javascript
  - google-cloud-platform
draft: true
---

I’ve been using Firebase since 2013. I was late to the game :)

I use Firebase to power my family’s business, [Calligraphy.org](https://www.calligraphy.org). I also use it for *everything* I’ve developed in the last three years.

Firebase frees developers to focus crafting fantastic user experiences. You don’t need to manage servers. You don’t need to write APIs. Firebase is your server, your API and your datastore, all written so generically that you can modify it to suit most needs. Yeah, you’ll occasionally need to use other bits of the Google Cloud for your advanced applications. Firebase can’t be everything to everybody. But it gets pretty close.

Watch the video below for my 8-minute, in-depth opinion on why I love Firebase, what it does, what it **doesn’t **do and how to think about Firebase in the context of your app’s architecture.


So what is Firebase?

### **It’s a Realtime Database**

Real-time data is the way of the future. Nothing compares to it.

Most databases require you to make HTTP calls to get and sync your data. Most databases give you data only when you ask for it.

When you connect your app to Firebase, you’re not connecting through normal HTTP. You’re connecting through a WebSocket. WebSockets are [much, much faster than HTTP](http://www.websocket.org/quantum.html). You don’t have to make individual WebSocket calls, because one socket connection is plenty. All of your data syncs automagically through that single WebSocket as fast as your client’s network can carry it.

Firebase sends you new data as soon as it’s updated. When your client saves a change to the data, all connected clients receive the updated data almost instantly.

### **It’s File Storage**

Firebase Storage provides a simple way to save binary files — most often images, but it could be anything — to Google Cloud Storage **directly from the client!!!**

Firebase Storage has it’s own system of security rules to protect your GCloud bucket from the masses, while granting detailed write privileges to your authenticated clients.

### It’s Authentication

Firebase auth has a built in email/password authentication system. It also supports OAuth2 for Google, Facebook, Twitter and GitHub. We’ll focus on email/password authentication for the most part. Firebase’s OAuth2 system is well-documented and mostly copy/paste.

If you’ve ever written an authentication system, let’s commiserate for a moment. Custom authentication is terrible. I will never write an auth system again for as long as I live. I fell in love with Firebase Auth at first sight, and the flame has never wavered. Sometimes I get frustrated. Sometimes we fight. But I never forget the cold, dark abyss of a custom auth system. I count my blessings.

Oh, and Firebase Auth integrates directly into Firebase Database, so you can use it to control access to your data. I’m writing this as if it’s an afterthought. It’s not. It’s the second reason that you will love Firebase Auth.

### **It’s Hosting**

Firebase includes an easy-to-use hosting service for all of your static files. It serves them from a global CDN with HTTP/2.

And to make your development particularly painless, Firebase hosting utilizes [Superstatic](https://github.com/firebase/superstatic), which you can run locally for all of your testing. I run Superstatic as [BrowserSync](https://www.browsersync.io/) middleware. The following implementation uses Gulp, but Gulp is purely optional.


The BrowserSync + Superstatic development environment is slick. BrowserSync handles reloading your development app across all connected devices and Superstatic replicates Firebase hosting locally in such a way that you can deploy straight to Firebase for production use.

### **It’s a Fully-Featured App Platform**

The Firebase team has integrated a bunch of new and existing Google products with Firebase. I don’t plan to cover these features in detail quite yet…

A bunch of these features apply to iOS and Android but not to web.

* Remote Config

* Test Lab

* Crash

* Notifications

* Dynamic Links

* AdMob

## Firebase Pros & Cons

It’s not all roses.

I mean, it’s mostly roses, but watch the thorns.

### Pros

* Email & password, Google, Facebook, and Github authentication

* Realtime data

* Ready-made api

* Built in security at the data node level

* File storage backed by Google Cloud Storage

* Static file hosting

* Treat data as streams to build highly scalable applications

* Don’t worry about your infrastructure!

### Cons

* Limited query abilities due to Firebase’s data stream model

* Traditional relational data models are not applicable to NoSQL; therefore, your SQL chops will not transfer

* No on-premise installation

## **How To Firebase: From Beginner to App Architect**

My goal for **How To Firebase** is to teach Firebase to new and experienced Firebase developers. I’m covering everything, and I’m taking questions from all comers.

I’m covering the latest, greatest version of the Firebase SDK. This is not the stale content you’ll find abandoned across the web.

Subscribe to this Medium publication for written walkthroughs. Also subscribe to my [live-coding screencasts on YouTube](https://www.youtube.com/playlist?list=PLdssc-pDiZ7MJeKr4k5r33jCGOT2H_iKB) for the freshest Firebase screencasts out there.

## Resources

I don’t pretend to know everything. These are the people and feeds that I follow to keep up-to-date on the state of Firebase.

### [The Docs](https://firebase.google.com/docs/)

Start with the docs. Always. They’re un-opinionated and won’t help you much with your app structure, but they’ve got great code examples for implementing individual features.

### [**Firecasts**: The official Firebase YouTube channel](https://www.youtube.com/user/Firebase)

Firecasts is an official Google production. It covers core Firebase features, and the presenters know their topics cold. Of course, as an official Google channel, it focuses on Google products. You won’t find much discussion of Firebase’s weaknesses or how Firebase fits into the broader dev ecosystem.

### [The Firebase Blog](https://firebase.googleblog.com/) and [@Firebase](https://twitter.com/firebase)

This may be obvious, but follow [The Firebase Blog](https://firebase.googleblog.com/) and [@Firebase](https://twitter.com/firebase) on Twitter for new releases and community updates.

### [Frank van Puffelen (Puf) on StackOverflow](http://stackoverflow.com/users/209103/frank-van-puffelen)

Puf might correct me on this, but my understanding is that he was so active on Firebase topics on StackOverflow that the Firebase team offered him a job. He’s been with Firebase since well before the Google acquisition. Puf’s StackOverflow answers should be your starting point for Firebase troubleshooting.

[@Puf](https://twitter.com/puf) is a great Twitter follow as well :)

### [David East](https://twitter.com/_davideast), Developer Advocate

David has been on the Firebase team since forever. He’s currently a developer advocate. He’s got a great Twitter feed—[@_davideast](https://twitter.com/_davideast)—and you’ll see him on the [#askFirebase](https://www.youtube.com/playlist?list=PLl-K7zZEsYLkkCFs6T9mlqG8v6NCs38pA) YouTube vids. You can also catch glimpses of him skating if you wander around San Francisco enough.

### [Firebase Slack](https://firebase.googleblog.com/2016/02/come-join-firebase-slack-community_13.html)

If I’m truly stumped and I can’t find an answer on Puf’s StackOverflow feed, my next stop is the #needhelp channel on [firebase-community.slack.com](https://firebase-community.slack.com/). The Firebase team and a bunch of community experts field questions and chat about architecture, features, troubleshooting, etc.