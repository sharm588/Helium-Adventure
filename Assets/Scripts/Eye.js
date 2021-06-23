#pragma strict

function Start () {

}

function Update () {

	if (Controls_Script.shoot && !Pause_Button.pause) {
		transform.rotation = Quaternion.Euler (0, 0, Controls_Script.rotZ);
	}
	else {
		transform.rotation = Quaternion.Euler (0, 0, 0);
	}

}