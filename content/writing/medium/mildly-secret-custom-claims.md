---
layout:  medium
slug: mildly-secret-custom-claims
date: 2018-07-23T12:53:30.522Z
author: "Chris Esplin"
title: "MILDLY SECRET&#58; Custom Claims"
subtitle: "I’d like to talk about my favorite feature of Firebase Authentication."
tags:
  - javascript
  - firebase
  - authentication
  - google-cloud-platform
keywords:
  - javascript
  - firebase
  - authentication
  - google-cloud-platform
draft: true
---

You probably haven’t heard of it, because it’s buried in one of the “getting started” guides in the Firebase docs and nobody reads ALL OF THE DOCS!


I only discovered [custom claims ](https://firebase.google.com/docs/auth/admin/custom-claims)when I complained about the lack of user role management.

I mean, if I want to tag a user as an admin, do I have to make a database entry? Because if that’s the case, I have to query the database every time I authenticate a user and while I’ve done that for a long time… it’s a slow, cumbersome operation.

So I was whining, I can’t remember if it was online or at a Firebase event and a Firebase team member mentioned Custom Claims as an easy solution to my problem.

Why is this feature hidden!!!

Every Firebase app should be using Custom Claims, and it’s buried deep in the docs!

Any non-trivial app eventually needs user roles. I need to mark users as administrators or managers or moderators or just plain paid-up users. And Custom Claims allows me to set simple user attributes directly on my user’s JWT.

A JWT is a Json Web Token, which is the **currentUser** object in Firebase Authentication.

So every time I authenticate on the client I get a currentUser JWT, and if I’ve set custom claims on my user, I can extract the custom claims from the user JWT.

I have a sample Cloud Function that does just this, [so check out that link](https://github.com/deltaepsilon/firebase-ssr-starter/blob/master/functions/src/authorization-on-create.js).

So let’s talk through that code and I’ll show it all in action.

We’ll get started with my Cloud Function called **authorizationOnCreate**.


**authorizationOnCreate** is triggered by new user creation in Firebase Authentication.

I’m saving all of my custom claims data by user email address in the Realtime Database, so the first thing to do is to get that data from the RTDB.

Once I have the relevant claims data for my user, I just need to set it.

That’s an easy call to **firebase.auth.setCustomUserClaims()**.

I just pass in the user’s UID that I get from the JWT and the claims object.

The claims object can be anything really, but it must be under 1000 bytes, and you should only use it for access-control.

There are performance implications to trying to save too much data in a custom claim, so just follow best-practices and keep that sort of data in the RTDB or Firestore.

In this case I want to set **isAdmin** and **isModerator** flags on my user.

I developed this Cloud Function with test-driven development methodologies, so I am very proud to say that it worked the very first time I deployed it.

To prove that this works, I’ll go ahead and delete my user from Firebase Authentication.

Now I’ll register a new user and we can see that the claims are not there yet.

I can refresh my page and the claims still won’t be there…

…so I’ll have to sign out and sign back in…

…and there they are.

My **isAdmin** and **isModerator** flags are set and I’m ready to start writing my admin dashboard.

I’m getting my custom claims data by calling **currentUser.getIdTokenResult()**.

It’s an async function that returns an **idTokenResult**. The **idTokenResult** has a claims attribute with the custom claims as children.

Getting and setting custom claims is dead simple. All of the complexity comes from writing the Cloud Function to do it, so go ahead and copy/paste my function to get started!

I write very opinionated Cloud Functions code… so take my code with a grain of salt.

You don’t need to complicate your Cloud Functions as much as I do.

Go ahead and keep it simple, and I hope you love custom claims.

They’re fantastic.

I’m just mad that it took me so long to find them.