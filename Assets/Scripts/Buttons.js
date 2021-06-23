#pragma strict

var maps : GameObject;

function Start () {

}

function Update () {

	if (!Manager.play && !Game_Over.alreadyPlaying) {
		
		if (Input.touchCount > 0) {
			
			var wp = Camera.main.ScreenToWorldPoint(Input.GetTouch(0).position);
			var wp2D = Vector2 (wp.x, wp.y);
			
			if (maps.GetComponent.<Collider2D>() == Physics2D.OverlapPoint(wp2D)) {
				Manager.chooseMap = true;
			}
		}
	}

}