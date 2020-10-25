




const inImg = document.querySelector('#inImg');
const inContext = inImg.getContext('2d');

const outImg = document.querySelector('#outImg');
const outContext = outImg.getContext('2d');

const WIDTH = 500;
const HEIGHT = 500;

inImg.width = WIDTH;
inImg.height = HEIGHT;

outImg.width = WIDTH;
outImg.height = HEIGHT;


function handleInImage(event) {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const img = new Image;
        img.src = e.target.result;
    }

    reader.onloadend = function(e) {
        const img = new Image;
        img.src = e.target.result;
        inContext.drawImage(img, 0, 0, WIDTH, HEIGHT);
    }

    reader.readAsDataURL(file);
    
}


function sobelImage() {
    let imageData = inContext.getImageData(0, 0, WIDTH, HEIGHT).data;

    let imageMatrix = Array(HEIGHT+1).fill(0).map(item => []);
    let x = 0;
    let y = 0;
    let value = 0;

    for (let i = 0; i < imageData.length; i++) {
        if (y < HEIGHT-1) {
            y++;
        } else {
            x++;
            y = 0;
        }
        
        value = imageData[i];
        imageMatrix[x].push(value);
        i += 3;
    }

    imageData = sobelOperator(imageMatrix);
    drawImageMatrix(imageData);
}


function dragOverImage(event) {
    event.preventDefault();

}


function drawImageMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
    
            let c = matrix[i][j];
    
            if (c > 0) {
                c = (c * 0.5);
                outContext.fillStyle = `rgb(${c},${c},${c})`;
                outContext.fillRect(j, i, j+1, i+1);
            }
        }
    }
}


function sobelOperator(image) {
    const result = Array(image.length).fill(0).map(item => []);

    for (let i = 0; i < image.length; i++) {
        for (let j = 0; j < image[i].length; j++) {
            const points = [];
            const points2 = [];

            const test = [
                [-1,-1, 1],
                [-1, 0, 2],
                [-1, 1, 1],
                [1, -1, -1],
                [1,  0, -2],
                [1,  1, -1]
            ]

            for (let t of test) {
                if (i + t[0] in image && j + t[1] in image[i])
                    points.push(image[i + t[0]][j + t[1]] * t[2]);
            }

            const test2 = [
                [-1,-1, 1],
                [0, -1, 2],
                [1, -1, 1],
                [-1, 1, -1],
                [0,  1, -2],
                [1,  1, -1]
            ]

            for (let t of test2) {
                if (i + t[0] in image && j + t[1] in image[i])
                    points2.push(image[i + t[0]][j + t[1]] * t[2]);
            }


            let value = 0;
            let val2 = 0;

            for (let i of points) {
                if (!isNaN(i)) {
                    value += i;
                } else {
                }
            }
            for (let i of points2) {
                if (!isNaN(i)) {
                    val2 += i;
                } else {
                }
            }


            value = Math.abs(value) + Math.abs(val2);



            result[i].push(value);
        }
    }



    return result;
}