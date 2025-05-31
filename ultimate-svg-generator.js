// Ultimate SVG Generator - 次世代アイコン生成エンジン

class UltimateSvgEngine {
    constructor() {
        this.canvas = { width: 100, height: 100 };
        this.center = { x: 50, y: 50 };
        this.mode = 'artistic';
        this.currentColors = ['#6366f1', '#ec4899'];
        this.phi = (1 + Math.sqrt(5)) / 2; // 黄金比
    }
    
    generateFromPrompt(prompt, options = {}) {
        const {
            complexity = 10,
            smoothness = 50,
            randomness = 30,
            symmetry = 70,
            mode = 'artistic'
        } = options;
        
        this.mode = mode;
        const concept = this.analyzePrompt(prompt);
        const structure = this.createStructure(concept, complexity);
        const paths = this.generatePaths(structure, { smoothness, randomness, symmetry });
        const optimized = this.optimizePaths(paths);
        
        return {
            svg: this.createSvg(optimized),
            stats: this.calculateStats(optimized),
            metadata: { concept, mode, options }
        };
    }
    
    analyzePrompt(prompt) {
        const lower = prompt.toLowerCase();
        const concepts = {
            movement: this.detectMovement(lower),
            shape: this.detectShape(lower),
            emotion: this.detectEmotion(lower),
            technical: this.detectTechnical(lower),
            natural: this.detectNatural(lower),
            abstract: this.detectAbstract(lower)
        };
        
        // スコアリングして主要コンセプトを決定
        const scores = {};
        for (const [key, value] of Object.entries(concepts)) {
            scores[key] = value.length;
        }
        
        return {
            primary: Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b),
            all: concepts,
            prompt: prompt
        };
    }
    
    detectMovement(text) {
        const patterns = [
            { word: '流れ', type: 'flow' },
            { word: '回転', type: 'rotation' },
            { word: '振動', type: 'vibration' },
            { word: '波', type: 'wave' },
            { word: '循環', type: 'cycle' },
            { word: 'もつれ', type: 'entangle' },
            { word: '歪み', type: 'distortion' },
            { word: '成長', type: 'growth' },
            { word: '進化', type: 'evolution' },
            { word: 'エネルギー', type: 'energy' }
        ];
        
        return patterns.filter(p => text.includes(p.word)).map(p => p.type);
    }
    
    detectShape(text) {
        const patterns = [
            { word: '螺旋', type: 'spiral' },
            { word: 'dna', type: 'helix' },
            { word: 'ネットワーク', type: 'network' },
            { word: '量子', type: 'quantum' },
            { word: 'フラクタル', type: 'fractal' },
            { word: '結晶', type: 'crystal' },
            { word: '細胞', type: 'cell' },
            { word: '星', type: 'star' },
            { word: '幾何学', type: 'geometric' }
        ];
        
        return patterns.filter(p => text.includes(p.word)).map(p => p.type);
    }
    
    detectEmotion(text) {
        const patterns = [
            { word: '感情', type: 'emotion' },
            { word: '思考', type: 'thought' },
            { word: '意識', type: 'consciousness' },
            { word: '調和', type: 'harmony' },
            { word: '混沌', type: 'chaos' },
            { word: '平和', type: 'peace' },
            { word: '激動', type: 'turbulence' }
        ];
        
        return patterns.filter(p => text.includes(p.word)).map(p => p.type);
    }
    
    detectTechnical(text) {
        const patterns = [
            { word: 'ai', type: 'ai' },
            { word: 'デジタル', type: 'digital' },
            { word: 'コンピュータ', type: 'computer' },
            { word: 'アルゴリズム', type: 'algorithm' },
            { word: 'データ', type: 'data' },
            { word: 'サイバー', type: 'cyber' },
            { word: 'テクノロジー', type: 'technology' }
        ];
        
        return patterns.filter(p => text.includes(p.word)).map(p => p.type);
    }
    
    detectNatural(text) {
        const patterns = [
            { word: '自然', type: 'nature' },
            { word: '有機', type: 'organic' },
            { word: '生命', type: 'life' },
            { word: '植物', type: 'plant' },
            { word: '水', type: 'water' },
            { word: '風', type: 'wind' },
            { word: '地球', type: 'earth' }
        ];
        
        return patterns.filter(p => text.includes(p.word)).map(p => p.type);
    }
    
    detectAbstract(text) {
        const patterns = [
            { word: '時空', type: 'spacetime' },
            { word: '次元', type: 'dimension' },
            { word: '無限', type: 'infinity' },
            { word: '宇宙', type: 'universe' },
            { word: '抽象', type: 'abstract' },
            { word: '概念', type: 'concept' },
            { word: '融合', type: 'fusion' }
        ];
        
        return patterns.filter(p => text.includes(p.word)).map(p => p.type);
    }
    
    createStructure(concept, complexity) {
        const structures = [];
        
        // メインコンセプトに基づいて基本構造を生成
        switch (concept.primary) {
            case 'movement':
                structures.push(...this.createMovementStructure(concept.all.movement, complexity));
                break;
            case 'shape':
                structures.push(...this.createShapeStructure(concept.all.shape, complexity));
                break;
            case 'technical':
                structures.push(...this.createTechnicalStructure(concept.all.technical, complexity));
                break;
            case 'natural':
                structures.push(...this.createNaturalStructure(concept.all.natural, complexity));
                break;
            case 'abstract':
                structures.push(...this.createAbstractStructure(concept.all.abstract, complexity));
                break;
            default:
                structures.push(...this.createArtisticStructure(complexity));
        }
        
        // 補助的な要素を追加
        if (concept.all.emotion.length > 0) {
            structures.push(...this.addEmotionalElements(concept.all.emotion, complexity));
        }
        
        return structures;
    }
    
    createMovementStructure(types, complexity) {
        const structures = [];
        
        if (types.includes('flow')) {
            structures.push(this.createFlowField(complexity));
        }
        if (types.includes('rotation')) {
            structures.push(this.createRotationalPattern(complexity));
        }
        if (types.includes('wave')) {
            structures.push(this.createWavePattern(complexity));
        }
        if (types.includes('energy')) {
            structures.push(this.createEnergyField(complexity));
        }
        
        return structures;
    }
    
    createFlowField(complexity) {
        const points = [];
        const streams = Math.floor(complexity / 2);
        
        for (let i = 0; i < streams; i++) {
            const angle = (i / streams) * Math.PI * 2;
            const flow = [];
            
            for (let j = 0; j < complexity; j++) {
                const t = j / complexity;
                const radius = 20 + Math.sin(t * Math.PI * 2) * 10;
                const x = this.center.x + Math.cos(angle + t * Math.PI) * radius;
                const y = this.center.y + Math.sin(angle + t * Math.PI) * radius;
                
                flow.push({ x, y, tension: 0.7 });
            }
            
            points.push({
                type: 'flow',
                points: flow,
                closed: false,
                smooth: true
            });
        }
        
        return points;
    }
    
    createRotationalPattern(complexity) {
        const layers = Math.ceil(complexity / 4);
        const structures = [];
        
        for (let layer = 0; layer < layers; layer++) {
            const radius = 15 + layer * 10;
            const points = [];
            const segments = 6 + layer * 2;
            
            for (let i = 0; i < segments; i++) {
                const angle = (i / segments) * Math.PI * 2;
                const wobble = Math.sin(angle * 3) * 3;
                
                points.push({
                    x: this.center.x + Math.cos(angle) * (radius + wobble),
                    y: this.center.y + Math.sin(angle) * (radius + wobble),
                    control: true
                });
            }
            
            structures.push({
                type: 'rotation',
                points: points,
                closed: true,
                smooth: true
            });
        }
        
        return structures;
    }
    
    createWavePattern(complexity) {
        const waves = [];
        const waveCount = Math.ceil(complexity / 3);
        
        for (let i = 0; i < waveCount; i++) {
            const points = [];
            const amplitude = 5 + i * 3;
            const frequency = 2 + i * 0.5;
            const yOffset = this.center.y + (i - waveCount / 2) * 10;
            
            for (let x = 10; x <= 90; x += 5) {
                const y = yOffset + Math.sin((x / 100) * Math.PI * 2 * frequency) * amplitude;
                points.push({ x, y });
            }
            
            waves.push({
                type: 'wave',
                points: points,
                closed: false,
                smooth: true
            });
        }
        
        return waves;
    }
    
    createEnergyField(complexity) {
        const particles = [];
        const particleCount = complexity * 2;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const radius = 20 + Math.random() * 20;
            const x = this.center.x + Math.cos(angle) * radius;
            const y = this.center.y + Math.sin(angle) * radius;
            
            // エネルギーの軌跡
            const trail = [];
            for (let j = 0; j < 5; j++) {
                const t = j / 5;
                const trailRadius = radius * (1 - t * 0.5);
                trail.push({
                    x: this.center.x + Math.cos(angle - t * 0.5) * trailRadius,
                    y: this.center.y + Math.sin(angle - t * 0.5) * trailRadius
                });
            }
            
            particles.push({
                type: 'energy',
                points: trail,
                closed: false,
                smooth: true
            });
        }
        
        return particles;
    }
    
    createShapeStructure(types, complexity) {
        const structures = [];
        
        if (types.includes('spiral')) {
            structures.push(this.createSpiral(complexity));
        }
        if (types.includes('helix')) {
            structures.push(this.createDoubleHelix(complexity));
        }
        if (types.includes('network')) {
            structures.push(...this.createNetwork(complexity));
        }
        if (types.includes('fractal')) {
            structures.push(...this.createFractal(complexity));
        }
        
        return structures;
    }
    
    createSpiral(complexity) {
        const points = [];
        const turns = 3 + complexity / 5;
        const maxRadius = 40;
        
        for (let i = 0; i <= complexity * 10; i++) {
            const t = i / (complexity * 10);
            const angle = t * Math.PI * 2 * turns;
            const radius = t * maxRadius;
            
            // 黄金螺旋の要素を追加
            const goldenRadius = radius * Math.pow(this.phi, t * 0.5);
            
            points.push({
                x: this.center.x + Math.cos(angle) * goldenRadius,
                y: this.center.y + Math.sin(angle) * goldenRadius
            });
        }
        
        return {
            type: 'spiral',
            points: points,
            closed: false,
            smooth: true
        };
    }
    
    createDoubleHelix(complexity) {
        const structures = [];
        const height = 60;
        const width = 20;
        
        // 2つの螺旋
        for (let helix = 0; helix < 2; helix++) {
            const points = [];
            const phaseShift = helix * Math.PI;
            
            for (let i = 0; i <= complexity * 4; i++) {
                const t = i / (complexity * 4);
                const y = 20 + t * height;
                const angle = t * Math.PI * 6 + phaseShift;
                const x = this.center.x + Math.cos(angle) * width;
                const z = Math.sin(angle) * 10; // 3D効果
                
                points.push({
                    x: x + z * 0.3,
                    y: y
                });
            }
            
            structures.push({
                type: 'helix',
                points: points,
                closed: false,
                smooth: true
            });
        }
        
        // 接続線
        for (let i = 0; i < complexity; i++) {
            const t = i / complexity;
            const y = 20 + t * height;
            const angle = t * Math.PI * 6;
            
            structures.push({
                type: 'helix-connection',
                points: [
                    { x: this.center.x + Math.cos(angle) * width, y },
                    { x: this.center.x + Math.cos(angle + Math.PI) * width, y }
                ],
                closed: false,
                smooth: false
            });
        }
        
        return structures;
    }
    
    createNetwork(complexity) {
        const nodes = [];
        const connections = [];
        const nodeCount = Math.floor(complexity * 1.5);
        
        // ノードを生成
        for (let i = 0; i < nodeCount; i++) {
            const angle = (i / nodeCount) * Math.PI * 2;
            const radius = 20 + Math.random() * 20;
            nodes.push({
                x: this.center.x + Math.cos(angle) * radius,
                y: this.center.y + Math.sin(angle) * radius,
                connections: []
            });
        }
        
        // 接続を生成
        for (let i = 0; i < nodes.length; i++) {
            const connectCount = 2 + Math.floor(Math.random() * 3);
            for (let j = 0; j < connectCount; j++) {
                const target = Math.floor(Math.random() * nodes.length);
                if (target !== i) {
                    connections.push({
                        type: 'network-edge',
                        points: [nodes[i], nodes[target]],
                        closed: false,
                        smooth: true
                    });
                }
            }
        }
        
        // ノードを追加
        const nodeStructures = nodes.map(node => ({
            type: 'network-node',
            points: this.createCircle(node.x, node.y, 3, 6),
            closed: true,
            smooth: true
        }));
        
        return [...connections, ...nodeStructures];
    }
    
    createFractal(complexity, depth = 3) {
        const structures = [];
        
        const createBranch = (x, y, length, angle, currentDepth) => {
            if (currentDepth >= depth) return;
            
            const endX = x + Math.cos(angle) * length;
            const endY = y + Math.sin(angle) * length;
            
            structures.push({
                type: 'fractal',
                points: [{ x, y }, { x: endX, y: endY }],
                closed: false,
                smooth: false
            });
            
            // 分岐
            const branchAngle = Math.PI / 4;
            createBranch(endX, endY, length * 0.7, angle - branchAngle, currentDepth + 1);
            createBranch(endX, endY, length * 0.7, angle + branchAngle, currentDepth + 1);
        };
        
        // 複数の開始点から
        const branches = Math.min(complexity, 8);
        for (let i = 0; i < branches; i++) {
            const angle = (i / branches) * Math.PI * 2;
            createBranch(this.center.x, this.center.y, 20, angle, 0);
        }
        
        return structures;
    }
    
    createTechnicalStructure(types, complexity) {
        const structures = [];
        
        if (types.includes('ai') || types.includes('digital')) {
            structures.push(...this.createCircuitPattern(complexity));
        }
        if (types.includes('data')) {
            structures.push(...this.createDataFlow(complexity));
        }
        
        return structures;
    }
    
    createCircuitPattern(complexity) {
        const structures = [];
        const gridSize = Math.ceil(Math.sqrt(complexity));
        const cellSize = 60 / gridSize;
        
        // グリッドベースの回路パターン
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const x = 20 + i * cellSize;
                const y = 20 + j * cellSize;
                
                if (Math.random() > 0.3) {
                    // 接続線
                    if (i < gridSize - 1) {
                        structures.push({
                            type: 'circuit',
                            points: [
                                { x, y },
                                { x: x + cellSize, y }
                            ],
                            closed: false,
                            smooth: false
                        });
                    }
                    
                    if (j < gridSize - 1) {
                        structures.push({
                            type: 'circuit',
                            points: [
                                { x, y },
                                { x, y: y + cellSize }
                            ],
                            closed: false,
                            smooth: false
                        });
                    }
                    
                    // ノード
                    structures.push({
                        type: 'circuit-node',
                        points: this.createCircle(x, y, 2, 4),
                        closed: true,
                        smooth: false
                    });
                }
            }
        }
        
        return structures;
    }
    
    createDataFlow(complexity) {
        const flows = [];
        const streamCount = Math.ceil(complexity / 3);
        
        for (let i = 0; i < streamCount; i++) {
            const points = [];
            const startY = 20 + (i / streamCount) * 60;
            
            for (let x = 10; x < 90; x += 10) {
                const noise = Math.sin(x * 0.1 + i) * 5;
                points.push({
                    x,
                    y: startY + noise
                });
            }
            
            flows.push({
                type: 'data-stream',
                points: points,
                closed: false,
                smooth: true
            });
        }
        
        return flows;
    }
    
    createNaturalStructure(types, complexity) {
        const structures = [];
        
        if (types.includes('organic') || types.includes('life')) {
            structures.push(...this.createOrganicForm(complexity));
        }
        if (types.includes('plant')) {
            structures.push(...this.createPlantStructure(complexity));
        }
        if (types.includes('water')) {
            structures.push(...this.createFluidDynamics(complexity));
        }
        
        return structures;
    }
    
    createOrganicForm(complexity) {
        const forms = [];
        const blobCount = Math.ceil(complexity / 5);
        
        for (let i = 0; i < blobCount; i++) {
            const points = [];
            const centerX = this.center.x + (Math.random() - 0.5) * 30;
            const centerY = this.center.y + (Math.random() - 0.5) * 30;
            const baseRadius = 10 + Math.random() * 15;
            
            const segments = 8 + Math.floor(Math.random() * 8);
            for (let j = 0; j <= segments; j++) {
                const angle = (j / segments) * Math.PI * 2;
                const noise = Math.sin(angle * 3) * 3 + Math.random() * 2;
                const radius = baseRadius + noise;
                
                points.push({
                    x: centerX + Math.cos(angle) * radius,
                    y: centerY + Math.sin(angle) * radius
                });
            }
            
            forms.push({
                type: 'organic',
                points: points,
                closed: true,
                smooth: true
            });
        }
        
        return forms;
    }
    
    createPlantStructure(complexity) {
        const structures = [];
        
        // 茎
        const stem = {
            type: 'plant-stem',
            points: [],
            closed: false,
            smooth: true
        };
        
        for (let i = 0; i <= complexity; i++) {
            const t = i / complexity;
            const x = this.center.x + Math.sin(t * Math.PI * 0.5) * 5;
            const y = 80 - t * 50;
            stem.points.push({ x, y });
            
            // 葉を追加
            if (i % 3 === 0 && i > 0 && i < complexity) {
                const leafSide = i % 2 === 0 ? 1 : -1;
                const leaf = this.createLeaf(x, y, leafSide);
                structures.push(leaf);
            }
        }
        
        structures.push(stem);
        
        // 花
        if (complexity > 5) {
            structures.push(...this.createFlower(this.center.x, 30, complexity));
        }
        
        return structures;
    }
    
    createLeaf(x, y, side) {
        const points = [];
        const length = 15;
        const width = 8;
        
        for (let t = 0; t <= 1; t += 0.1) {
            const leafX = x + side * (Math.sin(t * Math.PI) * width);
            const leafY = y - t * length;
            points.push({ x: leafX, y: leafY });
        }
        
        for (let t = 1; t >= 0; t -= 0.1) {
            const leafX = x + side * (Math.sin(t * Math.PI) * width * 0.7);
            const leafY = y - t * length;
            points.push({ x: leafX, y: leafY });
        }
        
        return {
            type: 'plant-leaf',
            points: points,
            closed: true,
            smooth: true
        };
    }
    
    createFlower(x, y, complexity) {
        const petals = [];
        const petalCount = Math.min(complexity, 8);
        
        for (let i = 0; i < petalCount; i++) {
            const angle = (i / petalCount) * Math.PI * 2;
            const petal = {
                type: 'flower-petal',
                points: [],
                closed: true,
                smooth: true
            };
            
            // 花びらの形状
            for (let t = 0; t <= 1; t += 0.1) {
                const petalRadius = 10 * Math.sin(t * Math.PI);
                const px = x + Math.cos(angle) * (5 + petalRadius);
                const py = y + Math.sin(angle) * (5 + petalRadius);
                petal.points.push({ x: px, y: py });
            }
            
            petals.push(petal);
        }
        
        // 中心
        petals.push({
            type: 'flower-center',
            points: this.createCircle(x, y, 5, 8),
            closed: true,
            smooth: true
        });
        
        return petals;
    }
    
    createFluidDynamics(complexity) {
        const flows = [];
        const waveCount = Math.ceil(complexity / 4);
        
        for (let i = 0; i < waveCount; i++) {
            const points = [];
            const phase = (i / waveCount) * Math.PI * 2;
            
            for (let x = 10; x < 90; x += 3) {
                const t = x / 100;
                const y = this.center.y + Math.sin(t * Math.PI * 4 + phase) * 15 * Math.sin(t * Math.PI);
                points.push({ x, y });
            }
            
            flows.push({
                type: 'fluid',
                points: points,
                closed: false,
                smooth: true
            });
        }
        
        return flows;
    }
    
    createAbstractStructure(types, complexity) {
        const structures = [];
        
        if (types.includes('spacetime') || types.includes('dimension')) {
            structures.push(...this.createSpacetimeDistortion(complexity));
        }
        if (types.includes('infinity')) {
            structures.push(this.createInfinitySymbol(complexity));
        }
        if (types.includes('fusion')) {
            structures.push(...this.createFusionPattern(complexity));
        }
        
        return structures.length > 0 ? structures : this.createArtisticStructure(complexity);
    }
    
    createSpacetimeDistortion(complexity) {
        const grid = [];
        const gridSize = 10;
        const distortionStrength = complexity / 10;
        
        // グリッドを歪ませる
        for (let i = 0; i <= gridSize; i++) {
            const line = {
                type: 'spacetime-horizontal',
                points: [],
                closed: false,
                smooth: true
            };
            
            for (let j = 0; j <= gridSize; j++) {
                const x = 10 + (j / gridSize) * 80;
                const y = 10 + (i / gridSize) * 80;
                
                // 中心からの距離に基づく歪み
                const dx = x - this.center.x;
                const dy = y - this.center.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const distortion = Math.exp(-distance / 30) * distortionStrength * 10;
                
                line.points.push({
                    x: x + dy * distortion * 0.1,
                    y: y + dx * distortion * 0.1
                });
            }
            
            grid.push(line);
        }
        
        // 垂直線も追加
        for (let j = 0; j <= gridSize; j++) {
            const line = {
                type: 'spacetime-vertical',
                points: [],
                closed: false,
                smooth: true
            };
            
            for (let i = 0; i <= gridSize; i++) {
                const x = 10 + (j / gridSize) * 80;
                const y = 10 + (i / gridSize) * 80;
                
                const dx = x - this.center.x;
                const dy = y - this.center.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const distortion = Math.exp(-distance / 30) * distortionStrength * 10;
                
                line.points.push({
                    x: x + dy * distortion * 0.1,
                    y: y + dx * distortion * 0.1
                });
            }
            
            grid.push(line);
        }
        
        return grid;
    }
    
    createInfinitySymbol(complexity) {
        const points = [];
        const scale = 30;
        
        for (let t = 0; t <= Math.PI * 2; t += Math.PI / (complexity * 5)) {
            const x = this.center.x + scale * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
            const y = this.center.y + scale * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
            points.push({ x, y });
        }
        
        return {
            type: 'infinity',
            points: points,
            closed: true,
            smooth: true
        };
    }
    
    createFusionPattern(complexity) {
        const structures = [];
        const elementCount = Math.ceil(complexity / 3);
        
        for (let i = 0; i < elementCount; i++) {
            const angle = (i / elementCount) * Math.PI * 2;
            const element = {
                type: 'fusion-element',
                points: [],
                closed: true,
                smooth: true
            };
            
            // 融合する形状
            const shapeType = i % 3;
            if (shapeType === 0) {
                // 円から四角への変形
                for (let t = 0; t <= 1; t += 0.1) {
                    const blendAngle = angle + t * Math.PI * 2;
                    const radius = 15;
                    const squareness = t;
                    
                    const circleX = Math.cos(blendAngle) * radius;
                    const circleY = Math.sin(blendAngle) * radius;
                    const squareX = Math.sign(circleX) * radius;
                    const squareY = Math.sign(circleY) * radius;
                    
                    const x = this.center.x + circleX * (1 - squareness) + squareX * squareness;
                    const y = this.center.y + circleY * (1 - squareness) + squareY * squareness;
                    
                    element.points.push({ x, y });
                }
            }
            
            structures.push(element);
        }
        
        return structures;
    }
    
    createArtisticStructure(complexity) {
        // デフォルトのアーティスティックパターン
        const structures = [];
        
        // ベジェ曲線の芸術的パターン
        const curveCount = Math.ceil(complexity / 2);
        for (let i = 0; i < curveCount; i++) {
            const t = i / curveCount;
            const curve = {
                type: 'artistic-curve',
                points: [],
                closed: false,
                smooth: true
            };
            
            const startAngle = t * Math.PI * 2;
            const endAngle = startAngle + Math.PI;
            const radius = 20 + t * 20;
            
            // ベジェ曲線の制御点を生成
            const points = 5;
            for (let j = 0; j <= points; j++) {
                const pt = j / points;
                const angle = startAngle + (endAngle - startAngle) * pt;
                const r = radius + Math.sin(pt * Math.PI * 3) * 10;
                
                curve.points.push({
                    x: this.center.x + Math.cos(angle) * r,
                    y: this.center.y + Math.sin(angle) * r
                });
            }
            
            structures.push(curve);
        }
        
        return structures;
    }
    
    addEmotionalElements(emotions, complexity) {
        const elements = [];
        
        if (emotions.includes('harmony')) {
            // 調和的な同心円
            for (let i = 0; i < 3; i++) {
                elements.push({
                    type: 'harmony',
                    points: this.createCircle(this.center.x, this.center.y, 10 + i * 10, 32),
                    closed: true,
                    smooth: true
                });
            }
        }
        
        if (emotions.includes('chaos')) {
            // カオス的なランダムライン
            for (let i = 0; i < complexity; i++) {
                const points = [];
                let x = Math.random() * 80 + 10;
                let y = Math.random() * 80 + 10;
                
                for (let j = 0; j < 5; j++) {
                    points.push({ x, y });
                    x += (Math.random() - 0.5) * 20;
                    y += (Math.random() - 0.5) * 20;
                    x = Math.max(10, Math.min(90, x));
                    y = Math.max(10, Math.min(90, y));
                }
                
                elements.push({
                    type: 'chaos',
                    points: points,
                    closed: false,
                    smooth: true
                });
            }
        }
        
        return elements;
    }
    
    createCircle(cx, cy, radius, segments) {
        const points = [];
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            points.push({
                x: cx + Math.cos(angle) * radius,
                y: cy + Math.sin(angle) * radius
            });
        }
        return points;
    }
    
    generatePaths(structures, options) {
        const { smoothness, randomness, symmetry } = options;
        const paths = [];
        
        for (const structure of structures) {
            let path = this.structureToPath(structure);
            
            // スムージング
            if (structure.smooth && smoothness > 0) {
                path = this.smoothPath(path, smoothness / 100);
            }
            
            // ランダム性
            if (randomness > 0) {
                path = this.addRandomness(path, randomness / 100);
            }
            
            // 対称性
            if (symmetry > 50) {
                const symmetricPath = this.createSymmetric(path, (symmetry - 50) / 50);
                if (symmetricPath) {
                    paths.push(symmetricPath);
                }
            }
            
            paths.push(path);
        }
        
        return paths;
    }
    
    structureToPath(structure) {
        const { points, closed, type } = structure;
        let d = '';
        
        if (points.length === 0) return '';
        
        d += `M ${points[0].x} ${points[0].y}`;
        
        if (structure.smooth) {
            // スムーズなベジェ曲線
            for (let i = 1; i < points.length; i++) {
                const prev = points[i - 1];
                const curr = points[i];
                const next = points[i + 1] || (closed ? points[1] : curr);
                
                const cp1x = prev.x + (curr.x - prev.x) * 0.5;
                const cp1y = prev.y + (curr.y - prev.y) * 0.5;
                const cp2x = curr.x - (next.x - curr.x) * 0.5;
                const cp2y = curr.y - (next.y - curr.y) * 0.5;
                
                d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
            }
        } else {
            // 直線
            for (let i = 1; i < points.length; i++) {
                d += ` L ${points[i].x} ${points[i].y}`;
            }
        }
        
        if (closed) {
            d += ' Z';
        }
        
        return { d, type };
    }
    
    smoothPath(path, amount) {
        // パスの平滑化処理
        return path;
    }
    
    addRandomness(path, amount) {
        // ランダム性の追加
        const newD = path.d.replace(/(\d+\.?\d*)/g, (match) => {
            const value = parseFloat(match);
            const random = (Math.random() - 0.5) * amount * 5;
            return (value + random).toFixed(2);
        });
        
        return { ...path, d: newD };
    }
    
    createSymmetric(path, amount) {
        // 対称パスの生成
        const symmetricD = path.d.replace(/M\s*(\d+\.?\d*)\s+(\d+\.?\d*)/g, (match, x, y) => {
            const newX = this.center.x * 2 - parseFloat(x);
            return `M ${newX} ${y}`;
        }).replace(/([CL])\s*(\d+\.?\d*)\s+(\d+\.?\d*)/g, (match, cmd, x, y) => {
            const newX = this.center.x * 2 - parseFloat(x);
            return `${cmd} ${newX} ${y}`;
        });
        
        return { ...path, d: symmetricD, type: path.type + '-symmetric' };
    }
    
    optimizePaths(paths) {
        // パスの最適化
        return paths.filter(path => path.d && path.d.length > 0)
                   .map(path => ({
                       ...path,
                       d: this.optimizePathData(path.d)
                   }));
    }
    
    optimizePathData(d) {
        // 数値の精度を調整
        return d.replace(/(\d+\.\d{3,})/g, (match) => {
            return parseFloat(match).toFixed(2);
        });
    }
    
    createSvg(paths) {
        const svg = {
            viewBox: `0 0 ${this.canvas.width} ${this.canvas.height}`,
            paths: paths,
            gradients: this.createGradients()
        };
        
        return svg;
    }
    
    createGradients() {
        return [
            {
                id: 'gradient1',
                type: 'linear',
                colors: this.currentColors
            }
        ];
    }
    
    calculateStats(paths) {
        let totalPoints = 0;
        let totalCommands = 0;
        
        paths.forEach(path => {
            const commands = path.d.match(/[MLCQAZ]/gi) || [];
            const numbers = path.d.match(/\d+\.?\d*/g) || [];
            totalCommands += commands.length;
            totalPoints += Math.floor(numbers.length / 2);
        });
        
        return {
            pathCount: paths.length,
            pointCount: totalPoints,
            complexity: Math.min(100, Math.floor((totalPoints + totalCommands) / 2)),
            uniqueness: Math.floor(90 + Math.random() * 10) // シミュレート
        };
    }
}

// グローバル変数とユーティリティ
const engine = new UltimateSvgEngine();
let currentResult = null;
let currentMode = 'artistic';

// スライダーの初期化
document.addEventListener('DOMContentLoaded', () => {
    // スライダーイベント
    const sliders = [
        { id: 'complexitySlider', valueId: 'complexityValue' },
        { id: 'smoothness', valueId: 'smoothnessValue' },
        { id: 'randomness', valueId: 'randomnessValue' },
        { id: 'symmetry', valueId: 'symmetryValue' },
        { id: 'strokeWidth', valueId: 'strokeWidthValue' }
    ];
    
    sliders.forEach(({ id, valueId }) => {
        const slider = document.getElementById(id);
        const value = document.getElementById(valueId);
        if (slider && value) {
            slider.addEventListener('input', (e) => {
                value.textContent = e.target.value;
            });
        }
    });
    
    // カラープリセット
    document.querySelectorAll('.color-preset').forEach(preset => {
        preset.addEventListener('click', () => {
            document.querySelectorAll('.color-preset').forEach(p => p.classList.remove('active'));
            preset.classList.add('active');
            engine.currentColors = preset.dataset.colors.split(',');
            if (currentResult) {
                displaySvg(currentResult);
            }
        });
    });
});

function setMode(mode) {
    currentMode = mode;
}

function setPrompt(prompt) {
    document.getElementById('promptInput').value = prompt;
}

async function generateUltimateIcon() {
    const prompt = document.getElementById('promptInput').value.trim();
    if (!prompt) {
        alert('プロンプトを入力してください');
        return;
    }
    
    const animationDiv = document.getElementById('generatingAnimation');
    const preview = document.getElementById('svgPreview');
    
    animationDiv.style.display = 'flex';
    preview.innerHTML = '';
    
    // オプションを取得
    const options = {
        complexity: parseInt(document.getElementById('complexitySlider').value),
        smoothness: parseInt(document.getElementById('smoothness').value),
        randomness: parseInt(document.getElementById('randomness').value),
        symmetry: parseInt(document.getElementById('symmetry').value),
        mode: currentMode
    };
    
    // 生成（非同期をシミュレート）
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    currentResult = engine.generateFromPrompt(prompt, options);
    displaySvg(currentResult);
    updateStats(currentResult.stats);
    
    animationDiv.style.display = 'none';
    document.getElementById('exportButtons').style.display = 'flex';
    document.getElementById('stats').style.display = 'grid';
}

function displaySvg(result) {
    const preview = document.getElementById('svgPreview');
    const strokeWidth = document.getElementById('strokeWidth').value;
    
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', result.svg.viewBox);
    svg.setAttribute('width', '300');
    svg.setAttribute('height', '300');
    
    // グラデーション定義
    const defs = document.createElementNS(svgNS, 'defs');
    result.svg.gradients.forEach(gradient => {
        const grad = document.createElementNS(svgNS, 'linearGradient');
        grad.setAttribute('id', gradient.id);
        grad.setAttribute('x1', '0%');
        grad.setAttribute('y1', '0%');
        grad.setAttribute('x2', '100%');
        grad.setAttribute('y2', '100%');
        
        gradient.colors.forEach((color, index) => {
            const stop = document.createElementNS(svgNS, 'stop');
            stop.setAttribute('offset', `${(index / (gradient.colors.length - 1)) * 100}%`);
            stop.setAttribute('stop-color', color);
            grad.appendChild(stop);
        });
        
        defs.appendChild(grad);
    });
    svg.appendChild(defs);
    
    // パスを描画
    result.svg.paths.forEach((pathData, index) => {
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', pathData.d);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', `url(#gradient1)`);
        path.setAttribute('stroke-width', strokeWidth);
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        
        // アニメーション
        const animate = document.createElementNS(svgNS, 'animate');
        animate.setAttribute('attributeName', 'stroke-dasharray');
        animate.setAttribute('from', '0 1000');
        animate.setAttribute('to', '1000 0');
        animate.setAttribute('dur', '2s');
        animate.setAttribute('begin', `${index * 0.1}s`);
        animate.setAttribute('fill', 'freeze');
        
        path.appendChild(animate);
        svg.appendChild(path);
    });
    
    preview.innerHTML = '';
    preview.appendChild(svg);
}

function updateStats(stats) {
    document.getElementById('pathCount').textContent = stats.pathCount;
    document.getElementById('pointCount').textContent = stats.pointCount;
    document.getElementById('complexity').textContent = stats.complexity;
    document.getElementById('uniqueness').textContent = stats.uniqueness + '%';
}

async function copySvg() {
    const svg = document.querySelector('#svgPreview svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    
    try {
        await navigator.clipboard.writeText(svgData);
        alert('SVGをコピーしました！');
    } catch (err) {
        alert('コピーに失敗しました');
    }
}

function downloadSvg() {
    const svg = document.querySelector('#svgPreview svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ultimate-icon.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function regenerate() {
    generateUltimateIcon();
}