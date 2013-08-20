togglebutton
============

Simple utitlity to help deal with toggling actions. 

Examples

This will toggle an 'active' class on '#menu-wrapper' when '.menu-button' is clicked.


		$('#menu-wrapper').togglebutton({
			button: '.menu-button'
		});
		

Options
	class_name : override the default 'active' class that gets toggled.
	click_close : an additional selector that will toggle the wrapper as well, useful for closeing the menu wrapper on menu item click.
	clear_classes: will clear all the classes on the wrapper on toggle. 
