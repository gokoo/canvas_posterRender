const fabric = require('fabric/node');

class ModernFabricRenderer {
  // ... 内部代码和之前一样，无需改动 ...
  async render(template, data) {
    console.log('🎨 Starting a new render job...');
    const canvas = new fabric.StaticCanvas(null, {
      width: template.width || 1080,
      height: template.height || 1920,
    });
    console.log(`✅ Canvas created: ${canvas.width}x${canvas.height}`);
    return new Promise((resolve, reject) => {
      canvas.loadFromJSON(template, () => {
        (async () => {
          try {
            await Promise.all(canvas.getObjects().map(async (obj) => {
              const placeholder = obj.custom?.placeholder;
              if (placeholder && data[placeholder]) {
                const value = data[placeholder];
                if (obj.type.includes('text')) {
                  obj.set('text', value);
                } else if (obj.type === 'image') {
                  await new Promise((imgResolve) => {
                    fabric.Image.fromURL(value, (img) => {
                      if (img) obj.setElement(img.getElement());
                      imgResolve();
                    }, { crossOrigin: 'anonymous' });
                  });
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
      });
    });
  }
}
module.exports = ModernFabricRenderer;