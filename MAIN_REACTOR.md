# Distant Stars - Main Reactor
In this chapter, you will get your main reactor systems online by combining your knowledge about
functions, operators and conditional statements.

To do that, you will need to
* understand how to **write** and how to **call** functions
* be able to write **if** and **if else** statements
* know some functions from the **Math** library:
  * **Math.min** and
  * **Math.max** will be very helpful.

## Finding the source code
The JavaScript filepath for this lesson is 
```
src/mainReactor.js
```
Go on and open it up in your editor.

## Challenges
A nice, warm breeze makes its way unto the bridge as the life support systems pick back up from
where they left off, bringing a faint smell of air refreshener with it. The backup reactor seems to
be perfectly able to handle the current power drain and keep the lights on.

You let yourself relax a bit, knowing that any immediate danger has past.

The next step will be bringing the main reactor back online, a tricky undertaking since you 
**really** don't want it to go critical and blow up. As you scan the designs, you come across a set
of simulations that were written to check the reactor for safe operations. That's going to be 
helpful.

The solar flare has wiped a total of four functions off the reactor handling procedures. They seem
to be interconnected and based upon some reactor control subroutines that are luckily still there.

The first thing that's missing is just the calculation logic for summing up the total current power 
output from both the main reactor and the backup reactor. Next up is a function for checking whether
the power draw is within tolerance of the produced power. The emergency shutdown sequence itself is
still functional, but the code that is supposed to call it is gone. And finally, you'll need to 
write the logic handling the power generation for both the main and the backup reactor. This is 
where the simulations will come in handy.

## Calculate the total power output
Find the function **getTotalPowerOutput**. It does not take any parameters. Instead, it's intended
to gain all values it needs from two functions in the coreSystem/reactorControl code. These are
already written functions that you can simply call from withing **getTotalPowerOutput**.

The two functions are **getMainReactorOutput** and **getBackupReactorOutput**. Both do not take any
parameters. Your function should **return** the sum of the return values of these two functions.

Explanation: These functions return global states that are set in the testing procedure. So, before
the testing scripts call **getTotalPowerOutput\(\)**, they update an internal state. Whenever you
call **getMainReactorOutput\(\)** or **getBackupReactorOutput\(\)**, this internal state is then
returned. All functions you have to write in this session use this kind of logic.

## Establish whether the power output is within tolerance
After having written the calculation logic for the total power output, you read over the technical
definitions of your reactors.

* Your backup ractor can produce between 0 and 10 power, and is never critical.
* Your main reactor can produce between 0 and 50 power, and goes critical whenever it produces more
  power than is drawn from your ship systems.
* Ship systems always draw from the main reactor first, and only then from the backup reactor.

You can get the current power draw of your ship systems from another function in the
coreSystems/reactorControl scripts. This one is called **getPowerDraw**, takes no parameters and
returns the current power draw as a numeric value.

Complete the function **isPowerOutputInTolerance**. It takes no parameters and returns a boolean
value: true if the current power output is okay, false if the current power output is critical.

**Examples**: Assuming a main reactor output of 20 and a backup reactor output of 5:
* For a power draw of 25, your function should return **true**.
 * All power produced is used, so the main reactor is not critical.
* For a power draw of 30, your function should return **true**.
 * All power produced is used, so the main reactor is not critical. 5 power less than required
   from ship systems is produced, which means not everything will be running, but the reactor is
   fine.
* For a power draw of 20, your function should return **true**.
 * Not all power produced is used. But the power from the main reactor is used first, so all 20
   power from the main reactor is drawn. The 5 extra power from the backup reactor are not used,
   but the backup reactor never goes critical, so all is good.
* For a power draw of 18, your function should return **false**.
 * Not all power produced is used, and not even all 20 power that the main reactor produces is 
   used. This will cause the main reactor to go critical. 

## Shut down the main reactor if necessary
Now that you have a test for whether the power output is within tolerance, you can make use of that
to reimplement the functionality to automatically shut down the main reactor if needed.

Your pretty sure that this function saved you when the solar flare hit, otherwise the reactor might
have blown. Too bad the code has been erased, but you'll just have to rewrite it.

Find the function called **performEmergencyShutdownIfNecessary**. It does not take any parameters,
and is not expected to return anything. Instead, make use of your **isPowerOutputInTolerance**
function to test whether the reactor should shut down, and call **shutDownReactor** from the 
coreSystems/reactorControl scripts if needed. **shutDownReactor** does not take any parameters and
also does not return anything.

## Adjusting power generation
You're almost done with the main reactor systems, but the hardest part is still left to do. This one
might take some thining and some testing. You read through the reactor guidelines, once more, and
write down these rules for your program:

* The main reactor can produce between 0 and 50 power.
* The backup reactor can produce between 0 and 10 power.
* All power from the main reactor must be used, or it needs to perform an emergency shutdown.
* The main reactor output can only change between -10 to +10 in one step.
* The backup reactor can always be set to any number between 0 and 10.
* If possible, all power needed by the ship systems should also be provided.

You look at the simulations and add one in for simulating a solar flare. Some of them are pretty
complicated and are not needed right away, but you might want to try your hand on them anyway. So
you've added a constant, **runAdvancedSimulations**, to toggle them on or off.

With everything being prepared, you set yourself down to write that power adjustment script. Find
the function called **adjustReactorSystems**. It does not take a parameter, and is not expected to
return any value. Instead, it should call the functions **adjustMainReactorOutput** and
**adjustBackupReactorOutput** from the coreSystems/reactorControl scripts. Both of these functions
take one numeric parameter and do not return anything. When called, the functions check whether the
value you are providing for the respective reactor is valid and then update the reactor output.

Your goal is to write logic that will correctly set the power output of the main and the backup 
reactor using these two functions. To do so, you will need to know the current power draw, which
will be changing between calls to **adjustReactorSystems** and which you can get by calling
**getPowerDraw**, as you did for the power tolerance calculations. You might also have to reuse
**getMainReactorOutput** and **getBackupReactorOutput** to implement the
*change between -10 and +10* rule. Finally, don't forget to shut down the reactor if it becomes
necessary - you should be able to reuse your **performEmergencyShutdownIfNecessary** function.

**Explanation**: The testing scripts contain two simulations, *Simulation 1: Interplanetary flight* and
*Simulation 2: Emergency shutdown after flare*, that your function implementaiton needs to be able
to handle. These simulations start off by setting values for the starting output of the main and
backup reactor as well as the current power draw, and then go through a series of steps where they
* set a new power draw
* call **adjustReactorSystems**
* check that all systems are powered, and
* check that the reactor status is as expected \(online or offline\).

In other words, the global state of the reactor and ship systems is going to change in between calls
to **adjustReactorSystems**, so you'll need to read that state, calculate the correct power 
settings, and set them via **adjustMainReactorOutput** and **adjustBackupReactorOutput**.

**Hint**: This is by far the trickiest problem you have encountered in this course so far. Feel extra
free to ask for help. The intention of this problem is to tie everything you have learned so far
together, and to really write some clever code. It's fine if it takes you a while, but don't wait
to get help until you're frustrated.

**Hint Hint**: The **Math.min** and **Math.max** functions could be very useful here.

**Hint Hint Hint**: If you finished the example, you can change **runAdvancedSimulations** to true
to see if your reactor script can also handle the *Simulation 3: Highly dynamic power draw* and 
*Simulation 4: Full utilization* tests.

## Next steps
This is the end of the main reactor lesson. The next lesson is still in preparation and will come
online on 2020-10-08.