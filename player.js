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

        let body = document.createElement("a-sphere");
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
            console.log()
        }
        
        this.move();
        this.obj.addEventListener("click",()=>{
            missile = new Missile(this)
        })
        this.obj.addEventListener("mouseenter",()=>{
            text.setAttribute("value",this.data.email)
        })
        this.obj.addEventListener("mouseleave",()=>{
            text.setAttribute("value","")
        })
        scene.append(this.obj)
    }
    move(){
        this.obj.object3D.position.x = this.x;
        this.obj.object3D.position.y = this.y;
        this.obj.object3D.position.z = this.z;
        this.obj.object3D.rotation.y = this.angle
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