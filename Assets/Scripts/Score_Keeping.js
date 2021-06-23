#pragma strict

var totalSavedKeeper : GUIText;
var savedKeeper : GUIText;
var highscore : GUIText;
var highScoreObj : GameObject;
var waveHighScore : int;
var savedHighScore : int;
static var redBoxes : int;
static var peopleScore : int;
static var totalSaved : int;
var test : int;
var WSK : GameObject;
var CCK : GameObject;

function Awake () {
	waveHighScore = PlayerPrefs.GetInt("waveHighScore");
	savedHighScore = PlayerPrefs.GetInt("savedHighScore");
	redBoxes = PlayerPrefs.GetInt("numberOfRedBoxes");
	totalSaved = PlayerPrefs.GetInt("totalSaved");
}

function Update () {
	
	if (camera_Script.stop) {
		WSK.SetActive(true);
		CCK.SetActive(true);
		highScoreObj.SetActive(true);
		totalSavedKeeper.text = "Total Saved: " + totalSaved;
		savedKeeper.text = "Score: " + peopleScore;
		highscore.text = "Highscore: " + savedHighScore;
		if (Manager.wave > waveHighScore) {
			waveHighScore = Manager.wave;
			PlayerPrefs.SetInt("waveHighScore", waveHighScore);
			PlayerPrefs.Save();
		}
		if (peopleScore > savedHighScore) {
			savedHighScore = peopleScore;
			PlayerPrefs.SetInt("savedHighScore", savedHighScore);
			PlayerPrefs.Save();
		}
		if (peopleScore > savedHighScore) {
			savedHighScore = peopleScore;
			PlayerPrefs.SetInt("savedHighScore", savedHighScore);
			PlayerPrefs.Save();
		}
	}
	else {
		WSK.SetActive(false);
		CCK.SetActive(false);
	}
}

function OnCollisionEnter2D (other : Collision2D) {
	if (other.collider.tag == "Creatures(Attached)") {
		peopleScore += 1;
		Destroy(other.gameObject);
	}
}

static function AddToRedBoxes () {

	if (redBoxes <= 1000000) {
		redBoxes += 1;
		PlayerPrefs.SetInt("numberOfRedBoxes", redBoxes);
		PlayerPrefs.Save();
	}
}

static function AddToTotalCreaturesSaved () {

	if (totalSaved <= 10000000) {
		totalSaved += 1;
		PlayerPrefs.SetInt("totalSaved", totalSaved);
		PlayerPrefs.Save();
	}
}
