# The Liar's Dice Club

The Liar's Dice Club is a website to inform users of a club that meets to play Liar's Dice in the Guildborne Center, Worthing, and offer an online version of the game so people can try it out.

![Responsive Mockup](/assets/images/documentation/indexresponsivityimage.webp)

## Features 


**Navbar**

- The navbar is at the top of all pages and contains a link respective to each page.
- It allows for easy navigation of the website without reliance on browser features such as the 'back' or 'forwards' buttons.
- The navbar is condensed into a burger for mobile screen sizes.

<details>
<summary> Navbar screenshot (mobile)</summary>

![Nav Bar Mobile](/assets/images/documentation/navbar-mobile.webp)

</details>
<details>
<summary>Navbar screenshot (desktop)</summary>

![Nav Bar Desktop](/assets/images/documentation/navbar-desktop.webp)

</details>

<hr>

**Intro**

- The intro is what the user will likely first look at when they come to the website at index.html.
- It is simple as to not overwhelm the user, with an image and a h2 with the site's main functions.
- It has two buttons to invite the user to engage with either of the site's main functions.

<details>
<summary>Intro screenshot (mobile)</summary>

![Intro Mobile](/assets/images/documentation/intro-mobile.webp)

</details>
<details>
<summary>Intro screenshot (desktop)</summary>

![Intro Desktop](/assets/images/documentation/intro-desktop.webp)

</details>
<hr>

**Rules and Explainer**

- The rules are listed below the intro, along with an explainer of who the Liar's Dice Club
 are and when they meet.
- The explainer is positioned below the rules, so players who have only come to the site to play
 online get the rules first. This also allows the explainer to be adjacent to the footer which includes
the meeting times and an embedded map of the meeting location.

<details>
<summary>Rules screenshot (mobile)</summary>

![Rules Mobile](/assets/images/documentation/rules-mobile.webp)

</details>
<details>
<summary>Rules screenshot (desktop)</summary>

![Rules Desktop](/assets/images/documentation/rules-desktop.webp)

</details>
<details>
<summary>Explainer screenshot (mobile)</summary>

![Explainer Mobile](/assets/images/documentation/explainer-mobile.webp)

</details>
<details>
<summary>Explainer screenshot (desktop)</summary>

![Explainer Desktop](/assets/images/documentation/explainer-desktop.webp)

</details>
<hr>

**Footer**

- The footer is shown at the bottom of both pages like the navbar is at the top, giving both pages consistency
and providing better UX
- The club meeting times and an embedded map of the meeting location is included so users are reminded of how
they can attend the club on both pages.

<details>
<summary>Footer screenshot (mobile)</summary>

![Footer mobile](/assets/images/documentation/footer-mobile.webp)

</details>
<details>
<summary>Footer screenshot (desktop)</summary>

![Footer desktop](/assets/images/documentation/footer-desktop.webp)

</details>
<hr>

**Liar's Dice Game**

- The Liar's Dice Game is a fully functioning online version of Liar's Dice.
- Though in real life the game can be played with more than two players and different
amounts of starting dice, this version has two players and uses six starting dice each.
- Dice are randomly generated when the page is loaded or a new round is started.
- The player can make bets, and call the opponents bet to end the round.
- The virtual opponent makes intelligent choices based on a number of factors.

<details>
<summary>Liar's Dice Game screenshot (mobile)</summary>

![Liar's Dice Game mobile](/assets/images/documentation/game-mobile.webp)

</details>
<details>
<summary>Liar's Dice Game screenshot (desktop)</summary>

![Liar's Dice Game desktop](/assets/images/documentation/game-desktop.webp)

</details>
<hr>

## Features Yet to be Implemented

Help Me Pest Control is a functional and complete website. There are however some features that can be implented in future to improve user experience.

1. **Automated email queries:**
    - Include a button inside each pest division of the services section that links to the contact us page and automatically fills the email query text area with a request for help that matches the pest in question.
2. **About staff section:**
    - Include a section that information and pictures of the staff to users so they are familiar with the staff members are given a more personal experience.
3. **Accolades/awards section:**
    - List the several accolades/awards won by the company, perhaps as logos that link to the respective award site.
4. **Interactive pricing section:**
    - An interactive section in which your pest concern can be inputted and an approximate price will be generated according to how much your issue is likely to cost.

## Manual Testing 

###  Feature testing specific to mobile screen size

The site has been tested on mobile, tablet, and laptop/PC screen sizes. The following is testing done on an iPhone XR (414x896) screen simulator, though other mobile screen sizes have been tried.

|  Feature |  Testing action | Outcome |
|---|---|---|
Navbar|Click on burger|Menu opens|
Hero image| Click on 'CALL US NOW'|Phone app opens|
Services|Scroll through section|All pest divisons display vertically and are readable|
<br>

### Feature testing specific to tablet screen size and larger

The following is testing done on an iPad Air (1180x820) and regular desktop screen size, though other tablet and PC screen sizes have been tried.

|  Feature |  Testing action | Outcome |
|---|---|---|
Navbar|Hover over navbar links|Link colour temporarily changes and text enlarges|
Hero image|Hover over 'GET IN TOUCH'|Link temporarily fades in opacity|
||Click on 'GET IN TOUCH'|Contact us page opens|
'What do we help with' section|Hover over pest links|Links temporarily fade in opacity|
Reviews|Hover over individual reviews|Reviews temporarily fade in opacity, mouse changes to pointer to indicate reviews are links|
Services|Scroll through section|As many pest divisions as can fit display horizontally, then divisions display in rows vertically
<br>

### Feature testing generic to all screen sizes

The following testing should not change outcome based on screen size, but has been tried on phone, tablet and laptop/PC screen sizes regardless.

|  Feature |  Testing action | Outcome |
|---|---|---|
|Navbar |Click on menu link|Relevant page opens|
'What do we help with' section|Click pest links|Relevant part of services page opens|
Map|Attempt to move map frame|Embedded page functionality tells user to use two fingers|
Footer|Click social media links|Relevant social media page opens
Services |Click video|Embedded videos play correctly|
Query|Click submit with no data inputted|User told to fill required forms
||Click submit with relevant data inputted|Data submitted to code institute form dump

## Lighthouse Testing

The Lighthouse feature is included in Google Chrome's DevTools to assess performance, accessibility, best practices and SEO (search engine optimisation).

The site was tested with Lighthouse and received the following results:

### Index Page

![index.html Lighthouse Results](/assets/documentation/index-lighthouse.png)

- #### Performance - 93
    - The page peformance is 93, which means it overall had good performance. 
    - The performance was slightly hindered by the quality of the hero image. The hero image was optimised to improve from a prior lower score, but beyond 93 compressions start to impact the quality visually for the user. Other optimisations may be found to improve the performance.

- #### Accessibility - 100
    - Lighthouse rates the page perfect for accessibility. 
    - It previously docked points because the social media links did not have labels and the map iframe did not have a title. These were amended to improve the accessibility.

- #### Best practices - 100
    - Lighthouse rates the page perfect for best practices. This score shares some overlap with the other ratings.

- #### SEO - 100
    - Lighthouse rates the page perfect for SEO. This is bolstered by the favicon, meta description and semantic HTML.

### Services Page

![services.html Lighthouse Results](/assets/documentation/services-lighthouse.png)

- #### Performance - 90
    - The page peformance is 90, which means it overall had good performance. 
    - Like the index page, the performance is hindered by the hero image. It is slightly lower, likely due to the embedded Youtube videos and higher quantity of images. The videos could potentially be hosted with the site to improve performance.

- #### Accessibility - 100
    - Lighthouse rates the page perfect for accessibility. 
    - It previously docked points as the Youtube iframes did not have titles. This was amended.

- #### Best practices - 100
    - Lighthouse rates the page perfect for best practices.

- #### SEO - 100
    - Lighthouse rates the page perfect for SEO.


### Contact Us Page

![contact-us.html Lighthouse Results](/assets/documentation/contact-us-lighthouse.png)

- #### Performance - 91
    - The site peformance is 91, which means it overall had good performance. 
    - Like index.html and services.html, the performance was slightly hindered by the quality of the hero image.

- #### Accessibility - 100
    - Lighthouse rates the site perfect for accessibility. 

- #### Best practices - 100
    - Lighthouse rates the site perfect for best practices.

- #### SEO - 100
    - Lighthouse rates the site perfect for SEO.
    
<br>

**It is of course important to note that Lighthouse is an automated anaylsis and improvements can likely be made to all four metrics for each page.**


## Validator Testing 

#### HTML
- No errors returned using <a href="https://validator.w3.org/" target="_blank">W3C validator</a>

#### CSS
- No errors returned using <a target="_blank" href="https://jigsaw.w3.org/css-validator/)">Jigsaw validator</a>


## Bugs

|  Bug Number |  Problem | Outcome |
|---|---|---|
|1 |Dice image not rotating | 
|2 |Clicking play goes to wrong part of page | Fixed
3 | File paths wrong ../| Fixed
4 | WAVE evaluator shows skipped heading level on services.html | Fixed
||||

<br>

**1.**
- The WAVE evaluator showed an empty form label for the label associated with the burger checkbox.
    <details>
    <summary>Bug one WAVE error</summary>

    ![bug-one](/assets/documentation/bug-one.png)

    </details>
    <br>
- This is a downside of using only HTML and CSS for a menu burger rather than Javascript.
- An aria-label was added to the label.
    <details>
    <summary>Bug one WAVE solved</summary>

    ![bug-one-solved](/assets/documentation/zero-errors.png)

    </details>

**2.**
- The images in the services.html pests flexbox sometimes appeared as either vertical or horizontal ovals despite the intention for them to be perfect circles.
    <details>
    <summary>Bug two</summary>

    ![bug-two](/assets/documentation/bug-two.png)

    </details>
    <br>
- Setting the border radius property of an element to 50% does not inherently make the image a circle if the image is not a square.
- Complex solutions may be available, considering the project scope the images were simply cropped to be perfect squares.
    <details>
    <summary>Bug two solved</summary>

    ![bug-two-solved](/assets/documentation/bug-two-fixed.png)

    </details>

**3.**
- The Youtube videos in the services.html pests flexbox appeared either on the left side of the flexbox only, or with large black bars on either side of the video if it was stretched to the full size of the flexbox.
    <details>
    <summary>Bug three</summary>

    ![bug-three](/assets/documentation/bug-three.png)

    </details>
    <br>
- Embedded Youtube videos do not behave exactly like text.
- Putting the Youtube video inside another flexbox div and setting its flex properties so that the video appeared in the center solved the problem
    <details>
    <summary>Bug three solved</summary>

    ![bug-three-solved](/assets/documentation/bug-three-fixed.png)

    </details>

**4.**
- The WAVE evaluator showed that the services page had skipped a heading level. This is an accessibility problem and bad practice. Headings should always run consecutively.
    <details>
    <summary>Bug four</summary>

    ![bug-four](/assets/documentation/bug-four.png)

    </details>
    <br>
- A h1 heading had been used for the website logo, then h3 headings for the flexbox pest titles. The flexbox pest titles were changed to h2 headings.


## Deployment

- The site was deployed to GitHub pages using the following steps: 
  - In the GitHub repository, navigate to the Settings tab 
  - From the source section drop-down menu, select the Master Branch
  - Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment. 

The live link can be found here - <a target="_blank" href="https://harrypmdev.github.io/help-me-pest-control-website/">https://harrypmdev.github.io/help-me-pest-control-website/</a>


## Credits 

All content apart from where stated below is my own work.

### Content 

- All social media pages and branding belongs to **Help Me Pest Control Limited** for whom the website was built with the consent of the company owner.
- All font awesome icons including bug-favicon.svg from <a href="https://fontawesome.com/v4/license/">Font Awesome by Dave Gandy.</a>
- Reviews section links to reviews hosted publicly by Google. Google fonts also from Google are imported on style.css line 1. Map is embedded link provided by Google Maps.
- Services section pest videos are public Youtube videos hosted by Youtube and utilised with embedded links provided by Youtube.
- All six Youtube videos are public videos produced by the British Pest Control Association.
- Web accessibility evaluation provided by <a target="_blank" href="https://wave.webaim.org/">WAVE</a> for help in improving accessibility.
- HTML and CSS validation provided by <a target="_blank" href="https://validator.w3.org/">W3</a>
- Tutorials and explanations of CSS properties provided by <a target="_blank" href="https://www.w3schools.com/">W3</a>
- README.md deployment section edited from Code Institute demonstration README.md page as process is the same.


### Media

The following images are under a free license:
- bookshelves.webp image from <a target="_blank" href="https://www.freepik.com/free-photo/person-disinfecting-dangerous-area-while-wearing-protective-suit_12354032.htm#query=pest%20control&position=9&from_view=keyword&track=ais_user&uuid=74b5962d-b2ae-414e-9ccf-92a90d5b4e91">Freepik.</a>
- wall-custom-cropped-lossy.webp from <a target="_blank" href="https://www.freepik.com/free-photo/people-disinfecting-together-dangerous-area_12354142.htm#page=2&position=44&from_view=collections&uuid=da580347-fa2d-42d1-a86d-b786c9ae3b06">Freepik.</a>
- pest-paper.webp image from <a target="_blank" href="https://www.freepik.com/free-photo/nurse-wears-protective-suit-mask-covid19-outbreak_10167009.htm#position=2">Freepik.</a>
- pier-sussex.webp image from <a target="_blank" href="https://www.freepik.com/free-photo/scenic-wooden-bridge-stretching-duxbury-bay_19441916.htm#fromView=search&page=1&position=38&uuid=fa6587fe-a7aa-4c96-b383-1cad86fb04a0">Freepik.</a>
- bedbug.webp image from <a target="_blank" href="https://phil.cdc.gov/Details.aspx?pid=5460">Public Health Image Library.</a>
- rat.webp image from <a target="_blank" href="https://phil.cdc.gov/Details.aspx?pid=14282">Public Health Image Library.</a>
- flea.webp image from <a target="_blank" href="https://phil.cdc.gov/details.aspx?pid=11436">Public Health Image Library.</a>

The following image is licensed under the Creative Commons Attribution-Share Alike 2.5 Generic license:

- wasp.webp image from <a target="_blank" href="https://commons.wikimedia.org/wiki/File:Vespula_germanica_Richard_Bartz.jpg">Richard Bartz, Munich aka Makro Freak.</a>

The following images are icensed under the Creative Commons Attribution-Share Alike Attribution-Share Alike 4.0 International, 3.0 Unported, 2.5 Generic, 2.0 Generic and 1.0 Generic license:

- weevil.webp image from <a target="_blank" href="https://en.wikipedia.org/wiki/File:Weevil_September_2008-1.jpg">Alvesgaspar.</a>
- moth.webp image from <a target="_blank" href="https://en.wikipedia.org/wiki/File:Moth_September_2008-3.jpg">Alvesgaspar.</a>