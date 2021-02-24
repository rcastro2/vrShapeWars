class Player{
    constructor(data){
        this.photo = data.photo;
        this.name = data.name;
        this.data = data;
        this.x = data.x;
        this.y = data.y;
        this.z = data.z;
        this.angle = data.angle;
        this.obj = document.createElement("a-entity");
        this.fired = false;
        this.missile = null;

        let body = document.createElement("a-sphere");
        body.setAttribute("wireframe",true);
        body.setAttribute("color","yellow");
        this.obj.append(body);
        for(let i = 0; i < 3; i++){
            let point = document.createElement("a-cone")
            point.setAttribute("color",(i % 2 == 0)?"red":"yellow");
            point.setAttribute("rotation",{x:-90,y:0,z:0});
            point.setAttribute("position",{x:0,y:0,z:-(1 + i * 0.25)});
            let s = 1 - i * 0.25
            point.setAttribute("scale",{x:s,y:s,z:s});
            this.obj.append(point);
        }
        let lifebar = document.createElement("a-cylinder");
        lifebar.setAttribute("height",1.5);
        lifebar.setAttribute("radius",0.15);
        lifebar.setAttribute("color","green");
        lifebar.object3D.position.y = 2;
        this.obj.append(lifebar);
        
        this.update();
        this.obj.addEventListener("mouseenter",()=>{
            text.setAttribute("value",this.data.email)
        })
        this.obj.addEventListener("mouseleave",()=>{
            text.setAttribute("value","")
        })
        scene.append(this.obj)
    }
    update(){
        this.obj.object3D.position.x = this.x;
        this.obj.object3D.position.y = this.y;
        this.obj.object3D.position.z = this.z;
        this.obj.object3D.rotation.y = this.angle
        if(this.fired){
            if(this.missile == null || this.missile.obj == null){
                this.missile = new Missile(this.obj);
            }else{
                this.missile.move(0.25);
            }
        } 
    }
}
//Player Model
/*
    <a-entity position="0 2 0">
        <a-sphere color="yellow"></a-sphere>
        <a-cone position="0 0 -1" rotation="-90 0 0" color="red"></a-cone>
        <a-cone position="0 0 -1.25" rotation="-90 0 0" color="yellow" scale="0.75 0.75 0.75"></a-cone>
        <a-cone position="0 0 -1.5" rotation="-90 0 0" color="red" scale="0.5 0.5 0.5"></a-cone>
    </a-entity>
*/