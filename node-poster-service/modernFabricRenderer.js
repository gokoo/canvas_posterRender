const fabric = require('fabric/node');

class ModernFabricRenderer {
  constructor(fabricInstance) {
    if (!fabricInstance || !fabricInstance.StaticCanvas) {
      throw new Error('A valid fabric instance was not provided to the renderer.');
    }
    this.fabric = fabricInstance;
  }

  async render(template, data) {
    const canvas = new this.fabric.StaticCanvas(null, {
      width: template.width || 1080,
      height: template.height || 1920,
      enableRetinaScaling: false,
      renderOnAddRemove: false,
      skipOffscreen: false
    });

    return new Promise((resolve, reject) => {
      try {
        // 手动添加对象而不是使用 loadFromJSON
        if (template.objects && Array.isArray(template.objects)) {
          template.objects.forEach(objData => {
            let obj;
            
            switch (objData.type) {
              case 'text':
                obj = new this.fabric.Text(objData.text || '', {
                  left: objData.left || 0,
                  top: objData.top || 0,
                  fontSize: objData.fontSize || 16,
                  fill: objData.fill || '#000000',
                  fontFamily: objData.fontFamily || 'Arial',
                  textAlign: objData.textAlign || 'left',
                  originX: objData.originX || 'left',
                  originY: objData.originY || 'top',
                  custom: objData.custom
                });
                break;
                
              case 'rect':
                obj = new this.fabric.Rect({
                  left: objData.left || 0,
                  top: objData.top || 0,
                  width: objData.width || 100,
                  height: objData.height || 100,
                  fill: objData.fill || '#000000',
                  rx: objData.rx || 0,
                  ry: objData.ry || 0
                });
                break;
                
              case 'circle':
                obj = new this.fabric.Circle({
                  left: objData.left || 0,
                  top: objData.top || 0,
                  radius: objData.radius || 50,
                  fill: objData.fill || '#000000'
                });
                break;
                
              default:
                console.log(`⚠️ Unsupported object type: ${objData.type}`);
                return;
            }
            
            if (obj) {
              canvas.add(obj);
            }
          });
        }
        
        (async () => {
          try {
            // 处理占位符替换
            await Promise.all(canvas.getObjects().map(async (obj) => {
              const placeholder = obj.custom?.placeholder;
              if (placeholder && data[placeholder]) {
                const value = data[placeholder];
                if (obj.type === 'text' || obj.type === 'Text') {
                  obj.set('text', value);
                }
              }
            }));
            
            canvas.renderAll();
            
            const stream = canvas.createPNGStream();
            const chunks = [];
            stream.on('data', (chunk) => chunks.push(chunk));
            stream.on('end', () => resolve(Buffer.concat(chunks)));
            stream.on('error', reject);
            
          } catch (err) {
            reject(err);
          }
        })();
        
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = ModernFabricRenderer;