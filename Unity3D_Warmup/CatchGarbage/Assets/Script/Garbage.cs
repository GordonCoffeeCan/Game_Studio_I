using UnityEngine;
using System.Collections;

public class Garbage : MonoBehaviour {
    Transform _trans;
    float timer = 3;

	// Use this for initialization
	void Start () {
        _trans = this.transform;

    }
	
	// Update is called once per frame
	void Update () {
        timer -= Time.deltaTime;
        if(timer <= 0) {
            Destroy(_trans.gameObject);
        }
	}
}
