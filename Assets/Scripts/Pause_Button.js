#pragma strict

static var pause : boolean = false;

var pauseTex : Sprite;
var playTex : Sprite;

function Start () {

}

function Update () {

	if (!Manager.gameOver && Manager.play) {
		GetComponent(SpriteRenderer).color.a = 1;
		if (Input.touchCount > 0) {
			var wp = Camera.main.ScreenToWorldPoint(Input.GetTouch(0).position);
			var point2D = Vector2(wp.x, wp.y);
			
			if (GetComponent.<Collider2D>() == Physics2D.OverlapPoint(point2D)) {
			
				if (Input.GetTouch(0).phase == TouchPhase.Began) {
					if (Time.timeScale == 1) {
						pause = true;
						GetComponent(SpriteRenderer).sprite = playTex;
					}
					if (Time.timeScale == 0) {
						pause = false;
						GetComponent(SpriteRenderer).sprite = pauseTex;
					}
				}
			
			}
		}
	}
	else {
		GetComponent(SpriteRenderer).color.a = 0;
	}
	
	if (pause) {
		Time.timeScale = 0;
	}
	else {
		Time.timeScale = 1;
	}
}