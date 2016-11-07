using UnityEngine;
using System.Collections;

public class TankController : MonoBehaviour {
	public float speed = 5;
    public float angularSpeed = 5;
    public int tankNum = 1;

	private Transform myTank;
    private Rigidbody rigidbody;

	// Use this for initialization
	void Start () {
		myTank = this.transform;
        rigidbody = this.GetComponent<Rigidbody>();
	}

    void Update() {

    }
	
	// Update is called once per frame
	void FixedUpdate () {
        rigidbody.velocity = myTank.forward * Input.GetAxis("VerticalControl" + tankNum) * speed;
        rigidbody.angularVelocity = myTank.up * Input.GetAxis("HorizontalControl" + tankNum) * angularSpeed;
	}
}
