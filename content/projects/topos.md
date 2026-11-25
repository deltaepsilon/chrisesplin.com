---
layout: project
projectKey: TOPOS
title: Topos
---

### Project Summary

Topos reads Schedule K-1 tax forms so accountants and attorneys don't have to key them in by hand.

A family office or fund can receive hundreds of K-1s a year, each from a different partnership with its own layout, footnotes and attached statements. Topos ingests the PDFs, extracts every box, and flags anything it isn't sure about for a person to check against the original page. Verified data rolls up into an ownership graph, a data table and Excel exports, and an analyst chat answers questions over the verified numbers.

### Technology

Topos is a Turborepo monorepo with a Next.js front end on Firebase App Hosting. Firebase handles auth and file storage, and each tenant's tax data lives in its own Turso (libSQL) database so one client's records are physically separate from another's.

Extraction runs on Gemini through the Vercel AI SDK. Most of the work has gone into measuring accuracy: a labeled corpus, paired comparisons between prompt and model changes, and validation rules that cross-check the numbers a K-1 is supposed to agree on.
