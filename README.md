# Lazify
Makes things lazy. Mostly useless for now. Experiments seem good.

## Getting Started
For Node:
```javascript
//Create a lazy version of a function that returns functions
var lazify = require('Lazify.js');
var lazyThing = lazify(thing);
lazyThing()()();
//nothing has occurred yet
lazyThing.exec()
//thing()()() is executed

//Create a lazy version of a jQuery like object with methods that return an instance
//of the original object
var lazyQuery = lazify($, ['appendTo']);
lazyQuery('#any.selector').appendTo('#another.query');
//nothing has occurred yet
lazyQuery.exec();
//$('#any.selector').appendTo('#another.query') is executed
```

For Browser:
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/wwalser/lazify/master/dist/grunt-sample.min.js
[max]: https://raw.github.com/wwalser/lazify/master/dist/grunt-sample.js
Same API, in a browser, you can figure it out.

## Documentation
[Code][code] is the documentation for now.

[code]: https://github.com/wwalser/lazify/blob/master/lib/Lazify.js

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
From the cli:
```
npm install
grunt
```

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Wesley Walser  
Licensed under the GPL license. Let me know if this is a problem.
