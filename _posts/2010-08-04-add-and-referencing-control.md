---
id: 77
title: 'Dynamically adding and later referencing control'
date: '2010-08-04T12:46:14+00:00'
author: Satal

guid: 'http://satalketo.com/2010/08/dynamically-adding-and-later-referencing-control/'
redirect_from:
    - /blog/2010/08/04/add-and-referencing-control/
    - /2010/08/04/add-and-referencing-control/
permalink: /add-and-referencing-control/
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '159'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
    - WinForms
---

This is something that was asked how to do in one of the forums I post help in.

Basically the user wanted to know how to dynamically add controls to your form and then refer to them later in the program. The following code gives you an example of how you are able to achieve this;

```vbnet
Public Class Form1

    Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As
System.EventArgs) Handles MyBase.Load
        Dim myNewTextBox As New TextBox
        myNewTextBox.Name = "txtTest"
        myNewTextBox.Text = "hi1"
        myNewTextBox.Top = 100
        myNewTextBox.Left = 100
        Me.Controls.Add(myNewTextBox)
    End Sub

    Private Sub Button1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button1.Click
        Dim txt As TextBox = CType(Me.Controls.Find("txtTest", True).FirstOrDefault, TextBox)
        txt.Text = "Hello World"
    End Sub
End Class
```

As you can see in the Form1\_Load event we are creating a new TextBox and adding it to the collection of controls on the form, then on the Button1\_Click event we are looking in the collection of controls for the form, getting the control with the name txtTest and converting it to a TextBox (explicit conversions are a good thing). Once we have the appropriate TextBox we then set it’s Text property to “Hello World”.