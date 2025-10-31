---
title: 'How to copy and paste from the Windows clipboard'
date: '2010-09-06T10:00:37+00:00'
author: Satal

redirect_from:
    - /blog/2010/09/06/how-to-copy-and-paste-from-the-windows-clipboard/
    - /2010/09/06/how-to-copy-and-paste-from-the-windows-clipboard/
permalink: /how-to-copy-and-paste-from-the-windows-clipboard/
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

In this VB.Net Tutorial/Code Example I’m going to show you how to copy text to the Windows clipboard and then get text from the Windows clipboard again.

```vbnet
Public Class Clipboard
    ''' <summary>
    ''' This method deals with putting text into the clipboard
    ''' </summary>
    ''' <param name="textToCopy">The text to be put in the clipboard</param>
    ''' <remarks></remarks>
    Public Shared Sub copyToClipboard(ByVal textToCopy As String)
        System.Windows.Forms.Clipboard.SetDataObject(textToCopy, True)
    End Sub

    ''' <summary>
    ''' This method deals with getting text from the clipboard
    ''' </summary>
    ''' <returns>The text that is in the clipboard</returns>
    ''' <remarks>If there is no text in the clipboard then a zero length string is returned</remarks>
    Public Shared Function getTextFromClipboard() As String
        Dim rtn As String = ""

		If (System.Windows.Forms.Clipboard.GetDataObject().GetDataPresent(DataFormats.Text)) Then
            rtn = System.Windows.Forms.Clipboard.GetDataObject().GetData(DataFormats.Text).ToString()
        End If

        Return rtn

    End Function
End Class
```