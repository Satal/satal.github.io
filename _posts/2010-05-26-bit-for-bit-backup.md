---
id: 33
title: 'Create a bit for bit backup of a default installation'
date: '2010-05-26T22:34:12+00:00'
author: Satal

guid: 'http://satalketo.com/2010/05/create-a-bit-for-bit-backup-of-a-default-installation/'
redirect_from:
    - /blog/2010/05/26/bit-for-bit-backup/
    - /2010/05/26/bit-for-bit-backup/
permalink: /bit-for-bit-backup/
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '187'
categories:
    - All
    - Computer
    - Security
---

So if any of you are like me you find yourself re-installing Windows/Linux every few months to keep it all nice and clean and get rid of any crap that I’ve picked up since the last install.

If you are then you’ll know the annoyance of having to re-install all your software etc. so I decided to create a tutorial for those people who are like me and have to deal with this annoyance every time they re-install. This method can also be used when you want to create a backup of your computer (or any other storage device you can mount in Linux).

Please note that this isn’t the easiest way of doing a backup please see my tutorial on How to create a backup of a default installation for the other method. The reason that you may want to use this method is if you want to get a copy of every bit on your hard drive, for example you have managed to delete some files and you need to get them back but you also need to have access to the computer as soon as possible.

Tools Required:  
Linux (if you really want you can run this all from a LiveCD like BackTrack or the Ubuntu install CD in try mode)  
Storage for the backup image (it will need to be something you can access from Linux and something of a big enough size to fit your backup)

Steps:  
1\) If you wanted to get a bit for bit backup including all those files that you may of accidental deleted then skip this step and go to step 2.  
What doing this step will mean is that you will have a dramatically smaller backup file than if you don’t. What we are going to do is to fill up all the empty space with zeros this will mean that when you come to compressing the image the file will be a lot smaller, remember the reason that we are doing this is because when you delete a file the file doesn’t actually get removed from the disk, just the pointer saying to the OS where to find the file (that is why if you want to recover files you must NOT do this step).

\* Open up terminal

\* Navigate to the partition you want to backup

\* Run the following command

```
dd if=/dev/zero of=delete bs=1M
```

What this does is it will create a file called “delete” which is full of zeros. What I found is that the longer you leave it the slower it gets when creating the file, so what I suggest is let it get to something like 20-50GB and press Ctrl + C then run it again but as

```
dd if=/dev/zero of=delete1 bs=1M
```

Which is exactly the same except it will create a file called “delete1”

This will take a bit of time so I suggest that you go grab a book or something (leave your computer alone for a bit to ensure it can work on this as hard as possible).

\* Keep doing the above until you get an error on your command line saying

```
dd: writing `delete8’: No space left on device
29728+0 records in
29727+0 records out
31172034560 bytes (31 GB) copied, 771.638 s, 40.4 MB/s
```

What this means is you have filled up all the space on that partition. Don’t worry you haven’t deleted any files or anything you’ve just filled in the free space with zeros.

\* Delete the files that you created above as you have no need for them and probably wont want them when you restore your backup

2\) In this step what we will be doing is actually making the bit for bit backup of the partition you want to backup.

\* If you don’t already have a terminal window open then open one up

\* Run the following command

```
dd if=/dev/sda1 | gzip > /PATH/TO/BACKUP.gz
```

You will need to replace /dev/sda1 with the partition that you want to backup and obviously /PATH/TO/BACKUP.gz to the absolute path and file name of where you want to back up to.

This step can take a very long time, obviously it will take longer the larger the partition you want to backup is for example I recently did a bit for bit backup of my Vista partition which is 300GB with about 30GB of data on it and the free space hadn’t been zero’d I left my computer running for about 3.5 hours and it had only done 185GB of the partition giving me a backup file of about 130GB, at which point I stopped it to test when zero’d which took 1.5 hours and was 9.2GB in size!

3\) Ensure to keep the backup safe  
Remember that this is a backup of your information, if you’ve made a backup of your OS then realise that things like passwords stored for things like Firefox can be accessed through this backup. If you have done a bit for bit backup without zeroing the partition that not only will the current files will be accessible but it will also be possible for files which have been deleted to be retrieved (which is probably why you’ve done the bit for bit backup without zeroing).

4\) Restoring your backup  
There is no point in doing a backup if you’re unable to get the information back. For this step I will assume that your partition is the same partition that you backed up from.  
In order to restore the backup you made you would use one of the following two commands.

```
gunzip -c /PATH/TO/BACKUP.gz | dd of=/dev/sda1
```

Again replacing /dev/sda1 with the partition that you want to restore to and /PATH/TO/BACKUP.gz to the backup file

Supposibly it is possible to restore the backup quicker by setting dd’s buffer size to 1 GB

```
gunzip -c /PATH/TO/BACKUP.gz | dd bs=1048576 of=/dev/sda1
```

I hope that you have found this tutorial of use 🙂

Please bare in mind that all information given here is to the best of my knowledge I give no guarantee of it working for you.