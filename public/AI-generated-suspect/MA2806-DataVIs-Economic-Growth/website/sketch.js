function draw() {

    background(245, 0, 76);
  
    fill(255,55,155);
  
    circle(width/2, height/2, r);
  
    fill(55, 155, 255);
    circle(width/2, height/2, r/2);
  }
  

  
  let icon;
  let dataset;
  let unit = 200; //how much each unit will represent in relation to the dataset
  let margin = 50; //whitespace around edges of the chart
  let iconSize = 50;
  

  function preload(){
    icon = loadImage('person.png');
    dataset = loadTable('uk-unemployment-00-19.csv', 'header');
  }
  
  function setup() {
    createCanvas(1050, 950); //width in pixels, height in pixels
    noStroke();
  }

  function draw() {
    //draw a white background
    background(255, 254, 252);
    

    fill(255, 0, 0);
    textFont("avenir");
    textAlign(RIGHT);
    textSize(40);
    let header = "Unemployment\n in Great Britain\n 2007-2019";
    text(header, width-margin, margin);
  
    image(icon, width-margin-iconSize, 220, iconSize, iconSize);
    textSize(15);
    fill(0);
    text("200,000 people", width-margin, 270);
    

    textSize(15);
    text("Source: ONS", width-35, height-5);
    

    for(let i=0; i<dataset.getRowCount(); i++){
      let unemployment = round(dataset.getNum(i, 1)/unit);
      
      //set fill colour to red again
      fill(255, 0, 0);
      

      textSize(15);
      textAlign(CENTER);
      let samplePeriod = dataset.getString(i, 0);
      text(samplePeriod, margin, margin+i*(iconSize+20));
      

      imageMode(CENTER);
      for(let j=0; j<unemployment; j++){
        fill(0);
        let y = margin+i*(iconSize+20);
        let x = margin+iconSize+j*(iconSize/2+10);
        image(icon, x, y, iconSize, iconSize);
      }
      
    }
    
  }
  
