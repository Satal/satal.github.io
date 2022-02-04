---
id: 39
title: 'Sending an email from a .Net application'
date: '2010-06-03T15:16:13+00:00'
author: Satal

guid: 'http://satalketo.com/2010/06/sending-an-email-from-a-net-application/'
permalink: /blog/2010/06/03/send-email-from-dot-net/
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapTW:
    - 's:231:"a:1:{i:0;a:7:{s:2:"do";s:1:"1";s:9:"msgFormat";s:59:"New post (%TITLE%) has been published on %SITENAME% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";'
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '181'
categories:
    - All
    - Computer
    - Programming
tags:
    - VB.NET
---

This is something that I found myself doing over and over again so I decided to create a class that simplified the process of sending an email from a .Net application.

As mentioned in the comment, feel free to use this code within your applications, the only requirement is that you leave the comment in place. I also wouldn’t say no to getting a link to my website but that’s not compulsory :p

If you have any problems with this code then please let me know with as much information about what happened to cause the problem and if you’ve come up with a fix I would be greatful to know what it was.

```
<pre class="brush: vbnet; gutter: true">'''
''' Email class from Satal Keto's library
''' Version 1.0.3.3
'''
Imports System.Net.Mail
Namespace Email
    ''' <summary>
    ''' This class was created by Satal Keto from www.satalketo.com, you are free to use this code
    ''' under the condition that you leave this comment in place
    ''' </summary>
    ''' <remarks></remarks>
    Public Class Email
        Private _smtpHost As String
        Private _smtpUser As String
        Private _smtpPass As String
        Private _message As String
        Private _subject As String
        Private _toEmail As New List(Of String)
        Private _ccs As New List(Of String)
        Private _bccs As New List(Of String)
        Private _attachments As New List(Of String)
        Private _smtpPort As Integer = 25
        Private _useEncryption As Boolean
        Private _htmlEmail As Boolean = False
#Region "Constructors"
        ''' <summary>
        ''' This is the constructor for the Email class when none of the details are provided straight away
        ''' </summary>
        ''' <remarks>The SMTP details, a subject, message and at least one receipient must be added before being able to send the email</remarks>
        Public Sub New()
        End Sub
        ''' <summary>
        ''' This is the constructor for the Email class when only the SMTP details are provided straight away
        ''' </summary>
        ''' <param name="smtpHost">The location of the SMTP server</param>
        ''' <param name="smtpUser">The user to login to the SMTP server</param>
        ''' <param name="smtpPass">The password for the user</param>
        ''' <remarks>A subject, message and at least one receipient must be entered before being able to send the email</remarks>
        Public Sub New(ByVal smtpHost As String, ByVal smtpUser As String, ByVal smtpPass As String)
            _smtpHost = smtpHost
            _smtpPass = smtpPass
            _smtpUser = smtpUser
        End Sub
        ''' <summary>
        ''' This is the constructor for the Email class for when all details are to be provided straight away
        ''' </summary>
        ''' <param name="smtpHost">The location of the SMTP server</param>
        ''' <param name="smtpUser">The user to login to the SMTP server</param>
        ''' <param name="smtpPass">The password for the user</param>
        ''' <param name="subject">The subject of the email</param>
        ''' <param name="message">The message of the email</param>
        ''' <remarks>At least one receipient before being able to send the email</remarks>
        Public Sub New(ByVal smtpHost As String, ByVal smtpUser As String, ByVal smtpPass As String, ByVal subject As String, ByVal message As String)
            _smtpHost = smtpHost
            _smtpPass = smtpPass
            _smtpUser = smtpUser
            _subject = subject
            _message = message
        End Sub
#End Region
#Region "Properties"
        ''' <summary>
        ''' The host address for the SMTP server
        ''' </summary>
        ''' <value>The new host address for the SMTP server</value>
        ''' <returns>The current host address for theSMTP server</returns>
        ''' <remarks></remarks>
        Public Property smtpHost() As String
            Get
                Return _smtpHost
            End Get
            Set(ByVal value As String)
                _smtpHost = value
            End Set
        End Property
        ''' <summary>
        ''' The username to be used for logging into the SMTP server with
        ''' </summary>
        ''' <value>The new username to be used for logging into the SMTP server</value>
        ''' <returns>The current username being used for logging into the SMTP server</returns>
        ''' <remarks></remarks>
        Public Property smtpUser() As String
            Get
                Return _smtpUser
            End Get
            Set(ByVal value As String)
                _smtpUser = value
            End Set
        End Property
        ''' <summary>
        ''' The password to be used for logging into the SMTP server with
        ''' </summary>
        ''' <value>The new password to be used for logging into the SMTP server</value>
        ''' <returns>The current password being used for logging into the SMTP server</returns>
        ''' <remarks></remarks>
        Public Property smtpPass() As String
            Get
                Return _smtpPass
            End Get
            Set(ByVal value As String)
                _smtpPass = value
            End Set
        End Property
        ''' <summary>
        ''' The message to be sent to the recipients
        ''' </summary>
        ''' <value>The new message to be sent to the recipients</value>
        ''' <returns>The current message being sent to the recipients</returns>
        ''' <remarks></remarks>
        Public Property message() As String
            Get
                Return _message
            End Get
            Set(ByVal value As String)
                _message = value
            End Set
        End Property
        ''' <summary>
        ''' The subject of the email
        ''' </summary>
        ''' <value>The new subject for the email</value>
        ''' <returns>The current subject of the email</returns>
        ''' <remarks></remarks>
        Public Property subject() As String
            Get
                Return _subject
            End Get
            Set(ByVal value As String)
                _subject = value
            End Set
        End Property
        ''' <summary>
        ''' The email addresses that the email should be sent to as a Carbon Copy
        ''' </summary>
        ''' <value>The new collection of email addresses that the email should be sent to as a Carbon Copy</value>
        ''' <returns>The current collection of email addresses that the email should be sent to as a Carbon Copy</returns>
        ''' <remarks></remarks>
        Public Property CCs() As List(Of String)
            Get
                Return _ccs
            End Get
            Set(ByVal value As List(Of String))
                _ccs = value
            End Set
        End Property
        ''' <summary>
        ''' The email addresses that the email should be sent to as a Blind Carbon Copy
        ''' </summary>
        ''' <value>The new collection of email addresses that the email should be sent to as a Blind Carbon Copy</value>
        ''' <returns>The current collection of email addresses that the email should be sent to as a Blind Carbon Copy</returns>
        ''' <remarks></remarks>
        Public Property BCCs() As List(Of String)
            Get
                Return _bccs
            End Get
            Set(ByVal value As List(Of String))
                _bccs = value
            End Set
        End Property
        ''' <summary>
        ''' The email addresses that the email should be sent to
        ''' </summary>
        ''' <value>The new collection of email addresses that the email should be sent to</value>
        ''' <returns>The current collection of email addresses that the email should be sent to</returns>
        ''' <remarks></remarks>
        Public Property Tos() As List(Of String)
            Get
                Return _toEmail
            End Get
            Set(ByVal value As List(Of String))
                _toEmail = value
            End Set
        End Property
        ''' <summary>
        ''' The port to be connect to on the SMTP server
        ''' </summary>
        ''' <value>The new port to connect to on the SMTP server</value>
        ''' <returns>The current port to connect to on the SMTP server</returns>
        ''' <remarks></remarks>
        Public Property SMTPPort() As Integer
            Get
                Return _smtpPort
            End Get
            Set(ByVal value As Integer)
                _smtpPort = value
            End Set
        End Property
        ''' <summary>
        ''' Whether the SMTP server should be connected to encrypted
        ''' </summary>
        ''' <value>The new value as to whether the server should be connected to encrypted</value>
        ''' <returns>The current value as to whether the server should be connected to encrypted</returns>
        ''' <remarks></remarks>
        Public Property UseEncryption() As Boolean
            Get
                Return _useEncryption
            End Get
            Set(ByVal value As Boolean)
                _useEncryption = value
            End Set
        End Property
        ''' <summary>
        ''' Whether the email will be HTML format or not
        ''' </summary>
        ''' <value>The new value for whether the email will be HTML format or not</value>
        ''' <returns>The current value of whether the email will be HTML format or not</returns>
        ''' <remarks></remarks>
        Public Property HTMLEmail() As Boolean
            Get
                Return _htmlEmail
            End Get
            Set(ByVal value As Boolean)
                _htmlEmail = value
            End Set
        End Property
#End Region
#Region "Enumerators"
        Public Enum sendEmailResult
            successful = 0
            noToEmails = 1
            noMessage = 2
            noSubject = 3
            noSMTPDetails = 4
            unableToConnect = 5
            attachmentNotAvailable = 6
            unknownError = 99
        End Enum
#End Region
        <Obsolete("This method should no longer be used, instead use the Tos property", True)> _
        Public Sub addToEmail(ByVal emailAddress As String)
            Tos.Add(emailAddress)
        End Sub
        ''' <summary>
        ''' This method deals with adding a new attachment to the email
        ''' </summary>
        ''' <param name="fileLocation">The location of the file to be attached</param>
        ''' <returns>A boolean value specifying whether the file can be attached or not</returns>
        ''' <remarks></remarks>
        Public Function addAttachment(ByVal fileLocation As String) As Boolean
            Dim rtn As Boolean = False
            If IO.File.Exists(fileLocation) Then
                rtn = True
                _attachments.Add(fileLocation)
            End If
            Return rtn
        End Function
        ''' <summary>
        ''' This method deals with getting the collection of all the attachments for this email
        ''' </summary>
        ''' <returns>The collection of attachments for this email</returns>
        ''' <remarks></remarks>
        Public Function getAttachments() As List(Of String)
            Return _attachments
        End Function
        ''' <summary>
        ''' This method deals with removing an existing attachment from the email
        ''' </summary>
        ''' <param name="fileLocation">The location of the file to be removed from the email</param>
        ''' <remarks></remarks>
        Public Sub removeAttachment(ByVal fileLocation As String)
            _attachments.Remove(fileLocation)
        End Sub
        ''' <summary>
        ''' This method deals with checking that all of the attachments are available
        ''' </summary>
        ''' <returns>A boolean value to specify if all the attachments are available</returns>
        ''' <remarks></remarks>
        Private Function attachmentsAreAvailable() As Boolean
            Dim rtn As Boolean = True
            Dim attach As String
            For Each attach In _attachments
                If Not System.IO.File.Exists(attach) Then
                    rtn = False
                    Exit For
                End If
            Next
            Return rtn
        End Function
        Public Function sendEmail() As sendEmailResult
            Dim rtn As sendEmailResult
            Dim mail As MailMessage
            Dim emailAddress As String
            Dim mailClient As SmtpClient
            Dim emailSent As Boolean
            Dim retryCount As Integer = 1
            If _subject.Length > 0 Then
                If _message.Length > 0 Then
                    If Tos.Count > 0 Then
                        If _smtpHost.Length > 0 And _smtpPass.Length > 0 And _smtpUser.Length > 0 Then
                            If attachmentsAreAvailable() Then
                                mail = New MailMessage
                                mail.Body = _message
                                mail.Subject = _subject
                                mail.From = New MailAddress(_smtpUser)
                                If _htmlEmail Then
                                    mail.IsBodyHtml = _htmlEmail
                                    mail.BodyEncoding = System.Text.Encoding.UTF8
                                End If
                                For Each emailAddress In Tos
                                    mail.To.Add(emailAddress)
                                Next
                                For Each emailAddress In CCs
                                    mail.CC.Add(emailAddress)
                                Next
                                For Each emailAddress In BCCs
                                    mail.Bcc.Add(emailAddress)
                                Next
                                For Each attach As String In _attachments
                                    mail.Attachments.Add(New Attachment(attach))
                                Next
                                mailClient = New SmtpClient(_smtpHost)
                                mailClient.UseDefaultCredentials = False
                                mailClient.Credentials = New System.Net.NetworkCredential(_smtpUser, _smtpPass)
                                mailClient.EnableSsl = UseEncryption
                                mailClient.Port = SMTPPort
                                Try
                                    mailClient.Send(mail)
                                    rtn = sendEmailResult.successful
                                    emailSent = True
                                Catch smtpEx As SmtpException
                                    emailSent = False
                                    mailClient.Send(mail)
                                Catch ex As Exception
                                    rtn = sendEmailResult.unknownError
                                    emailSent = False
                                End Try
                                'Try again if the email wasn't sent successfully
                                If emailSent = False Then
                                    System.Threading.Thread.Sleep(1000)
                                    Try
                                        mailClient.Send(mail)
                                        rtn = sendEmailResult.successful
                                    Catch smtpEx As SmtpException
                                        rtn = sendEmailResult.unableToConnect
                                    Catch ex As Exception
                                        rtn = sendEmailResult.unknownError
                                    End Try
                                End If
                                mail.Dispose()
                            Else
                                'Not all of the attachments were available
                                rtn = sendEmailResult.attachmentNotAvailable
                            End If
                        Else
                            'The details for the SMTP wasn't provided
                            rtn = sendEmailResult.noSMTPDetails
                        End If
                    Else
                        'No to email addresses provided
                        rtn = sendEmailResult.noToEmails
                    End If
                Else
                    'The message hasn't been provided
                    rtn = sendEmailResult.noMessage
                End If
            Else
                'The subject hasn't been provided
                rtn = sendEmailResult.noSubject
            End If
            Return rtn
        End Function
    End Class
End Namespace
```

Update log:

Version 1.0.3.3  
Added code that deals with a compatibility issue with some email clients when sending HTML emails.

Version 1.0.3.2  
Fixed bug which meant that the MailMessage object wasn’t being disposed of appropriately.

Version 1.0.3.1  
Added the capability to send HTML emails

Version 1.0.2.2:  
Fixed bug  
Added capability to use encryption when sending the email (tested against Gmail and Live)

Version 1.0.2.1:  
Added capability for attachments  
Added capability for CCs and BCCs  
Depreciated addToEmail function