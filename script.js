const iconTemplates = {
    star: {
        path: 'M12 2L14.39 8.36L21 9.27L16.5 13.74L17.61 20.34L12 17L6.39 20.34L7.5 13.74L3 9.27L9.61 8.36L12 2Z',
        viewBox: '0 0 24 24',
        fill: true
    },
    heart: {
        path: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
        viewBox: '0 0 24 24',
        fill: true
    },
    circle: {
        path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
        viewBox: '0 0 24 24',
        fill: false
    },
    square: {
        path: 'M3 3h18v18H3z',
        viewBox: '0 0 24 24',
        fill: false
    },
    triangle: {
        path: 'M12 2L2 20h20z',
        viewBox: '0 0 24 24',
        fill: false
    },
    arrow: {
        path: 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z',
        viewBox: '0 0 24 24',
        fill: false
    },
    check: {
        path: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
        viewBox: '0 0 24 24',
        fill: false
    },
    cross: {
        path: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
        viewBox: '0 0 24 24',
        fill: false
    },
    plus: {
        path: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
        viewBox: '0 0 24 24',
        fill: false
    },
    home: {
        path: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
        viewBox: '0 0 24 24',
        fill: true
    }
};

const colorMap = {
    '赤': '#ff0000',
    '青': '#0000ff',
    '緑': '#00ff00',
    '黄': '#ffff00',
    '紫': '#800080',
    '黒': '#000000',
    '白': '#ffffff',
    'オレンジ': '#ffa500',
    'ピンク': '#ffc0cb',
    'グレー': '#808080',
    '灰': '#808080'
};

let currentSvg = null;

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const iconSize = document.getElementById('iconSize');
    const sizeValue = document.getElementById('sizeValue');
    const strokeWidth = document.getElementById('strokeWidth');
    const strokeValue = document.getElementById('strokeValue');
    
    iconSize.addEventListener('input', (e) => {
        sizeValue.textContent = e.target.value;
        if (currentSvg) {
            regenerateSvg();
        }
    });
    
    strokeWidth.addEventListener('input', (e) => {
        strokeValue.textContent = e.target.value;
        if (currentSvg) {
            regenerateSvg();
        }
    });
    
    generateBtn.addEventListener('click', generateIcon);
    downloadBtn.addEventListener('click', downloadSvg);
    
    document.getElementById('prompt').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generateIcon();
        }
    });
});

function parsePrompt(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    let iconType = 'star';
    let color = '#3498db';
    
    for (const [key, template] of Object.entries(iconTemplates)) {
        if (lowerPrompt.includes(key) || 
            (key === 'star' && lowerPrompt.includes('星')) ||
            (key === 'heart' && lowerPrompt.includes('ハート')) ||
            (key === 'circle' && lowerPrompt.includes('丸') || lowerPrompt.includes('円')) ||
            (key === 'square' && lowerPrompt.includes('四角') || lowerPrompt.includes('正方形')) ||
            (key === 'triangle' && lowerPrompt.includes('三角')) ||
            (key === 'arrow' && lowerPrompt.includes('矢印')) ||
            (key === 'check' && lowerPrompt.includes('チェック')) ||
            (key === 'cross' && (lowerPrompt.includes('バツ') || lowerPrompt.includes('×'))) ||
            (key === 'plus' && (lowerPrompt.includes('プラス') || lowerPrompt.includes('＋'))) ||
            (key === 'home' && lowerPrompt.includes('家'))) {
            iconType = key;
            break;
        }
    }
    
    for (const [colorName, colorCode] of Object.entries(colorMap)) {
        if (prompt.includes(colorName)) {
            color = colorCode;
            break;
        }
    }
    
    return { iconType, color };
}

function generateIcon() {
    const prompt = document.getElementById('prompt').value.trim();
    if (!prompt) {
        alert('プロンプトを入力してください');
        return;
    }
    
    const { iconType, color } = parsePrompt(prompt);
    const size = document.getElementById('iconSize').value;
    const strokeWidthValue = document.getElementById('strokeWidth').value;
    
    const template = iconTemplates[iconType];
    
    const svg = createSvg(template, size, color, strokeWidthValue);
    displaySvg(svg);
    
    currentSvg = { template, color };
    document.getElementById('downloadBtn').style.display = 'inline-block';
}

function createSvg(template, size, color, strokeWidth) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', template.viewBox);
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', template.path);
    
    if (template.fill) {
        path.setAttribute('fill', color);
    } else {
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', strokeWidth);
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
    }
    
    svg.appendChild(path);
    return svg;
}

function displaySvg(svg) {
    const preview = document.getElementById('svgPreview');
    preview.innerHTML = '';
    preview.appendChild(svg);
}

function regenerateSvg() {
    if (!currentSvg) return;
    
    const size = document.getElementById('iconSize').value;
    const strokeWidthValue = document.getElementById('strokeWidth').value;
    
    const svg = createSvg(currentSvg.template, size, currentSvg.color, strokeWidthValue);
    displaySvg(svg);
}

function downloadSvg() {
    const svgElement = document.querySelector('#svgPreview svg');
    if (!svgElement) return;
    
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'icon.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
}