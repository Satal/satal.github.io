---
id: 74
title: 'The use of the Random class'
date: '2010-07-28T22:41:56+00:00'
author: Satal

guid: 'http://satalketo.com/2010/07/the-use-of-the-random-class/'
redirect_from:
    - /blog/2010/07/28/the-use-of-the-random-class/
    - /2010/07/28/the-use-of-the-random-class/
permalink: /the-use-of-the-random-class/
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '161'
image: /wp-content/uploads/2010/07/badrandom-1.jpg
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

One thing that I see commonly come up on forums is people saying things like “I am trying to get several random numbers but I’m getting the same number every time”. The problem is that many people don’t understand how the Random class works or how to implement it.

First I’ll show you an example of what I’ve seen people do. For this example you will need a form with a multi-lined textbox called txtRandomNumber and a button called btnGenerateRandomNumber. Then if we apply the following code the form;

```vbnet
Public Class Form1
    Private Sub btnGenerateRandomNumber_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnGenerateRandomNumber.Click
        Dim i As Integer = 0
        txtRandomNumber.Text = ""
        While i < 10
            txtRandomNumber.Text &= Environment.NewLine & getRandomNumber()
            i += 1
        End While
    End Sub
    Private Function getRandomNumber() As Integer
        Dim rnd As New Random
        Return rnd.Next(0, 10)
    End Function
End Class
```

If you run this you’re likely to get an outcome similar to this;

![](https://samjenkins.com/wp-content/uploads/2010/07/badrandom.jpg)

As you can see from the code they are creating a new Random object every time they want to get a random number. This is where the problem lies, the Random class requires a seed and if the programmer doesn’t supply a seed then the current system clock is used. Another thing to note about the seed for the Random class is that if you provide the same seed then the number that you receive when you call Next() will be the same.

Hopefully now you can see why the above code while it looks like it should work wont. Because the program will run so quickly the system clock doesn’t change therefore the seed value for the Random class is the same and therefore so is the result when the code then calls the Next() function.

Now that we understand what is causing the problem then we can identify what we can do to stop us from receiving this problem, by creating a single Random object and then calling it each time we want to get a random number we avoid this problem. One thing that I have also had suggested is that the Random object should also be a static variable (or Shared in VB.Net terms), this means that there is a single object created no matter how many classes are created, this has the added benefit that if you have to objects of the class that used a none static random object, there is a possibility that the values returned from it shall be the same. Admittedly the probability of this occurring is tiny, but considering is only takes an extra 7 keystrokes to avoid this problem it makes little sense not to avoid it.

So now if we take the example above and make the changes we have discussed we should end up with a piece of code similar to this;

```vbnet
Public Class Form1
    Private Shared rnd As New Random
    Private Sub btnGenerateRandomNumber_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnGenerateRandomNumber.Click
        Dim i As Integer = 0
        txtRandomNumber.Text = ""
        While i < 10
            txtRandomNumber.Text &= Environment.NewLine & getRandomNumber()
            i += 1
        End While
    End Sub
    Private Function getRandomNumber() As Integer
        Return rnd.Next(0, 10)
    End Function
End Class
```

Now if you was to run the application and click on the button you will receive an output that looks more appropriate;

![](https://samjenkins.com/wp-content/uploads/2010/07/goodrandom.jpg)

Obviously as this is random there is the possibility that when you click the button you will receive the same sort of output as above although that is highly unlikely and also it is not going to happen over and over again if you keep pressing the button like it would before hand.

Hopefully this article has given you not only an understanding of how you should be using the Random class but also why. If you feel that there is anything missing from this article that would be of use, please feel free to contact me and make the suggestion.