---
id: 105
title: 'Shuffle a string in VB.Net'
date: '2010-10-21T14:30:09+00:00'
author: Satal

guid: 'http://satalketo.com/2010/10/shuffle-a-string-in-vbnet/'
permalink: /shuffle-a-string-in-vbnet/
rank_math_description:
    - 'A method of for how to shuffle the contents of a string'
rank_math_focus_keyword:
    - shuffle
rank_math_facebook_description:
    - 'A method of for how to shuffle the contents of a string'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '138'
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