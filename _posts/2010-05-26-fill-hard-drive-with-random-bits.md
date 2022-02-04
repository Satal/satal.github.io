---
id: 34
title: 'How to fill your hard drive up with random bits on Linux'
date: '2010-05-26T22:39:44+00:00'
author: Satal

guid: 'http://satalketo.com/2010/05/how-to-fill-your-hard-drive-up-with-random-bits/'
permalink: /blog/2010/05/26/fill-hard-drive-with-random-bits/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '186'
categories:
    - All
    - Computer
    - Security
---

You have probably read about how when you delete a file it isn’t actually deleted, only the pointer which tells the OS where to find the file is deleted. As people who want to ensure that our data is as secure as possible we don’t want those files just lying around waiting for someone to find your deleted <span style="text-decoration: line-through;">porn stash</span> sensitive files 😉

You may have come from my tutorial on “[How to zero the free space on your hard drive](https://samjenkins.com/zero-free-space-on-hard-drive/ "How to zero the free space on your hard drive on Linux")“, which tells you how to take your hard drive and put a zero in every free bit available. While that method will stop someone from quickly having a look on your computer with a program and finding files, it will not stop the methods which the government supposedly have to be able to get back information from a hard drive even after the information has been written over a couple times. This method will not stop it either but it will make it more difficult, using a combination of this method and the zeroing method you will increase the security.

Please realise that there are professional programs out there which will do a combination of writing all ones, writing all zeros and writing random bits many times (the highest I’ve seen is 48 times, which is a ridiculous amount of times and if it’s possible to get information back after that I would be amazed, but this does take a VERY long time)

Tools Required:  
Linux (if you really want you can run this all from a LiveCD like [BackTrack](http://www.backtrack-linux.org/) or the [Ubuntu](http://www.ubuntu.com/) install CD in try mode)

For this tutorial you have two options  
1\) If you want to fill up your entire hard drive or partition up with random bits  
2\) If you want to fill up the free space on your hard drive with random bits

**If you want to fill up your entire hard drive up with random bits**

Please note you shouldn’t try doing this on your current OS hard drive/partition.

1\) Open up terminal

2\) Run the following command  
If hard drive

```
dd if=/dev/urandom of=/dev/sda
```

If partition

```
dd if=/dev/urandom of=/dev/sda1
```

Obviously you will need to change /dev/sda and /dev/sda1 to what hard drive/partition you wish to use this on.  
This will take a fair amount of time, I tested this on a 1GB partition on my laptop and it took 10 minutes to finish that partition, so doing this on a 300GB partition would take a very long time.

Once dd has finished you will have a hard drive/partition which is filled with random bits.

**If you want to fill up the free space on your hard drive with random bits**  
1\) Open up terminal

2\) Navigate to the partition you want to fill up with random bits  
If you have multiple partitions that you want to fill then you will need to go through each of the partitions doing these steps.

3\) Run the following command

```
dd if=/dev/urandom of=random bs=1M
```

What this does is it will create a file called “random” which is full of random bits. What I found is that the longer you leave it the slower it gets when creating the file, so what I suggest is let it get to something like 20-50GB and press Ctrl + C then run it again but as

```
dd if=/dev/urandom of=random1 bs=1M
```

Which is exactly the same except it will create a file called “random1”.

This will take a bit of time so I suggest that you go grab a book or something (leave your computer alone for a bit to ensure it can work on this as hard as possible), this method will take longer than the zeroing as your computer will be generating random bits which takes a little processing power.

4\) Keep doing the above until you get an error on your command line saying

```
dd: writing 'random8': No space left on device
29728+0 records in
29727+0 records out
31172034560 bytes (31 GB) copied, 771.638 s, 40.4 MB/s
```

What this means is you have filled up all the space on that partition. Don’t worry you haven’t deleted any files or anything you’ve just filled in the free space with random bits.

5\) Delete the files that you created above as you have no need for them