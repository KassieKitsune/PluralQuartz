# PluralQuartz
Loosely inspired by [Pluralchum](https://github.com/estroBiologist/pluralchum), PluralQuartz is a Vencord plugin that displays PluralKit members' names in color according to their profile settings.

# Installation
## Option A: Build Vencord from Source 
This option is recommended if you have a comfortable relationship to your system's terminal(command prompt) or have installed other Vencord userplugins before. Truth be told, we still recommend this method for everyone -- click details in each step for a complete breakdown if Vencord's instructions on this process are confusing.


#### Step 1. Follow the Instructions on [installing Vencord from source](https://docs.vencord.dev/installing/)
<details>


0. Open your terminal/commmand prompt. 
    -On Windows we reccomend command prompt(cmd) over Powershell 
        -if something goes wrong in this step anyways, follow these instructions with your command prompt open in Administrator Mode
1. Download and install [Git](https://git-scm.com/install/)<br>
2. Download and install [Node](https://nodejs.org/en/download/)<br>
3. Download and install [pnpm](https://pnpm.io/installation)<br>
    - you can do this by running ```npm install -g pnpm@latest-11``` in your terminal
4. install [pkapi.js](https://github.com/greys-tools/pkapi.js#installation)
    - you can do this by running ```pnpm install -g pkapi.js``` in your terminal
5. Navigate to an easily accessible directory from within your terminal<br>
use the example commands bellow if you don't know where to navigate to.
    - **Windows** ```cd %USERPROFILE%\Documents``` 
    - **Linux** ```cd ~``` (You should already be in this directory)
    - **Mac** ```cd ~/Desktop```
6. Clone Vencord, install dependencies, and create userplugins folder
    1. run ```git clone https://github.com/Vendicated/Vencord```
    2. run ```cd Vencord```
    3. run ```pnpm install --frozen-lockfile```
    4. run ```mkdir src\userplugins```

> If you used the suggested commands in substep 4, you should see a Vencord folder<br>
**Windows** In your Documents Folder<br>
**Linux** In your Home Directory<br>
**Mac** On your Desktop.<br>
Inside you should find a folder called src, inside that folder should be a folder called userplugins.

7.skip to step 3. **Keep your terminal open.**

</details>
        
#### Step 2. Install [pkapi.js](https://github.com/greys-tools/pkapi.js#installation)<br>
If you followed Step 1 correctly, you should be able to do this by simply copying & pasting this into your terminal. 
```
npm install -g pkapi.js
```
or
``` 
pnpm install -g pkapi.js
``` 
#### Step 3. Follow the Instructions on [installing custom Vencord plugins](https://docs.vencord.dev/installing/custom-plugins/)
<details>

1. Download this repository<br>You can either:

- Clone this repo (Recommended)
    - using the same terminal window from step 1, run:
    ```
    cd src/userplugins
    git clone https://github.com/KassieKitsune/PluralQuartz.git
    cd ..
    cd ..
    ```
***OR*** 
- Use your file manager:

    1. Download this project as a zip (the green code button next to the About section)
    2. Put the zip in the userplugins folder created in step 1
    3. Right click and extract the zip
        - This should create a new folder, if it does not, create one and drag the unzipped files into it
2. Build Vencord
   in the same terminal window from step 1,
   run the following command
   ```
   pnpm build
   ```
   This can take some time, wait for it to finish
4. Inject 
   run
   ```
   pnpm inject
   ```
   Select the default options when prompted. Discord should close when this is done. PluralQuartz should be available in the plugins menu when you open Discord again.

</details>

> **Updating PQ** If are here to update your existing PQ install, or have previously installed other userplugins, You only need to pen your terminal in your existing Vencord folder and do step 3.

## (Untested) Option B: using [Veskforge](https://github.com/Microck/veskforge)
This option is recommended if you have not yet gotten to know your terminal and are still working up the courage to ask it out. <details>
#### Step 1. Install [Node.js](https://nodejs.org/en/download/) and [Git](https://git-scm.com/)
- you may still need to install [pkapi.js](https://github.com/greys-tools/pkapi.js#installation) by running ```npm install pkapi.js``` or ```pnpm install pkapi.js``` in your terminal
    * If so this *should* be the only terminal command you strictly *need* to use for this method.

#### Step 2. Install [Veskforge](https://github.com/Microck/veskforge/releases)

#### Step 3. Add this repo as a Source in Veskforge
Paste ```https://github.com/KassieKitsune/PluralQuartz.git``` into the "Git Url" field when adding a git repository source to Veskforge

#### Step 4. Build & Install Vesktop in Veskforge

> **_NOTE:_** <i>The resulting Vesktop build is a signifigantly more modded client as compared to regular Vencord, which has its own advantages but also a few drawbacks. Most notably the way it handles voice and screenshare audio can prove problematic in some cases</i>
</details>

___

### Features
#### Lightness Adjustment
Have your friends set colours that are... lets say, not to your liking? <br>Or maybe they just don't stand out well against your custom themes? <br>PQ lets you set a range for HSL lightness used for names.

<b>Without Adjustment<br>
![no adjustment](https://github.com/KassieKitsune/PluralQuartz/blob/master/images/Marian-0-lightness.png)<br>
With 50% minimum lightness<br>
![50% minimum lightness](https://github.com/KassieKitsune/PluralQuartz/blob/master/images/Marian-50-lightness.png)</b>

#### ID Color Assignment
Have your friends just... not set any colors? at all? that's a little disappointing...<br>
No worries, we've got just the thing.
Enable ID Colors in the plugin settings, and anybody who does not have a color set will be assigned one based on their Pluralkit member ID.

> **_NOTE:_** PluralQuartz is still under development, and new features are on the way, check for updates as they come!
___

### Limitations & Known Issues
1. Member colours aren't updated when changed.
    - A more convenient workaround is planned, but for now refreshing Vencord will allow the colors to update
2. Incompatible with the official IrcColors plugin
    - Both plugins patch the info in the same fields in the same way. As of right now this will cause them to conflict with one another.(And tbh we referenced the source code of that plugin heavily)
3. Old Messages don't always get colored initially
    - Due to API response times and our rate limiting solution, it can take some time to fetch large numbers of colors. When this happens, the default colour is applied
    - Luckily, this fixes on a per-message basis when mousing over a message
___

### Why isn't this an official plugin?
Similar plugins have been requested and submitted for the main Vencord fork at least three or four times by our count. Each time they were rejected on the basis of being too niche and their creators subsequently abandonned the projects.
<center>

## Testimonials
<testimonials>
<b>"This is how I find out that my daughter hasn't set a color for her pk profile at all"</b>
<br>- 🍫 A Girl-Dad Dad-Girl<p>

<b>"It matches my hair!"</b>
<br>- 🪙 A Daughter<p>

<b>"I set my name color to match the 'missing' color"</b>
<br>- 👾 A Hacker from Punklorde<p>

<b>"Look, I'm just glad the chittering rodents have one less thing to complain about"</b>
<br>- ⌬ Enigma<p>

<b>"I smorpy"</b>
<br>- this thing:<br>![this thing](https://media1.tenor.com/m/q1SAg75triUAAAAd/fei-ren-zai-fox.gif)<br> </center>
</details>
