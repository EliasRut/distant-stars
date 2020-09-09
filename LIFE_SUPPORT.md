# Distant Stars - Life Support
In this chapter, you will get your life support systems online by implementing some simple
operations on numbers, strings and boolean values.

To do that, you will need to
* understand **function parameters**,
* know how to define and initialize **variables** and
* know about **operators** for
  * strings,
  * numbers and
  * booleans.

## Finding the source code
The JavaScript filepath for this lesson is 
```
src/lifeSupport.js
```
Go on and open it up in your editor.

## Challenges
Finally, your bridge computer is online and showing you the current state of affairs. However,
you really don't like what you are seeing - hardly any main system is functional!

The most immediate problem seems to be that the life support systems have gone haywire, you'll
need to set up some simple routines to make sure that it doesn't get too chilly, and that the air
stays clean.

To pile up on bad news, your main reactor is still offline - you'll need to look into that later.
The good news is that the backup reactor is running. But that limits the subsystems that you can
have online at any time, so you'll need to find a way of deciding what to turn on and what not to.

## Calculate Power requirements
First things first, the calculation routine for estimating power requirements is gone. Luckily, it's
a rather simple calculation.

Find the function **calculatePowerRequirements**. It takes three numbers as parameter, representing
the energy need for **lighting**, **heating** and **airflow**. The function is supposed to just
calculate the sum of these values and return it. The mainframe computer is going to run one
calculation for each of the areas of your ship, passing in the area's requirements for lighting,
heating and airflow accordingly.

Hint: Short code is not always good code. In most cases, an explicit statement of what your code is
supposed to be doing helps with **code readability**, so how easy it is to read your solution. One
way of improving readability is giving clear names to calculation steps and sums. As an exercise,
define a constant with a fitting name inside of the **calculatePowerRequirements** function, and
assign it the value of your calculation. Then, return that constant.

Hint Hint: Most of the JavaScript world has agreed on camelCase for variable names - that is, a
**lower case letter** at the beginning, with an **upper case letter for additional words**.

## Decide on subsystems to keep online
Even after fixing the power requirement calculation, there's still a bit too little juice left to
get everything running smoothly. You'll need to turn off some of the non-critical life support
sub systems, preferably those that have a high power draw.

To do so, update the **keepSubSystemOnline** function. This function takes two **boolean**
parameters, **isCriticalSystem** and **hasHighEnergyDraw**.

The ship mainframe computer expects a **boolean** value, telling it whether to keep a system it
describes via the two parameters online.

## Fix unit of temperature control
It seems that there is a bug in the temperature control, somehow the default has been set to degrees
Kelvin, but the heating systems still expect a value in degrees Celsius - that can't be good.

Luckily, you remember that the conversion was x°K = (x - 273.15)°C.

To fix the problem, implement the **getTemperatureWithUnit** function. It only has one parameter,
**temperatureInKelvin**, which is numeric.

What it expects as output is a string of the form "28°C" - so a number, followed by °C.

This function will be run with multiple operating temperatures in Kelvin, if all of them return
the correct string with degrees Celsius, the problem is fixed.

## Testing your progress
Once all the tasks in this lesson are done, your system should display:
```
  Life support............................... online
```
and show the subsystem trace for the next main system to fix, the main reactor:
```
===========================================================
  Starting failed subsytem trace
  Tracing main reactor components
===========================================================
```

## Next steps
This is the end of the life support lesson. The next lesson is still in preparation and will come
online on 2020-09-17.