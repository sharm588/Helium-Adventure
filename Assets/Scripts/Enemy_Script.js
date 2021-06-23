#pragma strict

function Start () {
}

function Update () {

}
function OnCollisionEnter2D (other : Collision2D) {
	if (other.collider.transform.name == "Creature_Body(Main)" || other.collider.transform.name == "Creature_Body(Clone)") {
		Destroy(other.gameObject);
		Destroy(gameObject);
	}
}