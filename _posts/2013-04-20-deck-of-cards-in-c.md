---
id: 340
title: 'Deck of Cards in C#'
date: '2013-04-20T21:44:28+00:00'
author: Satal

guid: 'http://satalketo.com/?p=340'
permalink: /blog/2013/04/20/deck-of-cards-in-c/
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
    - 'The code to create a deck of cards in C# with downloadable solution and unit tests to prove reliability.'
rank_math_focus_keyword:
    - 'Deck of Cards'
rank_math_robots:
    - 'a:1:{i:0;s:5:"index";}'
rank_math_internal_links_processed:
    - '1'
rank_math_analytic_object_id:
    - '127'
image: /wp-content/uploads/2013/04/playing-cards-1.jpg
categories:
    - All
    - Computer
    - Programming
    - Uncategorized
tags:
    - 'C#'
---

So this is something I have seen a number of times on [StackOverflow](http://stackoverflow.com/ "StackOverflow"), so I thought I would spend some time while I was on a ferry creating a solution for. So what we have is a standard deck of cards, 52 cards (no jokers), 4 suits (Clubs, Diamonds, Hearts and Spades) each with 13 cards (ace through to king). In this post I will go through the code that has been produced and at the bottom of the post there is a download link for the entire solution, unit tests and all.

[![Deck of Cards](https://samjenkins.com/wp-content/uploads/2013/04/playing-cards.jpg)](https://samjenkins.com/wp-content/uploads/2013/04/playing-cards.jpg)

   
Source: <http://www.leadersinstitute.com/wp-content/uploads/2011/02/playing-cards.jpg>

### Suit Enum

```csharp
namespace Cards.Domain.Standard
{
    public enum Suit
    {
        Club = 1,
        Diamond = 2,
        Heart = 3,
        Spades = 4,
    }
}
```

### Card Number Enum

I decided to use an enum for the card number as well as for the suit as rather than having numbers directly for the card number I could have an appropriate value, which could be given an Attribute to allow for further information to be associated with it.

```csharp
namespace Cards.Domain.Standard
{
    public enum CardNumber
    {
        Ace = 1,
        Two = 2,
        Three = 3,
        Four = 4,
        Five = 5,
        Six = 6,
        Seven = 7,
        Eight = 8,
        Nine = 9,
        Ten = 10,
        Jack = 11,
        Queen = 12,
        King = 13,
    }
}
```

### Card class

The card class is extremely simple, it is just two properties, one for the suit and one for the card number.

```csharp
namespace Cards.Domain.Standard
{
    public class Card
    {
        public Suit Suit { get; set; }
        public CardNumber CardNumber { get; set; }
    }
}
```

### Deck class

The Deck class is where most of the interesting stuff happens.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

namespace Cards.Domain.Standard
{
    public class Deck
    {
        public Deck()
        {
            Reset();
        }

        public List<Card> Cards { get; set; }

        public void Reset()
        {
            Cards = Enumerable.Range(1, 4)
                .SelectMany(s => Enumerable.Range(1, 13)
                                    .Select(c => new Card()
                                    {
                                        Suit = (Suit)s,
                                        CardNumber = (CardNumber)c
                                    }
                                            )
                            )
                   .ToList();
        }

        public void Shuffle()
        {
            Cards = Cards.OrderBy(c => Guid.NewGuid())
                         .ToList();
        }

        public Card TakeCard()
        {
            var card = Cards.FirstOrDefault();
            Cards.Remove(card);

            return card;
        }

        public IEnumerable<Card> TakeCards(int numberOfCards)
        {
            var cards = Cards.Take(numberOfCards);

            var takeCards = cards as Card[] ?? cards.ToArray();
            Cards.RemoveAll(takeCards.Contains);

            return takeCards;
        }
    }
}
```

#### Reset

This method uses a nice piece of LINQ to generate all the required cards for the standard 52 card deck and populate the Cards property of the deck. This method is called by the constructor to set up the Deck class.

#### Shuffle

When the cards are generated they are created in an ordered fashion, this method orders all the cards randomly again using LINQ.

#### TakeCard

This method as the name suggests takes a card from the Deck. It will get the next Card in the Deck and return it, removing it from the Cards collection so it can’t be taken again. If there are no more Cards in the Deck then this method will return a null.

#### TakeCards

This method is like TakeCard although it allows for the user to take more than one Card. I made a design decision to return the requested amount or the remainder of the Cards in the Deck, so if the user asks for five Cards but there are only three left, then it will return those three, although some might say that as we are not able to correctly fulfil the request we should be throw an exception.

### Deck of Cards usage

The deck of cards code can be used to implement your own card game software, a solitaire, poker game etc. the code it pretty simple and well defined so shouldn’t require much in the way of adjustments for any standard 52 card deck game. If you want to add Jokers then that will require a little more work but nothing too major (I’m just not too sure about their usage in games so I thought I would leave them out).

Anyway the solution that I produced for the deck of cards is available for download here ([Deck of Cards in C#](https://samjenkins.com/wp-content/uploads/2013/04/Cards.zip))