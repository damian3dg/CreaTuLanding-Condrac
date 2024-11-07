// uploadData.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig.js";


const ropaItem = [
    { 
      nombre: "Camiseta Básica", 
        precio: 19.99, 
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg1IxaLwy7-jAyAF287xwkptjCT4zWOBcfOw&s", 
        categoria: "remeras", 
        descripcion: "Camiseta cómoda para uso diario",
        stock: 10
      },
      { 
          nombre: "Jeans Clásicos", 
        precio: 49.99, 
        imagen: "https://admin.deloscojones.com.ar/Content/UploadDirectory/Products/627/image_df5ef016-0ba0-499b-9b76-d8c0c03d100b.jpg", 
        categoria: "pantalones", 
        descripcion: "Jeans duraderos de estilo clásico",
        stock: 15
      },
      { 
          nombre: "Remera entrenamiento", 
        precio: 99.99, 
        imagen: "https://i.pinimg.com/736x/0c/41/a3/0c41a30d78c4f317458a94c5a290b0e3.jpg", 
        categoria: "remeras", 
        descripcion: "Remera para entrenar a diario",
        stock: 5
      },
      { 
       
          nombre: "Vestido Elegante", 
        precio: 79.99, 
        imagen: "https://dcdn.mitiendanube.com/stores/932/399/products/m3711261-574ebf22d4352684cc16938275294831-1024-1024.jpeg",
        categoria: "remeras", 
        descripcion: "Vestido perfecto para ocasiones especiales",
        stock: 8
      },
      { 
       
          nombre: "Sudadera con Capucha", 
        precio: 39.99, 
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-jgLMde7x84t4II3UNBKczuy5gAv83IRywg&s", 
        categoria: "remeras", 
        descripcion: "Sudadera cálida y cómoda con capucha",
        stock: 20
      },
      { 
        
        nombre: "Zapatilla Deportivas", 
        precio: 59.99, 
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtQ50yMxWm49wj03HVGytfajfUJM-U_zkniQ&s", 
        categoria: "zapatillas", 
        descripcion: "Zapatillas ideales para actividades deportivas",
        stock: 12
      },
      {
      nombre: "Camiseta Deportiva",
      precio: 24.99,
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR6zq2yyOmke_Q1-3_nAop4tmNm2xJER45sw&s",
      categoria: "remeras",
      descripcion: "Camiseta transpirable para actividades físicas",
      stock: 8
    },
    {
      nombre: "Jeans Slim Fit",
      precio: 55.00,
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVXW4z8XZUcdS8ysOmHqUqtXxMxE5cYs5mVw&s",
      categoria: "pantalones",
      descripcion: "Jeans ajustados para un look moderno",
      stock: 10
    },
    {
      nombre: "Zapatillas Urbanas",
      precio: 69.99,
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGbP0fW9l9HF1frzHLfGgfBzrhgLWo9vgx1A&s",
      categoria: "zapatillas",
      descripcion: "Zapatillas cómodas para el uso diario en la ciudad",
      stock: 14
    },
    {
   
      nombre: "Remera Estampada",
      precio: 29.99,
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjZg8KrTTsc8CKC5yRGFqItnf-69j7FGG0uA&s",
      categoria: "remeras",
      descripcion: "Remera casual con estampado único",
      stock: 12
    },
    {
      nombre: "Pantalones Cargo",
      precio: 45.50,
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6aJc3BZ7b_c1vTmcG2zEJklDBI5MWwiMjWg&s",
      categoria: "pantalones",
      descripcion: "Pantalones con múltiples bolsillos, ideales para aventuras",
      stock: 7
    },
    {
      nombre: "Zapatillas de Running",
      precio: 79.99,
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA89KueSkFZdpdV-bHS3lmXL9rcmG-s4R7qw&s",
      categoria: "zapatillas",
      descripcion: "Zapatillas ligeras diseñadas para corredores",
      stock: 15
    },
    {
      nombre: "Camiseta Casual",
      precio: 18.00,
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFG7aphMsAyPGgye-VVsMU7vse5jSwMPxr8Q&s",
      categoria: "remeras",
      descripcion: "Camiseta sencilla y cómoda para el día a día",
      stock: 20
    },
    {
      nombre: "Jeans Rotos",
      precio: 65.99,
      imagen: "https://img.ltwebstatic.com/images3_pi/2023/11/04/11/1699056034f0d9b0e1ea1326f9cf6680cf2479aaea_thumbnail_336x.webp",
      categoria: "pantalones",
      descripcion: "Jeans con estilo desgastado para un look urbano",
      stock: 5
    },
    {
      nombre: "Zapatillas de Skate",
      precio: 59.50,
      imagen: "https://www.indy.com.ar/cdn/shop/files/zapatillas-vans-m-skate-old-skool-negro-blanco-indy-1.jpg?v=1691620483",
      categoria: "zapatillas",
      descripcion: "Zapatillas resistentes y con buen agarre para skate",
      stock: 10
    },
    {
      nombre: "Remera Oversize",
      precio: 22.99,
      imagen: "https://acdn.mitiendanube.com/stores/001/464/503/products/fotos-221-fbc4011ec18ea99eae16952277059156-1024-1024.jpg",
      categoria: "remeras",
      descripcion: "Remera de estilo holgado para mayor comodidad",
      stock: 18
    },
  
];

const uploadData = async () => {
  try {
    const collectionRef = collection(db, "ropaItems"); 
    for (const item of ropaItem) {
      await addDoc(collectionRef, item);
    }
    console.log("Datos subidos correctamente");
  } catch (e) {
    console.error("Error al subir datos: ", e);
  }
};

uploadData();
