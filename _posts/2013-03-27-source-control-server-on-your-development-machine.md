---
title: 'Source control server on your development machine'
date: '2013-03-27T21:49:00+00:00'
author: Satal
excerpt: 'Having my source control server on my development machine. Am I going to the deepest level of developer hell?'

redirect_from:
    - /blog/2013/03/27/source-control-server-on-your-development-machine/
    - /2013/03/27/source-control-server-on-your-development-machine/
permalink: /source-control-server-on-your-development-machine/
snapFB:
    - 's:247:"a:1:{i:0;a:8:{s:4:"doFB";s:1:"1";s:8:"PostType";s:1:"A";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:51:"New post (%TITLE%) has been published on %SITENAME%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snapLI:
    - 's:259:"a:1:{i:0;a:8:{s:4:"doLI";s:1:"1";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:41:"New post has been published on %SITENAME%";s:11:"SNAPformatT";s:18:"New Post - %TITLE%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
rank_math_focus_keyword:
    - 'source control'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - 'Team Foundation Server'
    - TFS
    - 'Visual Studio'
---

Please before you skip to the comments section to slate me for having a source control server on my development machine please read the whole post, then feel free to slate me if you feel that I am in the wrong, as a techy I am always happy to hear suggestions on how to better my practices. I have included the screenshot below as I feel that it illustrates some of the many reasons for using source control on your projects, I know I am guilty of the first one more often that I would like to admit, but where’s the fun if you don’t try out new things?

[![Reasons for version control](/assets/images/2013/03/Reasons-for-version-control.png "Reasons for version control")](https://stackoverflow.com/a/1408464/465404)

For years I have been working on personal projects, these could be little applications to automate something that I was doing, research I am doing for work or just messing about trying out the latest fads. Every time I would create a new project and start messing about with code but never set up any form of source control for these projects, why would I, they were just little apps which would have an incredibly short lifespan. Of course, I knew that I would be going to the deepest darkest level of Developer Hell for what I was doing, no source control and no backup! I wasn’t too worried about the backups as if my laptop died then these little applications would be the least of my worries, but the lack of source control didn’t feel like something that I could explain away. Don’t get me wrong here, if I was to be working on a project that was more than just for fun I would be sure to use a source control server that was not based on my development machine.

There are plenty of source control providers out there, SubVersion, TFS, GitHub, Perforce etc., but when thinking about setting up a source control server on my development machine I wanted to have a system that incorporated both source control, feature and bug tracking. While I thought that for my little projects it was unlikely that I would regularly be wanting/needing feature/bug tracking, I thought it would be better to have these capabilities just in case. This narrowed it down to TFS and GitHub, of the two I decided to go with TFS, not because I thought that it was the better of the two – I, in fact, have no experience with either – but because I wanted the server to be stored on my local machine as I regularly work on my laptop without an Internet connection (you should try it sometime, it really makes you realise how much you love Google).

Microsoft has recently released [Visual Studio Team Foundation Server Express 2012](https://www.microsoft.com/visualstudio/eng/products/visual-studio-team-foundation-server-express), which is a free version of Team Foundation Server that is able to be used by up to five developers, which is well beyond what I require as I will be the only one using this. I am quite a fan of Microsoft’s push to providing free cut down versions of their software to enable people who can’t afford the high entrance fee for Visual Studio to get to develop in their language. Obviously, this is with the idea of getting users into coding using their products and then when they go out into industry they’re proficient .NET developers thus more likely to get a job doing .NET development using Visual Studio.

A little while back I tried to set up a simple Team Foundation Server 2010 installation at work, this was something I was doing during my lunch breaks to try and help improve internal processes, but I found the installation/configuration somewhat difficult so it ended up getting left by the wayside. Thankfully TFS Express 2012 has gone to basically the complete opposite, the installation and configuration process it seriously child’s play, I had originally planned on including a brief installation guide here, but after going through the installation again I didn’t feel there was anything that warranted explanation.

The one thing that I will comment on is if you’re using Visual Studio 2010 you will not be able to create new Team Projects through Visual Studio. To create a new Team Project you will need to download and install [Team Explorer](https://www.microsoft.com/visualstudio/eng/downloads#d-team-explorer), which will allow for you to do some of the additional configuration of your TFS server without having Visual Studio 2012 installed.

### Your Views

Do you bother with source controlling your five-minute apps? Do you feel that I am still going to the deepest levels of Developer Hell for having the source control for my five minutes apps on my development machine?