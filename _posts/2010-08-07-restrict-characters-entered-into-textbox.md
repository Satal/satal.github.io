---
title: 'Restrict characters entered into textbox'
date: '2010-08-07T09:40:32+00:00'
author: Satal

redirect_from:
    - /blog/2010/08/07/restrict-characters-entered-into-textbox/
    - /2010/08/07/restrict-characters-entered-into-textbox/
permalink: /restrict-characters-entered-into-textbox/
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

If I had a pound for every time I saw someone post asking how to do this on a forum, I would be a rather rich man.

Lets assume you wanted to have a textbox that would only allow for numbers to be entered, you would need to check each time a key is pressed, obviously this wouldn’t deal with the user pasting text into the TextBox but you would be able to do some validation on the Leave event.

So you would need some code like this

```vbnet
Private Sub TextBox1_KeyPress(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyPressEventArgs) Handles TextBox1.KeyPress

    Dim allowedChars As String = "0123456789"

    If allowedChars.IndexOf(e.KeyChar) = -1 Then
        ' Invalid Character
        e.Handled = True
    End If

End Sub
```

As you can see the allowedChars string contains only the numbers 0-9, if the user was to enter a character other than that then

```vbnet
allowedChars.IndexOf(e.KeyChar)
```

would return -1.

If you wanted to only allow the user to enter alphanumeric characters then you could do the following

```vbnet
Private Sub TextBox1_KeyPress(ByVal sender As Object, ByVal e As
 System.Windows.Forms.KeyPressEventArgs) Handles TextBox1.KeyPress
    Dim allowedChars As String = "0123456789abcdefghijklmnopqrstuvwxyz"
    If allowedChars.IndexOf(e.KeyChar.ToLower) = -1 Then
         ' Invalid Character
         e.Handled = True
     End If
End Sub
```

As you will notice a-z have been added to the allowedChars string, but you may notice we have not put the upper case letters in there, the reason for this is that we don’t need to, instead we are looking for the character that has been entered but specifying that it should be lower case. So for example if we entered “X” then the allowedChars string will be searched for “x”, which it will find.