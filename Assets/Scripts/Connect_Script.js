#pragma strict
static var chain : Array = [];
var dead : boolean = false;
static var staticDead : boolean = false;
var tail : GameObject;
var HJToLeg : HingeJoint2D;
var originalMass : float = 1;
var connected : boolean = false;
var health : int = 100;
var breakHJ : boolean = false;
var shaken : boolean = false;
var counter = 0;
var go : boolean = false;
var counted : boolean = false;
var taken : boolean = false;
var control : boolean = false;
var shakeDetached : boolean = true;
var invisible : boolean = false;

function Start () {
	gameObject.layer = 9;
}

function Update () {
	if (!go) {
		go = true;
		ColorChoose ();
	}
	if (invisible) {
		gameObject.GetComponent(SpriteRenderer).color.a = 0.5;
		tail.GetComponent(SpriteRenderer).color.a = 0.5;
		gameObject.GetComponent(Collider2D).enabled = false;
		tail.GetComponent(Collider2D).enabled = false;
	}
	else {
		gameObject.GetComponent(SpriteRenderer).color.a = 1;
		tail.GetComponent(SpriteRenderer).color.a = 1;
		gameObject.GetComponent(Collider2D).enabled = true;
		tail.GetComponent(Collider2D).enabled = true;
	}
	if (dead) {
		gameObject.layer = 20;
		tail.gameObject.layer = 20;
		transform.parent = null;
		transform.position.x -= Manager.gameSpeed;
	}
	if (!connected) {
		//upperLeg.GetComponent(Rigidbody2D).fixedAngle = true;
		//lowerLeg.GetComponent(Rigidbody2D).fixedAngle = true;
		//upperLeg1.GetComponent(Rigidbody2D).fixedAngle = true;
		//lowerLeg1.GetComponent(Rigidbody2D).fixedAngle = true;
		
	}
	else if (connected) {
		transform.parent = null;

		if (Spawn.blockSpawning || Controls_Script.pwrUp) {
			if (Input.acceleration.magnitude > 2) {
				Destroy(HJToLeg);
				if (shakeDetached) {
					shakeDetached = false;
					transform.position.y -= 1;
				}
				Balloon_Script.ResetMass();
				chain.Clear();
				if (Controls_Script.pwrUp) {
					invisible = true;
					Controls_Script.stopDrop = true;
				}
				shaken = true;
			}
			if (Controls_Script.pwrUp) {
					invisible = true;
				}
		}
	}
}

function OnCollisionEnter2D (other : Collision2D) {

	if (other.gameObject.tag == "FallCollider" && !control && gameObject.tag == "Creatures(Attached)") {
		control = true;
		if (!shaken) {
			Destroy(HJToLeg);
			gameObject.tag = "Creatures";
			tail.tag = "Creatures";
			gameObject.layer = 20;
			
			var ID = gameObject.GetInstanceID();
		
			var lChain = chain;
			counter = 0;
			while (lChain.length > 0) {
				var poppedInstanceId = lChain.pop();
			//	var guy = EditorUtility.InstanceIDToObject(poppedInstanceId);
				//guy.gameObject.layer = 20;
				if (poppedInstanceId != null) {
					if (poppedInstanceId == ID) {
						break;
					}
					counter++;	
				}
				else {
					break;
				}						
			}
			Balloon_Script.weightLoad -= (counter * 1.5) + 1.5;	
			if (Balloon_Script.weightLoad < 1) {
				Balloon_Script.weightLoad = 1;
			}			
		}
	}

	//if (!connected && other.gameObject.name == "Limb_Lower_Leg" || "Limb_Lower_Leg_2") {
	if (!connected && (other.gameObject.name == "tail" || other.gameObject.name == "tail(main)") && (other.transform.tag == "Creatures(Attached)")) {
		if(!dead) {
			other.gameObject.GetComponent(Rigidbody2D).isKinematic = true;
			HJToLeg = gameObject.AddComponent(HingeJoint2D);
			HJToLeg.connectedBody = other.gameObject.GetComponent(Rigidbody2D);
			HJToLeg.anchor = Vector2(0.1055877, 1.132024);
			HJToLeg.connectedAnchor = Vector2(-0.02928286, -0.6607251);
			playLatch.playLatch = true;
			gameObject.layer = 8;
			gameObject.tag = "Creatures(Attached)";
			tail.tag = "Creatures(Attached)";
			Balloon_Script.weightLoad += 1.5;
			connected = true;
			chain.push(gameObject.GetInstanceID());
			other.gameObject.GetComponent(Rigidbody2D).isKinematic = false;
		}
	}
	
	if (other.gameObject.tag == "Bullet" && gameObject.tag == "Creatures") {	
		var force = 1000;	
		GetComponent.<Rigidbody2D>().AddForce (Vector3.right * force);	
		dead = true;
		Destroy(other.gameObject);
	}
	
	if (other.gameObject.tag == "EnemyShot") {
		health -= Enemy_Shot.damage;
		other.transform.parent = transform;
		
		if (health <= 0) {
			Destroy(HJToLeg);
			Balloon_Script.weightLoad -= 1.5;
			ID = gameObject.GetInstanceID();
			
			while (lChain.length > 0) {
				poppedInstanceId = lChain.pop();
			//	var guy = EditorUtility.InstanceIDToObject(poppedInstanceId);
				//guy.gameObject.layer = 20;
				if (poppedInstanceId != null) {
					if (poppedInstanceId == ID) {
						break;
					}
					counter++;	
				}
				else {
					break;
				}	
				Balloon_Script.weightLoad -= (counter * 1.5) + 1.5;	
				
				if (Balloon_Script.weightLoad < 1) {
					Balloon_Script.weightLoad = 1;
				}
				gameObject.layer = 20;		
			}
			gameObject.Destroy(GetComponent(HingeJoint2D));
		}
	}
}

function ColorChoose () {
	var col = Color (Random.Range(0.0, 1.0), Random.Range(0.0, 1.0), Random.Range(0.0, 1.0));
	gameObject.GetComponent(SpriteRenderer).color = col;	
	tail.gameObject.GetComponent(SpriteRenderer).color = col;
}