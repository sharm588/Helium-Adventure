#pragma strict

var prefabTransform : GameObject;
var hjCon : HingeJoint2D;
var tail : GameObject;

static var health : int = 100;

function Start () {

var shootLoc = Instantiate(prefabTransform, transform.position, transform.rotation);
shootLoc.transform.parent = transform;

}

function Update () { 
	if (Manager.gameStarted) {
		if (health < 1) {
			Destroy(hjCon);
			Manager.gameOver = true;
		}
		if (Connect_Script.chain.length > 4) {
			Destroy(hjCon);
			Manager.gameOver = true;
		}
		if (Controls_Script.pwrUp) {
			if (Connect_Script.chain.length == 0 && !Controls_Script.stopDrop) {
				Score_Keeping.peopleScore += 1;
				Controls_Script.pwrUp = false;
			}
			else {
				GetComponent(Collider2D).enabled = false;
				tail.GetComponent(Collider2D).enabled = false;
				GetComponent(SpriteRenderer).color = Color(1, 0.38, 0.38);
				tail.GetComponent(SpriteRenderer).color = Color(1, 0.38, 0.38);
			}
		}
		else if (!Controls_Script.pwrUp) {
			GetComponent(Collider2D).enabled = true;
			tail.GetComponent(Collider2D).enabled = true;
			GetComponent(SpriteRenderer).color.a = 1;
			tail.GetComponent(SpriteRenderer).color.a = 1;
			GetComponent(SpriteRenderer).color = Color(1, 1, 1);
			tail.GetComponent(SpriteRenderer).color = Color(1, 1, 1);
		}
	}
}
function OnCollisionEnter2D (other : Collision2D) {
	
	if (other.collider.tag == "EnemyShot") {
		health -= Enemy_Shot.damage;
		other.transform.parent = transform;
		other.gameObject.layer = 19;
	}
}