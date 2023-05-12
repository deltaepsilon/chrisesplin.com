---
layout: project
projectKey: HIIT_CLOCK
title: HIIT Clock
---

### Project Summary

I use HIIT Clock nearly every weekday.

I built the app for myself after getting fed up with the sad state of Android workout timers.

The is the second iteration of HIIT Clock. The first one was great, but the code wasn't aging very well. It was originally written in Polymer 2.0, and the Polymer project was coming to a close. The original app wasn't worth iterating on, so I rewrote it from scratch.

### Technology

Of course I started with Firebase and Google Cloud Platform.

I layered on React and Next.js with heavy use of Chrome-specific browser APIs. It's meant to be run on an Android Chrome browser.

It's a full-blown Progressive Web App (PWA), meaning that users can "save to homescreen" and use HIIT Clock as if it were a native Android app. It's very slick.

Chromecast APIs also came into play. I lift weights in my basement with a TV on the wall, and I wanted to cast my timers up to the TV.

![chromecast](/static/images/chromecast-tv.jpg)
![chromecast](/static/images/hiit-clock-screenshot.png)
