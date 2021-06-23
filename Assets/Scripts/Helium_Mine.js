#pragma strict

var counter = 0;

var explosion : Sprite;

var original : Sprite;

function Start () {

}

function Update () {

	transform.Rotate(0, 0, Time.deltaTime * 50);
}

function OnCollisionEnter2D (other : Collision2D) {

	if (other.gameObject.tag == "Creatures" || other.gameObject.tag == "Creatures(Attached)") {
	
		if (other.gameObject.name == "tail" || other.gameObject.name == "tail(main)") {
			var otherID = other.transform.parent.gameObject.GetInstanceID();
		}
		else if (other.gameObject.name != "tail" && other.gameObject.name != "tail(main)") {
			otherID = other.gameObject.GetInstanceID();
		}
		
		var lChain = Connect_Script.chain;
		counter = 0;
		while (lChain.length > 0) {
			var poppedInstanceId = lChain.pop();
		//	var guy = EditorUtility.InstanceIDToObject(poppedInstanceId);
			//guy.layer = 20;
			if (poppedInstanceId != null) {
				if (poppedInstanceId == otherID) {
					break;
				}
				counter++;	
			}
			else{
				break;
			}				
		}
		if (other.gameObject.name != "tail" && other.gameObject.name != "tail(main)") {
			other.gameObject.GetComponent(Connect_Script).health -= 100;
			Destroy(other.gameObject.GetComponent(Connect_Script).HJToLeg);
			Balloon_Script.weightLoad -= (counter * 1.5) + 1.5;
		}
		else if (other.gameObject.name == "tail"){
			other.transform.parent.gameObject.GetComponent(Connect_Script).health -= 100;
			Destroy(other.transform.parent.gameObject.GetComponent(Connect_Script).HJToLeg);
			Balloon_Script.weightLoad -= (counter * 1.5) + 1.5;
		}
		else if (other.gameObject.name == "tail(main)") {
			other.transform.parent.gameObject.GetComponent(Main_Character_Script).health -= 100;
			Explode();
		}
		
		if (Balloon_Script.weightLoad < 1) {
					Balloon_Script.weightLoad = 1;
				}
		Explode();
	}
	
	if (other.collider.transform.name == "Creature_Body(Main)") {
		other.gameObject.GetComponent(Main_Character_Script).health -= 100;
		Explode();
		
	}
	
	if (other.collider.tag == "MainCharacter") {
		other.transform.parent.GetComponent(Main_Character_Script).health -= 100;
		Explode();
	}
	
	if (other.collider.transform.name == "Balloon") {
		Manager.gameOver = true;
		other.transform.DetachChildren();
		Destroy(other.gameObject);
		Explode();
		
	}
	
	if (other.gameObject.tag == "Bullet") {
		PoolManager.AddObjectToPool(Controls_Script.ShotPool, gameObject);
		Explode();
	}
}

function Explode () {
	GetComponent(CircleCollider2D).enabled = false;
	GetComponent(SpriteRenderer).sprite = explosion;
	transform.localScale = Vector2(2, 2);
	playExplosion.playExplo = true;
	transform.position.z = -10;
	yield WaitForSeconds (10 * Time.deltaTime);
	PoolManager.AddObjectToPool(Spawn.HeliumMinePool, gameObject);
	GetComponent(SpriteRenderer).sprite = original;
	GetComponent(CircleCollider2D).enabled = true;
}