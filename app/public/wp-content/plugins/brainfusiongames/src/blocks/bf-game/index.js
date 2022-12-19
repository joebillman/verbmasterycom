import {registerBlockType} from "@wordpress/blocks";
import block from "./block.json";
import "./main.css";

registerBlockType(block.name, {
    edit() {

        return (
            <>
                <div className={"editPlaceholderContainer"}>
                    <span>BF Game will go here!</span>
                </div>
            </>
        );
    },
    save() {

        return (
            <>
                <h4>Verb Games</h4>
                <div className={"canvas-container"}>
                    <canvas id="verb-game-canvas" width="1366" height="768"></canvas>
                </div>
            </>
        );
    }
});
