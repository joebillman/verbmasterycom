<?php

function bf_register_blocks() {
	$blocks = [
		["name" => "fancy-header"],
		["name" => "bf-game"]
	];

	foreach($blocks as $block) {
		register_block_type(BF_PLUGIN_DIR."build/blocks/".$block["name"]);
	}

}