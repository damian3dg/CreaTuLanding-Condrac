export interface RopaItem {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    categoria: string;
    descripcion: string;
    stock: number;
  }
  
  export const ropaItem: RopaItem[] = [
    { 
      id: 1, 
    nombre: "Camiseta Básica", 
      precio: 19.99, 
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg1IxaLwy7-jAyAF287xwkptjCT4zWOBcfOw&s", 
      categoria: "remeras", 
      descripcion: "Camiseta cómoda para uso diario",
      stock: 10
    },
    { 
      id: 2, 
        nombre: "Jeans Clásicos", 
      precio: 49.99, 
      imagen: "https://admin.deloscojones.com.ar/Content/UploadDirectory/Products/627/image_df5ef016-0ba0-499b-9b76-d8c0c03d100b.jpg", 
      categoria: "pantalones", 
      descripcion: "Jeans duraderos de estilo clásico",
      stock: 15
    },
    { 
      id: 3, 
        nombre: "Remera entrenamiento", 
      precio: 99.99, 
      imagen: "https://i.pinimg.com/736x/0c/41/a3/0c41a30d78c4f317458a94c5a290b0e3.jpg", 
      categoria: "remeras", 
      descripcion: "Remera para entrenar a diario",
      stock: 5
    },
    { 
      id: 4, 
        nombre: "Vestido Elegante", 
      precio: 79.99, 
      imagen: "https://dcdn.mitiendanube.com/stores/932/399/products/m3711261-574ebf22d4352684cc16938275294831-1024-1024.jpeg",
      categoria: "remeras", 
      descripcion: "Vestido perfecto para ocasiones especiales",
      stock: 8
    },
    { 
      id: 5, 
        nombre: "Sudadera con Capucha", 
      precio: 39.99, 
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-jgLMde7x84t4II3UNBKczuy5gAv83IRywg&s", 
      categoria: "remeras", 
      descripcion: "Sudadera cálida y cómoda con capucha",
      stock: 20
    },
    { 
      id: 6, 
        nombre: "Zapatilla Deportivas", 
      precio: 59.99, 
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtQ50yMxWm49wj03HVGytfajfUJM-U_zkniQ&s", 
      categoria: "zapatillas", 
      descripcion: "Zapatillas ideales para actividades deportivas",
      stock: 12
    },
  ];