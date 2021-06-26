# MoodleBooster 🚀

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-12-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Firefox (Soon to be Chrome) extension / add-on that boosts moodle's UI/UX \
You can download our production version add-on on [Mozilla's website](https://addons.mozilla.org/en-US/firefox/addon/moodlebooster/).

<img width="400" alt="Screen Shot 2021-06-25 at 23 24 41" src="https://user-images.githubusercontent.com/18491183/123481580-9ef8f700-d60c-11eb-9a5f-c0770e9a2aac.png"> <img width="400" alt="Screen Shot 2021-06-25 at 23 24 56" src="https://user-images.githubusercontent.com/18491183/123481593-a3251480-d60c-11eb-9933-0ab5b22cd2b4.png">


## Table of Contents

- [Running Instructions](#instructions)
- [Notes](#Notes)
- [How To Contribute?](#howtocontribute)
- [Contributors](#Contributors)

<a name="instructions"/>

### Running Instructions

There are two ways to run our extension, the difference between them is that by using the first way you can have hot-reloading, while developing.You don't have to add the extension if you run locally.

**First Way (Recommended):**

- Download Firefox ([🔥Firefox](https://www.mozilla.org/en-US/firefox/new/)) or Chrome ([🌊Chrome](https://www.google.com/chrome/)).
- Install Node.js and NPM if not already installed: [on Windows](https://phoenixnap.com/kb/install-node-js-npm-on-windows), [on Ubuntu](https://www.liquidweb.com/kb/create-clone-repo-github-ubuntu-18-04/) (Currently we support vesrions : node>=12.0.0 , 7.0.0>npm>=6.9.0)
- Clone the repo to your pc, by running the following command:  
  `git clone https://github.com/norbit8/MoodleBooster.git`
- Run `npm install` in the root directory of the project to install all dependencies.
  - Run the Extension:
    - On Firefox - From the root directory of the project run `npm start`.
    - On Chrome - From the root directory of the project run `npm run start-chrome`.


**Second Way:**
- Firefox
    - Download Firefox ([🔥Firefox](https://www.mozilla.org/en-US/firefox/new/))
    - Clone the repo to your pc, by running the following command: `git clone https://github.com/norbit8/MoodleBooster.git`.
    - Go to Firefox and type: `about:debugging#/runtime/this-firefox` on the search bar.
    - Click on "Load Temporary Addon" and choose any file from the repo you've just cloned.
- Chrome
    - Download Chrome ([🌊Chrome](https://www.google.com/chrome/)).
    - Clone the repo to your pc, by running the following command: `git clone https://github.com/norbit8/MoodleBooster.git`.
    - Go to Chrome and type: `chrome://extensions/` on the search bar.
    - Click on "Load unpacked" and choose the root folder of the project.

**In order to build the extension into zip file run `npm build` from the root of the project**

<a name="Notes"/>

### Notes:

- The dev environment support many features that include with web-ext like hot-reloading
  more info here: https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/

- This moodle extension is designed to work mainly on Huji's moodle.
<a name="howtocontribute"/>

### How To Contribute?

Pushing code to our master branch is forbidden.

If you want to contribute, all you need to do is to

1. Fork the repository (or if you're a contributor just clone this repo).
2. Open a new branch (locally) and start working on it.
3. Push it.
4. Create a new pull request.
5. Add new tag to main branch after pull request merge (Thank you! ❤️)

<a name="Contributors"/>

### ✨ Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/norbit8"><img src="https://avatars.githubusercontent.com/u/18491183?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yoav</b></sub></a><br /><a href="#infra-norbit8" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/norbit8/MoodleBooster/commits?author=norbit8" title="Code">💻</a> <a href="https://github.com/norbit8/MoodleBooster/commits?author=norbit8" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/idan2468"><img src="https://avatars.githubusercontent.com/u/44695990?v=4?s=100" width="100px;" alt=""/><br /><sub><b>idan2468</b></sub></a><br /><a href="#infra-idan2468" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/norbit8/MoodleBooster/commits?author=idan2468" title="Code">💻</a> <a href="https://github.com/norbit8/MoodleBooster/commits?author=idan2468" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/yanirelfasy"><img src="https://avatars.githubusercontent.com/u/24404481?v=4?s=100" width="100px;" alt=""/><br /><sub><b>yanirelfasy</b></sub></a><br /><a href="#infra-yanirelfasy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/norbit8/MoodleBooster/commits?author=yanirelfasy" title="Code">💻</a> <a href="https://github.com/norbit8/MoodleBooster/commits?author=yanirelfasy" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/tamiror6"><img src="https://avatars.githubusercontent.com/u/76107540?v=4?s=100" width="100px;" alt=""/><br /><sub><b>tamiror6</b></sub></a><br /><a href="https://github.com/norbit8/MoodleBooster/commits?author=tamiror6" title="Documentation">📖</a> <a href="https://github.com/norbit8/MoodleBooster/commits?author=tamiror6" title="Code">💻</a> <a href="#infra-tamiror6" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/DanielSaroussy"><img src="https://avatars.githubusercontent.com/u/81748842?v=4?s=100" width="100px;" alt=""/><br /><sub><b>DanielSaroussy</b></sub></a><br /><a href="https://github.com/norbit8/MoodleBooster/commits?author=DanielSaroussy" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/dorpro13"><img src="https://avatars.githubusercontent.com/u/19567966?v=4?s=100" width="100px;" alt=""/><br /><sub><b>dorpro13</b></sub></a><br /><a href="https://github.com/norbit8/MoodleBooster/commits?author=dorpro13" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/guys1915"><img src="https://avatars.githubusercontent.com/u/66463385?v=4?s=100" width="100px;" alt=""/><br /><sub><b>guys1915</b></sub></a><br /><a href="https://github.com/norbit8/MoodleBooster/commits?author=guys1915" title="Documentation">📖</a> <a href="https://github.com/norbit8/MoodleBooster/commits?author=guys1915" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/shakedkialy"><img src="https://avatars.githubusercontent.com/u/45287227?v=4?s=100" width="100px;" alt=""/><br /><sub><b>shakedkialy</b></sub></a><br /><a href="https://github.com/norbit8/MoodleBooster/commits?author=shakedkialy" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/nataly-milman"><img src="https://avatars.githubusercontent.com/u/63509956?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nataly Milman</b></sub></a><br /><a href="https://github.com/norbit8/MoodleBooster/commits?author=nataly-milman" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/ori-frenkel"><img src="https://avatars.githubusercontent.com/u/49747014?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ori-frenkel</b></sub></a><br /><a href="https://github.com/norbit8/MoodleBooster/commits?author=ori-frenkel" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/rbenjos"><img src="https://avatars.githubusercontent.com/u/22573117?v=4?s=100" width="100px;" alt=""/><br /><sub><b>rbenjos</b></sub></a><br /><a href="https://github.com/norbit8/MoodleBooster/commits?author=rbenjos" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/The-Kor"><img src="https://avatars.githubusercontent.com/u/60473978?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Koral Haham</b></sub></a><br /><a href="https://github.com/norbit8/MoodleBooster/commits?author=The-Kor" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
