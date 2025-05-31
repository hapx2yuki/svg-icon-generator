// メインのJavaScript
const engine = new SvgEngine();
let currentMode = 'simple';
let currentColor = '#6366f1';
let currentSvg = null;

// 例のアイコンデータ
const examples = [
    { prompt: '星', label: '星' },
    { prompt: 'ハート', label: 'ハート' },
    { prompt: '歯車', label: '歯車' },
    { prompt: '矢印', label: '矢印' },
    { prompt: '音楽', label: '音楽' },
    { prompt: '花', label: '花' },
    { prompt: '稲妻', label: '稲妻' },
    { prompt: '波', label: '波' }
];

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    initializeExamples();
    initializeEventListeners();
    updateModeUI();
});

// 例のアイコンを初期化
function initializeExamples() {
    const grid = document.getElementById('exampleGrid');
    grid.innerHTML = '';
    
    examples.forEach(example => {
        const card = document.createElement('div');
        card.className = 'example-card';
        card.onclick = () => {
            document.getElementById('prompt').value = example.prompt;
            generateIcon();
        };
        
        // アイコンを生成
        const result = engine.generateFromPrompt(example.prompt, {
            strokeWidth: 2,
            color: currentColor,
            complexity: 5
        });
        
        const svg = createSvgElement(result, 60);
        card.appendChild(svg);
        
        const label = document.createElement('p');
        label.textContent = example.label;
        card.appendChild(label);
        
        grid.appendChild(card);
    });
}

// イベントリスナーの初期化
function initializeEventListeners() {
    // モード切り替え
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentMode = btn.dataset.mode;
            updateModeUI();
        });
    });
    
    // 生成ボタン
    document.getElementById('generateBtn').addEventListener('click', generateIcon);
    
    // Enterキーで生成
    document.getElementById('prompt').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generateIcon();
        }
    });
    
    // カラープリセット
    document.querySelectorAll('.color-preset').forEach(preset => {
        preset.addEventListener('click', () => {
            document.querySelectorAll('.color-preset').forEach(p => p.classList.remove('active'));
            preset.classList.add('active');
            currentColor = preset.dataset.color;
            document.getElementById('strokeColor').value = currentColor;
            if (currentSvg) regenerateIcon();
        });
    });
    
    // スライダー
    const sliders = [
        { id: 'iconSize', valueId: 'sizeValue', onChange: regenerateIcon },
        { id: 'strokeWidth', valueId: 'strokeValue', onChange: regenerateIcon },
        { id: 'complexity', valueId: 'complexityValue', onChange: regenerateIcon }
    ];
    
    sliders.forEach(({ id, valueId, onChange }) => {
        const slider = document.getElementById(id);
        const value = document.getElementById(valueId);
        if (slider && value) {
            slider.addEventListener('input', (e) => {
                value.textContent = e.target.value;
                if (currentSvg && onChange) onChange();
            });
        }
    });
    
    // カスタムカラー
    document.getElementById('strokeColor').addEventListener('input', (e) => {
        currentColor = e.target.value;
        document.querySelectorAll('.color-preset').forEach(p => p.classList.remove('active'));
        if (currentSvg) regenerateIcon();
    });
    
    // アクションボタン
    document.getElementById('copyBtn').addEventListener('click', copySvg);
    document.getElementById('downloadBtn').addEventListener('click', downloadSvg);
}

// モードUIの更新
function updateModeUI() {
    // ボタンのアクティブ状態
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === currentMode);
    });
    
    // アドバンスドオプションの表示
    const advancedOptions = document.getElementById('advancedOptions');
    const statsContainer = document.getElementById('statsContainer');
    
    switch (currentMode) {
        case 'simple':
            advancedOptions.style.display = 'none';
            statsContainer.style.display = 'none';
            break;
        case 'advanced':
            advancedOptions.style.display = 'block';
            statsContainer.style.display = 'grid';
            break;
        case 'creative':
            advancedOptions.style.display = 'block';
            statsContainer.style.display = 'grid';
            break;
    }
}

// アイコン生成
function generateIcon() {
    const prompt = document.getElementById('prompt').value.trim();
    if (!prompt) {
        alert('プロンプトを入力してください');
        return;
    }
    
    const strokeWidth = parseFloat(document.getElementById('strokeWidth').value);
    const complexity = parseInt(document.getElementById('complexity').value);
    
    // モードに応じて生成
    let options = {
        strokeWidth: strokeWidth,
        color: currentColor,
        complexity: complexity
    };
    
    if (currentMode === 'creative') {
        // クリエイティブモードでは複雑さを上げる
        options.complexity = Math.min(complexity * 2, 10);
    }
    
    currentSvg = engine.generateFromPrompt(prompt, options);
    displayIcon();
}

// アイコン再生成
function regenerateIcon() {
    if (!currentSvg) return;
    generateIcon();
}

// アイコン表示
function displayIcon() {
    if (!currentSvg) return;
    
    const preview = document.getElementById('svgPreview');
    const size = parseInt(document.getElementById('iconSize').value);
    
    const svg = createSvgElement(currentSvg, size);
    
    preview.innerHTML = '';
    preview.appendChild(svg);
    
    // アクションボタン表示
    document.getElementById('actionButtons').style.display = 'flex';
    
    // 統計情報更新
    updateStats();
}

// SVG要素作成
function createSvgElement(result, size) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', result.viewBox);
    
    result.paths.forEach(path => {
        const pathElement = document.createElementNS(svgNS, 'path');
        pathElement.setAttribute('d', path);
        pathElement.setAttribute('fill', 'none');
        pathElement.setAttribute('stroke', result.color);
        pathElement.setAttribute('stroke-width', result.strokeWidth);
        pathElement.setAttribute('stroke-linecap', 'round');
        pathElement.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(pathElement);
    });
    
    return svg;
}

// 統計情報更新
function updateStats() {
    if (!currentSvg) return;
    
    const pathCount = currentSvg.paths.length;
    const nodeCount = currentSvg.paths.reduce((sum, path) => {
        const matches = path.match(/[MLHVCSQTAZ]/gi);
        return sum + (matches ? matches.length : 0);
    }, 0);
    const size = document.getElementById('iconSize').value;
    
    document.getElementById('pathCount').textContent = pathCount;
    document.getElementById('nodeCount').textContent = nodeCount;
    document.getElementById('sizeInfo').textContent = `${size}x${size}`;
    
    if (currentMode !== 'simple') {
        document.getElementById('statsContainer').style.display = 'grid';
    }
}

// SVGコピー
async function copySvg() {
    const svg = document.querySelector('#svgPreview svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    
    try {
        await navigator.clipboard.writeText(svgData);
        
        const btn = document.getElementById('copyBtn');
        const originalText = btn.textContent;
        btn.textContent = 'コピーしました！';
        btn.style.background = 'var(--secondary)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    } catch (err) {
        alert('コピーに失敗しました');
    }
}

// SVGダウンロード
function downloadSvg() {
    const svg = document.querySelector('#svgPreview svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'icon.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}