---
layout: project
projectKey: QUIVER_PHOTOS_V2
title: Quiver Photos V2
---

### Project Summary

I started Quiver Photos v1 back in January of 2022. It was an exceptionally challenging project, and I was never satisfied with the result.

The v1 app used a combination of web app and command line tool, known as the "desktop app", to load media item records from the Google Photos API and then download them using the API.

The Google Photos API stripped geo location EXIF metadata, and I misunderstood how to recover Apple Live Photos. So those two issues stuck in my craw. 

Even worse, the API throttled me at 10k calls a month. Once it started to get more popular, I'd get innundated by support emails from people who couldn't import their libraries. They'd have to wait until the API limits reset in a week or two.

The only solution would be to rewrite the entire thing as a desktop application that scrapes photos.google.com directly.

### Technology

For the desktop application, I chose PocketBase as the database solution and Wails for the desktop application itself. Wails is written in a combination of Golang and React. It runs on a tiny web client that's just enough to run React.

I had to learn Go for this project. Thankfully, GitHub CoPilot is incredible at Go. It was my pair programming buddy through the entire adventure. It made plenty of mistakes, but it reliably solved the easy problems and helped me work toward the hard solutions.

PocketBase is awesome. It's easy to use and had very few bugs. It's been developed to cover a huge range of use cases, so I never had to reach for any other data solutions.

The hardest part has been maintaining MacOS, Windows and Linux compatibility. All three platforms are working great in my own testing, but I still get support emails from folks who are having terrible issues. That leaves me asking questions to deduce what the issue might be, shipping a potential fix, and asking for feedback. It's a brutal loop, and I hope to be done with it soon.