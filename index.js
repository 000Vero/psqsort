width = window.innerWidth;
height = window.innerHeight;

paper.view.viewSize = new Size(width, height);

var numbers = [];
var numbersSizes = [];

var infoText = new PointText(new Point(0, 10));
infoText.fillColor = "white";

n = Math.round(Math.random() * 30) + 3;

function generateNumbers() {
    numbers = [];
    numbersSizes = [];
    for (var i = 0; i < Math.round(width / n); i++) {
        var rectheight = Math.random() * height;
        numbersSizes = numbersSizes.concat(rectheight);
        var rect = new Path.Rectangle({
            point: [i * n, paper.view.viewSize.height - rectheight],
            size: [n - 2, rectheight]
        });
        rect.fillColor = "#ffffff";
        numbers = numbers.concat(rect);
    }
}

async function selectionSort() {
    generateNumbers();
    infoText.content = "Selection Sort\n" + numbers.length.toString() + " numbers\n";
    var accesses = 0;
    var min = 0;
    var copy = 0;
    for (var a = 0; a < numbers.length; a++) {
        min = a;
        for (var b = a; b < numbers.length; b++) {
            if (numbersSizes[b] < numbersSizes[min]) min = b;
            accesses += 2;

            infoText.content = "Selection Sort\n" + numbers.length.toString() + " numbers\nArray Accesses: " + accesses.toString();
        }
        copy = numbers[a];
        numbers[a] = numbers[min];
        numbers[min] = copy;
    
        copy = numbersSizes[a];
        numbersSizes[a] = numbersSizes[min];
        numbersSizes[min] = copy;

        accesses += 4; // Ignore number items

        infoText.content = "Selection Sort\n" + numbers.length.toString() + " numbers\nArray Accesses: " + accesses.toString();
    
        plotNumbers();
        await sleep(7.5 * (n / 3));
    
    }
    plotNumbers(true);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function plotNumbers(end = false) {
    for (var i = 0; i < numbers.length; i++) {
        numbers[i].position = new Point(i * n, numbers[i].position.y);
        if (end) {
            numbers[i].fillColor = "#00ff00";
            await sleep(0.5);
        }
    }
}


selectionSort(n);