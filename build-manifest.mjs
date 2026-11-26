/**
 * 扫描仓库文件，生成 manifest.json（供 index.html 目录树使用）
 * 用法：node build-manifest.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const skip = new Set(['.git', 'node_modules'])
const skipFiles = new Set([
  'index.html',
  'manifest.json',
  'README.md',
  'build-manifest.mjs',
])

function walk(dir, base = '') {
  const out = []
  for (const name of fs.readdirSync(dir).sort((a, b) => a.localeCompare(b, 'en'))) {
    if (skip.has(name) || name.startsWith('.')) continue
    const rel = base ? `${base}/${name}` : name
    const full = path.join(dir, name)
    const st = fs.statSync(full)
    if (st.isDirectory()) out.push(...walk(full, rel))
    else if (!skipFiles.has(name)) out.push(rel.replace(/\\/g, '/'))
  }
  return out
}

const files = walk(root)
fs.writeFileSync(path.join(root, 'manifest.json'), JSON.stringify(files, null, 2) + '\n')
console.log(`wrote manifest.json (${files.length} files)`)
