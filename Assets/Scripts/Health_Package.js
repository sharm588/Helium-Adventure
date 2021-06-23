#pragma strict

function Start () {

}

function Update () {

}
function OnCollisionEnter2D (other : Collision2D) {
	
	if (other.collider.name == "Creature_Prefab(Clone)") {
		other.gameObject.GetComponent(Main_Character_Script).health += 10;
		Destroy(gameObject);	
	}
	
	if (other.collider.name == "Creature_Body(Main)" || other.collider.transform.parent == "Creature_Body(Main)") {
		other.gameObject.GetComponent(Main_Character_Script).health += 10;
		Destroy(gameObject);	
	}
}