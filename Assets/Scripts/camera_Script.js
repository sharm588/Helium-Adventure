#pragma strict
import UnityStandardAssets.ImageEffects;

var gameOverCam : GameObject;

var creature : Transform;

static var background : Transform;

static var background2 : Transform;

var origPos : float = 0;

var difPos : float = 33.5;

var difPos2 : float = 44.5;

static var posChanged : boolean = false;

static var stop : boolean = false;

static var stop2 : boolean = false;

var goBackToOriginalPos : boolean = false;

static var background1Pos: float = -1.431122;

static var background2Pos: float = -0.8308672;

static var go : boolean = false;

var backgroundMusic : AudioSource;

function Awake () {
	Application.targetFrameRate = 60;
	backgroundMusic.volume = 0;
}

function Start () {
	background = GameObject.Find("Layer1").transform;
	background2 = GameObject.Find("Layer2").transform;
}

function Update () {

	transform.position.x = 0;
	transform.position.z = -100;
	
		if (Manager.gameOver) {
		gameOverCam.SetActive(true);
		var blur = GetComponent(BlurOptimized);
		blur.enabled = true;
		blur.blurSize = Mathf.Lerp(blur.blurSize, 4.5, 0.02);
	}
	else {
		blur = GetComponent(BlurOptimized);
		blur.blurSize = Mathf.Lerp(blur.blurSize, 0, 0.02);
		WaitFewSecs();
		blur.enabled = false;
		gameOverCam.SetActive(false);
	}
	if (Manager.play) {
		backgroundMusic.volume = Mathf.Lerp(backgroundMusic.volume, 0, 0.02);
		if (goBackToOriginalPos) {
			background.localPosition.y = background1Pos;
			background2.localPosition.y = background2Pos;
		}
	
		if (!stop) {
			background.position.y = ((-transform.position.y) - 102);
			background2.position.y = ((-transform.position.y * 0.9) - 101);
			transform.position.y = Mathf.Lerp (transform.position.y, origPos, 0.05);
			
			if (transform.position.y < 0.5) {
				Wait ();
				stop = true;
			}
			stop2 = false;
		}
		else {
			//Buttons.play.GetComponent(BoxCollider2D).enabled = false;
			//Buttons.maps.GetComponent(BoxCollider2D).enabled = false;
		}
		if (creature != null) {
			if (creature.position.y >=1.5 && creature.position.y <= 5 && go) {
				transform.position.y = creature.position.y - 1.5;
				posChanged = true;
				goBackToOriginalPos = false;
				background.position.y = ((-transform.position.y * 1) - 102.5);
				background2.position.y = ((-transform.position.y * 0.9) - 101.5);
			}
			else if (creature.position.y <=1.5 && go && creature != null) {
				goBackToOriginalPos = true;
				posChanged = false;
				transform.position.y = 0;
			}
		}
	}
	else {
		backgroundMusic.volume = Mathf.Lerp(backgroundMusic.volume, 1, 0.02);
	}
	if (!Manager.play && !Manager.chooseMap && !Manager.customization && !Game_Over.alreadyPlaying) {
		if (!stop2) {
			transform.position.y = Mathf.Lerp (transform.position.y, difPos, 0.01);
			background.position.y = ((-transform.position.y * 1) - 102);
			background2.position.y = ((-transform.position.y * 0.9) - 101);
			stop = false;
			
			if (transform.position.y > 33.4) {
				stop2 = true;
			}
		}
		else {
			//Buttons.play.GetComponent(BoxCollider2D).enabled = true;
			//Buttons.maps.GetComponent(BoxCollider2D).enabled = true;
		}
	}
	
	if (Manager.chooseMap) {
		transform.position.y = Mathf.Lerp (transform.position.y, difPos2, 0.01);
		background.position.y = ((-transform.position.y * 1) - 102);
		background2.position.y = ((-transform.position.y * 0.9) - 101);
	}
}

function Wait () {
	//yield WaitForSeconds (50 * Time.deltaTime);
	go = true; 
}
function WaitFewSecs () {
	yield WaitForSeconds(3);
}