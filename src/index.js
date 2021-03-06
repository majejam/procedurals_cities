import './css/style.styl'

import './css/reset.styl'

import * as THREE from 'three'

import * as OBJECT from './Core/ThreeElements.js'

import * as HELLO from './Core/Separator.js'

import * as DOM from './Core/data.js'

import CameraControls from 'camera-controls';

import LazyLoad from "vanilla-lazyload";

import Swiper from 'swiper'

import { throttle, debounce } from 'throttle-debounce';

CameraControls.install( { THREE: THREE } );


let raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var touch = new THREE.Vector2();


function onMouseMove( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}


function onTouchMove( event ) {

	touch.x = ( event.touches[0].clientX / window.innerWidth ) * 2 - 1;
	touch.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;

}

prod(true)

const parent__container = document.querySelector('.content-container')
let dom = new DOM.Reader(parent__container)


var mySwiper = new Swiper('.swiper-container', {
    speed: 400,
    spaceBetween: 100,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
});


var watchScroll = new Swiper('.swiper-scroll', {
    speed: 400,
    spaceBetween: 100,
    longSwipesRatio: 0.1,
    on: {
        slideNextTransitionStart: function () {
          /* do something */
          console.log('hello');
          if(menu_show) {
            changeNum(watchScroll.activeIndex, false)
          }
          
        },
        slidePrevTransitionStart: function () {
            /* do something */
            console.log('hello');
            if(menu_show) {
              changeNum(watchScroll.activeIndex, false)
            }
            
          },
      }
});




document.addEventListener("DOMContentLoaded", function() {
    var lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy" 
    });    
  });

const ctn_home = document.querySelector('.ctn-home')
const inner_text = document.querySelector('.txt-slider-ctn')
const contentManagerMotion = document.querySelectorAll('.content-manager-motion')
const contentManager3D = document.querySelectorAll('.content-manager-3d')
const contentManagerDev = document.querySelectorAll('.content-manager-dev')
const contentManagerDesign = document.querySelectorAll('.content-manager-design')
const numerotation = document.querySelectorAll('.nb-num')
const close_modal_btn = document.querySelectorAll('.cross-ctn')
const return_home = document.querySelectorAll('.return-home')
const modalsbtn = document.querySelectorAll('.video-modal')
const modalsctn = document.querySelectorAll('.modal-container')
const respo = document.querySelector('.responsive-msg')
const scrollEl = document.querySelector('.scroll_container')
const numerotation_bar = document.querySelectorAll('.num_bar')
const responsive = document.querySelector('.right-click')
const respo_btn = document.querySelector('.responsive-btn')
const btn_ctn_numero = document.querySelector('.btn-ctn')
numerotation[0].style.color = '#000000'

const arrowSliderLeft = document.querySelector('.slider-arrow-left')
const arrowSliderRight = document.querySelector('.slider-arrow-right')
let selectedscene = firstscene
let contentSelected = contentManagerMotion

let intro_show = true

let menu_show = false

let scene_show = false

let modal_show = false

let change_color = false

let text_html = document.querySelector('.launch-text')
let container_html = document.querySelector('.separator')
let container_btn = document.querySelector('.launch_btn')

let seperator = new HELLO.Seperator(text_html,container_html)


function prod(bool) {
    if(bool) {
        console.log = function() {}

        console.warn = function() {}
        
        console.timeEnd = function() {}
        
        console.time = function() {}
    }
}

container_btn.addEventListener('mouseenter', () => {
    change_color = true
    seperator.changeColor();
})

container_btn.addEventListener('mouseleave', () => {
    seperator.resetColor();
    change_color = false
})

setInterval(() => {
    if(change_color) {
        seperator.changeColor();
    } 
}, 250);

/**
 * Slider arrow
 */
arrowSliderLeft.addEventListener('click', () => {
    if(menu_show) {
        watchScroll.slidePrev()
    }
})

arrowSliderRight.addEventListener('click', () => {
    if(menu_show) {
        watchScroll.slideNext()
    }
})

/**
 * Return home
 */

for (let i = 0; i < return_home.length; i++) {
    return_home[i].addEventListener('click', (_event) =>
    {
        returnFonction()

    })
 }
 function returnFonction(bool = false){

    setBoolEnvironnement(false, true, false, false)
    if(sizes.width > 600) {
        cameraControls.setLookAt((watchScroll.progress*16), 0, 6, 8, 0, -115, true )
    }
    else {
        cameraControls.setLookAt((watchScroll.progress*16) + ((watchScroll.progress - 0.5) * 3), 0, 6, 8, 0, -115, true )
    }

    responsive.style.display = "none"
   
    
    clearEverythingSingle(contentSelected[indexElementMoving])

    if(!bool) {
        setTimeout(() => {
            parent__container.style.display = 'none'
            showMenu()
        }, 1000);
    }
 }
/**
 * Modals 
 */



 for (let i = 0; i < modalsbtn.length; i++) {
    modalsbtn[i].addEventListener('click', (_event) =>
    {   
        setBoolEnvironnement(false, false, false, true)
        modalsctn[i].style.display = 'flex'
        setTimeout(() => {
            modalsctn[i].style.opacity = 1
        }, 50);
    })
    modalsbtn[i].addEventListener('touchstart', (_event) =>
    {
        setBoolEnvironnement(false, false, false, true)
    })
 }

 for (let i = 0; i < close_modal_btn.length; i++) {
    modalsctn[i].addEventListener('click', (_event) =>
    {
        setBoolEnvironnement(false, false, true, false)
        modalsctn[i].style.opacity = 0
        setTimeout(() => {
            modalsctn[i].style.display = 'none'
            
        }, 550);
    })
    modalsctn[i].addEventListener('touchend', (_event) =>
    {
        setBoolEnvironnement(false, false, true, false)
    })
 }

function closeModals(){
    setBoolEnvironnement(false, false, true, false)
    for (let i = 0; i < modalsctn.length; i++) {
        modalsctn[i].style.opacity = 0
        setTimeout(() => {
            modalsctn[i].style.display = 'none'
        }, 550);
     }
}


/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) =>
{
    cursor.x = ( event.clientX / window.innerWidth ) * 2 - 1
    cursor.y = -( event.clientX / window.innerWidth ) * 2 - 1
    
})


/**
 * Btn home
 */
let x = 0
let y = 0


for (let i = 0; i < numerotation.length; i++) {
    numerotation[i].addEventListener('click', (_event) =>
    {
        //changeNum(i, true, i)
        watchScroll.slideTo(i)
    })
 }


function transitionHome(index, orientation){
    if(orientation == 'right'){
        numerotation_bar[index].style.transformOrigin = 'right'
        numerotation_bar[index].style.transform = 'scaleX(1)'
        setTimeout(() => {
            numerotation_bar[index].style.transformOrigin = 'left'
            numerotation_bar[index].style.transform = 'scaleX(0)'
        }, 500)
    }
    if(orientation == 'left'){
        numerotation_bar[index].style.transformOrigin = 'left'
        numerotation_bar[index].style.transform = 'scaleX(1)'
        setTimeout(() => {
            numerotation_bar[index].style.transformOrigin = 'right'
            numerotation_bar[index].style.transform = 'scaleX(0)'
        }, 500)
    }

}
function changeNum(index, bool = true, i = 0){
            
        if(index == -10){
            x += 10
            y += 400
            
        }
        else if(index == 10){
            x -= 10
            y -= 400
        }
        else{
            x = index * 10
            y = 400 * index
        }
        if(x == -10){
            x = 30
            y = 400 * 3
        }
        else if(x == 50){
            x = 0
            y = 0
        }
        if(x == 0){
            resetColor(numerotation, '#aaaaaa')
            numerotation[0].style.color = '#000000'
            if (index == 10){
                transitionHome(0, 'right')
            } 
        }
        if(x == 10){
            resetColor(numerotation, '#aaaaaa')
            numerotation[1].style.color = '#000000'
            if(index == -10){
                transitionHome(0, 'left')
            }
            else if (index == 10){
                transitionHome(1, 'right')
            } 
        }
        if(x == 20){
            resetColor(numerotation, '#aaaaaa')
            numerotation[2].style.color = '#000000'
            if(index == -10){
                transitionHome(1, 'left')
            }
            else if (index == 10){
                transitionHome(2, 'right')
            } 
        }
        if(x == 30){
            resetColor(numerotation, '#aaaaaa')
            numerotation[3].style.color = '#000000'
            
            if(index == -10){
                transitionHome(2, 'left')
            }
            else if (index == 10){
                transitionHome(3, 'right')
            } 
        }
        if(x == 40){
            resetColor(numerotation, '#aaaaaa')
            numerotation[4].style.color = '#000000'
            if(index == -10){
                transitionHome(3, 'left')
            }
        }

        //returnFonction(true)

        inner_text.style.transform = `translateX(${-y}px)`
}
let screen = true


function resetColor(el, color){
    for (let index = 0; index < el.length; index++) {
        el[index].style.color = color
    }
}

/**
 * Scene
 */
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xffffff )

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

/**
 * Resize
 */
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update
    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Light 
 */
const ambientLight = new THREE.DirectionalLight(0xffffff, 1.2)
ambientLight.position.x = 0
ambientLight.position.y = 1
ambientLight.position.z = 1
scene.add(ambientLight)

var light = new THREE.AmbientLight( 0xffffff, 0.7 ); // soft white light
scene.add( light );

/**
 * Object
 */


/**
 * Menu object
 */
let cubeObj = new OBJECT.Element(0x2A9D8F, scene, 'clap', 1, 1, 1, 1, 0, 0, 2, true, 0.8, -0.4, false, false)
let coneObj = new OBJECT.Element(0xFFD166, scene, 'Monkey', 0.5, 1.5, 320, 0, 4, 0, 2, true, 1, 0, false, false)
let dodeObj = new OBJECT.Element(0xE76F51, scene, 'brackets', 1, 1, 1, 1, 8, 0, 2, true, 1, 0, false, false)
let octaObj = new OBJECT.Element(0x118AB2, scene, 'screen', 0.5, 1, 0, 1, 12, 0, 2, true, 1, 0, false, false)
let resumeObj = new OBJECT.Element(0xE9C46A, scene, 'Envelop', 0.5, 1, 0, 1, 16, 0, 2, true, 0.6, 0.4, false, false)


/**
 * Scene
 */
let sceneColor = new Array(0xEF476F,0xFFD166,0x06D6A0,0x118AB2,0x073B4C,0x264653,0x2A9D8F,0xE9C46A,0xF4A261,0xE76F51)
let firstscene = new OBJECT.Scene(scene, 0, 40, 25, contentManagerMotion, 'Cube', 1, 1, 1, 1, 0x2A9D8F)
let secondscene = new OBJECT.Scene(scene, 10, 60, 25, contentManager3D, 'Cone', 1, 1, 1, 1, 0xFFD166)
let thirdscene = new OBJECT.Scene(scene, 20, 30, 25, contentManagerDev, 'Dodecahedron', 1, 1, 1, 1, 0xE76F51)
let fourthscene = new OBJECT.Scene(scene, 30, 80, 25, contentManagerDesign, 'Octahedron', 1, 1, 1, 1, 0x118AB2)
let random = new OBJECT.RandomElement(scene, 0, 0, -50, 1000, 1, 1, 1, 1, sceneColor)




/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(85, sizes.width / sizes.height)
camera.position.z = 0
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.shadowMap.enabled = true
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * camera controls 
 */
const clock = new THREE.Clock();
const cameraControls = new CameraControls(camera, renderer.domElement, false);

cameraControls.dampingFactor = 0.05

/**
 * intro 
 */

const intro_container = document.querySelector('.intro__container')
let timeout_x = 0
let interval = setInterval(() => {
    timeout_x = timeout_x - 0.01
    cameraControls.rotateTo(timeout_x, 0, true)
}, 200);

const returnAll = document.querySelector('.logo_sml')
returnAll.addEventListener('click', () => {
    returnFonction()
})

let zoomBool = false

document.addEventListener('mousedown', () => {
    if(menu_show) {
        zoomBool = true
    }
})


document.addEventListener('mouseup', () => {
    if(menu_show) {
        zoomBool = false
    }
})

introduction()

selectedscene = firstscene

function introduction(bool) {
    hideMenu()
    cameraControls.setLookAt(0, 0, 0, 0, 0, 0, false)
    cameraControls.dolly( 200, false )

    const launch = document.querySelector('.launch_btn')

    launch.addEventListener('click', () => {
        animationStart(interval, intro_container)
    })
}

function animationStart(interval, intro_container) {

    let timeout_y = 0
    let interval_y 

    document.querySelector('.credit').style.opacity = "0"
    document.querySelector('.credit').style.visibility = "hidden"

    setTimeout(() => {
        //returnFonction()
        clearInterval(interval);
        cameraControls.setTarget(0, 0, -100, true)
        cameraControls.dolly( 200, true )
        intro_container.style.transform = "translate(-50%, -50%) scale(0)"
        intro_container.style.opacity = "0"
        setTimeout(() => {    
            intro_container.style.display = "none"
        }, 600);

        interval_y = setInterval(() => {
            timeout_y = timeout_y - 0.04
            cameraControls.rotate(timeout_y, 0, true)  
        }, 100);
    }, 0);


    setTimeout(() => {
        returnFonction()
        clearInterval(interval_y);
        setBoolEnvironnement(false, true, false, false)
    }, 2000);

    setTimeout(() => {
        document.querySelector('.logo_sml').style.opacity = "1"
    }, 4000);
}

/**
 * Hide one element of scene
 */
function clearEverythingSingle(el){
    el.style.opacity = 0
    el.style.transform = `rotate3d(0,1,0,3deg) translateZ(${500*moving}px)`
    respo.style.display = 'none'
    scrollEl.style.display = 'none'
        setTimeout(() => {
            el.style.display = 'none'
        }, 250);
}

/**
 * Show one element of scene
 */
function showEl(el){
    el[indexElementMoving].style.display = 'flex'
    el[indexElementMoving].style.transform = `rotate3d(0,1,0,3deg) translateZ(0px)`
    respo.style.display = 'block'
    scrollEl.style.display = 'flex'
    updateSwiper()

    setTimeout(() => {
        el[indexElementMoving].style.opacity = 1
    }, 1000);
}

/**
 * Hide Main Navigation Menu
 */
function hideMenu() {
    const arrows = document.querySelectorAll('.slider-arrow')

    arrows.forEach(element => {
        element.style.opacity = '0'

        setTimeout(() => {
            element.style.display = 'none'
        }, 1050); 
    });

    ctn_home.style.opacity = '0'
    respo_btn.style.opacity = '0'
    btn_ctn_numero.style.opacity = '0'
    setTimeout(() => {
        ctn_home.style.display = 'none'
        respo_btn.style.display = 'none'
        btn_ctn_numero.style.display = 'none'
    }, 1050); 
}

function showMenu() {
    const arrows = document.querySelectorAll('.slider-arrow')

    arrows.forEach(element => {
        element.style.display = 'block'
        setTimeout(() => {
            element.style.opacity = '1'
        }, 550); 
    });

    ctn_home.style.display = 'flex'
    btn_ctn_numero.style.display = 'flex'
    if(sizes.width < 480) {
        respo_btn.style.display = 'flex'
    }
    setTimeout(() => {
        ctn_home.style.opacity = '1'
        btn_ctn_numero.style.opacity = '1'
        if(sizes.width < 480) {
            respo_btn.style.opacity = '1'
        }
    }, 550); 
}
/**
 * On click menu go to first element
 */
function seeMenu(){
    setBoolEnvironnement(false, false, true, false)
    indexElementMoving = 0

    parent__container.style.display = 'block'

    if(x == 0){
        selectedscene = firstscene
        contentSelected = contentManagerMotion

        hideMenu()

        setTimeout(() => {
            moveBetweenElements(0)
        }, 1000);
    }
    else if(x == 10){
        selectedscene = secondscene
        contentSelected = contentManager3D

        hideMenu()

        setTimeout(() => {
            moveBetweenElements(0)
        }, 1000);
    }
    else if(x == 20){
        selectedscene = thirdscene
        contentSelected = contentManagerDev

        hideMenu()

        setTimeout(() => {
            moveBetweenElements(0)
        }, 1000);
    }
    else if(x == 30){
        selectedscene = fourthscene
        contentSelected = contentManagerDesign

        hideMenu()

        setTimeout(() => {
            moveBetweenElements(0)
        }, 1000);
    }
    else{
        ctn_home.style.color = 'red'
        setTimeout(() => {
            ctn_home.style.color = 'black'
        }, 700);

        setBoolEnvironnement(false, true, false, true)
    }
}

/**
 * Scroll handlers
 */
let movingScroll = true
window.addEventListener( 'wheel', debounce(300, true, onMouseWheel), false );
function onMouseWheel( ) {
    if(scene_show)
            moveCamera(0,selectedscene)
            
};

respo_btn.addEventListener('click', () => {
    if(menu_show) {
        seeMenu()
    }
})
/**
 * Key Handlers
 */
window.addEventListener('keydown', function(event) {
    const key = event.key;
    if (scene_show) {
        moveCamera(key,selectedscene)
    }
    if(key === "Escape" && scene_show) {
        returnFonction()
    }
    else if(key === "Escape" && modal_show){
        closeModals()
    }   
    else if(key === "ArrowLeft" && menu_show){
        watchScroll.slidePrev()
        
    }
    else if (key === "ArrowRight" && menu_show){
        watchScroll.slideNext()
    }
    else if (key === "Enter" && menu_show){
        if (x == 40) {
            openInNewTab()
        }
        else {
            seeMenu()
        }
    }
    else if (key === "Enter" && intro_show){
        animationStart(interval, intro_container)
    }
});


/**
 * Responsive on touch 
 */
responsive.addEventListener('touchstart', () =>
{     
    if(scene_show)
        moveCamera('ArrowUp',selectedscene)
})


/**
 * Evironnement Handlers
 */
function setBoolEnvironnement(intro, menu, scene, modal) {

    intro_show = intro
    menu_show = menu
    scene_show = scene
    modal_show = modal
 
}

function evironnement(refresh) {
 setInterval(() => {
     
     if (intro_show) {
        console.log("Your current evironnement is : INTRODUCTION");
     } 

     if (menu_show) {
        console.log("Your current evironnement is : MENU");
     }

     if (scene_show) {
        console.log("Your current evironnement is : SCENE");
     }

     if(modal_show) {
        console.log("Your current evironnement is : MODAL");
     }
     
 }, refresh);   
}

/**
 * DEBUG
 */
evironnement(1000)



/**
 * Move between elements in scene
 */
let moving = 1
let indexElementMoving = 0
function moveCamera(key = 0, scene){
    
    console.log(event.deltaY);
    closeModals() 
    if(key != 39 || key != 37){
        if((((event.deltaY) < -0.1) || key === 'ArrowUp') && movingScroll){
            clearEverythingSingle(contentSelected[indexElementMoving])
            moving = 1
            indexElementMoving += 1
            if(indexElementMoving > selectedscene.arrayElement.length-1){
                indexElementMoving = 0
            }

            moveBetweenElements(150)

        } 
        if((((event.deltaY) > 0.1) || key === 'ArrowDown') && movingScroll){
            clearEverythingSingle(contentSelected[indexElementMoving])
            moving = -1
            indexElementMoving -= 1
            if(indexElementMoving < 0){
                indexElementMoving = selectedscene.arrayElement.length - 1
            }
            
            moveBetweenElements(150)
        } 
    }
}

function moveBetweenElements(timeout) {
    let cameraPos = cameraControls.getPosition()
    let distance = cameraPos.distanceTo(selectedscene.arrayElement[indexElementMoving].element.mesh.position)
    cameraControls.setTarget(selectedscene.arrayElement[indexElementMoving].posx,selectedscene.arrayElement[indexElementMoving].posy,selectedscene.arrayElement[indexElementMoving].posz,true)
    cameraControls.dolly(-distance + 4, true)
    responsive.style.display = "block"
    movingScroll = true
    setTimeout(() => {
        movingScroll = true
        showEl(contentSelected)
    }, timeout);
    setTimeout(() => {
        cameraControls.truck(-4, 0, true)
    }, 500);

}


/**
 * Loop
 */

const loop = () =>
{
    const delta = clock.getDelta();
    const hasControlsUpdated = cameraControls.update( delta );
    window.requestAnimationFrame(loop)

    animationObj()

    objHovered()

    if(!menu_show) {
        zoomBool = false
    }    

    if(x == 0) {
        cubeObj.onDocumentMouseMove(mouse, 20)
    }
    else if(x == 10) {
        coneObj.onDocumentMouseMove(mouse, 20)
    }
    else if(x == 20) {
        dodeObj.onDocumentMouseMove(mouse, 20)
    }
    else if(x == 30) {
        octaObj.onDocumentMouseMove(mouse, 20)
    }
    else if(x == 40) {
        resumeObj.onDocumentMouseMove(mouse, 20)
    }

    if(menu_show && !zoomBool) {
        console.log(watchScroll.progress);
        if(sizes.width > 600) {
            cameraControls.setLookAt((watchScroll.progress*16 + ((watchScroll.progress - 0.5) * 0.5)), 0, 6, 8, 0, -115, true )
        }
        else {
            cameraControls.setLookAt((watchScroll.progress*16  + ((watchScroll.progress - 0.5) * 0.8)), 0, 8, 8, 0, -115, true )
        }
    }

    if(menu_show && zoomBool) {
        console.log(watchScroll.progress);
        if(sizes.width > 600) {
            cameraControls.setLookAt((watchScroll.progress*16 + ((watchScroll.progress - 0.5) * 0.5)), 0, 5.5, 8, 0, -115, true )
        }
        else {
            cameraControls.setLookAt((watchScroll.progress*16  + ((watchScroll.progress - 0.5) * 0.8)), 0, 7.5, 8, 0, -115, true )
        }
    }
 
    renderer.render(scene, camera)

}
loop()
window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'touchstart', onTouchMove, false );

window.addEventListener( 'mousedown', () => {
    if(x == 0) {
        cubeObj.isClicked(cursor, camera, raycaster, seeMenu)
    }
    else if(x == 10) {
        coneObj.isClicked(cursor, camera, raycaster, seeMenu)
    }
    else if(x == 20) {
        dodeObj.isClicked(cursor, camera, raycaster, seeMenu)
    }
    else if(x == 30) {
        octaObj.isClicked(cursor, camera, raycaster, seeMenu)
    }
    else if(x == 40) {
        resumeObj.isClicked(cursor, camera, raycaster, openInNewTab)
    }
    console.log('hello');
    
});


function openInNewTab() {
    var win = window.open('https://www.grossyoan.fr/resume/resume.pdf', '_blank');
    win.focus();
  }

window.addEventListener( 'touchend', () => {

    if(x == 0) {
        cubeObj.isClickedTouch(touch, camera, raycaster, seeMenu)
    }
    else if(x == 10) {
        coneObj.isClickedTouch(touch, camera, raycaster, seeMenu)
    }
    else if(x == 20) {
        dodeObj.isClickedTouch(touch, camera, raycaster, seeMenu)
    }
    else if(x == 30) {
        octaObj.isClickedTouch(touch, camera, raycaster, seeMenu)
    }
    else if(x == 40) {
        resumeObj.isClickedTouch(touch, camera, raycaster, openInNewTab)
    }
    console.log(touch);
});

function animationObj() {
    cubeObj.animationObj()
    coneObj.animationObj()
    dodeObj.animationObj()
    octaObj.animationObj()
    resumeObj.animationObj()

    firstscene.animationPlay(true, true, true, true)
    secondscene.animationPlay(true, true, true, false)
    thirdscene.animationPlay(true, true, true, true)
    fourthscene.animationPlay(true, true, true, true)

    firstscene.mouseMoveScene(mouse, 5)
    secondscene.mouseMoveScene(mouse, 5)
    thirdscene.mouseMoveScene(mouse, 5)
    fourthscene.mouseMoveScene(mouse, 5)

    random.animationPlay()
}

function objHovered() {
    if(x == 0) {
        cubeObj.isHoveredObj(mouse, camera, raycaster)
    }
    else if(x == 10) {
        coneObj.isHoveredObj(mouse, camera, raycaster)
    }
    else if(x == 20) {
        dodeObj.isHoveredObj(mouse, camera, raycaster)
    }
    else if(x == 30) {
        octaObj.isHoveredObj(mouse, camera, raycaster)
    }
    else if(x == 40) {
        resumeObj.isHoveredObj(mouse, camera, raycaster)
    }
}


/**
 * To do : 
 * Responsive touch X
 * Dom generation
 * Better scroll with trackpad X
 * Key control (up/down arrow) X
 * JSON implementation (lol flemme)
 * Lazy load X
 * IMPORTANT // PROTOTYPE 
 * Responsive ready X
 * Implement content X
 * Block other content not implemented (warning message) X
 * See for video optimization (youtube a/o something else) X
 * re order content 
 * add dev content 
 * see for scroll 
 * intro
 * 
 */


function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 500);

    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

function show(id) {
    document.getElementById(id).style.opacity = "0"

    setTimeout(() => {
        document.getElementById(id).style.display = 'none'
    }, 550);



}

onReady(function () {
    show('loading', false);
});






function updateSwiper() {
    if(Array.isArray(mySwiper)) {
        mySwiper.forEach(swiper => {
            swiper.update();
        });
    }
    else {
        mySwiper.update();
    }
}