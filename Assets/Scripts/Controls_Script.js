#pragma strict

static var go : boolean = false;
static var shoot : boolean = false;
static var rotZ : float;
static var ShotPool = 6;
static var powerUpSave : int = 0;

var bal : GameObject;
var touchPos : Vector2; 
var shootPos : Transform;
var rotOffset : int = 90;
var mainBody : GameObject;
var eyeShoot : GameObject;
var hit : RaycastHit2D;
var layer_Mask : LayerMask;
var fireRate : int = 0;
var timeToFire : int = 0;
var timeToSpawnTrail : float = 0;
var trailSpawnTime : float = 30;
var check : boolean = false;
var shotObj : GameObject;
static var pwrUp : boolean = false;
static var infiniteDrop;
static var stopDrop;

function Update () {
	if (timeToFire > 1000) {	
		timeToFire = 0;	
	}
	
	if (stopDrop) {
		StopPwrUp();
	}
	
	if (Manager.play) {

		if (Input.touchCount > 0 && !Pause_Button.pause && Manager.play && !Manager.gameOver && camera_Script.stop) {

		
			if (camera_Script.go) {	
				if (Input.GetTouch(0).phase == TouchPhase.Began) {		
					go = true;				
					bal.GetComponent(Rigidbody2D).AddRelativeForce(Vector2.up * 2000);			
				}
			}
		}
		
		if (powerUpSave >= 3) {
			pwrUp = true;
			powerUpSave = 0;
		}
	
		if (Manager.gameStarted) {
			if (bal != null) {
				bal.GetComponent(Rigidbody2D).AddRelativeForce(Vector2.up * -10);
			}
		}
	
		if (shoot && !Pause_Button.pause) {	
	
			if (Input.touchCount > 0) {
			
				var wp = Camera.main.ScreenToWorldPoint(Input.GetTouch(0).position);	
					
	//			var wp2 = Camera.main.ScreenToWorldPoint(Input.GetTouch(1).position);
				var touchPos = Vector2(wp.x, wp.y);	
				//Debug.Log("wp: " + wp);	
	//			var touchPos2 = Vector2(wp2.x, wp2.y);
				if (Time.time >= timeToSpawnTrail) {	
					var dif = wp - shootPos.position;
					//dif.Normalize();			
					rotZ = Mathf.Atan2 (dif.y, dif.x) * Mathf.Rad2Deg;
					//Debug.Log("rotation" + rotZ);		
					Trail ();	
					timeToSpawnTrail = Time.time + 1 / trailSpawnTime;						
				}	
														
			}
		

		}
	
		//Debug.DrawLine (gunPos, (touchPos - gunPos)*100, Color.blue);
	}
}

function Trail () {
	//if (fireRate == 0) {	
		if (Input.touchCount > 0) {
			var touch = Input.GetTouch(0);	
			if (touch.phase == TouchPhase.Began) {		
				if (!check) {
					check = true;
					createShotPool (ShotPool, shotObj, 40);
				}
				//Instantiate (trail, Vector2(eyeShoot.transform.position.x, eyeShoot.transform.position.y), Quaternion.Euler (0, 0, rotZ));
				var shot = PoolManager.GetObject (ShotPool);
				shot.gameObject.tag == "Bullet";
				shot.transform.position = Vector3(eyeShoot.transform.position.x, eyeShoot.transform.position.y, eyeShoot.transform.position.z);
				shot.transform.rotation = Quaternion.Euler (0, 0, rotZ);
				//eyeShoot.GetComponent.<AudioSource>().Play();			
			}				
			else {		
				if ((touch.phase == TouchPhase.Stationary || TouchPhase.Moved) && Time.time > timeToFire) {			
					timeToFire = Time.time + 1 / fireRate;		
					if (!check) {
						check = true;
						createShotPool (ShotPool, shotObj, 40);
					}		
					//var bul = Instantiate (trail, Vector2(eyeShoot.transform.position.x, eyeShoot.transform.position.y), Quaternion.Euler (0, 0, rotZ));	
					var bul = PoolManager.GetObject (ShotPool);
					bul.gameObject.tag = "Bullet";
					bul.transform.position = Vector3(eyeShoot.transform.position.x, eyeShoot.transform.position.y, eyeShoot.transform.position.z);
					bul.transform.rotation = Quaternion.Euler (0, 0, rotZ);
					//eyeShoot.GetComponent.<AudioSource>().Play();		
				}		
			}
		}
	//}
}
function createShotPool(poolName, objectType, objectCount: int) {
	PoolManager.CreatePool (poolName, objectCount);
	for (var i=0; i < objectCount; i++) {
		var plat = Instantiate(objectType, Vector2(eyeShoot.transform.position.x, eyeShoot.transform.position.y), Quaternion.Euler (0, 0, rotZ));
		PoolManager.AddObjectToPool (poolName, plat);				
	}	
}
static function StopPwrUp () {
	if (stopDrop) {
		yield WaitForSeconds(3);
		pwrUp = false;
		stopDrop = false;
	}
}