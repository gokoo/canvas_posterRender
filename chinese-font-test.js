// 新架构中文字体测试 - 使用POST /render接口和Fabric.js模板
const axios = require('axios');
const fs = require('fs');

console.log('🧪 开始测试新架构的中文字体渲染...');

// 服务器地址
const SERVER_URL = 'http://localhost:3000';

// 创建Fabric.js模板，包含中文字体测试和Unsplash背景图
const template = {
  version: "5.3.0",
  width: 1080,
  height: 1920,
  objects: [
    // 背景图片 - 使用Unsplash开源图片
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center",
      left: 0,
      top: 0,
      width: 1080,
      height: 1920,
      scaleX: 1,
      scaleY: 1,
      custom: {
        placeholder: "background_image"
      }
    },
    // 半透明遮罩
    {
      type: "rect",
      left: 0,
      top: 0,
      width: 1080,
      height: 1920,
      fill: "rgba(0, 0, 0, 0.4)"
    },
    // 主标题 - 中英文混合
    {
      type: "text",
      text: "默认标题",
      left: 540,
      top: 200,
      fontSize: 48,
      fill: "#ffffff",
      fontFamily: "Arial",
      fontWeight: "bold",
      textAlign: "center",
      originX: "center",
      originY: "center",
      custom: {
        placeholder: "main_title"
      }
    },
    // 副标题 - 中文
    {
      type: "text", 
      text: "副标题",
      left: 540,
      top: 280,
      fontSize: 28,
      fill: "#f0f0f0",
      fontFamily: "Arial",
      textAlign: "center",
      originX: "center",
      originY: "center",
      custom: {
        placeholder: "subtitle"
      }
    },
    // 内容区域背景
    {
      type: "rect",
      left: 60,
      top: 400,
      width: 960,
      height: 1100,
      fill: "rgba(255, 255, 255, 0.95)",
      rx: 20,
      ry: 20
    },
    // 测试标题
    {
      type: "text",
      text: "Font Rendering Test Report",
      left: 540,
      top: 480,
      fontSize: 36,
      fill: "#333333",
      fontFamily: "Arial",
      fontWeight: "bold",
      textAlign: "center",
      originX: "center",
      originY: "center"
    },
    // 系统字体测试
    {
      type: "text",
      text: "系统字体测试",
      left: 100,
      top: 560,
      fontSize: 24,
      fill: "#2196F3",
      fontFamily: "Arial",
      fontWeight: "bold"
    },
    {
      type: "text",
      text: "测试内容",
      left: 120,
      top: 600,
      fontSize: 20,
      fill: "#333333",
      fontFamily: "Arial",
      custom: {
        placeholder: "system_font_test"
      }
    },
    // 中文字符测试
    {
      type: "text",
      text: "中文字符测试",
      left: 100,
      top: 700,
      fontSize: 24,
      fill: "#4CAF50",
      fontFamily: "Arial",
      fontWeight: "bold"
    },
    {
      type: "text",
      text: "中文内容",
      left: 120,
      top: 740,
      fontSize: 20,
      fill: "#333333",
      fontFamily: "Arial",
      custom: {
        placeholder: "chinese_test"
      }
    },
    // 繁体中文测试
    {
      type: "text",
      text: "繁體中文測試",
      left: 100,
      top: 840,
      fontSize: 24,
      fill: "#FF9800",
      fontFamily: "Arial",
      fontWeight: "bold"
    },
    {
      type: "text",
      text: "繁体内容",
      left: 120,
      top: 880,
      fontSize: 20,
      fill: "#333333",
      fontFamily: "Arial",
      custom: {
        placeholder: "traditional_chinese_test"
      }
    },
    // 特殊汉字测试
    {
      type: "text",
      text: "特殊漢字測試",
      left: 100,
      top: 980,
      fontSize: 24,
      fill: "#E91E63",
      fontFamily: "Arial",
      fontWeight: "bold"
    },
    {
      type: "text",
      text: "特殊汉字",
      left: 120,
      top: 1020,
      fontSize: 20,
      fill: "#333333",
      fontFamily: "Arial",
      custom: {
        placeholder: "special_chars_test"
      }
    },
    // 商业内容测试
    {
      type: "text",
      text: "商業內容測試",
      left: 100,
      top: 1120,
      fontSize: 24,
      fill: "#9C27B0",
      fontFamily: "Arial",
      fontWeight: "bold"
    },
    {
      type: "text",
      text: "商业信息",
      left: 120,
      top: 1160,
      fontSize: 18,
      fill: "#333333",
      fontFamily: "Arial",
      custom: {
        placeholder: "business_info"
      }
    },
    // 数字和符号测试
    {
      type: "text",
      text: "數字符號測試",
      left: 100,
      top: 1280,
      fontSize: 24,
      fill: "#607D8B",
      fontFamily: "Arial",
      fontWeight: "bold"
    },
    {
      type: "text",
      text: "符号内容",
      left: 120,
      top: 1320,
      fontSize: 18,
      fill: "#333333",
      fontFamily: "Arial",
      custom: {
        placeholder: "symbols_test"
      }
    },
    // 底部信息
    {
      type: "text",
      text: "渲染引擎：Node.js Fabric.js + Docker",
      left: 540,
      top: 1450,
      fontSize: 16,
      fill: "#666666",
      fontFamily: "Arial",
      textAlign: "center",
      originX: "center",
      originY: "center"
    },
    {
      type: "text",
      text: "测试时间",
      left: 540,
      top: 1480,
      fontSize: 16,
      fill: "#666666",
      fontFamily: "Arial",
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
  background_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center",
  main_title: "中文字体渲染测试 Font Rendering Test",
  subtitle: "验证Docker环境中的中文字体支持",
  system_font_test: "Arial: Hello World 你好世界 123\nSans-serif: Hello World 你好世界 123",
  chinese_test: "简体中文：北京市朝阳区\n中文测试：上海市浦东新区",
  traditional_chinese_test: "繁體中文：臺灣省臺北市\n港澳繁體：香港特別行政區",
  special_chars_test: "特殊漢字：龘靐齉爨癵驫麤\n生僻字：䶹㲋㼳㱩㠪㹴㶂",
  business_info: "公司：北京科技有限公司\n电话：400-123-4567\n邮箱：contact@example.com\n网站：www.company.com.cn",
  symbols_test: "标点：，。！？；：\"\" \n符号：@ # $ % & * + - = \n货币：¥ $ € £ ¢ ₹ ₩ ₽",
  test_time: `测试时间：${new Date().toLocaleString('zh-CN')}`
};

// 测试函数
async function testChineseFontRendering() {
  try {
    console.log('📡 调用渲染服务...');
    
    const response = await axios.post(`${SERVER_URL}/render`, {
      template: template,
      data: data
    }, {
      responseType: 'arraybuffer', // 接收二进制数据
      timeout: 30000, // 30秒超时
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ 渲染成功！');
    console.log(`📊 状态码: ${response.status}`);
    console.log(`📏 图片大小: ${response.data.length} bytes`);
    console.log(`⏱️ 渲染时间: ${response.headers['x-render-time'] || 'N/A'}`);
    
    // 保存图片
    const outputPath = 'chinese-font-test-output.png';
    fs.writeFileSync(outputPath, response.data);
    
    console.log(`💾 图片已保存: ${outputPath}`);
    console.log('');
    console.log('🎯 测试要点:');
    console.log('✓ 中英文混合标题');
    console.log('✓ 简体中文字符渲染');
    console.log('✓ 繁体中文字符渲染'); 
    console.log('✓ 特殊汉字和生僻字');
    console.log('✓ 商业内容（公司信息）');
    console.log('✓ 数字、符号、标点符号');
    console.log('✓ Unsplash背景图片加载');
    console.log('✓ Fabric.js模板解析');
    console.log('✓ 占位符动态替换');
    console.log('');
    console.log('🔍 检查要点:');
    console.log('- 中文字符是否正常显示（不是Unicode方框）');
    console.log('- 背景图片是否正确加载');
    console.log('- 文字布局是否正确');
    console.log('- 颜色和字体是否符合预期');
    
    return true;
    
  } catch (error) {
    console.error('❌ 测试失败:');
    
    if (error.response) {
      console.error(`状态码: ${error.response.status}`);
      console.error(`错误信息: ${error.response.data}`);
      
      if (error.response.status === 500) {
        console.error('');
        console.error('可能的问题:');
        console.error('- 服务器内部错误');
        console.error('- Fabric.js渲染失败');
        console.error('- 图片加载失败');
        console.error('- 字体渲染问题');
      }
    } else if (error.request) {
      console.error('网络错误: 无法连接到服务器');
      console.error('请确保服务器在 http://localhost:3000 运行');
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
  console.log('🚀 启动中文字体渲染测试...');
  console.log('');
  
  // 检查服务器
  const serverOk = await checkServerHealth();
  if (!serverOk) {
    process.exit(1);
  }
  
  console.log('');
  
  // 执行测试
  const testOk = await testChineseFontRendering();
  
  console.log('');
  console.log(testOk ? '🎉 测试完成！' : '💥 测试失败！');
  
  process.exit(testOk ? 0 : 1);
}

// 运行测试
main().catch(console.error);