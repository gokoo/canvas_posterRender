const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const winston = require('winston');
const fabric = require('fabric/node');
const fs = require('fs');
const path = require('path');
const ModernFabricRenderer = require('./modernFabricRenderer');

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 配置日志
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// 动态字体注册函数
function registerFonts() {
  const fontsDir = path.join(__dirname, 'fonts');
  
  if (!fs.existsSync(fontsDir)) {
    logger.info('Fonts directory not found, skipping font registration.');
    return;
  }

  logger.info('Scanning for custom fonts...');
  const fontFiles = fs.readdirSync(fontsDir);

  fontFiles.forEach(file => {
    if (file.toLowerCase().endsWith('.ttf') || file.toLowerCase().endsWith('.otf')) {
      const fontPath = path.join(fontsDir, file);
      const familyName = path.basename(file, path.extname(file));
      
      try {
        // 使用fabric的API来注册字体
        fabric.nodeCanvas.registerFont(fontPath, { family: familyName });
        logger.info(`✅ Successfully registered font: '${familyName}' from ${file}`);
      } catch (err) {
        logger.error(`❌ Failed to register font: ${file}`, err);
      }
    }
  });
}

// 启动时注册字体
registerFonts();

// 中间件
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 请求日志中间件
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    service: 'node-poster-renderer',
    description: 'Stateless poster rendering engine'
  });
});

// 核心渲染端点 - 唯一的业务API
app.post('/render', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { template, data } = req.body;
    
    // 基础参数验证
    if (!template) {
      return res.status(400).json({
        success: false,
        error: 'Template is required'
      });
    }
    
    if (!data) {
      return res.status(400).json({
        success: false,
        error: 'Data is required'
      });
    }
    
    logger.info('Render request received', {
      templateSize: JSON.stringify(template).length,
      dataKeys: Object.keys(data),
      hasObjects: !!template.objects
    });
    
    // 渲染图片 - 使用现代Fabric.js方案
    const renderer = new ModernFabricRenderer();
    const buffer = await renderer.render(template, data);
    
    const renderTime = Date.now() - startTime;
    logger.info('Render completed successfully', {
      renderTime,
      bufferSize: buffer.length
    });
    
    // 直接返回PNG二进制流
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('X-Render-Time', `${renderTime}ms`);
    res.send(buffer);
    
  } catch (error) {
    const renderTime = Date.now() - startTime;
    logger.error('Render error:', error);
    
    // 返回JSON错误信息
    res.status(500).json({
      success: false,
      error: error.message || 'Render failed',
      renderTime: `${renderTime}ms`
    });
  }
});

// 404处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'POST /render - Main rendering endpoint',
      'GET /health - Health check'
    ]
  });
});

// 错误处理中间件
app.use((error, req, res, next) => {
  logger.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 启动服务器
app.listen(PORT, () => {
  logger.info(`🚀 Node.js Poster Rendering Engine started on port ${PORT}`);
  logger.info(`📋 Health check: http://localhost:${PORT}/health`);
  logger.info(`🎨 Render endpoint: POST http://localhost:${PORT}/render`);
  logger.info(`📖 Service: Stateless rendering engine for Fabric.js templates`);
});

// 优雅关闭
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

module.exports = app;