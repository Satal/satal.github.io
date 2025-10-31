---
title: 'Generate a password'
date: '2010-05-19T15:28:34+00:00'
author: Satal
redirect_from:
    - /blog/2010/05/19/generate-password/
    - /2010/05/19/generate-password/
permalink: /generate-password/
categories:
    - All
    - Computer
    - Programming
tags:
    - Passwords
    - Programming
    - VB.NET
---

Something that I found that I frequently come across is the need to generate a random string, so I ended up creating a simple shared function that dealt with that for me.

```vbnet
Imports Microsoft.VisualBasic

Public Class PasswordFunctions
    ''' <summary>
    ''' This function generates a random password allowing for the specification of the contents
    ''' </summary>
    ''' <param name="passwordLength">The number of characters to be in the password</param>
    ''' <param name="includeUpperCase">Whether to include upper case characters</param>
    ''' <param name="includeNumbers">Whether to include numbers</param>
    ''' <param name="includeSymbols">Whether to include symbols</param>
    ''' <param name="includeSimilarChars">Whether to include characters which are similar</param>
    ''' <returns>A string with the random password</returns>
    ''' <remarks>This method was produced by Satal Keto (www.satalketo.com)</remarks>
    Public Shared Function generatePassword(Optional ByVal passwordLength As Integer = 12, _
                              Optional ByVal includeUpperCase As Boolean = False, _
                              Optional ByVal includeNumbers As Boolean = False, _
                              Optional ByVal includeSymbols As Boolean = False, _
                              Optional ByVal includeSimilarChars As Boolean = False) As String

        Dim strRtn As String = ""
        Dim strAllowedChars As String
        Dim intCount As Integer
        Dim rnd As New Random()

        strAllowedChars = "abcdefghijkmnopqrstuvwxyz"
        If includeUpperCase Then
            strAllowedChars &= "ABCDEFGHJKLMNPQRSTUVWXYZ"
            If includeSimilarChars Then
                strAllowedChars &= "IO"
            End If
        End If
        If includeNumbers Then
            strAllowedChars &= "23456789"
            If includeSimilarChars Then
                strAllowedChars &= "10"
            End If
        End If
        If includeSymbols Then
            strAllowedChars &= "|$%^&*()_+~-=#[]{};':@,./<>?"
            If includeSimilarChars Then
                strAllowedChars &= "!"
            End If
        End If

        For intCount = 0 To passwordLength
            strRtn &= strAllowedChars.Substring(rnd.Next(0, strAllowedChars.Length - 1), 1)
        Next

        Return strRtn
    End Function

End Class
```