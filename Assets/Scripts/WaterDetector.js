#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter2D (hit : Collider2D) {

	if (hit.GetComponent.<Collider2D>() != null) {
		transform.parent.GetComponent(Water).Splash(transform.position.x, hit.GetComponent.<Rigidbody2D>().velocity.y * hit.GetComponent.<Rigidbody2D>().mass / 40);
	}
}