---
title: 'Compare versions of application'
date: '2010-07-25T13:13:37+00:00'
author: Satal

redirect_from:
    - /blog/2010/07/25/compare-versions/
    - /2010/07/25/compare-versions/
permalink: /compare-versions/
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

It is common for you to want to check whether your application is the latest version of the application. It is possible to compare the version of your application against a version number that you have as a string

You can achieve this by doing something like;

```vbnet
Dim curVer As Version = My.Application.Info.Version
Dim availVer As Version = New Version("1.0.0.2")
If availVer > curVer Then
    'The available version is newer
Else
    'You either have the latest version or a future version.
End If
```