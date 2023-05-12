---
layout:  medium
slug: collection-queries-with-firebase
date: 2016-10-26T17:09:53.767Z
author: "Chris Esplin"
title: "Collection Queries with Firebase"
subtitle: "Stop querying your entire Firebase collection!"
tags:
  - javascript
  - firebase
  - nosql
  - google-cloud-platform
keywords:
  - javascript
  - firebase
  - nosql
  - google-cloud-platform
draft: true
---

### Prerequisites

Make sure you know how to connect to Firebase and run basic read/write operations before continuing. [This earlier How to Firebase article](https://medium.com/how-to-firebase/save-and-query-firebase-data-ed73fb8c6e3a#.3kom9r5ju) will catch you up.


## Firebase queries

Firebase queries are modifications of a ref. So you’ll create a ref as usual, but then you’ll add some query parameters to it. Once you add query parameters to a ref, you can’t take them off or change them… you’d need to create a new ref for that. This is important, because some query parameters are incompatible with one another, and a ref won’t let you add incompatible query parameters. So don’t shy away from creating and recreating refs over and over again to change queries.

### Pro Tip

Query orders are **NOT** respected by the *ref.on(‘value’, callback)* event. *value* events return objects as JSON, and JSON does not have ordered children. I know… obnoxious. But that’s JSON for you. If you care to receive your data from Firebase in the specified order, make sure to use *ref.on(‘child_added’, callback)*, because it will be called once for each existing child, and it will be called in order. So aggregated your children into an array manually, and you’ll have ordered children!

### Specify how you want to order your query

An *orderBy** parameter is required for any query. You can’t apply a query range, i.e., *startAt(…)*, or a query limit, i.e., *limitToLast(…)*, without first specifying how you want to order your query. So apply *orderBy** **first**!

You have four options for ordering queries:

* orderByKey

* orderByChild

* orderByPriority

* orderByValue

The most common ordering method is *ref.orderByKey()*. It orders the ref’s children by their keys, usually push keys — which order by time.

The second most common way to order is *ref.orderByChild(‘someChildName’)*. You’ll need to add a security rule like “*.indexOn”: [“someChildNodeName”]* for performance reasons if you want to order by a child attribute.

The less common methods are *ref.orderByPriority()* and *ref.orderByValue()*. Priorities aren’t quite deprecated yet, but they should be, because *ref.orderByChild* makes priority ordering unnecessary. Ordering by value is only relevant if your children are just values and not objects. So if your data structure were something like…

```
“animals”: {
 “lkjdfa”: “chinchilla”,
 “asdfkl”: “aardvark”,
 “iouqer”: “gorilla” 
}
```


The most common use cases would be as follows:

```
// Order users by key, which also orders them by creation timestamp
usersRef.orderByKey().on(‘child_added’, callback);

// Order users by email. Make sure to include the security rule …
// users: {“.indexOn”: [“email”]} …
usersRef.orderByChild(‘email’).equalTo(‘user-i-need-to-find@gmail.com’).once(‘value’).then(…)
```


### Specify query ranges

Query ranges are optional and specify start and end points for your query. You’ve got three options:

* startAt

* endAt

* equalTo

Use *ref.startAt(‘someKey’)* with a *limitToFirst* statement to read from the top of a list (ascending order) and to start somewhere in the middle of the list. Omitting the *startAt* while using a *limitToFirst* would cause the query to read from the very top of the list.

Use *ref.endAt(‘someKey’)* with a *limitToLast* statement to read from the bottom of a list (descending order) and to start somewhere in the middle of the list. Omitting the *endAt* while using a *limitToLast* would cause the query to read from the very bottom of the list.

Using *ref.equalTo(‘someKey’)* is effectively using a *startAt* and an *endAt* query combined. You’re not allowed to use more than one of these query range statements on a single ref, so Firebase provides the *equalTo* range to let you specify both.

Note that using *startAt* with *limitToLast* or *endAt* with *limitToFirst* produces unexpected behavior. You’ll see why in a few paragraphs… it’s harder to explain with words than with an example.

So let’s assume that we have an object with zero-indexed keys, much like a Javascript array. Numeric keys are a Firebase anti-pattern. Notice that we don’t have a key “10”, because keys are always alpha-sorted and “10” would sort like this: “0”, “1”, “10”, “2”, “3”…

Again, numeric keys are a Firebase anti-pattern. We should be using push keys… but push keys make for horrible demos, because humans don’t sort long alphanumeric keys in our heads.

```
“fruit”: {
 “1”: “banana”,
 “2”: “pear”,
 “3”: “orange”,
 “4”: “tomato”,
 “5”: “mango”,
 “6”: “pineapple”,
 “7”: “strawberry”,
 “8”: “grapefruit”,
 “9”: “cranberry”
 “10”: “tangerine”
}
```


Let’s assume a *fruitRef* that points to the “fruit” node. “If we call *fruitRef.orderByKey().endAt(“5”)*, we’ll receive keys 1…5. If we call *fruitRef.orderByKey().startAt(“5”)*, we’ll receive keys 5…10. It’s pretty straightforward. If we run *fruitRef.orderByKey().equalTo(“5”)*… well, you get the pattern… it returns key *“5": “mango”*.

### Limit results

Query orders and ranges are useful on their own, but they hit their stride when combined with limit statements. You’ll want to use limits for most of your queries to avoid pulling down any more data than necessary.

You’ve got two options for limits:

* limitToLast

* limitToFirst

Let’s refer back to the fruit “array” we used earlier and run through a few scenarios.

1. *fruitRef.orderByKey().limitToLast(3)*: returns keys 8, 9, 10

1. *fruitRef.orderByKey().limitToFirst(3)*: returns keys 1, 2, 3

1. *fruitRef.orderByKey().startAt(“5”).limitToLast(3)*: returns keys 8, 9, 10

1. *fruitRef.orderByKey().startAt(“5”).limitToLast(10)*: returns keys 5, 6, 7, 8, 9, 10 **(bookend query)**

1. *fruitRef.orderByKey().startAt(“5”).limitToFirst(3)*: returns keys 5, 6, 7

1. *fruitRef.orderByKey().endAt(“5”).limitToLast(3)*: returns keys 3, 4, 5

1. *fruitRef.orderByKey().endAt(“5”).limitToFirst(3)*: returns keys 1, 2, 3

1. *fruitRef.orderByKey().endAt(“5”).limitToFirst(10)*: returns keys 1, 2, 3, 4, 5 **(bookend query)**

Scenarios 3 and 4 require a little explanation. They both have *startAt* ranges starting at “5” and going to the end of the list. The *limitToLast* statements still read from the end of the list, so the *startAt* range acts like a **bookend** to the query. Think of *startAt* and *endAt* as ranges, less as starting and ending points. Notice that scenarios 7 and 8 are the inverse of 3 and 4.

**A note on orderBy* methods**
We’re ordering by key in this example, but ordering by child, value or priority works the same. Firebase will first try to sort the keys/children/priorities/values numerically, and then it will sort them as strings… so if you have a mix of numbers and strings, the numbers will sort to the top and the strings to the bottom.

You’ll typically avoid this confusion by remembering that sorting on a mix of numbers and strings is ridiculous.

### The REST API

All of the queries described above are also available as raw JSON via Firebase’s REST API. The [REST API docs](https://firebase.google.com/docs/database/rest/start) cover it all. Just know that if you can query it with the JavaScript SDK, you can query it with REST.

But the REST API does provide one extra feature that you’ll need: [shallow queries](https://firebase.google.com/docs/database/rest/retrieve-data#shallow).

Shallow queries are available *only* via REST, and they’re crucial for handling large datasets. Shallow queries let you query just the child keys from a particular node. Try hitting [https://docs-examples.firebaseio.com/rest/retrieving-data.json](https://docs-examples.firebaseio.com/rest/retrieving-data.json](https://docs-examples.firebaseio.com/rest/retrieving-data.json)) in your browser. You should see something like this:

```
{
 body: “Hello!”,
 message: {
  user: {
   name: “Chris”
  }
 }
}
```


Now hit the same url but with *shallow=true* as a query paramter, [https://docs-examples.firebaseio.com/rest/retrieving-data.json?shallow=true.](https://docs-examples.firebaseio.com/rest/retrieving-data.json?shallow=true](https://docs-examples.firebaseio.com/rest/retrieving-data.json?shallow=true).)

```
{
 body: true,
 message: true
}
```


See how you get just the top-level keys? This is the only way to query Firebase data that does *not* return entire objects. If your data is huge, use shallow REST queries to sort through large lists and decide exactly what data you need to query normally through the SDK.

### Pagination Exercise

Firebase does not have built in pagination. Firebase collections are meant to be consumed as streams of data, so imagine running a query like *fruitRef.orderByKey().limitToLast(3).on(‘child_added’, callback)*. Your callback will get called three times, once for each of the last three results. But imagine a scenario where users are adding more fruit in realtime… so pretty soon your callback will fire again for “*11”: “artichoke”* or whatever else your users are adding. If you’re listening to the *child_removed* event on the same query, you’ll get a callback there as well because *“8”: “grapefruit”* has just fallen off of the query.

The point is that you need to be thinking of streams and events instead of thinking of static pagination. Your apps are realtime. Firebase is realtime. We need to reason about pagination as moving up and down a flowing stream of data.

To test this out, let’s run the following code to load a bunch of data from the Star Wars API (SWAPI). You’ll need to run *npm install axios firebase* in a new folder to get the dependencies. You’ll also need to change the *firebase.initializeApp(payload)* payload to match the location of your *service-account.json* file and the *databaseURL* of your Firebase.


Now check your Firebase Realtime Database viewer at */swapi/people* to make sure that you have 10 Star Wars characters stored in the collection. They’re currently indexed by their SWAPI person number. I would typically recommend using push keys with *peopleRef.push(res.person)*, but SWAPI has person ID numbers already, so matching those won’t hurt. Just don’t try to create your own ID system… when in doubt, use push keys.

We’re going to demonstrate two ways to paginate through this list, each with its own costs and benefits.

### Cursor pagination

Cursor pagination scales forever, but you have to step forwards or backwards through the pages one at a time. You don’t know how many total pages you have, and you can’t skip pages.

In this example we have 10 records indexed 1…10 and a page length of 2 records per page. You simply request 3 records, pop the third record off to use as a cursor, and add the first 2 records to the page.

The following example recursively gets all of the pages and spits out an array of pages. Try running this code on your own machine to see it in action. Make sure to edit the path to your *service-account.json* if it’s different, and definitely change your *databaseURL* to match your Firebase. Also make sure that you’ve run *load-swapi-data.js* to populate your *swapi/people* node.


### Keys-based pagination

Keys-based pagination differs from cursor pagination in that you first request all of the child keys using a REST call and then create page breaks from the list of keys. It’s great when you have a limited number of child records, because you know exactly how many pages you have and you can jump backwards and forwards through the pagination.

The following example uses keys-based pagination to return an array of all of the pages. Note, this is just an example. You’d never request all of the data right off the bat like this. In regular, non-demo practice you’ll create a list of page keys and only request the data as needed when your user jumps to a specific page.

Try running this locally like you did for the cursor pagination code to see it in action.


### A quick summary, because this can be confusing

Let’s be clear. These queries can be tricky to compose. I played around for about an hour to get both of these pagination examples working, and it wasn’t the first time that I’ve written these kinds of pagination.

Here’s what you need to remember:

* Always specify your *orderBy** parameter first

* Use *limitToFirst* to read from the top of the list (ascending sort order)

* Use *limitToLast* to read from the bottom of the list (descending sort order)

* If you’re using *limitToFirst*, use *startAt* to start reading from the middle of the list. Otherwise, *limitToFirst* will default to reading from the very top of the list.

* If you’re using *limitToLast*, use *endAt* to start reading from the middle of the list. Otherwise, *limitToLast* will default to reading from the very bottom of the list.

* Don’t pair up *limitToFirst* with *endAt*. It just “bookends” the query.

* Don’t pair up *limitToLast* with *startAt*. It just “bookends” the query.

That’s Firebase queries! Play around with these pagination examples and you’ll get the hang of it.

## Quiz

Review *value* and *child_added* events in [the docs](https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data) and answer the following questions.

* Which event is best for returning a single item?

* Which event is best for returning lists of items?

* Can the *value *event be used to retrieve a shallow copy of a node?

* Which event consistently returns sorted data?

Create a demo folder and wire up a Node.js file to read data from your Firebase. Complete the following tasks in Node.js.

* Create a list of items using push keys that looks something like this (but with your own push keys… they’re unique):

```
{
 -KIhlFRg9KB7eDjVVGYr: 1,
 -KIhlFRle3WO2N0xcX20: 2,
 -KIhlFRnXobs-JZXqn1c: 3,
 -KIhlFRnXobs-JZXqn1d: 4,
 -KIhlFRnXobs-JZXqn1e: 5,
 -KIhlFRnXobs-JZXqn1f: 6,
 -KIhlFRnXobs-JZXqn1g: 7,
 -KIhlFRnXobs-JZXqn1h: 8,
 -KIhlFRnXobs-JZXqn1i: 9,
 -KIhlFRnXobs-JZXqn1j: 10
}
```


* Create a series of queries and use the *child_added* listener to return the following record sets. Use *ref.orderByValue()* as necessary.
- 1, 2, 3, 4
- 4, 5, 6, 7
- The last four records ending in record 9 (records 6, 7, 8, 9)
- The first four records starting with record 2 (records 2, 3, 4, 5)

* Add a security rule (*“.indexOn”: [“.value”]*) to your list node to get rid of the *FIREBASE WARNING* messages you’re likely seeing.

* Stretch Task: Implement pagination with the REST and cursor methods, but instead of querying all of the pages at once as seen in the earlier examples, try querying one page at a time. Maybe the REST pagination function can take a specific page number and return just those results, and the cursor method can read out the first three pages and stop.