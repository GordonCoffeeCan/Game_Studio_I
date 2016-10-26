using UnityEngine;
using System.Collections;

public class Burst : MonoBehaviour {
    Rigidbody2D _rigidbody;
    private float forceMagnitude;

	// Use this for initialization
	void Start () {
        _rigidbody = this.transform.GetComponent<Rigidbody2D>();
        forceMagnitude = Random.Range(-15, 15);
        AddForce();
    }
	
	// Update is called once per frame
	void Update () {
	
	}

    void AddForce() {
        _rigidbody.AddForce(new Vector2(forceMagnitude, forceMagnitude), ForceMode2D.Impulse);
    }
}
