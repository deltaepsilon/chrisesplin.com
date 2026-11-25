---
layout: project
projectKey: WILEY
title: Wiley
---

### Project Summary

[Wiley](https://www.wileyphone.com/) makes WiFi home phones for kids and families. Parents decide who the phone can call and who can call it, and the phone gets a real local number.

I built the parent web app. Parents sign up, pick a phone number, and manage approved contacts, call blocking, spam blocking, quiet hours, call forwarding, voicemail, speed dial and Enhanced 911 addresses. The app also handles subscriptions and billing.

### Technology

The app is Next.js and React on Firebase App Hosting, with Firestore and Cloud Functions behind it.

Most of the work is telephony integration. Phone numbers and E911 records come from Bandwidth. Calling features map onto NetSapiens answering rules, timeframes and phonebooks. The Grandstream handsets pick up speed dial and line settings through zero-touch provisioning. Customer support runs through a knowledge base and an AI assistant built on Gemini.
