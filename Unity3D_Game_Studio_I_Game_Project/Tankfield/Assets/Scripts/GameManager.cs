using UnityEngine;
using System.Collections;

public class GameManager : MonoBehaviour {
    public static bool gameIsOver;

    public GameObject AlliesText;
    public GameObject AxisText;

	// Use this for initialization
	void Start () {
        gameIsOver = false;
	}
	
	// Update is called once per frame
	void Update () {

	}

    public void AlliesWin() {
        AlliesText.SetActive(true);
    }

    public void AxisWin() {
        AxisText.SetActive(true);
    }
}
