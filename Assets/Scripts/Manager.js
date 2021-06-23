#pragma strict

static var play : boolean = false;
static var wave : int = 1;
static var gameStarted : boolean = false;
static var gameOver : boolean = false;
static var chooseMap : boolean = false;
static var customization : boolean = false;

var lerp : float;
var dropOffZone : boolean = false;
static var gameSpeed : float = 0.08;
var speedManager : boolean = false;

function Start () {

}

function Update () {

	if (gameStarted && !Pause_Button.pause) {
		transform.position.x -= gameSpeed;
	}
}