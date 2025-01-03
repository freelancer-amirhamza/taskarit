/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { addProductFormElements } from "@/config";
import { addProduct } from "@/store/product-slice";
import { useToast } from "@/hooks/use-toast";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import axios from "axios";
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { proxy, useSnapshot } from "valtio"
import { ContactShadows, Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { HexColorPicker } from "react-colorful";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CommonForm from "@/components/common/form";

const initialFormData = {
  image: null,
  name: "",
  description: "",
  category: "",
  price: "",
  salePrice: "",
};





const state = proxy({
  current: null,
  items: { laces: "#fff", mesh: "#fff", caps: "#fff", inner: "#fff", sole: "#fff", stripes: "#fff", band: "#fff", patch: "#fff" },
})

const Shoe = () => {
  const ref = useRef()
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF("/shoe.gltf")
  const [hovered, set] = useState(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.set(Math.cos(t / 4) / 8, Math.sin(t / 4) / 8, -0.2 - (1 + Math.sin(t / 1.5)) / 20)
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  useEffect((e) => {

    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="#fff-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
      return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`)
    }
  }, [hovered])

  return (
    <group
      ref={ref}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onClick={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
      <mesh receiveShadow castShadow geometry={nodes.shoe.geometry} material={materials.laces} material-color={snap.items.laces} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_1.geometry} material={materials.mesh} material-color={snap.items.mesh} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_2.geometry} material={materials.caps} material-color={snap.items.caps} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_3.geometry} material={materials.inner} material-color={snap.items.inner} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_4.geometry} material={materials.sole} material-color={snap.items.sole} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_5.geometry} material={materials.stripes} material-color={snap.items.stripes} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_6.geometry} material={materials.band} material-color={snap.items.band} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={snap.items.patch} />
    </group>
  )
};

function Picker() {
  const snap = useSnapshot(state)
  return (
    <div style={{ display: snap.current ? "block" : "none" }}>
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <h1 >{snap.current}</h1>
    </div>
  )
}



const ModelViewer = forwardRef((props, ref) => {
  const { gl, scene, camera } = useThree();

  const captureImage = () => {
    gl.render(scene, camera);
    const dataURL = gl.domElement.toDataURL('image/png');
    return dataURL;
  };

  useImperativeHandle(ref, () => ({
    captureImage,
  }));

  return (
    <>
      <ambientLight intensity={0.7} />
      <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
      <Shoe />
      <Environment preset="city" />
      <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
});





const ThreeDProductDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const { toast } = useToast();
  const modelViewerRef = useRef();






  const uploadToCloudinary = async (dataURL) => {
    const formData = new FormData();
    formData.append('file', dataURL);
    formData.append('upload_preset', '3DImageUpload'); // Replace with your upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dmh7euix6/image/upload`, // Replace with your cloud name
        formData
      );
      console.log('Uploaded image URL:', response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const imageDataURL = modelViewerRef.current.captureImage();
    const uploadedImageUrl = await uploadToCloudinary(imageDataURL);
  
    dispatch(
      addProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setOpen(false)
        setFormData(initialFormData);
        toast({
          title: 'The Product has been added successfully',
        });
      }
    });
  };
  




  return (
    <Dialog open={open} onOpenChange={() => { setOpen() }}>
      <DialogContent className=" h-full max-sm:overflow-scroll md:p-12 p-2 max-w-[100vw] sm:max-w-[90vw] lg:max-w-[80vw] ">
        <div className="grid    gap-8  md:grid-cols-2">
          <div className="relative overflow-hidden rounded-lg ">
            <div className="w-full canvas max-w-md mx-auto h-full ">
              <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
                <ModelViewer ref={modelViewerRef} />
              </Canvas>
              <Picker />
            </div>
          </div>
          <div className="">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              formControls={addProductFormElements}
              onSubmit={onSubmit}
            // isBtnDisabled={!isFormValid()}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThreeDProductDialog;