
#Nested Forms!

What's up Triston

Havin trouble getting rollup to work. When trying to use the dts plugin, it's generating *typescript* files that are
then getting called javascript files. Idk it's weird.

I guess I just don't understand all these rollup plugins, like apparently the dts plugin only works if you've already generated a .d.ts file,
but you can only generate one of those if you run the typescript compiler, which is rollup's job!

So hilariously, the solution right now is: 
1. run tsc to get the declaration files generated
2. delete the javascript file
3. run rollup 
4. ¯\_(ツ)_/¯