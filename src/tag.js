
function getNodesPerLevel(row) {
    return row <= 0 ? 1 : _getNodesPerLevel(document, row)
}
function _getNodesPerLevel(e, row) {
    if (row == 0)
        return "childNodes" in e ? nonEmptyNodes(e) : 0;
    else if (!("childNodes" in e))
        return 0;
    var total = 0
    for (let i = 0; i < e.childNodes.length; i++)
        total += _getNodesPerLevel(e.childNodes[i], row - 1)
    return total;
}
function nonEmptyNodes(e) {
    let total = 0
    for (let i = 0; i < e.childNodes.length; i++) {
        if (e.childNodes[i].nodeType == Node.TEXT_NODE && e.childNodes[i].data.trim() == "") continue;
        else total++;
    }
    return total;
}

let indexOnLevel = []
let level = 0
let rects = []
let recti = 0

let canvas = document.querySelector('#canvas')
let context = canvas.getContext("2d")

context.textAlign = "center"

const xs = 1500 / 2
const ys = -150
var width = canvas.width
var div = document.getElementsByTagName("div")
let path = new Path2D()
let path1 = new Path2D()
var oX
var oY
var hX
var hY

window.addEventListener("load", function () {
    var theCanvas = canvas

    if (theCanvas && theCanvas.getContext) {
        var context = theCanvas.getContext("2d");
        if (context) {

            //event
            function getXY(canvas, event) { //shape 
                const rect = canvas.getBoundingClientRect()
                const y = event.clientY - rect.top //mouse event
                const x = event.clientX - rect.left
                return { x: x, y: y }
            }

            document.addEventListener("click", function (e) {
                e.stopPropagation

                isClicked = true

                const XY = getXY(theCanvas, e)
                if (context.isPointInPath(path, XY.x, XY.y)) {
                    path = new Path2D();
                    oX = XY.x
                    oY = XY.y
                    console.log("dddddddddddddddddddd")
                    isClicked = false


                    context.clearRect(0, 0, canvas.width, canvas.height);

                    indexOnLevel = []
                    level = 0
                }
                node(document.children, xs, ys + 200, 0)

            }, false)

            document.addEventListener("mousemove", function (e) {
                e.stopPropagation
                const XY = getXY(theCanvas, e)
                path = new Path2D();

                hX = XY.x
                hY = XY.y
                oX = 0
                oY = 0
                context.clearRect(0, 0, canvas.width, canvas.height);
                indexOnLevel = []
                level = 0
                node(document.children, xs, ys + 200, 0)

            }, false)

        }
    }
})

var clicked = []
var isClicked = false

var node = (g, x, y, level) => {

    let num = getNodesPerLevel(level)
    let ch = width / num
    var yy = hY

    if (g.length == 0) return

    for (let i = 0; i < g.length; i++) {

        if ((g[i]._newX + 80 > hX && g[i]._newX - 20 < hX) &&
            (g[i]._newY + 100 > hY && g[i]._newY - 10 < hY)) {
            var str = g[i].outerHTML.split('\n')
            const findLongest = () => Math.max(...(str.map(el => el.length)));
            context.beginPath()
            context.font = "20px monospace";
            context.textAlign = "start"
            context.fillStyle = "rgba(0,0,0,0.6)"
            context.rect(hX, yy, context.measureText('-'.repeat(findLongest())).width, str.length * 20 + 20)
            context.fill()

            str.forEach(element => {
                context.fillStyle = "white"
                context.fillText(element + '\n', hX, yy += 20);
            });
            context.stroke()
            context.textAlign = "center"
        }


        if (g[i].nodeType == 1 || (g[i].nodeType == Node.TEXT_NODE && g[i].data.trim() != "")) {
            console.log("555555")
            if (indexOnLevel[level] === undefined) indexOnLevel[level] = 0;
            else indexOnLevel[level]++

            context.beginPath()
            context.moveTo((ch / 2 + (indexOnLevel[level] * (ch))), y - 50)
            context.lineTo(x, y - 150)
            context.stroke()

            g[i]._newX = (ch / 2 + (indexOnLevel[level] * (ch))) - 30
            g[i]._newY = y - 50

            if (g[i].nodeType == Node.TEXT_NODE) {
                path0 = new Path2D()

                context.beginPath()
                path0.rect((ch / 2 + (indexOnLevel[level] * (ch))) - 30, y - 50, 60, 40);
                context.font = "20px Arial";
                context.fillStyle = "red"

                context.fillText(g[i].nodeName.toLowerCase().replace("#", ""), (ch / 2 + (indexOnLevel[level] * ch)), y - 30);
                context.stroke(path0)

            } else {
                // Circle
                path1 = new Path2D()

                context.beginPath()
                path1.moveTo((ch / 2 + (indexOnLevel[level] * (ch))) + 50, y)
                path1.arc((ch / 2 + (indexOnLevel[level] * (ch))), y, 50, 0, Math.PI * 2)
                context.font = "20px Arial";
                context.fillStyle = "red"
                context.fillText(g[i].nodeName.toLowerCase().replace("#", ""), (ch / 2 + (indexOnLevel[level] * ch)), y);
                context.stroke(path1)

                if (isClicked && ((g[i]._newX + 80 > hX && g[i]._newX - 20 < hX) &&
                    (g[i]._newY + 100 > hY && g[i]._newY - 10 < hY))) {
                    var tagElement = prompt("Please enter your Element", "");
                    if (tagElement != "" && tagElement != null) {
                        var nodeTag = document.createElement(tagElement);
                        g[i].appendChild(nodeTag);
                    }
                    isClicked = false
                }

                // Rect
                context.beginPath()
                path.rect((ch / 2 + (indexOnLevel[level] * (ch))) - 30, y - 50, 20, 10)
                context.fillStyle = "red"
                context.fill(path)
                context.stroke(path)

                // Attr Rect

                context.beginPath()
                path.rect((ch / 2 + (indexOnLevel[level] * (ch))) - 30, y + 40, 20, 10)
                context.fillStyle = "blue"
                context.fill(path)
                context.stroke(path)
                g[i]._attrX = (ch / 2 + (indexOnLevel[level] * (ch))) - 30
                g[i]._attrY = y + 40
            }

            // Attr
            if ((g[i]._attrX + 20 > oX && g[i]._attrX - 20 < oX) &&
                (g[i]._attrY + 10 > oY && g[i]._attrY - 10 < oY)) {
                if (g[i]._attr == true)
                    g[i]._attr = false
                else
                    g[i]._attr = true
            }
            if (g[i]._attr == true) {
                if (g[i].nodeType != Node.TEXT_NODE && g[i].hasAttributes()) {
                    let msg = ""
                    for (let index = 0; index < g[i].attributes.length; index++) {
                        var attribut = g[i].attributes[index];
                        msg = attribut.name + " = " + attribut.value + "\n";
                        let yAttr = y + (-30 * index);
                        context.fillStyle = "rgba(0,0,0,0.6)"
                        context.rect((ch / 2 + (indexOnLevel[level] * (ch))) - msg.length * 15, yAttr, msg.length * 15, 20)
                        context.fill()
                        context.fillStyle = "white"
                        context.fillText(msg, (ch / 2 + (indexOnLevel[level] * (ch))) - 100, yAttr + 16, 400);
                        context.stroke()
                    }
                }
            }// End Attr

            if ((g[i]._newX + 20 > oX && g[i]._newX - 20 < oX) &&
                (g[i]._newY + 10 > oY && g[i]._newY - 10 < oY)) {
                if (g[i]._show == false)
                    g[i]._show = true
                else
                    g[i]._show = false
            }
            if (g[i]._show == true || g[i]._show == undefined)
                node(g[i].childNodes, (ch / 2 + (indexOnLevel[level] * (ch))), y + 200, level + 1)
        }//end if not empty text


    }// End loop
}
node(document.children, xs, ys + 200, 0)

btn.onclick = function () {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.href = canvas.toDataURL("image/png");
    a.download = "canvas-image.png";
    a.click();
    document.body.removeChild(a);
}