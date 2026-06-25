# PluralQuartz
Loosely inspired by [Pluralchum](https://github.com/estroBiologist/pluralchum), Pluralquartz is a Vencord plugin that displays PluralKit members' names in color
### Introduction

## Installation
### Option 1: Build Vencord from Source
Detailed instructions for complete newbies coming soon. In the meantime if you are already comfortable with your system's terminal, the following instructions will do.

#### Step 1. Follow the Instructions on [installing Vencord from source](https://docs.vencord.dev/installing/)

#### Step 2. Install [pkapi.js](https://github.com/greys-tools/pkapi.js#installation)<br>
If you followed Step 1 correctly, you should be able to do this by simply copying & pasting this into your terminal
    
    npm install pkapi.js
    
#### Step 3. Follow the Instructions on [installing custom Vencord plugins](https://docs.vencord.dev/installing/custom-plugins/)

### Option2: using Veskforge:


#### Step 4.
    - you may still need to install [pkapi.js](https://github.com/greys-tools/pkapi.js#installation) by running '''npm install pkapi.js''' in your terminal

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
    - Both plugins patch the same fields in the same way and so will conflict with one another.(and in full honesty I referenced their work heavily)

## Testimonials

<center><b>"This is how I find out that my daughter hasn't set a color for her pk profile at all"</b>
<br>-A Girl Dad Dad Girl<br>

<b>"I set my name color to the debugging "missing color""</b>
<br>-Hacker from Punklorde<br>

<b>"I smorpy"</b>
<br>- this thing<br>![this thing](https://media1.tenor.com/m/q1SAg75triUAAAAd/fei-ren-zai-fox.gif)<br> </center>