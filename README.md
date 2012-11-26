VNE
===

A web-based Visual Novel Engine. Uses JavaScript, jQuery, Backbone.js, and Underscore.js

Requires jQuery, Backbone.js, and Underscore.js

Released under the MIT License

Any questions or desires can be directed to my email: bcrucitti(at)gmail.com

The goal of this engine is to be user friendly, so anyone using this to make a game
should only have to set up title screen options and the script(s) used
by the game.


+Title Screen Setup
	var vn = new VisualNovel;
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
	//repeat the above steps for each option on your title screen 


+Script Setup

	The engine works by reading from a script, which in the sample is pulled from a text file.
	Any lines starting with '[' are treated as command lines, and the instructions on them will be
	executed.
	All other lines are treated as text to display. Any of these lines with a ':' character will treat
	everything before the ':' as the name of the character speaking and will put that text into the 
	speaker div.

 -Script Commands
	Script commands follow the format of:
	[command: argument{; command: arguement;}]
	
	Existing commands are as follows:
	background: Accepts filenames of image files in the background folder.
		Replaces background image with the input image.
		
	character_left: Accepts filenames of image files in the character folder.
		Replaces the character on the left with the input image.
	
	character_right: Accepts filenames of image files in the character folder.
		Replaces the character on the right with the input image.
		
	load_text: Accepts strings. Input is sent to retreiveText.php by way of post request.
		Loads new script text according to how retreiveText.php handles input.
	
	goto: Accepts integers and integers preceeded by a '+' or '-' symbol.
		Goes to a specific line in the script (indexes from 0).
		'+' or '-' can be used to move relative to the location of the command in the script.
			If this is used in a decision point section, then it will move relative to the '}'
			at the end of the section.

	nothing: Proceed as usual. Used as a place holder in decision points.

 -Decision Points
	Decision points present options to the player and different commands can be
	activated depending on the selected option.
	Decision points follow the format of:
	{option1: [commandLine1],
	option2: [commandLine2],
	...
	optionN: [commandLineN]}
	
	commandLineK will be performed if optionK is selected, no other commands in this section
	will be performed.

Backgrounds are naturally drawn from the a 'background' folder, and characters from a 'characters'
folder, although this can be changed by altering the code.