# Distant Stars - Bridge Control
In this chapter, you will get your bridge computer online and bring it up to date with some basic
data.

To do that, you will need to
* understand the basics of **functions**,
* be able to write **return** statements and
* be able to use values of the types 
  * string,
  * number and
  * boolean.

## Finding the source code
The JavaScript filepath for this lesson is 
```
src/brigeControl.js
```
Go on and open it up in your editor.

## Challenges
As you start up your display on your bridge computer, you are swarmed with a serious of error
messages. It seems that the computer is now effectively denying you access to any of the main
systems!

Not only that, but the name of the system you are currently in reads as undefined - 
that can't be right.

The computer also seems to have forgotten what year it is, and unhelpfully shows that your 
travel time so far is NaN - Not a Number.

Before you get anything else started, you'll need to take care of these problems.

## Restore Critical system access
Find the function called **allowMainSystemControl** in your bridgeControl.js file. It should look
like this:
```
const allowMainSystemControl = () => {
};

```

This function was supposed to return a **boolean value** stating whether or not the current user
should have access right to the main systems. But since it's just you on board, you can just fix
this for now by just always granting access. To do that, let the function return **true**.

## Fix telemetry data
Find the function called **getStarSystemName**. It should look like this:
```
const getStarSystemName = () => {
};
```

This used to do a lookup on the interstaller star charts, but that's broken right now. Luckily, you
know that you are in the Simia Prime, so for now we can fix the error by just providing that
information to the computer.

## Synchronize ship clocks
It seems the internal ship clocks have partially been disturbed by the solar flare. Date and time
is still correct, but for some reason, your computer no longer knows what year it is!

Good thing your memory wasn't wiped, so all you need to do is set the return of the 
**getCurrentYear** function to be, well, the current year - which of course is 2722. The function
looks like this, before your changes:
```
const getCurrentYear = () => {
};
```

## Testing your progress
Once all the tasks in this lesson are done, your system should display:
```
  Bridge control systems..................... online
```
and show the subsystem trace for the next main system to fix, the life support:
```
===========================================================
  Starting failed subsytem trace
  Tracing life support systems
===========================================================
```

## Next steps
This is the end of the bridge control lesson. The next lesson deals with **variables**, 
**operators** and **function parameters**.

[Chapter 2, life support](LIFE_SUPPORT "Chapter 2 - Life support").