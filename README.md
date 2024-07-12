# The Liar's Dice Club

The Liar's Dice Club is a website to inform users of a club that meets to play Liar's Dice in the Guildborne Centre, Worthing, and offer an online version of the game so people can try it out.

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

- The intro is what the user will likely first look at when they come to the website at `index.html`.
- It is simple as to not overwhelm the user, with an image and a `h2` element with the site's main functions.
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
and providing better UX.
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

The Liar's Dice Club is a functional and complete website. There are however some features that can be implented in the future to improve user experience.

1. **Starting Dice Selector**
    - Include a selector on `page.html` which allows users to choose how many dice each player will start with.
    - Many real life Liar's Dice players start their games with five dice, and would likely prefer to change
    the game to this version if possible.
2. **Difficulty Selector**
    - Include a selector on `page.html` which allows users to choose between different difficulty 
    settings for the Liar's Dice Game.
    - Variables that determine the opponent's behavior are already established in the
    `createOpponentResponse()` function in `script.js`, so a selector which alters this 
    may not be require too much extra code. 
    - The hardest difficulty could 'cheat' and factor in the player's dice like a real life
    player, effectively calling their opponent's bluffs.
3. **Online Multiplayer**
    - Include an option on `play.html` to play online with other real life players.
    - This would require much more functionality than the website currently includes.
4. **Gallery**
    - Include a third HTML page, `gallery.html`, that has a gallery of images of the Liar's Dice Club meeting.
    - This would show new visitors that the club is welcoming and encourage them to attend.

## Manual Testing 

###  Feature testing specific to mobile screen size

The site has been tested on mobile, tablet, and laptop/PC screen sizes. The following is testing done on an iPhone 12 Pro (390x844) screen simulator, though other mobile screen sizes have been tried.

|  Feature |  Testing action | Outcome |
|---|---|---|
Navbar|Tap on burger|Menu opens, then closes if tapped again|
Liar's Dice Game|Tap on Navbar link to `play.html`|Page opens and generates two hands of six dice in a single horizontal row|
Liar's Dice Game|Play game to the end of a turn|A die is removed from the furthest right side of the row and the rest of the dice are randomly reselected

### Feature testing generic to all screen sizes

The following testing should not change outcome based on screen size, but has been tried on phone, tablet and laptop/PC screen sizes regardless.

|  Feature |  Testing action | Outcome |
|---|---|---|
Intro |Click on 'play in person' button|Page smoothly scrolls to explainer section
Intro |Click 'play online' button|`play.html` opens
Liar's Dice Game|Click on 'call game' button| The turn ends. If the bet is incorrect, the opponent loses a die. If the bet is correct, I lose a die.
Liar's Dice Game|Select pip number higher than the current bet with the pip selector| The quantity selector adds an option for the current quantity to be bet
Liar's Dice Game |Select pip number lower than or equal to current bet when current quantity has already been added|The current quantity is removed. If it is currently selected, the selector defaults to the next quantity number up|
Liar's Dice Game|Try to click 'next turn' button in middle of turn|The button is greyed out and does not respond to hovering the mouse. The button does nothing.

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
    - The rules section using a `section` element rather than a `div` is a good example of a best SEO practice, 
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
    - Lighthouse previously suggested that the dice generated by `script.js` did not have alternate texts. `script.js`
    now automatically adds alternate text attributes which interpolate the correct pip number with a template literal.
    - Lighthouse previously suggested that the 'bet' button's colour contrast was not appropriate for poorly sighted individuals. All `play.html` buttons were subsequently tested using WebAIM colour contrast checker and colours were changed accordingly.

- #### Best practices - 100
    - Lighthouse rates the page perfect for best practices.

- #### SEO - 100
    - Lighthouse rates the page perfect for SEO.

<br>

**It is of course important to note that Lighthouse is an automated anaylsis and improvements can likely be made to all four metrics for each page.**


## Validator Testing 

#### HTML
- No errors returned using <a href="https://validator.w3.org/" target="_blank">W3C validator</a>.

#### CSS
- No errors returned using <a href="https://jigsaw.w3.org/css-validator/)" target="_blank">Jigsaw validator</a>.

#### JS
- No errors returned using <a href="https://jshint.com/" target="_blank">JSHint</a> except warnings r.e ES6 dependency.

## Bugs

|  Bug Number |  Problem | Outcome |
|---|---|---|
|1 |`.dice-hr` class's '::after' pseudo-element die image not rotating to 45 degrees| Fixed
|2 |Clicking 'play in person' button takes the user to the wrong part of the page| Fixed
3 | Current quantity not being removed from quantity selector when appropriate| Fixed
4 | Dice layout in hand is according to however many can be fit on the screen size causing poor UX | Fixed
||||

<br>

**1.**
- The Navbar logo and the hr elements seen on `index.html` both feature the same image, dice-logo.webp.
- I thought the image looked best and therefore provided best UX at a 45 degree angle. I achieved this with the logo with relative ease.
- My attempts to put the `.dice-hr::after` pseudo-element image on an axis with CSS were not working.
    <details>
    <summary>Bug one</summary>

    ![bug-one](/assets/images/documentation/bug-one-hr.webp)

    </details>
    <br>
- The `::after` pseudo-element displays as `inline` by default. `inline` elements cannot be transformed in this manner.
- `display: inline-block` was added to the CSS selector in question
    <details>
    <summary>Bug one solved</summary>

    ![bug-one-solved](/assets/images/documentation/bug-one-hr-fixed.webp)

    </details>

**2.**
- The 'play in person' button in the intro of `index.html` was meant to take the user further down the page to the explainer section which gives information about the real life meetings of the Liar's Dice Club.
- The button was taking the user to the wrong part of the page.
    <details>
    <summary>Bug two</summary>

    ![bug-two](/assets/images/documentation/bug-two-anchor.webp)

    </details>
    <br>
- This is a common issue when using fixed headers.
- The `scroll-margin` CSS property can be used to offset the point to which the page scrolls. This was added to the CSS selector in question.
    <details>
    <summary>Bug two solved</summary>

    ![bug-two-solved](/assets/images/documentation/bug-two-anchor-fixed.webp)

    </details>

**3.**
- In the Liar's Dice Game, the player can bet a quantity of dice higher than the current bet. However, they can also bet the same quantity if they race the face value they are betting.
- For example, if the current bet is 'three dice with four pips', the player could bet three dice with five pips, or three dice with 6 pips. Otherwise, they would need to raise the quantity of dice being bet to four.
- As such, the quantity selector in the Liar's Dice Game needs to include the current quantity whenever the selected pip value is over the current bet, but otherwise remove it.
- The `script.js` function `handlePipChange()` serves this purpose. It runs whenever the selected pip option is changed. It was not removing the current quantity when the player switched back to a higher pip however, meaning multiple of this number were appearing and the player was allowed to bet illegal moves.
    <details>
    <summary>Bug three</summary>

    ![bug-three](/assets/images/documentation/bug-three-select.webp)

    </details>
    <br>
- The problem was a `for` loop in `handlePipChange()`. The `for` loop iterated through the options of the quantity selector and set a variable if it found the current quantity.
- The loop would then continue iterating and reset the variable to false because the current quantity was not the last option in the selector. This was causing the current quantity to be missed.
- The `break` keyword was added so the loop did not continue after it identified the current quantity.
    <details>
    <summary>Bug three solved</summary>

    ![bug-three-solved](/assets/images/documentation/bug-three-select-fixed.webp)

    </details>

**4.**
- The 'hand' of the player and the opponent is populated with dice as per the `populateHand()` function.
- The amount of dice generated can range between one and six, so the hand needs to look aesthetically pleasing with any of these dice amounts of a range of screen sizes.
- On tablet sizes, the arrangement could look particularly awkward, display five dice across three rows and taking up lots of unnecessary space on the page.
    <details>
    <summary>Bug four</summary>

    ![bug-four](/assets/images/documentation/bug-four-hand.webp)

    </details>
    <br>
- The 'hand' holding the dice was using `display: flex` but this was not producing the intended result. It was changed to a `grid`, such that the dice would always display in a single row on mobile and tablets and two rows on wider screens.
- This also took up less unnecessary space and allowed the whole game board to fit on one screen on most mobile devices. 
    <details>
    <summary>Bug four solved</summary>

    ![bug-four](/assets/images/documentation/bug-four-hand-fixed.webp)

    </details>


## Deployment

- The site was deployed to GitHub pages using the following steps: 
  - In the GitHub repository, navigate to the 'settings' tab.
  - From the source section drop-down menu, select the 'master branch'.
  - Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment. 

The live link can be found here - <a target="_blank" href="https://harrypmdev.github.io/liars-dice/">https://harrypmdev.github.io/liars-dice/</a>.


## Credits 

All content apart from where stated below is my own work.

### Content and Development Help

- Font awesome burger icon from <a href="https://fontawesome.com/v4/license/">Font Awesome by Dave Gandy</a>.
- Google fonts from Google are imported on `style.css` line 1. Map is embedded link provided by Google Maps. Lighthouse web page quality checker also provided by Google.
- Web accessibility evaluation provided by <a target="_blank" href="https://wave.webaim.org/">WAVE</a> for help in improving accessibility.
- Colour contrast accessibility checker provided by <a href="https://webaim.org/resources/contrastchecker/">WebAIM</a>.
- Tutorial on styling hr elements with '::after' pseudo-element from <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr">MDN Web Docs</a>.
- HTML and CSS validation provided by <a target="_blank" href="https://validator.w3.org/">W3</a>.
- JavaScript validation provided by <a target="_blank" href="https://jshint.com/">JS Hint</a>.
- Tutorials and explanations of JavaScript syntax provided by <a target="_blank" href="https://www.w3schools.com/">W3</a>.
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