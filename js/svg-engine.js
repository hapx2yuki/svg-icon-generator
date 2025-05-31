// SVG Icon Generator Engine
// プロンプトから動的にSVGアイコンを生成

class SvgEngine {
    constructor() {
        this.viewBox = 100;
        this.center = { x: 50, y: 50 };
    }
    
    generateFromPrompt(prompt, options = {}) {
        const {
            strokeWidth = 2,
            color = '#6366f1',
            complexity = 5
        } = options;
        
        const keywords = this.analyzePrompt(prompt);
        const paths = this.createPaths(keywords, complexity);
        
        return {
            viewBox: `0 0 ${this.viewBox} ${this.viewBox}`,
            paths: paths,
            strokeWidth: strokeWidth,
            color: color
        };
    }
    
    analyzePrompt(prompt) {
        const lower = prompt.toLowerCase();
        const keywords = {
            shapes: [],
            movements: [],
            elements: []
        };
        
        // 形状の検出
        if (lower.includes('星') || lower.includes('star')) keywords.shapes.push('star');
        if (lower.includes('円') || lower.includes('丸') || lower.includes('circle')) keywords.shapes.push('circle');
        if (lower.includes('四角') || lower.includes('square')) keywords.shapes.push('square');
        if (lower.includes('三角') || lower.includes('triangle')) keywords.shapes.push('triangle');
        if (lower.includes('ハート') || lower.includes('heart')) keywords.shapes.push('heart');
        if (lower.includes('矢印') || lower.includes('arrow')) keywords.shapes.push('arrow');
        
        // 動きの検出
        if (lower.includes('流れ') || lower.includes('flow')) keywords.movements.push('flow');
        if (lower.includes('回転') || lower.includes('rotate')) keywords.movements.push('rotate');
        if (lower.includes('波') || lower.includes('wave')) keywords.movements.push('wave');
        if (lower.includes('螺旋') || lower.includes('spiral')) keywords.movements.push('spiral');
        
        // 要素の検出
        if (lower.includes('歯車') || lower.includes('gear')) keywords.elements.push('gear');
        if (lower.includes('花') || lower.includes('flower')) keywords.elements.push('flower');
        if (lower.includes('稲妻') || lower.includes('lightning')) keywords.elements.push('lightning');
        if (lower.includes('音') || lower.includes('music')) keywords.elements.push('music');
        
        return keywords;
    }
    
    createPaths(keywords, complexity) {
        const paths = [];
        
        // 形状を生成
        if (keywords.shapes.length > 0) {
            keywords.shapes.forEach(shape => {
                paths.push(this.createShape(shape));
            });
        }
        
        // 動きを追加
        if (keywords.movements.length > 0) {
            keywords.movements.forEach(movement => {
                paths.push(...this.createMovement(movement, complexity));
            });
        }
        
        // 要素を追加
        if (keywords.elements.length > 0) {
            keywords.elements.forEach(element => {
                paths.push(...this.createElement(element, complexity));
            });
        }
        
        // 何も検出されない場合はデフォルト
        if (paths.length === 0) {
            paths.push(this.createDefaultPattern(complexity));
        }
        
        return paths;
    }
    
    createShape(type) {
        switch (type) {
            case 'star':
                return this.createStar();
            case 'circle':
                return this.createCircle();
            case 'square':
                return this.createSquare();
            case 'triangle':
                return this.createTriangle();
            case 'heart':
                return this.createHeart();
            case 'arrow':
                return this.createArrow();
            default:
                return this.createCircle();
        }
    }
    
    createStar() {
        const cx = this.center.x;
        const cy = this.center.y;
        const r1 = 25;
        const r2 = 12;
        const points = 5;
        let path = '';
        
        for (let i = 0; i < points * 2; i++) {
            const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
            const r = i % 2 === 0 ? r1 : r2;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            
            if (i === 0) {
                path = `M ${x} ${y}`;
            } else {
                path += ` L ${x} ${y}`;
            }
        }
        
        return path + ' Z';
    }
    
    createCircle() {
        const cx = this.center.x;
        const cy = this.center.y;
        const r = 30;
        return `M ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy}`;
    }
    
    createSquare() {
        const size = 40;
        const x = this.center.x - size / 2;
        const y = this.center.y - size / 2;
        return `M ${x} ${y} h ${size} v ${size} h -${size} Z`;
    }
    
    createTriangle() {
        const cx = this.center.x;
        const cy = this.center.y;
        const size = 35;
        return `M ${cx} ${cy - size} L ${cx - size} ${cy + size/2} L ${cx + size} ${cy + size/2} Z`;
    }
    
    createHeart() {
        const cx = this.center.x;
        const cy = this.center.y;
        return `M ${cx} ${cy + 15} C ${cx - 20} ${cy}, ${cx - 25} ${cy - 15}, ${cx - 12} ${cy - 20} C ${cx - 6} ${cy - 25}, ${cx} ${cy - 22}, ${cx} ${cy - 22} C ${cx} ${cy - 22}, ${cx + 6} ${cy - 25}, ${cx + 12} ${cy - 20} C ${cx + 25} ${cy - 15}, ${cx + 20} ${cy}, ${cx} ${cy + 15} Z`;
    }
    
    createArrow() {
        const cx = this.center.x;
        const cy = this.center.y;
        return `M ${cx - 20} ${cy} L ${cx + 10} ${cy} M ${cx + 10} ${cy} L ${cx} ${cy - 10} M ${cx + 10} ${cy} L ${cx} ${cy + 10}`;
    }
    
    createMovement(type, complexity) {
        switch (type) {
            case 'flow':
                return this.createFlow(complexity);
            case 'wave':
                return this.createWave(complexity);
            case 'spiral':
                return [this.createSpiral(complexity)];
            case 'rotate':
                return this.createRotation(complexity);
            default:
                return [];
        }
    }
    
    createFlow(complexity) {
        const paths = [];
        const streams = Math.min(complexity, 5);
        
        for (let i = 0; i < streams; i++) {
            const y = 20 + (i / (streams - 1)) * 60;
            paths.push(`M 10 ${y} Q 30 ${y - 10} 50 ${y} T 90 ${y}`);
        }
        
        return paths;
    }
    
    createWave(complexity) {
        const paths = [];
        const waves = Math.min(complexity, 4);
        
        for (let i = 0; i < waves; i++) {
            const y = 20 + (i / (waves - 1)) * 60;
            let path = `M 10 ${y}`;
            
            for (let x = 20; x <= 90; x += 10) {
                const wave = Math.sin((x / 20) * Math.PI) * 10;
                path += ` L ${x} ${y + wave}`;
            }
            
            paths.push(path);
        }
        
        return paths;
    }
    
    createSpiral(complexity) {
        const cx = this.center.x;
        const cy = this.center.y;
        const turns = complexity / 2;
        const maxRadius = 35;
        let path = '';
        
        for (let i = 0; i <= 100; i++) {
            const t = i / 100;
            const angle = t * Math.PI * 2 * turns;
            const radius = t * maxRadius;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            
            if (i === 0) {
                path = `M ${x} ${y}`;
            } else {
                path += ` L ${x} ${y}`;
            }
        }
        
        return path;
    }
    
    createRotation(complexity) {
        const paths = [];
        const spokes = Math.min(complexity * 2, 12);
        const cx = this.center.x;
        const cy = this.center.y;
        const radius = 30;
        
        for (let i = 0; i < spokes; i++) {
            const angle = (i / spokes) * Math.PI * 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            paths.push(`M ${cx} ${cy} L ${x} ${y}`);
        }
        
        return paths;
    }
    
    createElement(type, complexity) {
        switch (type) {
            case 'gear':
                return this.createGear(complexity);
            case 'flower':
                return this.createFlower(complexity);
            case 'lightning':
                return [this.createLightning()];
            case 'music':
                return this.createMusicNote();
            default:
                return [];
        }
    }
    
    createGear(complexity) {
        const paths = [];
        const cx = this.center.x;
        const cy = this.center.y;
        const r1 = 25;
        const r2 = 35;
        const teeth = Math.min(complexity * 2, 12);
        let path = '';
        
        for (let i = 0; i < teeth; i++) {
            const a1 = (i / teeth) * Math.PI * 2;
            const a2 = ((i + 0.5) / teeth) * Math.PI * 2;
            
            const x1 = cx + Math.cos(a1) * r1;
            const y1 = cy + Math.sin(a1) * r1;
            const x2 = cx + Math.cos(a1) * r2;
            const y2 = cy + Math.sin(a1) * r2;
            const x3 = cx + Math.cos(a2) * r2;
            const y3 = cy + Math.sin(a2) * r2;
            const x4 = cx + Math.cos(a2) * r1;
            const y4 = cy + Math.sin(a2) * r1;
            
            if (i === 0) {
                path = `M ${x1} ${y1}`;
            }
            path += ` L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4}`;
        }
        
        paths.push(path + ' Z');
        paths.push(`M ${cx + 15} ${cy} A 15 15 0 1 0 ${cx - 15} ${cy} A 15 15 0 1 0 ${cx + 15} ${cy}`);
        
        return paths;
    }
    
    createFlower(complexity) {
        const paths = [];
        const cx = this.center.x;
        const cy = this.center.y;
        const petals = Math.min(complexity + 3, 8);
        
        // 花びら
        for (let i = 0; i < petals; i++) {
            const angle = (i / petals) * Math.PI * 2;
            const petalPath = `M ${cx} ${cy} Q ${cx + Math.cos(angle) * 20} ${cy + Math.sin(angle) * 20}, ${cx + Math.cos(angle) * 30} ${cy + Math.sin(angle) * 15} Q ${cx + Math.cos(angle) * 20} ${cy + Math.sin(angle) * 20}, ${cx} ${cy}`;
            paths.push(petalPath);
        }
        
        // 中心
        paths.push(`M ${cx + 8} ${cy} A 8 8 0 1 0 ${cx - 8} ${cy} A 8 8 0 1 0 ${cx + 8} ${cy}`);
        
        return paths;
    }
    
    createLightning() {
        const cx = this.center.x;
        const cy = this.center.y;
        return `M ${cx} ${cy - 30} L ${cx - 10} ${cy - 10} L ${cx + 5} ${cy - 10} L ${cx - 5} ${cy + 10} L ${cx + 10} ${cy + 10} L ${cx} ${cy + 30}`;
    }
    
    createMusicNote() {
        const cx = this.center.x;
        const cy = this.center.y;
        return [
            `M ${cx - 10} ${cy + 10} C ${cx - 10} ${cy + 15}, ${cx - 5} ${cy + 20}, ${cx} ${cy + 20} C ${cx + 5} ${cy + 20}, ${cx + 10} ${cy + 15}, ${cx + 10} ${cy + 10}`,
            `M ${cx - 10} ${cy + 10} L ${cx - 10} ${cy - 20} L ${cx + 10} ${cy - 25} L ${cx + 10} ${cy + 5}`
        ];
    }
    
    createDefaultPattern(complexity) {
        // デフォルトは美しい幾何学パターン
        const cx = this.center.x;
        const cy = this.center.y;
        const points = complexity + 3;
        let path = '';
        
        for (let i = 0; i <= points; i++) {
            const angle = (i / points) * Math.PI * 2;
            const radius = 30 + Math.sin(angle * 3) * 10;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            
            if (i === 0) {
                path = `M ${x} ${y}`;
            } else {
                path += ` L ${x} ${y}`;
            }
        }
        
        return path + ' Z';
    }
}

// エクスポート
window.SvgEngine = SvgEngine;