---
title: 'Check if a VAT Number is valid'
date: '2010-09-07T11:41:46+00:00'
author: Satal

redirect_from:
    - /blog/2010/09/07/is-vat-number-valid/
    - /2010/09/07/is-vat-number-valid/
permalink: /is-vat-number-valid/
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - VB.NET
---

In this VB.Net Tutorial/Code Example, I’m going to show you how to check whether a VAT Number is valid or not.

For this piece of code you will need to import “System.Text.RegularExpressions”

```vbnet
Public Shared Function isValidVATNumber(ByVal theVATNumber As String) As Boolean
    Dim startChar As String = "^"
    Dim endChar As String = "$"
    Dim rtn As Boolean = False
    Dim i As Integer = 8
    Dim valString As String
    Dim sum As Integer = 0

    'Check that the string matches the requirements
    rtn = Regex.IsMatch(theVATNumber, startChar & "([A-Z{2}])*(([1-9]d{8})|([1-9]d{11}))" & endChar, RegexOptions.Multiline)

    If rtn Then
        'Now perform the validation
        valString = theVATNumber

        If Regex.IsMatch(valString, startChar & "[A-Z]{2}", RegexOptions.Multiline) Then
            valString = valString.Substring(2)
        End If

        While i >= 2
            sum += (i * CInt(valString.Substring(0, 1)))
            valString = valString.Substring(1)
            i -= 1
        End While

        While sum > 0
            sum -= 97
        End While

        rtn = ((sum * -1) = CInt(valString))
    End If

    Return rtn
Function
```