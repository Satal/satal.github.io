---
id: 104
title: 'How to find out current class/method name'
date: '2010-10-13T08:41:08+00:00'
author: Satal

guid: 'http://satalketo.com/2010/10/how-to-find-out-current-classmethod-name/'
permalink: /how-to-find-out-current-classmethod-name/
rank_math_description:
    - 'A VB.NET method to identify the current class or method and to retrieve the name for this'
rank_math_facebook_description:
    - 'A VB.NET method to identify the current class or method and to retrieve the name for this'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '139'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

In this short code example I’m going to show you a method to identify what class (including the namespace) you’re currently in and what the name of the current method is. You can also use this technique to find out more information about the method but I won’t go into that detail here.

```vbnet
System.Reflection.MethodBase.GetCurrentMethod().ReflectedType.FullName 'Get Current Class Name and Namespace
System.Reflection.MethodBase.GetCurrentMethod().Name 'Get Current Method Name
```