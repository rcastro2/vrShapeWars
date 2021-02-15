class Missile{
    constructor(player){
        this.startX = camera.object3D.position.x;
        this.startZ = camera.object3D.position.z;
        this.angleTo(player);
        this.obj = document.createElement("a-sphere");
        this.obj.setAttribute("position",{x:this.startX,y:1.6,z:this.startZ});
        this.obj.setAttribute("src",`./assets/plasma2.jpg`);
        this.obj.setAttribute("radius",0.25);
        scene.append(this.obj);
    }
    angleTo(that){
        let dx = that.x - this.startX;
        let dz = that.z - this.startZ;

        this.angle = Math.atan(dx/dz)
        if(dz < 0){
            this.angle += Math.PI
        }
    }
    move(speed){
        let dx = speed * Math.sin(this.angle);
        let dz = speed * Math.cos(this.angle);
        this.obj.object3D.position.x += dx;
        this.obj.object3D.position.z += dz; 
    }
}