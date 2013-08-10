# phing-viz
> Simple phing XML visualization tool for automated documentation

![image](https://david-dm.org/mrzmyr/phing-viz.png)
![image](https://travis-ci.org/mrzmyr/phing-viz.png)

# Quick Start

#### Install dependencies

```$ npm install```

#### Build the app

The grunt task `build` could be called with `--source [path/to/build.xml]`. Default is `demo/build.xml`.

```$ grunt build```

#### Open the App 
```$ grunt uncap```

---

### Supported phing targets

- append
- copy
- delete
- echo
- exec
- fail
- foreach
- if (partially)
- input
- mkdir
- pharpackage
- phingcall
- php
- propety
- SymfonyConsole
- symlink
