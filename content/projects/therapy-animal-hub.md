---
layout: project
projectKey: THERAPY_ANIMAL_HUB
title: Therapy Animal Hub
---

### Project Summary

Emotional Support Animals are a United States phenomenon. In short, you can talk to your licensed physician or therapist and get a letter saying that you need your pet for emotional support. This letter can be taken to an apartment complex and the apartment complex must respect it and cannot charge you extra for having your pet in the apartment. The requirements for an ESA are much lower than that of a fully-fledged service animal. For instance, if you purchase and train a seeing eye dog, that dog can be certified as a service animal and you can take your seeing eye dog with you practically anywhere. An emotional support animal must clear a much lower bar.

A variety of telehealth-style services exist to connect patients and counselors. Therapy Animal Hub is quite similar, except that it includes an affiliate marketing program that most anyone can join. By using affiliate partnerships, we're able to service a much larger market. Other services use a combination of SEO and pay-for-clicks advertisement.

### Technology

TherapyAnimalHub.com is built on Next.js and deployed to Vercel. It uses React Server Components and a Firebase backend.

The trickiest parts of this application are Stripe-related. It's effectively a two-side marketplace, with the addition of affiliate partnerships. So I used Stripe Express Connect accounts for both the affiliates and the service providers. The providers get paid daily as they service new clients. The affiliates get paid monthly based on tracked promotion codes.

The application started as a simple intake form and then grew dramatically as we discovered new business requirements. I'd love to rewrite it from scratch, but it likely won't be worth rewriting for a few more years. I've worked out the bugs and it's handling enough volume that I expect we could 10x in throughput without many hiccups.