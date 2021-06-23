#pragma strict

static var firstTime : int = 1;

static var check1 : boolean = false;

static var check2 : boolean = false;

static var check3 : boolean = false;

static var check4 : boolean = false;

static var SR : SpriteRenderer;

var I1 : Sprite;
var I2 : Sprite;
var I3 : Sprite;
var I4 : Sprite;
var I5 : Sprite;
var I6 : Sprite;
var helium : Sprite;
var hel : boolean = false;

function Awake () {
//firstTime = PlayerPrefs.GetInt("firstTime");
SR = GetComponent.<SpriteRenderer>();
firstTime = 1;
}

function Update () {

if (Manager.play) {
 //= Mathf.Lerp(SR.color.a, 1, 300 * Time.deltaTime);
		if (Spawn.tutorial == 1) {
			SR.color.a = 1;
			if (!Manager.gameStarted) {
				SR.sprite = I1;
			}
			if (Spawn.whatToDo == 1) {
				Pick();
			}
			if (Spawn.whatToDo == 2) {
				Mine();
			}
			if (Spawn.whatToDo == 3) {
				Rebo();
			}
			if (Spawn.whatToDo == 4) {
				Limit();
			}
			if (Spawn.whatToDo == 5) {
				Drop();
			}
			if (Spawn.whatToDo == 6) {
				hel = true;
			}
			
			if (hel) {
				SR.color.a = 0;
				transform.localPosition = Vector3(0, 0, 1);
				transform.localScale = Vector2(0.75, 0.75);
				SR.sprite = helium;
				SR.color.a = Mathf.Lerp(SR.color.a, 1, 0.01);
				Helium();
			}
			
		}
		else if (Spawn.tutorial == 0) {
				SR.color.a = 0;
		}
	}
}
function Pick() {
transform.localPosition = Vector3(0, 3.5, 1);
SR.sprite = I3;
transform.localScale = Vector2(1, 1);
}
function Mine() {
transform.localPosition = Vector3(0, 3.5, 1);
SR.sprite = I2;
transform.localScale = Vector2(1.5, 1.5);
}
function Rebo() {
transform.localPosition = Vector3(0, 3.5, 1);
SR.sprite = I6;
transform.localScale = Vector2(1.5, 1.5);
}
function Limit() {
transform.localPosition = Vector3(0, 3.5, 1);
SR.sprite = I4;
transform.localScale = Vector2(1.5, 1.5);
}
function Drop() {
transform.localPosition = Vector3(0, 3.5, 1);
SR.sprite = I5;
transform.localScale = Vector2(1.5, 1.5);
}
function Helium() {
yield WaitForSeconds(5);
//SR.color.a = Mathf.Lerp(SR.color.a, 0, 0.01);
yield WaitForSeconds(5);
hel = false;
}