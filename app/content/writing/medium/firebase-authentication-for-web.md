---
layout:  medium
slug: firebase-authentication-for-web
date: 2016-12-06T16:03:52.137Z
author: "Chris Esplin"
title: "Firebase Authentication for Web"
subtitle: "The quickest auth implementation ever"
tags:
  - firebase
  - javascript
  - google-cloud-platform
  - polymer
  - authentication
keywords:
  - firebase
  - javascript
  - google-cloud-platform
  - polymer
  - authentication
draft: true
---


Firebase Authentication is necessary to grant read/write privileges to your users via security rules. We haven’t covered security rules yet, but just know that security rules rely on a users’ authentication status.

Firebase ships with its own email/password auth as well as OAuth2 integrations for Google, Facebook, Twitter and GitHub. You can also integrate your own proprietary auth systems with Firebase Authentication to grant users access to data without forcing them to create an account outside of your existing systems.

Firebase also allows for anonymous auth sessions, which are typically used to persist small amounts of data while waiting for a client to authenticate with a permanent auth method. These anonymous sessions can be configured to last days, weeks, months, even years… until the user logs in with a permanent login method or clears her browser cache. Web apps often use local datastores like sessionStorage or localStorage to accomplish similar tasks. For example, a shopping cart application could create an anonymous auth session for every user who adds something to his or her cart. The shopping cart app would prompt the user to create a user account for checkout, at which point the cart would be persisted to the new user’s account and the anonymous session would be destroyed.

## Firebase User System

Firebase Auth includes a user management system. You can save some basic data against your Firebase Auth users, and you offer multiple login methods — email/password, Google, Facebook… — and link your users’ accounts into single Firebase Auth user accounts. Auth also provides for integrations into your pre-existing auth system so that your app can take advantage of Firebase’s security rules.

Firebase Auth provides an observer for auth changes:

```

firebase.auth().onAuthStateChanged(function(user) {
 window.user = user; // user is undefined if no user signed in
});
```


The above example keeps *window.user* in sync with your Firebase Auth user. *user* will be undefined if the user is not logged in.
 
 You can also manipulate your current user. You obtain your current user with *firebase.auth().currentUser*, which looks like the object below 👇, but with a bunch of extraneous Firebase attributes that you’ll never use and don’t need to know.

```
{
 displayName: null,
 email: “[chris@quiver.is](mailto:chris@quiver.is)”,
 emailVerified: false,
 isAnonymous: false,
 photoURL: null,
 providerData: {
  refreshToken: “ANflqpEVNvT4iOyKVVRyybjcuwKqnca…”,
  uid: “P1yjH4GgcFQcJUHULmTgMLC68w64”
 },
 refreshToken: “ANflqpEVNvT4iOyKVVRyybjcuwKqnca…”,
 uid: “P1yjH4GgcFQcJUHULmTgMLC68w64”
}

```


Other OAuth providers such as Google and Facebook will give you more data in your *providerData* node depending on the scopes that you ask your users to approve. 
 
 You can also use the following functions — all of which return promises — to manipulate your user:


### Email/Password

Email/password auth has functions to register new users, sign in existing users and sign out a signed-in user. All functions return promises, and new user registration automatically signs in the user. All three functions trigger the ```onAuthStateChanged``` observer… so you should be handling successful auth changes in the handler instead of with the promises that these functions return.


### Google Sign In

Review the [Google Sign-In docs](https://firebase.google.com/docs/auth/web/google-signin#before_you_begin). They’re better than anything that I could write up here, and Google will keep them up to date.

My only notes are that you need to continue using the *onAuthStateChanged* observer as before, and make sure to add [some scopes](https://developers.google.com/identity/protocols/googlescopes#google_sign-in):


### Facebook/Twitter/GitHub/Custom Auth

[See the docs](https://firebase.google.com/docs/auth/web/facebook-login#before_you_begin) and follow the same patterns as before.

### Anonymous Auth

You can automatically sign in your user anonymously to create a sort of Firebase-persisted session.

```
firebase.auth().signInAnonymously()
 .catch(function(error) {
  // Handle errors
 });
```


Signing a user in anonymously will fire off the *onAuthStateChanged* observer as before, but this time the *currentUser* will be a bit bare:

**Anonymous currentUser Object**

```
{
 displayName: null,
 email: null,
 emailVerified: false,
 isAnonymous: true,
 photoURL: null,
 providerData: {},
 refreshToken: “ANflqpEVNvT4iOyKVVRyybjcuwKqnca…”,
 uid: “P1yjH4GgcFQcJUHULmTgMLC68w64”
}
```


Anonymous auth is useful in narrow situations where you need to authenticate users to utilize security rules and possibly convert those anonymous users to permanent, authenticated users later in your on-boarding process. The big catch is that you can link only one anonymous account to an authenticated account. So if your user logs out and follows the same on-boarding flow a second time, your account link will fail the second time and you’ll need to handle it manually.

### Auth Service Linking

Many modern applications offer multiple login methods such email/password, Google and Facebook. Users tend to forget how they logged in the last time they used the app, so Firebase allows us to link multiple authentication methods. For example, if you create an email/password account and then log in with Google from a different device, you can prompt your user to log in with an existing email/password combination to link the two accounts together on your Firebase.

Linked auth accounts share a single *unique identifier* (a.k.a. uid) and will show up as a single user entry on Firebase’s Auth console page.

Your user will need to be signed in with an auth provider before linking, be it anonymous, email/password or an OAuth provider. Once your user is logged in, the *firebase.auth().currentUser* will represent that logged in user, which is now ready to be linked. Next obtain a credential from your new auth provider. If the second auth provider is email/password, you can obtain a credential without actually logging in, which prevents *firebase.auth().currentUser* from being overwritten with the new auth user; however, if your second auth method is an OAuth provider such as Google or Facebook, your *currentUser* will be overwritten by the second authentication process. You’ll need to save the *currentUser* from your first authentication to a local variable, because you’ll no longer be able to access it from *firebase.auth().currentUser*.


**Quirk Alert**

There’s an interesting quirk when using email/password as your second authentication method. You can obtain an email/password credential without logging in the user or even registering an account, so linking an email/password credential to an existing user will automatically register a new email/password account. Make sure to thoroughly test this sort of linking to make sure that you’re handling all possible cases… there are a lot of account linking permutations to track.

## Exercise

Navigate to the Auth tab on your project from the [Firebase Console](https://console.firebase.google.com/). You shouldn’t have any users configured, but they’ll show up on this first screen once you do. Click the “SIGN IN METHOD” tab and enable the Email/Password and Anonymous sign in providers. We’ll use only Email/Password and Anonymous. You’ll need OAuth tokens to enable the other providers, and while the tokens aren’t difficult to gather, the other auth systems work almost identically to Email/Password.

The trickiest part of Firebase Auth is linking users. You can potentially link all different auth providers into a single user account. The biggest caveat is that anonymous auth accounts can only be linked to an existing account once. If you’ve linked an anonymous account to any other login method, that login method can no longer be linked to anonymous accounts. You’ll have to handle merging the data manually. This is a pretty big weakness for anonymous accounts and suggests that managing temporary sessions in localStorage may be smarter.

Create an **.html* file and copy/paste the code below into it.


You’ll need to add your firebase configuration details and then follow Step 1 and Step 2 as outlined in the code comments.

This is a very minimal demo on how to configure Firebase auth, but production implementations will not be much more complicated. If you’re having trouble, make sure to struggle with this a bit before looking up the completed demo. The Firebase docs are generally excellent and you’ll want to sit down and read them carefully whenever you run into a tricky implementation.

This exercise suggests a method of handling authentication where every session gets an anonymous account and new accounts are linked to the anonymous account instead of being registered separately. If the accounts haven’t been linked, a new account is registered automatically, which is a fun quirk of account linking; registering a new account is not strictly necessary with this model… linking gets the job done.

The catch is that linking fails if an account has already been linked, in which case we can simply log in with the existing account. The anonymous account gets lost in this case. So tough luck on that one… maybe try localStorage if you need to hang on to that anonymous data. I’ve had great success storing shopping cart data in localStorage rather in Firebase, because localStorage persists across authentication changes. I only persist the cart to Firebase once the user checks out. It’s a nice end run around anonymous data persistence issues.