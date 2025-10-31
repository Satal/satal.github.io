---
title: 'Check whether the application is currently being debugged'
date: '2010-08-17T10:48:14+00:00'
author: Satal

redirect_from:
    - /blog/2010/08/17/check-whether-the-application-is-currently-being-debugged/
    - /2010/08/17/check-whether-the-application-is-currently-being-debugged/
permalink: /check-whether-the-application-is-currently-being-debugged/
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

If you want to know whether the application is currently being debugged you can use the following code;

```vbnet
Public Shared ReadOnly Property DebugMode() As Boolean
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