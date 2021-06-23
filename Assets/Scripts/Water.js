#pragma strict
var xpositions : float [];
var ypositions : float [];
var velocities : float [];
var accelerations : float [];
var body : LineRenderer;

var meshobjects : GameObject [];
var meshes : Mesh [];

var colliders : GameObject [];

var spring : float = 0.02;
var damping : float = 0.04;
var spread : float = 5;
var z : int = -98;

var baseheight : float;
var bottom : float;
var left : float;

 var splash : GameObject;
 var mat : Material;
 var watermesh : GameObject;

var tris : int [];

var go : boolean = true;
var go2 : boolean = true;

var waveTimer : float = 1.0;

function Start () {
	Caching.CleanCache();
}

function Update () {

	if (Stages.loadFive) {
	
		if (go) {
			go2 = true;
			go = false;
			SpawnWater(-10,20, -3.5, -5);
		}
		WaterWave ();
	}	
	else if (!Stages.loadFive) {
	
		if (go2) {
		//	SpawnWater(-10,20, -4, 5);
			go = true;
			go2 = false;
			if (gameObject.GetComponent(LineRenderer) != null) {
				Destroy (gameObject.GetComponent(LineRenderer));
			}
			DestroyWater ();
		}
	}
	startBaseWave();
}

function SpawnWater (Left : float, Width : float, Top : float, Bottom : float) {
	//creating nodes
	var edgeCount = Mathf.RoundToInt(Width) * 5;
	//# of nodes per unit width
	var nodeCount = edgeCount + 1;
	// +1 for the node at the end
	
	//water rim (LineRenderer)
	body = gameObject.AddComponent(LineRenderer);
	body.material = mat;
	body.material.renderQueue = 1000;
	//spawns above body of water
	body.SetVertexCount(nodeCount);
	body.SetWidth(0.05, 0.05);
	
	//initialize top variables
	xpositions = new float[nodeCount];
	ypositions = new float[nodeCount];
	velocities = new float[nodeCount];
	accelerations = new float[nodeCount];
 
	meshobjects = new GameObject[edgeCount];
	meshes = new Mesh[edgeCount];
	colliders = new GameObject[edgeCount];
 
	baseheight = Top;
	bottom = Bottom;
	left = Left;
	
	for (var k : int = 0; k < nodeCount; k++)	{
		//set y positions to top of water
    	ypositions[k] = Top;
    	// incrementally add all nodes side by side
    	xpositions[k] = Left + Width * k / edgeCount;
    	//water is initially still so no accelerations
   		accelerations[k] = 0;
   		//water is initially still so no velocities
    	velocities[k] = 0;
    	//place each node in correct position
    	body.SetPosition(k, new Vector3(xpositions[k], ypositions[k], z));
	}
	
	//creating meshes
	//meshes need 1.) vertices 2.) UVs 3.) meshes are quadrilaterals which can be made up of two triangles
	for (var i : int = 0; i < edgeCount; i++) {
    	meshes[i] = new Mesh();
    	
		var Vertices : Vector3 [] = new Vector3[4];
		Vertices[0] = new Vector3(xpositions[i], ypositions[i], z);
		Vertices[1] = new Vector3(xpositions[i + 1], ypositions[i + 1], z);
		Vertices[2] = new Vector3(xpositions[i], bottom, z);
		Vertices[3] = new Vector3(xpositions[i+1], bottom, z);
		
		var UVs : Vector2 [] = new Vector2[4];
		UVs[0] = new Vector2(0, 1);
		UVs[1] = new Vector2(1, 1);
		UVs[2] = new Vector2(0, 0);
		UVs[3] = new Vector2(1, 0);
		
		var tris : int [] = new int[6];
		tris [0] = 0;
		tris [1] = 1;
		tris [2] = 3;
		tris [3] = 3;
		tris [4] = 2;
		tris [5] = 0;
		
		meshes[i].vertices = Vertices;
		meshes[i].uv = UVs;
		meshes[i].triangles = tris;
		
		meshobjects[i] = Instantiate(watermesh,Vector3.zero,Quaternion.identity) as GameObject;
		meshobjects[i].tag = "Water";
		meshobjects[i].GetComponent(MeshFilter).mesh = meshes[i];
		meshobjects[i].transform.parent = transform;
		
		colliders[i] = new GameObject();
		colliders[i].name = "Trigger";
		colliders[i].tag = "Water";
		colliders[i].layer = 26;
		colliders[i].AddComponent (BoxCollider2D);
		colliders[i].transform.parent = transform;
		colliders[i].transform.position = new Vector3(Left + Width * (i + 0.5) / edgeCount, Top - 0.5, 0);
		colliders[i].transform.localScale = new Vector3(Width / edgeCount, 1, 1);
		colliders[i].GetComponent (BoxCollider2D).isTrigger = true;
		colliders[i].AddComponent (WaterDetector);
	}
}

function UpdateMeshes() {
	for (var i : int = 0; i < meshes.length; i++) {
		var Vertices : Vector3 [] = new Vector3[4];
        Vertices[0] = new Vector3(xpositions[i], ypositions[i], z);
        Vertices[1] = new Vector3(xpositions[i+1], ypositions[i+1], z);
        Vertices[2] = new Vector3(xpositions[i], bottom, z);
        Vertices[3] = new Vector3(xpositions[i+1], bottom, z);
 
        meshes[i].vertices = Vertices;
	        
	}
}
   
function startBaseWave() {
	
	if(waveTimer > 0){
  		waveTimer -= Time.deltaTime;
 	}

	if(waveTimer <= 0){
		if (velocities.length > 0) {
			velocities[0] += 0.2;
		}
		waveTimer = 1.0;
	}
}

function WaterWave() {
	for (var i : int = 0; i < xpositions.length ; i++) {
		var force : float = spring * (ypositions[i] - baseheight) + velocities[i]*damping ;
      	accelerations[i] = -force;
   	    ypositions[i] += velocities[i];
        velocities[i] += accelerations[i];
        body.SetPosition(i, new Vector3(xpositions[i], ypositions[i], z));
    }
    
    var leftDeltas : float [] = new float[xpositions.length];
	var rightDeltas : float [] = new float[xpositions.length];
	
	for (var j : int = 0; j < 2; j++) {
	
    	for (var t : int = 0; t < xpositions.length; t++) {
        	if (t > 0)	{       	
	            leftDeltas[t] = spread * (ypositions[t] - ypositions[t-1]);
	            velocities[t - 1] += leftDeltas[t];
       	 	}
        
        	if (t < xpositions.length - 1) {
           		rightDeltas[t] = spread * (ypositions[t] - ypositions[t + 1]);
           		velocities[t + 1] += rightDeltas[t];
        	}
    	}
	}
	
	for (var l : int = 0; l < xpositions.length; l++) {
   		if (l > 0) {
        	ypositions[l-1] += leftDeltas[l];
    	}
   		if (l < xpositions.length - 1) {
        	ypositions[l + 1] += rightDeltas[l];
    	}
	}
	UpdateMeshes();
}

public function Splash (xpos : float, velocity : float) {

	if (xpos >= xpositions[0] && xpos <= xpositions[xpositions.length-1]) {
		xpos -= xpositions[0];
		var index : int = Mathf.RoundToInt((xpositions.length-1)*(xpos / (xpositions[xpositions.length-1] - xpositions[0])));
		velocities[index] += velocity;
		var lifetime :float = 0.93 + Mathf.Abs(velocity)*0.07;
		splash.GetComponent (ParticleSystem).startSpeed = 8+2*Mathf.Pow(Mathf.Abs(velocity),0.5);
		splash.GetComponent (ParticleSystem).startSpeed = 9 + 2 * Mathf.Pow(Mathf.Abs(velocity), 0.5);
		splash.GetComponent (ParticleSystem).startLifetime = lifetime;
		var position : Vector3 = new Vector3(xpositions[index],ypositions[index]-0.35,5);
		var rotation = Quaternion.LookRotation(new Vector3(xpositions[Mathf.FloorToInt(xpositions.length / 2)], baseheight + 8, 5) - position);
		var splish : GameObject = Instantiate(splash,position,rotation) as GameObject;
        Destroy(splish, lifetime+0.3);
    }
    
}

function DestroyWater () {
	var objectsToBeDestroyed : GameObject[];
	
	objectsToBeDestroyed = GameObject.FindGameObjectsWithTag ("Water");
	
	for (var i : int = 0; i < objectsToBeDestroyed.length; i++) {
		Destroy (objectsToBeDestroyed[i]);
	}
	
}