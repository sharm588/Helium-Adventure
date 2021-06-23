#pragma strict

var enemyBody : GameObject;
var itemShot : GameObject;
var shootPoint : GameObject;
var armTex : GameObject;
var arm : GameObject;
var cp : GameObject;
var flyingEnemyUpperLeg : GameObject;
var flyingEnemyUpperLeg1 : GameObject;
var flyingEnemyLowerLeg : GameObject;
var flyingEnemyLowerLeg1 : GameObject;
var rotOffset : int = 90;
var rotZ : float;
var trigger : boolean = false;
var who : int;
var go : boolean = false;
var sp : int;
var currsp : GameObject;
var eye : GameObject;

function Start () {

}

function Update () {
	//Debug.Log(Connect_Script.chain.length);
	if (!go) {
		go = true;
		who = 2;//Random.Range(1, 3);
		//Debug.Log(who);
		if (who == 2) {
			if (Connect_Script.chain.length > 0) {
				sp = Connect_Script.chain[Random.Range(0, Connect_Script.chain.length)];
				currsp = GameObject.Find("Instance " + sp.ToString ());
			}
			else {
				who = 1;
			}
		}
	}

	if (transform.position.x < 7.9 && transform.position.x > -8.1) {
		if ( who == 1 || who == 3) {
			cp = GameObject.Find("shoot_Loc(Clone)");
			var dif = cp.transform.position - arm.transform.position;
			dif.Normalize();			
			rotZ = Mathf.Atan2 (dif.y, dif.x) * Mathf.Rad2Deg;			
			arm.transform.rotation = Quaternion.Euler (0, 0, rotZ + rotOffset);	
			eye.transform.rotation = Quaternion.Euler (0, 0, rotZ);
			
			transform.position.y = Mathf.Lerp(transform.position.y, cp.transform.position.y, 0.05);
	
			EnemyShoot();
		}
		
		if (who == 2) {
			var dif2 = currsp.transform.position - arm.transform.position;
			dif2.Normalize(); 
			rotZ = Mathf.Atan2 (dif2.y, dif2.x) * Mathf.Rad2Deg;
			arm.transform.rotation = Quaternion.Euler (0, 0, rotZ + rotOffset);
			transform.position.y = Mathf.Lerp(transform.position.y, currsp.transform.position.y, 0.05);
			EnemyShoot();
		}
	}
}
function OnCollisionEnter2D (other : Collision2D) {
	
	if (other.gameObject.tag == "Bullet") {
		transform.DetachChildren();
		flyingEnemyUpperLeg.GetComponent(Rigidbody2D).fixedAngle = false;
		flyingEnemyUpperLeg1.GetComponent(Rigidbody2D).fixedAngle = false;
		flyingEnemyLowerLeg.GetComponent(Rigidbody2D).fixedAngle = false;
		flyingEnemyLowerLeg1.GetComponent(Rigidbody2D).fixedAngle = false;
		enemyBody.layer = 20;
		Destroy(gameObject);
	}
	
	if (other.collider.tag == "MainCharacter" || other.collider.tag == "Creatures(Attached)") {
		transform.DetachChildren();
		flyingEnemyUpperLeg.GetComponent(Rigidbody2D).fixedAngle = false;
		flyingEnemyUpperLeg1.GetComponent(Rigidbody2D).fixedAngle = false;
		flyingEnemyLowerLeg.GetComponent(Rigidbody2D).fixedAngle = false;
		flyingEnemyLowerLeg1.GetComponent(Rigidbody2D).fixedAngle = false;
		enemyBody.layer = 20;
		Destroy(gameObject);
	}
}
function EnemyShoot () {
	if (!trigger) {
		var shotItem = Instantiate(itemShot, Vector3(shootPoint.transform.position.x, shootPoint.transform.position.y, 5), Quaternion.Euler(0, 0, rotZ - 180));
		shotItem.gameObject.tag = "EnemyShot";
		Wait ();
		trigger = true;
	}
}
function Wait () {
	yield WaitForSeconds (1);
	trigger = false;
}