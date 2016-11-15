using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class TankController : MonoBehaviour {
	public float speed = 5;
    public float angularSpeed = 5;
    public int tankNum = 1;
    public Rigidbody cannonShell;
    public Image healthBarFill;
    public Transform tankBurst;

    public float health = 100;
    private float healthScale = 100;
    
    [HideInInspector]public bool isHit = false;

    private float hitTimer = 0.8f;

	private Transform myTank;
    private Rigidbody _rigidbody;
    private Transform cannonBallSpawn;

    private AudioSource tankAudio;

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
        tankAudio = this.GetComponent<AudioSource>();

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
        if (GameManager.gameIsOver == true) {
            if (Input.GetKeyDown(KeyCode.Space)) {
                SceneManager.LoadScene("Main", LoadSceneMode.Single);
            }
            return;
        }
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

        if (isHit == true) {
            hitTimer -= Time.deltaTime;
            if(hitTimer <= 0){
                isHit = false;
                hitTimer = 0.8f;
            }
        }

        healthBarFill.fillAmount = health / healthScale;

        if(health <= 0){
            DestroyTank();
        }
    }
	
	// Update is called once per frame
	void FixedUpdate () {
        if (GameManager.gameIsOver == true) {
            return;
        }
        if (isHit == false) {
            float v = Input.GetAxis("VerticalControl" + tankNum);
            float h = Input.GetAxis("HorizontalControl" + tankNum);
            _rigidbody.velocity = myTank.forward * v * speed;
            _rigidbody.angularVelocity = myTank.up * h * angularSpeed;
        }
	}

    private void InstantiateCannonShell() {
        Rigidbody _cannonShell;
        tankAudio.Play();
        _cannonShell = Instantiate(cannonShell, cannonBallSpawn.position, cannonBallSpawn.transform.rotation) as Rigidbody;
        _cannonShell.AddForce(_cannonShell.transform.forward * fireForce, ForceMode.Impulse);
    }

    private void DestroyTank() {
        Instantiate(tankBurst, this.transform.position, tankBurst.rotation);
        GameManager.gameIsOver = true;
        GameObject.Find("CameraRig").GetComponent<CameraControl>().gameOver = GameManager.gameIsOver;

        if (gameObject.name == "Tank1") {
            GameObject.Find("GameManager").GetComponent<GameManager>().AxisWin();
        } else if (gameObject.name == "Tank2") {
            GameObject.Find("GameManager").GetComponent<GameManager>().AlliesWin();
        }

        Destroy(this.gameObject);
    }
}
