#pragma strict
var speed : float;
var go : boolean = true;

function Start () {

}

function Update () {
	if (go) {
		speed = Random.Range (1, 80);
	}
	transform.Rotate(0, 0, speed * Time.deltaTime);
}