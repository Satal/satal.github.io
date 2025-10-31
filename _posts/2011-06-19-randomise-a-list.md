---
title: 'Randomise a List'
date: '2011-06-19T19:51:50+00:00'
author: Satal

redirect_from:
    - /blog/2011/06/19/randomise-a-list/
    - /2011/06/19/randomise-a-list/
permalink: /randomise-a-list/
rank_math_focus_keyword:
    - Randomise
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - 'C#'
    - Programming
---

This is one of the reasons why I love LINQ, its so easy to do something like randomise a list in just one line that used to take a few lines.

The only thing you need to remember with this code is that you need to have specified that you’re using System.Linq in order for it to work.

```csharp
List myCollection = new List();

myCollection = myCollection.OrderBy(a => Guid.NewGuid()).ToList()
```