const iconTemplates = {
    star: {
        path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
        viewBox: '0 0 24 24'
    },
    heart: {
        path: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
        viewBox: '0 0 24 24'
    },
    circle: {
        path: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
        viewBox: '0 0 24 24'
    },
    square: {
        path: 'M3 3h18v18H3z',
        viewBox: '0 0 24 24'
    },
    triangle: {
        path: 'M12 2L2 20h20z',
        viewBox: '0 0 24 24'
    },
    arrow: {
        path: 'M5 12h14M12 5l7 7-7 7',
        viewBox: '0 0 24 24'
    },
    check: {
        path: 'M20 6L9 17l-5-5',
        viewBox: '0 0 24 24'
    },
    cross: {
        path: 'M18 6L6 18M6 6l12 12',
        viewBox: '0 0 24 24'
    },
    plus: {
        path: 'M12 5v14M5 12h14',
        viewBox: '0 0 24 24'
    },
    home: {
        path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        viewBox: '0 0 24 24'
    },
    mail: {
        path: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        viewBox: '0 0 24 24'
    },
    settings: {
        path: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z',
        viewBox: '0 0 24 24'
    },
    user: {
        path: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
        viewBox: '0 0 24 24'
    },
    search: {
        path: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
        viewBox: '0 0 24 24'
    },
    download: {
        path: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
        viewBox: '0 0 24 24'
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
    const copyBtn = document.getElementById('copyBtn');
    const actionButtons = document.getElementById('actionButtons');
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
    copyBtn.addEventListener('click', copySvg);
    
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
    let color = '#6366f1';
    
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
            (key === 'home' && lowerPrompt.includes('家')) ||
            (key === 'mail' && (lowerPrompt.includes('メール') || lowerPrompt.includes('mail'))) ||
            (key === 'settings' && (lowerPrompt.includes('設定') || lowerPrompt.includes('歯車'))) ||
            (key === 'user' && (lowerPrompt.includes('ユーザー') || lowerPrompt.includes('人'))) ||
            (key === 'search' && (lowerPrompt.includes('検索') || lowerPrompt.includes('サーチ'))) ||
            (key === 'download' && (lowerPrompt.includes('ダウンロード') || lowerPrompt.includes('download')))) {
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
    document.getElementById('actionButtons').style.display = 'flex';
}

function createSvg(template, size, color, strokeWidth) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', template.viewBox);
    
    const paths = template.path.split(' M').map((p, i) => i === 0 ? p : 'M' + p);
    
    paths.forEach(pathData => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', strokeWidth);
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(path);
    });
    
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

async function copySvg() {
    const svgElement = document.querySelector('#svgPreview svg');
    if (!svgElement) return;
    
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const copyBtn = document.getElementById('copyBtn');
    
    try {
        await navigator.clipboard.writeText(svgData);
        
        copyBtn.textContent = 'コピーしました！';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.textContent = 'SVGをコピー';
            copyBtn.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('コピーに失敗しました:', err);
        alert('クリップボードへのコピーに失敗しました');
    }
}