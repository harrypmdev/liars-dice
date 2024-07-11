# The Liar's Dice Club

The Liar's Dice Club is a website to inform users of a club that meets to play Liar's Dice in the Guildborne Center, Worthing, and offer an online version of the game so people can try it out.

![Responsive Mockup](/assets/images/documentation/index-responsivity-image.webp)

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

## Potential Features Yet to be Implemented

The Liar's Dice Club is a functional and complete website. There are however some features that can be implented in future to improve user experience.

1. **Starting Dice Selector**
    - Include a selector on page.html which allows users to choose how many dice each player will start with.
    - Many real life Liar's Dice players start their games with five dice, and would likely prefer to change
    the game to this version if possible.
2. **Difficulty Selector**
    - Include a selector on page.html which allows users to choose between different difficulty 
    settings for the Liar's Dice Game. -
    - Variables that determine the opponent's behavior are already established in the
    createOpponentResponse() function in script.js, so a selector which alters this 
    may not be require too much extra code. 
    - The hardest difficulty could 'cheat' and factor in the player's dice like a real life
    player effectively calling their opponent's bluffs.
3. **Online Play**
    - Include an option on play.html to play online with other real life players.
    - This would require much more functionality than the website currently includes.
4. **Gallery**
    - Include a third html page, gallery.html, that has a gallery of images of the Liar's Dice Club meeting.
    - This would show new visitors that the club is welcoming and encourage them to attend.

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

![index.html Lighthouse Results](/assets/images/documentation/index-lighthouse.webp)

- #### Performance - 100
    - Lighthouse rates the page perfect for performance. This is aided by a webp image, little layout shifting and
    a lack of JavaScript functionality.

- #### Accessibility - 100
    - Lighthouse rates the page perfect for accessibility. 

- #### Best practices - 100
    - Lighthouse rates the page perfect for best practices. This score shares some overlap with the other ratings.

- #### SEO - 100
    - Lighthouse rates the page perfect for SEO. This is bolstered by the favicon, meta description and semantic HTML.
    - The rules section using a 'section' element rather than a 'div' is a good example of a best SEO practice, 
    because it could easy be pulled by google to answer a generic user question about the rules of Liar's Dice.

### Play Page

![play.html Lighthouse Results](/assets/images/documentation/play-lighthouse.webp)

- #### Performance - 83
    - The page peformance is 83, which means it was moderately good but flawed.
    - Play.html starts the Liar's Dice Game upon loading. This includes generating this dice.
    - The layout shift of the game board is the biggest impediment upon performance.
    - The page still loads relatively fast considering the JavaScript functionality but further
    investigation into how to stop the layout shift performance impediment would improve the site.

- #### Accessibility - 100
    - Lighthouse rates the page perfect for accessibility. 
    - Lighthouse previously suggested that the dice generated by script.js did not have alternate texts. Script.js
    now automatically adds alternate text attributes which interpolate the correct pip number with a template literal.

- #### Best practices - 100
    - Lighthouse rates the page perfect for best practices.

- #### SEO - 100
    - Lighthouse rates the page perfect for SEO.

<br>

**It is of course important to note that Lighthouse is an automated anaylsis and improvements can likely be made to all four metrics for each page.**


## Validator Testing 

#### HTML
- No errors returned using <a href="https://validator.w3.org/" target="_blank">W3C validator</a>

#### CSS
- No errors returned using <a href="https://jigsaw.w3.org/css-validator/)" target="_blank">Jigsaw validator</a>

#### JS
- No errors returned using <a href="https://jshint.com/" target="_blank">JSHint</a> except warnings r.e ES6 dependency

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

The live link can be found here - <a target="_blank" href="https://harrypmdev.github.io/liars-dice/">https://harrypmdev.github.io/liars-dice/</a>


## Credits 

All content apart from where stated below is my own work.

### Content 

- Font awesome burger icon from <a href="https://fontawesome.com/v4/license/">Font Awesome by Dave Gandy.</a>
- Google fonts also from Google are imported on style.css line 1. Map is embedded link provided by Google Maps.
- Web accessibility evaluation provided by <a target="_blank" href="https://wave.webaim.org/">WAVE</a> for help in improving accessibility.
- HTML and CSS validation provided by <a target="_blank" href="https://validator.w3.org/">W3</a>
- JavaScript validation provided by <a target="_blank" href="https://jshint.com/">JS Hint</a>
- Tutorial on styling hr elements with '::after' pseudo-element from <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr">MDN Web Docs</a> 
- Tutorials and explanations of JavaScript syntax provided by <a target="_blank" href="https://www.w3schools.com/">W3</a>
- README.md deployment section edited from Code Institute demonstration README.md page as process is the same.


### Media

The following images are under a free license:

- All dice face images
(dice-one.webp)
(dice-two.webp)
(dice-three.webp)
(dice-four.webp)
(dice-five.webp)
(dice-six.webp)
from <a target="_blank" href="https://www.vecteezy.com/vector-art/6923039-dice-game-line-icon-set-pipped-dices-toss-from-one-to-six-die-for-casino-craps-table-or-board-games-luck-and-random-choice-vector-illustration-isolated">Vecteezy</a>.
- dice-unknown.webp, dice-logo.webp and dice-rotated-favicon.ico adapted from the same work as above by <a target="_blank" href="https://www.vecteezy.com/vector-art/6923039-dice-game-line-icon-set-pipped-dices-toss-from-one-to-six-die-for-casino-craps-table-or-board-games-luck-and-random-choice-vector-illustration-isolated">Vecteezy</a>.

The following image is licensed under the  Creative Commons Attribution-Share Alike 2.0 Generic license:

- dice.webp image from <a target="_blank" href="https://commons.wikimedia.org/wiki/File:Dice_(504524747).jpg">Nazir Amin</a>.