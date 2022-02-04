---
id: 53
title: 'How to mark method as obsolete'
date: '2010-06-19T10:50:40+00:00'
author: Satal

guid: 'http://satalketo.com/2010/06/how-to-mark-method-as-obsolete/'
permalink: /blog/2010/06/19/mark-method-as-obsolete/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '176'
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