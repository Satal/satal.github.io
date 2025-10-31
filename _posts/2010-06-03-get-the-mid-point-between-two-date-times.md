---
title: 'Get the mid point between two date times'
date: '2010-06-03T11:51:32+00:00'
author: Satal
redirect_from:
    - /blog/2010/06/03/get-the-mid-point-between-two-date-times/
    - /2010/06/03/get-the-mid-point-between-two-date-times/
permalink: /get-the-mid-point-between-two-date-times/
categories:
    - All
    - Computer
    - Programming
tags:
    - VB.NET
---

I have been asked how to do this a couple times now, so I thought I would post a function that deals with getting the mid point between two date times.

```vbnet
Public Function getMidDateTime(ByVal dt1 As DateTime, ByVal dt2 As DateTime) As DateTime
    Dim rtn As DateTime
    Dim diff As Integer
    diff = DateDiff(DateInterval.Second, dt1, dt2)
    rtn = DateAdd(DateInterval.Second, diff / 2, dt1)
    Return rtn
End Function
```

Obviously there are many ways to skin a cat, but this is the method that I’ve used.