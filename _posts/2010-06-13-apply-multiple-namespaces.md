---
title: 'Applying multiple namespaces to a class'
date: '2010-06-13T19:07:03+00:00'
author: Satal

redirect_from:
    - /blog/2010/06/13/apply-multiple-namespaces/
    - /2010/06/13/apply-multiple-namespaces/
permalink: /apply-multiple-namespaces/
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