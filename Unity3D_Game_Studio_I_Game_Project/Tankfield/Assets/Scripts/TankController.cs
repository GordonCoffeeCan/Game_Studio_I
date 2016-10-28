using UnityEngine;
using System.Collections;

public class TankController : MonoBehaviour {
	public float speed = 5;

	private Transform myTank;
	private CharacterController myController;

	private Vector3 moveDirection;

	// Use this for initialization
	void Start () {
		myTank = this.transform;
		myController = this.GetComponent<CharacterController> ();
		moveDirection = Vector3.zero;
	}
	
	// Update is called once per frame
	void Update () {
		moveDirection = new Vector3 (Input.GetAxis ("Horizontal"), 0, Input.GetAxis ("Vertical"));
		moveDirection = transform.TransformDirection (moveDirection);
		moveDirection *= speed;
		myController.Move (moveDirection * Time.deltaTime);
		
	}
}
