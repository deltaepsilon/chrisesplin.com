---
layout:  medium
slug: firebase-security-a-response
date: 2018-07-02T11:34:05.222Z
author: "Chris Esplin"
title: "Firebase Security&#58; A Response"
tags:
  - firebase
  - security
  - google-cloud-platform
keywords:
  - firebase
  - security
  - google-cloud-platform
draft: true
---

I pay close attention to the Firebase ecosystem, so my Google News feed often has Firebase- and Google-related articles in it.

A few weeks ago I saw an article pass through my feed about Firebase apps leaking data.

It was coverage of [some security research by a company named Appthority](https://www.appthority.com/mobile-threat-center/blog/appthority-discovers-thousands-of-apps-with-firebase-vulnerability-exposing-sensitive-data/).

Appthority did an audit of thousands of Android and iOS apps and found some serious problems. These apps had all implemented Firebase, but failed to implement Firebase security rules.

So these apps’ Firebase databases are basically public for everyone to read.

I thought, “wow, that’s really horrible… I sure hope they get that fixed!”… and I forgot about it.

But in the last few days the coverage has gotten heavier and it’s entered into clickbait territory.

When the clickbait farms start to recycle content, the coverage goes from “ok” to “horrible”. The details of the story suffer, because the clickbait farms are churning out articles without even a cursory understanding of what they’re writing about.

So I’d like to clear this situation up a bit.

Just be to one-hundred percent up front, I am not speaking for anyone but myself.

These are my opinions that I’m talking about because the clickbait is misleading.

So what is actually happening with these data leaks?

It’s simple.

Bad developers are lazy and believe in security-through-obscurity. Firebase has given them all of the tools that they need, but they haven’t used them. And as a result, apps by lazy, incompetent developers are leaking data all over the web.

This happens because Firebase is a back-end as a service. This necessitates that the Firebase database is publicly accessible. Anyone can make requests to your Firebase database, both the Realtime Database and Firestore.

So Firebase has Security Rules that you write to lock down your databases.

These rules are, admittedly, the weakest part of the Firebase platform. I am not implying that the security itself is weak, because it’s bulletproof. But Security Rules are difficult for developers to understand, because they solve a complex set of problems.

I’ve noticed that Firebase’s default security rules have become more strict over the years. You now have to manually override them to make your database public. You’re supposed to replace the default rule with your app-specific rules to lock your data.

It’s a little like changing the admin password on your new router.

People don’t think anything will ever happen to them, so the vast majority of routers still use their publicly-discoverable default passwords.

Likewise, bad developers don’t think anything will ever happen to them, so they override Firebase’s Security Rules and make their apps publicly accessible.

A publicly-accessibly app is easier to develop on because you never run afoul of your own Security Rules.

And that’s fine if you’re writing a little demo app or an internal prototype with dummy data. But it’s become clear that there are a ton of bad developers out there, and that these devs shipped their apps without ever locking them back up.

If you’re interested in stealing, there are a ton of insecure apps on the web.

And some of them are poorly configured Firebase apps.

If you’ve been a bad developer, please write some security rules. I’m happy to help you sort them out.

In fact, I’ve written [some tutorials over on FullStackFirebase.com ](https://www.fullstackfirebase.com/cloud-firestore/security-rules)that will prove useful.

And for everyone else… thank you for taking basic security measures and locking down your Firebase apps.

Data security is no joke.

We have to take our responsibility as developers very seriously.

I don’t want to work in a highly-regulated industry, and bad data security, even if it’s inadvertent, will drag us all down.

And if you somehow conned me into installing an insecure app on my phone…

…shame.

Shame.

Shame.

Shame.