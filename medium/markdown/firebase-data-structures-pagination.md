---
slug: firebase-data-structures-pagination
date: 2016-02-27T19:04:18.242Z
author: "Chris Esplin"
title: "Firebase Data Structures&#58; Pagination"
subtitle: "I’ve been using Firebase exclusively for the last two years. Yeah yeah, I’ve got an elasticsearch cluster, and Redis caches some of my data, but Firebase is my one source of truth."
tags:
  - javascript
  - firebase
  - front-end-development
keywords:
  - javascript
  - firebase
  - front-end-development
draft: true
---

I made a bunch of mistakes early on in my Firebase-writing career, most of which were the consequence of bad data structures. As I’ve learned NoSQL principles and the limitations of Firebase, I’ve realized that I don’t need relational data any longer. I don’t really need Redis either. And [firebase-queue](https://github.com/firebase/firebase-queue) has made REST endpoints almost unnecessary!

**UPDATE 6/30/2016: **I’ve published my free class, [Firebase 3.0 for Web](https://t.co/3eNdfsMtfu). Check it out.

**UPDATE 8/1/2016: **I’ve rolled both of these methods of pagination into a single Node.js/browser module called **FirebasePaginator**. It’s on [GitHub](https://github.com/deltaepsilon/firebase-paginator), available via NPM and Bower, and I’ve recorded a quick [YouTube screencast](https://youtu.be/CH9ptm4NeTw) to walk you through it.

### Firebase Data Structures: Introduction

This is **Part 1** of a Medium series on Firebase data structures. I have no idea how many parts I’ll write. There’s a lot to cover.

Why cover Firebase data structures? Because most devs, including me, come from a SQL background, where we think of data in terms of tables. This thinking does not translate to a NoSQL solution like Firebase, and it leads to a some common questions.

* How do I paginate?

* How do I manage complex data structures?

* Why are my queries slow?

* What are these security rules?

* Isn’t all of this easier with SQL???

**The Bad News**

* Your SQL background isn’t going to help you here.

* Seriously. Forget everything you learned about SQL.

**The Good News**

* The aforementioned questions are all solved problems.

* You won’t need anything except for Firebase when I’m done with you.

* You might be ready to leave SQL behind forever.

* I love answering questions, so ask me anything at on Twitter at [Chris Esplin](https://twitter.com/ChrisEsplin), comment on this post, or join the new [Firebase Slack Channel](https://firebase-community.appspot.com/)!

Ok, let’s start with pagination.

### Firebase queries require efficiency

SQL lets you run all sorts of horribly inefficient queries. You can bring your DB to a standstill with a couple of lousy joins.

Firebase is realtime, scales like crazy, and can’t afford to let you make those kinds of mistakes. That’s why Firebase queries are so limited. At first it appears to be a curse, but trust me. Please trust me. It’s a blessing in disguise.

If you’re unfamiliar with Firebase queries, read up here:

[https://www.firebase.com/docs/web/api/query/](https://www.firebase.com/docs/web/api/query/)

### **Pagination**

Those crazy alphanumeric keys created by ref.push() are known as “push keys”. Push keys sort alphanumerically by time. They’re sortable like timestamps. They probably would be timestamps, except that timestamps can collide, so ref.push() creates unique keys that sort like timestamps.

Anyway.

I’ve created a list of ten names with two sort keys to make the sort order obvious. You can use the following two links to pull the shallow keys and the entire data set:

Shallow keys: [https://demos-firebase.firebaseio.com/dataDemo/names.json?shallow=true](https://demos-firebase.firebaseio.com/dataDemo/names.json?shallow=true)

Data: [https://demos-firebase.firebaseio.com/dataDemo/names.json](https://demos-firebase.firebaseio.com/dataDemo/names.json)


Notice that the names-shallow.json file does not have sorted keys. This is critical! Regular key-value JSON is never sorted by key. It can’t be. Only arrays have an order to them. But this is not a big deal, because we know how to use [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

The following code uses a library called [Axios](https://github.com/mzabriskie/axios) to make an HTTP request for the shallow keys list. I wrote this for Node.js, but Axios and Firebase run identically in the browser.

This script loops through the sorted keys list, does a little paginating, requests each page of data individually and spits them out at the end.


### Notes

* namesRef.toString() spits out “[https://demos-firebase.firebaseio.com/dataDemo/names](https://demos-firebase.firebaseio.com/dataDemo/names)”

* [Promise.al](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)l is awesome. Use it to wait for an array of promises to resolve.

**Firebase Queries Explained**

All Firebase queries start with a ref such as
> var namesRef = new Firebase([https://demos-firebase.firebaseio.com/dataDemo/names](https://demos-firebase.firebaseio.com/dataDemo/names.json));

You then modify the ref using [query methods](https://www.firebase.com/docs/web/api/query/).

The first query method that you need, always, is an orderBy.

* orderByChild(‘some-child-name’): Orders alphanumerically by any child key

* orderByKey(): Orders by the key, usually the fancy “push” keys that I referenced earlier

* orderByValue(): Only relevant if your nodes don’t have children. If your list is not nested, with only one value, not sub-nodes, you might need orderByValue()

* orderByPriority(): Don’t use this. In fact, don’t use any of the old $priority stuff. Firebase still supports it, but orderByChild() has made it irrelevant.

Next, you need to decide how many records you want and which direction you want to order.

* limitToFirst(N): Starts with the oldest record and reads toward newer records

* limitToLast(N): Returns N results from the newest records on the list, but returns them in ascending order, because **Firebase only sorts in ascending order**. So if I have records 1...10 and I run a limitToLast(3), I’d get records 8, 9 and 10 in that order.

Finally, decide which key you’d like to start or end at.

* startAt(&lt;someKey&gt;): The key at which to start reading

* endAt(&lt;someKey&gt;): The key at which to stop reading

In the example above, I’m looping through 10 keys and pulling the 0th, 3rd, 5th, 7th and 9th keys. For each key I’m calling namesRef.orderByKey().limitToFirst(2).startAt(key).

So the starting at the 0th key returns the 0th and 1st result. Starting at the 3rd key return the 3rd and 4th results… and so on.

**Another Method of Pagination**

I’ve also had success by pulling the first 3 results, saving the 3rd result as the next key and displaying only the 1st and 2nd results to my user. This method is nice if you have a massive data set and pulling the keys via the REST endpoint is too heavy of an operation.

### The next installment…

Read more on [complex data structures](https://medium.com/@ChrisEsplin/firebase-data-structures-complex-data-eb76b5a31124#.mspt07nvr) and [security rules](https://medium.com/@ChrisEsplin/firebase-data-structures-security-rules-72fd4ad91f0d#.iy6r58c44).

And hit me up in the comments, on [Twitter](http://twitter.com/chrisesplin), on the new [Firebase Slack Channel](https://firebase-community.appspot.com/)… however you can find me. I love to talk Firebase.