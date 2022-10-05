/* extension.js
 *
 * The program extends Gnome functionality by sending a meeting chain identified by a single  
 * ID.
 */

/* exported init */
'use strict';

imports.gi.versions.Gtk = "3.0";  //Specifying that we want to use API version 3 which is the most recent

/**
*
* Imports.gi library contain functions and API to access internal features of Gnome such Shell,
* Directly accessing C libraries through Clutter. ST contains features such keyboard shortcuts, 
* labels, and instant search
*/

const { Atk, Clutter, Gio, GObject, Graphene, Shell, St } = imports.gi;

const GLib = imports.gi.GLib; 

const PopupMenu = imports.ui.popupMenu;


//Declaring global variables
let emailLabel, idLabel;
let window;


const menuItem = new PopupMenu.PopupMenuItem('Item Label',
    {});

/*
* Declaring a constanst string. This string  contains command line arguments passed to thunderbird
* It defines the behavior of how thunderbird starts.
* That is, it starts thunderbird compose window passing with it variables such as email subject, body, and 
* attachment file - the calender.ics file
*/
const commandStr = "thunderbird -compose \"attachment='~/.local/share/evolution/calendar/system/calendar.ics',subject='Project discussion',body='Kindly select the most appropriate date for our meeting.<br /> Meeting ID: meeting001 <br /> Kind regards'\"";

/**
* This function when called, invokes thunderbird compose window passing command line arguments as 
* Described in the string above - #commandStr
*
*/
function sendEmail(){
    try {
    
    	/**
    	* GLIb is a Gnome class provided by Gnome API. It enable users to perform inter-process communication.
    	* one important function from the class is spawn_command_line_async() used below that allows us to 
    	* directly access the shell interface, therefore, executing terminal commands.
     	*/
        GLib.spawn_command_line_async(commandStr);
    
        // The process must have started because it didn't throw an error, but did
        // it actually succeed? By the way, where's my output?
    } catch (e) {
        logError(e);
    }
}

class Extension {
    constructor() {
        
    }

	//This function is called when the extension is enabled.
	//When this extension is enabled. this function is called which turn calls sendEmail() function
	// That opens a window to allow a user to send an email
    enable() {   
        sendEmail();     
    }
    
    
	//This function is called when an extension is disable
	//it can be used to clean up the messes created by the extension. Such as realeasing held resources
    disable() {
    }
}

function init() {
    return new Extension();
}
