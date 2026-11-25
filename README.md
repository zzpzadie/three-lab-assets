# three-lab-assets

`three-lab` 的静态资源仓库（方案 B）。模型 / HDR / 缩略图 / 天空盒与业务代码分离，通过 GitHub Pages 以完整 URL 访问。

参考：[3d-file-server](https://z2586300277.github.io/3d-file-server/)

## 目录

```
three-lab-assets/
  models/quit.glb
  models/flower.glb
  models/butterfly.glb
  hdr/grasslands_sunset_4k.hdr
  hdr/qwantani_dusk_2_puresky_4k.hdr
  thumbs/*.jpg
  files/sky/skyBox0/{1..6}.png
```

## 部署到 GitHub Pages

```bash
cd E:\project\more\three-lab-assets
git init
git add .
git commit -m "chore: init three-lab assets"
# 在 GitHub 新建仓库 three-lab-assets 后：
git remote add origin https://github.com/<你的用户名>/three-lab-assets.git
git branch -M main
git push -u origin main
```

仓库 **Settings → Pages**：

- Source: Deploy from a branch
- Branch: `main` / `/ (root)`

部署后基址（按用户名替换）：

```
https://<你的用户名>.github.io/three-lab-assets/
```

## 在 three-lab 中引用

```ts
// src/config/assets.ts
export const FILE_HOST = 'https://<你的用户名>.github.io/three-lab-assets/'

// 模型
loader.load(FILE_HOST + 'models/quit.glb', ...)

// HDR
hdriLoader.load(FILE_HOST + 'hdr/grasslands_sunset_4k.hdr', ...)

// 天空盒
const urls = [1, 2, 3, 4, 5, 6].map(
  (n) => FILE_HOST + `files/sky/skyBox0/${n}.png`,
)

// 封面（也可继续放 three-lab/public/thumbs + BASE_URL）
thumb: FILE_HOST + 'thumbs/01-basics.jpg'
```

## 本地预览

用任意静态服务器打开本目录即可，例如：

```bash
npx serve .
```
