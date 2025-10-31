---
title: 'How to find out current class/method name'
date: '2010-10-13T08:41:08+00:00'
author: Satal

redirect_from:
    - /blog/2010/10/13/how-to-find-out-current-classmethod-name/
    - /2010/10/13/how-to-find-out-current-classmethod-name/
permalink: /how-to-find-out-current-classmethod-name/
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