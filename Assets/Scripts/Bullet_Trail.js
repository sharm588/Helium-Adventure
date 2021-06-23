#pragma strict

var moveSpeed : int = 230;

var go : boolean = true;

var timer : float = 1;

function Start () {
}

function Update () {
//audio.Play();
	transform.Translate(Vector3.right * Time.deltaTime * moveSpeed);
	DestroyObject ();
	
}

function OnCollisionEnter2D (other : Collision2D) {

	if (other.gameObject.tag != "Obstacle") {
	
		if (other.gameObject.name != "mainCreature") {
		
			if (other.gameObject.tag != "Creatures" && other.gameObject.tag != "Enemy" && other.gameObject.tag != "harmfulObstacle") {
				//var dir = Vector2 (transform.position.x, transform.position.y);		
				var force = 500;	
				other.rigidbody.AddForce (force * Vector3.right);	
				PoolManager.AddObjectToPool (Controls_Script.ShotPool, gameObject); 
			}
		}
	}
	else {
		PoolManager.AddObjectToPool (Controls_Script.ShotPool, gameObject); 
	}
	
	//if (other.collider.name == "Ice_Mountain(Clone)" || other.collider.name == "Mtn_Platform_Prefab(Clone)") {
	//	Destroy(gameObject);
	//}
}
function DestroyObject () {
	if (timer > 0) {
	timer -= Time.deltaTime;
	}
	else {
		timer = 1;
		Prefab_Script.DestroyShot (gameObject);
	}
}
			