---
id: 293
title: 'Password storage, how to do it right.'
date: '2013-03-24T00:26:24+00:00'
author: Satal

guid: 'http://blog.satalketo.co.uk/?p=98'
redirect_from:
    - /blog/2013/03/24/password-storage-how-to-do-it-right/
    - /2013/03/24/password-storage-how-to-do-it-right/
permalink: /password-storage-how-to-do-it-right/
snapFB:
    - 's:247:"a:1:{i:0;a:8:{s:4:"doFB";s:1:"1";s:8:"PostType";s:1:"A";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:51:"New post (%TITLE%) has been published on %SITENAME%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snapLI:
    - 's:259:"a:1:{i:0;a:8:{s:4:"doLI";s:1:"1";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:41:"New post has been published on %SITENAME%";s:11:"SNAPformatT";s:18:"New Post - %TITLE%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapTW:
    - 's:268:"a:1:{i:0;a:8:{s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"msgFormat";s:59:"New post (%TITLE%) has been published on %SITENAME% - %URL%";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:2:"do";i:0;}}";'
rank_math_primary_category:
    - ''
rank_math_description:
    - 'Getting the password storage method in your website right is important, make sure that you''re storing them right or risk the wrath of malicious users'
rank_math_focus_keyword:
    - 'password storage'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '131'
categories:
    - All
    - Computer
    - Security
    - Uncategorized
tags:
    - 'Computer Security'
    - Passwords
---

I’ve spoken before in some of my other blog posts (some of which haven’t been finished/published yet) about password storage strategies and how it is important to make sure that you choose the right storage strategy. One of my friends pointed out that while it should be a no-brainer not to store passwords plain text or encrypted I didn’t provide any reasoning for those who aren’t familiar with this, so in that spirit, I thought I would do a post on some of the problems with different storage strategies.

[![A user table where the used password storage strategy is plain text](https://samjenkins.com/wp-content/uploads/2013/03/Usertable2.png "Password storage plain text")](https://samjenkins.com/wp-content/uploads/2013/03/Usertable2.png)  
In my opinion, there are three families of storage strategies, plain text, encryption and hashing. Encryption and hashing can be further broken down according to what encryption or hashing algorithm is used to compute the value but they are still the same family. In the following sections, I will discuss the advantages and disadvantages of each.

### Plain Text

#### Positive sides to storing passwords plain text

- Easily compared – When the user returns to the website and logs in with their username and password you can simply compare the password they sent you and the password that was used during registration, if they are the same then the password is right.
- Forgot my password – You are able to email the user their password when they have forgotten it.

#### Downsides of storing passwords plain text

- Storage size – How much space do you need to allocate to the password? If you’re storing passwords in plain text then for each character of the password you need to allow for that in your database. So if you decide you’re going to allow the user 20 characters to store their password in you need to limit the user to having a password of no longer than 20 characters.
- Another value passed to the database – When we pass a value to the database we need to ensure that it is properly sanitised to avoid SQL Injection. By storing the password as plain text this is another value that we need to ensure that we sanitise properly before passing to the database.
- Instantly readable – This is the obvious major problem with storing passwords in plain text, if a malicious user manages to get access to the database then they instantly know all the usernames and passwords for every user in the system. This is bad enough, but you have to remember that a lot of the time users reuse their passwords on multiple sites, so an attacker could easily write a little program to take the users email address and password and try to log in, once an attacker has access to your email account it’s game over.

### Encryption

#### Positive sides to storing passwords encrypted

- Not immediately readable – If an attacker gets hold of the database then they will not immediately be able to read all the passwords that have been stored, this requires them to get hold of the encryption key that has been used on the plain text.
- Forgot my password – Because encryption can be decrypted it is possible to get hold of the original plain text from the

#### Downsides of storing passwords encrypted

- Still possible to retrieve the plain text – If an attacker manages to get hold of a backup of your website or use SQL Injection to get the encrypted passwords then it may be possible for them to also get hold of the encryption key for the password, in which case it is an easy job for the attacker to retrieve the plain text passwords.
- Storage size – As the length of the encrypted password is dependent on the length of the plain text password it is necessary for you to restrict the length of password the user is able to use.

### Hashing

Hashing is different to encryption in that hashing is a one-way process, hashing is not algorithmically reversible like encryption is. In order to figure out the plaintext for a hash, you need to create the hash for all possible plaintexts until you find a plain text that produces the same hash as what you are looking for. You are able to use pre-computed tables of hashes but at some point, someone has had to go through each of those possible plaintexts and computer the hash.

#### Positive sides of storing passwords hashed

- It’s one way – Once you’ve run a string through a hashing algorithm you cannot run it through another function and receive the plain text back.
- It’s a defined length – It doesn’t matter what length of string that you put into the hashing algorithm whether it be one character or the entire works of Shakespeare the resulting hash will be the exact same length.

#### Downsides of storing passwords hashed

- Pre-computed (Rainbow) tables – In order to avoid repeatedly having to try out every combination of character some people have created pre-computed tables of hashes. These are limited as the size and the ability to search the tables becomes unreasonable after a certain point. This is why pre-computed tables will usually contain hashes for words found in a word list and brute force using a certain number of characters and symbols.
- Collisions – Because no matter what length of the string you put into a hashing algorithm you’ll always get the same length string out, it is inevitable that there will be more than one possible plain text for a single hash. This can be a problem as if you have a nice secure password there is a small chance that an easily guessed password could have the same hash, which the website would believe to be your password.

### Password Storage Summary

So as you can see none of the above solutions is truly perfect, even hashing has the potential of having collisions with easier to guess passwords and attackers being able to use pre-computed tables to look up the plain text. The problem of being able to look up a password from a pre-computed table is an out of the box issue and it is possible to make this harder for an attacker to do with very little work. This can be achieved by using what is referred to as a ‘salt’, a salt is a series of characters which are appended or prepended to a password prior to hashing. What the salt does is mean that if an attacker wishes to brute force all the hashes in a user table then for each user he will have to compute all the values again because each user has a unique salt.

[![Usertable with Hashes](https://samjenkins.com/wp-content/uploads/2013/03/Usertable-with-Hashes.png "User table with Hashes")](https://samjenkins.com/wp-content/uploads/2013/03/Usertable-with-Hashes.png)

Hopefully, you will agree with me that the most appropriate method of storing passwords is to combine the password with a unique salt for that user and to hash the result. By using a unique salt for each user it increases the time commitment for an attacker to get all the passwords. Encryption should only be used in extreme circumstances where you absolutely must be able to retrieve the plain text password (I can’t think of any good reasons off the top of my head) and plain text should never be used as a method for storing passwords.

### Your View

Do you think that I have missed any families of password storage strategies? Do you agree with my conclusions about hashing passwords with a unique salt per user is the most appropriate method or do you feel that I have overlooked the power of plain-text or encrypted passwords?