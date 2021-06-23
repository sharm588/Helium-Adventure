#pragma strict

function Start () {

}

function Update () {

	if (transform.tag != "Creatures(Attached)" && !Pause_Button.pause) {
		transform.position.x -= Manager.gameSpeed;
	}

}