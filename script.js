let database,players = {},you ,camera ,rig, scene, text, data, field = {};
let $ = (el) => document.getElementById(el);

window.onload = function(){
  scene = $("scene");
  camera = $("camera");
  camera.addEventListener("click",()=>{
    if(!you.fired){
      you.missile = new Missile(camera);
      you.fired = true;
      console.log("Fired");
    }
  })
  rig = $("rig");
  text = $("text")
  login();
}

function loop(){
  updatePlayers();
  database.child(you.uid).update({
    "x": camera.object3D.position.x  ,
    "y": camera.object3D.position.y ,
    "z": camera.object3D.position.z ,
    "angle": camera.object3D.rotation.y,
    "fired": you.fired
  })
  if(you.fired){
    if(you.missile.obj == null){
      you.fired = false;
      console.log("Rearmed");
    }else{
      you.missile.move(0.25);
    }
  } 
  setTimeout(loop,20);
}

function updatePlayers(){
  for(let key in players){
    players[key].update();
  }
}

function login(){
  let config = {
    apiKey: "AIzaSyCusNHg-0wgMnJUg6VyX1njnWGhXlRmHl4",
    authDomain: "castrodevstore.firebaseapp.com",
    databaseURL: "https://castrodevstore.firebaseio.com",
    projectId: "castrodevstore",
    storageBucket: "castrodevstore.appspot.com",
    messagingSenderId: "1030092117071"
  };
  firebase.initializeApp(config);
  let auth = firebase.auth();
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          console.log("Authenticated successfully");
          database = firebase.database().ref('vrShapeWars'); 
          you = {uid:user.uid,x:0,y:0,z:0,angle:0,fired:false,missile:null};
          database.once("value",function(snapshot) {
            if(!snapshot.child(user.uid).exists()){
              database.child(user.uid).set({
                "name":user.displayName,
                "email":user.email,
                "photo":user.photoURL,
                "x": 0,
                "y": 1.6,
                "z": 0,
                "angle":0,
                "fired":false,
                "health":1.5
              })
            }else{
              user = snapshot.val()[user.uid];
              you.angle = user.angle;
              camera.object3D.position.x = user.x;
              camera.object3D.position.y = user.y;
              camera.object3D.position.z = user.z;                              
            }
            loop();  
            
          })
          
          database.on('value',function(snapshot){
            data = snapshot.val();

            for(let key in data){
              if(players[key]){
                //If player exists update their position
                players[key].x = data[key].x
                players[key].y = data[key].y
                players[key].z = data[key].z
                players[key].angle = data[key].angle;
                players[key].fired = data[key].fired;
              }else{
                //If player isn't you add them to players
                if(key != you.uid){
                  players[key] = new Player(data[key]);
                }
              }
            }
          })
      }
      else{
          var provider = new firebase.auth.GoogleAuthProvider();
          auth.signInWithRedirect(provider);
      } 
  })
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}




