# Distant Stars - Introduction
In this part of the course, we will set up your local development environment so that you are ready
to handle the challenges of the story. This will consist of two steps:

1. Loading your computers state (aka, getting the source code)
2. Booting up the ship's computer core (aka, running the source code)

## Loading your computers state
Since your ship's computer runs on good old git, the easiest way to get your computer source code
into Visual Studio Code is to just clone the git repository. To do that, let's start by opening a
terminal.

Once you've got that open, navigate to the directory where you want to copy the source code folder
into by using:
```
cd path/to/your/code/folder
```
where **path/to/your/code/folder** is the path to the folder you want to have the source code in.
You can also use
```
cd ..
```
to change back to the parent directory. Finally, if you want to create a new folder, you can use
```
mkdir folderName
```
Once you are where you want to be, you can start the code download by executing
```
git clone https://github.com/EliasRut/distant-stars.git
```
which will pull the latest version of the master branch into a new distant-stars folder. Now all you
need to do is to navigate into that new folder, and open your code editor. You can do this by 
executing the following in your terminal:
```
cd distant-stars
code .
```
## Booting up your systems
To see the current state of your ship's computer system, you can make use the **start** script 
defined in the repositories package.json file. This script uses the **node** command to start up
the mainframe and run the system diagnostics test, and reads as follows:
```json
  "scripts": {
    "start": "node src/coreSystems/mainframe.js && node src/coreSystems/systemControlIntegration.js"
  },
```

To run this script, we can make use of the node package manager, that know about everything 
happening in the package.json file. Node package manager, or **npm** for short, is a set of tools
for dealing with JavaScript projects, from handling dependencies to setting up new projects and
running node scripts. The **npm run scriptName** command can be used to start any scripts defined
in the scripts section of your package.json file.

Let's get started by running
```
npm run start
```

This should produce an output similar to this one:
```
                     `. ___
                    __,' __`.                _..----....____
        __...--.'``;.   ,.   ;``--..__     .'    ,-._    _.-'
  _..-''-------'   `'   `'   `'     O ``-''._   (,;') _,'
,'________________                          \`-._`-','
 `._              ```````````------...___   '-.._'-:
    ```--.._      ,.                     ````--...__\-.
            `.--. `-`                       ____    |  |`
              `. `.                       ,'`````.  ;  ;`
                `._`.        __________   `.      \'__/`
                   `-:._____/______/___/____`.     \  `
                               |       `._    `.    \
                               `._________`-.   `.   `.___
                                                  `------'`
Starting mainframe....
-> Mainframe systems loaded.
Loading system control software...


System control software loaded.
Running system diagnostics...

===========================================================
  Main system check
===========================================================
  Main computer systems...................... online
  Bridge control systems..................... offline
  Life support............................... offline
  Main Reactor............................... offline
  Thrusters.................................. offline
  Navigation systems......................... offline
  Scanners................................... offline
  Deflector shields.......................... offline
  Targeting systems.......................... offline

===========================================================
  Starting failed subsytem trace
  Tracing bridge control systems
===========================================================
  Critical system access..................... denied
  Telemetry data............................. missing
  Ship clocks................................ inconsistent


Ship systems shutting down
```
### Understanding the system output
This code base is setup in such a way that, assuming only typical erros, you should always at least
get to the line stating
```
Loading system control software...
```
If you produced an error that stops node from even running your code, you will now see an error
message followed by what is called a stack trace, listing where your error is. Something like this:
```
Starting mainframe....
-> Mainframe systems loaded.
Loading system control software...


/home/elias/Code/space-ranger/src/lifeSupport.js:16
}
^

SyntaxError: Unexpected end of input
    at Module._compile (internal/modules/cjs/loader.js:721:23)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:787:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Module.require (internal/modules/cjs/loader.js:690:17)
    at require (internal/modules/cjs/helpers.js:25:18)
    at Object.<anonymous> (/home/elias/Code/space-ranger/src/coreSystems/systemControlIntegration.js:2:85)
    at Module._compile (internal/modules/cjs/loader.js:776:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:787:10)
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! space-ranger@1.0.0 start: `node src/coreSystems/mainframe.js && node src/coreSystems/systemControlIntegration.js`
npm ERR! Exit status 1
npm ERR! 
npm ERR! Failed at the space-ranger@1.0.0 start script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
npm WARN Local package.json exists, but node_modules missing, did you mean to install?

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/elias/.npm/_logs/2020-09-09T20_51_58_806Z-debug.log
```

If there is no error, you will see the line 
```
System control software loaded.
```
followed by a list of main system checks, one for each of the lessons that make up this
course - and you get
```
  Main computer systems...................... online
```
just for finishing this introduction lesson.

Finally, you'll get a list of subsystems that represent individual tasks of the current unfinished
lesson. Assuming you have not solved any tasks yet, you will see
```
===========================================================
  Starting failed subsytem trace
  Tracing bridge control systems
===========================================================
  Critical system access..................... denied
  Telemetry data............................. missing
  Ship clocks................................ inconsistent
```

telling you that the **bridge control** chapter is the next one that is unfinished, and that the
three tasks in it are currently failing.

## Next steps
This is the end of the introduction lesson. The next one will be your first step into writing code,
and deals with **value types**, the basics of **functions** and the **return** statement.

[Chapter 1, bridge control](BRIDGE_CONTROL.md "Chapter 1 - Bridge Control").