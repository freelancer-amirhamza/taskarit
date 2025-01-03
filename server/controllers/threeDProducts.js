const cloudinary = require('cloudinary').v2;
const { createCanvas } = require('canvas');
const { GLTFLoader } = require('three-stdlib');
const { Scene, PerspectiveCamera, WebGLRenderer } = require('three');
const Product = require('../models/Product');
const { imageUploadUtil } = require('../config/cloudinary');




const renderAndUploadGLTF = async () => {
  const loader = new GLTFLoader();

  const loadGLTF = (loader, url) => {
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (gltf) => resolve(gltf),
        undefined,
        (error) => reject(error)
      );
    });
  };
  
  // Load the GLTF model
  const scene = new Scene();

  const gltf = await loadGLTF(loader, 'my_file');
  scene.add(gltf.scene);
  
  // Set up camera
  const camera = new PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 5;

  // Set up renderer
  const canvas = createCanvas(1024, 1024);
  const renderer = new WebGLRenderer({ canvas });
  renderer.render(scene, camera);

  // Get image data from canvas
  const dataUrl = canvas.toDataURL('image/png');
  const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');

  // Upload to Cloudinary
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: 'model_image', resource_type: 'image' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
    uploadStream.end(buffer);
  });
};

const handle3DImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = 'data:' + req.file.mimetype + ';base64,' + b64;
    const result = await imageUploadUtil(url);

    // Assuming you have the GLTF file path from the request or other source
    const gltfFilePath = '/my_file';
    const gltfImageUrl = await renderAndUploadGLTF(gltfFilePath);
 
    res.json({
      success: true,
      result,
      gltfImageUrl,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: 'Something is  wrong!',
    });
  }
};

// Add a new product
const add3DProduct = async (req, res) => {
  try {
    const { image, name, description, category, price, salePrice } = req.body;

    const newProduct = new Product({
      image,
      name,
      description,
      category,
      price,
      salePrice,
    });
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something is wrong!',
    });
  }
};

module.exports = { handle3DImageUpload, add3DProduct };
