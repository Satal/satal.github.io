---
id: 102
title: 'Comparing two images to see if they are the same'
date: '2010-09-29T02:00:10+00:00'
author: Satal

guid: 'http://satalketo.com/2010/09/comparing-two-images-to-see-if-they-are-the-same/'
redirect_from:
    - /blog/2010/09/29/comparing-two-images-to-see-if-they-are-the-same/
    - /2010/09/29/comparing-two-images-to-see-if-they-are-the-same/
permalink: /comparing-two-images-to-see-if-they-are-the-same/
rank_math_description:
    - 'A C# function for comparing two images to identify whether they are the same'
rank_math_facebook_description:
    - 'A C# function for comparing two images to identify whether they are the same'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '141'
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - 'C#'
---

In this tutorial I’m going to show you how to compare two images to see whether they are the same or not using C#.

```csharp
/// <summary>
/// This method deals with checking whether the two bitmaps that are passed to it are the same or not
/// </summary>
/// <param name="img1">The first image</param>
/// <param name="img2">The second image</param>
/// <returns>True if the images are the same, else false</returns>
public static bool imagesAreTheSame(Bitmap img1, Bitmap img2)
{
    int imgHeight = img1.Height;
    int imgWidth = img1.Width;
    int hCounter = 0;
    int wCounter = 0;
    bool rtn = true;
    string pxl1;
    string pxl2;

    while (hCounter < imgHeight)
    {
        wCounter = 0;
        while (wCounter < imgWidth)
        {
            pxl1 = img1.GetPixel(hCounter, wCounter).ToString();
            pxl2 = img2.GetPixel(hCounter, wCounter).ToString();
            if (pxl1 != pxl2)
            {
                rtn = false;
                break;
            }
            wCounter += 1;
        }
        hCounter += 1;
        if (!rtn)
        {
            break;
        }
    }

    return rtn;
}
```