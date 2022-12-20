<?php
/**
Plugin Name: Brain Fusion Games
Plugin URI: https://www.brainfusiongames.org
Description: Fun games that can be added to your WordPress site
Version: 1.0.0
Requires at least: 5.9
Requires PHP: 7.2
Author: Brain Fusion Games
Author URI: https://www.verbmastery.com
*/

/*
This program is used to add fun games to your learning website

Copyright 2022 Brain Fusion Games
*/

// Make sure we don't expose any info if called directly
if ( !function_exists( "add_action" ) ) {
    echo "Hi there!  I'm just a plugin, not much I can do when called directly.";
    exit;
}

// Setup
define("BF_PLUGIN_DIR", plugin_dir_path(__FILE__));

// Includes
include(BF_PLUGIN_DIR."includes/register-blocks.php");

// Hooks
add_action("init", "bf_register_blocks");
add_action("wp_enqueue_scripts","bf_init_scripts");

// Functions
function bf_init_scripts() {
	wp_register_script( "bf-wp-vars", plugin_dir_url( __FILE__ ) . "assets/js/bf-wp-vars.js" );
	wp_localize_script( "bf-wp-vars", "globalVars",
		array(
			"assetUrl" => plugin_dir_url( __FILE__ )."assets/"
		)
	);
	wp_enqueue_script( "bf-wp-vars" );
	wp_enqueue_script( "bf-jquery", plugin_dir_url( __FILE__ ) . "assets/js/jquery-3.6.0.min.js" );
	wp_enqueue_script( "bf-gsap", plugin_dir_url( __FILE__ ) . "assets/js/gsap-3.9.1.min.js" );
	wp_enqueue_script( "bf-createjs", plugin_dir_url( __FILE__ ) . "assets/js/createjs-1.3.4.js" );
	wp_enqueue_script( "bf-spritesheetloaderalt", plugin_dir_url( __FILE__ ) . "assets/js/spritesheetloaderaltered.js" );
	wp_enqueue_script( "bf-scalebitmap", plugin_dir_url( __FILE__ ) . "assets/js/scalebitmap.min.js" );
	wp_enqueue_script( "bf-bftemplate", plugin_dir_url( __FILE__ ) . "assets/js/bftemplatelibrary.min.js" );
	wp_enqueue_script( "bf-verbgame", plugin_dir_url( __FILE__ ) . "assets/js/verb-game.js" );
	wp_enqueue_script( "bf-main", plugin_dir_url( __FILE__ ) . "assets/js/main.js" );
}