# PluralQuartz
Loosely inspired by [Pluralchum](https://github.com/estroBiologist/pluralchum), PluralQuartz is a Vencord plugin that displays PluralKit members' names in color

# Installation
## Option 1: Build Vencord from Source 
This option is recommended if you have a comfortable relationship to your system's terminal

#### Step 1. Follow the Instructions on [installing Vencord from source](https://docs.vencord.dev/installing/)

#### Step 2. Install [pkapi.js](https://github.com/greys-tools/pkapi.js#installation)<br>
If you followed Step 1 correctly, you should be able to do this by simply copying & pasting this into your terminal
    
    npm install pkapi.js
or
    pnpm install pkapi.js
    
#### Step 3. Follow the Instructions on [installing custom Vencord plugins](https://docs.vencord.dev/installing/custom-plugins/)

## Option 2: using [Veskforge](https://github.com/Microck/veskforge)
This option is recommended if you do not 

#### Step 1. Install [Node.js](https://nodejs.org/en/download/) and [Git](https://git-scm.com/)
- you may still need to install [pkapi.js](https://github.com/greys-tools/pkapi.js#installation) by running ```npm install pkapi.js``` or ```pnpm install pkapi.js``` in your terminal
    * This *should* be the only terminal command you need to use for this method.

#### Step 2. Install [Veskforge](https://github.com/Microck/veskforge/releases)

#### Step 3. Add this repo as a Source in Veskforge
1. Press [ + Add Source] in the sources tab and set it to "git repo", select "git repo" in the dropdown.
2. paste ```https://github.com/KassieKitsune/PluralQuartz.git``` into the url field

#### Step 4. Build Vesktop in Veskforge


*Note that Vesktop is a signifigantly more modded client as compared to regular Vencord, which has its own advantages but also a few drawbacks. Most notably the way it handles voice and screenshare audio can prove problematic in some cases* 


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

### Why isn't this an official plugin?
Similar plugins have been requested for the main Vencord fork at least three or four times.  
-- Enigma
## Testimonials

<center><b>"This is how I find out that my daughter hasn't set a color for her pk profile at all"</b>
<br>-A Girl-Dad Dad-Girl<p>

<b>"It matches my hair!"</b>
<br>-A Daughter<p>

<b>"I set my name color to the debugging "missing color""</b>
<br>-Hacker from Punklorde<p>

<b>"I smorpy"</b>
<br>- this thing<br>![this thing](https://media1.tenor.com/m/q1SAg75triUAAAAd/fei-ren-zai-fox.gif)<br> </center>