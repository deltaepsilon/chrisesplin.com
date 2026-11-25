---
layout: project
projectKey: QUIVER_PHOTOS
title: Quiver Photos
---

### Project Summary

Google Photos is great, but it's a black hole for your media.

Google Takeout was painful and incomplete when I tried to use it to archive my own library, so I started Quiver Photos in January 2022 to fix it. The project has been through three major versions since.

#### v1: the Google Photos API

The first version paired a web app with a command-line "desktop app". It loaded media item records from the Google Photos API and downloaded them through the same API.

The API was the problem. It strips geo-location EXIF data, it won't return Apple Live Photos or full-quality video, and it throttled me at 10k calls a month. Once the app got popular, I was buried in support emails from people who had to wait a week or two for the limit to reset before they could finish importing. Google also wouldn't verify my auth implementation for a project this small.

#### v2: a desktop app

The only real fix was a desktop application that works from photos.google.com directly. I rewrote everything in 2024 with Wails (Go plus a small React client) and PocketBase as the local database.

#### v3

The current version is a Go desktop app with a terminal UI, alongside the web app and Firebase backend.

### Technology

v1 paged through the Google Photos API with recursively-called Firebase Cloud Functions and wrote the results to the Firebase Realtime Database. A browser can't write EXIF data, so the web app streamed media items over WebSockets to a Node.js process on the user's machine. That process stored them in LevelDB and tagged each downloaded file with custom EXIF data that tied it back to the original media item, which prevented duplicate downloads and let interrupted downloads resume.

From v2 on, the desktop app is Go. I had to learn Go for this project, and GitHub Copilot was my pair programmer the whole way. It made plenty of mistakes, but it reliably solved the easy problems and helped me work toward the hard ones. PocketBase has been easy to use and had very few bugs.

The hardest part is keeping macOS, Windows and Linux all working. Everything passes in my own testing, and I still get support emails from people with problems I can't reproduce, which means asking questions, shipping a likely fix and waiting for feedback.
