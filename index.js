width = window.innerWidth;
height = window.innerHeight;

paper.view.viewSize = new Size(width, height);

var numbers = [];
var numbersSizes = [];

var infoText = new PointText(new Point(0, 10));
infoText.fillColor = "white";

function generateNumbers() {
    if (numbers.length > 0) {
        for (var i = 0; i < numbers.length; i++) numbers[i].remove();
    }
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
    var comparisons = 0;
    var min = 0;
    var copy = 0;
    for (var a = 0; a < numbers.length; a++) {
        min = a;
        for (var b = a; b < numbers.length; b++) {
            if (numbersSizes[b] < numbersSizes[min]) min = b;
            accesses += 2;
            comparisons++;

            infoText.content = "Selection Sort\n" + numbers.length.toString() + " numbers\nArray Accesses: " + accesses.toString() + "\n" + comparisons.toString() + " comparisons";
        }
        copy = numbers[a];
        numbers[a] = numbers[min];
        numbers[min] = copy;
    
        copy = numbersSizes[a];
        numbersSizes[a] = numbersSizes[min];
        numbersSizes[min] = copy;

        accesses += 4; // Ignore number items

        infoText.content = "Selection Sort\n" + numbers.length.toString() + " numbers\nArray Accesses: " + accesses.toString() + "\n" + comparisons.toString() + " comparisons";
    
        await plotNumbers();
        await sleep(7.5 * (n / 3));
    
    }
    await plotNumbers(true);
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

var quickAccesses = 0;
var quickComparisons = 0;

async function partition(low, high) {
    var pivot = numbersSizes[high];
    var i = low - 1;

    for (var j = low; j < high; j++) {
        if (numbersSizes[j] <= pivot) {
            i++;

            tempSizeJ = numbersSizes[j];
            tempJ = numbers[j];

            
            numbersSizes[j] = numbersSizes[i];
            numbersSizes[i] = tempSizeJ;

            numbers[j] = numbers[i];
            numbers[i] = tempJ;

            quickAccesses += 5;
            quickComparisons++;

            infoText.content = "Quick Sort\n" + numbers.length.toString() + " numbers\nArray Accesses: " + quickAccesses.toString() + "\n" + quickComparisons.toString() + " comparisons";

            plotNumbers();
            await sleep(n / 3);
        }
    }

    tempSizeI1 = numbersSizes[i + 1];
    tempI1 = numbers[i + 1];

    numbersSizes[i + 1] = numbersSizes[high];
    numbersSizes[high] = tempSizeI1;

    numbers[i + 1] = numbers[high];
    numbers[high] = tempI1;

    quickAccesses += 4;

    infoText.content = "Quick Sort\n" + numbers.length.toString() + " numbers\nArray Accesses: " + quickAccesses.toString() + "\n" + quickComparisons.toString() + " comparisons";

    plotNumbers();
    await sleep(n / 3);

    return i + 1;
}

async function quickSort(low = 0, high = null) {
    if (high == null) high = numbers.length - 1;

    if (low < high) {
        pivotIndex = await partition(low, high);
        await quickSort(low, pivotIndex - 1);
        await quickSort(pivotIndex + 1, high);
    }
}

async function stalinSort() {
	generateNumbers();
	let i;
	let numLen = numbers.length;
	let originalLen = numbers.length;
	let accesses = 0;
	let comparisons = 0;
	while (i < numLen) {
		if (numbers[i - 1] > numbers[i]) {
			numbers.pop(i);
			numLen--;
		}
		comparisons++;
		accesses += 2;
		i++;
		infoText.content = "Stalin Sort\n" + originalLen.toString() + " numbers\nArray Accesses: " + accesses.toString() + "\n" + comparisons.toString() + " comparisons";
		await plotNumbers();
	}

}

async function cycle() {
    while (true) {

        n = Math.round(Math.random() * 30) + 3;

        generateNumbers();

        infoText.content = "Quick Sort\n" + numbers.length.toString() + " numbers\n";

        quickAccesses = 0;
        quickComparisons = 0;

        await quickSort()
        await plotNumbers(true);
        await sleep(500);
        await plotNumbers(false);
        await selectionSort();
        await sleep(500);
        await plotNumbers(false);
        await stalinSort();
        await sleep(500);
        await plotNumbers(false);
    }
}

cycle();
