let canvas = document.querySelector('#canvas')
let context = canvas.getContext("2d")
var img = document.getElementById("scream");

// context.fillStyle='purple'
// context.fillRect(300,20,100,100)
// context.fillStyle='green'
// context.fillRect(200,20,100,100)

// context.beginPath()

// context.moveTo(300,150)

// context.lineTo(150,300)
// context.lineTo(350,300)
// context.lineTo(170,150)
// context.lineTo(250,370)
// context.lineTo(300,150)
// context.fillStyle = "red"
// context.fill()
// context.stroke()
// img.onload = ()=>{
//     context.drawImage(img,10,10,80,80)

// }

// context.font = "60px Arial";
// context.fillText("Mario Co.", 200, 70);
// context.beginPath()

// context.moveTo(0,100)

// context.lineTo(0,100)
// context.lineTo(600,100)
// context.stroke()
// for (let index = 0; index < 30; index++) {
// context.beginPath()

// let radius = 50
// let min = 50 // 0 + radius
// let max = 550 // 600 - radius
// let x = Math.random()* (max - min) + min // (Math.random()* (max - min) + min) to generate num between min & max 
// let y = Math.random()* (max - min) + min

// context.arc(x, y, radius, 0, Math.PI *2)

// context.stroke() 
// }
let div = document.querySelector('#div')
div.onclick = ()=>{
    console.log("99999999999999999999999")

}
div = () =>{
console.log("99999999999999999999999")
context.beginPath()
var x = context.arc(300, 300, 50, 0, Math.PI *2)
context.stroke() 
}



