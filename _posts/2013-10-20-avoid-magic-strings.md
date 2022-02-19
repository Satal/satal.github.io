---
id: 587
title: 'Magic Strings: How to avoid them in C#'
date: '2013-10-20T14:47:40+00:00'
author: Satal

guid: 'http://satalketo.com/?p=587'
permalink: /avoid-magic-strings/
snapFB:
    - 's:383:"a:1:{i:0;a:12:{s:4:"doFB";s:1:"1";s:8:"PostType";s:1:"A";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:51:"New post (%TITLE%) has been published on %SITENAME%";s:11:"isPrePosted";s:1:"1";s:8:"isPosted";s:1:"1";s:4:"pgID";s:27:"605595058_10151627618425059";s:5:"pDate";s:19:"2013-10-20 14:47:44";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snapLI:
    - 's:492:"a:1:{i:0;a:12:{s:4:"doLI";s:1:"1";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:41:"New post has been published on %SITENAME%";s:11:"SNAPformatT";s:18:"New Post - %TITLE%";s:11:"isPrePosted";s:1:"1";s:8:"isPosted";s:1:"1";s:4:"pgID";s:123:"http://www.linkedin.com/updates?discuss=&amp;scope=25932443&amp;stype=M&amp;topic=5797704486835220480&amp;type=U&amp;a=-6kE";s:5:"pDate";s:19:"2013-10-20 14:47:45";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snap_isAutoPosted:
    - '1'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapTW:
    - 's:268:"a:1:{i:0;a:8:{s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"msgFormat";s:59:"New post (%TITLE%) has been published on %SITENAME% - %URL%";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:2:"do";i:0;}}";'
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_description:
    - 'Showing how to avoid using magic strings within your application and instead using lambda expressions to specify the class/method/variable name.'
rank_math_focus_keyword:
    - 'Magic string'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '112'
image: /wp-content/uploads/2013/10/i_dont_always_expression_trees-1.jpg
categories:
    - All
    - Computer
    - Programming
tags:
    - 'C#'
---

One of my least favourite things about the .NET Framework is that there are plenty of places where it expects you use magic strings . These make maintaining your application harder as refactoring through Visual Studio will not pick up these references, which then get left behind with their original value. This blog post is to mostly share a very useful code snippet with you that helps us to avoid using magic strings and instead uses lambda expressions to specify the name we want.

![Avoiding magic strings by using expression trees](https://samjenkins.com/wp-content/uploads/2013/10/i_dont_always_expression_trees-239x300.jpg)

I actually found this image when Googling for “magic string .net”, so perfect for this blog post.

## What are magic strings?

Magic strings are where you have taken something like a class/method/variable name and written it within a string, which is then used to identify the appropriate class/method/variable, for example;

```csharp
public void myMethod(string myParameter)
{
    if (myParameter == null)
    {
        throw new ArgumentNullException("myParameter");
    }
}
```

As you can see the method has a parameter which we check to see whether or not it is null, if it is null we are throwing an ArgumentNullException, which allows you to specify the parameter name but only allows you to specify it as a hard coded string. As I mentioned in the introduction the problem comes when we start looking to do things like refactoring where we rename the parameter but because we have also specified the parameter name as a string this isn’t picked up, it doesn’t cause a compilation error, it can just get left there, which isn’t what we want. There are tools like Resharper which will also search comments for references to the name but it is better to avoid this problem than to use tools to deal with the problem afterwards.

## The magic anti-magic strings code

So I am currently looking at implementing a Ribbon for the XML File Explorer and found a good explanation on how to do it [here](http://blogs.microsoft.co.il/blogs/arik/archive/2009/12/23/windows-ribbon-for-winforms-part-0-table-of-contents.aspx "Windows Ribbon for WinForms"), but while I was looking through some of the other things Arik has done I found [this](http://blogs.microsoft.co.il/blogs/arik/archive/2010/11/17/no-more-magic-strings-presenting-string-of.aspx "No More Magic Strings! Presenting: @string.of") little beauty. The code uses [Expressions ](http://msdn.microsoft.com/en-us/library/system.linq.expressions.expression.aspx "MSDN documentation for the Expression Class ") allowing us to specify a variable, field, method, property and retrieve the name as a string, it also includes just for completeness a way of getting a class name as string although this is done in a different way. The website provides a sample project which contains the code, although strangely enough you download it as a zip.txt.

```csharp
using System;
using System.Linq.Expressions;

namespace Utils
{
    public static class @string
    {
        private static string GetMemberName(Expression expression)
        {
            switch (expression.NodeType)
            {
                case ExpressionType.MemberAccess:
                    var memberExpression = (MemberExpression)expression;
                    var supername = GetMemberName(memberExpression.Expression);

                    if (String.IsNullOrEmpty(supername))
                        return memberExpression.Member.Name;

                    return String.Concat(supername, '.', memberExpression.Member.Name);

                case ExpressionType.Call:
                    var callExpression = (MethodCallExpression)expression;
                    return callExpression.Method.Name;

                case ExpressionType.Convert:
                    var unaryExpression = (UnaryExpression)expression;
                    return GetMemberName(unaryExpression.Operand);

                case ExpressionType.Constant:
                case ExpressionType.Parameter:
                    return String.Empty;

                default:
                    throw new ArgumentException("The expression is not a member access or method call expression");
            }
        }

        public static string of<T>(Expression<Func<T>> expression)
        {
            return GetMemberName(expression.Body);
        }

        public static string of(Expression<Action> expression)
        {
            return GetMemberName(expression.Body);
        }

        public static string of<T>()
        {
            return typeof(T).Name;
        }
    }
}
```

This now allows for our earlier example to stop using magic strings and instead just pass in the variable name like so;

```csharp
public void myMethod(string myParameter)
{
    if (myParameter == null)
    {
        throw new ArgumentNullException(@string.of(() => myParameter));
    }
}
```

Which if we refactor the parameter to myNewParameter, gives us this;

```csharp
public void myMethod(string myNewParameter)
{
    if (myNewParameter == null)
    {
        throw new ArgumentNullException(@string.of(() => myNewParameter));
    }
}
```

Which I’m sure you’ll agree is much better than when we would refactor and then have to ensure that we haven’t hard coded the name as a string somewhere