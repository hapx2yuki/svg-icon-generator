// 創造的なSVGパス生成エンジン
class CreativeSvgGenerator {
    constructor() {
        this.viewBox = 24;
        this.center = this.viewBox / 2;
        this.style = 'organic';
        this.complexity = 5;
    }
    
    generateFromPrompt(prompt, style = 'organic', complexity = 5) {
        this.style = style;
        this.complexity = complexity;
        
        const keywords = this.extractKeywords(prompt);
        const paths = this.createPaths(keywords);
        
        return {
            paths: paths,
            viewBox: `0 0 ${this.viewBox} ${this.viewBox}`,
            debug: {
                keywords: keywords,
                style: style,
                complexity: complexity
            }
        };
    }
    
    extractKeywords(prompt) {
        const lower = prompt.toLowerCase();
        const keywords = {
            shapes: [],
            movements: [],
            emotions: [],
            elements: []
        };
        
        // 形状の検出
        const shapePatterns = {
            circle: ['円', '丸', 'circle', '輪', 'ring'],
            wave: ['波', 'wave', '波紋', 'ripple', '流れ'],
            spiral: ['螺旋', 'spiral', '渦', 'swirl', '巻'],
            star: ['星', 'star', '✨'],
            gear: ['歯車', 'gear', 'cog', '機械'],
            flame: ['炎', 'fire', 'flame', '火'],
            plant: ['植物', 'plant', '葉', 'leaf', '花', 'flower', '成長'],
            lightning: ['稲妻', 'lightning', '雷', 'thunder', '電気'],
            water: ['水', 'water', '雫', 'drop', '液体'],
            mountain: ['山', 'mountain', '峰', 'peak'],
            heart: ['心', 'heart', 'ハート', '愛'],
            arrow: ['矢', 'arrow', '矢印', '方向']
        };
        
        for (const [shape, patterns] of Object.entries(shapePatterns)) {
            if (patterns.some(p => lower.includes(p))) {
                keywords.shapes.push(shape);
            }
        }
        
        // 動きの検出
        const movementPatterns = {
            rotating: ['回転', 'rotate', '回る', 'spin'],
            flowing: ['流れ', 'flow', '流動'],
            dancing: ['踊', 'dance', 'ダンス'],
            jumping: ['跳', 'jump', 'hop', 'bounce'],
            growing: ['成長', 'grow', '育つ'],
            pulsing: ['脈動', 'pulse', '鼓動'],
            waving: ['揺れ', 'wave', 'sway']
        };
        
        for (const [movement, patterns] of Object.entries(movementPatterns)) {
            if (patterns.some(p => lower.includes(p))) {
                keywords.movements.push(movement);
            }
        }
        
        // デフォルト値
        if (keywords.shapes.length === 0) {
            keywords.shapes.push('circle');
        }
        
        return keywords;
    }
    
    createPaths(keywords) {
        const paths = [];
        
        // メインの形状を生成
        keywords.shapes.forEach((shape, index) => {
            const offset = index * 2;
            switch (shape) {
                case 'circle':
                    paths.push(this.createCirclePath(offset));
                    break;
                case 'wave':
                    paths.push(this.createWavePath(offset));
                    break;
                case 'spiral':
                    paths.push(this.createSpiralPath());
                    break;
                case 'star':
                    paths.push(this.createStarPath(offset));
                    break;
                case 'gear':
                    paths.push(this.createGearPath());
                    break;
                case 'flame':
                    paths.push(this.createFlamePath(offset));
                    break;
                case 'plant':
                    paths.push(this.createPlantPath());
                    break;
                case 'lightning':
                    paths.push(this.createLightningPath());
                    break;
                case 'water':
                    paths.push(this.createWaterPath());
                    break;
                case 'mountain':
                    paths.push(this.createMountainPath());
                    break;
                case 'heart':
                    paths.push(this.createHeartPath());
                    break;
                case 'arrow':
                    paths.push(this.createArrowPath());
                    break;
            }
        });
        
        // 動きの要素を追加
        keywords.movements.forEach(movement => {
            if (movement === 'flowing' && !keywords.shapes.includes('wave')) {
                paths.push(this.createFlowingLines());
            }
            if (movement === 'rotating') {
                paths.push(this.createRotationalElements());
            }
        });
        
        // スタイルに応じて調整
        return this.applyStyle(paths);
    }
    
    createCirclePath(offset = 0) {
        const r = 8 - offset;
        const cx = this.center;
        const cy = this.center;
        
        if (this.style === 'organic') {
            // オーガニックな円（少し歪んだ円）
            return `M ${cx + r} ${cy} 
                    C ${cx + r} ${cy + r * 0.55}, ${cx + r * 0.55} ${cy + r}, ${cx} ${cy + r}
                    C ${cx - r * 0.55} ${cy + r}, ${cx - r} ${cy + r * 0.55}, ${cx - r} ${cy}
                    C ${cx - r} ${cy - r * 0.55}, ${cx - r * 0.55} ${cy - r}, ${cx} ${cy - r}
                    C ${cx + r * 0.55} ${cy - r}, ${cx + r} ${cy - r * 0.55}, ${cx + r} ${cy}`;
        } else {
            return `M ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy}`;
        }
    }
    
    createWavePath(offset = 0) {
        const amplitude = 3;
        const frequency = 3;
        const y = this.center + offset;
        let path = `M 2 ${y}`;
        
        for (let x = 2; x <= 22; x += 0.5) {
            const waveY = y + Math.sin((x / 22) * Math.PI * 2 * frequency) * amplitude;
            path += ` L ${x} ${waveY}`;
        }
        
        return path;
    }
    
    createSpiralPath() {
        let path = '';
        const turns = 3;
        const points = this.complexity * 10;
        
        for (let i = 0; i <= points; i++) {
            const angle = (i / points) * Math.PI * 2 * turns;
            const radius = (i / points) * 8;
            const x = this.center + Math.cos(angle) * radius;
            const y = this.center + Math.sin(angle) * radius;
            
            if (i === 0) {
                path = `M ${x} ${y}`;
            } else {
                path += ` L ${x} ${y}`;
            }
        }
        
        return path;
    }
    
    createStarPath(offset = 0) {
        const outer = 8 - offset;
        const inner = outer * 0.4;
        const points = 5;
        let path = '';
        
        for (let i = 0; i < points * 2; i++) {
            const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
            const radius = i % 2 === 0 ? outer : inner;
            const x = this.center + Math.cos(angle) * radius;
            const y = this.center + Math.sin(angle) * radius;
            
            if (i === 0) {
                path = `M ${x} ${y}`;
            } else {
                path += ` L ${x} ${y}`;
            }
        }
        
        return path + ' Z';
    }
    
    createGearPath() {
        const teeth = 8;
        const outerRadius = 9;
        const innerRadius = 6;
        const toothHeight = 2;
        let path = '';
        
        for (let i = 0; i < teeth; i++) {
            const angle = (i / teeth) * Math.PI * 2;
            const nextAngle = ((i + 1) / teeth) * Math.PI * 2;
            const midAngle = angle + (nextAngle - angle) / 2;
            
            const x1 = this.center + Math.cos(angle) * innerRadius;
            const y1 = this.center + Math.sin(angle) * innerRadius;
            const x2 = this.center + Math.cos(angle) * outerRadius;
            const y2 = this.center + Math.sin(angle) * outerRadius;
            const x3 = this.center + Math.cos(midAngle) * outerRadius;
            const y3 = this.center + Math.sin(midAngle) * outerRadius;
            const x4 = this.center + Math.cos(nextAngle) * innerRadius;
            const y4 = this.center + Math.sin(nextAngle) * innerRadius;
            
            if (i === 0) {
                path = `M ${x1} ${y1}`;
            }
            path += ` L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4}`;
        }
        
        return path + ' Z';
    }
    
    createFlamePath(offset = 0) {
        const baseY = 20;
        const tipY = 4 + offset;
        
        return `M ${this.center} ${tipY} 
                C ${this.center - 3} ${tipY + 4}, ${this.center - 4} ${baseY - 4}, ${this.center - 2} ${baseY}
                L ${this.center + 2} ${baseY}
                C ${this.center + 4} ${baseY - 4}, ${this.center + 3} ${tipY + 4}, ${this.center} ${tipY}`;
    }
    
    createPlantPath() {
        const stem = `M ${this.center} 20 L ${this.center} 12`;
        const leaf1 = `M ${this.center} 16 C ${this.center - 4} 16, ${this.center - 4} 12, ${this.center} 12`;
        const leaf2 = `M ${this.center} 14 C ${this.center + 4} 14, ${this.center + 4} 10, ${this.center} 10`;
        const flower = `M ${this.center} 12 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0`;
        
        return stem + ' ' + leaf1 + ' ' + leaf2 + ' ' + flower;
    }
    
    createLightningPath() {
        return `M 13 2 L 8 10 L 11 10 L 9 18 L 16 8 L 13 8 Z`;
    }
    
    createWaterPath() {
        const drop = `M ${this.center} 4 C ${this.center - 4} 8, ${this.center - 4} 12, ${this.center} 16 
                      C ${this.center + 4} 12, ${this.center + 4} 8, ${this.center} 4`;
        const ripple1 = `M ${this.center - 6} 18 Q ${this.center} 16 ${this.center + 6} 18`;
        const ripple2 = `M ${this.center - 8} 20 Q ${this.center} 18 ${this.center + 8} 20`;
        
        return drop + ' ' + ripple1 + ' ' + ripple2;
    }
    
    createMountainPath() {
        return `M 2 20 L 8 8 L 12 12 L 16 6 L 22 20 Z`;
    }
    
    createHeartPath() {
        return `M ${this.center} 18 
                C ${this.center - 6} 12, ${this.center - 6} 6, ${this.center} 8
                C ${this.center + 6} 6, ${this.center + 6} 12, ${this.center} 18`;
    }
    
    createArrowPath() {
        const shaft = `M 4 ${this.center} L 16 ${this.center}`;
        const head = `M 16 ${this.center} L 12 ${this.center - 4} M 16 ${this.center} L 12 ${this.center + 4}`;
        return shaft + ' ' + head;
    }
    
    createFlowingLines() {
        let path = '';
        for (let i = 0; i < 3; i++) {
            const y = 8 + i * 4;
            path += `M 2 ${y} Q 8 ${y + 2} 12 ${y} T 22 ${y} `;
        }
        return path;
    }
    
    createRotationalElements() {
        let path = '';
        const elements = 6;
        for (let i = 0; i < elements; i++) {
            const angle = (i / elements) * Math.PI * 2;
            const x = this.center + Math.cos(angle) * 6;
            const y = this.center + Math.sin(angle) * 6;
            path += `M ${this.center} ${this.center} L ${x} ${y} `;
        }
        return path;
    }
    
    applyStyle(paths) {
        if (this.style === 'geometric') {
            // 幾何学的スタイル：直線的に
            return paths.map(path => path.replace(/C|Q/g, 'L'));
        } else if (this.style === 'flowing') {
            // 流動的スタイル：曲線を追加
            return paths.map(path => {
                return path.replace(/L\s*(\d+\.?\d*)\s+(\d+\.?\d*)/g, (match, x, y) => {
                    const prevX = parseFloat(x) - 2;
                    const prevY = parseFloat(y);
                    return `Q ${prevX} ${prevY} ${x} ${y}`;
                });
            });
        }
        return paths;
    }
}

// グローバル変数
const generator = new CreativeSvgGenerator();
let currentSvg = null;
let debugMode = false;

// イベントリスナー
document.addEventListener('DOMContentLoaded', () => {
    // スタイルボタン
    document.querySelectorAll('.style-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.style-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // 生成ボタン
    document.getElementById('generateBtn').addEventListener('click', generateIcon);
    document.getElementById('regenerateBtn').addEventListener('click', generateIcon);
    
    // その他のボタン
    document.getElementById('downloadBtn').addEventListener('click', downloadSvg);
    document.getElementById('copyBtn').addEventListener('click', copySvg);
    
    // スライダー
    document.getElementById('iconSize').addEventListener('input', (e) => {
        document.getElementById('sizeValue').textContent = e.target.value;
        if (currentSvg) displaySvg();
    });
    
    document.getElementById('strokeWidth').addEventListener('input', (e) => {
        document.getElementById('strokeValue').textContent = e.target.value;
        if (currentSvg) displaySvg();
    });
    
    document.getElementById('complexity').addEventListener('input', (e) => {
        document.getElementById('complexityValue').textContent = e.target.value;
    });
    
    document.getElementById('strokeColor').addEventListener('input', () => {
        if (currentSvg) displaySvg();
    });
    
    // Enterキー
    document.getElementById('prompt').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generateIcon();
        }
    });
});

function generateIcon() {
    const prompt = document.getElementById('prompt').value.trim();
    if (!prompt) {
        alert('プロンプトを入力してください');
        return;
    }
    
    const style = document.querySelector('.style-option.active').dataset.style;
    const complexity = parseInt(document.getElementById('complexity').value);
    
    const generateBtn = document.getElementById('generateBtn');
    const preview = document.getElementById('svgPreview');
    
    generateBtn.disabled = true;
    generateBtn.textContent = '✨ 生成中...';
    preview.classList.add('generating');
    
    setTimeout(() => {
        currentSvg = generator.generateFromPrompt(prompt, style, complexity);
        displaySvg();
        
        if (debugMode) {
            document.getElementById('debugInfo').innerHTML = 
                `<strong>Debug Info:</strong><br>
                Keywords: ${JSON.stringify(currentSvg.debug.keywords)}<br>
                Style: ${currentSvg.debug.style}<br>
                Complexity: ${currentSvg.debug.complexity}`;
        }
        
        document.getElementById('actionButtons').style.display = 'flex';
        preview.classList.remove('generating');
        generateBtn.disabled = false;
        generateBtn.textContent = '✨ アイコンを生成';
    }, 500);
}

function displaySvg() {
    const size = document.getElementById('iconSize').value;
    const strokeWidth = document.getElementById('strokeWidth').value;
    const color = document.getElementById('strokeColor').value;
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', currentSvg.viewBox);
    
    currentSvg.paths.forEach(pathData => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', strokeWidth);
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(path);
    });
    
    const preview = document.getElementById('svgPreview');
    preview.innerHTML = '';
    preview.appendChild(svg);
}

async function copySvg() {
    const svgElement = document.querySelector('#svgPreview svg');
    if (!svgElement) return;
    
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const copyBtn = document.getElementById('copyBtn');
    
    try {
        await navigator.clipboard.writeText(svgData);
        copyBtn.textContent = '✅ コピー完了！';
        setTimeout(() => {
            copyBtn.textContent = '📋 コピー';
        }, 2000);
    } catch (err) {
        alert('コピーに失敗しました');
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
    downloadLink.download = 'creative-icon.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
}

function toggleDebug() {
    debugMode = !debugMode;
    document.getElementById('debugInfo').style.display = debugMode ? 'block' : 'none';
}