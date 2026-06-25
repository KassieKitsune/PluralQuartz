# PluralQuartz
Loosely inspired by [Pluralchum](https://github.com/estroBiologist/pluralchum), PluralQuartz is a Vencord plugin that displays PluralKit members' names in color

# Installation
## Option 1: Build Vencord from Source 
This option is recommended if you have a comfortable relationship to your system's terminal. Truth be told, we still reccomend this method for everyone.

#### Step 1. Follow the Instructions on [installing Vencord from source](https://docs.vencord.dev/installing/)

#### Step 2. Install [pkapi.js](https://github.com/greys-tools/pkapi.js#installation)<br>
If you followed Step 1 correctly, you should be able to do this by simply copying & pasting this into your terminal. 
    
    npm install pkapi.js
or
    pnpm install pkapi.js
    
#### Step 3. Follow the Instructions on [installing custom Vencord plugins](https://docs.vencord.dev/installing/custom-plugins/)

## Option 2: using [Veskforge](https://github.com/Microck/veskforge)
This option is recommended if you have not yet gotten to know your terminal and are still working up the courage to ask it out. <details>
#### Step 1. Install [Node.js](https://nodejs.org/en/download/) and [Git](https://git-scm.com/)
- you may still need to install [pkapi.js](https://github.com/greys-tools/pkapi.js#installation) by running ```npm install pkapi.js``` or ```pnpm install pkapi.js``` in your terminal
    * If so this *should* be the only terminal command you strictly *need* to use for this method.

#### Step 2. Install [Veskforge](https://github.com/Microck/veskforge/releases)

#### Step 3. Add this repo as a Source in Veskforge
Paste ```https://github.com/KassieKitsune/PluralQuartz.git``` into the "Git Url" field when adding a git repository source to Veskforge

#### Step 4. Build & Install Vesktop in Veskforge

*Note that the resulting Vesktop build is a signifigantly more modded client as compared to regular Vencord, which has its own advantages but also a few drawbacks. Most notably the way it handles voice and screenshare audio can prove problematic in some cases
</details>



### Features
#### Lightness Adjustment
Have your friends set colours that are... lets say, not to your liking? <br>Or maybe they just don't stand out well against your custom themes? <br>PQ lets you set a range for HSL lightness used for names.

<b>Without Adjustment<br>
![no adjustment](https://github.com/KassieKitsune/PluralQuartz/blob/master/images/Marian-0-lightness.png)<br>
With 50% minimum lightness<br>
![50% minimum lightness](https://github.com/KassieKitsune/PluralQuartz/blob/master/images/Marian-50-lightness.png)</b>

### Limitations & Known Issues
1. Member colours aren't updated when changed.
    - A more convenient workaround is planned, but for now refreshing Vencord will allow the colors to update
2. Incompatible with the official IrcColors plugin
    - Both plugins patch the info in same fields in the same way and so will conflict with one another.(And tbh we referenced the source code of that plugin heavily)
3. Old Messages don't always get colored initially
    - Due to API response times and our rate limiting solution, it can take some time to fetch large numbers of colors. When this happens, the default colour is applied
    - Luckily, this fixes on a per-message basis when mousing over a message
___
### Why isn't this an official plugin?
Similar plugins have been requested and submitted for the main Vencord fork at least three or four times by our count. Each time they were rejected on the basis of being too niche and their creators subsequently abandonned the projects.
<center>

## Testimonials
<details>
<b>"This is how I find out that my daughter hasn't set a color for her pk profile at all"</b>
<br>- 🍫 A Girl-Dad Dad-Girl<p>

<b>"It matches my hair!"</b>
<br>- 🪙 A Daughter<p>

<b>"I set my name color to the debugging "missing color""</b>
<br>- 👾 A Hacker from Punklorde<p>

<b>"Look, I'm just glad the chittering rodents have one less thing to complain about"</b>
<br>- ⌬ Enigma<p>

<b>"I smorpy"</b>
<br>- this thing:<br>![this thing](https://media1.tenor.com/m/q1SAg75triUAAAAd/fei-ren-zai-fox.gif)<br> </center>
</details>