---
id: 51
title: 'Applying multiple namespaces to a class'
date: '2010-06-13T19:07:03+00:00'
author: Satal

guid: 'http://satalketo.com/2010/06/applying-multiple-namespaces-to-a-class/'
permalink: /blog/2010/06/13/apply-multiple-namespaces/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '178'
categories:
    - All
    - Computer
    - Programming
tags:
    - VB.NET
---

Something that I’ve seen a few people do when they want to create a library that has namespace’s is to actually nest the namespace’s in their code.

```vbnet
Namespace System
    Namespace security
        Namespace Cryptography
            Public Class MyNewClass
            End Class
        End Namespace
    End Namespace
End Namespace
```

IMHO this looks messy and seems a waste of space.

What the people who’s code I was looking at seemed not to realise is that you can specify the namespace in a single line, but separating the namespaces with a period, just as you would when declaring a variable, so for example

```vbnet
Namespace System.Security.Cryptography
   Public Class MyNewClass
   End Class
End Namespace
```

Now doesn’t that look a whole lot better?