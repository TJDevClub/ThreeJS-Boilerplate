var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var cube
//declare global variables up here

init();
animate();

function init() {
    //instantiate threejs objects here
    container = document.createElement( 'div' );
    container.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.body.appendChild( container );
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );

    camera.position.add(new THREE.Vector3(-50, 150, 0))
    controls = new THREE.TrackballControls( camera );
    controls.addEventListener( 'change', render );
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0xffffff, 1, 10000 );

	var lights = [];
	var lightIntensity = 0.3
	var lightColor = 0xbbbbbb
	lights[0] = new THREE.PointLight( lightColor, lightIntensity, 0 );
	lights[1] = new THREE.PointLight( lightColor, lightIntensity, 0 );
	lights[2] = new THREE.PointLight( lightColor, lightIntensity, 0 );

	lights[0].position.set( 0, 200, 0 );
	lights[1].position.set( 100, 200, 100 );
	lights[2].position.set( -100, -200, -100 );

    for(var i = 0; i < lights.length; i++){
        scene.add(lights[i])
    }


    var cubeSize = 0.1
    var cubeDetail = 1
    var cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize, cubeDetail, cubeDetail, cubeDetail)
    var cubeMaterial = new THREE.MeshPhongMaterial({
        color: 0x2ecc71,
        emissive: 0x27ae60,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading
    })
    
    var start = -3
    var end = 3
    
    for(var x = start; x <= end; x++)
    for(var y = start; y <= end; y++)
    for(var z = start; z <= end; z++){
        var cube = new THREE.Mesh(cubeGeo, cubeMaterial)
        cube.position.x = x
        cube.position.y = y
        cube.position.z = z
        scene.add(cube)
    }
    
    



    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xffffff );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.sortObjects = false;
    container.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
}


function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls.handleResize();
}
function onDocumentMouseMove(event) {
    mouseX = ( event.clientX - windowHalfX ) * 10;
    mouseY = ( event.clientY - windowHalfY ) * 10;
}
function animate() {
    requestAnimationFrame( animate );
    render();
    controls.update();
}
function render() {
    //code which re-runs every frame update
    
    // cube.position.x = 10 * Math.sin(Date.now() / 100)
    // cube.position.y = 10 * Math.cos(Date.now() / 100)
    // cube.position.z = 10 * Math.sin(Date.now() / 100) * Math.cos(Date.now() / 100)
    
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
    // cube.geometry.verticesNeedUpdate = true
}