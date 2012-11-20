VNE
===

A web-based Visual Novel Engine. Uses JavaScript, jQuery, Backbone.js, and Underscore.js

Currently only capable of running a very linear story.
Can swap out backgrounds and characters, but can't make decisions or access the menu quite yet.

The engine works by reading from a script, which in the sample is pulled from a text file.
Any lines starting with '[' are treated as command lines, and the instructions on them will be
executed.
All other lines are treated as text to display. Any of these lines with a ':' character will treat
everything before the ':' as the name of the character speaking and will put that text into the 
speaker div.

It is currently quite simple, so reading over the sample text should give you a pretty good idea
of how to go about making your own game.

Backgrounds are naturally drawn from the background folder, and characters from the characters
folder.

Any questions or desires can be directed to my email: bcrucitti@gmail.com

I will keep working on this project, so keep an eye on updates.

Title Screen Setup
var option = new TitleOption; //create a new option
option.confirmed = function(){
	//what to do if this option has been selected and Enter pressed
}
option.selected = function(){
	//what to do if this option is selected/highlighted
};
option.deselected = function(){
	//what to do if this option isn't selected aka if it isn't active
};
option.init = function(){
	//anything that needs to be done when this option is initialized
};
vn.addTitleOption(option); //add option to Visual Novel object
//repeat the above steps as necessary 