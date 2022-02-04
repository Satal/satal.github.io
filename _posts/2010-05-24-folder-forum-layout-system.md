---
id: 27
title: 'Folder/Forum layout system'
date: '2010-05-24T10:46:14+00:00'
author: Satal
guid: 'http://satalketo.com/2010/05/folderforum-layout-system/'
permalink: /blog/2010/05/24/folder-forum-layout-system/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '192'
categories:
    - All
    - Computer
    - Programming
---

Recently I was asked to create a web based document repository, where the user wanted to be able to have folders and sub-folders. In this article I’m going to explain the method that I used to allow for there to be folders which can go on theoretically indefinitely, this system can be used for a forum system as well to allow for a forum to have many sub-forums.

Obviously as this system wouldn’t actually be based on a directory system we needed some method of defining the folder structure. With this folder structure we wanted to have the capability for every folder to have as many sub folders as the user wanted but each folder only to have the capability to have one parent, so the method used for achieving this was to have a column in the folders table called ParentFolderID. So the folder table looked something like this

FolderID int identity(1,1),  
FolderName varchar(255),  
ParentFolderID int

So if we wanted to give a folder a parent then we would set the ParentFolderID to the FolderID of the folder that should be its parent.

Now when we add files to the virtual folder structure, we would have to specify the FolderID that the file is supposed to be inside and then from there it would be possible to figure out the complete path of the file by seeing what the parent folder of the current folder was and the parent folder of the parent folder etc. etc.

Well hopefully this will have given you enough of an idea of how you can create a virtual folder structure or a forum layout.