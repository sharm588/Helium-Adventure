#pragma strict

function Start () {

}

function Update () {

}
function OnCollisionEnter2D (other : Collision2D) {
	
	var type = Random.Range(1, 5);
	if (other.collider.name == "Creature_Body(Main)") {
		
		Destroy(gameObject);
	}
	
	if (other.collider.name == "Creature_Prefab(Clone)") {
		other.gameObject.GetComponent(Connect_Script).health += 25;
		Destroy(gameObject);
	}
}