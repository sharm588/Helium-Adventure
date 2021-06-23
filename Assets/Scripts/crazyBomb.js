#pragma strict
var counter = 0;
var cp : GameObject;
var stop : boolean = false;
var eye : GameObject;

function Start () {

}

function Update () {

	if (!stop) {
		cp = GameObject.Find("shoot_Loc(Clone)");
		transform.position.x -= (Manager.gameSpeed) + 0.01;
		transform.position.y = Mathf.Lerp(transform.position.y, cp.transform.position.y, 0.01);
		
		var dif = cp.transform.position - eye.transform.position;
		
		dif.Normalize();	
				
		var rotZ = Mathf.Atan2 (dif.y, dif.x) * Mathf.Rad2Deg;
		eye.transform.rotation = Quaternion.Euler (0, 0, rotZ);
	}
}
function OnCollisionEnter2D (other : Collision2D) {
	
	if (other.collider.transform.name == "Creature_Prefab(Clone)") {
		if (other.gameObject.GetComponent(Connect_Script).connected) {
			stop = true;
			transform.parent = other.transform;
			yield WaitForSeconds (1);
		
			var otherID = other.gameObject.GetInstanceID();
		
			var lChain = Connect_Script.chain;
			while (lChain.length > 0) {
				var poppedInstanceId = lChain.pop();
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
			other.gameObject.GetComponent(Connect_Script).health -= 100;
			Balloon_Script.weightLoad -= (counter * 1.1) + 1.1;
			Destroy(gameObject);
		}
	}
	
	if (other.collider.transform.name == "Creature_Body(Main)") {
		stop = true;
		transform.parent = other.gameObject.transform;
		yield WaitForSeconds (1);
		other.transform.DetachChildren();
		Destroy(other.gameObject);
		Destroy(gameObject);
	}
	
	if (other.collider.name == "Bullet_Trail(Clone)") {
		Destroy (other.gameObject);
		Destroy(gameObject);
	}
}