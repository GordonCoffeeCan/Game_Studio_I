using UnityEngine;
using System.Collections;

public class TankController : MonoBehaviour {
	public float speed = 5;
    public float angularSpeed = 5;
    public int tankNum = 1;
    public Rigidbody cannonShell;

	private Transform myTank;
    private Rigidbody _rigidbody;
    private Transform cannonBallSpawn;
    private float fireForce;
    private float fireAccumulateForce = 2.5f;
    private float reloadTimer;
    private float fireTimer;

    private float _fireForce = 10.5f;
    private float _reloadTimer = 0.65f;
    private float _fireTimer = 0.5f;

    private KeyCode fireKey;

	// Use this for initialization
	void Start () {
		myTank = this.transform;
        _rigidbody = this.GetComponent<Rigidbody>();

        cannonBallSpawn = transform.FindChild("CannonBallSpawn");

		fireTimer = _fireTimer;
        fireForce = _fireForce;

        if (tankNum == 1) {
            fireKey = KeyCode.Space;
        } else if (tankNum == 2) {
            fireKey = KeyCode.Return;
        }
	}

    void Update() {
        reloadTimer -= Time.deltaTime;
        if (Input.GetKey(fireKey)) {
            if(reloadTimer <= 0){
                fireTimer -= Time.deltaTime;
                fireForce += fireAccumulateForce;
                if (fireTimer <= 0) {
                    InstantiateCannonShell();
                    fireForce = _fireForce;
                    fireTimer = _fireTimer;
                    reloadTimer = _reloadTimer;
                }
            }
        }else if(Input.GetKeyUp(fireKey)){
            if (reloadTimer <= 0) {
                InstantiateCannonShell();
                fireForce = _fireForce;
                fireTimer = _fireTimer;
                reloadTimer = _reloadTimer;
            }
        }
    }
	
	// Update is called once per frame
	void FixedUpdate () {
        _rigidbody.velocity = myTank.forward * Input.GetAxis("VerticalControl" + tankNum) * speed;
        _rigidbody.angularVelocity = myTank.up * Input.GetAxis("HorizontalControl" + tankNum) * angularSpeed;
	}

    private void InstantiateCannonShell() {
        Rigidbody _cannonShell;
        _cannonShell = Instantiate(cannonShell, cannonBallSpawn.position, cannonBallSpawn.transform.rotation) as Rigidbody;
        _cannonShell.AddForce(_cannonShell.transform.forward * fireForce, ForceMode.Impulse);
    }
}
