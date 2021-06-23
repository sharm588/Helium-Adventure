#pragma strict

static var speed : float = 0.0035;
static var speed2 : float = 0.002;
var pos : float = 0;
var pos2 : float = 0;
var l1 : GameObject;
var l2 : GameObject;
var ice1 : Texture;
var ice2 : Texture;
var castle1 : Texture;
var castle2 : Texture;
var paranormia1 : Texture;
var paranormia2 : Texture;
var SpecialOnes1 : Texture;
var SpecialOnes2 : Texture;
var fog : Texture;
var transparent : Texture;
var particles : GameObject;
var lastStage : int = 0;

function Start () {

}

function Update () {
	
	if (Manager.gameStarted) {
		particles.SetActive(true);
		if (gameObject.name == "Layer1" && !Pause_Button.pause) {
			pos += speed;
			if (pos > 1.0) {
				pos -= 1.0;
			}
			l1.GetComponent.<Renderer>().material.mainTextureOffset = new Vector2 (pos, 0);
		}
		
		if (gameObject.name == "Layer2" && !Pause_Button.pause) {
			pos2 += speed2;
			if (pos2 > 1.0) {
				pos2 -= 1.0;
			}
			l2.GetComponent.<Renderer>().material.mainTextureOffset = new Vector2 (pos2, 0);
		}
	}
	else {
		particles.SetActive(false);
	}
	
	if (Stages.loadOne && lastStage != 1) {
		lastStage = 1;
		l1.GetComponent.<Renderer>().material.mainTexture = ice1;
		l2.GetComponent.<Renderer>().material.mainTexture = ice2;
		particles.GetComponent(ParticleSystem).startColor = Color.white;
	}
	else
	if (Stages.loadTwo && lastStage != 2) {
		lastStage = 2;
		l1.GetComponent.<Renderer>().material.mainTexture = castle1;
		l2.GetComponent.<Renderer>().material.mainTexture = castle2;
		particles.GetComponent(ParticleSystem).startColor = Color.white;
	}
	else
	if (Stages.loadThree && lastStage != 3) {
		lastStage = 3;
		l1.GetComponent.<Renderer>().material.mainTexture = paranormia1;
		l2.GetComponent.<Renderer>().material.mainTexture = paranormia2;
		particles.GetComponent(ParticleSystem).startColor = Color(1, 0.5, 0);
	}
	else
	if (Stages.loadFour && lastStage != 4) {
		lastStage = 4;
		l1.GetComponent.<Renderer>().material.mainTexture = SpecialOnes1;
		l2.GetComponent.<Renderer>().material.mainTexture = SpecialOnes2;
		particles.GetComponent(ParticleSystem).startColor = Color(1, 0.5, 0);
	}
	else
	if (Stages.loadFive && lastStage != 5) {
		lastStage = 5;
		l1.GetComponent.<Renderer>().material.mainTexture = fog;
		l2.GetComponent.<Renderer>().material.mainTexture = transparent;
		particles.GetComponent(ParticleSystem).startColor = Color.gray;
	}
}