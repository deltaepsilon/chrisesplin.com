---
layout: project
projectKey: QUIVER_PHOTOS
title: Quiver Photos
---

### Project Summary

Google Photos is great, but it's a black hole for your media.

My attempts to extract my media from Google Photos for archival backup purposes were stymied pretty quickly by Google's official "Google Takeout" backup process. It was painful. It was incomplete. I wanted to fix it.

I set out to fix it as best I could. The fix was not fully satisfactory, because the Google Photos API is lacking. But I gave it my all and learned a lot of new technologies along the way.

### Technology

Getting the data out of Google Photos was a pain, but I figured out a way to do it with recursively-called Firebase Cloud Functions. The function will page through the results and write them to the Firebase Realtime Database for future use.

The hard part was shipping a desktop daemon.

There's no way to write EXIF data to images and video from a browser. I use WebSockets to stream the Google Photos Media Items to a Node.js process running on the client computer. The Node.js process stores the data in a LevelDB instance on the host machine and starts downloading files.

Each file gets marked with some custom EXIF data so that it can be related back to the original Media Item from Google Photos. This prevents duplicate downloads and enables download restarts.

This project ran into a raft of nasty third-party limitations that I only partially overcame. The product works, but not in the perfect way that I'd envisioned. It can't recover lat/long EXIF fields because Google Photos won't return them via that API. It also can't reconsitute Apple's Motion Photos correctly, because, again, the Google Photos API won't return a motion photo. Video isn't full quality either due to the Google Photos API.

And of course Google has little interest in supporting small projects like this one, so they won't verify my auth implementation. THANKS GOOGLE.

On the plus side, I can now recover all of my photos with EXIF data!