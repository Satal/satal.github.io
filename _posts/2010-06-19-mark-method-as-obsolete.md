---
title: 'How to mark method as obsolete'
date: '2010-06-19T10:50:40+00:00'
author: Satal

redirect_from:
    - /blog/2010/06/19/mark-method-as-obsolete/
    - /2010/06/19/mark-method-as-obsolete/
permalink: /mark-method-as-obsolete/
categories:
    - All
    - Computer
    - Programming
tags:
    - VB.NET
---

While working on my upcoming library, I was adding some old code that I had created and realised that the way I had done one of the methods wasn’t appropriate. While as this is during the writing of version 1 of my framework I thought rather than to just change the code and forget about all backwards compatibility, I would make the old method obsolete.

You can achieve this by using the following code before your function;

```vbnet
<Obsolete("Message that the developer should see", True)> _
Public Sub randomMethod()
    'Do something
End Sub
```

You will need to change “Message that the developer should see” to the message that you want the message that the developer should see if they try and use this function (that should be fairly obvious). You may also want to consider whether you want the boolean to be True or False. When it is set to true the the compiler will stop the code that uses that function to compile showing an error with the message that you defined before. When the value is set to false then the compiler will just show the developer a warning when the user compiles code that uses that function.