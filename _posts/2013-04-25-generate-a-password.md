---
id: 376
title: 'Password generation in C#'
date: '2013-04-25T08:54:17+00:00'
author: Satal

guid: 'http://satalketo.com/?p=376'
permalink: /generate-a-password/
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
    - 'A couple methods for generating a password by either selecting options about what it can contain or by supplying a character set to be used.'
rank_math_focus_keyword:
    - Password
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '125'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - 'C#'
    - Passwords
---

This is an update for a post that I wrote back in 2010 on how to [generate a password using VB.NET](https://samjenkins.com/generate-password/ "Generate a password"). The overall design of the code has been kept the same although I have made a few adjustments according to things that I have learnt since I wrote the original code, like the use of a [StringBuilder](http://msdn.microsoft.com/en-us/library/system.text.stringbuilder.aspx "StringBuilder Class") instead of just concatenating strings to build up the allowed character set.

### Generate password from character set

I decided to first create a method that would given a character set and a specified number of characters would produce a password.

```csharp
private static readonly Random Rand = new Random();

public static string CreatePasswordFromCharacterSet(string characterSet, int passwordLength = 16)
{
    if (String.IsNullOrEmpty(characterSet))
    {
        throw new ArgumentNullException("characterSet",
            "The characterSet parameter must not be null or an empty string");
    }

    if (passwordLength < 1)
    {
        throw new ArgumentException("The password length must be greater than zero",
            "passwordLength");
    }

    var sb = new StringBuilder();
    int characterSetLength = characterSet.Length;

    for (int i = 0; i < passwordLength; i++)
    {
        sb.Append(characterSet.Substring(Rand.Next(0, characterSetLength),1));
    }

    return sb.ToString();
}
```

At the beginning of the method I ensured that the character set has characters in it and that the requested password length is greater than zero. This uses a static instance of the Random class to choose a random character from the character set, please note that the instance is created outside of the method and is initialised only once, for an explanation of why I did this please see the post I wrote about the [correct use of the Random clas](https://samjenkins.com/the-use-of-the-random-class/ "The use of the Random class")s.

### Generating the character set from a set of options

Rather than requiring the user to identify the characters in a character set, I created a method that would by specifying a few options about what character types could be included in the password and a password length would generate a password.

```csharp
public static string GeneratePassword(int passwordLength = 16,
                                        bool includeUpperCase = true,
                                        bool includeNumbers = true,
                                        bool includeSymbols = true,
                                        bool includeSimilarCharacters = true)
{
    if (passwordLength < 1)
    {
        throw new ArgumentException("The password length must be greater than zero",
            "passwordLength");
    }

    var allowedCharacters = new StringBuilder();

    // Lower case characters
    allowedCharacters.Append("abcdefghijkmnopqrstuvwxyz");
    if (includeSimilarCharacters)
    {
        allowedCharacters.Append("l");
    }

    // Upper case characters
    if (includeUpperCase)
    {
        allowedCharacters.Append("ABCDEFGHJKLMNPQRSTUVWXYZ");
        if (includeSimilarCharacters)
        {
            allowedCharacters.Append("IO");
        }
    }

    // Numbers
    if (includeNumbers)
    {
        allowedCharacters.Append("23456789");
        if (includeSimilarCharacters)
        {
            allowedCharacters.Append("10");
        }
    }

    // Symbols
    if (includeSymbols)
    {
        allowedCharacters.Append("|$%^&*()_+~-=#[]{};':@,./<>?");
        if (includeSimilarCharacters)
        {
            allowedCharacters.Append("!");
        }
    }

    return CreatePasswordFromCharacterSet(allowedCharacters.ToString(), passwordLength);
}
```

Again at the beginning of the method I ensure that the requested password length is greater than zero to avoid pointless runs. Where as in the original version of this code I used string concatenation to build up the character set to be used for the password I decided to use a [StringBuilder](http://msdn.microsoft.com/en-us/library/system.text.stringbuilder.aspx "StringBuilder Class") which would decrease the amount of time taken by the method. Admittedly this time saving would be minimal but every little helps.

### RFC (Request For Comment)

While re-writing these snippets, I have been creating unit tests to ensure that the code that I am providing actually achieves what I am trying to do (also to reinforce my programming best practices), I would be interested to know whether you think it would be useful for me to share these with you as well so that you can add to these if you find a scenario I haven’t anticipated?