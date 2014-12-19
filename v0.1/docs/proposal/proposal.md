#Team FeedMe
![text](../../pics/feedme_logo.png)


##Team Members

**Zack Hardy**: Project Manager, Back-End Javascript Coordinator

> I grew up in central Massachusetts. I am a senior BDIC Major with a concentration titled Writing in the Computer Sciences. I work for the Writing Center on campus and WMUA, the radio station at UMass. I also work for BDIC as a peer coordinator to help people design their majors. I love teaching people how to teach themselves and this philosophy is really the driving force behind my programming interests. I love coding and usually have Netflix up on one screen while I'm testing and redeveloping code in another. I love multi-tasking!

**Tengiz Vachnadze**: Front-End Javascript Developer

> I am currently a junior CS major focusing on Software Engineering, from Tbilisi, Georgia. I am interested in front end web programming and consider myself a fast and independent learner. I like applications that are simple to use and nice to look at. That's why I'll be focusing on the UI of the app.

**Benjamin Tibbetts**: Back-End Developer, Co-Designer

> I am a Linguistics major and Computer Science minor, with a specific interest in the field of computational linguistics. I'm from the beautiful Midcoast region of the state of Maine. I enjoy writing in addition to writing code. My favorite language is Python and Java is a close second. I am new to web programming, but I'm learning fast and adapting to Javascript. In my spare time, I enjoy playing piano and binge-watching Netflix.

**Luke Leheny**: Front-End Style Editor, Documentor

> I am a fifth year Computer Science undergrad. I'm from Providence, RI. I have very little experience working on team projects, but I am eager to learn and put new knowledge to use. My strongest languages are Java and C/C++. I have taken an interest in style and usability of applications, and I believe I will be able to use my enthusiasm to take part in front-end development on this project. In addition to computer science, I am very passionate about music. In my spare time, I write and play music.

**Josh McDuffie**: Back-End Database Architect

> I am a student at the University of Massachusetts Amherst and currently in my fifth year of undergrad working towards a BS in Computer Science with a focus in Artificial Intelligence. I was born and raised in Worcester, the heart of Massachusetts. I am most interested in back-end development and creating simplistic and efficient systems. Outside of academics I enjoy scuba diving and am working on becoming Advanced Scuba Certified.

##Problem Statement
> by Zack Hardy (10/01/2014)

One of the major problems explored in the classes we’ve taken previously, is the discovery of new art and information. In “Digital Culture”, we had a difficult time being able to figure out where Internet artwork and information was coming from. The artwork existed out there on the web, but there was no way to find it unless you physically asked your friends what comics, article-based website, and blogs they follow. There was so much media being pushed out onto the Internet, and everyone is absorbing it in a different way, that it was difficult to find the exact article or the exact comic that your friend watches unless you asked them yourself.

This problem was similarly discovered in the class "Introduction to Music Theory". Even though new music was easy to discover (through Pandora and other similar sites) it was still difficult to get recommendations or see what your friends were listening to, unless you went over and asked them. Also, if we followed specific people on SoundCloud or YouTube, it would be difficult to discover what our other friends were watching or listening to on these platforms and therefore discover new music.

In "World Politics" we found that it is similarly difficult to see the articles people are looking at. If our friends talked about an article on the ongoing US fight against ISIS during class, we would have to go up and ask them where they were finding this information and figure out a way to keep up with it, either through an RSS Feed or just browsing the website when we could. The purpose of feedMe is to provide the ability to keep up with your friends media output without constantly having to ask them for sources

The application will build to find a solution for this problem and will grow from the previous computer science classes we’ve taken, with 200 level classes providing a base for our programming and the 300-level classes providing better functionality.

##Product Description
> by Benjamin Tibbetts (10/01/2014)

feedMe is a social RSS/media aggregator designed to allow users to create a feed of sources that they enjoy as well as looking at their friends’ feeds. It will incorporate the RSS feeds and newsfeeds of many existing web applications, but it will be completely fresh and unique, by providing the ability to not only view the sources you enjoy but look at the sources your other friends follow. The user interface will be attractive yet minimal in design, allowing the user to customize the appearance of their feed, such as changing the color scheme of the layout. The concept of feedMe draws inspiration from a wide variety of web applications such as Tumblr, Facebook, SoundCloud, Twitter, Feedly, and the channel design of Youtube, but its innovation comes from the combination of a sophisticated aggregator with a social environment.

The aggregator aspect of feedMe will be similar to any typical text/news aggregator except with the addition of alternative types of media. feedMe will incorporate sources such as traditional RSS feeds, but also SoundCloud feeds, Reddit and subreddits, and YouTube channels. For example, let’s say you have a friend who has a really good taste in music and they post a lot of SoundCloud clips to their feed. You could choose to follow these posts, either adding them to your feed or just observing their feed. This is where we get into the design of the user interface and how users have the ability to fully customize their feed.

The user interface of feedMe will consist of different feeds that are customizable by the user. The user will be able to choose what types of media their feeds display with checkboxes. However, the user is also able to create individual "filters" that the user can continually add to in order to provide distinct feeds for distinct subjects. For example, let’s say the user wants to look at the sources that only provide news information, or they *only* want to look at comics. By adding a series of sources to a particular group, you can look at only those sources, and therefore filter your results. So, if you wanted to look at what was going on in news, you could click on the "news" filter to only look at the sources you categorize as "news".

feedMe is built, at least partially, on the success of previous RSS aggregators, such as Feedly. However, one of the main differences between feedMe and other RSS aggregators is the complete integration of sources. As opposed to Feedly and other aggregators which will simply add items to their feed as they occur and sort the items based on either the source of that individual feed (so all items from the New York Times would be grouped together for example), or based entirely on when the feeds are updated. In feedMe, we will have a complicated algorithm which will scatter the sources based on the user's preference. Instead of having all the items from one feed clumped together, we will spread out the sources so that you can get an even mix of content from the various sources at your disposal.

The other aspect of feedMe that sets it completely apart from other RSS aggregators is the social aspect. The user will have the ability to add  their friends’ "feeders", or aggregate of sources, to their homepage, so they can see what all of their friends are reading, listening to, or watching at any given time. This allows the user to stay in touch, without being in direct contact with their friends as they would be on FaceBook. Instead of *maybe* seeing what their friend is interested in *some* of the time (if the friend reposts it to FaceBook or reblogs it on Tumblr), they would see what their friend is looking at at all times. It provides us an ability to step into our friends shoes, to truly witness what they like to read, what they love to listen to, and what they enjoy doing.

Part of the focus of this application is anonymity. While it would be easy to find a friend by simply searching for their email, you will not import your friends from Facebook, Twitter, or any other social media site. This site is more for the cherry picking of content, rather than a flood of all your friends interested content. You would not want to sign on once and become immediately overwhelmed at the amount of unread articles, unseen comics, and unlistened music. If you had as many feeders as you had friends on Facebook, it would simply impossible to see all of the content. The purpose of this application is to filter media, make it easier and more enjoyable to follow along with your friends explorations, rather than flood your brain with constant new content. This being said, you will have the option of adding accounts from content based social platforms, such as Reddit, and Tumblr, which will be incorporated into the algorithm to provide further content.

##Timeline
> by Josh McDuffie (10/01/2014)

| Description                                         | Start Date | Finish Date |
|-----------------------------------------------------|------------|-------------|
| Research on other RSS feeds                         | 10/01/14   | 10/22/14    |
| Research on media API’s (Youtube, Soundcloud, etc.) | 10/01/14   | 10/22/14    |
| Research on relevant Javascript Libraries           | 10/01/14   | 10/22/14    |
| Front End -- User Interface                         | 10/17/14   | 10/31/14    |
| Back End -- Database                                | 10/17/14   | 10/31/14    |
| Back End -- User Signup/Login                       | 10/17/14   | 10/31/14    |
| Working RSS feed                                    | 11/1/14    | 11/14/14    |
| Develop Social Aspect (Subscribing to other users)  | 11/12/14   | 12/04/14    |
| Testing                                             | 11/18/14   | 12/04/14    |
| Develop Demo                                        | 11/21/14   | 12/04/14    |

##Cost Estimate
> by Tengiz Vachnadze (10/01/2014)

|Description            | 1 Month | 3 Months (Total) |
|:----------------------|---------|------------------|
| Domain Name           | $10     | $10              |
| Server Maintenance    | $50     | $150             |
| Hardware (Computers)  | $5,000  | $5,000           |
| Renting Office Space  | $500    | $1,500           |
| Trello Gold Membership| $30     | $90              |
| Salary                | $24,000 | $72,000          |
| Total Costs           | $29,590 | $78,750          |

> Article converted to markdown by Luke Leheny (10/01/2014)
