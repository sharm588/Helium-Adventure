#pragma strict

static var trigger : boolean = true;
static var trigger2 : boolean = true;

function Start () {

}

function Update () {

	if (camera_Script.posChanged) {
		trigger2 = true;
		if (trigger) {
			trigger = false;
			transform.position.y += 3;
		}
	}
	else {
		trigger = true;
		if (trigger2) {
			trigger2 = false;
			transform.position.y -= 3;
		}
	}
}