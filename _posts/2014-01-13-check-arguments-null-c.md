---
id: 663
title: 'Check arguments for null in C#'
date: '2014-01-13T20:37:41+00:00'
author: Satal

guid: 'http://satalketo.com/?p=663'
permalink: /check-arguments-null-c/
snap_isAutoPosted:
    - '1'
snapFB:
    - 's:274:"a:1:{i:0;a:9:{s:4:"doFB";s:1:"1";s:8:"PostType";s:1:"A";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:51:"New post (%TITLE%) has been published on %SITENAME%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;s:11:"isPrePosted";s:1:"1";}}";'
snapLI:
    - 's:286:"a:1:{i:0;a:9:{s:4:"doLI";s:1:"1";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:41:"New post has been published on %SITENAME%";s:11:"SNAPformatT";s:18:"New Post - %TITLE%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;s:11:"isPrePosted";s:1:"1";}}";'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapTW:
    - 's:395:"a:1:{i:0;a:12:{s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:11:"isPrePosted";s:1:"1";s:8:"isPosted";s:1:"1";s:4:"pgID";s:18:"422829842263207936";s:5:"pDate";s:19:"2014-01-13 20:37:44";s:9:"msgFormat";s:59:"New post (%TITLE%) has been published on %SITENAME% - %URL%";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:2:"do";i:0;}}";'
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '108'
categories:
    - All
    - Computer
    - Programming
tags:
    - 'C#'
    - 'Null'
---

I had a comment recently from ‘[The Dag](https://samjenkins.com/avoid-magic-strings/#comment-56 "The Dags request")‘ asking if I could create some code which would check to ensure that none of the parameters for a methods were null. While this is quite a simple piece of code I thought I would reply in a post rather than answering in the comments as it is more likely to be found by anyone else who is looking to do the same.

The request is to allow for any number of parameters to be passed in and they all be checked, the suggested format by The Dag was;

```csharp
Guard.NoArgumentsNull(() => arg1, arg2, arg3);
```

I didn’t keep to the format suggested exactly but I feel that the result meets all of The Dags requirements fully.

## Breaking it down

The first part that I looked at was being able to pass in any number of arguments into the method to be checked for the presence of a null. The logical way of achieving this is by using a collection but .NET provides us with a method for passing in an unspecified number of arguments without having to create a collection object. This can be done through the use of the [params ](http://msdn.microsoft.com/en-us/library/w5zay9db.aspx "params (C# Reference) - MSDN Documentation")keyword, which is the same way that you can receiving an unspecified number of arguments to a console application.

So the method currently looks like this;

```csharp
public static bool AnyArgsNull(params object[] args)
{
    // Do something here
}
```

Now that we have a collection of objects we are able to use Linq to check if any of them are null. Which leaves our method looking like;

```csharp
public static class Guard
{
    public static bool AnyArgsNull(params object[] args)
    {
        return args.Any(a => a == null);
    }
}
```

There’s nothing complicated about the final piece of code, it’s nice and simple to use for the task requested. The only problem I have with this is that it is not possible to identify which of the parameters were null and allow for the user to be notified that they need to ensure that they are passing that in. Personally I can’t think of any way of achieving this off the top but if you have any idea’s on how this could be achieved then please do post it in comment section below as I would be interested to see your implementations.