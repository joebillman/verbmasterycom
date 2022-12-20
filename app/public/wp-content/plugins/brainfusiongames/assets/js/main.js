
let defaultWidth = 1366;
let defaultHeight = 768;
let iOS;
let isHD = false;
let isPortrait = false;
let maintainAspectRatio = true;
let outputDebugInfo = false;
let scaleStage = true;
let stage;
let verbGame;

function _onLoad()
{
    infoPopup();
    iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if(window.innerWidth > defaultWidth)
    {
        isHD = true;
    }
    if(window.innerHeight > window.innerWidth)
    {
        isPortrait = true;
        defaultWidth = 980;
        defaultHeight = 1690;
    }
    else
    {
        isPortrait = false;
        defaultWidth = 1366;
        defaultHeight = 768;
    }
    createVerbGame();
}

function createVerbGame()
{
    verbGame = new VerbGame("verb-game-canvas", globalVars.assetUrl);
    stage = verbGame.getStage();
    resize(maintainAspectRatio, scaleStage, outputDebugInfo);
}

function handleResize()
{
    resize(maintainAspectRatio, scaleStage, outputDebugInfo);
}

function infoPopup(){
    //alert("Hello there this is a test popup");
    //alert("url: "+php_vars.assetUrl);
}

function resize(maintainAspectRatio=false, scaleStage=false, outputDebugInfo=false)
{
    let curStageWidth = $("#verb-game-canvas").prop("width");
    let curStageHeight = $("#verb-game-canvas").prop("height");
    let curWindowWidth = screen.width < window.innerWidth && !iOS ? screen.width : window.innerWidth;
    let curWindowHeight = screen.height < window.innerHeight && !iOS ? screen.height : window.innerHeight;
    let desiredWidth = (isHD) ? defaultWidth*2 : defaultWidth;
    let desiredHeight = (isHD) ? defaultHeight*2 : defaultHeight;
    let headerAndFooterHeightTotal = 0;
    let padding = 0;
    let aspectRatio = desiredWidth / desiredHeight;
    let targetHeight;
    let targetScale;
    let targetWidth;
    let usableHeight = curWindowHeight - headerAndFooterHeightTotal - padding;
    let usableWidth = curWindowWidth - padding;

    if(isPortrait)
    {
        aspectRatio =  desiredHeight / desiredWidth;
        targetScale = usableHeight / desiredHeight;
    }
    else
    {
        targetScale = usableWidth / desiredWidth;
    }

    if(targetScale > 1)
    {
        targetScale = 1;
    }
    if(targetScale <= 0)
    {
        targetScale = .001;
    }
    if(scaleStage)
    {
        stage.scaleX = stage.scaleY = targetScale;
    }
    if(isPortrait)
    {
        targetWidth = desiredWidth * targetScale;
        if(targetWidth > usableWidth)
        {
            targetScale = usableWidth / desiredWidth;
        }
    }
    else
    {
        targetHeight = desiredHeight * targetScale;
        if(targetHeight > usableHeight)
        {
            targetScale = usableHeight / desiredHeight;
        }
    }

    if(targetScale > 1)
    {
        targetScale = 1;
    }
    if(targetScale <= 0)
    {
        targetScale = .001;
    }
    targetWidth = desiredWidth * targetScale;
    targetHeight = desiredHeight * targetScale;
    if(scaleStage)
    {
        stage.scaleX = stage.scaleY = targetScale;
    }
    if(maintainAspectRatio)
    {
        //console.log("there");
        stage.canvas.width = targetWidth;
        stage.canvas.height = targetHeight;
    }
    else
    {
        //console.log("here");
        stage.canvas.width = usableWidth;
        stage.canvas.height = usableHeight;
    }
    stage.update();

    if(outputDebugInfo)
    {
        console.log("curStageWidth: "+curStageWidth);
        console.log("curStageHeight: "+curStageHeight);
        console.log("curWindowWidth: "+curWindowWidth);
        console.log("curWindowHeight: "+curWindowHeight);
        console.log("aspectRatio: "+aspectRatio);
    }
}

document.addEventListener("DOMContentLoaded", function()
{
    window.addEventListener("resize", handleResize, false);
});

window.addEventListener("load", _onLoad, false);
