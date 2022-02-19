---
id: 369
title: 'Shuffle a string in C#'
date: '2013-04-25T08:54:27+00:00'
author: Satal

guid: 'http://satalketo.com/?p=369'
permalink: /shuffle-a-string/
snapFB:
    - 's:247:"a:1:{i:0;a:8:{s:4:"doFB";s:1:"1";s:8:"PostType";s:1:"A";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:51:"New post (%TITLE%) has been published on %SITENAME%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snapEdIT:
    - '1'
snap_MYURL:
    - ''
snapLI:
    - 's:259:"a:1:{i:0;a:8:{s:4:"doLI";s:1:"1";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:41:"New post has been published on %SITENAME%";s:11:"SNAPformatT";s:18:"New Post - %TITLE%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snapTW:
    - 's:142:"a:1:{i:0;a:5:{s:4:"doTW";s:1:"1";s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;}}";'
rank_math_description:
    - 'This is an update to an article I wrote back in 2010 on how to shuffle the characters in a string, I achieve this through the use of LINQ.'
rank_math_focus_keyword:
    - Shuffle
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '124'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - 'C#'
    - String
---

This is the first in a series of posts that I am going to make to update some of the existing code examples with newer code utilising what I’ve learnt since the original article. In this post I will be looking at shuffling the characters in a string, the original post “[Shuffle a string in VB.Net](https://samjenkins.com/shuffle-a-string-in-vbnet/ "Shuffle a string in VB.Net")” was written back in 2010 and I felt that I should be able to achieve the same thing through LINQ, which if you’ve seen much of my code you’ll know I’m a huge fan of LINQ.

### ShuffleString

```csharp
public static string ShuffleString(string stringToShuffle)
{
    if (String.IsNullOrEmpty(stringToShuffle))
    {
        throw new ArgumentNullException("stringToShuffle",
                                        "The stringToShuffle variable must not be null or empty");
    }

    return new string(
                         stringToShuffle
                            .OrderBy(character => Guid.NewGuid())
                            .ToArray()
                    );
}
```

At the beginning of the code we ensure that the string that has been passed to us is not null or empty as this method would not be of any use with a null or empty string.

### Things to note with this shuffle method

One thing to bare in mind when using this shuffle method is that I haven’t excluded the possibility of the returned string being the same as the original string, if you wanted to stop that then the code that you were going to have to check that when we have shuffled the original string that the resulting value is not the same. In the following code I have used a simple do while loop to deal with this.

```csharp
public static string ShuffleStringExcludeOriginal(string stringToShuffle)
{
    string shuffled;

    if (String.IsNullOrEmpty(stringToShuffle))
    {
        throw new ArgumentNullException("stringToShuffle",
                                        "The stringToShuffle variable must not be null or empty");
    }

    if (stringToShuffle.Length < 2)
    {
        throw new ArgumentException("This method can not be used when the string to shuffle is less than two " +
                                    "characters long as it is not possible to exclude the original",
                                    "stringToShuffle");
    }

    do
    {
        shuffled = new string(
                                stringToShuffle
                                    .OrderBy(character => Guid.NewGuid())
                                    .ToArray()
                                );
    } while (shuffled == stringToShuffle);

    return shuffled;
}
```

On top of the handling of null or empty strings, I have also added code to deal with strings of only one character long as if we aren’t allowed to return the original string then we must have a string of at least two characters to achieve this.

### RFC (Request For Comment)

While re-writing these snippets, I have been creating unit tests to ensure that the code that I am providing actually achieves what I am trying to do (also to reinforce my programming best practices), I would be interested to know whether you think it would be useful for me to share these with you as well so that you can add to these if you find a scenario I haven’t anticipated?