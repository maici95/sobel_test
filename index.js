

const img = new Image;
img.src = 'wiki.png';


const Gx = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
];
const Gy = [
    [1, 2, 1],
    [0, 0, 0],
    [-1, -2, -1]
];

const image = [
    [0, 2, 15],
    [2, 15, 30],
    [2, 15, 30],
];

let result = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

console.log('Gx');
console.log(Gx[0]);
console.log(Gx[1]);
console.log(Gx[2]);

console.log('Gy');
console.log(Gy[0]);
console.log(Gy[1]);
console.log(Gy[2]);

console.log('result');
console.log(result[0]);
console.log(result[1]);
console.log(result[2]);


result = sobelImage(image);

console.log('result');
console.log(result[0]);
console.log(result[1]);
console.log(result[2]);
console.log(result[3]);





function sobelImage(image) {
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



const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

const SIZE = canvas.width;


context.drawImage(img, 0, 0, SIZE, SIZE);


const N = SIZE;

const test = Array(N).fill(Array(N));

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        test[i][j] = 0;

    }
}


const testData = context.getImageData(0, 0, SIZE, SIZE).data


const resultCanvas = document.querySelector('#resultCanvas');
const context2 = resultCanvas.getContext('2d');


if (1 === 2) {
    let index = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const r = testData[index * 4];
            const g = testData[index * 4 + 1];
            const b = testData[index * 4 + 2];
            index += 1;
            context2.fillStyle = `rgb(${r}, ${g}, ${b})`;
            context2.fillRect(j, i, j+1, i+1);
        }
    }
}


const img2 = new Image;
img2.src = 'valve.png';

context2.drawImage(img2, 0, 0, SIZE, SIZE);



const SIZE2 = SIZE;

const fData = context.getImageData(0, 0, SIZE2, SIZE2).data;
let iData = Array(SIZE2+1).fill(0).map(item => []);

let x = 0;
let y = 0;

for (let i = 0; i < fData.length; i++) {

    if (y < SIZE2-1) {
        y++;
    } else {
        x++;
        y = 0;
    }
    
    iData[x].push(
        Math.floor((fData[i] + fData[i + 1] + fData[i + 2]) / 3)
        //fData[i]
    );

    i += 3;

}


const finalCanvas = document.querySelector('#finalCanvas');
const context3 = finalCanvas.getContext('2d');


iData = sobelImage(iData);

context3.fillStyle = 'red';
context3.fillRect(0,0,SIZE,SIZE);

for (let i = 0; i < iData.length; i++) {
    for (let j = 0; j < iData[i].length; j++) {

        let c = iData[i][j];

        if (c > 0) {
            c = (c * 0.5);
            context3.fillStyle = `rgb(${c},${c},${c})`;
            context3.fillRect(j, i, j+1, i+1);
        }


    }
}









