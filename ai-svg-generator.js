// テンプレートベースのアイコン
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
    }
};

let currentMode = 'template';
let currentSvg = null;

document.addEventListener('DOMContentLoaded', () => {
    // モード切り替え
    document.querySelectorAll('.mode-button').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mode-button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentMode = btn.dataset.mode;
            
            document.getElementById('aiModeSection').style.display = 
                currentMode === 'ai' ? 'block' : 'none';
        });
    });
    
    // APIキーの読み込み
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
        document.getElementById('apiKey').value = savedApiKey;
    }
    
    // APIキーの保存
    document.getElementById('apiKey').addEventListener('change', (e) => {
        localStorage.setItem('openai_api_key', e.target.value);
    });
    
    // イベントリスナー
    document.getElementById('generateBtn').addEventListener('click', generateIcon);
    document.getElementById('downloadBtn').addEventListener('click', downloadSvg);
    document.getElementById('copyBtn').addEventListener('click', copySvg);
    
    // スライダー
    document.getElementById('iconSize').addEventListener('input', (e) => {
        document.getElementById('sizeValue').textContent = e.target.value;
        if (currentSvg) regenerateSvg();
    });
    
    document.getElementById('strokeWidth').addEventListener('input', (e) => {
        document.getElementById('strokeValue').textContent = e.target.value;
        if (currentSvg) regenerateSvg();
    });
    
    document.getElementById('strokeColor').addEventListener('input', () => {
        if (currentSvg) regenerateSvg();
    });
});

async function generateIcon() {
    const prompt = document.getElementById('prompt').value.trim();
    if (!prompt) {
        alert('プロンプトを入力してください');
        return;
    }
    
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.disabled = true;
    generateBtn.textContent = '生成中...';
    
    try {
        let svgPath;
        
        if (currentMode === 'ai') {
            const apiKey = document.getElementById('apiKey').value;
            if (!apiKey) {
                alert('API Keyを入力してください');
                return;
            }
            
            svgPath = await generateAISvg(prompt, apiKey);
        } else {
            svgPath = generateTemplateSvg(prompt);
        }
        
        if (svgPath) {
            currentSvg = svgPath;
            displaySvg();
            document.getElementById('actionButtons').style.display = 'flex';
        }
    } catch (error) {
        console.error('エラー:', error);
        alert('生成に失敗しました: ' + error.message);
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = 'アイコンを生成';
    }
}

function generateTemplateSvg(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    
    // テンプレートマッチング
    for (const [key, template] of Object.entries(iconTemplates)) {
        if (lowerPrompt.includes(key) || 
            (key === 'star' && lowerPrompt.includes('星')) ||
            (key === 'heart' && lowerPrompt.includes('ハート')) ||
            (key === 'circle' && lowerPrompt.includes('丸'))) {
            return template;
        }
    }
    
    return iconTemplates.star; // デフォルト
}

async function generateAISvg(prompt, apiKey) {
    const systemPrompt = `You are an SVG path generator. Generate ONLY the d attribute content for an SVG path element.
Rules:
1. Use a 24x24 viewBox coordinate system
2. Generate outline/stroke style icons (no fills)
3. Keep paths simple and clean
4. Return ONLY the path data, no explanations
5. Use standard SVG path commands (M, L, C, Q, A, Z, etc.)`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Create an SVG path for: ${prompt}` }
            ],
            temperature: 0.7,
            max_tokens: 500
        })
    });
    
    if (!response.ok) {
        throw new Error('API request failed');
    }
    
    const data = await response.json();
    const pathData = data.choices[0].message.content.trim();
    
    return {
        path: pathData,
        viewBox: '0 0 24 24'
    };
}

function displaySvg() {
    const size = document.getElementById('iconSize').value;
    const strokeWidth = document.getElementById('strokeWidth').value;
    const color = document.getElementById('strokeColor').value;
    
    const svg = createSvg(currentSvg, size, color, strokeWidth);
    
    const preview = document.getElementById('svgPreview');
    preview.innerHTML = '';
    preview.appendChild(svg);
}

function regenerateSvg() {
    if (currentSvg) {
        displaySvg();
    }
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