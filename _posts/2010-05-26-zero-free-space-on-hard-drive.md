---
id: 35
title: 'How to zero the free space on your hard drive on Linux'
date: '2010-05-26T23:03:02+00:00'
author: Satal

guid: 'http://satalketo.com/2010/05/how-to-zero-the-free-space-on-your-hard-drive/'
redirect_from:
    - /blog/2010/05/26/zero-free-space-on-hard-drive/
    - /2010/05/26/zero-free-space-on-hard-drive/
permalink: /zero-free-space-on-hard-drive/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '185'
categories:
    - All
    - Computer
    - Security
---

The reason you’re reading this tutorial is probably because you have read about how when you delete a file it isn’t actually deleted only the pointer which tells the OS where to find the file is deleted and you want to reduce the chance of someone being able to recover files that you have deleted from your computer (please bare in mind that the only sure fire way to get rid of all the files from your hard drive is by physically destroying your hard drive).

Tools Required:  
Linux (if you really want you can run this all from a LiveCD like [BackTrack](http://www.backtrack-linux.org/) or the [Ubuntu](http://www.ubuntu.com/) install CD in try mode)

Steps:

1\) Open up terminal

2\) Navigate to the partition you want to zero  
If you have multiple partitions that you want to zero then you will need to go through each of the partitions doing these steps.

3\) Run the following command

```
dd if=/dev/zero of=delete bs=1M
```

What this does is it will create a file called “delete” which is full of zeros. What I found is that the longer you leave it the slower it gets when creating the file, so what I suggest is let it get to something like 20-50GB and press Ctrl + C then run it again but as

```
dd if=/dev/zero of=delete1 bs=1M
```

Which is exactly the same except it will create a file called “delete1”

This will take a bit of time so I suggest that you go grab a book or something (leave your computer alone for a bit to ensure it can work on this as hard as possible).

4\) Keep doing the above until you get an error on your command line saying

```
dd: writing 'delete8': No space left on device
29728+0 records in
29727+0 records out
31172034560 bytes (31 GB) copied, 771.638 s, 40.4 MB/s
```

What this means is you have filled up all the space on that partition. Don’t worry you haven’t deleted any files or anything you’ve just filled in the free space with zeros.

5\) Delete the files that you created above as you have no need for them

You have now zero’d the free space on the partition you selected in step 2 (remember if you want to zero several partitions you will need to do steps 2-5 for each partition separately)

I hope that you have found this tutorial of use and please remember although this will stop someone from just quickly having a look at your hard drive and finding deleted files, it is apparently possible (I am not 100% about this) for information to be recovered even if you write over it several times, for a slightly better way of stopping someone from accessing your deleted files please see my tutorial called “[How to fill your hard drive up with random bits](https://samjenkins.com/fill-hard-drive-with-random-bits/ "How to fill your hard drive up with random bits on Linux")“, which can be combined with this method to again increase the amount of security.

Please bare in mind that all information given here is to the best of my knowledge I give no guarantee of it working for you.