using UnityEngine;
using System.Collections;

public class SelfDestroy : MonoBehaviour {
    public float destroyTime = 3;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
        destroyTime -= Time.deltaTime;
        if (destroyTime <= 0) {
            Destroy(this.gameObject);
        }
	}
}
