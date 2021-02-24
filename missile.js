class Missile{
    constructor(source){
        this.startX = source.object3D.position.x;
        this.startZ = source.object3D.position.z;
        //this.angleTo(player);
        this.angle = source.object3D.rotation.y + Math.PI;
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
    move(speed,threshold = 10){
        if(this.obj == null){
            console.log("Illegal move attempted");
            return;
        }
        let dx = speed * Math.sin(this.angle);
        let dz = speed * Math.cos(this.angle);
        this.obj.object3D.position.x += dx;
        this.obj.object3D.position.z += dz; 
        let x = this.obj.object3D.position.x;
        let z = this.obj.object3D.position.z;
        let d = Math.sqrt( (this.startX - x)**2 + (this.startZ - z)**2 );
        //if(x < -field.width/2 || x > field.width/2 || z < -field.height/2 || z > field.height/2 || d > (field.width/2 + field.height/2)/4){
        if( d > threshold){
            if(this.obj) {
                this.obj.remove();
                this.obj = null;
            }
        }
        for(let key in players){
            let px = players[key].x;
            let pz = players[key].z;
            let d = Math.sqrt( (px - x)**2 + (pz - z)**2 );
            if( d < 1){
                console.log(players[key]);
            }
        }

    }
}