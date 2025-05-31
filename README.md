# SVG Icon Generator

プロンプトを入力してSVGアイコンを生成するWebアプリケーションです。

## 使い方

### 方法1: ファイルを直接開く
1. `index.html` をブラウザで開く

### 方法2: ローカルサーバーを使用
Pythonがインストールされている場合：
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

その後、ブラウザで `http://localhost:8000` にアクセス

### 方法3: VS Code Live Server
VS Codeの Live Server 拡張機能を使用している場合は、`index.html` を右クリックして「Open with Live Server」を選択

## 機能
- プロンプト入力でアイコンを生成
- 10種類の基本アイコン（星、ハート、丸、四角、三角、矢印、チェック、バツ、プラス、家）
- 色指定対応（赤、青、緑、黄、紫、黒、白、オレンジ、ピンク、グレー）
- サイズ調整（24px〜256px）
- 線の太さ調整
- SVGファイルのダウンロード機能

## 使用例
- "青い星のアイコン" → 青い星が生成
- "赤いハート" → 赤いハートが生成
- "緑の矢印" → 緑の矢印が生成