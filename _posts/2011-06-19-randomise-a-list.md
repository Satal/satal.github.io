---
id: 108
title: 'Randomise a List'
date: '2011-06-19T19:51:50+00:00'
author: Satal

guid: 'http://satalketo.com/2011/06/randomise-a-list/'
redirect_from:
    - /blog/2011/06/19/randomise-a-list/
    - /2011/06/19/randomise-a-list/
permalink: /randomise-a-list/
rank_math_description:
    - 'A quick explanation of how to randomise the contents of a List using LINQ'
rank_math_focus_keyword:
    - Randomise
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '135'
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