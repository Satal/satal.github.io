---
id: 88
title: 'Stop someone from pasting into a TextBox'
date: '2010-08-15T22:19:13+00:00'
author: Satal

guid: 'http://satalketo.com/2010/08/stop-someone-from-pasting-into-a-textbox/'
redirect_from:
    - /blog/2010/08/15/stop-someone-from-pasting-into-a-textbox/
    - /2010/08/15/stop-someone-from-pasting-into-a-textbox/
permalink: /stop-someone-from-pasting-into-a-textbox/
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '154'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

This article goes hand in hand with my article called “[Restrict characters entered into textbox](https://samjenkins.com/restrict-characters-entered-into-textbox/)” and I shall use pretty much the same example as I used before.

If you wanted to stop a user from entering anything but numbers into a TextBox you could use the method described in the previous article, but the one problem with that is that the user is still able to paste letters into the TextBox. The following code will not only stop the user from entering anything except for the particular characters specified but also wont allow for the user paste.

```vbnet
Public Class Form1
    Private Sub TextBox1_KeyPress(ByVal sender As System.Object, ByVal e As System.Windows.Forms.KeyPressEventArgs) Handles TextBox1.KeyPress
        Dim allowedChars As String = "0123456789"

        If e.KeyChar = Chr(22) Then
            e.Handled = True
        End If

        If allowedChars.IndexOf(e.KeyChar) = -1 And Not e.KeyChar = Chr(8) And Not e.KeyChar = Chr(13) Then
            e.Handled = True
        End If
    End Sub

    Private Sub Form1_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        TextBox1.ContextMenuStrip = New ContextMenuStrip
    End Sub
End Class
```

As you can see from the code we do the following things;

1. We set the TextBox’s ContextMenuStrip to a new ContextMenuStrip, what this does it that it stops the menu coming up when the user right clicks within the TextBox, which in turn stops them pressing paste.
2. When a key is pressed in the TextBox, we first check to see if the user has pressed Ctrl+V, which is the KeyChar is Chr(22).
3. Check to see whether the IndexOf the entered key within the allowedChars String is -1, which means it is not within the String.
4. We also allow for the key to be ‘Enter’ or backspace.