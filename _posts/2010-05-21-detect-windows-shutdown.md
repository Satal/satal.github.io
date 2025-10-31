---
title: 'VB.Net detect Windows shutting down or logging off'
date: '2010-05-21T10:32:36+00:00'
author: Satal

redirect_from:
    - /blog/2010/05/21/detect-windows-shutdown/
    - /2010/05/21/detect-windows-shutdown/
permalink: /detect-windows-shutdown/
categories:
    - All
    - Computer
    - Programming
tags:
    - VB.NET
    - Windows
---

If you’ve ever developed an application that minimises the application when the user closes it, you will know that the application can stop Windows from shutting down or you from logging off.

There is a bit of nice simple code that stops this from occurring.

```vbnet
Private allowClose As Boolean = False

Private Sub Form1_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
    'This bit of code adds the event handler that deals with closing down the application when Windows shuts down or logs off
    AddHandler Microsoft.Win32.SystemEvents.SessionEnding, AddressOf SessionEnding
End Sub

Private Sub Form1_FormClosing(ByVal sender As Object, ByVal e As System.Windows.Forms.FormClosingEventArgs) Handles Me.FormClosing
    If Not allowClose Then
        Me.WindowState = FormWindowState.Minimized
        Me.Visible = False
        e.Cancel = True
    Else
        'We allow the form to close
    End If
End Sub

Private Sub SessionEnding(ByVal sender As System.Object, ByVal e As Microsoft.Win32.SessionEndingEventArgs)
    allowClose = True
    Application.Exit()
End Sub
```