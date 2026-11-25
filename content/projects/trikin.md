---
layout: project
projectKey: TRIKIN
title: Trikin
---

### Project Summary

[Trikin Capital](https://www.trikin.co/) buys residential leasing commission receivables from real estate brokerages and their agents, so agents get paid without waiting months for property managers to pay out.

I built the platform end to end: agent applications, underwriting, e-signature of the purchase agreements, broker and admin dashboards, payouts, bank statement reconciliation and accounting exports.

### Technology

Trikin runs Next.js on Cloudflare Workers through OpenNext, with Cloudflare D1 as the database, Drizzle as the ORM and Auth.js for sign-in.

The hard parts are the money and the paperwork. Purchase amounts and fees are stored in integer cents, signed agreements are rendered once and content-addressed so they can be reproduced exactly later, and the rules from the legal agreements are enforced as database constraints so a bad write fails instead of landing.
