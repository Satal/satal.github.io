---
id: 41
title: 'Get a value back from a dialog form'
date: '2010-06-04T09:47:57+00:00'
author: Satal

guid: 'http://satalketo.com/2010/06/get-a-value-back-from-a-dialog-form/'
redirect_from:
    - /blog/2010/06/04/get-value-dialog-form/
    - /2010/06/04/get-value-dialog-form/
permalink: /get-value-dialog-form/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '179'
categories:
    - All
    - Computer
    - Programming
tags:
    - VB.NET
    - WinForms
---

One thing that commonly comes up on forums, is people asking how they can get information back from a modal form.

What a lot of people seem to forget is that a form is just another object, the same rules apply to it as any other object that you create in .Net. The most commonly used method for getting some information about the state of an object is to use properties.

So for this example I’m going to create a new project with a new dialog form with a textbox on it. Once we have set that up we have set up the dialog form we now need to add the property to the code. The code that I have used for this is;

```vbnet
Public ReadOnly Property TextBoxText() As String
    Get
        Return TextBox1.Text
    End Get
End Property
```

Now that we have the code that will allow for us to access the information from the dialog form, we need to put the code on the main form that will get this information. So on Form1 I have added a button which when clicked will show the dialog form and then if the user pressed OK on the dialog form will display the text that the user entered.

```vbnet
Private Sub Button1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button1.Click
    Dim dlg As New Dialog1
    If dlg.ShowDialog = Windows.Forms.DialogResult.OK Then
        MsgBox("The text entered into the dialog box was: " & dlg.TextBoxText)
    End If
End Sub
```

So the full code that we have is;

**Form1**

```vbnet
Public Class Form1
    Private Sub Button1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button1.Click
        Dim dlg As New Dialog1
        If dlg.ShowDialog = Windows.Forms.DialogResult.OK Then
            MsgBox("The text entered into the dialog box was: " & dlg.TextBoxText)
        End If
    End Sub
End Class
```

**Dialog1**

```vbnet
Imports System.Windows.Forms
Public Class Dialog1
    Public ReadOnly Property TextBoxText() As String
        Get
            Return TextBox1.Text
        End Get
    End Property
    Private Sub OK_Button_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles OK_Button.Click
        Me.DialogResult = System.Windows.Forms.DialogResult.OK
        Me.Close()
    End Sub
    Private Sub Cancel_Button_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Cancel_Button.Click
        Me.DialogResult = System.Windows.Forms.DialogResult.Cancel
        Me.Close()
    End Sub
End Class
```

While the example of this is quite simplistic, it should hopefully give you a good idea on how you would go about getting information back from a modal form.