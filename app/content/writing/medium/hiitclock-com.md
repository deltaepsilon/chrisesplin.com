---
layout:  medium
slug: hiitclock-com
date: 2017-02-06T23:04:16.180Z
author: "Chris Esplin"
title: "HiiTClock.com"
subtitle: "Redux + Firebase + localStorage for offline-first support"
tags:
  - javascript
  - redux
  - firebase
  - polymer
keywords:
  - javascript
  - redux
  - firebase
  - polymer
draft: true
---

I spend a lot of time advocating for Firebase. I’ve been Firebase-monogamous since 2014, when I kissed the last of my MySQL code goodbye and good riddance.

I get a few questions over and over again regarding Firebase

1. How do you search Firebase collections?

1. Does Firebase have offline support for web?

My latest project, [HiiTClock.com](https://www.hiitclock.com), forced me to address both of those issues head on.


## What is HiiT Clock?

HiiT stand for [**high-intensity interval training](https://en.wikipedia.org/wiki/High-intensity_interval_training)**. It’s a popular way to get fast and strong, used across a variety of sports such as running, cycling, CrossFit and football. The idea is that you perform a very intense movement, such as sprinting 100 meters or pushing a weighted sled. Then you rest for a set duration… then repeat, again and again and again. By tuning the work/rest intervals, you can extract maximum performance from your body in a short period of time.

More sophisticated HiiT routines often involve a rotating circuit of movements, giving the body time to recover, and enabling the athlete to continue working hard for a longer time period.

I do a lot of HiiT-style workouts, particularly when I’m training for CrossFit. I haven’t been able to find an easy-to-use, yet powerful timer solution to keep my workouts on track. CrossFit gyms traditionally use a whiteboard and a single clock, with athletes watching the clock and the whiteboard, doing a bit of math in their head to figure out the next movement. I’ve used a bunch of timer apps over the years, but they’ve all bothered me in one way or another.

HiiT Clock lets users program their entire HiiT circuit into the app and save it for later. HiiT Clock also enables casting timers to a television with Chromecast, Apple AirPlay, or a mirrored web page. It also has audio queues that are especially useful when running with headphones.

## HiiT Clock Stack

HiiT Clock uses a bunch of technologies. Here are a few.

* [Polymer](https://www.polymer-project.org/1.0/)

* [Redux](http://redux.js.org/) with [&lt;polymer-redux&gt;](https://github.com/tur-nr/polymer-redux)

* [Firebase](https://firebase.google.com/docs/web/setup)

* [Algolia](https://www.algolia.com/) with [firebase-search](https://github.com/deltaepsilon/firebase-search)

* [serviceWorker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

* [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage)

* [d3.js](https://d3js.org/)

* [Chromecast sender & receiver SDKs](https://developers.google.com/cast/docs/chrome_sender_setup)

* [Progressive Web App](https://developers.google.com/web/progressive-web-apps/)

* [Node.js](https://nodejs.org/en/) with [firebase-queue](https://github.com/firebase/firebase-queue)

The key innovation with HiiT Clock is that it’s a Progressive Web App or PWA. PWAs are build to be offline-first, using serviceWorker to cache the entire page. They’re also made to save to a phone’s home screen and act exactly like a native app on any Android phone. They can work on iOS as well, but iOS has inferior support for PWA features, so PWA apps end up acting more like regular web apps when used in Safari. But they still work just fine, which is why they’re “progressive”.

If you have an Android phone or tablet, try saving [HiiT Clock](https://www.hiitclock.com) to your home screen. When saved to the home screen, PWAs can look 100% native. The only hints that they’re web apps is that they all have pull-to-refresh just like any Android Chrome tab, and when you try to uninstall the app, you get the **remove** option but no **uninstall** option. You can put your phone in airplane mode, refresh the page, and it should continue to work seamlessly.

## Don’t try to search Firebase. Use Algolia instead.

It *is* possible to hack together some basic search for Firebase. It’s usually heavy on client-side logic, and it usually involves downloading entire collections.

Skip the pain and use [Algolia](https://www.algolia.com/) instead. Algolia is a dedicated search-as-you-type, 1ms response-time search solution. You won’t do better than Algolia for performance or ease of use.

We all wish that Google would just purchase Algolia already and roll their incredible search directly into Firebase, but until that unlikely-yet-hoped-for day, I’ve got an NPM module that can help.

```
npm install --save quiver-firebase-search
```


My module is named [firebase-search](https://github.com/deltaepsilon/firebase-search). Someone else already registered firebase-search on npm, so you’ll need to install quiver-firebase-search… but once you’ve got it installed, it’s just firebase-search.

Firebase Search takes two arguments, a Firebase collection ref and a config object. Firebase Search will keep your Algolia or Elasticsearch index synced to your Firebase collection ref. Problem solved.

## Use Redux + localStorage for offline

I’ve heard tell that Firebase has great offline support for iOS and Android. But I don’t care. I’m developing a [progressive *web* app](https://developers.google.com/web/progressive-web-apps/). I need offline-first for JavaScript, and Firebase doesn’t give that to me out of the box.

Enter [Redux](http://redux.js.org/). Most devs think that Redux is build for React. False! Redux is built for JavaScript. Polymer is JavaScript. I use Redux with the fantastic [&lt;polymer-redux&gt;](https://github.com/tur-nr/polymer-redux) element. Whenever you’re thinking to yourself, “I wish there were a better way to handle my app’s state…”, try Redux. You will not be disappointed.

One of the criticisms of Polymer is that it allows two-way data binding. Well surprise! Polymer also allows one-way data binding. And Redux is all about one-way data binding, so they’re a perfect match.
> Shh!
> A little known secret about Polymer is that two-way data binding is totally useful. Don’t tell anyone about my heresy… but I mix one- and two-way binding in my apps!!! Some trivial bits of data don’t need to be saved as app state, like if a sub-component’s checkbox is checked. So use two-way binding for the trivial stuff that you can lose between page reloads, and use one-way binding for the state that you care about.

## Redux + localStorage == Offline Support

Here’s where it gets fun. Redux allows for simple offline-support with localStorage. You merely subscribe to your Redux store and save your stringified state to localStorage, and when you first load an empty state, you check localStorage to see if your client has a saved state, and swap your empty state for the localStorage version. Piece of cake. Here’s the code for that.

```
var store = Redux.createStore(function (state, action) {
  if (action.type == '@@redux/INIT') {
    try {
      state =JSON.parse(localStorage.getItem('QuiverStoreState'));
    } catch (err) {
      console.log('localStorage error', err);
    }
   }

   if (!state) { // Handle empty localStorage + undefined
      state = {//Some default state}
   }

  // The rest of your reducer

});

store.subscribe(function () {
 localStorage.setItem(‘QuiverStoreState’, JSON.stringify(store.getState()));
 });
```


## Redux + Firebase == Online Persistence

This is where it gets tricky. Once you have your app state fully offline and happy with Redux and localStorage, it’s time to start syncing to Firebase.

This is step is entirely app-specific.

HiiT Clock allows users to create their own interval timers which they can then play on-screen with a visual countdown graphic. I chose to sync only the users’ timer collections to Firebase. The rest of HiiT Clock’s data model is self-contained and offline-friendly… it can get blown away by a cache refresh, and I don’t care. But those timers are critical.

To achieve a Redux-to-Firebase sync, I subscribed to my Redux store and, whenever the timers change, I attempt to sync that data out to Firebase. If the client is offline, the sync fails and I’ll try again later.

To achieve Firebase-to-Redux sync, I listen to the **value** event on my Firebase ref, and compare all incoming Firebase states to my local Redux state. If I determine that my Firebase state has been updated more recently, I overwrite my local Redux state.

You’ll have to figure out the data merges yourself. My timers model is simple enough that I use timestamps. Every time Redux updates a timer, I set

```
state.updated = Date.now()
```


So if I see a local state with a more recent **state.updated** value than what’s in Firebase, then I overwrite Firebase with my local state. If the Firebase state is newer, I overwrite my local Redux state.

## Syncing gets hairy

The Redux + localStorage side of this equation was easy. The Redux + Firebase side was not.

Even with a simplistic timestamp syncing strategy, I got to debug a lot of edge cases where some bits of timer data needed to look differently in Redux than in Firebase, so I had transform that data before syncing it out to Firebase, and I had to transform it back when syncing from Firebase to Redux. You can avoid this issue by using Redux + localStorage + Firebase from the beginning… but I didn’t discover this architecture until my original data model had reached its limit, so I’ll do a better job next time.

If my Redux-to-Firebase-to-Redux syncing were any more complicated, I would be in real trouble. I suspect this is why Firebase hasn’t attempted to implement an offline solution for web. Deciding which datastore should win is not always simple. I will do much better on my next app. I’ll do the data model first and the UI second. I’ll start with Redux and Firebase, and start syncing that data from the beginning.

## What do you think?

Am I crazy to try to use Redux with Firebase?

Does this sound like a useful architecture for your apps, or did I just find a niche use case?

I’m new to the whole offline-first, progressive web app scene. Most everyone is. It’s been incredible, and I’m super happy with my result, but I know that I’ll do better next time. The front-end JavaScript environment is changing so rapidly that the best architecture available today is unlikely to be ideal for your next project. Excellent libraries and features roll out every month, so stay sharp and keep learning!