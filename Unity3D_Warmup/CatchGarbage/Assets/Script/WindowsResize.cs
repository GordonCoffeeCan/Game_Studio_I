using UnityEngine;
using System.Collections;

public class WindowsResize : MonoBehaviour {
    private Transform background;
    private Transform farBuilding;
    private Transform nearBuilding;
    private Transform bush;
    private Transform ground;
    private Transform leftBuilding;
    private Transform rightBuilding;

    private SpriteRenderer bgSpriteRender;
    private SpriteRenderer groundSpriteRender;
    private SpriteRenderer leftBuildingSpriteRender;
    private SpriteRenderer rightBuildingSpriteRender;

    private BoxCollider2D groundCollider;

    // Use this for initialization
    void Start () {
        background = GameObject.Find("Background").transform;
        farBuilding = GameObject.Find("Far_Building").transform;
        nearBuilding = GameObject.Find("Near_Building").transform;
        bush = GameObject.Find("Bush").transform;
        ground = GameObject.Find("Ground").transform;
        leftBuilding = GameObject.Find("Left_Building").transform;
        rightBuilding = GameObject.Find("Right_Building").transform;

        bgSpriteRender = background.GetComponent<SpriteRenderer>();
        groundSpriteRender = ground.GetComponent<SpriteRenderer>();
        leftBuildingSpriteRender = leftBuilding.GetComponent<SpriteRenderer>();
        rightBuildingSpriteRender = rightBuilding.GetComponent<SpriteRenderer>();

        groundCollider = GameObject.Find("GroundCollider").GetComponent<BoxCollider2D>();

        Resize();
    }
	
	// Update is called once per frame
	void Update () {
	
	}

    void Resize() {
        Vector3 _position = Camera.main.ScreenToWorldPoint(new Vector2(Screen.width, Screen.height));

        float bgScaleX = _position.x * 2 / bgSpriteRender.bounds.size.x;
        float bgScaleY = _position.y * 2 / bgSpriteRender.bounds.size.y;

        float leftBuildingScale = _position.y * 2 / leftBuildingSpriteRender.bounds.size.y * 0.95f;
        float rightBuildingScale = _position.y * 2 / rightBuildingSpriteRender.bounds.size.y * 0.95f;

        background.localScale = new Vector3(bgScaleX, bgScaleY, 1);

        leftBuilding.localScale = new Vector3(leftBuildingScale, leftBuildingScale, 1);
        rightBuilding.localScale = new Vector3(rightBuildingScale, rightBuildingScale, 1);

        farBuilding.position = new Vector3(0, 0.5f, 0);
        nearBuilding.position = new Vector3(0, -0.9f, 0);
        bush.position = new Vector3(0, -2.4f, 0);

        ground.position = new Vector3(0, -_position.y + groundSpriteRender.bounds.size.y / 2, 0);
        leftBuilding.position = new Vector3(-_position.x + leftBuildingSpriteRender.bounds.size.x / 2, 0);
        rightBuilding.position = new Vector3(_position.x - rightBuildingSpriteRender.bounds.size.x / 2, 0);

        groundCollider.size = new Vector2(_position.x * 2, 0.62f);
        groundCollider.transform.position = new Vector3(0, -_position.y + groundCollider.size.y / 2, 0);
    }
}
