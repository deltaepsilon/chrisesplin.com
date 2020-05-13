---
slug: firestore-sub-collections
date: 2018-07-02T11:22:22.439Z
author: "Chris Esplin"
title: "Firestore Sub-Collections"
subtitle: "If you’ve been keeping up on Firebase in the last year then you’re likely using Firestore."
tags:
  - firebase
  - google-cloud-platform
  - javascript
  - nosql
keywords:
  - firebase
  - google-cloud-platform
  - javascript
  - nosql
draft: true
---

Firestore is a bit of a successor to the original Firebase Realtime Database.

After Google purchased Firebase in October of 2014 Firebase had to move over to Google infrastructure. That’s a ton of work, but once you’re on Google infrastructure, *you’re on Google infrastructure*!

So you might as well design a new database from scratch that crushes everything that came before 😍

And that’s how we got Firestore.


I’ve talked about Firestore in the past, so review those [videos ](https://www.youtube.com/channel/UCaAByidxypZTYOj4OsKzD2Q)and [articles](https://howtofirebase.com/), or check out [FullStackFirebase.com](https://www.fullstackfirebase.com/) for the Firestore introduction.

I’d like to talk at a high level about Firestore sub-collections.

First, we need to review the Firestore data model. Firestore is a document/collection database. Documents hold whatever JSON data you’d like, but they must live within a collection.

A document can have any number of sub-collections with their own documents. And you can keep nesting your data within sub-collections to your heart’s content.

But that would be a horrible mistake.

In fact, I haven’t found a great use case for sub-collections quite yet. First off, you can easily save embedded JSON objects within your documents, so it’s not necessary to make a sub-collection to nest data within a document.

And second, sub-collections are easily orphaned.

What do I mean by orphaned???

I mean that if you delete a document’s data without deleting it’s sub-collections, you can no longer query the document, so you might lose your reference to it, and lose track of its sub-collections.

This deserves some extra explanation.

If I have a collection called **foods**, I can query all of the documents in my **foods** collection. Imagine that I have a **food** document named **gelato**. My **gelato** document has attributes for **color**, **calories** and **deliciousnessRating**.

I want to track the ingredients in my gelato, so I create an **ingredients** sub-collection. When I query my **foods** I get an object back named **gelato **with **color**, **calories** and **deliciousnessRating** attributes.

But I don’t get the **ingredients** sub-collection.

I only get the **ingredients** sub-collection if I make a separate query for it.

And I have to just know that it’s there. There’s no hint that my **gelato** document has sub-collections. So I can lose track of my **ingredients** sub-collection by forgetting that it exists.

Now imagine that I delete my gelato document for some reason.

My **gelato** document is gone, but I’ve forgotten to delete my **ingredients **sub-collection. Because, get this… I have to manually delete a document’s sub-collections.

And to add insult to injury, since I deleted the **gelato** document, it no longer shows up in my **foods** queries. So now I don’t know that **gelato** ever existed, but the **ingredients** sub-collection is still there.

You can see these orphaned sub-collections by clicking through the Firestore web console. But you have to click through every single document to find them, because orphaned sub-collections don’t show up when you query their parents.

This is garbage.

I’m confident that the Firebase team knows of this problem and has some plan to address it, because Firestore is still in beta of course, and I’m thankful to have Firestore even with it’s wacky sub-collection system.

Just don’t get suckered by sub-collections.

They have their uses for sure. I’ve used them to cascade security rules and it’s been great, but sub-collections are still iffy as a cornerstone of your data model.

The good news is that you don’t need sub-collections to build your app on Firestore.

And they’ll likely get more useful in time, so I’m hopeful.

Let me know what you think about Firestore in the comments.

I’ll hang out and answer questions as always.

And don’t forget to follow this publication for more Firebase tips and tricks ✨🎉🔥