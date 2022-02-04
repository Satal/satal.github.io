---
id: 90
title: 'Check whether the application is currently being debugged'
date: '2010-08-17T10:48:14+00:00'
author: Satal

guid: 'http://satalketo.com/2010/08/check-whether-the-application-is-currently-being-debugged/'
permalink: /blog/2010/08/17/check-whether-the-application-is-currently-being-debugged/
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '152'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

If you want to know whether the application is currently being debugged you can use the following code;

```
<pre class="brush: vbnet; gutter: true">Public Shared ReadOnly Property DebugMode() As Boolean
    Get
        Dim rtn As Boolean = False

#If DEBUG Then
         rtn = True
#End If
        Return rtn
    End Get
End Property
```

The part of code in the if statement will only be executed if the application is currently being debugged, therefore the return value will be left as false.