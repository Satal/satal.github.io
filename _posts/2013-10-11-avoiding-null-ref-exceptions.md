---
id: 574
title: 'Get deep nested values without worrying about null'
date: '2013-10-11T22:32:06+00:00'
author: Satal

guid: 'http://satalketo.com/?p=574'
permalink: /avoiding-null-ref-exceptions/
snapFB:
    - 's:383:"a:1:{i:0;a:12:{s:4:"doFB";s:1:"1";s:8:"PostType";s:1:"A";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:51:"New post (%TITLE%) has been published on %SITENAME%";s:11:"isPrePosted";s:1:"1";s:8:"isPosted";s:1:"1";s:4:"pgID";s:27:"605595058_10151612403940059";s:5:"pDate";s:19:"2013-10-11 22:32:09";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snapLI:
    - 's:492:"a:1:{i:0;a:12:{s:4:"doLI";s:1:"1";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:41:"New post has been published on %SITENAME%";s:11:"SNAPformatT";s:18:"New Post - %TITLE%";s:11:"isPrePosted";s:1:"1";s:8:"isPosted";s:1:"1";s:4:"pgID";s:123:"http://www.linkedin.com/updates?discuss=&amp;scope=25932443&amp;stype=M&amp;topic=5794559870590021632&amp;type=U&amp;a=qwkQ";s:5:"pDate";s:19:"2013-10-11 22:32:11";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
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
    - 'Avoid using nested if''s checking for null''s to reach a deeply nested object with this rather simple function.'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '113'
image: /wp-content/uploads/2013/10/null-reference-exception-1.png
categories:
    - All
    - Computer
    - Programming
tags:
    - 'C#'
---

Failing to handle null reference’s is one of the most common bugs in an application, this happens when a developer assumes that the a value will always contain an object even though it could be null. One of the nasty things about checking for nulls is that if you’re looking to retrieve a value from a deeply nested value would end up with a large number of nested if statements or one rather long if condition. In this blog post, I am going to show you a method that I have developed to avoid the need for these, allowing us to write much cleaner and more readable code.

![Null Reference Exception](https://samjenkins.com/wp-content/uploads/2013/10/null-reference-exception.png)

We’ve all done it, you’ve written code where you either forgot or was too lazy to check that an object wasn’t null before trying to perform some action on it, whether that calls a method or retrieve a value. This is easily done and can be difficult to identify when visually inspecting your code, I dread to think how many times I have neglected to include checking for nulls in my code. To check that we aren’t going to cause a null reference exception, we need to go through each step checking that the returned value isn’t null before continuing on to the next, this leads to lots of nested if statements, which in my opinion aren’t very pretty. After coming across a requirement to do this deep if nesting with one of my personal projects I decided that if there had to be an easier way and if there wasn’t an existing way I’d come up with one, which resulted in the creation of a pretty unimaginative class called ValueRetriever.

The ValueRetriever class has a single static method which takes in an object and a function to specify the location of the value to be retrieved. Originally I had been thinking of allowing the user to pass in a string to specify the location within the object that they want to retrieve but then I slapped myself and did it properly!

```csharp
using System;

namespace KetoLibrary.Utilities
{
    public static class ValueRetriever
    {
        /// <summary>
        /// Retrieves a value from an object, handling nulls and if specified all other exceptions
        /// </summary>
        /// <typeparam name="TInputType">The type of object that the value is going to be retrieved from</typeparam>
        /// <typeparam name="TOutputType">The output type to be retrieved</typeparam>
        /// <param name="obj">The object to have the value retrieved from</param>
        /// <param name="valueLocation">The location within the object that we want value from</param>
        /// <param name="defaultValue">The value to be returned if a null is encountered, if not specified then it is the default for TOutputType</param>
        /// <param name="throwAnythingButNullException"></param>
        /// <returns>The value at the specified location or the default value of TOutputType</returns>
        public static TOutputType RetrieveValue<TInputType, TOutputType>(TInputType obj,
                                                                         Func<TInputType, TOutputType> valueLocation,
                                                                         TOutputType defaultValue = default(TOutputType),
                                                                         bool throwAnythingButNullException = true)
        {
            var returnValue = defaultValue;

            try
            {
                returnValue = valueLocation.Invoke(obj);

                // If we got null returned by the Invoke then lets supply the default value
                // which could be null too but that's what the user wants
                if (Equals(returnValue, default(TOutputType)))
                {
                    returnValue = defaultValue;
                }
            }
            catch (NullReferenceException)
            {
                // We weren't able to execute the method as we had a null somewhere in there
                // Do nothing as we have already assigned the default value to returnValue
            }
            catch
            {
                // Generic catch, at this point we are throwing anything that isn't a null
                // reference exception, so for example a file not found excception will be
                // thrown if we have speccified throwAnythingButNullException to true.
                if (throwAnythingButNullException) throw;
            }

            return returnValue;
        }
    }
}
```

Using this method is actually really simple, don’t be fooled by the generics for this method you don’t have to specify them, which makes the usage of this much cleaner.

```csharp
public static void Test()
{
    var file = new XfeFileInfo(@"C:\Users\satal");

    // Specify an external method to perform to retrieve the value, good if you need to do a bit more complex processing
    var fileLocation = RetrieveValue<XfeFileInfo, string>(file, ValueLocationMethod);

    // Specifying a Lambda method to specify the location of the value
    var parentLocation = RetrieveValue<XfeFileInfo, string>(file, info => info.FileInfo.Directory.Parent.FullName);

    // Specifying that we want RetrieveValue to handle all exceptions and return the default value
    var fileSize = RetrieveValue(file, info => info.FileInfo.Length, throwAnythingButNullException: false);

    // Passing in the value to return if we get a null at any point
    fileSize = RetrieveValue(file, info => info.FileInfo.Length, -1, false);

    Console.WriteLine("{0} - {1}", parentLocation, fileSize);
}

private static string ValueLocationMethod(XfeFileInfo xfeFileInfo)
{
    return xfeFileInfo.FileInfo.FullName;
}
```

The first two examples in the code above explicitly define what the input and output types are, but the second two examples are done by implicitly defining them, which makes for much easier to read code. Please do let me know if you encounter any issues with this code, or come up with any additional scenarios which this should deal with but doesn’t currently and I’ll add them in.