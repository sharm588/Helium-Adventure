#pragma strict

static var poolManager = new Array(10);

static function CreatePool (poolId, poolCount) {
	//if (!poolManager[poolId]) {
//	Debug.Log("Creating pool "+poolId);
	
	if (poolManager[poolId] == null) {
		var pool : Array = new Array();			
		poolManager[poolId] = pool;						
	}
}

static function resetPool(poolId) {
	var pool : Array = poolManager[poolId];	
	pool.Clear();
}

static function resetAllPools() {
	for (var i=0; i < poolManager.length; i++) {
		if (poolManager[i] != null) {
			resetPool(i);
		}
	}
}

static function AddObjectToPool (poolId, poolObject : GameObject) {
	var pool : Array = poolManager[poolId];	
//	Debug.Log(pool.length);	
	poolObject.SetActive(false);
//	Debug.Log("Added1 to "+poolId);
	pool.Add(poolObject);
//	Debug.Log("Added len is "+poolId +", len="+pool.length);
	var count = 0;
	for (var i=0; i < pool.length; i++) {
		if (pool[i] != null) {
			//Debug.Log("idx i="+i+", val="+pool[i].ToString());
			count++;
		}
	}
//	Debug.Log("Added poollen "+poolId+", count="+count);
	
}

static function GetObject (poolId) {
	var pool : Array = poolManager[poolId];
	var count = 0;
	for (var i=0; i < pool.length; i++) {
		if (pool[i]) {
		count++;
		}
	}
	//Debug.Log("Popped Len "+poolId+", count="+count);
	
	var poolObject : GameObject = pool[0];
	pool.RemoveAt(0);
//	Debug.Log("Popped from "+poolId);
//	Debug.Log(poolObject);
	if (poolObject) {
		poolObject.SetActive(true);
//		Debug.Log("Popped activated for "+poolId);
	}
	return poolObject;
}