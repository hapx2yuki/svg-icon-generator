# SVG Icon Generator

プロンプトから動的にSVGアイコンを生成するWebアプリケーションです。

![SVG Icon Generator](https://img.shields.io/badge/version-2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 デモ

[https://hapx2yuki.github.io/svg-icon-generator/](https://hapx2yuki.github.io/svg-icon-generator/)

## ✨ 特徴

- **プロンプトベース生成**: 自然言語でアイコンを説明するだけで生成
- **3つのモード**:
  - シンプル: 基本的なアイコン生成
  - アドバンス: 詳細な設定が可能
  - クリエイティブ: より複雑で創造的なアイコン
- **リアルタイムプレビュー**: 設定変更が即座に反映
- **カスタマイズ可能**: 色、サイズ、線の太さ、複雑さを調整
- **エクスポート機能**: SVGコードのコピーとファイルダウンロード

## 🛠 技術スタック

- HTML5
- CSS3 (カスタムプロパティ、グリッドレイアウト)
- JavaScript (ES6+)
- SVG

## 📁 プロジェクト構造

```
svg-icon-generator/
├── index.html          # メインのHTMLファイル
├── css/
│   └── styles.css      # スタイルシート
├── js/
│   ├── main.js         # メインのJavaScript
│   └── svg-engine.js   # SVG生成エンジン
└── README.md           # このファイル
```

## 🎨 使用例

### 基本的な使い方
1. プロンプト入力欄にアイコンの説明を入力
2. 「アイコンを生成」ボタンをクリック
3. 生成されたアイコンをカスタマイズ
4. SVGをコピーまたはダウンロード

### プロンプト例
- `星` - シンプルな星のアイコン
- `回転する歯車` - 動きのある歯車
- `流れる水` - 流動的な水の表現
- `音楽の波` - 音楽を表す波形
- `花` - 花のアイコン

### 対応キーワード

**形状**: 星、円、四角、三角、ハート、矢印  
**動き**: 流れ、回転、波、螺旋  
**要素**: 歯車、花、稲妻、音楽

## 🚀 ローカルでの実行

### 方法1: 直接開く
```bash
open index.html
```

### 方法2: ローカルサーバー
```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server
```

## 🤝 コントリビューション

プルリクエストを歓迎します。大きな変更の場合は、まずイシューを開いて変更内容について議論してください。

## 📄 ライセンス

[MIT](LICENSE)

## 👏 クレジット

Created with ❤️ by hapx2yuki