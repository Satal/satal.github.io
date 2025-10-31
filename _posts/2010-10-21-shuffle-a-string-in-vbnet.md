---
title: 'Shuffle a string in VB.Net'
date: '2010-10-21T14:30:09+00:00'
author: Satal

redirect_from:
    - /blog/2010/10/21/shuffle-a-string-in-vbnet/
    - /2010/10/21/shuffle-a-string-in-vbnet/
permalink: /shuffle-a-string-in-vbnet/
rank_math_focus_keyword:
    - shuffle
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - String
    - VB.NET
---

In this tutorial/code example I’m going to show you a method to shuffle the contents of a string. You might use this for something like an anagram game.

```vbnet
Private ran As New Random

Private Function randomizeString(ByVal input As String) As String
Dim rtn As String = ""
Dim i As Integer

While input.Length > 0
    i = ran.Next(0, input.Length)
    rtn &= input.Substring(i, 1)
    input = input.Remove(i, 1)
End While

Return rtn
End Function
```