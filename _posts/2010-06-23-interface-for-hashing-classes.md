---
title: 'Interface for Hashing classes'
date: '2010-06-23T21:50:43+00:00'
author: Satal

redirect_from:
    - /blog/2010/06/23/interface-for-hashing-classes/
    - /2010/06/23/interface-for-hashing-classes/
permalink: /interface-for-hashing-classes/
categories:
    - All
    - Computer
    - Programming
    - Security
tags:
    - VB.NET
---

The following code is the interface that I have created for a series  
of classes that I am creating that will deal with getting the hash of a  
particular string or file.

```vbnet
''' Hashing interface from Satal Keto's library
''' https://samjenkins.com
''' Version 1.0.0.1
'''
Namespace Security.Hash
    Public Interface IHasher
        Function hashOfString(ByVal stringToHash As String) As String
        Function hashOfFile(ByVal fileToHash As String) As String
    End Interface
End Namespace
```

The classes that I have created that implement  
this interface are;

- [MD5Hasher](https://samjenkins.com/md5-hash-of-string-or-file/ "Calculate MD5 hash of string or file")
- [RIPEMD160Hasher](https://samjenkins.com/ripemd160-hash-of-string-or-file/ "Calculate RIPEMD160 Hash of string or file")
- [SHA1Hasher](https://samjenkins.com/sha1-hash-of-string-or-file/ "Calculate SHA1 hash of string or file")
- [SHA256Hasher](https://samjenkins.com/sha256-hash-of-string-or-file/ "Calculate SHA256 hash of string or file")
- [SHA384Hasher](https://samjenkins.com/sha384-hash-of-string-or-file/ "Calculate SHA384 hash of string or file")
- [SHA512Hasher](https://samjenkins.com/sha512-hash-of-string-or-file/ "Calculate SHA512 hash of string or file")