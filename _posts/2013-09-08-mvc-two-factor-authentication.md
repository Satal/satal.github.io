---
id: 520
title: 'Two Factor Authentication in ASP.NET MVC'
date: '2013-09-08T13:51:48+00:00'
author: Satal

guid: 'http://satalketo.com/?p=520'
permalink: /blog/2013/09/08/mvc-two-factor-authentication/
snapLI:
    - 's:259:"a:1:{i:0;a:8:{s:4:"doLI";s:1:"1";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:41:"New post has been published on %SITENAME%";s:11:"SNAPformatT";s:18:"New Post - %TITLE%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snapFB:
    - 's:247:"a:1:{i:0;a:8:{s:4:"doFB";s:1:"1";s:8:"PostType";s:1:"A";s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:51:"New post (%TITLE%) has been published on %SITENAME%";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";b:0;s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";b:0;}}";'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapTW:
    - 's:268:"a:1:{i:0;a:8:{s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"msgFormat";s:59:"New post (%TITLE%) has been published on %SITENAME% - %URL%";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:2:"do";i:0;}}";'
spacious_page_layout:
    - default_layout
rank_math_primary_category:
    - '8'
rank_math_description:
    - 'A demo for how to implement two factor authentication in your ASP.NET MVC 4 Internet application, with a QR code for easy addition to Google Authenticator.'
rank_math_focus_keyword:
    - 'two factor authentication'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '115'
image: /wp-content/uploads/2013/09/TwoFactorAuthentication-1.jpg
categories:
    - All
    - Computer
    - Programming
    - Security
tags:
    - ASP.NET
    - 'C#'
    - MVC
---

It’s becoming more and more common for websites to provide the capability of having two factor authentication as part of you login process. Google, GitHub, Hotmail and Dropbox just to name a few of the organisations that have embraced two factor authentication and provided it as an optional security measure. In this article I will demonstrate how to implement two factor authentication in your ASP.NET MVC application using Google Authentication.![Two Factor Authentication devices](https://samjenkins.com/wp-content/uploads/2013/09/TwoFactorAuthentication.jpg)

## What is two factor authentication?

Two factor authentication is where you use something that you know, a username and password, along with something that you have like an RSA key or a mobile. The second factor is commonly used for generating a one time password which will change over time, for example RSA keys change their code every minute and Google Authenticator changes the code every 30 seconds. What this does is help to mitigate the chance that an attacker is intercepting your web traffic, which if you’re accessing a website that does not use HTTPS will mean that your username and password are plain text, while they may know your username and password without the thing you have they are unable to generate the one time password to go along with your login request to authenticate themselves.

## Implementing two factor authentication

While I will be using ASP.NET MVC to demonstrate this you can do this with any framework you want, the principles will be the same.

## The project

First things first, let’s fire up Visual Studio and create a new ‘ASP.NET MVC 4 Web Application’, selecting the ‘Internet Application’ project template when prompted, I called mine MvcTFA, pretty much does what it says on the tin there.

## ASP.NET Membership

We will be using ASP.NET Membership for the username/password authentication part of the website, there are two reasons for this;

1. I’m lazy! No seriously, that’s a great reason not to write an authentication system, why do something when someone has already written it for you?
2. It’s secure. While I have a reasonable understanding of web security I am not an expert (I know enough to know that I don’t know enough), ASP.NET’s Membership library has had thousands of people reviewing the code and testing it’s implementations trying to find vulnerabilities, these then can be fixed, if I implement my own then it won’t get the same level of peer review unless it get’s really popular, which let’s be honest is unlikely.

The first thing we need to do is install the SQL Server database that our two factor authentication application will be run against, there are two ways of doing this, the command line way or using the wizard. Personally I will be using the command line as that’s how I role \*cheesy grin\*. Open up command prompt and navigate to “C:\\Windows\\Microsoft.NET\\Framework\\v4.0.30319”, if you want to use the wizard then just type in aspnet\_regsql, which will open up the wizard. If you want to install the ASP.NET Membership database through command line then you want to type in something along the lines of the following;

```
<pre class="brush: sql; gutter: true">aspnet_regsql -S .\SQLEXPRESS -E -A all -d MvcTFA

aspnet_regsql -S .\SQLEXPRESS -U Satal -P Password1 -A all -d MvcTFA
```

The first one is using Windows Authentication to log into your SQL Server instance and the second is using the username and password that you have specified. What we have just told aspnet\_regsql to do is to connect to the server (specified with -S, in my case against my local SQL Server Express instance) using the login credentials specified, creating a database called ‘MvcTFA’ (-d MvcTFA) and installing all objects for ASP.NET Membership (-A all). A list of all of the available options for aspnet\_regsql is available on the Microsoft website at [ASP.NET SQL Server Registration Tool (Aspnet\_regsql.exe)](http://msdn.microsoft.com/en-us/library/ms229862(v=vs.100).aspx "ASP.NET SQL Server Registration Tool (Aspnet_regsql.exe)"). Once this has been run, assuming you provided the right details you will now have a full installation for the ASP.NET Membership database, which we will be running our application against. To configure our website to run against this database we need to go to the web.config and modify the connection string to be like one of the following two;

```
<pre class="brush: xml; gutter: true"><connectionStrings>
  <add name="DefaultConnection" connectionString="Server=.\SQLEXPRESS;Database=MvcTFA;Trusted_Connection=True;" providerName="System.Data.SqlClient" />
</connectionStrings>

<connectionStrings>
  <add name="DefaultConnection" connectionString="Server=.\SQLEXPRESS;Database=MvcTFA;User Id=Satal;Password=Password1;" providerName="System.Data.SqlClient" />
</connectionStrings>
```

As above the first one is using Windows Authentication to log into your SQL Server instane and the second is user the username and password that you have specified. Your web application is now configured to use the database that you have created for the ASP.NET Membership.

## User profile

In order for two factor authentication to work, we need to store a secret key for each user on the server, the way we will do this is by storing the secret key and also whether or not the user wants to use two factor authentication or not against the users profile. To specify custom fields in the users profile the first thing we need to do is to create a class defining those fields, this will also contain code to retrieve instances of the profile for the current user or a user that we specify, I placed my class in the root directory of the application as I didn’t feel anywhere else was appropriate for it.

```
<pre class="brush: csharp; gutter: true">using System.Web.Profile;
using WebMatrix.WebData;

namespace MvcTFA
{
    public class MvcTFAProfile : ProfileBase
    {
        private const string SecretKeyPropName = "SecretKey";
        private const string UsesTwoFactorPropName = "UsesTwoFactorAuthentication";

        public static MvcTFAProfile GetCurrent()
        {
            return GetProfile(WebSecurity.CurrentUserName);
        }

        public static MvcTFAProfile GetProfile(string userId)
        {
            return (MvcTFAProfile)Create(userId);
        }

        /// <summary>
        /// The Two Factor secret key for the user
        /// </summary>
        public string SecretKey
        {
            get { return base[SecretKeyPropName] as string; }
            set
            {
                base[SecretKeyPropName] = value;
                Save();
            }
        }

        /// <summary>
        /// Whether or not the user uses two factor authentication on their profile
        /// </summary>
        public bool UsesTwoFactorAuthentication
        {
            get
            {
                object rtn = base[UsesTwoFactorPropName];

                if (!(rtn is bool))
                {
                    rtn = false;
                }

                return (bool)rtn;
            }
            set
            {
                base[UsesTwoFactorPropName] = value;
                Save();
            }
        }
    }
}
```

In the class above we have defined two constants for the profile setting keys. A method which retrieves the current users profile and one where we pass in the username of the user that we want to get the profile for. The two properties are what we are really interested in, these store the secret key as a string and whether or not the user wants to use two factor authentication as a bool. When the user sets the values the configuration entry is changed and we also save the users profile at this point, some people may want to do this themselves in which case remove these lines. We now have the user profile class, which we will be using later on to store the users settings but first we need to configure our application to use this profile over the standard one. This is done through the web.config file, by changing the profile section to look like the following.

```
<pre class="brush: xml; gutter: true"><profile enabled="true" defaultProvider="MvcTfaProvider" inherits="MvcTFA.MvcTFAProfile">
  <providers>
    <add name="MvcTfaProvider" type="System.Web.Profile.SqlProfileProvider" connectionStringName="DefaultConnection"/>
  </providers>
</profile>
```

What this does is to specify that the profile we are using inherits MvcTFA.MvcTFAProfile (or what ever you have named your user profile, you will need to use the fully qualified name including namespace) and that the connection string that should be used for this profile is the DefaultConnection, which we configured in the previous section to point to our ASP.NET Membership database.

## Google Authenticator

We will be focusing our implementation of two factor authentication against Google Authenticator, which creates a new two factor authentication one time password every 30 seconds, based on the number of 30 second intervals since unix time (1970/01/01 00:00:00 UTC). As this functionality is can be re-used across multiple applications and is not specific to just this app I decided to create a class library for storing this in called Domain (original I know). I created a class called GoogleAuthenticator and used code based upon the Stackoverflow answer available [here](http://stackoverflow.com/a/12398317/465404 "Is there a tutorial on how to implement Google Authenticator in .NET apps?"). While the class provided by this answer included a method for displaying the secret key as a QR Code by using an online service provided by Google I decided against using it later in development as most of the time I was working on this I was on the train without Internet access which would have made viewing the QR code rather difficult.

```
<pre class="brush: csharp; gutter: true">using System;
using System.Globalization;
using System.Net;
using System.Security.Cryptography;

namespace MvcTFA.Domain
{
    public class GoogleAuthenticator
    {
        // Based on the code at http://stackoverflow.com/a/12398317/465404
        const int IntervalLength = 30;
        const int PinLength = 6;
        static readonly int PinModulo = (int)Math.Pow(10, PinLength);
        static readonly DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        public static byte[] GenerateSecretKey()
        {
            var secretKey = new byte[10];

            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(secretKey);
            }

            return secretKey;
        }

        /// <summary>
        /// Number of intervals that have elapsed.
        /// </summary>
        static long CurrentInterval
        {
            get
            {
                var elapsedSeconds = (long)Math.Floor((DateTime.UtcNow - UnixEpoch).TotalSeconds);

                return elapsedSeconds / IntervalLength;
            }
        }

        /// <summary>
        /// Generates a QR code bitmap for provisioning.
        /// </summary>
        public byte[] GenerateProvisioningImage(string identifier, byte[] key, int width, int height)
        {
            var keyString = Base32Encoder.ToBase32String(key);
            var provisionUrl = WebUtility.UrlEncode(string.Format("otpauth://totp/{0}?secret={1}", identifier, keyString));

            var chartUrl = string.Format("https://chart.apis.google.com/chart?cht=qr&chs={0}x{1}&chl={2}", width, height, provisionUrl);
            using (var client = new WebClient())
            {
                return client.DownloadData(chartUrl);
            }
        }

        /// <summary>
        /// Generates a pin for the given key.
        /// </summary>
        public string GeneratePin(byte[] key)
        {
            return GeneratePin(key, CurrentInterval);
        }

        /// <summary>
        /// Generates a pin by hashing a key and counter.
        /// </summary>
        static string GeneratePin(byte[] key, long counter)
        {
            const int sizeOfInt32 = 4;

            var counterBytes = BitConverter.GetBytes(counter);

            if (BitConverter.IsLittleEndian)
            {
                //spec requires bytes in big-endian order
                Array.Reverse(counterBytes);
            }

            var hash = new HMACSHA1(key).ComputeHash(counterBytes);
            var offset = hash[hash.Length - 1] & 0xF;

            var selectedBytes = new byte[sizeOfInt32];
            Buffer.BlockCopy(hash, offset, selectedBytes, 0, sizeOfInt32);

            if (BitConverter.IsLittleEndian)
            {
                //spec interprets bytes in big-endian order
                Array.Reverse(selectedBytes);
            }

            var selectedInteger = BitConverter.ToInt32(selectedBytes, 0);

            //remove the most significant bit for interoperability per spec
            var truncatedHash = selectedInteger & 0x7FFFFFFF;

            //generate number of digits for given pin length
            var pin = truncatedHash % PinModulo;

            return pin.ToString(CultureInfo.InvariantCulture).PadLeft(PinLength, '0');
        }
    }
}
```

The code above provides the several methods/properties, the GenerateSecretKey generates a pseudo random secret key, CurrentInterval provides the current interval number (the number of 30 second intervals since unix time, as specified above) and GenerateProvisioningImage as mentioned above provides the secret key as a QR code using an online service provided by Google. The final two methods, GeneratePin (which has two signatures), is what we use to generate the one time password using. The version of GeneratePin that accepts two parameters allows for us to use a challenge and response style one time password, where the website supplies the user with a number, which they enter into Google Authenticator and the result is authenticated (I won’t be covering this style of two factor authentication in this article). We will be using the first version of GeneratePin which will get the current interval and use that as the number to pass into the second version.

## Base32 encoding

When we later generate the QR Code for the user to scan the secret key needs to be Base32 encoded, unfortunately the .NET Framework does not come with a built in Base32 encoder (it has Base64 but that doesn’t work, trust me), so we have to add our own. Again this is not specific to this website so I have placed it in the Domain class library.

```
<pre class="brush: csharp; gutter: true">using System;
using System.Text;

namespace MvcTFA.Domain
{
    public static class Base32Encoder
    {
        // Based on the code at http://stackoverflow.com/a/12398317/465404
        private const string Base32Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        private const int InByteSize = 8;
        private const int OutByteSize = 5;

        /// <summary>
        /// Encode a byte array as a Base32 string
        /// </summary>
        public static string ToBase32String(byte[] data)
        {
            int i = 0, index = 0;
            var builder = new StringBuilder((data.Length + 7) * InByteSize / OutByteSize);

            while (i < data.Length)
            {
                int currentByte = data[i];
                int digit;

                //Is the current digit going to span a byte boundary?
                if (index > (InByteSize - OutByteSize))
                {
                    var nextByte = (i + 1) < data.Length ? data[i + 1] : 0;

                    digit = currentByte & (0xFF >> index);
                    index = (index + OutByteSize) % InByteSize;
                    digit <<= index;
                    digit |= nextByte >> (InByteSize - index);
                    i++;
                }
                else
                {
                    digit = (currentByte >> (InByteSize - (index + OutByteSize))) & 0x1F;
                    index = (index + OutByteSize) % InByteSize;

                    if (index == 0)
                    {
                        i++;
                    }
                }

                builder.Append(Base32Alphabet[digit]);
            }

            return builder.ToString();
        }

        public static byte[] FromBase32String(string input)
        {
            // Based on the code here: http://stackoverflow.com/a/7135008/465404
            if (string.IsNullOrEmpty(input))
            {
                throw new ArgumentNullException("input");
            }

            input = input.TrimEnd('='); //remove padding characters
            var byteCount = input.Length * OutByteSize / InByteSize; //this must be TRUNCATED
            var returnArray = new byte[byteCount];

            byte curByte = 0, bitsRemaining = 8;
            var arrayIndex = 0;

            foreach (var c in input)
            {
                var cValue = CharToValue(c);
                int mask;

                if (bitsRemaining > 5)
                {
                    mask = cValue << (bitsRemaining - 5);
                    curByte = (byte)(curByte | mask);
                    bitsRemaining -= 5;
                }
                else
                {
                    mask = cValue >> (5 - bitsRemaining);
                    curByte = (byte)(curByte | mask);
                    returnArray[arrayIndex++] = curByte;
                    curByte = (byte)(cValue << (3 + bitsRemaining));
                    bitsRemaining += 3;
                }
            }

            //if we didn't end with a full byte
            if (arrayIndex != byteCount)
            {
                returnArray[arrayIndex] = curByte;
            }

            return returnArray;
        }

        private static int CharToValue(char c)
        {
            var value = (int)c;

            //65-90 == uppercase letters
            if (value < 91 && value > 64)
            {
                return value - 65;
            }
            //50-55 == numbers 2-7
            if (value < 56 && value > 49)
            {
                return value - 24;
            }
            //97-122 == lowercase letters
            if (value < 123 && value > 96)
            {
                return value - 97;
            }

            throw new ArgumentException("Character is not a Base32 character.", "c");
        }
    }
}
```

In the Base32Encoder class I have included both to base32 and from base32 as I decided to store the secret key encoded as a string in the database, making it easier for when the user wants to get the QR code, but this does mean that we need to be able to retrieve the byte array secret key to use when figuring out if the two factor authentication one time password the user has provided was correct.

## Registration

A design decision that I made was that when the user registers their two factor authentication secret key will be generated and stored with their profile, I could have decided to generate this at some later point like when they went to opt in to using two factor authentication against their account but during the registration process felt appropriate to me. So in order to do that we need to modify the HttpPost Register action within the AccountController.

```
<pre class="brush: csharp; gutter: true">[HttpPost]
[AllowAnonymous]
[ValidateAntiForgeryToken]
public ActionResult Register(RegisterModel model)
{
    if (ModelState.IsValid)
    {
        // Attempt to register the user
        try
        {
            WebSecurity.CreateUserAndAccount(model.UserName, model.Password);
            WebSecurity.Login(model.UserName, model.Password);

            // Create the two factor secret key
            var profile = MvcTFAProfile.GetProfile(model.UserName);
            profile.SecretKey = Base32Encoder.ToBase32String(GoogleAuthenticator.GenerateSecretKey());

            return RedirectToAction("Index", "Home");
        }
        catch (MembershipCreateUserException e)
        {
            ModelState.AddModelError("", ErrorCodeToString(e.StatusCode));
        }
    }

    // If we got this far, something failed, redisplay form
    return View(model);
}
```

What I have done in the action is retrieved a copy of the newly registered users profile and then using the GoogleAuthenticator class generated a secret key, which is the stored within the users profile for later use.

## QR Code and opting in

At the moment we are storing the user’s two factor authentication secret key Base32 encoded within their profile, while users are able to take this Base32 encoded string and enter it manually into Google Authenticator, those fleshy things called humans are rather error prone and are likely to make a mistake, so to help them Google Authenticator allows for users to scan a QR Code which will allow for the secret key to be loaded automatically. This makes things easier for the user and also it is less likely that the user will make a mistake, which is a good thing. As mentioned above, while it is possible to use an external web service for generating the QR code I opted to use a library which would generate the QR code for me, this was primarily because I did my development on a train with no Internet connection, but it is also worth while avoiding becoming reliant on external web services where easily possible. The library I used for this is [QRCode.NET](http://qrcodenet.codeplex.com/documentation "QR Code.NET"), feel free to use different libraries if you want, this is just the one that I happened to choose.

To make generating the QR code easier within the view I decided to create a helper class to deal with all the bits to do with generating the QR code.

```
<pre class="brush: csharp; gutter: true">using Gma.QrCodeNet.Encoding;
using Gma.QrCodeNet.Encoding.Windows.Controls;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Web;
using System.Web.Mvc;

namespace MvcTFA.Helpers
{
    public static class QrHelper
    {
        public static IHtmlString QRCode(this HtmlHelper html, string content)
        {
            var enc = new QrEncoder(ErrorCorrectionLevel.H);
            var code = enc.Encode(content);

            var r = new Renderer(5, Brushes.Black, Brushes.White);

            using (var ms = new MemoryStream())
            {
                r.WriteToStream(code.Matrix, ms, ImageFormat.Png);

                var image = ms.ToArray();

                return html.Raw(string.Format(@"<img src=""data:image/png;base64,{0}"" alt=""{1}"" />", Convert.ToBase64String(image), content));
            }
        }
    }
}
```

Now that we have the QR Code helper, within the AccountController I decided to add a UserProfile action that would allow for the user to view their secret key in QR Code form and to allow for them to opt into using two factor authentication on the profile. As you will notice I included the ValidateAntiForgeryToken attribute on the actions to disallow people making automated calls to the action.

```
<pre class="brush: csharp; gutter: true">[HttpGet]
public ActionResult UserProfile()
{
    var model = new UserProfileModel();
    var profile = MvcTFAProfile.GetCurrent();

    // We need this to generate the QR code
    model.AppName = ConfigurationManager.AppSettings["AppName"];
    model.UsesTwoFactor = profile.UsesTwoFactorAuthentication;
    model.SecretKey = profile.SecretKey;

    return View(model);
}

[HttpPost]
[ValidateAntiForgeryToken]
public ActionResult UserProfile(UserProfileModel model)
{
    if (ModelState.IsValid)
    {
        var profile = MvcTFAProfile.GetCurrent();
        profile.UsesTwoFactorAuthentication = model.UsesTwoFactor;
    }

    // We need this to generate the QR code
    model.AppName = ConfigurationManager.AppSettings["AppName"];

    return View(model);
}

and the view for the actions.
```

```
<pre class="brush: csharp; gutter: true">@using MvcTFA.Helpers
@model MvcTFA.Models.UserProfileModel

@{
    ViewBag.Title = "Profile";
}

<h2>@ViewBag.Title</h2>

@using (Html.BeginForm())
{
    @Html.AntiForgeryToken()
    <div>
        @Html.LabelFor(m => m.UsesTwoFactor)
        @Html.CheckBoxFor(m => m.UsesTwoFactor)
        @Html.ValidationMessageFor(m => m.UsesTwoFactor)
    </div>
    <div>
        @Html.LabelFor(m => m.SecretKey)
        @Html.QRCode(string.Format("otpauth://totp/{0}?secret={1}", Model.AppName, Model.SecretKey))
    </div>
    <div>
        <input type="submit" value="Update" />
    </div>
}
```

We now have enough to allow the users to register for our website, to opt into using two factor authentication and for them to scan their two factor authentication secret key into their Google Authenticator app, but we haven’t yet made the appropriate changes to the login to prompt the user for their two factor authentication one time password if they have opted in.

## Login

During my research for this article one of the things that I found is that there are a fair few articles out there covering implementing two factor authentication which missed a major issue. What they were doing was asking the user to log in then once they had logged in they were redirected to a page to ask for their one time password, the problem was that the way they had implemented the code it would log them into the website before being redirected, so all the user had to do was navigate to another page and they would have bypassed the whole two factor authentication system, not exactly optimal.

In order to do this correctly we need to do in order to implement this correctly is to validate the users username and password is correct then pass them to the two factor authentication step without logging them in. Thankfully the ASP.NET Membership library provides us with a way of achieving this through Membership.ValidateUser, which provided with a username and password will validate the credentials returning a boolean. Once we have identifier the user has provided the correct username/password combination we need to check whether or not the user has opted in to using two factor authentication on their account, if they haven’t then we log them into the website and then redirect them to the appropriate location. If the user has opted into two factor authentication then we put the profile into the temporary data store along with whether or not the user has asked to be remembered, which we will use later on.

```
<pre class="brush: csharp; gutter: true">[HttpPost]
[AllowAnonymous]
[ValidateAntiForgeryToken]
public ActionResult Login(LoginModel model, string returnUrl)
{
    if (ModelState.IsValid)
    {
        if (Membership.ValidateUser(model.UserName, model.Password))
        {
            var profile = MvcTFAProfile.GetProfile(model.UserName);

            if (profile.UsesTwoFactorAuthentication)
            {
                TempData[CurrentUserTempDataKey] = profile;
                TempData[RememberMeTempDataKey] = model.RememberMe;
                return RedirectToAction("SecondFactor", new {returnUrl = returnUrl});
            }

            FormsAuthentication.SetAuthCookie(model.UserName, model.RememberMe);
            return RedirectToLocal(returnUrl);
        }
    }

    // If we got this far, something failed, redisplay form
    ModelState.AddModelError("", "The user name or password provided is incorrect.");
    return View(model);
}
```

Now that we have changed the login action so that it will check to see if the user has opted into two factor authentication or not we need to provide the user the capability to provide the one time password generated by their Google Authenticator app.

```
<pre class="brush: csharp; gutter: true">[HttpGet]
[AllowAnonymous]
public ActionResult SecondFactor(string returnUrl)
{
    return View(new SecondFactorModel());
}

[HttpPost]
[AllowAnonymous]
[ValidateAntiForgeryToken]
public ActionResult SecondFactor(SecondFactorModel model, string returnUrl)
{
    var ga = new GoogleAuthenticator();

    var user = TempData[CurrentUserTempDataKey] as MvcTFAProfile;
    TempData.Keep();

    if (user != null)
    {
        var secretKey = Base32Encoder.FromBase32String(user.SecretKey);
        var currentInterval = GoogleAuthenticator.CurrentInterval;
        var secondFactorMatched = false;

        // The currentInterval +- 1 has been added to allow for devices which are slightly out of sync
        // to connect still, this does decrease the security of the application slightly but I feel that
        // the modification is an acceptable usability/security compromise.
        if (GoogleAuthenticator.GeneratePin(secretKey, currentInterval) == model.SecondFactor)
        {
            secondFactorMatched = true;
        }
        else if (GoogleAuthenticator.GeneratePin(secretKey, currentInterval + 1) == model.SecondFactor)
        {
            secondFactorMatched = true;
        }
        else if (GoogleAuthenticator.GeneratePin(secretKey, currentInterval - 1) == model.SecondFactor)
        {
            secondFactorMatched = true;
        }

        if (secondFactorMatched)
        {
            var rememberMe = TempData[RememberMeTempDataKey] != null && (bool)TempData[RememberMeTempDataKey];
            FormsAuthentication.SetAuthCookie(user.UserName, rememberMe);
            return RedirectToLocal(returnUrl);
        }

        ModelState.AddModelError("SecondFactor", "The one time password you speccified is incorrect");
    }
    else
    {
        ModelState.AddModelError("", "A problem occurred while retrieving your session");
    }

    return View(model);
}
```

When the user has provided the two factor authentication one time password generated by their device we need to check it against what we think it should be, if the numbers don’t match then we tell the user to try again, if they match then we log the user into the application retrieving the ‘remember me’ choice they made earlier and then redirecting them appropriately. Finally let’s provide a view for the action allowing them to provide their one time password.

```
<pre class="brush: csharp; gutter: true">@model MvcTFA.Models.SecondFactorModel

@{
    ViewBag.Title = "Second factor";
}

<h2>@ViewBag.Title</h2>

@using (Html.BeginForm())
{
    @Html.AntiForgeryToken()
    <div>
        @Html.LabelFor(m => m.SecondFactor)
        @Html.TextBoxFor(m => m.SecondFactor)
        @Html.ValidationMessageFor(m => m.SecondFactor)
    </div>
    <div>
        <input type="submit" value="Login"/>
    </div>
}
```

You have now created your own ASP.NET MVC application which implements two factor authentication for it’s users, so go ahead start the project running, register for an account, opt in, load the secret key into Google Authenticator using the QR code, which is then prompted for the next time you log into your account.

## The code

I’m starting to put all of my code onto GitHub so that it is easily available for everyone to download and also to allow for people to make suggestions to things that I can improve on the code. So if you would like to download the full Visual Studio 2012 solution it is available at <https://github.com/Satal/TwoFactorAuth>. Please feel free to fork it or pull it and make improvements to the code if you want.