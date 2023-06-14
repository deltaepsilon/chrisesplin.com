---
layout:  article
slug: why-you-suck-at-programming
date: 2023-06-14T00:00:00.000Z
author: "Chris Esplin"
title: "Why you suck at programming"
subtitle: "You could be much, much better at your job."
tags:
  - career
  - engineering
keywords:
  - career
  - engineering
draft: false
---

Bad news: Half of all programmers are below-average, and there's a 50% chance that you kinda suck at this.

Good news: Your worst mistakes are easy to fix!

## You believe what others tell you

Stop taking advice!

You may be truly stupid. Let's not discount that possibility.

But odds are, you're actually a unique individual traveling a unique path.

I can give you advice on how to live my life, but you're living **your** life... not mine. So maybe 20% of what I have to say can possibly be relevant to you at any one point in time.

## You're missing context for decisions

The reason you keep making dumb decisions is because you don't understand the world around you.

Long-term, humans are successful to the degree that our mental models match reality. If you can run simulations accurately in your head, you'll be able to make accurate predictions. And simulations are only as good as the data that underlies them.

Talk to a lot of people. Grow your network. Read and learn voraciously. Follow experts and try to learn from their mistakes.

## You fall for marketing

We want to be led to the correct answer. 

Yes, Astro or Next or Nuxt or whatever are all awesome technologies. But they're awesome for certain use cases. And their landing pages are built to convince you to use them, not to tell you when NOT to use them.

I used to consult for companies who wanted to use Firebase.

I love Firebase with my whole heart, but it's not good for everything. So these companies would hire me, tell me their requirements, and I'd tell them to NOT use Firebase. Firebase is absolutely perfect... unless you need flexible data reporting or happen to have very structured, **relational** data... in which case, a relational database is a much better decision!

## You don't know what the tried-and-true approach is

Early-career developers are on the hunt for new technologies.

They see hot new frameworks and jump in headfirst.

This is stupid. Really, really stupid.

Find out what technologies the old guys are using, and learn those first. It doesn't need to be outdated, but it should never be experimental or "bleeding edge". Get extremely good with the best-supported, slightly boring technologies before becoming an early-adopter. You will save yourself immense pain.

I was an early-adopter of CoffeeScript, a predecessor of TypeScript. It was so cool. I was a new dev and CoffeeScript looked like the future. So I learned CoffeeScript, wrote a bunch of code, and had to throw it all away a few years later when I realized that CoffeeScript was failing. 

Technology is inherently experimental. The best systems rise to the top and stick around, but the vast, vast majority of tech projects fail.

## You focus on the short term

I had never worked on an aging codebase when I adopted CoffeeScript. I didn't know what it felt like to come back to a project two years later and have to make edits because Chrome dropped a feature or GCP was deprecating a Node.js version.

It's almost impossible to think long-term until you've lived long-term. You'll have to trust me on this one.

Successful projects have long lifespans. Code rots. Dependencies are deprecated. 

Focus on fewer, more stable dependencies. The fewer the dependencies, the fewer upgrades you'll have to do. You'll have a bit more work to do today, but your project can run for years without touching it. I did the last big rewrite of Calligraphy.org in 2018 and it's still going strong. I make edits about once a year, usually to upgrade Node or fix some new browser bug... but the code is simple enough that I just run `yarn install && yarn dev` and I'm back where I started.

## You think that others care about you

Nobody care about you.

At all.

I am very serious and need to get this across clearly.

Think about the most embarrassing thing that your best friend has ever done. Now try to think of the most embarrassing thing that an acquaintance has done. 

We almost immediately forget about others' mistakes unless they're truly egregious or affect us in a personal way. So get up in front of a crowd and give a talk. Make presentations about technologies you barely understand. It's cool. Nobody cares. Do it with a smile on your face, don't take yourself too seriously, and everyone will be rooting for you. And if you screw up... they'll forget within a day or two.

## You can't put yourself 5 years into the future

Our culture does a terrible job of teaching long-term thinking.

Remember: you vastly **overestimate** how much you can accomplish in a year, and you vastly **underestimate** how much you can accomplish in five years.

You can become an entirely different person in five years. You can build a whole career, become an expert in something new, publish a book, launch a company... the possibilities are incredible.

But you can't do much of anything in a single year. You can start down lots of different paths, but you're unlikely to achieve success at anything within just a year.

Anything worth doing is going to take more than a year to master. Most things take 3-5 years. That's just how life is.

Actually, 5 years is medium-term. 15 years is long-term. But we've got to start somewhere.

Make 1-, 5-, 10-, and 15-year goals, then make them reality.

## You can't pick winners, but you can be early to technologies that have already won

Picking winners in tech is like picking winners in the stock market. 

You can't do it.

Some people can, but you can't, so get over it.

You can, however, pick technologies that have already won!

Look for projects with tough competitors. You know that the problem space is important because there's plenty of competition, but you're not sure who the winner is yet. 

For example, jQuery won front-end web dev for about five years, but almost immediately you saw MooTools, Prototype.js, Backbone, and Knockout all launch and start fighting for market share. It was an ugly fight for a long time, and nobody gained supremacy. You could have stuck with jQuery and been fine.

But then Angular started to pull ahead and it was Angular vs Ember for quite a while. But Angular had made some mistakes and Google started on a v2 rewrite from scratch. In the meantime, React launched and started to gain a ton of market share. React rode a wave of hype for a while, but then it settled down and started to truly outpace the competition. React outlasted its own hype cycle. 

That's when I learned React. I was actually a bit late to the party, but React had won and I couldn't deny it anymore.

Don't be an early adopter, but don't wait too long to switch to the winning tech. You want to maximize the lifespan of your skills and the lifespan of your codebase, so be early-ish and learn to accept defeat when your tech choices start to fail. They don't often recover.