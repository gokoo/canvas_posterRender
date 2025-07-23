// 增强版中文字体测试 - 包含字号变化、Emoji、线条、形状填充
const axios = require('axios');
const fs = require('fs');

console.log('🎨 开始增强版中文字体渲染测试...');

// 服务器地址
const SERVER_URL = 'http://localhost:3001';

// 创建增强版Fabric.js模板
const template = {
  version: "5.3.0",
  width: 1080,
  height: 1920,
  objects: [
// 纯色背景替代网络图片
{
 type: "rect",
 left: 0,
 top: 0,
 width: 1080,
 height: 1920,
 fill: {
   type: "linear",
   coords: { x1: 0, y1: 0, x2: 0, y2: 1920 },
   colorStops: [
     { offset: 0, color: "#667eea" },
     { offset: 1, color: "#764ba2" }
   ]
 }
},

    // 装饰性圆形形状
    {
      type: "circle",
      left: 100,
      top: 100,
      radius: 80,
      fill: "rgba(255, 255, 255, 0.2)",
      stroke: "#ffffff",
      strokeWidth: 3
    },
    {
      type: "circle",
      left: 900,
      top: 150,
      radius: 60,
      fill: "rgba(255, 255, 255, 0.15)",
      stroke: "#ffffff",
      strokeWidth: 2
    },

    // 装饰性矩形
    {
      type: "rect",
      left: 50,
      top: 1700,
      width: 120,
      height: 80,
      fill: "rgba(255, 255, 255, 0.1)",
      rx: 10,
      ry: 10,
      angle: 15
    },

    // 主标题 - 超大字号
    {
      type: "text",
      text: "🎨 Font Test 字体测试",
      left: 540,
      top: 200,
      fontSize: 54,
      fill: "#ffffff",
      fontFamily: "SourceHanSansCN-Bold",
        
      textAlign: "center",
      originX: "center",
      originY: "center",
      shadow: {
        color: "rgba(0,0,0,0.5)",
        blur: 10,
        offsetX: 2,
        offsetY: 2
      }
    },

    // 副标题 - 大字号
    {
      type: "text",
      text: "Enhanced Testing ✨ 增强测试",
      left: 540,
      top: 280,
      fontSize: 32,
      fill: "#f0f0f0",
      fontFamily: "SourceHanSansCN-Bold",
      textAlign: "center",
      originX: "center",
      originY: "center"
    },

    // 内容区域背景
    {
      type: "rect",
      left: 60,
      top: 360,
      width: 960,
      height: 1300,
      fill: "rgba(255, 255, 255, 0.95)",
      rx: 20,
      ry: 20,
      shadow: {
        color: "rgba(0,0,0,0.3)",
        blur: 15,
        offsetX: 0,
        offsetY: 5
      }
    },

    // 字号测试标题
    {
      type: "text",
      text: "📏 字号测试 Font Sizes",
      left: 540,
      top: 420,
      fontSize: 28,
      fill: "#2196F3",
      fontFamily: "SourceHanSansCN-Bold",
      fontWeight: "regular",
      textAlign: "center",
      originX: "center",
      originY: "center"
    },

    // 小字号测试 (14px)
    {
      type: "text",
      text: "小字号 14px: Hello 你好世界 123 😊",
      left: 100,
      top: 470,
      fontSize: 14,
      fill: "#333333",
      fontFamily: "SourceHanSansCN-Bold"
    },

    // 中字号测试 (18px)
    {
      type: "text",
      text: "中字号 18px: Hello 你好世界 123 😊",
      left: 100,
      top: 500,
      fontSize: 18,
      fill: "#333333",
      fontFamily: "SourceHanSansCN-Bold"
    },

    // 大字号测试 (24px)
    {
      type: "text",
      text: "大字号 24px: Hello 你好世界 123 😊",
      left: 100,
      top: 540,
      fontSize: 24,
      fill: "#333333",
      fontFamily: "SourceHanSansCN-Bold",
      fontWeight: "regular"
    },

    // 超大字号测试 (36px)
    {
      type: "text",
      text: "超大 36px: 你好 😊",
      left: 100,
      top: 590,
      fontSize: 36,
      fill: "#FF5722",
      fontFamily: "SourceHanSansCN-Bold",
      fontWeight: "regular"
    },

    // 分隔线
    {
      type: "line",
      x1: 100,
      y1: 650,
      x2: 980,
      y2: 650,
      stroke: "#E0E0E0",
      strokeWidth: 2
    },

    // Emoji测试标题
    {
      type: "text",
      text: "😀 Emoji 表情测试",
      left: 540,
      top: 690,
      fontSize: 28,
      fill: "#4CAF50",
      fontFamily: "SourceHanSansCN-Bold",
      fontWeight: "regular",
      textAlign: "center",
      originX: "center",
      originY: "center"
    },

    // 表情类Emoji
    {
      type: "text",
      text: "表情: 😀😃😄😁😆😊😇🤣😂",
      left: 100,
      top: 740,
      fontSize: 24,
      fill: "#333333",
      fontFamily: "SourceHanSansCN-Bold"
    },

    // 手势类Emoji
    {
      type: "text",
      text: "手势: 👍👎✌️🤞🤟👌🤏✊👊",
      left: 100,
      top: 780,
      fontSize: 24,
      fill: "#333333",
      fontFamily: "SourceHanSansCN-Bold"
    },

    // 符号类Emoji
    {
      type: "text",
      text: "符号: ⭐✨💫⚡🔥💎💰🏆",
      left: 100,
      top: 820,
      fontSize: 24,
      fill: "#333333",
      fontFamily: "SourceHanSansCN-Bold"
    },

    // 装饰线条
    {
      type: "line",
      x1: 100,
      y1: 870,
      x2: 980,
      y2: 870,
      stroke: "#FF9800",
      strokeWidth: 3,
      strokeDashArray: [10, 5]
    },

    // 形状测试标题
    {
      type: "text",
      text: "🔷 形状和线条测试",
      left: 540,
      top: 910,
      fontSize: 28,
      fill: "#9C27B0",
      fontFamily: "SourceHanSansCN-Bold",
      fontWeight: "regular",
      textAlign: "center",
      originX: "center",
      originY: "center"
    },

    // 彩色圆形
    {
      type: "circle",
      left: 150,
      top: 980,
      radius: 25,
      fill: "#F44336"
    },
    {
      type: "circle",
      left: 220,
      top: 980,
      radius: 25,
      fill: "#2196F3"
    },
    {
      type: "circle",
      left: 290,
      top: 980,
      radius: 25,
      fill: "#4CAF50"
    },

    // 彩色矩形
    {
      type: "rect",
      left: 380,
      top: 955,
      width: 50,
      height: 50,
      fill: "#FF9800",
      rx: 5,
      ry: 5
    },
    {
      type: "rect",
      left: 450,
      top: 955,
      width: 50,
      height: 50,
      fill: "#E91E63",
      rx: 5,
      ry: 5,
      angle: 45
    },

    // 描边形状
    {
      type: "circle",
      left: 550,
      top: 980,
      radius: 25,
      fill: "transparent",
      stroke: "#673AB7",
      strokeWidth: 4
    },
    {
      type: "rect",
      left: 620,
      top: 955,
      width: 50,
      height: 50,
      fill: "transparent",
      stroke: "#795548",
      strokeWidth: 3,
      rx: 10,
      ry: 10
    },

    // 装饰性线条
    {
      type: "line",
      x1: 100,
      y1: 1050,
      x2: 300,
      y2: 1050,
      stroke: "#F44336",
      strokeWidth: 8
    },
    {
      type: "line",
      x1: 320,
      y1: 1050,
      x2: 520,
      y2: 1050,
      stroke: "#2196F3",
      strokeWidth: 6,
      strokeDashArray: [15, 10]
    },
    {
      type: "line",
      x1: 540,
      y1: 1050,
      x2: 740,
      y2: 1050,
      stroke: "#4CAF50",
      strokeWidth: 4,
      strokeDashArray: [5, 5, 15, 5]
    },

    // 中文测试区域
    {
      type: "text",
      text: "🇨🇳 中文字符测试",
      left: 540,
      top: 1120,
      fontSize: 28,
      fill: "#FF5722",
      fontFamily: "SourceHanSansCN-Bold",
      fontWeight: "regular",
      textAlign: "center",
      originX: "center",
      originY: "center"
    },

    // 简繁体混合
    {
      type: "text",
      text: "简体：北京上海广州深圳 🏙️\n繁體：臺北香港澳門新加坡 🌏",
      left: 100,
      top: 1170,
      fontSize: 20,
      fill: "#333333",
      fontFamily: "SourceHanSansCN-Bold",
      lineHeight: 1.5
    },

    // 特殊字符
    {
      type: "text",
      text: "生僻字：龘靐齉爨癵驫麤 📚\n符号：①②③④⑤ ★☆♠♥♦♣ ♪♫♬ 💫",
      left: 100,
      top: 1240,
      fontSize: 18,
      fill: "#333333",
      fontFamily: "SourceHanSansCN-Bold",
      lineHeight: 1.5
    },

    // 底部装饰
    {
      type: "rect",
      left: 60,
      top: 1700,
      width: 960,
      height: 150,
      fill: {
        type: "linear",
        coords: { x1: 0, y1: 0, x2: 0, y2: 150 },
        colorStops: [
          { offset: 0, color: "rgba(33, 150, 243, 0.8)" },
          { offset: 1, color: "rgba(233, 30, 99, 0.8)" }
        ]
      },
      rx: 20,
      ry: 20
    },

    // 底部文字
    {
      type: "text",
      text: "🐳 Docker Canvas Rendering Test 🎨\n渲染引擎测试完成 ✅",
      left: 540,
      top: 1775,
      fontSize: 24,
      fill: "#ffffff",
      fontFamily: "SourceHanSansCN-Bold",
      fontWeight: "regular",
      textAlign: "center",
      originX: "center",
      originY: "center",
      lineHeight: 1.4,
      shadow: {
        color: "rgba(0,0,0,0.5)",
        blur: 5,
        offsetX: 1,
        offsetY: 1
      }
    },

    // 时间戳
    {
      type: "text",
      text: "placeholder_time",
      left: 540,
      top: 1820,
      fontSize: 16,
      fill: "#ffffff",
      fontFamily: "SourceHanSansCN-Bold",
      textAlign: "center",
      originX: "center",
      originY: "center",
      custom: {
        placeholder: "test_time"
      }
    }
  ]
};

// 动态数据
const data = {
  test_time: `⏰ 测试时间：${new Date().toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Shanghai'
  })}`
};

// 测试函数
async function testEnhancedFontRendering() {
  try {
    console.log('📡 调用渲染服务...');

    const response = await axios.post(`${SERVER_URL}/render`, {
      template: template,
      data: data
    }, {
      responseType: 'arraybuffer',
      timeout: 60000, // 增加超时时间
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ 渲染成功！');
    console.log(`📊 状态码: ${response.status}`);
    console.log(`📏 图片大小: ${response.data.length} bytes`);
    console.log(`⏱️ 渲染时间: ${response.headers['x-render-time'] || 'N/A'}`);

    // 保存图片
    const outputPath = 'enhanced-font-test-output.png';
    fs.writeFileSync(outputPath, response.data);

    console.log(`💾 图片已保存: ${outputPath}`);
    console.log('');
    console.log('🎯 增强测试要点:');
    console.log('✓ 多种字号大小 (14px - 54px)');
    console.log('✓ 丰富的 Emoji 表情渲染');
    console.log('✓ 几何形状填充 (圆形、矩形)');
    console.log('✓ 多样线条样式 (实线、虚线、点线)');
    console.log('✓ 渐变背景和阴影效果');
    console.log('✓ 中英文混合排版');
    console.log('✓ 特殊字符和生僻字');
    console.log('✓ 彩色图形组合');
    console.log('');

    return true;

  } catch (error) {
    console.error('❌ 测试失败:');

    if (error.response) {
      console.error(`状态码: ${error.response.status}`);
      console.error(`错误信息: ${error.response.data}`);
    } else if (error.request) {
      console.error('网络错误: 无法连接到服务器');
      console.error('请确保服务器在 http://localhost:3001 运行');
    } else {
      console.error('请求配置错误:', error.message);
    }

    return false;
  }
}

// 健康检查
async function checkServerHealth() {
  try {
    console.log('🔍 检查服务器状态...');
    const response = await axios.get(`${SERVER_URL}/health`, { timeout: 5000 });
    console.log('✅ 服务器正常运行');
    console.log(`📋 服务信息: ${response.data.service} v${response.data.version}`);
    console.log(`📅 服务时间: ${response.data.timestamp}`);
    return true;
  } catch (error) {
    console.error('❌ 服务器不可用');
    console.error('请先启动服务器: npm start 或 docker-compose up');
    return false;
  }
}

// 主函数
async function main() {
  console.log('🚀 启动增强版字体渲染测试...');
  console.log('');

  // 检查服务器
  const serverOk = await checkServerHealth();
  if (!serverOk) {
    process.exit(1);
  }

  console.log('');

  // 执行测试
  const testOk = await testEnhancedFontRendering();

  console.log('');
  console.log(testOk ? '🎉 增强测试完成！' : '💥 增强测试失败！');

  process.exit(testOk ? 0 : 1);
}

// 运行测试
main().catch(console.error);