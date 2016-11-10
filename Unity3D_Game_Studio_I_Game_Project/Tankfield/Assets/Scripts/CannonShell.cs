using UnityEngine;
using System.Collections;

public class CannonShell : MonoBehaviour {
    private Vector3 massCenter;
    private Rigidbody _rigidbody;

	// Use this for initialization
	void Start () {
        massCenter = new Vector3(0, 0, 0.1f);
        _rigidbody = this.GetComponent<Rigidbody>();
        _rigidbody.centerOfMass = massCenter;
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
