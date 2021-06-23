#pragma strict

static var time : float;

var Cam : Camera;

var nighttimeSkyColor : Color = Color.black;

var daytimeSkyColor : Color = Color.green;

var middaySkyColor : Color = Color.blue;

var randomTime : Array = new Array(0, 360, 720, 1080);

//public var player : Transform;

public var sun : GameObject;

public var moon : GameObject;
 
public var radius : float = 6;

public static var daytimeRLSeconds : float = 6.0 * 60;

public static var duskRLSeconds : float = 1.0 * 60;

public static var nighttimeRLSeconds : float = 1.0 * 60;

public static var sunsetRLSeconds : float = 4.0 * 60;

public static var gameDayRLSeconds : float = daytimeRLSeconds + duskRLSeconds + nighttimeRLSeconds + sunsetRLSeconds;

public static var startOfDaytime : float = 0;

public static var startOfDusk : float = daytimeRLSeconds / gameDayRLSeconds;

public static var startOfSunset : float = startOfDusk + duskRLSeconds / gameDayRLSeconds;

public static var startOfNighttime : float = startOfSunset + sunsetRLSeconds / gameDayRLSeconds;

public static var timeRT : float;

function Awake () {
	PlayerPrefs.GetFloat("time", time);
}

function get TimeOfDay () : float {        // game time 0 .. 1
	return timeRT/gameDayRLSeconds;
}

function set TimeOfDay (value : float) {
	timeRT = value*gameDayRLSeconds;
}

function Update () {

	timeRT = (timeRT+Time.deltaTime) % gameDayRLSeconds;

	Cam.backgroundColor = CalculateSkyColor();

	var sunangle : float;

	var moonangle : float;

	sunangle = TimeOfDay * 360 + 180;

	moonangle = TimeOfDay * 360;

	var center : Vector3 = Vector3 (0, -202, 0); center.y -= 0.5; //center = playerposition at floor height

	sun.transform.position = center + Quaternion.Euler(0,0, sunangle)*(radius*Vector3.up);

	sun.transform.Rotate (0, 0, Time.deltaTime * 40);

	moon.transform.position = center + Quaternion.Euler(0,0,moonangle)*(radius*Vector3.up);

	//moon.transform.LookAt(center);
}

function CalculateSkyColor () : Color {

	var time : float = TimeOfDay;

	if (time <= 0.25 && time > 0) {

		return Color.Lerp(nighttimeSkyColor, daytimeSkyColor, time/0.25);

	}

	if (time <= 0.5 && time > 0.25) {
		return Color.Lerp(daytimeSkyColor, middaySkyColor, (time-0.25)/0.25);
	}

	if (time <= 0.75 && time > 0.5) {
		return Color.Lerp(middaySkyColor, daytimeSkyColor, (time-0.5)/0.25);
	}

	if (time <= 1 && time > 0.75) {
		return Color.Lerp(daytimeSkyColor, nighttimeSkyColor, (time-0.75)/0.25);
	}

}