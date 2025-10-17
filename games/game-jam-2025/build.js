#!/usr/bin/env node

/**
 * Tiny Tycoon - Production Build Script
 * Based on LittleJS/examples/starter/build.js
 *
 * Usage:
 *   node build.js           # Full production build
 *   node build.js --quick   # Skip Closure Compiler (faster)
 */

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Configuration
const CONFIG = {
    sourceFiles: [
        // Try local symlink first, fallback to workspace parent directory
        fs.existsSync('LittleJS/dist/littlejs.release.js')
            ? 'LittleJS/dist/littlejs.release.js'
            : '../../LittleJS/dist/littlejs.release.js',
        'src/game.js',
    ],
    assetFiles: [
        'assets/sprites.png',
    ],
    outputDir: 'build',
    outputHTML: 'build/index.html',
    outputZip: 'build/tiny-tycoon.zip',

    // Build options
    useClosure: !process.argv.includes('--quick'),
    useUglify: true,
    createZip: true,
};

// Build steps
console.log('🎮 Tiny Tycoon - Build System Starting...\n');

// Step 1: Clean build directory
console.log('📁 Cleaning build directory...');
if (fs.existsSync(CONFIG.outputDir)) {
    fs.rmSync(CONFIG.outputDir, { recursive: true });
}
fs.mkdirSync(CONFIG.outputDir);

// Step 2: Concatenate JavaScript
console.log('🔗 Concatenating JavaScript files...');
let combinedJS = '';
for (const file of CONFIG.sourceFiles) {
    console.log(`   - ${file}`);
    combinedJS += fs.readFileSync(file, 'utf8') + '\n';
}

const tempJS = 'build/temp.js';
fs.writeFileSync(tempJS, combinedJS);
console.log(`   ✓ Combined: ${combinedJS.length} bytes\n`);

// Step 3: Minify with Closure Compiler (optional, slow but best compression)
let minifiedJS = tempJS;
if (CONFIG.useClosure) {
    console.log('⚙️  Running Closure Compiler (this takes ~30 seconds)...');
    try {
        const closureOutput = 'build/closure.js';
        execSync(`npx google-closure-compiler --js=${tempJS} --js_output_file=${closureOutput} --warning_level=QUIET`, {
            stdio: 'inherit'
        });
        minifiedJS = closureOutput;
        const closureSize = fs.readFileSync(closureOutput, 'utf8').length;
        console.log(`   ✓ Closure: ${closureSize} bytes (${Math.round(closureSize / combinedJS.length * 100)}% of original)\n`);
    } catch (error) {
        console.log('   ⚠️  Closure Compiler failed, skipping...\n');
    }
}

// Step 4: Minify with UglifyJS (fast, good compression)
if (CONFIG.useUglify) {
    console.log('🗜️  Running UglifyJS...');
    try {
        const uglifyOutput = 'build/uglify.js';
        execSync(`npx uglifyjs ${minifiedJS} -c -m -o ${uglifyOutput}`, {
            stdio: 'inherit'
        });
        const uglifySize = fs.readFileSync(uglifyOutput, 'utf8').length;
        console.log(`   ✓ UglifyJS: ${uglifySize} bytes (${Math.round(uglifySize / combinedJS.length * 100)}% of original)\n`);
        minifiedJS = uglifyOutput;
    } catch (error) {
        console.log('   ⚠️  UglifyJS failed, using unminified code...\n');
    }
}

// Step 5: Create HTML with inlined JavaScript
console.log('📄 Creating production HTML...');
const finalJS = fs.readFileSync(minifiedJS, 'utf8');
const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Tiny Tycoon - A Katamari-style business growth game">
    <meta name="author" content="Your Name">
    <title>Tiny Tycoon</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        canvas {
            display: block;
            image-rendering: pixelated;
            image-rendering: crisp-edges;
        }
    </style>
</head>
<body>
    <script>
${finalJS}
    </script>
</body>
</html>`;

fs.writeFileSync(CONFIG.outputHTML, htmlTemplate);
console.log(`   ✓ HTML: ${htmlTemplate.length} bytes\n`);

// Step 6: Copy assets
console.log('🎨 Copying assets...');
for (const asset of CONFIG.assetFiles) {
    const filename = path.basename(asset);
    const dest = `${CONFIG.outputDir}/${filename}`;
    if (fs.existsSync(asset)) {
        fs.copyFileSync(asset, dest);
        const size = fs.statSync(dest).size;
        console.log(`   - ${filename}: ${size} bytes`);
    } else {
        console.log(`   ⚠️  Missing: ${asset}`);
    }
}
console.log('');

// Step 7: Create ZIP for itch.io
if (CONFIG.createZip) {
    console.log('📦 Creating ZIP archive...');
    try {
        // Remove old ZIP if exists
        if (fs.existsSync(CONFIG.outputZip)) {
            fs.unlinkSync(CONFIG.outputZip);
        }

        // Create ZIP using bestzip (better compression than built-in)
        const buildFiles = fs.readdirSync(CONFIG.outputDir)
            .filter(f => f !== 'tiny-tycoon.zip' && !f.startsWith('temp') && !f.startsWith('closure') && !f.startsWith('uglify'))
            .map(f => `build/${f}`)
            .join(' ');

        execSync(`npx bestzip ${CONFIG.outputZip} ${buildFiles}`, {
            stdio: 'inherit'
        });

        const zipSize = fs.statSync(CONFIG.outputZip).size;
        const zipSizeMB = (zipSize / 1024 / 1024).toFixed(2);
        console.log(`   ✓ ZIP: ${zipSize} bytes (${zipSizeMB} MB)\n`);

        // Size warning
        if (zipSize > 13 * 1024 * 1024) {
            console.log('   ⚠️  WARNING: ZIP exceeds 13MB itch.io limit!\n');
        }
    } catch (error) {
        console.log('   ⚠️  ZIP creation failed\n');
    }
}

// Step 8: Build summary
console.log('═══════════════════════════════════════');
console.log('✅ Build Complete!\n');
console.log('📊 Build Summary:');
console.log(`   Source: ${combinedJS.length} bytes`);
console.log(`   Minified: ${finalJS.length} bytes`);
console.log(`   Compression: ${Math.round(finalJS.length / combinedJS.length * 100)}%`);
console.log(`   Output: ${CONFIG.outputDir}/`);
console.log('');
console.log('🚀 Next Steps:');
console.log('   1. Test: cd build && python3 -m http.server 8000');
console.log('   2. Upload: tiny-tycoon.zip to itch.io');
console.log('═══════════════════════════════════════\n');
