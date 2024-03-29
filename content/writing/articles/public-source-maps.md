---
layout:  article
slug: public-source-maps
date: 2023-05-12T00:00:00.000Z
author: "Chris Esplin"
title: "Source maps should be public"
subtitle: "Your front-end team needs source maps. Give them production source maps!"
tags:
  - highlight.io
  - marketing
keywords:
  - highlight.io
  - observability
  - source maps
draft: false
---

## Highlight.io

This article was originally written for the [highlight.io blog](https://www.highlight.io/).

I'm currently employed by Highlight as a software engineer working on the core product as well as docs and public-facing content.

## What are source maps?

Source maps are critical for web development in today's JavaScript environment.

All of our build tools—Rollup, Vite, WebPack, ESBuild—transpile and bundle our JavaScript and CSS.

Debugging errors in production with transpiled code is nigh impossible. So our tooling creates source maps.

See [What are source maps? by Jecelyn Yeen](https://web.dev/source-maps/) for all of the details.

# Why private source maps?

Private source maps make it harder for an attacker to understand your front-end application.

An attacker can easily use source maps to view the code in its original, un-transpiled state. The same source maps that make debugging easier make attacking your application easier.

Check out our unobfuscated source code on `https://www.highlight.io`!

![unobfuscated-source-code](https://github.com/highlight/highlight/assets/878947/84775c15-360a-4648-9cb3-987341ee309d)

## Why private source maps don't matter

Guess what!

Chrome Dev Tools makes deconstructing your JavaScript application relatively easy.

For instance, You can open up the Network tab and watch each request and response.

![network-tab](https://github.com/highlight/highlight/assets/878947/fbf16a8c-b3b4-45bb-9226-d815b0f9b281)

The Application tab surfaces the data your site is saving locally.

![application-tab](https://github.com/highlight/highlight/assets/878947/bfa9af40-be66-4774-9a73-bf19d2e04383)

Who cares how the code is written if the results, in both data and network, are readily visible?

Dev Tools will even allow an attacker to reformat the code and use breakpoints to step through it!

## ChatGPT as de-compiler

ChatGPT struggles with long code snippets, so it's not yet a silver bullet for decompilation.

![chat-gpt-fail](https://github.com/highlight/highlight/assets/878947/bfb4c9e7-1486-4e36-8624-8a3eb951b9a1)

But ChatGPT can de-compile shorter code snippets quite effectively.

![chat-gpt-success](https://github.com/highlight/highlight/assets/878947/ffb9b402-e90c-4501-879f-ab0196be5a01)

# Benefits of public source maps

## Debug with Dev Tools

Dev Tools will automatically recognize and apply public source maps to your code.

Debugging production issues will be much, much easier, especially if you see errors in your console. With public source maps, Dev Tools can link your errors directly to the de-compiled code. It's magical.

![dev-tools-debugger](https://github.com/highlight/highlight/assets/878947/804d1f89-8939-45e2-9b98-a1f6124ae823)

## Highlight automatically recognizes public source maps

Highlight does support private source maps. We even publish a [source map uploader](https://www.npmjs.com/package/@highlight-run/sourcemap-uploader) on NPM that will send your private source maps directly to our servers.

Our source map uploader works fine, but it's tricky for users to implement and is a constant source of bugs. Frankly, we struggle to create a universal solution that can't be broken by unique build pipelines.

However, if you make your source maps public, you don't have to do any of that work. And you automatically get production source maps for your own debugging in Dev Tools.

It's a win/win. 
