ball = {
    x:300,
    y:200,
    diameter:20,
    radius:(20/2),
    velocityX:5,
    velocityY:5
}
  
circle_central = {
  diameter:150,
  x:300,
  y:200,
  radius:80/2,
}
line_central = {
  x:300,
  y:0,
  width:2,
  height:400
}


  let rectWidth = 10
  let rectHeight = 50
  let rectY = 170
  
  player = {
    x:10,
    y:rectY,
    width:rectWidth,
    height:rectHeight,
    score:{
      x:150,y:30,actual:0
    },
  }
  
  oponent = {
    x:580,
    y:rectY,
    width:rectWidth,
    height:rectHeight,
    score:{
      x:450,y:30,actual:0
    },
  }
  
  
  balizaPlayer = {
    x:0,
    y:0,
    width:5,
    height:400
  }
  balizaOponent = {
    x:595,
    y:0,
    width:5,
    height:400
  }
  
  
  function setup() {
    createCanvas(600, 400);
  }
  
  
  function draw() {
    background(76,153,0);
    createBall();

    createMovimentOfBall();
    createColisionOfBall();
    createMovimentOfPlayerRacket();

    createColisionOfBallInRacket(player);
    createColisionOfBallInRacket(oponent);
    
    createMovimentOfOponentRacket();
    
    createPlayer(player)
    createPlayer(oponent)
    
    createTextScore(player.score);
    createTextScore(oponent.score);

    createBaliza(balizaPlayer);
    createBaliza(balizaOponent)
    
    createGoal();

    circle(circle_central.x,circle_central.y,circle_central.diameter)
    rect(line_central.x,line_central.y,line_central.width,line_central.height)
  }
  
  
  function createMovimentOfBall(){
    ball.x += ball.velocityX
    ball.y += ball.velocityY
  }
  
  function createMovimentOfPlayerRacket(){
    if(keyIsDown(UP_ARROW)){
      player.y -= 10
    }
    
    if(keyIsDown(DOWN_ARROW)){
      player.y += 10
    } 
  }
  
  
  function createMovimentOfOponentRacket(){
    oponent.y = ball.y - 40
  }
  
  function createColisionOfBall(){
    
    if(ball.x + ball.radius > width || ball.x - ball.radius < 0){
      ball.velocityX *= -1
    }
    
    if(ball.y + ball.radius > height || ball.y - ball.radius < 0){
       ball.velocityY *= -1
    }
    
  }
  
  function createColisionOfBallInRacket(racket){
    collide = p5.prototype.collideRectCircle(racket.x,racket.y,racket.width,racket.height,ball.x,ball.y,ball.radius);
    if (collide){
      ball.velocityX *= -1
    }
  }
  
  
  function createBall(){
    fill(color(255,150,0))
    circle(ball.x,ball.y,ball.diameter)
  }
  
  function createPlayer(player){
    rect(player.x,player.y,player.width,player.height)
  }
  
  function createTextScore(score){
    fill(color(255,140,0))
    rect(score.x - 10,score.y-15,40,20)
    fill(255)
    textAlign(CENTER)
    textSize(16)
    text(score.actual,score.x,score.y)
  }
  
  function createGoal(){
    if(p5.prototype.collideRectCircle(balizaPlayer.x,balizaPlayer.y,balizaPlayer.width,balizaPlayer.height,ball.x,ball.y,ball.radius)){
      oponent.score.actual +=1
      startMovimentBall()
    }
    
    if(p5.prototype.collideRectCircle(balizaOponent.x,balizaOponent.y,balizaOponent.width,balizaOponent.height,ball.x,ball.y,ball.radius)){
      player.score.actual +=1
      startMovimentBall();
    }
  }
  
  function createBaliza(baliza){
    rect(baliza.x,baliza.y,baliza.width,baliza.height)
  }
  
  function startMovimentBall(){
      ball.x = 300
      ball.y = 200
      velocityOfBall = Math.floor(Math.random() * 6) + 2
      ball.velocityY = velocityOfBall
      ball.velocityX = velocityOfBall
  }
  