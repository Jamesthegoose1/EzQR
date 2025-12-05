<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>EzQR with Center Image</title>
<style>
  body { font-family: sans-serif; text-align: center; margin-top: 50px; }
  input { font-size: 18px; padding: 8px; width: 300px; max-width: 90%; }
  button { font-size: 18px; padding: 8px 16px; margin-left: 8px; }
  canvas { margin-top: 20px; border: 1px solid #000; }
</style>
</head>
<body>

<h1>EzQR with Center Image</h1>
<input id="qrText" placeholder="Type text or URL">
<input id="imgURL" placeholder="Image URL (optional)" style="margin-top:10px;">
<br>
<button onclick="generate()">Generate QR</button>
<canvas id="qrCanvas" width="210" height="210"></canvas>

<script type="module">
import { generateQR } from 'https://cdn.jsdelivr.net/gh/Jamesthegoose1/EzQR/EzQR.js';

const canvas = document.getElementById('qrCanvas');
const ctx = canvas.getContext('2d');

function drawMatrix(matrix) {
    const size = matrix.length;
    const scale = canvas.width / size;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (matrix[r][c]) ctx.fillRect(c*scale, r*scale, scale, scale);
        }
    }
}

function drawQRWithImage(matrix, imageSrc, imgScale = 0.25) {
    drawMatrix(matrix);

    if (imageSrc) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const size = canvas.width * imgScale;
            const x = (canvas.width - size) / 2;
            const y = (canvas.height - size) / 2;
            ctx.drawImage(img, x, y, size, size);
        };
        img.src = imageSrc;
    }
}

window.generate = () => {
    const text = document.getElementById('qrText').value;
    const imgURL = document.getElementById('imgURL').value;
    if (!text) return alert('Enter some text!');
    const matrix = generateQR(text);
    drawQRWithImage(matrix, imgURL, 0.3);
};
</script>

</body>
</html>
