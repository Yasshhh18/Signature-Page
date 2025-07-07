const colorPicker = document.getElementById('colorPicker');
const canvaColor = document.getElementById('canvaColor');
const mycanva = document.getElementById('mycanva');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const retriveButton = document.getElementById('retriveButton');
const fontsize = document.getElementById('fontSize');
const ctx = mycanva.getContext('2d');

colorPicker.addEventListener('change',(e)=>{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})

let isDrawing = false;
let lastX = 0;
let lastY = 0;

mycanva.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

mycanva.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});

mycanva.addEventListener('mouseup', () => {
    isDrawing = false;
});

mycanva.addEventListener('mouseleave', () => {
    isDrawing = false;
});

canvaColor.addEventListener('change',(e)=>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,800,500)
})

fontsize.addEventListener('change',(e)=>{
    ctx.lineWidth = e.target.value
})

clearButton.addEventListener('click',(e)=>{
    ctx.clearRect(0,0,mycanva.width,mycanva.height)
})

saveButton.addEventListener('click',(e)=>{
    localStorage.setItem('canvasContents',mycanva.toDataURL());

    let link = document.createElement('a');

    link.download = 'my-canvas.png';

    link.href = mycanva.toDataURL();

    link.click();
})

retriveButton.addEventListener('click', (e) => {
    let savedCanvas = localStorage.getItem('canvasContents');

    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img,0,0)
    }
});
