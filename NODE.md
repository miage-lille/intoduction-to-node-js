# Discover node.js

## About npm

Since the start of this course, we used npm - Node Package Manager - which is the package manager for node.js.
It includes :

* the [npm registry](https://www.npmjs.com/) which is a public collection of open-source code packages.
* the [`npm` command line client](https://docs.npmjs.com/cli/help) that allows developers to install and publish those packages. We used it when we did `npm init`, `npm i` _package_name_ or `npm run` _script_name_

npm (for ease of dependency management) and the V8 engine (for performance) are the two legs that allowed node.js to exist and javascript to become incredible!

## About node.js

We will try to understand the description on node's website :

_Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient._

* **built on Chrome's V8 JavaScript engine** : to execute the code that we write in javascript, node.js use the Google V8 Engine which is also used by Chrome or Chromium. Written in C++, V8 was released in 2008 and compiles directly to native machine code before executing it. The compiled code is additionally optimized dynamically at runtime.
* **event-driven model** : The code we are going to write will be based on an event system. The objects that we will create will emit events during their lifecycle. Then it is possible to subscribe and listen to these events in order to perform specific operations when they are emitted.
* **non-blocking I/O model** : Within node.js most of the I/O runs asynchronously. This makes possible to manage more competitions by avoiding the waiting phases.

## Modules

In the Node.js module system, each file is treated as a separate module. Each module is a singleton which means the first time a module is call it will be executed and then each time it will be import later you will get the same reference to the module.

### Practice to understand

Files are in src/node/

* edit zombi.js file

```js
// decalare an Array and make it accessible with module import
export const horde = [];

// decalare a Zombi class, not accessible outside the module
class Zombi {
  constructor(heart) {
    this.heart = heart;
  }
  // Instance methods is call from instance of the 'class'
  roar() {
    return 'Aaaaargh !';
  }
}

// export a factory of zombies
export function zombiFactory(heart) {
  return new Zombi(heart);
}

// export a default function to swarm a horde
export default size => {
  for (let i = 0; i < size; i++) {
    horde.push(zombiFactory(Math.floor(Math.random() * 10 + 1)));
  }
};
```

* edit another.js file

```js
import swarm, { horde } from './zombi';

export default function init() {
  swarm(5);
  console.log('This is the horde inside another.js', horde);
}
```

To `import` function, variable, class from a module you import it by its name between brackets. The import without brackets is the `export default` of the module. You can have only one default export by module and you can name it as you wish when importing it.

* edit main.js file

```js
import foo from './another';
import { horde, zombiFactory } from './zombi';

console.log('This is horde before foo', horde);
foo();
console.log('This is horde after foo', horde);

const roaring = zombiFactory(1).roar();
console.log(`A new Zombi sayed ${roaring}`);
```

* run the code

```zsh
# From the root dir of the project
./node_modules/.bin/babel-node ./src/node/main.js
# You can instead create a new script in your package.json and run it
```

As you can see, you imported the same reference of `horde` in `another.js` and `main.js`.

## Events

Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain kinds of objects (called "emitters") periodically emit named events that cause Function objects ("listeners") to be called.

All objects that emit events are instances of the EventEmitter class. These objects expose an eventEmitter.on() function that allows one or more functions to be attached to named events emitted by the object. Typically, event names are camel-cased strings but any valid JavaScript property key can be used.

When the EventEmitter object emits an event, all of the functions attached to that specific event are called synchronously. Any values returned by the called listeners are ignored and will be discarded.

### Practice to understand

* Edit sonar.js

```js
import EventEmitter from 'events';

const zombiEmitter = new EventEmitter();

zombiEmitter.on('detected', () => {
  console.log('Zombi detected. RUN !');
});

zombiEmitter.on('bitten', () => {
  console.log('You have been bitten. Sorry you will be turned into zombi');
});
export default zombiEmitter;
```

* Edit barricade.js

```js
import zombiEmitter from './sonar';

zombiEmitter.emit('detected');
zombiEmitter.emit('detected');
zombiEmitter.emit('bitten');
```

* run the code

```zsh
# From the root dir of the project
./node_modules/.bin/babel-node ./src/node/barricade.js
# You can instead create a new script in your package.json and run it
```

## Streams

A [stream](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html) is an abstract interface for working with streaming data in Node.js.
There are many stream objects provided by node.js. For instance, a request to an HTTP server and process.stdout are both stream instances. Streams can be readable, writable, or both. All streams are instances of EventEmitter.

### Practice to understand

* Edit opening.js

```js
import fs from 'fs'; //https://nodejs.org/dist/latest-v8.x/docs/api/fs.html
import path from 'path'; //https://nodejs.org/dist/latest-v8.x/docs/api/path.html
const file = path.join(__dirname, 'assets', 'WD_Theme.mp3');

fs.stat(file, (err, stats) => {
  const total = stats.size;
  let progress = 0;
  //create a readable stream
  const read = fs.createReadStream(file);
  //add a listener on built-in 'data' event
  read.on('data', chunk => {
    progress += chunk.length;
    console.log('I read ' + Math.round(100 * progress / total) + '%');
  });
  read.on('close', () => {
    console.log('Reading is finished');
  });
});
```

Stream are really usefull because you can easily [pipe](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_readable_pipe_destination_options) a Readable stream into a Writable stream. The flow of data will be automatically managed so that the destination Writable stream is not overwhelmed by a faster Readable stream.

### Exercice 6

Edit `opening.js` to attach a writable stream to the read stream that will :

* copy 'WD_Theme.mp3' to 'copy.mp3' in the same folder
* log a finished message when copy is finish

## Promises

A promise is an object that may produce a single value some time in the future: either a resolved value, or a reason that it’s not resolved. ¯\\\_(ツ)\_/¯

Promises are eager, meaning that a promise will start doing whatever task you give it as soon as the promise constructor is invoked. If you need lazy, check out [observables](https://egghead.io/lessons/javascript-introducing-the-observable). _We will not use Observable during this course, if you're interested in reactive programming, you could play with [RxJS](http://reactivex.io/rxjs/) which is the leading implementation in Javascript industry._

A promise is an object which can be returned synchronously from an asynchronous function. It will be in one of 3 possible states:

* **Fulfilled**: onFulfilled() will be called (e.g., resolve() was called)
* **Rejected**: onRejected() will be called (e.g., reject() was called)
* **Pending**: not yet fulfilled or rejected

A promise is **settled** if it’s not pending (it has been resolved or rejected). Once settled, a promise can not be resettled. The immutability of a settled promise is an important feature.

Promises are defined by by the [Promises/A+ specification community](https://promisesaplus.com/implementations)
There are many implementations which conform to the standard, including the JavaScript standard [ECMAScript promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or [Bluebird](http://bluebirdjs.com/docs/why-bluebird.html) which is used in many libraries.
Promises are not related to node.js but in an asynchronous program it is a convenient way to manage things that need to be synchronously resolved. Usage of promise grow since ES6 because it avoid 'callback hell'.

Since most people are consumers of already-created promises, I will explain consumption of returned promises. We could explain how to create them in a later practice.

### Practice to understand

The first time you will encounter the need for promise will probably be to fetch a remote API. You don\'t have access to window.fetch on node.js so we will install `request-promise` :

```zsh
npm i -S request-promise request
```

* Edit watcher.js

We will create an API that return a satelite view on the site

```js
import http from 'http';
import fetch from 'request-promise';

const server = http.createServer((request, response) => {
  const nasaEarthApi =
    'https://api.nasa.gov/planetary/earth/imagery?lon=3.137797&lat=50.608118&date=2014-12-01&cloud_score=True&api_key=DEMO_KEY';
  fetch(nasaEarthApi)
    .then(data => {
      console.log(data);

      const dataObj = JSON.parse(data);
      response.writeHead(200, { 'Content-Type': 'text/json' });
      response.write(`{"image" : "${dataObj.url}"}`);
      //now you understand streams, you can pipe response to request
      request.pipe(response);
    })
    .catch(err => console.log(err.stack));
});

server.listen(3000);
console.log('Satelite is waiting');
```

* Try it

```zsh
./node_modules/.bin/babel-node ./src/node/watcher.js
# in another term
curl http://127.0.0.1:3000
```

* Edit watcher.js again and retry it

```js
import http from 'http';
import fetch from 'request-promise';
import util from 'util'; //https://nodejs.org/dist/latest-v8.x/docs/api/util.html
const setTimeoutPromise = util.promisify(setTimeout); //setTimeout use callback we promisify it !

const server = http.createServer((request, response) => {
  const nasaEarthApi =
    'https://api.nasa.gov/planetary/earth/imagery?lon=3.137797&lat=50.608118&date=2014-12-01&cloud_score=True&api_key=DEMO_KEY';
  fetch(nasaEarthApi)
    //yes we slow the API
    .then(data => setTimeoutPromise(1000, JSON.parse(data))) //Remember it means function(data){return setTimeoutPromise(1000, JSON.parse(data);}
    .then(dataObj => {
      response.writeHead(200, { 'Content-Type': 'text/json' });
      response.write(`{"image" : "${dataObj.url}"}`);
      //now you understand streams, you can pipe response to request
      return request.pipe(response);
    })
    .catch(err => console.log(err.stack));
});
server.listen(3000);
console.log('Satelite is waiting');
```

As you can see, you can chain promises !

```js
first_promise()
    .then(function(params_returned_from_first_promise_when_resolved) { return second_promise(); })
    .then(function(params_returned_from_second_promise_when_resolved) { return third_promise();  })
        ...
    .then(function(params_returned_from_nth-1_promise_when_resolved) { return nth_promise();    })
    .catch(function(err_from_any_promise){/*deal with it*/});
```

The `error` in `catch` function may come from a `throw` (bad practice but works and may append on unhandled erros) or `Promise.reject()`.

### Exercice 7 : final practice

Your objective is to run a node.js http server `src/node/ex7/server.js` that communicate with a client .
This server get a parameter `num` from the query string and return the persistence in response body.
The function, persistence, that takes in a positive parameter num and returns its multiplicative persistence, which is the number of times you must multiply the digits in num until you reach a single digit.

1. Uncomment the file `__tests__/ex7.test.js` to have a specification of this function.
2. Implement persistence function

   NB1 : You may need to use [reduce](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce) function to solve it easily
   NB2 : You may cast a Number to String with [toString](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/toString) and you can [split](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/split) a String into an Array

3. Implement the server
   It is similar to what we have done before except you need to [parse the url](https://nodejs.org/dist/latest-v8.x/docs/api/url.html#url_class_urlsearchparams) you get in the [http request](https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_http_request_options_callback)

   You can test your server with

   ```zsh
   curl http://127.0.0.1:5000/?num=4
   ```

4. Implement the client that log the persistence of 4738

   The client must handle a promise to get response of the server and then log result of persistence.

   NB : to test it you should have a term running the server and another runing the client.

### Congrats

There is many more in node.js but understand Javascript, modules, events, streams and promise is mandatory.
Being here means that you have already made a big step towards the world Javascript: congratulations! (๑•̀ ㅂ•́)ง✧
Next time we will see how to build a proper REST API.
