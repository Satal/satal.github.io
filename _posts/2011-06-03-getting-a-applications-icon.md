---
title: 'Getting an applications Icon'
date: '2011-06-03T13:06:10+00:00'
author: Satal

redirect_from:
    - /blog/2011/06/03/getting-a-applications-icon/
    - /2011/06/03/getting-a-applications-icon/
permalink: /getting-a-applications-icon/
rank_math_focus_keyword:
    - icon
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - Programming
    - VB.NET
---

This is one of those pieces of code that you spend ages trying to find/figure out but once you do get it, it is annoyingly simple. I recently needed to get the Icon that was being used as the application so that it could be used within the application consistently, this is the code that I used in order to achieve this.

```vbnet
Icon.ExtractAssociatedIcon(Application.ExecutablePath)
```