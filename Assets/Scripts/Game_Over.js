#pragma strict

static var alreadyPlaying : boolean;
static var alreadyPlayingChoosingMap : boolean;

function Start () {

gameObject.GetComponent(SpriteRenderer).color.a = 0;
	
}

function Update () {

	//Debug.Log(Manager.gameOver);

	if (Manager.gameOver) {
		transform.position.z = -10;
		gameObject.GetComponent(SpriteRenderer).color.a = Mathf.Lerp(gameObject.GetComponent(SpriteRenderer).color.a, 1, 0.08);
		Controls_Script.go = false;
		Balloon_Script.tapped = false;
		if (Input.touchCount > 0) {
		
			var wp = Camera.main.ScreenToWorldPoint(Input.GetTouch(0).position);
			var wp2D = Vector2(wp.x, wp.y);
			
				if (gameObject.name == "Restart") {
			
				if (GetComponent.<Collider2D>() == Physics2D.OverlapPoint(wp2D)) {
					
					if (Input.GetTouch(0).phase == TouchPhase.Began) {
						transform.localScale = Vector2(0.4, 0.4);
					}
					
					if (Input.GetTouch(0).phase == TouchPhase.Ended) {
						transform.localScale = Vector2(0.5, 0.5);
						alreadyPlaying = true;
						Spawn.ZoneBuildUp = 0;
						Main_Character_Script.health = 100;
						Connect_Script.chain.Clear();
						Manager.gameSpeed = 0.08;
						Spawn.spawnTime = 3;
						Parallax_Scrolling.speed = 0.0035;
						Parallax_Scrolling.speed2 = 0.002;
						camera_Script.stop = false;
						camera_Script.stop2 = false;
						Manager.wave = 0;
						Score_Keeping.peopleScore = 0;
						Balloon_Script.tapped = false;
						Manager.play = true;
						Manager.gameStarted = false;
						Spawn.check1 = false;
						Spawn.check1AndHalf = false;
						Spawn.check2 = false;
						Spawn.check3 = false;
						Spawn.check4 = false;
						Spawn.check5 = false;
						Day_Night_System.time = Day_Night_System.timeRT;
						PlayerPrefs.SetFloat("time", Day_Night_System.time);
						PlayerPrefs.Save();
						PoolManager.resetAllPools();
						Manager.wave = 1;
						Spawn.waitTime = 180;
						camera_Script.go = false;
						Controls_Script.powerUpSave = 0;
						Manager.gameOver = false;
						Application.LoadLevel(Application.loadedLevel);
						Controls_Script.pwrUp = false;
						camera_Script.background.localPosition.y = camera_Script.background1Pos;
						camera_Script.background2.localPosition.y = camera_Script.background2Pos;
					}
					
				}
			}
			
			if (gameObject.name == "Back_To_Menu") {
				if (GetComponent.<Collider2D>() == Physics2D.OverlapPoint(wp2D)) {
					
					if (Input.GetTouch(0).phase == TouchPhase.Began) {
						transform.localScale = Vector2(0.4, 0.4);
					}
					
					if (Input.GetTouch(0).phase == TouchPhase.Ended) {
						transform.localScale = Vector2(0.5, 0.5);
						Manager.gameOver = false;
						alreadyPlayingChoosingMap = true;
						Spawn.ZoneBuildUp = 0;
						Main_Character_Script.health = 100;
						Connect_Script.chain.Clear();
						Manager.gameSpeed = 0.08;
						Spawn.spawnTime = 3;
						Parallax_Scrolling.speed = 0.0035;
						Parallax_Scrolling.speed2 = 0.002;
						camera_Script.stop = false;
						camera_Script.stop2 = false;
						Manager.wave = 0;
						Score_Keeping.peopleScore = 0;
						Balloon_Script.tapped = false;
						Manager.play = false;
						Manager.gameStarted = false;
						Spawn.check1 = false;
						Spawn.check1AndHalf = false;
						Spawn.check2 = false;
						Spawn.check3 = false;
						Spawn.check4 = false;
						Spawn.check5 = false;
						Day_Night_System.time = Day_Night_System.timeRT;
						PlayerPrefs.SetFloat("time", Day_Night_System.time);
						PlayerPrefs.Save();
						PoolManager.resetAllPools();
						Manager.wave = 1;
						Spawn.waitTime = 180;
						camera_Script.go = false;
						Controls_Script.powerUpSave = 0;
						Manager.gameOver = false;
						Manager.chooseMap = true;
						Application.LoadLevel(Application.loadedLevel);
						Controls_Script.pwrUp = false;
						alreadyPlayingChoosingMap = false;
						camera_Script.background.localPosition.y = camera_Script.background1Pos;
						camera_Script.background2.localPosition.y = camera_Script.background2Pos;
					}
				}
			}	
		}
	}
	else if (!Manager.gameOver){
		gameObject.GetComponent(SpriteRenderer).color.a = Mathf.Lerp(gameObject.GetComponent(SpriteRenderer).color.a, 0, 0.08);
	}
}