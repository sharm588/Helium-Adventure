#pragma strict

static var blockSpawning : boolean = false;
static var spawnTime : float = 3;


var heliumMine : GameObject;
var signPos : Vector3;
var doDropZone : boolean = false;
var dropZonePrefab : GameObject;
var InitiateZone : boolean = false;
var iceBlock : GameObject;
var grabbed : boolean = false;
var creaturePrefab : GameObject;
var platformPrefab : GameObject;
var creature : GameObject;
var platform : GameObject;
var spawnNeeded : boolean = false;
var go : boolean = true;
var KAR424 : GameObject;
var hand : GameObject;
var hand2 : GameObject;
var enemyPrefab : GameObject;
var brokenSeg : GameObject;
var windMillGold : GameObject;
var burningHomes : GameObject;
var platformDrop : GameObject;
var redBox : GameObject;
var rock : GameObject;
var actualSpawnTime : float;
var trig : boolean = false;
var creatureCount : int = 0;
var overload : boolean = false;
var c1 : boolean = false;
var c2 : boolean = false;
var c3 : boolean = false;
var c4 : boolean = false;
var c5 : boolean = false;
var c5AndHalf : boolean = false;
var c6 : boolean = false;
var instructions : GameObject;

static var whatToDo : int = 0;
static var tutorial : int = 1;
static var ZoneBuildUp : int = 0;
static var spawnType : int;
static var waitTime : int = 180;
static var check1 : boolean = false;
static var check1AndHalf : boolean = false;
static var check2 : boolean = false;
static var check3 : boolean = false;
static var check4 : boolean = false;
static var check5 : boolean = false;
static var IceBlockPool = 0;
static var BrokenSegPool = 1;
static var WindMillGoldPool = 2;
static var BurningHomesPool = 3;
static var HeliumMinePool = 4;
static var RedBoxPool = 5;
static var dropZonePool = 7;
static var CreaturePool = 8;
static var RocksPool = 9;

function Awake () {
	signPos = new Vector3(transform.position.x, transform.position.y + 1, transform.position.z + 1);
	//firstTime = PlayerPrefs.GetInt("firstTime");
}

function Update () {
	if (Manager.gameStarted) {
		if (go) {
			go = false;
			trig = false;
			SpawnRate ();
		}
		
		var gameComponent = gameObject.GetComponent(PoolManager);

		if (spawnNeeded) {
			spawnNeeded = false;
			creatureCount = 0;

			if (ZoneBuildUp != Manager.wave * 5) {
				if (!Pause_Button.pause) {
					if (tutorial == 0) {
						spawnType = Random.Range(0, 10);
					}
					else if (tutorial == 1) {
						if (!c1) {
							spawnTime = 6;
							spawnType = 3;
							whatToDo = 1;
							c1 = true;
						}
						else if (!c2) {
							spawnType = 5;
							whatToDo = 2;
							c2 = true;
						}
						else if (!c3) {
							spawnType = 9;
							whatToDo = 3;
							c3 = true;
						}
						else if (!c4) {
							spawnType = 3;
							whatToDo = 4;
							c4 = true;
						}
						else if (!c5) {
							spawnType = 5;
							c5 = true;
						}
						else if (!c6 && c5AndHalf) {
							whatToDo = 6;
							ZoneBuildUp = 0;
							EndTutorial();
							c6 = true;
						}
					}
					if (spawnType < 4) {
						spawnType = 0;	
						transform.position.y = Random.Range(-7, -2);
						transform.position.z = 0;
						if (Stages.loadOne) {
							if (!check1) {
								check1 = true;
								createObjectPool(IceBlockPool, iceBlock, 5);
							}
							transform.position.y = Random.Range(-6, -2);
							var platform = PoolManager.GetObject (IceBlockPool);
							platform.transform.position = transform.position;
							platform.transform.rotation = Quaternion.Euler(0, 0, 90);
							
							if (!check1AndHalf) {
								check1AndHalf = true;
								createCreaturePool(CreaturePool, creaturePrefab, 15);
							}
							
							//if (!CheckForOverload("Instance", platform.transform)) {
								creature = PoolManager.GetObject (CreaturePool);
							//}
							creature.transform.position.y = platform.transform.position.y + 5;
							creature.transform.position.x = platform.transform.position.x;
							creature.transform.position.z = platform.transform.position.z - 1;
							creature.transform.rotation.z = 0;
							//creature.transform.parent = platform.transform;
							creature.name = "Instance " + creature.GetInstanceID ();
							platform.gameObject.tag = "Obstacle";
							creature.gameObject.tag = "Creatures";
							creature.gameObject.layer = 9;
						}
					
						if (Stages.loadTwo) {
							if (!check1) {
								check1 = true;
								createObjectPool(BrokenSegPool, brokenSeg, 5);
							}
							transform.position.y = Random.Range(-5, -2);
							var plat = PoolManager.GetObject (BrokenSegPool);
							plat.transform.position = transform.position;							
							
							if (!check1AndHalf) {
								check1AndHalf = true;
								createCreaturePool(CreaturePool, creaturePrefab, 15);
							}
							var creat = PoolManager.GetObject (CreaturePool);
							creat.transform.position.y = plat.transform.position.y + 2;
							creat.transform.position.x = plat.transform.position.x;
							creat.transform.position.z = plat.transform.position.z - 1;
							creat.transform.rotation.z = 0;
							//gameObject.GetComponent(PoolManager).AddObjectToPool (1, plat);
							//gameObject.GetComponent(PoolManager).GetObject (1);
							//creat.transform.parent = plat.transform;
							creat.name = "Instance " + creat.GetInstanceID ();
							plat.gameObject.tag = "Obstacle";
							creat.gameObject.tag = "Creatures";
							creat.gameObject.layer = 9;
						}
					
						if (Stages.loadThree) {
							if (!check1) {
								check1 = true;
								createObjectPool(WindMillGoldPool, windMillGold, 5);
							}
							transform.position.y = Random.Range(-2, 4);
							var platf = PoolManager.GetObject (WindMillGoldPool);
							platf.transform.position = transform.position;														
							
							if (!check1AndHalf) {
								check1AndHalf = true;
								createCreaturePool(CreaturePool, creaturePrefab, 15);
							}
							var creatf = PoolManager.GetObject (CreaturePool);
							creatf.transform.position.y = platf.transform.position.y + 5;
							creatf.transform.position.x = platf.transform.position.x;
							creatf.transform.position.z = platf.transform.position.z - 1;
							creatf.transform.rotation.z = 0;
							//gameObject.GetComponent(PoolManager).AddObjectToPool (1, plat);
							//gameObject.GetComponent(PoolManager).GetObject (1);
							//creatf.transform.parent = platf.transform;
							creatf.name = "Instance " + creatf.GetInstanceID ();
							platf.gameObject.tag = "Obstacle";
							creatf.gameObject.tag = "Creatures";
							creatf.gameObject.layer = 9;
						}
					
						if (Stages.loadFour) {
							if (!check1) {
								check1 = true;
								createObjectPool(BurningHomesPool, burningHomes, 5);
							}
							transform.position.y = Random.Range(-2, 4);
							var platr = PoolManager.GetObject (BurningHomesPool);
							platr.transform.position = transform.position;														
							
							if (!check1AndHalf) {
								check1AndHalf = true;
								createCreaturePool(CreaturePool, creaturePrefab, 15);
							}
							var creatr = PoolManager.GetObject (CreaturePool);
							creatr.transform.position.y = platr.transform.position.y + 5;
							creatr.transform.position.x = platr.transform.position.x;
							creatr.transform.position.z = platr.transform.position.z - 1;
							creatr.transform.rotation.z = 0;
							//gameObject.GetComponent(PoolManager).AddObjectToPool (1, plat);
							//gameObject.GetComponent(PoolManager).GetObject (1);
							//creatr.transform.parent = platr.transform;
							creatr.name = "Instance " + creatr.GetInstanceID ();
							platr.gameObject.tag = "Obstacle";
							creatr.gameObject.tag = "Creatures";
							creatr.gameObject.layer = 9;
						}
						
						if (Stages.loadFive) {
							if (!check1) {
								check1 = true;
								createObjectPool(RocksPool, rock, 5);
							}
							transform.position.y = Random.Range(-2, -5);
							var plats = PoolManager.GetObject (RocksPool);
							plats.transform.position = transform.position;														
							
							if (!check1AndHalf) {
								check1AndHalf = true;
								createCreaturePool(CreaturePool, creaturePrefab, 15);
							}
							var creats = PoolManager.GetObject (CreaturePool);
							creats.transform.position.y = plats.transform.position.y + 2;
							creats.transform.position.x = plats.transform.position.x;
							creats.transform.position.z = plats.transform.position.z - 1;
							creats.transform.rotation.z = 0;
							//gameObject.GetComponent(PoolManager).AddObjectToPool (1, plat);
							//gameObject.GetComponent(PoolManager).GetObject (1);
							//creats.transform.parent = plats.transform;
							creats.name = "Instance " + creats.GetInstanceID ();
							plats.gameObject.tag = "Obstacle";
							creats.gameObject.tag = "Creatures";
							creats.gameObject.layer = 9;
						}
					}
					
					if (spawnType > 3 && spawnType < 8) {
						if (!check3) {
							check3 = true;
							gameObject.GetComponent(PoolManager).CreatePool (3, 4);
							createObjectPool(HeliumMinePool, heliumMine, 5);							
						}
						spawnType = 0;	
						transform.position.y = Random.Range(5, -4);
						var helMine = PoolManager.GetObject (HeliumMinePool);
						helMine.transform.localScale = Vector2(1, 1);
						helMine.transform.position = transform.position;
						helMine.tag = "harmfulObstacle";
					}
					if (spawnType > 7) {
						if (!check4) {
							check4 = true;
							gameObject.GetComponent(PoolManager).CreatePool (4, 4);
							createObjectPool(RedBoxPool, redBox, 5);								
						}
						spawnType = 0;				
						transform.position.y = Random.Range(5, -4);
						var redBox = PoolManager.GetObject (RedBoxPool);
						redBox.transform.position = transform.position;
						//enemy.gameObject.tag = "Enemy";							
					}		
					go = true;		
				}
			}
			else {
				ZoneBuildUp = 0;
				doDropZone = true;	
				spawnType = 11;
				if (doDropZone) {
					//trigger = true;
					doDropZone = false;
					if (!Stages.loadFive) {
						transform.position.y = -5;
					}
					else {
						transform.position.y = -3.2;
					}
					if (!check5) {
						check5 = true;
						createObjectPool(dropZonePool, platformDrop, 3);
						//var dropZonePlat = Instantiate(platformDrop, transform.position, transform.rotation);
					}
					PoolManager.GetObject (dropZonePool);
					InitiateZone = false;
					if (tutorial == 1 && !c5AndHalf) {
						whatToDo = 5;
						c5AndHalf = true;
					}
				
				//	if (dropZonePlat.transform.position.x < 8.9) {
					//	trigger = false;
						Manager.wave += 1;
						Manager.gameSpeed += 0.02;
						if (waitTime > 80) {
							waitTime -= 10;
						}
						Parallax_Scrolling.speed += 0.001;
						Parallax_Scrolling.speed2 += 0.001;
						if (spawnTime > 2.2) {
							spawnTime -= 0.2;
						}
					//}
				}
				blockSpawning = true;
				LateStart ();
			}			
		}

		if (grabbed) {
			creature.transform.parent = null;	
		} 	
	}
}

function SpawnRate () {
	yield WaitForSeconds(waitTime * Time.deltaTime);
	ZoneBuildUp += 1;
	spawnNeeded = true;
}

function LateStart () {
	yield WaitForSeconds(5);
	if (spawnTime > 0.5) {
		spawnTime -= 0.2;
	}
	blockSpawning = false;
	go = true;
}

function createObjectPool(poolName, objectType, objectCount: int) {
	gameObject.GetComponent(PoolManager).CreatePool (poolName, objectCount);
	for (var i=0; i < objectCount; i++) {
		var plat = Instantiate(objectType, Vector3 (transform.position.x, transform.position.y, 10), transform.rotation);
		gameObject.GetComponent(PoolManager).AddObjectToPool (poolName, plat);				
	}					
}
function createCreaturePool(poolName, objectType, objectCount: int) {
	gameObject.GetComponent(PoolManager).CreatePool (poolName, objectCount);
	for (var i=0; i < objectCount; i++) {
		var plat = Instantiate(objectType, Vector3 (transform.position.x, transform.position.y + 3, 10), transform.rotation);
		gameObject.GetComponent(PoolManager).AddObjectToPool (poolName, plat);				
	}					
}
/*function CheckForOverload (stringStart : String, trans : Transform) : boolean {
	
	for (var child in trans) {
		if (NameContains(stringStart, child)) {
			overload = true;
		}
		else {
			overload = false;
		}
	}
	return overload;
}*/
function EndTutorial() {
	yield WaitForSeconds(6);
	tutorial = 0;
	PlayerPrefs.SetInt("tutorial", tutorial);
	PlayerPrefs.Save();
}