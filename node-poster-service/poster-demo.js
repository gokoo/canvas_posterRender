// 创建1080*1920的宣传单页演示
const { createCanvas } = require('canvas');
const fs = require('fs');

console.log('开始创建宣传单页...');

// 创建1080x1920的画布（手机竖屏比例）
const canvas = createCanvas(1080, 1920);
const ctx = canvas.getContext('2d');

// 1. 创建渐变背景（模拟美丽的天空）
const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
gradient.addColorStop(0, '#ff7e5f');    // 橙色
gradient.addColorStop(0.5, '#feb47b');  // 浅橙色
gradient.addColorStop(1, '#ff6b9d');    // 粉色
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 1080, 1920);

// 2. 添加装饰性几何图形
ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
ctx.beginPath();
ctx.arc(200, 300, 150, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
ctx.beginPath();
ctx.arc(800, 500, 200, 0, Math.PI * 2);
ctx.fill();

// 3. 主标题
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 64px Arial';
ctx.textAlign = 'center';
ctx.fillText('WELCOME TO', 540, 400);

ctx.font = 'bold 80px Arial';
ctx.fillText('OUR EVENT', 540, 500);

// 4. 副标题
ctx.font = '36px Arial';
ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
ctx.fillText('Join us for an amazing experience', 540, 580);

// 5. 特色文字块
ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
ctx.fillRect(80, 700, 920, 200);

ctx.fillStyle = '#ffffff';
ctx.font = '32px Arial';
ctx.textAlign = 'left';
ctx.fillText('✨ Premium Experience', 120, 750);
ctx.fillText('🎯 Professional Service', 120, 800);
ctx.fillText('🚀 Innovation First', 120, 850);

// 6. 创建简单的二维码图案
const qrSize = 200;
const qrX = 80;
const qrY = 1000;

// 二维码背景
ctx.fillStyle = '#ffffff';
ctx.fillRect(qrX, qrY, qrSize, qrSize);

// 二维码图案（简化版）
ctx.fillStyle = '#000000';
const blockSize = 8;
for (let i = 0; i < qrSize / blockSize; i++) {
    for (let j = 0; j < qrSize / blockSize; j++) {
        // 创建随机的二维码图案
        if ((i + j) % 3 === 0 || (i * j) % 5 === 0) {
            ctx.fillRect(qrX + i * blockSize, qrY + j * blockSize, blockSize, blockSize);
        }
    }
}

// 二维码边框
ctx.strokeStyle = '#000000';
ctx.lineWidth = 4;
ctx.strokeRect(qrX, qrY, qrSize, qrSize);

// 7. 二维码说明文字
ctx.fillStyle = '#ffffff';
ctx.font = '28px Arial';
ctx.textAlign = 'left';
ctx.fillText('Scan QR Code', qrX + 250, qrY + 50);
ctx.font = '24px Arial';
ctx.fillText('for more info', qrX + 250, qrY + 80);

// 8. 联系信息
ctx.font = '30px Arial';
ctx.textAlign = 'center';
ctx.fillText('📞 +86 123-4567-8890', 540, qrY + 150);
ctx.fillText('📧 hello@example.com', 540, qrY + 200);

// 9. 底部装饰和网址
ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
ctx.fillRect(0, 1700, 1080, 220);

ctx.fillStyle = '#ffffff';
ctx.font = 'bold 36px Arial';
ctx.fillText('www.example.com', 540, 1760);

ctx.font = '28px Arial';
ctx.fillText('Follow us for updates!', 540, 1820);

// 10. 社交媒体图标（用文字符号代替）
ctx.font = '40px Arial';
ctx.fillText('📱 💬 📸', 540, 1880);

// 保存图片
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('poster-demo-output.png', buffer);

console.log('✅ 宣传单页创建完成！文件保存为 poster-demo-output.png');
console.log('📐 尺寸: 1080x1920 像素');
console.log('🎨 包含: 渐变背景、标题、特色列表、二维码、联系信息');