const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

let isSorting = false;
let data = Array.from({ length: 20 }, () => Math.floor(Math.random() * 90) + 10);

drawArray(data);

document.getElementById('randomBtn').addEventListener('click', () => {
    data = Array.from({ length: 20 }, () => Math.floor(Math.random() * 90) + 10);
    document.getElementById('dataInput').value = data.join(', ');
    drawArray(data);
});

document.getElementById('sortBtn').addEventListener('click', async () => {
    if (isSorting) return;
    isSorting = true;
    document.getElementById('sortBtn').disabled = true;
    await selectionSort(data);
    isSorting = false;
    document.getElementById('sortBtn').disabled = false;
});

function drawArray(arr, sorted = false, highlight = {}) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / arr.length;
    const maxHeight = Math.max(...arr);

    arr.forEach((value, i) => {
        const barHeight = (value / maxHeight) * canvas.height;

        if (sorted) {
            ctx.fillStyle = "#4CAF50";
        } else if (highlight.compare && highlight.compare.includes(i)) {
            ctx.fillStyle = "red";
        } else if (highlight.swap && highlight.swap.includes(i)) {
            ctx.fillStyle = "green";
        } else {
            ctx.fillStyle = "#2196F3";
        }

        ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 1, barHeight);
    });
}

async function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < arr.length; j++) {
            drawArray(arr, false, { compare: [minIndex, j] });
            await new Promise(resolve => setTimeout(resolve, 50));

            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            drawArray(arr, false, { swap: [i, minIndex] });
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
    drawArray(arr, true);
}
