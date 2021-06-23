#pragma strict

function Start () {

}

function Update () {

}
function OnCollisionEnter2D (other : Collision2D) {
	Destroy(other.gameObject);
}