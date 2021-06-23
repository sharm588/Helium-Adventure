#pragma strict

static var weightLoad : float;

static var tapped : boolean = false;
//var trig : boolean = false;

function Awake () {
	GetComponent(SpriteRenderer).color = ColorChoose();
	weightLoad = 1;
}

function Update () {
	
	gameObject.GetComponent(Rigidbody2D).mass = weightLoad;
	
	if (transform.position.y <= -6) {
		Manager.gameOver = true;
		Destroy(gameObject);
	}
	
	/*if (Controls_Script.shoot) {
		if (trig) {		
			trig = false;			
			weightLoad -= 1;
		}		
	}
	
	if (!Controls_Script.shoot) {	
		if (!trig) {		
			trig = true;		
			weightLoad += 1;		
		}	
	}*/
}

static function ResetMass () {
	weightLoad = 1;
}

function FixedUpdate () {
	if (!Manager.gameStarted) {
		if (tapped && Manager.chooseMap != true) {
			//transform.position.x = Mathf.MoveTowards(transform.position.x, origPosition+2, 0.06);
			//if (transform.position.x > origPosition) {
				Manager.gameStarted = true; //Debug.Log(Manager.gameStarted);
				tapped = false;
			//}
		}

		if (Controls_Script.go) {
			tapped = true;
		}
	}	
	else if (Manager.gameStarted) {
		transform.position.x = Mathf.Lerp(transform.position.x, -5.5, Time.time * 0.01);
	}	
}


function OnCollisionEnter2D (other : Collision2D) {
	if (other.collider.gameObject.tag == "Obstacle" || other.collider.gameObject.tag == "FallCollider") {
		Manager.gameOver = true;
		Destroy (gameObject);
	} 
}

function ColorChoose () : Color {

	var colorValue = Color(Random.Range(0.0, 1.0), Random.Range(0.0, 1.0), Random.Range(0.0, 1.0), 0.5);
	
	return colorValue;
}