using UnityEngine;
using System.Collections;

public class DestroySelf : MonoBehaviour {
    private float timer;

	// Use this for initialization
	void Start () {
        timer = 5;

    }
	
	// Update is called once per frame
	void Update () {
        timer -= Time.deltaTime;
        if (timer <= 0) {
            Destroy(this.gameObject);
        }
	}
}
