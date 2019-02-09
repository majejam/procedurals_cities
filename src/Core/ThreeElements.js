import * as THREE from 'three'

export default class Element{
    // Element(0xffffff, scene, 'Dodecahedron', 1, 1, 1, 1, 0, 0, 0)
    constructor(color, scene, type, radius, height, definition, size, posx, posy, posz){
        this.scene = scene 
        this.container = new THREE.Object3D()
        this.posx = posx
        this.posy = posy
        this.posz = posz
        this.size = size
        this.radius = radius
        this.height = height 
        this.definition = definition
        this.color = color 
        this.type = type 
        this.force = 0
        this.rotation_force = 0 
        this.increment = 4 
        this.setMesh()
        
        this.setScene()
    }
    setMesh()
    {
        if(this.type == 'Dodecahedron'){
            this.setDodecahedron()
        }
        else if(this.type == 'Cone'){
            this.setCone()
        }
        else if(this.type == 'Octahedron'){
            this.setOctahedron()
        }
        else if(this.type == 'Tetrahedron'){
            this.setTetrahedron()
        }
        else if(this.type == 'Cube'){
            this.setCube()
        }

    }
    setOctahedron()
    {
        this.element = {}
        this.element.geometry = new THREE.OctahedronBufferGeometry(this.radius, this.definition)
        this.element.material = new THREE.MeshStandardMaterial({
            color: this.color, 
            flatShading: true,
            metalness: 0.5,
            roughness: 1,
        })

        this.element.mesh = new THREE.Mesh(this.element.geometry, this.element.material)
        this.element.mesh.position.x = this.posx
        this.element.mesh.position.y = this.posy
        this.element.mesh.position.z = this.posz
        this.container.add(this.element.mesh)
    }
    setDodecahedron()
    {
        this.element = {}
        this.element.geometry = new THREE.DodecahedronBufferGeometry(this.radius, this.definition)
        this.element.material = new THREE.MeshStandardMaterial({
            color: this.color, 
            flatShading: true,
            metalness: 0.5,
            roughness: 1,
        })

        this.element.mesh = new THREE.Mesh(this.element.geometry, this.element.material)
        this.element.mesh.position.x = this.posx
        this.element.mesh.position.y = this.posy
        this.element.mesh.position.z = this.posz
        this.container.add(this.element.mesh)
    }
    setCone()
    {
        this.element = {}

        this.element.geometry = new THREE.ConeBufferGeometry(this.radius, this.height, this.definition)
        this.element.material = new THREE.MeshStandardMaterial({
            color: this.color, 
            flatShading: true,
            metalness: 0.5,
            roughness: 1,
        })

        this.element.mesh = new THREE.Mesh(this.element.geometry, this.element.material)
        this.element.mesh.position.x = this.posx
        this.element.mesh.position.y = this.posy
        this.element.mesh.position.z = this.posz
        this.container.add(this.element.mesh)
    }
    setCube()
    {
        this.element = {}

        this.element.geometry = new THREE.BoxBufferGeometry(this.size, this.size, this.size)
        this.element.material = new THREE.MeshStandardMaterial({
            color: this.color, 
            flatShading: true,
            metalness: 0.5,
            roughness: 1,
        })

        this.element.mesh = new THREE.Mesh(this.element.geometry, this.element.material)
        this.element.mesh.position.x = this.posx
        this.element.mesh.position.y = this.posy
        this.element.mesh.position.z = this.posz
        this.container.add(this.element.mesh)
    }
    setTetrahedron()
    {
        this.element = {}
        this.element.geometry = new THREE.TetrahedronBufferGeometry(this.radius, this.definition)
        this.element.material = new THREE.MeshStandardMaterial({
            color: this.color, 
            flatShading: true,
            metalness: 0.5,
            roughness: 1,
        })
        this.element.mesh = new THREE.Mesh(this.element.geometry, this.element.material)
        this.element.mesh.position.x = this.posx
        this.element.mesh.position.y = this.posy
        this.element.mesh.position.z = this.posz
        this.container.add(this.element.mesh)
    }

    upDownAnimation(force, increment)
    {
        this.force += force
        this.element.mesh.position.y = Math.sin(this.force)/increment
    }

    rotateAnimationX(force_rotation)
    {
        this.rotation_force = force_rotation
        this.element.mesh.rotation.x += this.rotation_force
    }
    rotateAnimationY(force_rotation)
    {
        this.rotation_force = force_rotation
        this.element.mesh.rotation.y += this.rotation_force
    }
    rotateAnimationZ(force_rotation)
    {
        this.rotation_force = force_rotation
        this.element.mesh.rotation.z += this.rotation_force
    }
    setAnimation(force_up,force_rot, animationUp, animationX, animationY, animationZ,increment){
        if(animationUp)
            this.upDownAnimation(force_up,increment)
        if(animationX)
            this.rotateAnimationX(force_rot)
        if(animationY)
            this.rotateAnimationY(force_rot)
        if(animationZ)
            this.rotateAnimationZ(force_rot)
    }

    setScene()
    {
        this.scene.add(this.container)
        console.log('set scene');
        
    }

    returnObj()
    {
        return this.container
    }
}