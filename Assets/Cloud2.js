#pragma strict

function Start () {

}

function Update () {

	transform.position.x += 0.005;

	if (transform.position.x >= 10.5) {
		transform.position.x = -10.5;
	}

}