#pragma strict

function Start () {

}

function Update () {

transform.Rotate (50 * Time.deltaTime, 50 * Time.deltaTime, 0);

}
function OnCollisionEnter2D (other : Collision2D) {
	
	if (other.collider.tag == "MainCharacter" || other.collider.tag == "Creatures(Attached)") {
		Score_Keeping.AddToRedBoxes();
		PoolManager.AddObjectToPool(Spawn.RedBoxPool, gameObject);
		Controls_Script.powerUpSave += 1;
	}
	/*if (other.collider.tag == "Creatures") {
		Destroy (gameObject);
	}*/
}