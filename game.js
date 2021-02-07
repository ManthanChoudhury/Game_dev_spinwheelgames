// basic
// game object
//Game[config]
/*
1. w
2. h
3. canvas
4. levels or scence
scenes
> load assets
> create method to make object
> update stuff
*/
let prize_config = {
    count:10,
    prize_names : ["Target 1,000 points","OPTUS 250 points","ahm 500 points","Coles x3 points","adidas 250 points","flybuys travels x10 points","LiquorLand 250 points","Coles x3 points","firstCHOICEliquor 250 points","Ksmart 5,000 points"]
}

let config = {
    type : Phaser.CANVAS,
    width : 800,
    height :600,
    backgroundColor : 0xffcc00,
    
    
    scene : {
        preload : preload,
        create : create,
        update : update,
        
    }
    
};

let game = new Phaser.Game(config);

function preload(){
    console.log("Preload");
    //console.log(this);
    //to get bg image
    this.load.image('background','Assets/back.jpg');
    this.load.image('wheel','Assets/spin-wheel.png');
    this.load.image('pin','Assets/pin.png');
    this.load.image('stand','Assets/stand.png');
}

function create(){
    console.log("Create");
    //create bg image
    //issue
    //this.add.sprite(0,0,'background');
    //scaling
    let W = game.config.width;
    let H = game.config.height;
    let background= this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(0.20);
    
    // create stand
    let stand = this.add.sprite(W/2,H/2+250,'stand');
    stand.setScale(0.25);
    
    // create pin
    //postion op
    let pin = this.add.sprite(W/2,H/2-250,'pin');
    pin.setScale(0.25);
    pin.depth = 1;
    
    // create wheel
    this.wheel = this.add.sprite(0,0,'wheel');
    this.wheel.setPosition(W/2,H/2);
    this.wheel.setScale(0.80);
    
    //event listener for mouse click
    this.input.on("pointerdown",spinwheel,this);
    
    //text
    font_style = {
        font : "bold 30px Arial",
        align : "center",
        color : "red",
    }
    this.game_text = this.add.text(10,10,"Welcome to Spin & Win",font_style);
    
    
    
    
    //this.wheel.alpha = 0.5;
    //50%
    //to make wheel transparent
    
    //this.wheel.scaleX += 0.01;
    //this.wheel.scaleY += 0.01;
    // x and y for grow
    //this.wheel.alpha -= 0.01;
}

//Gameloop
function update(){
    console.log("check");
    //speed
    //this.wheel.angle += 1;

}

function spinwheel(){
    console.log("check");
this.game_text.setText("Under Process");
    
    let rounds = Phaser.Math.Between(2,7);
    let degrees = Phaser.Math.Between(0,9)*36;
    
    let total_angle = rounds*360 + degrees;
    console.log(total_angle);
    
    let idx = prize_config.count - Math.floor(degrees/(360/prize_config.count));
    
    tween = this.tweens.add({
    targets:this.wheel,
     angle : total_angle,
     ease : "Cubic.easeOut",
     duration: 6000,
        callbackScope:this,
     onComplete:function(){
         this.game_text.setText("You Won " + prize_config.prize_names[idx]);
     },
 });


}
