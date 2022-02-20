---
id: 640
title: 'NodaTime: What date time is it?'
date: '2013-12-21T22:49:46+00:00'
author: Satal

guid: 'http://satalketo.com/?p=640'
redirect_from:
    - /blog/2013/12/21/nodatime-what-date-time-is-it/
    - /2013/12/21/nodatime-what-date-time-is-it/
permalink: /nodatime-what-date-time-is-it/
snapFB:
    - 's:274:"a:1:{i:0;a:9:{s:4:"doFB";s:1:"1";s:8:"PostType";s:1:"A";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:51:"New post (%TITLE%) has been published on %SITENAME%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;s:11:"isPrePosted";s:1:"1";}}";'
snapLI:
    - 's:286:"a:1:{i:0;a:9:{s:4:"doLI";s:1:"1";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:41:"New post has been published on %SITENAME%";s:11:"SNAPformatT";s:18:"New Post - %TITLE%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;s:11:"isPrePosted";s:1:"1";}}";'
snap_isAutoPosted:
    - '1'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapTW:
    - 's:395:"a:1:{i:0;a:12:{s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:11:"isPrePosted";s:1:"1";s:8:"isPosted";s:1:"1";s:4:"pgID";s:18:"414550390966059008";s:5:"pDate";s:19:"2013-12-22 00:18:07";s:9:"msgFormat";s:59:"New post (%TITLE%) has been published on %SITENAME% - %URL%";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:2:"do";i:0;}}";'
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_description:
    - 'A brief introduction to NodaTime, showing how we can use it to mock out the date time allowing us to create testable time sensitive code'
rank_math_focus_keyword:
    - 'date time'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '109'
image: /wp-content/uploads/2013/12/Time_Flies_by_janussyndicate-1.jpg
categories:
    - All
    - Computer
    - Programming
tags:
    - 'C#'
    - Time
    - 'Unit Testing'
---

If you have ever developed an application that is time sensitive you’ll appreciate just how much of a nightmare it can be to get right. Do you handle users in a different time zone to you? Do you handle day light savings? Do you handle leap seconds/days?

[![Time_Flies_by_janussyndicate](/assets/images/2013/12/Time_Flies_by_janussyndicate.jpg "Time_Flies_by_janussyndicate")](http://janussyndicate.deviantart.com/art/Time-Flies-85400304 "Time Flies by janussyndicate")

When we develop code that is error prone or we know it requires special care over making sure that we got the implementation correct we tend to check that it works through the use of unit tests. The problem that we face though is that writing unit tests that confirm date time specific functionality is correct can be problematic and potentially so troublesome so that you to avoid writing tests for that area of the application.

I’ve recently learnt about a library developed by [Jon Skeet](http://stackoverflow.com/users/22656/jon-skeet "Jon Skeet's Profile on StackOverflow") that deals with date times and while I’m sure it does plenty more than this the functionality that really got me excited is that it is designed in a fashion to allow for us to unit test date times more easily. To demonstrate how this is achieved I will run through an example that Jon has provided where we are testing a very basic licensing system.

## Our Licence

To show the issues of testing our time sensitive functionality we are going to use a very simple licensing class, that compares the current time to a time that is passed in as a parameter, which looks like this;

```csharp
using System;

namespace NodaTimeTrial
{
    public class Licence
    {
        private readonly DateTime _expiryDateTime;

        public Licence(DateTime expiryDateTime)
        {
            _expiryDateTime = expiryDateTime;
        }

        public bool HasExpired
        {
            get { return DateTime.UtcNow > _expiryDateTime; }
        }
    }
}
```

As I mentioned this is a very simple class all we are doing is receiving an expiry date time as a parameter to our constructor. This expiry date time is used in the HasExpired property which returns true if the current time ([in UTC](http://blogs.msdn.com/b/kirillosenkov/archive/2012/01/10/datetime-utcnow-is-generally-preferable-to-datetime-now.aspx "Why DateTime.UtcNow is preferred over DateTime.Now for internal processes")) is greater than the expiry time.

Now lets write some unit tests around this piece of functionality. What we want to check is if the expiry date time has passed HasExpired will return true and if the expiry date time is in the future HasExpired will return false.

```csharp
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace NodaTimeTrial.Test
{
    [TestClass]
    public class LicenceTests
    {
        [TestMethod]
        public void ExpiredLicence()
        {
            var licence = new Licence(new DateTime(2000, 01, 01, 01, 01, 01));
            Assert.IsTrue(licence.HasExpired);
        }

        [TestMethod]
        public void NonExpiredLicence()
        {
            var licence = new Licence(new DateTime(2020, 01, 01, 01, 01, 01));
            Assert.IsFalse(licence.HasExpired);
        }
    }
}
```

For the expired licence test we are using 1st Jan 2000 which is in the past and for the non expired licence test we are using 1st Jan 2020 which is in the future. After running these two unit tests both of them pass, which is exactly what we expect them to do, the problem is that while the unit tests pass they aren’t perfect. The way that the NonExpiredLicence test is written it will fail after the 1st Jan 2020 as we have hard coded the date time, while we can get around that by writing code to generate a date time that is in the future we should start feel our spidy senses tingling that not everything is optimal here. What happens if we want to test what happens when the current time is the same as the expiry time? We could write a unit test that passes DateTime.UtcNow when creating the Licence object but this then becomes dependent on the time not progressing in the tiny amount of time between creating the Licence object. We are likely to scoff at this as it is such a minute possibility but it is something that could occur and it is the sort of error case which you’re unlikely to be able to reproduce yourself, but in a more serious application may be problematic to get wrong.

## Using NodaTime to set the date time

So what was the problem with the previous tests? We had no control over the current date time, we want our unit tests to be simple, deterministic and repeatable. To do this we ideally want to be able to control as much about what is being used within the tested functionality as possible. When we are testing applications which have data access we will regularly implement the [Repository pattern](http://msdn.microsoft.com/en-us/library/ff649690.aspx "MSDN: The Repository Pattern") to allow us to swap out the real version for a mocked version, this allows us to create a version that we can have a greater control over its state and therefore can be certain about what we are going to receive. What Jon has done is to allow us to do the same thing with the date time.

The way that Jon has allowed for us to mock out the date time in the NodaTime library is to create an IClock interface, using this IClock interface we can either use a real implementation, which will return the actual UTC time or to create a mocked version that will return what ever date time we tell it to. So lets go back to the Licence class and see how it needs to be changed to allow for us to use NodaTime and make it more testable.

```csharp
using NodaTime;

namespace NodaTimeTrial
{
    public class Licence
    {
        private readonly Instant _expiryInstant;
        private readonly IClock _clock;

        public Licence(Instant expiryInstant, IClock clock)
        {
            _expiryInstant = expiryInstant;
            _clock = clock;
        }

        public bool HasExpired
        {
            get { return _clock.Now > _expiryInstant; }
        }
    }
}
```

We now have two properties in out class, one containing an Instant, this is an instant in time that will represent the expiry date time. We also have our IClock interface, which we will use for getting the time, which in our unit tests will be a fake implementation that will return a date time specified by us and for live code we would use a real implementation of IClock which will return the current UTC time. The constructor of Licence has changed to require the two fields are provided to the class and our HasExpired property checks the expiry instance against the date time returned by the IClock. Let’s have a look at the unit tests and see how they have been changed.

```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NodaTime;
using NodaTime.Testing;

namespace NodaTimeTrial.Test
{
    [TestClass]
    public class LicenceTests
    {
        [TestMethod]
        public void ExpiredLicence()
        {
            var expiryInstant = Instant.FromUtc(2000, 01, 01, 01, 01, 01);
            var stubClock = new FakeClock(expiryInstant.PlusTicks(1));
            var licence = new Licence(expiryInstant, stubClock);
            Assert.IsTrue(licence.HasExpired);
        }

        [TestMethod]
        public void NonExpiredLicence()
        {
            var expiryInstant = Instant.FromUtc(2000, 01, 01, 01, 01, 01);
            var stubClock = new FakeClock(expiryInstant.PlusTicks(-1));
            var licence = new Licence(expiryInstant, stubClock);
            Assert.IsFalse(licence.HasExpired);
        }

        [TestMethod]
        public void LicenceWithCurrentExpiryDateTime()
        {
            var expiryInstant = Instant.FromUtc(2000, 01, 01, 01, 01, 01);
            var stubClock = new FakeClock(expiryInstant);
            var licence = new Licence(expiryInstant, stubClock);
            Assert.IsFalse(licence.HasExpired);
        }
    }
}
```

As you can see we are creating an Instant of the expiration date time by using the FromUtc to specify the date time in UTC. This Instant is also used when we are creating our fake IClock as a base time, which we add or subtract a tick from depending on whether or not we are trying to check that the Licence expires correctly.

A third unit test has been added, this uses the Instant as the time that the fake IClock will report as being the current time. This allows us to easily test that the Licence does what is expected of it in this scenario in a way which doesn’t rely on there not having been a change in the time between the creation of the Licence and checking whether the Licence has expired or not.

I hope that you’ll agree that this provides a nice way of allowing for unit testing to be done in a more deterministic fashion against functionality that is date time sensitive. As this is not directly compatible with the existing code I will probably not be going back to my previous projects and start using this but I will most likely start to use NodaTime with any green field projects that I start working on in the future.