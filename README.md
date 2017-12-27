# Introduction to node.js

## Before the journey

To take this course, you need to know Git and especially the Github flow. So, I
provide below some useful reminders:

* [Github flow](https://guides.github.com/introduction/flow/)
* [RTFM git](https://git-scm.com/docs)
* [I did something wrong and i don't know what to do](http://ohshitgit.com/)

## Armed and ready

Before coding we need to have the good tools !

* Terminal : take the time to configure a productive tool

  * You can use your OS embedded terminal or install [hyper](https://hyper.is/)
    if you're using your personal computer
  * Use **zsh** instead of bash. If you start with zsh :

    * install zsh

    ```zsh
    # on Ubuntu
    apt-get install zsh

    # on OSX
    brew install zsh
    ```

    * install [Oh my zsh ](https://github.com/robbyrussell/oh-my-zsh)

    ```zsh
    # on Ubuntu
    sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"

    # on OSX
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
    ```

    * change default shell : `chsh -s /bin/zsh`

* Text editor : install [visual studio code](https://code.visualstudio.com/)

  * You may use _Atom_, _VIM_, _Emacs_ or _Sublime Text_ if you're accurate with
    any of them. In this case, it's up to you to install the right plugins
    related to this training. IDE are not allowed.
  * Coding must be _cool_ ! Install **Material icon theme** plugin and set color
    theme to **Monokai Dimmed**. Finally install
    [Fire Code](https://github.com/tonsky/FiraCode) fonts (yeah you now have a
    font with ligatures)
  * Alter code user parameters (menu : Code > Préférences > Paramètres ) to :

  ```
    "typescript.validate.enable": false,
    "typescript.format.enable": false,
    "editor.fontLigatures": true,
    "editor.fontFamily": "Fira Code",
  ```

* Node.js : Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript
  engine. Node.js uses an event-driven, non-blocking I/O model that makes it
  lightweight and efficient. Node.js' package ecosystem, npm, is the largest
  ecosystem of open source libraries in the world.<br/> You will use
  [nvm](https://github.com/creationix/nvm) (node version manager) to install
  node and manage versions used.

```zsh
# on Ubuntu
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

# on OSX
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

source ~/.zshrc #or source /.bash_rc if you didn't get zsh installed
nvm install --lts #install LTS version of node and related npm cli
```

## Bootstrap your project

We will code in Javascript language following the
[ECMAScript2018 specification](https://tc39.github.io/ecma262/) and using
[node.js runtime](https://nodejs.org/en/docs/). We will use
[npm as package manager](https://nodejs.org/en/docs/)with
[npm cli](https://docs.npmjs.com/cli/npm)

First we will initialize a new node.js project with npm

```zsh
git clone git@github.com:miage-lille/intoduction-to-node-js.git
cd intoduction-to-node-js.git
npm init
code .
```

You can see you have now a
[package.json](https://docs.npmjs.com/files/package.json) file. This file
describe your project and was create by `npm init`

## Walking across Javascript

In case of trouble read the
[Javascript documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
! We will do a first program to illustrate some piece of original syntax.

To execute the code with node runtime, run : `node src/hero.js`

Edit src/hero.js

```js
//this is a variable with string type
let weapon = 'knife';
weapon = 'hand';
//this is a reference constante with string type
const name = 'Negan';
try {
  // The value of a constant cannot change through re-assignment, and it can't be redeclared.
  name = 'Rick';
} catch (error) {
  console.log('name is a constant. It can not be changed');
}

//this is an Object. Object data structure is often used as a product type
const hero = {
  name, //= name : name
  weapon,
  heart: 5,
  quote: () => 'There is always next time, I suppose', //lambda = function(){return 'There is always next time, I suppose'}
  strike: function() {
    //need to use anonymous function instead of lambda to access `this`
    return this.weapon === 'spiked bat' ? 'kill' : 'hurt'; //=if(weapon === 'spiked bat'){return 'kill'}else{return 'hurt'}
  },
};

// const is a reference constante !
// object keys are not protected, so the following statement is executed without problem
hero.name = 'Carl';
console.log(`A new hero called ${hero.name} is born`);

console.log('First strike', hero.strike()); //hurt
hero.weapon = 'spiked bat';
console.log('Second strike', hero.strike()); // kill

// we can enhance hero
hero.speed = '5';
// loose equality compares two values for equality, after converting both values to a common type.
console.log(`hero.heart == hero.speed ? ${hero.heart == hero.speed}`); //never use it !
// strong equality compares two values for equality
console.log(`hero.heart === hero.speed ? ${hero.heart === hero.speed}`);

// we create a copy of hero
const clone1 = { ...hero };
console.log(`clone1 === hero ? ${clone1 === hero}`); //false : it's not the same reference. No deep equality !

// create a new object from (keys,values) of clone1, alter name & weapon and add a new property
const clone2 = {
  ...clone1,
  name: 'Rick',
  weapon: 'gun',
  generation: 2,
};

// this is an Array
const heroes = [hero, clone1, clone2];

const heroesNames = [];
// Array.prototype.forEach :: (function) => void
heroes.forEach(h => heroesNames.push(h.name));
console.log(`My heroes are ${heroesNames.join(', ')}`);

// forEach should be replace by map
// Array.prototype.map :: (function) => Array
const names = heroes.map(h => h.name);
console.log('you can spread lists => ', ...names);

// this is a named function
function haveAGun(people) {
  return people.weapon === 'gun';
}
// Array.prototype.filter :: (function) => Array
const heroesWthAGun = heroes.filter(haveAGun);
console.log(`Only ${heroesWthAGun.length} hero with a gun`);

// Set object lets you store unique values of any type
const uniqueNames = new Set(names);
console.log(`uniqueNames contains ${uniqueNames.size} heroes`);

// class is just syntax sugar in Javascript. There is no class, JS is a prototype based object language
class Zombi {
  constructor(heart) {
    this.heart = heart;
  }
  // Instance methods is call from instance of the 'class'
  roar() {
    return 'Aaaaargh !';
  }
  bite(people) {
    people.heart--;
  }
  // Prototype method is call from the 'class'
  static isAlive(zombi) {
    return zombi.heart > 0;
  }
}

const bob = new Zombi(1);
const superBob = new Zombi(5);
console.log(`Bob sayed ${bob.roar()}`);
bob.bite(hero);
console.log(`${hero.name} have ${hero.heart} life points`);
superBob.bite(bob);
!Zombi.isAlive(bob) ? console.log('Bob died AGAIN !') : console.log(bob.roar());
```

### Unit testing

We will use [Jest](https://facebook.github.io/jest/) as test framework

1. install jest as a dev dependency

```
npm i -D jest
```

`npm i` means "install" and `-D` means "devDependencies" (we use `-S` for "dependencies") and `jest` is the name of the package in the [npm registry](https://www.npmjs.com/package/jest)

2. add `"test": "jest"` to `script` section of your `package.json` which should
   look like :

```json
{
  ...
  "scripts": {
    "test": "jest"
  },
  ...
}
```

3. usage

```
npm run test
```

## Exercices

Now it's time to practice

### First exercice

Edit ex1.js to follow specifications defined in `__tests__/ex1.test.js`

### Second exercice

Edit ex2.js to follow specifications defined in `__tests__/ex2.test.js`

### Third exercice

you must complete the specifications in `__tests__/ex3.test.js` and then
implement `src/ex3.js`

Go to next step [Javascript Tooling](./TOOLING.md)
