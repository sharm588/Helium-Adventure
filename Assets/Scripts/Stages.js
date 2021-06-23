#pragma strict

var one : GameObject;

var two : GameObject;

var three : GameObject;

var four : GameObject;

var five : GameObject;

var twoUnlocked : boolean;

var threeUnlocked : boolean;

var fourUnlocked : boolean;

var fiveUnlocked : boolean;

static var loadOne : boolean;

static var loadTwo : boolean;

static var loadThree : boolean;

static var loadFour : boolean;

static var loadFive : boolean;

function Start () {
}

function Update () {

	if (Score_Keeping.totalSaved >= 25) {
		twoUnlocked = true;
	}
	else {
		twoUnlocked = false;
	}
	if (Score_Keeping.totalSaved >= 50) {
		threeUnlocked = true;
	}
	else {
		threeUnlocked = false;
	}
	if (Score_Keeping.totalSaved >= 100) {
		fourUnlocked = true;
	}
	else {
		fourUnlocked = false;
	}
	if (Score_Keeping.totalSaved >= 200) {
		fiveUnlocked = true;
	}
	else {
		fiveUnlocked = false;
	}
	
	if (twoUnlocked) {
		two.SetActive(true);
		two.GetComponent(SpriteRenderer).color.a = 1;
	}
	else {
		two.SetActive(false);
		two.GetComponent(SpriteRenderer).color.a = 0.75;
	}
	
	if (threeUnlocked) {
		three.SetActive(true);
		three.GetComponent(SpriteRenderer).color.a = 1;
	}
	else {
		three.SetActive(false);
		three.GetComponent(SpriteRenderer).color.a = 0.75;
	}
	
	if (fourUnlocked) {
		four.SetActive(true);
		four.GetComponent(SpriteRenderer).color.a = 1;
	}
	else {
		four.SetActive(false);
		four.GetComponent(SpriteRenderer).color.a = 0.75;
	}
	
	if (fiveUnlocked) {
		five.SetActive(true);
		five.GetComponent(SpriteRenderer).color.a = 1;
	}
	else {
		five.SetActive(false);
		five.GetComponent(SpriteRenderer).color.a = 0.75;
	}
	
	if (!Manager.play) {

		if (Input.touchCount > 0) {
			var wp = Camera.main.ScreenToWorldPoint(Input.GetTouch(0).position);
			var wp2D = Vector2 (wp.x, wp.y);
			
			if (one.GetComponent.<Collider2D>() == Physics2D.OverlapPoint(wp2D)) {
				loadTwo = false;
				loadThree = false;
				loadFour = false;
				loadFive = false;
				loadOne = true;
				Manager.chooseMap = false;
				Manager.play = true;
			}
			if (two.GetComponent.<Collider2D>() == Physics2D.OverlapPoint(wp2D)) {
				loadOne = false;
				loadThree = false;
				loadFour = false;
				loadFive = false;
				loadTwo = true;
				Manager.chooseMap = false;
				Manager.play = true;
			}
			if (three.GetComponent.<Collider2D>() == Physics2D.OverlapPoint(wp2D)) {
				loadOne = false;
				loadTwo = false;
				loadFour = false;
				loadFive = false;
				loadThree = true;
				Manager.chooseMap = false;
				Manager.play = true;
			}
			if (four.GetComponent.<Collider2D>() == Physics2D.OverlapPoint(wp2D)) {
				loadOne = false;
				loadTwo = false;
				loadThree = false;
				loadFive = false;
				loadFour = true;
				Manager.chooseMap = false;
				Manager.play = true;
			}
			if (five.GetComponent.<Collider2D>() == Physics2D.OverlapPoint(wp2D)) {
				loadOne = false;
				loadTwo = false;
				loadThree = false;
				loadFour = false;
				loadFive = true;
				Manager.chooseMap = false;
				Manager.play = true;
			}
		}
	}
}
