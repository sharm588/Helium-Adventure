#pragma strict

function Start () {

}

function Update () {
	
	if (transform.position.x < -14 || transform.position.y < -20) {
		var name = gameObject.name;
		//if (name.IndexOf("Ice_Mountain") != -1) {
			//Debug.Log("Destroying  ["+name+"]");
		//}
		if (name == "Ice_Mountain(Clone)") {
			//Debug.Log("Destroying Pool Entry"+name);
			PoolManager.AddObjectToPool(Spawn.IceBlockPool, gameObject);
		}
		else
		if (name == "Broken_Seg(Clone)") {
		//Debug.Log("Destroying Pool Entry"+name);
			PoolManager.AddObjectToPool(Spawn.BrokenSegPool, gameObject);
		}
		else
		if (name == "wind_Mill_Gold(Clone)") {
		//	Debug.Log("Destroying Pool Entry"+name);
			PoolManager.AddObjectToPool(Spawn.WindMillGoldPool, gameObject);
		}
		else
		if (name == "Burning_Homes(Clone)") {
		//	Debug.Log("Destroying Pool Entry"+name);
			PoolManager.AddObjectToPool(Spawn.BurningHomesPool, gameObject);
		}	
		else 
		if (name == "Rock(Clone)") {
			PoolManager.AddObjectToPool(Spawn.RocksPool, gameObject);
		}
		else	
		if (name == "Mine(Clone)") {
		//	Debug.Log("Destroying Pool Entry"+name);
			PoolManager.AddObjectToPool(Spawn.HeliumMinePool, gameObject);
		}
		else	
		if (name == "redBox(Clone)") {
		//	Debug.Log("Destroying Pool Entry"+name);
			PoolManager.AddObjectToPool(Spawn.RedBoxPool, gameObject);
		}	
		else 
		if (name == "dropZone(Clone)") {
			PoolManager.AddObjectToPool(Spawn.dropZonePool, gameObject);
		}	
		else 
		if (name == "Instance " + gameObject.GetInstanceID()) {
			if (!Controls_Script.pwrUp) {
				gameObject.tag = "Creatures";
				PoolManager.AddObjectToPool(Spawn.CreaturePool, gameObject);
				GetComponent(Connect_Script).connected = false;
				GetComponent(Connect_Script).shaken = false;
				GetComponent(Connect_Script).shakeDetached = true;
			}
			else {
				if (transform.position.y < -20) {
					gameObject.tag = "Creatures";
					PoolManager.AddObjectToPool(Spawn.CreaturePool, gameObject);
					GetComponent(Connect_Script).connected = false;
					if (GetComponent(Connect_Script).shaken) {
						Score_Keeping.peopleScore += 1;
						GetComponent(Connect_Script).shakeDetached = true;
						GetComponent(Connect_Script).shaken = false;
					}
					GetComponent(Connect_Script).invisible = false;
				}
			}
		}				
	}
}
static function DestroyShot (shot : GameObject) {
	PoolManager.AddObjectToPool(Controls_Script.ShotPool, shot);
}

