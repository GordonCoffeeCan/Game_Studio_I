using UnityEngine;
using System.Collections;

public class PlayerController : MonoBehaviour {

    private static PlayerController _instance;

    public static PlayerController Instance {
        get {
            return _instance;
        }
    }

    public Transform recycleGuy;
    public Transform trashGuy;
    public Transform fireFighter;

    public KeyCode toRecycleGuy;
    public KeyCode toTrashGuy;
    public KeyCode toFireFighter;
    public KeyCode leftKey;
    public KeyCode rightKey;

    public float speed = 1;

    private Rigidbody2D _rigidbody;

    private Animator recycleGuyAnim;
    private Animator trashGuyAnim;
    private Animator fireFighterAnim;

    int characterCount = 0;

    void Awake() {
        _instance = this;
    }

    // Use this for initialization
    void Start() {
        _rigidbody = this.transform.GetComponent<Rigidbody2D>();

        recycleGuyAnim = this.transform.Find("RecycleGuy").GetComponent<Animator>();
        trashGuyAnim = this.transform.Find("TrashGuy").GetComponent<Animator>();
        fireFighterAnim = this.transform.Find("FireFighter").GetComponent<Animator>();

        recycleGuy.gameObject.SetActive(true);
        trashGuy.gameObject.SetActive(false);
        fireFighter.gameObject.SetActive(false);
    }

    // Update is called once per frame
    void Update() {
        recycleGuyAnim.speed = 2;
        trashGuyAnim.speed = 2;
        fireFighterAnim.speed = 2;

#if UNITY_ANDROID
    AcceleratorInput();
    Tap2Switch()
#endif

#if UNITY_IOS
    AcceleratorInput();
    Tap2Switch()
#endif

#if UNITY_EDITOR
    StandaloneInput();
#endif

#if UNITY_WEBGL
    StandaloneInput();
#endif

#if UNITY_STANDALONE_WIN
    StandaloneInput();
#endif

#if UNITY_STANDALONE_OSX
    StandaloneInput();
#endif

        if (recycleGuy.gameObject.activeInHierarchy == true) {
            recycleGuyAnim.SetFloat("Speed", Mathf.Abs(_rigidbody.velocity.x));
        } else if (trashGuy.gameObject.activeInHierarchy == true) {
            trashGuyAnim.SetFloat("Speed", Mathf.Abs(_rigidbody.velocity.x));
        } else if (fireFighter.gameObject.activeInHierarchy == true) {
            fireFighterAnim.SetFloat("Speed", Mathf.Abs(_rigidbody.velocity.x));
        }
    }

    private void Tap2Switch() {
        if (Input.GetMouseButtonUp(0)) {
            characterCount++;
            if (characterCount > 2) {
                characterCount = 0;
            }
        }
    }

    private void AcceleratorInput() {
        
        float dirX = Input.acceleration.x;

        if (dirX < -0.1f) {
            _rigidbody.velocity = new Vector3(-speed, 0, 0);
            this.transform.localScale = new Vector3(-1, 1, 1);
            recycleGuyAnim.speed = speed / 2;
            fireFighterAnim.speed = speed / 2;
            fireFighterAnim.speed = speed / 2;
        }else if (dirX > 0.1f) {
            _rigidbody.velocity = new Vector3(speed, 0, 0);
            this.transform.localScale = new Vector3(1, 1, 1);
            recycleGuyAnim.speed = speed / 2;
            trashGuyAnim.speed = speed / 2;
            fireFighterAnim.speed = speed / 2;
        }

        if(characterCount == 0) {
            characterCount = 0;
            recycleGuy.gameObject.SetActive(true);
            trashGuy.gameObject.SetActive(false);
            fireFighter.gameObject.SetActive(false);
        } else if(characterCount == 1){
            characterCount = 1;
            recycleGuy.gameObject.SetActive(false);
            trashGuy.gameObject.SetActive(true);
            fireFighter.gameObject.SetActive(false);
        } else if (characterCount == 2){
            characterCount = 2;
            recycleGuy.gameObject.SetActive(false);
            trashGuy.gameObject.SetActive(false);
            fireFighter.gameObject.SetActive(true);
        }
    }

    private void StandaloneInput() {
        if (Input.GetKey(leftKey)) {
            _rigidbody.velocity = new Vector3(-speed, 0, 0);
            this.transform.localScale = new Vector3(-1, 1, 1);
            recycleGuyAnim.speed = speed / 2;
            fireFighterAnim.speed = speed / 2;
            fireFighterAnim.speed = speed / 2;
        }

        if (Input.GetKey(rightKey)) {
            _rigidbody.velocity = new Vector3(speed, 0, 0);
            this.transform.localScale = new Vector3(1, 1, 1);
            recycleGuyAnim.speed = speed / 2;
            trashGuyAnim.speed = speed / 2;
            fireFighterAnim.speed = speed / 2;
        }

        if (Input.GetKeyUp(toRecycleGuy)) {
            characterCount = 0;
            recycleGuy.gameObject.SetActive(true);
            trashGuy.gameObject.SetActive(false);
            fireFighter.gameObject.SetActive(false);
        } else if (Input.GetKeyUp(toTrashGuy)) {
            characterCount = 1;
            recycleGuy.gameObject.SetActive(false);
            trashGuy.gameObject.SetActive(true);
            fireFighter.gameObject.SetActive(false);
        } else if (Input.GetKeyUp(toFireFighter)) {
            characterCount = 2;
            recycleGuy.gameObject.SetActive(false);
            trashGuy.gameObject.SetActive(false);
            fireFighter.gameObject.SetActive(true);
        }
    }
}
