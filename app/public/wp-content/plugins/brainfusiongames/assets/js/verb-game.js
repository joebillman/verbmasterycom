var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ItemScoreBoard = (function (_super) {
    __extends(ItemScoreBoard, _super);
    function ItemScoreBoard(imgId) {
        var _this = _super.call(this) || this;
        _this.imgId = imgId;
        _this._init();
        return _this;
    }
    Object.defineProperty(ItemScoreBoard.prototype, "placeholderX", {
        get: function () {
            return this._placeholderX;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ItemScoreBoard.prototype, "placeholderY", {
        get: function () {
            return this._placeholderY;
        },
        enumerable: false,
        configurable: true
    });
    ItemScoreBoard.prototype._init = function () {
        this.appModel = VGAppModel.getInstance();
        this.assetModel = VGAssetModel.getInstance();
        this._score = 0;
    };
    ItemScoreBoard.prototype.createItemIcon = function () {
        this.itemIconImg = new createjs.Sprite(this.assetModel.spriteSheet, "".concat(this.imgId, "-mini"));
        this.itemIconImg.x = this.itemPlaceholderImg.x;
        this.itemIconImg.y = this.itemPlaceholderImg.y;
        this.itemIconImg.visible = false;
        this.addChild(this.itemIconImg);
    };
    ItemScoreBoard.prototype.createItemIconPlaceholder = function () {
        this.itemPlaceholderImg = new createjs.Sprite(this.assetModel.spriteSheet, "".concat(this.imgId, "-placeholder"));
        this.addChild(this.itemPlaceholderImg);
        this._placeholderX = this.itemPlaceholderImg.getBounds().width / 2;
        this._placeholderY = (this.itemPlaceholderImg.getBounds().height / 2) + 2 * this.appModel.resolutionMultiplier;
    };
    ItemScoreBoard.prototype.createLayout = function () {
        this.createScoreBox();
        this.createItemIconPlaceholder();
        this.createItemIcon();
        this.createScoreText();
        this.scoreBox.x = this.itemPlaceholderImg.getBounds().width - (20 * this.appModel.resolutionMultiplier);
        this.scoreBox.y = this.itemPlaceholderImg.getBounds().height / 2;
    };
    ItemScoreBoard.prototype.createScoreBox = function () {
        this.scoreBox = new createjs.Sprite(this.assetModel.spriteSheet, "score-box");
        this.scoreBox.regY = this.scoreBox.getBounds().height / 2;
        this.addChild(this.scoreBox);
    };
    ItemScoreBoard.prototype.createScoreText = function () {
        this.scoreText = new createjs.Text("x ".concat(this._score), 24 * this.appModel.resolutionMultiplier + "px cardedureg", "#FFFFFF");
        this.scoreText.x = 80 * this.appModel.resolutionMultiplier;
        this.scoreText.y = 20 * this.appModel.resolutionMultiplier;
        this.addChild(this.scoreText);
    };
    ItemScoreBoard.prototype.create = function () {
        this.createLayout();
    };
    ItemScoreBoard.prototype.destroy = function () {
    };
    ItemScoreBoard.prototype.updateScore = function () {
        if (!this.itemIconImg.visible) {
            this.itemIconImg.visible = true;
            this.itemPlaceholderImg.visible = false;
        }
        this._score++;
        this.scoreText.text = "x ".concat(this._score);
    };
    return ItemScoreBoard;
}(createjs.Container));
var MissedMenu = (function (_super) {
    __extends(MissedMenu, _super);
    function MissedMenu() {
        var _this = _super.call(this) || this;
        _this.handleClick = function () {
            _this.dispatchEvent(new VerbGameEvent(VerbGameEvent.CONTINUE_FROM_MISSED));
        };
        _this._init();
        return _this;
    }
    MissedMenu.prototype._init = function () {
        this.appModel = VGAppModel.getInstance();
        this.assetModel = VGAssetModel.getInstance();
    };
    MissedMenu.prototype.createBg = function () {
        this.bg = new createjs.Sprite(this.assetModel.spriteSheet, "word-list");
        this.addChild(this.bg);
    };
    MissedMenu.prototype.createBtn = function () {
        this.continueBtn = new createjs.Sprite(this.assetModel.spriteSheet, "continue-btn");
        this.continueBtn.addEventListener(VerbGameEvent.CLICK, this.handleClick);
        this.continueBtn.cursor = "pointer";
        this.continueBtn.regX = this.continueBtn.getBounds().width / 2;
        this.continueBtn.regY = this.continueBtn.getBounds().height / 2;
        this.continueBtn.x = this.bg.getBounds().width / 2;
        this.continueBtn.y = this.bg.getBounds().height - (60 * this.appModel.resolutionMultiplier);
        this.addChild(this.continueBtn);
    };
    MissedMenu.prototype.createTextFields = function (missedData) {
        var curEnglishField;
        var curSpanishField;
        var curY = 140 * this.appModel.resolutionMultiplier;
        var len = missedData.length;
        for (var i = 0; i < len; i++) {
            curEnglishField = new createjs.Text(missedData[i].english, 14 * this.appModel.resolutionMultiplier + "px cardedureg", "#000000");
            curEnglishField.x = 106 * this.appModel.resolutionMultiplier;
            curEnglishField.y = curY;
            this.addChild(curEnglishField);
            curSpanishField = new createjs.Text(missedData[i].spanish, 14 * this.appModel.resolutionMultiplier + "px cardedureg", "#000000");
            curSpanishField.x = 286 * this.appModel.resolutionMultiplier;
            curSpanishField.y = curY;
            this.addChild(curSpanishField);
            curY += (curEnglishField.getMeasuredHeight() + (8 * this.appModel.resolutionMultiplier));
        }
    };
    MissedMenu.prototype.create = function () {
        this.createBg();
        this.createBtn();
    };
    MissedMenu.prototype.destroy = function () {
        this.removeAllChildren();
    };
    MissedMenu.prototype.populateMissed = function (missedData) {
        this.createTextFields(missedData);
    };
    return MissedMenu;
}(createjs.Container));
var TextButton = (function (_super) {
    __extends(TextButton, _super);
    function TextButton(text, fontAlias, fontSize, fontColor, shapeProps) {
        if (fontAlias === void 0) { fontAlias = "Arial"; }
        if (fontSize === void 0) { fontSize = 24; }
        if (fontColor === void 0) { fontColor = "#000000"; }
        if (shapeProps === void 0) { shapeProps = new ButtonShapeProperties("#CCCCCC", 1, 180, 40, 8, "#555555", 1, 0, 0); }
        var _this = _super.call(this) || this;
        _this.handleRollout = function (event) {
        };
        _this.handleRollover = function (event) {
        };
        _this.text = text;
        _this.fontAlias = fontAlias;
        _this.fontSize = fontSize;
        _this.fontColor = fontColor;
        _this.shapeProps = shapeProps;
        _this._init();
        return _this;
    }
    TextButton.prototype._init = function () {
        this.assetModel = VGAssetModel.getInstance();
    };
    TextButton.prototype.addListeners = function () {
        this.addEventListener(VerbGameEvent.ROLL_OUT, this.handleRollout);
        this.addEventListener(VerbGameEvent.ROLL_OVER, this.handleRollover);
    };
    TextButton.prototype.createBg = function () {
        this.bg = new createjs.Shape();
        this.bg.graphics.setStrokeStyle(this.shapeProps.strokeThickness);
        this.bg.graphics.beginFill(this.shapeProps.color);
        this.bg.graphics.beginStroke(this.shapeProps.strokeColor);
        this.bg.graphics.drawRoundRect(this.shapeProps.x, this.shapeProps.y, this.shapeProps.width, this.shapeProps.height, this.shapeProps.radius);
        this.bg.alpha = this.shapeProps.alpha;
        this.setBounds(this.shapeProps.x, this.shapeProps.y, this.shapeProps.width, this.shapeProps.height);
        this.addChild(this.bg);
    };
    TextButton.prototype.createTextField = function () {
        this.textField = new createjs.Text(this.text, this.fontSize.toString() + "px " + this.fontAlias, this.fontColor);
        this.textField.textAlign = "center";
        this.textField.textBaseline = "middle";
        this.textField.x = this.getBounds().width / 2;
        this.textField.y = this.getBounds().height / 2;
        this.addChild(this.textField);
    };
    TextButton.prototype.removeListeners = function () {
        this.removeEventListener(VerbGameEvent.ROLL_OUT, this.handleRollout);
        this.removeEventListener(VerbGameEvent.ROLL_OVER, this.handleRollover);
    };
    TextButton.prototype.create = function () {
        this.createBg();
        this.createTextField();
        this.cursor = "pointer";
        this.addListeners();
    };
    TextButton.prototype.destroy = function () {
        this.removeListeners();
        this.removeAllChildren();
    };
    return TextButton;
}(createjs.Container));
var VerbItem = (function (_super) {
    __extends(VerbItem, _super);
    function VerbItem(text, textBoxId, imgId, audioId, isCorrect) {
        var _this = _super.call(this) || this;
        _this.PADDING = 20;
        _this.itemText = text;
        _this.itemTextBoxId = textBoxId;
        _this._itemImgId = imgId;
        _this._audioId = audioId;
        _this._isCorrect = isCorrect;
        _this._init();
        return _this;
    }
    Object.defineProperty(VerbItem.prototype, "audioId", {
        get: function () {
            return this._audioId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VerbItem.prototype, "scoreBoardId", {
        get: function () {
            return this._scoreBoardId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VerbItem.prototype, "imgId", {
        get: function () {
            return this._itemImgId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VerbItem.prototype, "isCorrect", {
        get: function () {
            return this._isCorrect;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VerbItem.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VerbItem.prototype, "text", {
        get: function () {
            return this.itemText;
        },
        enumerable: false,
        configurable: true
    });
    VerbItem.prototype._init = function () {
        this._scoreBoardId = this.imgId.substring(this.imgId.indexOf("_") + 1);
        this.appModel = VGAppModel.getInstance();
        this.assetModel = VGAssetModel.getInstance();
        this.includeInTick = true;
    };
    VerbItem.prototype.createItemImage = function () {
        this.itemImg = new createjs.Sprite(this.assetModel.spriteSheet, this._itemImgId);
        this.itemImg.regX = this.itemImg.getBounds().width / 2;
        this.itemImg.regY = this.itemImg.getBounds().height / 2;
        this.itemImg.y += this.itemImg.regY;
        this.addChild(this.itemImg);
    };
    VerbItem.prototype.createItemTextBox = function () {
        this.defaultTextBoxHeight = 49 * this.appModel.resolutionMultiplier;
        this.itemTextBox = new createjs.ScaleBitmap(this.assetModel.assetUrl + "img/" + this.itemTextBoxId + "@" + this.assetModel.assetResolution + ".png", new createjs.Rectangle(11 * this.appModel.resolutionMultiplier, 8 * this.appModel.resolutionMultiplier, 111 * this.appModel.resolutionMultiplier, 28 * this.appModel.resolutionMultiplier));
        this.itemTextBox.setBounds(0, 0, 133 * this.appModel.resolutionMultiplier, this.defaultTextBoxHeight);
        this.itemTextBox.setDrawSize(this.itemTextBox.getBounds().width, this.itemTextBox.getBounds().height);
        this.itemTextBox.regX = this.itemTextBox.getBounds().width / 2;
        this.itemTextBox.regY = this.itemTextBox.getBounds().height / 2;
        this.itemTextBox.x += this.itemTextBox.regX;
        this.itemTextBox.y += this.itemTextBox.regY;
        this.addChild(this.itemTextBox);
    };
    VerbItem.prototype.createLayout = function () {
        this.createItemImage();
        this.createItemTextBox();
        this.createTextField();
    };
    VerbItem.prototype.createTextField = function () {
        this.textField = new createjs.Text(this.itemText, 20 * this.appModel.resolutionMultiplier + "px cardedureg", "#FFFFFF");
        this.textField.textAlign = "center";
        this.textField.textBaseline = "middle";
        this.textField.lineWidth = this.itemTextBox.getBounds().width - ((this.PADDING * 2) * this.appModel.resolutionMultiplier);
        this.addChild(this.textField);
    };
    VerbItem.prototype.positionLayoutItems = function () {
        this.itemImg.x = this.itemTextBox.x;
        this.itemTextBox.y = (this.itemImg.y + this.itemImg.regY) + (this.PADDING * this.appModel.resolutionMultiplier);
        this.textField.x = this.itemTextBox.x;
        this.textField.y = this.itemTextBox.y;
    };
    VerbItem.prototype.updateTextBoxSize = function () {
        var textMetrics = this.textField.getMetrics();
        if (textMetrics.lines.length > 1) {
            this.itemTextBox.setDrawSize(this.itemTextBox.getBounds().width, this.defaultTextBoxHeight + (this.textField.getMeasuredLineHeight() * (textMetrics.lines.length - 1)));
        }
    };
    VerbItem.prototype.create = function () {
        this.createLayout();
        this.updateTextBoxSize();
        this.positionLayoutItems();
        this.setBounds(0, 0, this.itemTextBox.getBounds().width, this.itemImg.getBounds().height + this.PADDING * this.appModel.resolutionMultiplier + this.itemTextBox.getBounds().height);
        if (this.appModel.isHD) {
            this._speed = Rand.number(150, 300);
        }
        else {
            this._speed = Rand.number(75, 150);
        }
    };
    VerbItem.prototype.destroy = function () {
        this.removeAllChildren();
    };
    return VerbItem;
}(createjs.Container));
var ButtonShapeProperties = (function () {
    function ButtonShapeProperties(color, alpha, width, height, radius, strokeColor, strokeThickness, x, y) {
        this.color = color;
        this.alpha = alpha;
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.strokeColor = strokeColor;
        this.strokeThickness = strokeThickness;
        this.x = x;
        this.y = y;
    }
    return ButtonShapeProperties;
}());
var VerbData = (function () {
    function VerbData() {
    }
    return VerbData;
}());
var VerbGameEvent = (function (_super) {
    __extends(VerbGameEvent, _super);
    function VerbGameEvent(type, data, bubbles, cancelable) {
        if (data === void 0) { data = null; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.data = data;
        return _this;
    }
    VerbGameEvent.COMPLETE = "complete";
    VerbGameEvent.ERROR = "error";
    VerbGameEvent.PROGRESS = "progress";
    VerbGameEvent.CLICK = "click";
    VerbGameEvent.GAME_OVER = "gameOver";
    VerbGameEvent.MOUSE_DOWN = "mousedown";
    VerbGameEvent.MOUSE_MOVE = "pressmove";
    VerbGameEvent.MOUSE_UP = "pressup";
    VerbGameEvent.PLAY_GAME = "playGame";
    VerbGameEvent.REPLAY_GAME = "replayGame";
    VerbGameEvent.ROLL_OUT = "rollout";
    VerbGameEvent.ROLL_OVER = "rollover";
    VerbGameEvent.CONTINUE_FROM_MISSED = "VerbGameEvent:continueFromMissed";
    VerbGameEvent.LOOP_FADE_OUT_COMPLETE = "VerbGameEvent:loopFadeOutComplete";
    VerbGameEvent.LOAD_ASSETS_COMPLETE = "VerbGameEvent:loadAssetsComplete";
    VerbGameEvent.PLAY_SOUND_FX = "VerbGameEvent:playSoundFx";
    VerbGameEvent.STOP_SOUND_FX = "VerbGameEvent:stopSoundFx";
    return VerbGameEvent;
}(createjs.Event));
var VGAppModel = (function () {
    function VGAppModel() {
        this.amuletsCollected = 0;
        this.possibleScore = 0;
        this.score = 0;
        this._isBonusRound = false;
        this._isHD = false;
        this._isPortrait = false;
        this._isReplay = false;
        this._resolutionMultiplier = 1;
        this._screenHeight = 768;
        this._stageHeight = 768;
        this._stageWidth = 1366;
    }
    Object.defineProperty(VGAppModel.prototype, "centerX", {
        get: function () {
            return this._stageWidth / 2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VGAppModel.prototype, "centerY", {
        get: function () {
            return this._stageHeight / 2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VGAppModel.prototype, "isBonusRound", {
        get: function () {
            return this._isBonusRound;
        },
        set: function (value) {
            this._isBonusRound = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VGAppModel.prototype, "isPortrait", {
        get: function () {
            return this._isPortrait;
        },
        set: function (value) {
            this._isPortrait = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VGAppModel.prototype, "isHD", {
        get: function () {
            return this._isHD;
        },
        set: function (value) {
            this._isHD = value;
            if (this._isHD) {
                this._resolutionMultiplier = 2;
                this._screenHeight *= this._resolutionMultiplier;
                this._stageHeight *= this._resolutionMultiplier;
                this._stageWidth *= this._resolutionMultiplier;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VGAppModel.prototype, "isReplay", {
        get: function () {
            return this._isReplay;
        },
        set: function (value) {
            this._isReplay = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VGAppModel.prototype, "resolutionMultiplier", {
        get: function () {
            return this._resolutionMultiplier;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VGAppModel.prototype, "screenHeight", {
        get: function () {
            return this._screenHeight;
        },
        set: function (value) {
            this._screenHeight = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VGAppModel.prototype, "stageHeight", {
        get: function () {
            return this._stageHeight;
        },
        set: function (value) {
            this._stageHeight = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VGAppModel.prototype, "stageMultiplier", {
        get: function () {
            var multiplier = 1;
            var canvasWidth = $("#" + this.canvasId).width();
            if (canvasWidth > this._stageWidth) {
                multiplier = canvasWidth / this._stageWidth;
            }
            else {
                multiplier = this._stageWidth / canvasWidth;
            }
            return multiplier;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VGAppModel.prototype, "stageWidth", {
        get: function () {
            return this._stageWidth;
        },
        set: function (value) {
            this._stageWidth = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VGAppModel.prototype, "windowWidth", {
        get: function () {
            return window.innerWidth;
        },
        enumerable: false,
        configurable: true
    });
    VGAppModel.getInstance = function () {
        return this._instance;
    };
    VGAppModel._instance = new VGAppModel();
    return VGAppModel;
}());
var VGAssetModel = (function () {
    function VGAssetModel() {
        var _this = this;
        this.ASSET_URL = "/assets/";
        this.configLoaded = true;
        this.evtDispatcher = new createjs.EventDispatcher();
        this.handleFadeOutLoopComplete = function (event) {
            _this.evtDispatcher.dispatchEvent(new VerbGameEvent(VerbGameEvent.LOOP_FADE_OUT_COMPLETE));
        };
        this.handleLoadComplete = function (event) {
            if (!_this.configLoaded) {
                _this.configLoaded = true;
                VGAppModel.getInstance().configData = _this.loadQueue.getResult("config");
                _this.createPreloadManifest();
                _this.loadQueue.loadManifest(_this.preloadManifest);
            }
            else {
                _this.loadQueue.removeEventListener(VerbGameEvent.COMPLETE, _this.handleLoadComplete);
                _this.loadQueue.removeEventListener(VerbGameEvent.PROGRESS, _this.progressCallback);
                VGAppModel.getInstance().verbData = _this.loadQueue.getResult("verb-items");
                _this._spriteSheet = _this.loadQueue.getResult("spritesheet-json");
                _this.evtDispatcher.dispatchEvent(new Event(VerbGameEvent.LOAD_ASSETS_COMPLETE));
            }
        };
        this.handleLoadError = function (event) {
            console.log("LOAD ERROR -> Attempted to load a file with the url: " + event.data.src);
            if (_this.curSoundUnloadedCompleteCallback) {
                _this.curSoundUnloadedCompleteCallback();
            }
        };
        this.handleSoundLoadComplete = function (event) {
            var props = new createjs.PlayPropsConfig().set({ volume: _this.curSoundUnloadedVol });
            _this._curSoundUnloaded = createjs.Sound.play(_this.curSoundUnloadedId, props);
            _this._curSoundUnloaded.addEventListener(VerbGameEvent.COMPLETE, _this.handleSoundUnloadPlayComplete);
        };
        this.handleSoundUnloadPlayComplete = function () {
            if (_this.curSoundUnloadedCompleteCallback) {
                _this.curSoundUnloadedCompleteCallback();
            }
        };
    }
    Object.defineProperty(VGAssetModel.prototype, "assetResolution", {
        get: function () {
            return this._assetResolution;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VGAssetModel.prototype, "assetUrl", {
        get: function () {
            return this.ASSET_URL;
        },
        set: function (value) {
            this.ASSET_URL = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VGAssetModel.prototype, "spriteSheet", {
        get: function () {
            return this._spriteSheet;
        },
        enumerable: false,
        configurable: true
    });
    VGAssetModel.prototype.createPreloadQueue = function () {
        this.loadQueue = new createjs.LoadQueue(true);
        this.loadQueue.installPlugin(createjs.Sound);
        this.loadQueue.installPlugin(createjs.SoundLoader);
        this.loadQueue.installPlugin(createjs.SpriteSheetLoader);
        this.loadQueue.addEventListener(VerbGameEvent.COMPLETE, this.handleLoadComplete);
        this.loadQueue.addEventListener(VerbGameEvent.ERROR, this.handleLoadError);
        this.loadQueue.addEventListener(VerbGameEvent.PROGRESS, this.progressCallback);
    };
    VGAssetModel.prototype.createPreloadManifest = function () {
        var list = "ar-reg-infinitives-short";
        if (this.urlParams.has('list')) {
            list = this.urlParams.get('list');
        }
        this.preloadManifest = [
            {
                id: "verb-items",
                src: this.ASSET_URL + "json/" + list + ".json"
            },
            {
                id: "menu-bg",
                src: this.ASSET_URL + "img/menu-screen-bg@" + this._assetResolution + ".png"
            },
            {
                id: "menu-portrait-bg",
                src: this.ASSET_URL + "img/menu-screen-portrait-bg@" + this._assetResolution + ".png"
            },
            {
                id: "game-bg",
                src: this.ASSET_URL + "img/game-screen-bg@" + this._assetResolution + ".png"
            },
            {
                id: "game-over-bg",
                src: this.ASSET_URL + "img/game-over-screen-bg@" + this._assetResolution + ".png"
            },
            {
                id: "game-bg-overlay-white",
                src: this.ASSET_URL + "img/white-bg@" + this._assetResolution + ".png"
            },
            {
                id: "game-bg-overlay-black",
                src: this.ASSET_URL + "img/black-bg@" + this._assetResolution + ".png"
            },
            {
                id: "top-banner",
                src: this.ASSET_URL + "img/top-banner@" + this._assetResolution + ".png"
            },
            {
                id: "word-box",
                src: this.ASSET_URL + "img/word-box@" + this._assetResolution + ".png"
            },
            {
                id: "answer-box-blue",
                src: this.ASSET_URL + "img/answer-box-blue@" + this._assetResolution + ".png"
            },
            {
                id: "answer-box-green",
                src: this.ASSET_URL + "img/answer-box-green@" + this._assetResolution + ".png"
            },
            {
                id: "answer-box-orange",
                src: this.ASSET_URL + "img/answer-box-orange@" + this._assetResolution + ".png"
            },
            {
                id: "answer-box-pink",
                src: this.ASSET_URL + "img/answer-box-pink@" + this._assetResolution + ".png"
            },
            {
                id: "answer-box-purple",
                src: this.ASSET_URL + "img/answer-box-purple@" + this._assetResolution + ".png"
            },
            {
                id: "answer-box-yellow",
                src: this.ASSET_URL + "img/answer-box-yellow@" + this._assetResolution + ".png"
            },
            {
                id: "spritesheet-json",
                src: this.ASSET_URL + "json/verb-game@" + this._assetResolution + ".json",
                type: "spritesheet"
            },
            {
                id: "cardedureg",
                src: this.ASSET_URL + "font/cardedureg.ttf",
                type: "font"
            },
            {
                id: "riveradventurer",
                src: this.ASSET_URL + "font/riveradventurer.ttf",
                type: "font"
            },
            {
                id: "button-over",
                src: this.ASSET_URL + "audio/button.mp3"
            },
            {
                id: "correct-answer",
                src: this.ASSET_URL + "audio/correct-answer.mp3"
            },
            {
                id: "wrong-answer",
                src: this.ASSET_URL + "audio/wrong-answer.mp3"
            },
            {
                id: "menu-loop",
                src: this.ASSET_URL + "audio/menu-loop.mp3"
            },
            {
                id: "game-loop",
                src: this.ASSET_URL + "audio/game-loop.mp3"
            },
            {
                id: "game-over-loop",
                src: this.ASSET_URL + "audio/game-over-loop.mp3"
            }
        ];
    };
    VGAssetModel.prototype.loadConfigurations = function () {
        this.preloadManifest = [{
                id: "config", type: "json", src: "config/verb-game-config.json"
            }];
        this.loadQueue.loadManifest(this.preloadManifest);
    };
    VGAssetModel.prototype.addEventListener = function (type, callback) {
        this.evtDispatcher.addEventListener(type, callback);
    };
    VGAssetModel.prototype.destroy = function () {
        this._spriteSheet = null;
        this.bgLoops = null;
        this.evtDispatcher = null;
        this.preloadManifest = null;
    };
    VGAssetModel.prototype.fadeInLoop = function (id, maxVolume, duration) {
        if (maxVolume === void 0) { maxVolume = 1; }
        if (duration === void 0) { duration = 5; }
        if (this.bgLoops === undefined) {
            this.bgLoops = [];
        }
        var loop = createjs.Sound.play(id, { loop: -1, volume: 0 });
        var loopFound = false;
        var len = this.bgLoops.length;
        loop.name = id;
        for (var i = 0; i < len; i++) {
            if (this.bgLoops[i].name == id) {
                this.bgLoops[i] = loop;
                loopFound = true;
                break;
            }
        }
        if (!loopFound) {
            this.bgLoops.push(loop);
        }
        TweenMax.to(loop, duration, { volume: maxVolume });
        return loop;
    };
    VGAssetModel.prototype.fadeOutLoop = function (id, minVolume) {
        if (minVolume === void 0) { minVolume = 0; }
        var loop;
        var loopFound = false;
        var len = this.bgLoops.length;
        for (var i = 0; i < len; i++) {
            if (this.bgLoops[i].name === id) {
                loop = this.bgLoops[i];
                loopFound = true;
                break;
            }
        }
        if (loopFound) {
            TweenLite.to(loop, 4, { volume: minVolume, onComplete: this.handleFadeOutLoopComplete });
            return loop;
        }
        return null;
    };
    VGAssetModel.prototype.playSound = function (id, volume) {
        if (volume === void 0) { volume = 1; }
        var props = new createjs.PlayPropsConfig().set({ volume: volume });
        var sound = createjs.Sound.play(id, props);
        return sound;
    };
    VGAssetModel.prototype.playSoundNotPreloaded = function (url, id, completeCallback, volume) {
        if (completeCallback === void 0) { completeCallback = null; }
        if (volume === void 0) { volume = 1; }
        this.curSoundUnloadedId = id;
        this.curSoundUnloadedCompleteCallback = completeCallback;
        this.curSoundUnloadedVol = volume;
        var obj = this.loadQueue.getItem(this.curSoundUnloadedId);
        if (this.loadQueue.getItem(this.curSoundUnloadedId)) {
            this.handleSoundLoadComplete(null);
        }
        else {
            this.loadQueue.addEventListener(VerbGameEvent.COMPLETE, this.handleSoundLoadComplete);
            this.loadQueue.loadFile({ id: id, src: url });
        }
    };
    VGAssetModel.prototype.preloadAssets = function () {
        var appModel = VGAppModel.getInstance();
        if (appModel.isHD) {
            this._assetResolution = "2x";
        }
        else {
            this._assetResolution = "1x";
        }
        var queryString = window.location.search;
        this.urlParams = new URLSearchParams(queryString);
        this.createPreloadManifest();
        this.createPreloadQueue();
        this.loadQueue.loadManifest(this.preloadManifest);
    };
    VGAssetModel.prototype.stopLoop = function (id) {
        var loop;
        var loopFound = false;
        var len = this.bgLoops.length;
        for (var i = 0; i < len; i++) {
            if (this.bgLoops[i].name == id) {
                loop = this.bgLoops[i];
                loopFound = true;
                break;
            }
        }
        if (loopFound) {
            loop.stop();
            return loop;
        }
        return null;
    };
    VGAssetModel.getInstance = function () {
        return this._instance;
    };
    VGAssetModel._instance = new VGAssetModel();
    return VGAssetModel;
}());
var VGGameView = (function (_super) {
    __extends(VGGameView, _super);
    function VGGameView() {
        var _this = _super.call(this) || this;
        _this.MIN_WIDTH_LANE = 150;
        _this.WORD_BOX_PADDING = 80;
        _this._created = false;
        _this.createItemSet = function () {
            if (_this.curItemIndex >= _this.wavsPerRound) {
                _this.roundsPlayed++;
                if (_this.roundsPlayed === 1 && _this.missed.length > 0) {
                    _this.missedMenu.populateMissed(_this.missed);
                    _this.tweenInMissedMenu();
                }
                else {
                    Delay.callLater(_this.endGame, 1000);
                }
                return;
            }
            _this.curCountOffscreen = 0;
            _this.items = [];
            _this.populateRoundItems();
            Rand.array(_this.boxIds);
            Rand.array(_this.imgIds);
            for (var i = 0; i < Rand.integer(3, 6); i++) {
                Rand.array(_this.laneXs);
            }
            for (var i = 0; i < _this.numLanes; i++) {
                var curWord = void 0;
                var curItem = void 0;
                if (i === 0) {
                    if (_this.spanishToEnglish) {
                        curWord = _this.roundItems[0].spanish;
                        curItem = _this.roundItems[0].english;
                    }
                    else {
                        curWord = _this.roundItems[0].english;
                        curItem = _this.roundItems[0].spanish;
                    }
                    _this.populateWordBox(curWord);
                    _this.createItem(curItem, _this.boxIds[i], _this.imgIds[i], _this.laneXs[i], Rand.integer(800 * _this.appModel.resolutionMultiplier, 900 * _this.appModel.resolutionMultiplier), _this.roundItems[0].audioId, true);
                }
                else {
                    if (_this.spanishToEnglish) {
                        curItem = _this.roundItems[i].english;
                    }
                    else {
                        curItem = _this.roundItems[i].spanish;
                    }
                    _this.createItem(curItem, _this.boxIds[i], _this.imgIds[i], _this.laneXs[i], Rand.integer(800 * _this.appModel.resolutionMultiplier, 900 * _this.appModel.resolutionMultiplier), _this.roundItems[i].audioId);
                }
            }
            _this.applyTick = true;
        };
        _this.endGame = function () {
            _this.dispatchEvent(new VerbGameEvent(VerbGameEvent.GAME_OVER));
        };
        _this.fadeInOverlay = function () {
            TweenLite.to(_this.bgOverlayWhite, 2, { alpha: 1, onComplete: _this.handleOverlayFadeInComplete });
        };
        _this.handleContinueFromMissed = function () {
            _this.appModel.isBonusRound = true;
            _this.tweenOutMissedMenu();
        };
        _this.handleEarnItemComplete = function () {
            _this["scoreBoard" + _this.lastClickeItem.scoreBoardId].updateScore();
            _this.tweenItem.visible = false;
        };
        _this.handleFadeOutItemComplete = function () {
            _this.fadedOutItemCount++;
            if (_this.fadedOutItemCount >= _this.items.length) {
                _this.applyTick = false;
                if (_this.itemAudioPlayed || !_this.lastClickeItem.isCorrect) {
                    _this.nextWave();
                }
            }
        };
        _this.handleItemClick = function (event) {
            _this.removeItemEventListeners();
            _this.itemAudioPlayed = false;
            _this.lastClickeItem = event.currentTarget;
            if (_this.lastClickeItem.isCorrect) {
                var scoreIncrement = 1;
                if (_this.appModel.isBonusRound) {
                    scoreIncrement = .5;
                }
                _this.appModel.score += scoreIncrement;
                _this.lastPlayedSound = _this.assetModel.playSound("correct-answer");
                _this.lastPlayedSound.addEventListener(VerbGameEvent.COMPLETE, _this.handlePlaySoundComplete);
                _this.lastAttemptWasCorrect = true;
                _this.lastClickeItem.includeInTick = false;
                _this.lastClickeItem.visible = false;
                _this.earnItem();
                var correctData = new VerbData();
                correctData.spanish = _this.verbs[_this.curItemIndex].spanish;
                correctData.audioId = _this.verbs[_this.curItemIndex].audioId;
                correctData.english = _this.verbs[_this.curItemIndex].english;
                _this.correct.push(correctData);
            }
            else {
                _this.lastPlayedSound = _this.assetModel.playSound("wrong-answer");
                _this.lastAttemptWasCorrect = false;
                _this.updateMissed();
            }
            _this.fadeOutItems();
            _this.wordBoxText.text = "";
        };
        _this.handleOverlayFadeInComplete = function () {
            Delay.callLater(_this.createItemSet, 1000);
        };
        _this.handlePlaySoundComplete = function () {
            var url = _this.assetModel.assetUrl + "audio/spanish/" + _this.lastClickeItem.audioId + ".mp3";
            if (!_this.appModel.isReplay) {
                _this.assetModel.playSoundNotPreloaded(url, _this.lastClickeItem.audioId, _this.handlePlayItemSoundComplete);
            }
            else {
                _this.lastPlayedItemSound = _this.assetModel.playSound(_this.lastClickeItem.audioId);
                _this.lastPlayedItemSound.addEventListener(VerbGameEvent.COMPLETE, _this.handlePlayItemSoundComplete);
            }
        };
        _this.handlePlayItemSoundComplete = function () {
            if (_this.lastPlayedItemSound) {
                _this.lastPlayedItemSound.removeEventListener(VerbGameEvent.COMPLETE, _this.handlePlayItemSoundComplete);
            }
            _this.itemAudioPlayed = true;
            if (_this.fadedOutItemCount >= _this.items.length) {
                _this.nextWave();
            }
        };
        _this.prepForNextRound = function () {
            _this.curItemIndex = 0;
            _this.wavsPerRound = _this.missed.length;
            _this.appModel.possibleScore += _this.wavsPerRound;
            _this.verbs = _this.missed.slice().concat(_this.correct);
            _this.createItemSet();
        };
        _this.tweenOutMissedMenuComplete = function () {
            _this.missedMenu.visible = false;
            _this.bgOverlayBlack.visible = false;
            Delay.callLater(_this.prepForNextRound, 1000);
        };
        _this._init();
        return _this;
    }
    Object.defineProperty(VGGameView.prototype, "created", {
        get: function () {
            return this._created;
        },
        enumerable: false,
        configurable: true
    });
    VGGameView.prototype._init = function () {
        this.visible = false;
        this.appModel = VGAppModel.getInstance();
        this.applyTick = true;
        this.assetModel = VGAssetModel.getInstance();
        this.correct = [];
        this.curCountOffscreen = 0;
        this.curItemIndex = 0;
        this.itemAudioPlayed = false;
        this.items = [];
        this.lastAttemptWasCorrect = false;
        this.missed = [];
        this.numLanes = 6;
        this.roundsPlayed = 0;
        this.spanishToEnglish = false;
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('mode')) {
            var mode = urlParams.get('mode');
            if (mode == "2") {
                this.spanishToEnglish = true;
            }
        }
    };
    VGGameView.prototype.createBanner = function () {
        this.banner = new createjs.Bitmap(this.assetModel.loadQueue.getResult("top-banner"));
        this.addChild(this.banner);
    };
    VGGameView.prototype.createBg = function () {
        this.bg = new createjs.Bitmap(this.assetModel.loadQueue.getResult("game-bg"));
        this.addChild(this.bg);
    };
    VGGameView.prototype.createBgOverlayBlack = function () {
        this.bgOverlayBlack = new createjs.Bitmap(this.assetModel.loadQueue.getResult("game-bg-overlay-black"));
        this.bgOverlayBlack.alpha = 0;
        this.bgOverlayBlack.visible = false;
        this.addChild(this.bgOverlayBlack);
    };
    VGGameView.prototype.createBgOverlayWhite = function () {
        this.bgOverlayWhite = new createjs.Bitmap(this.assetModel.loadQueue.getResult("game-bg-overlay-white"));
        this.bgOverlayWhite.alpha = 0;
        this.addChild(this.bgOverlayWhite);
    };
    VGGameView.prototype.createBoxIds = function () {
        this.boxIds = [];
        this.boxIds.push("answer-box-blue");
        this.boxIds.push("answer-box-green");
        this.boxIds.push("answer-box-orange");
        this.boxIds.push("answer-box-pink");
        this.boxIds.push("answer-box-purple");
        this.boxIds.push("answer-box-yellow");
    };
    VGGameView.prototype.createImgIds = function () {
        this.imgIds = [];
        this.imgIds.push("amulet_1");
        this.imgIds.push("amulet_2");
        this.imgIds.push("amulet_3");
        this.imgIds.push("amulet_4");
        this.imgIds.push("amulet_5");
        this.imgIds.push("amulet_6");
    };
    VGGameView.prototype.createItem = function (text, boxId, imgId, x, y, audioId, isCorrect) {
        if (isCorrect === void 0) { isCorrect = false; }
        var item = new VerbItem(text, boxId, imgId, audioId, isCorrect);
        this.addChildAt(item, this.getChildIndex(this.wordBox));
        item.create();
        item.x = x + ((this.laneWidth) - (item.getBounds().width)) / 2;
        item.y = y;
        this.items.push(item);
        item.cursor = "pointer";
        item.addEventListener(VerbGameEvent.CLICK, this.handleItemClick);
    };
    VGGameView.prototype.createLanes = function () {
        this.laneXs = [];
        if (this.numLanes <= 0) {
            this.numLanes = Math.floor(this.appModel.stageWidth / (this.MIN_WIDTH_LANE * this.appModel.resolutionMultiplier));
        }
        this.laneWidth = this.appModel.stageWidth / this.numLanes;
        var curLaneX;
        for (var i = 0; i < this.numLanes; i++) {
            curLaneX = (this.laneWidth * i);
            this.laneXs.push(curLaneX);
        }
    };
    VGGameView.prototype.createLayout = function () {
        this.createBg();
        this.createBgOverlayWhite();
        this.createWordBox();
        this.createWordBoxText();
        this.createBanner();
        this.createScoreBoards();
        this.createBgOverlayBlack();
        this.createMissedMenu();
    };
    VGGameView.prototype.createMissedMenu = function () {
        this.missedMenu = new MissedMenu();
        this.missedMenu.addEventListener(VerbGameEvent.CONTINUE_FROM_MISSED, this.handleContinueFromMissed);
        this.addChild(this.missedMenu);
        this.missedMenu.create();
        this.missedMenu.regX = this.missedMenu.getBounds().width / 2;
        this.missedMenu.regY = this.missedMenu.getBounds().height / 2;
        this.missedMenu.x = this.appModel.centerX;
        this.missedMenu.y = -this.missedMenu.regY;
        this.missedMenu.visible = false;
    };
    VGGameView.prototype.createScoreBoards = function () {
        this.scoreBoard1 = new ItemScoreBoard("amulet1");
        this.addChild(this.scoreBoard1);
        this.scoreBoard1.x = 60 * this.appModel.resolutionMultiplier;
        this.scoreBoard1.y = 9 * this.appModel.resolutionMultiplier;
        this.scoreBoard1.create();
        this.scoreBoard2 = new ItemScoreBoard("amulet2");
        this.addChild(this.scoreBoard2);
        this.scoreBoard2.x = 210 * this.appModel.resolutionMultiplier;
        this.scoreBoard2.y = 9 * this.appModel.resolutionMultiplier;
        this.scoreBoard2.create();
        this.scoreBoard3 = new ItemScoreBoard("amulet3");
        this.addChild(this.scoreBoard3);
        this.scoreBoard3.x = 360 * this.appModel.resolutionMultiplier;
        this.scoreBoard3.y = 9 * this.appModel.resolutionMultiplier;
        this.scoreBoard3.create();
        this.scoreBoard4 = new ItemScoreBoard("amulet4");
        this.addChild(this.scoreBoard4);
        this.scoreBoard4.x = 880 * this.appModel.resolutionMultiplier;
        this.scoreBoard4.y = 9 * this.appModel.resolutionMultiplier;
        this.scoreBoard4.create();
        this.scoreBoard5 = new ItemScoreBoard("amulet5");
        this.addChild(this.scoreBoard5);
        this.scoreBoard5.x = 1030 * this.appModel.resolutionMultiplier;
        this.scoreBoard5.y = 9 * this.appModel.resolutionMultiplier;
        this.scoreBoard5.create();
        this.scoreBoard6 = new ItemScoreBoard("amulet6");
        this.addChild(this.scoreBoard6);
        this.scoreBoard6.x = 1180 * this.appModel.resolutionMultiplier;
        this.scoreBoard6.y = 9 * this.appModel.resolutionMultiplier;
        this.scoreBoard6.create();
    };
    VGGameView.prototype.createWordBox = function () {
        this.wordBox = new createjs.ScaleBitmap(this.assetModel.assetUrl + "img/word-box@" + this.assetModel.assetResolution + ".png", new createjs.Rectangle(14 * this.appModel.resolutionMultiplier, 11 * this.appModel.resolutionMultiplier, 282 * this.appModel.resolutionMultiplier, 44 * this.appModel.resolutionMultiplier));
        this.wordBox.setBounds(0, 0, 310 * this.appModel.resolutionMultiplier, 73 * this.appModel.resolutionMultiplier);
        this.wordBox.setDrawSize(this.wordBox.getBounds().width, this.wordBox.getBounds().height);
        this.wordBox.regX = this.wordBox.getBounds().width / 2;
        this.wordBox.x = this.appModel.centerX;
        this.wordBox.y = 66 * this.appModel.resolutionMultiplier;
        this.addChild(this.wordBox);
    };
    VGGameView.prototype.createWordBoxText = function () {
        this.wordBoxText = new createjs.Text("", 24 * this.appModel.resolutionMultiplier + "px cardedureg", "#FFFFFF");
        this.wordBoxText.textAlign = "center";
        this.wordBoxText.textBaseline = "middle";
        this.wordBoxText.x = this.wordBox.x;
        this.wordBoxText.y = this.wordBox.y + (37 * this.appModel.resolutionMultiplier);
        this.addChild(this.wordBoxText);
    };
    VGGameView.prototype.destroyItemSet = function () {
        if (this.items) {
            var len = this.items.length;
            for (var i = 0; i < len; i++) {
                if (this.items[i]) {
                    this.items[i].removeEventListener(VerbGameEvent.CLICK, this.handleItemClick);
                    this.items[i].includeInTick = false;
                    this.items[i].destroy();
                    if (this.contains(this.items[i])) {
                        this.removeChild(this.items[i]);
                    }
                    this.items[i] = null;
                }
            }
            this.items = null;
        }
    };
    VGGameView.prototype.earnItem = function () {
        this.appModel.amuletsCollected++;
        this.tweenItem = new createjs.Sprite(this.assetModel.spriteSheet, this.lastClickeItem.imgId);
        this.tweenItem.regX = this.tweenItem.getBounds().width / 2;
        this.tweenItem.regY = this.tweenItem.getBounds().height / 2;
        this.tweenItem.x = this.lastClickeItem.x + ((this.lastClickeItem.getBounds().width - this.tweenItem.getBounds().width) / 2);
        this.tweenItem.y = this.lastClickeItem.y;
        this.tweenItem.x += this.tweenItem.regX;
        this.tweenItem.y += this.tweenItem.regY;
        this.addChild(this.tweenItem);
        var targetScoreboard = this["scoreBoard" + this.lastClickeItem.scoreBoardId];
        TweenLite.to(this.tweenItem, 2, { x: targetScoreboard.x + targetScoreboard.placeholderX, y: targetScoreboard.y + targetScoreboard.placeholderY, scaleX: .64, scaleY: .64, ease: Power4.easeOut, onComplete: this.handleEarnItemComplete });
    };
    VGGameView.prototype.fadeOutItems = function () {
        this.fadedOutItemCount = 0;
        var len = this.items.length;
        for (var i = 0; i < len; i++) {
            TweenLite.to(this.items[i], 2, { alpha: 0, onComplete: this.handleFadeOutItemComplete });
        }
    };
    VGGameView.prototype.nextWave = function () {
        this.curItemIndex++;
        this.destroyItemSet();
        this.createItemSet();
    };
    VGGameView.prototype.populateRoundItems = function () {
        this.roundItems = [];
        var itemsCopy = this.verbs.slice();
        this.roundItems.push(itemsCopy[this.curItemIndex]);
        itemsCopy.splice(this.curItemIndex, 1);
        Rand.array(itemsCopy);
        var len = itemsCopy.length;
        for (var i = 0; i < this.numLanes - 1; i++) {
            this.roundItems.push(itemsCopy[i]);
        }
    };
    VGGameView.prototype.populateVerbs = function () {
        this.verbs = [];
        var curVerb;
        var len = this.appModel.verbData.verbItems.length;
        for (var i = 0; i < len; i++) {
            curVerb = new VerbData();
            curVerb.audioId = this.appModel.verbData.verbItems[i].audioId;
            curVerb.english = this.appModel.verbData.verbItems[i].english;
            curVerb.spanish = this.appModel.verbData.verbItems[i].spanish;
            this.verbs.push(curVerb);
        }
        Rand.array(this.verbs);
        this.wavsPerRound = this.verbs.length;
        this.appModel.possibleScore += this.wavsPerRound;
    };
    VGGameView.prototype.populateWordBox = function (word) {
        this.wordBoxText.text = word;
        var newWidth = this.wordBoxText.getMeasuredWidth() + (this.WORD_BOX_PADDING * this.appModel.resolutionMultiplier);
        this.wordBox.setBounds(0, 0, newWidth, this.wordBox.getBounds().height);
        this.wordBox.setDrawSize(newWidth, this.wordBox.getBounds().height);
        this.wordBox.regX = this.wordBox.getBounds().width / 2;
        this.wordBox.x = this.appModel.centerX;
    };
    VGGameView.prototype.removeItemEventListeners = function () {
        var len = this.items.length;
        for (var i = 0; i < len; i++) {
            this.items[i].removeEventListener(VerbGameEvent.CLICK, this.handleItemClick);
            this.items[i].cursor = null;
        }
    };
    VGGameView.prototype.tweenInMissedMenu = function () {
        this.missedMenu.visible = true;
        this.bgOverlayBlack.visible = true;
        TweenLite.to(this.bgOverlayBlack, 1, { alpha: 1 });
        TweenLite.to(this.missedMenu, 2, { y: this.appModel.centerY, ease: Bounce.easeOut });
    };
    VGGameView.prototype.tweenOutMissedMenu = function () {
        TweenLite.to(this.bgOverlayBlack, 2, { alpha: 0, ease: Sine.easeIn });
        TweenLite.to(this.missedMenu, 2, { y: -this.missedMenu.regY, ease: Elastic.easeIn, onComplete: this.tweenOutMissedMenuComplete });
    };
    VGGameView.prototype.updateMissed = function () {
        var missedData = new VerbData();
        missedData.spanish = this.verbs[this.curItemIndex].spanish;
        missedData.audioId = this.verbs[this.curItemIndex].audioId;
        missedData.english = this.verbs[this.curItemIndex].english;
        this.missed.push(missedData);
    };
    VGGameView.prototype.create = function (completeCallback) {
        this.creationCompleteCallback = completeCallback;
        this.createLanes();
        this.createLayout();
        this.createBoxIds();
        this.createImgIds();
        this.populateVerbs();
        this.creationCompleteCallback();
        Delay.callLater(this.fadeInOverlay, 1000);
        this._created = true;
    };
    VGGameView.prototype.destroy = function () {
        this.removeAllChildren();
    };
    VGGameView.prototype.show = function () {
        this.visible = true;
    };
    VGGameView.prototype.tick = function (delta) {
        if (this.applyTick) {
            if (this.items && this.items.length > 0) {
                var len = this.items.length;
                for (var i = 0; i < len; i++) {
                    if (this.items[i].includeInTick) {
                        this.items[i].y -= delta / 1000 * this.items[i].speed;
                        if (this.items[i].y < -(200 * this.appModel.resolutionMultiplier)) {
                            this.items[i].includeInTick = false;
                            this.curCountOffscreen++;
                        }
                    }
                }
                if (this.curCountOffscreen === this.items.length) {
                    this.updateMissed();
                    this.nextWave();
                }
            }
        }
    };
    return VGGameView;
}(createjs.Container));
var VGGameOverView = (function (_super) {
    __extends(VGGameOverView, _super);
    function VGGameOverView() {
        var _this = _super.call(this) || this;
        _this.handleClick = function () {
            _this.appModel.isReplay = true;
            _this.dispatchEvent(new VerbGameEvent(VerbGameEvent.REPLAY_GAME));
        };
        _this._init();
        return _this;
    }
    VGGameOverView.prototype._init = function () {
        this.appModel = VGAppModel.getInstance();
        this.assetModel = VGAssetModel.getInstance();
    };
    VGGameOverView.prototype.createAmuletHeaderText = function () {
        this.amuletHeaderText = new createjs.Text("Amulets Collected:", 34 * this.appModel.resolutionMultiplier + "px riveradventurer", "#EB2DEA");
        this.amuletHeaderText.textAlign = "center";
        this.amuletHeaderText.textBaseline = "middle";
        this.amuletHeaderText.x = this.appModel.centerX;
        this.amuletHeaderText.y = 405 * this.appModel.resolutionMultiplier;
        this.addChild(this.amuletHeaderText);
    };
    VGGameOverView.prototype.createAmuletResultsText = function () {
        this.amuletResultsText = new createjs.Text(this.appModel.amuletsCollected.toString(), 40 * this.appModel.resolutionMultiplier + "px cardedureg", "#FFFFFF");
        this.amuletResultsText.textAlign = "center";
        this.amuletResultsText.textBaseline = "middle";
        this.amuletResultsText.x = this.appModel.centerX;
        this.amuletResultsText.y = 455 * this.appModel.resolutionMultiplier;
        this.addChild(this.amuletResultsText);
    };
    VGGameOverView.prototype.createBg = function () {
        this.bg = new createjs.Bitmap(this.assetModel.loadQueue.getResult("game-over-bg"));
        this.addChild(this.bg);
    };
    VGGameOverView.prototype.createBtn = function () {
        this.playAgainBtn = new createjs.Sprite(this.assetModel.spriteSheet, "play-again-btn");
        this.playAgainBtn.addEventListener(VerbGameEvent.CLICK, this.handleClick);
        this.playAgainBtn.cursor = "pointer";
        this.playAgainBtn.regX = this.playAgainBtn.getBounds().width / 2;
        this.playAgainBtn.regY = this.playAgainBtn.getBounds().height / 2;
        this.playAgainBtn.x = this.appModel.centerX;
        this.playAgainBtn.y = this.appModel.centerY + (295 * this.appModel.resolutionMultiplier);
        this.addChild(this.playAgainBtn);
    };
    VGGameOverView.prototype.createResultsBg = function () {
        this.resultsBg = new createjs.Sprite(this.assetModel.spriteSheet, "dark-transparent-box");
        this.resultsBg.regX = this.resultsBg.getBounds().width / 2;
        this.resultsBg.regY = this.resultsBg.getBounds().height / 2;
        this.resultsBg.x = this.appModel.centerX;
        this.resultsBg.y = this.appModel.centerY + (98 * this.appModel.resolutionMultiplier);
        this.addChild(this.resultsBg);
    };
    VGGameOverView.prototype.createResultsHeader = function () {
        this.resultsHeader = new createjs.Sprite(this.assetModel.spriteSheet, "great-job");
        this.resultsHeader.regX = this.resultsHeader.getBounds().width / 2;
        this.resultsHeader.regY = this.resultsHeader.getBounds().height / 2;
        this.resultsHeader.x = this.appModel.centerX;
        this.resultsHeader.y = this.appModel.centerY - (175 * this.appModel.resolutionMultiplier);
        this.addChild(this.resultsHeader);
    };
    VGGameOverView.prototype.createScoreHeaderText = function () {
        this.scoreHeaderText = new createjs.Text("Score:", 34 * this.appModel.resolutionMultiplier + "px riveradventurer", "#B8D035");
        this.scoreHeaderText.textAlign = "center";
        this.scoreHeaderText.textBaseline = "middle";
        this.scoreHeaderText.x = this.appModel.centerX;
        this.scoreHeaderText.y = 510 * this.appModel.resolutionMultiplier;
        this.addChild(this.scoreHeaderText);
    };
    VGGameOverView.prototype.createScoreResultsText = function () {
        var score = Math.round((this.appModel.score / this.appModel.possibleScore) * 100);
        this.scoreResultsText = new createjs.Text("".concat(score.toString(), "%"), 40 * this.appModel.resolutionMultiplier + "px cardedureg", "#FFFFFF");
        this.scoreResultsText.textAlign = "center";
        this.scoreResultsText.textBaseline = "middle";
        this.scoreResultsText.x = this.appModel.centerX;
        this.scoreResultsText.y = 560 * this.appModel.resolutionMultiplier;
        this.addChild(this.scoreResultsText);
    };
    VGGameOverView.prototype.create = function () {
        this.createBg();
        this.createResultsHeader();
        this.createResultsBg();
        this.createAmuletHeaderText();
        this.createAmuletResultsText();
        this.createScoreHeaderText();
        this.createScoreResultsText();
        this.createBtn();
        console.log("Score: " + Math.round((this.appModel.score / this.appModel.possibleScore) * 100) + "%");
    };
    VGGameOverView.prototype.destroy = function () {
        this.removeAllChildren();
    };
    return VGGameOverView;
}(createjs.Container));
var VGMenuView = (function (_super) {
    __extends(VGMenuView, _super);
    function VGMenuView() {
        var _this = _super.call(this) || this;
        _this.handleClick = function () {
            _this.dispatchEvent(new VerbGameEvent(VerbGameEvent.PLAY_GAME));
        };
        _this._init();
        return _this;
    }
    VGMenuView.prototype._init = function () {
        this.visible = false;
        this.appModel = VGAppModel.getInstance();
        this.assetModel = VGAssetModel.getInstance();
    };
    VGMenuView.prototype.createBg = function () {
        if (this.appModel.isPortrait) {
            this.bg = new createjs.Bitmap(this.assetModel.loadQueue.getResult("menu-portrait-bg"));
        }
        else {
            this.bg = new createjs.Bitmap(this.assetModel.loadQueue.getResult("menu-bg"));
        }
        this.addChild(this.bg);
    };
    VGMenuView.prototype.createLogo = function () {
        this.logo = new createjs.Sprite(this.assetModel.spriteSheet, "logo-menu");
        this.logo.regX = this.logo.getBounds().width / 2;
        this.logo.regY = this.logo.getBounds().height / 2;
        this.logo.x = this.appModel.centerX;
        this.logo.y = this.appModel.centerY - (80 * this.appModel.resolutionMultiplier);
        this.addChild(this.logo);
    };
    VGMenuView.prototype.createPlayButton = function () {
        this.playBtn = new createjs.Sprite(this.assetModel.spriteSheet, "play-btn");
        this.playBtn.addEventListener(VerbGameEvent.CLICK, this.handleClick);
        this.playBtn.regX = this.playBtn.getBounds().width / 2;
        this.playBtn.regY = this.playBtn.getBounds().height / 2;
        this.playBtn.x = this.appModel.centerX;
        this.playBtn.y = this.appModel.centerY + (130 * this.appModel.resolutionMultiplier);
        this.addChild(this.playBtn);
        this.playBtn.cursor = "pointer";
    };
    VGMenuView.prototype.create = function (completeCallback) {
        this.creationCompleteCallback = completeCallback;
        this.createBg();
        this.createLogo();
        this.createPlayButton();
        this.creationCompleteCallback();
    };
    VGMenuView.prototype.destroy = function () {
        this.removeAllChildren();
    };
    VGMenuView.prototype.show = function () {
        this.visible = true;
    };
    return VGMenuView;
}(createjs.Container));
var VerbGame = (function () {
    function VerbGame(canvasId, assetUrl) {
        if (assetUrl === void 0) { assetUrl = null; }
        var _this = this;
        this.handleGameCreationComplete = function () {
            _this.game.show();
        };
        this.handleGameOver = function () {
            _this.assetModel.fadeOutLoop("game-loop");
            _this.destroyGame();
            _this.createGameOver();
            _this.assetModel.fadeInLoop("game-over-loop", 0.5);
        };
        this.handleLoadAssetsComplete = function () {
            if (_this.stage && _this.preloadText && _this.stage.contains(_this.preloadText)) {
                Delay.callLater(_this.handleLoadAssestsCompleteDelay, 500);
            }
        };
        this.handleLoadAssestsCompleteDelay = function () {
            _this.destroyPreloadText();
            _this.createMenu();
        };
        this.handleLoadProgress = function (event) {
            if (_this.stage && !_this.stage.contains(_this.preloadText)) {
                _this.stage.addChild(_this.preloadShadowText);
                _this.stage.addChild(_this.preloadText);
            }
            var percentage = Math.floor(event.progress * 100);
            _this.preloadShadowText.text = "Loading: " + percentage + "%";
            _this.preloadText.text = "Loading: " + percentage + "%";
        };
        this.handleMenuCreationComplete = function () {
            _this.menu.show();
        };
        this.handlePlayGame = function () {
            _this.assetModel.fadeOutLoop("menu-loop");
            _this.destroyMenu();
            _this.createGame();
            _this.assetModel.fadeInLoop("game-loop", 0.4);
        };
        this.handleReplayGame = function () {
            _this.assetModel.fadeOutLoop("game-over-loop");
            _this.destroyGameOver();
            _this.createGame();
            _this.assetModel.fadeInLoop("game-loop", 0.4);
        };
        this.handleTick = function (event) {
            if (_this.stage) {
                _this.stage.update();
            }
            if (_this.game && _this.game.created) {
                _this.game.tick(event.delta);
            }
        };
        this.assetUrl = assetUrl;
        this._init();
        this.createStage(canvasId);
        this.preloadAssets();
    }
    VerbGame.prototype._init = function () {
        this.assetModel = VGAssetModel.getInstance();
        if (this.assetUrl) {
            this.assetModel.assetUrl = this.assetUrl;
        }
        this.appModel = VGAppModel.getInstance();
        if (window.innerWidth > this.appModel.stageWidth) {
            this.appModel.isHD = true;
        }
        if (window.innerHeight > window.innerWidth) {
            this.appModel.isPortrait = true;
            this.appModel.stageWidth = 980;
            this.appModel.stageHeight = 1690;
            this.appModel.screenHeight = 1690;
        }
    };
    VerbGame.prototype.createGame = function () {
        this.game = new VGGameView();
        this.game.addEventListener(VerbGameEvent.GAME_OVER, this.handleGameOver);
        this.stage.addChild(this.game);
        this.game.create(this.handleGameCreationComplete);
    };
    VerbGame.prototype.createGameOver = function () {
        this.gameOver = new VGGameOverView();
        this.gameOver.addEventListener(VerbGameEvent.REPLAY_GAME, this.handleReplayGame);
        this.stage.addChild(this.gameOver);
        this.gameOver.create();
    };
    VerbGame.prototype.createMenu = function () {
        this.menu = new VGMenuView();
        this.menu.addEventListener(VerbGameEvent.PLAY_GAME, this.handlePlayGame);
        this.stage.addChild(this.menu);
        this.menu.create(this.handleMenuCreationComplete);
        this.assetModel.fadeInLoop("menu-loop", 0.5, 1);
    };
    VerbGame.prototype.createPreloadText = function () {
        this.preloadShadowText = new createjs.Text("Loading: ", 20 * this.appModel.resolutionMultiplier + "px Arial", "#002b47");
        this.preloadShadowText.textAlign = "center";
        this.preloadShadowText.textBaseline = "middle";
        this.preloadShadowText.x = this.appModel.centerX + 1 * this.appModel.resolutionMultiplier;
        this.preloadShadowText.y = this.appModel.centerY + 1 * this.appModel.resolutionMultiplier;
        this.preloadText = new createjs.Text("Loading: ", 20 * this.appModel.resolutionMultiplier + "px Arial", "#dc9bff");
        this.preloadText.textAlign = "center";
        this.preloadText.textBaseline = "middle";
        this.preloadText.x = this.appModel.centerX;
        this.preloadText.y = this.appModel.centerY;
    };
    VerbGame.prototype.createStage = function (canvasId) {
        this.stage = new createjs.Stage(canvasId);
        this.stage.name = "Stage:VerbGame";
        this.stage.enableMouseOver(30);
        this.stage.snapToPixelEnabled = true;
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Ticker.framerate = 60;
        createjs.Touch.enable(this.stage);
        createjs.Ticker.addEventListener("tick", this.handleTick);
    };
    VerbGame.prototype.destroyGame = function () {
        if (this.game) {
            this.game.addEventListener(VerbGameEvent.GAME_OVER, this.handleGameOver);
            if (this.stage && this.stage.contains(this.game)) {
                this.stage.removeChild(this.game);
            }
            this.game.destroy();
            this.game = null;
        }
    };
    VerbGame.prototype.destroyGameOver = function () {
        if (this.gameOver) {
            this.gameOver.removeEventListener(VerbGameEvent.REPLAY_GAME, this.handleReplayGame);
            if (this.stage && this.stage.contains(this.gameOver)) {
                this.stage.removeChild(this.gameOver);
            }
            this.gameOver.destroy();
            this.gameOver = null;
        }
    };
    VerbGame.prototype.destroyMenu = function () {
        if (this.menu) {
            this.menu.removeEventListener(VerbGameEvent.PLAY_GAME, this.handlePlayGame);
            if (this.stage && this.stage.contains(this.menu)) {
                this.stage.removeChild(this.menu);
            }
            this.menu.destroy();
            this.menu = null;
        }
    };
    VerbGame.prototype.destroyPreloadText = function () {
        if (this.stage) {
            if (this.stage.contains(this.preloadShadowText)) {
                this.stage.removeChild(this.preloadShadowText);
            }
            if (this.stage.contains(this.preloadText)) {
                this.stage.removeChild(this.preloadText);
            }
        }
        this.preloadShadowText = null;
        this.preloadText = null;
    };
    VerbGame.prototype.preloadAssets = function () {
        this.createPreloadText();
        this.assetModel.progressCallback = this.handleLoadProgress;
        this.assetModel.addEventListener(VerbGameEvent.LOAD_ASSETS_COMPLETE, this.handleLoadAssetsComplete);
        this.assetModel.preloadAssets();
    };
    VerbGame.prototype.getStage = function () {
        return this.stage;
    };
    return VerbGame;
}());
//# sourceMappingURL=verb-game.js.map