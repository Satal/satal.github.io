---
title: Setting up rclone through docker
date: '2022-04-15T11:30:11+00:00'

permalink: /rclone-docker-setup/
author: Satal

tags:
  - rclone
  - Docker
---

I run a variety of websites, both for myself and for clients. One thing that is very important to do is to ensure that when you have a decent backup approach in place. I personally achieve this through the use of [WPvivid](https://wpvivid.com/) to perform nightly backups of files and the database to a cloud storage provider.

However, just having the backups saved to a cloud provider isn't always enough. I would feel a lot more comfortable if I had a local copy of them on my NAS (I have a [Synology DiskStation DS1520+](https://amzn.to/3Mb5u6K)).

To achieve this I have been using [rclone](https://rclone.org/), which describes itself as "rsync for cloud storage", running on a Windows virtual machine on the NAS (a great extra for this version of the Synology DiskStation). In this virtual machine I had a scheduled task set up that would run rclone at 06:20 every morning to pull down all the latest updates from the storage provider.

While this solution with the virtual machine worked fine, it annoyed me that I had to have the virtual machine running all the time and that I would have to go in and perform Windows updates to keep it up to date. This is where Docker has come to the rescue.

## Rclone docker image

Rclone provides a [docker image](https://hub.docker.com/r/rclone/rclone) for their tool, which makes it easy to run the tool without having to worry about having it installed.

Unfortunately, while I highly rate their docker image, it does leave quite a bit to be desired when you're looking at their documentation.

One of the first things you need to keep in mind when you're running this docker image is that it will only be running for the short period of time it need to be running to perform the sync.

## Steps to set up rclone docker image

```bash
docker run --rm \
  --volume ~/config/rclone:/config/rclone \
  --volume ~/my_backups:/data \
  rclone/rclone \
  copy pCloud: /data/
```

Let's go through this command line by line. The first line is calling docker with the run command. The `--rm` is telling docker not to persist the file system that is briefly created when we run rclone. While keeping the file system around can help with debugging issues, as we will be running this image frequently we don't want to retain those file systems as they'll start to eat up our space.

The backslashes at the ends of the lines are just saying to the Linux command line that the command continues onto the next line. As this is on all but the final line, I won't be including it in the explanations.

```bash
docker run --rm
```

The next line is mounting the folder that contains the configuration file, which we will talk about more in a bit. You need to remember that the left-hand side is on your system, so set it to wherever you want to store the configuration. Whereas the right-hand side is within rclone, this must be set to `/config/rclone`.

```bash
--volume ~/config/rclone:/config/rclone \
```

We are then specifying the folder that will be used for storing our backups. I've set this to the `my_backups` folder in my home directory. This needs to be mounted into /data within the container

```bash
--volume ~/my_backups:/data
```

We are then specifying that we want to run the `rclone/rclone` image.

```bash
rclone/rclone
```

Finally, we are providing the command that is going to be passed through to the rclone application in the container.

You can find a full list of the commands you can pass into rclone and their required parameters at [https://rclone.org/commands/](https://rclone.org/commands/).

In my case I am telling rclone to copy the contents of my `pCloud` remote site to `/data/websites`

```bash
copy pCloud: /data/websites
```

## Rclone configuration file

One issue that you're likely to come across when you're setting up rclone to work through docker is generating the configuration file. If you're running rclone on a local machine with a display you're able to get rclone to open up a browser to create the necessary configuration file for your connection to your cloud storage provider. However, if you're running rclone through docker you don't have that option.

Currently the recommended way to generate the configuration file is to actually run another copy of it, just for the purposes of creating the `rclone.config` file.

I won't go through the process of creating the `rclone.config` file here, as it depends on what cloud storage provider you're using and, in my opinion, is well documented on the [rclone website](https://rclone.org/docs/#configure).

The key bit here for us is that once you have generated the `rclone.config` file you take that file and place it in the folder that you've specified in the docker command as your configuration folder.
