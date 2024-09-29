-- Estructura de tabla para la tabla `Admin`
CREATE TABLE Administrador (
  idAdmin INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  contraseña VARCHAR(50) NOT NULL,
  telefono CHAR(9) NOT NULL,
  bestado BIT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para la tabla `direccion`
CREATE TABLE direccion (
  idDireccion INT AUTO_INCREMENT PRIMARY KEY,
  Departamento VARCHAR(50) NOT NULL,
  Provincia VARCHAR(50) NOT NULL,
  Distrito VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para la tabla `cliente`
CREATE TABLE cliente (
  idCliente INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(50) NOT NULL,
  Apellido VARCHAR(50) NOT NULL,
  Correo VARCHAR(100) NOT NULL,
  Telefono CHAR(9) NOT NULL,
  idDireccion INT NULL,
  dni VARCHAR(8) NOT NULL,
  usuario VARCHAR(50) NOT NULL,
  contraseña VARCHAR(255) NOT NULL,
  FOREIGN KEY (idDireccion) REFERENCES direccion(idDireccion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para la tabla `categoria`
CREATE TABLE categoria (
  idCategoria INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para la tabla `proveedores`
CREATE TABLE proveedores (
  idProveedores INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  ruc VARCHAR(15) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  telefono VARCHAR(15) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  bestado BIT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para la tabla `producto`
CREATE TABLE producto (
  idProducto INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(50) NOT NULL,
  Descripcion VARCHAR(150) NOT NULL,
  Precio DECIMAL(10,2) NOT NULL,
  stockminimo INT NOT NULL,
  Stock INT NOT NULL,
  idCategoria INT NULL,
  bestado BIT NOT NULL,
  FOREIGN KEY (idCategoria) REFERENCES categoria(idCategoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para la tabla `carrito`
CREATE TABLE carrito (
  idCarrito INT AUTO_INCREMENT PRIMARY KEY,
  cantCarrito INT NOT NULL,
  idCliente INT NULL,
  idProducto INT NULL,
  FOREIGN KEY (idCliente) REFERENCES cliente(idCliente),
  FOREIGN KEY (idProducto) REFERENCES producto(idProducto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para la tabla `metodo_pago`
CREATE TABLE metodo_pago (
  idPago INT AUTO_INCREMENT PRIMARY KEY,
  Tipo VARCHAR(50) NOT NULL,
  idCarrito INT NULL,
  DetallesPago VARCHAR(255) NULL,
  FOREIGN KEY (idCarrito) REFERENCES carrito(idCarrito)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para la tabla `pedido`
CREATE TABLE pedido (
  idPedido INT AUTO_INCREMENT PRIMARY KEY,
  idCliente INT NOT NULL,
  FechaPedido DATETIME NOT NULL,
  Estado VARCHAR(50) NOT NULL, -- Ejemplo: "Pendiente", "Enviado", "Entregado"
  Total DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (idCliente) REFERENCES cliente(idCliente)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para la tabla `detalle_pedido`
CREATE TABLE detalle_pedido (
  idDetallePedido INT AUTO_INCREMENT PRIMARY KEY,
  idPedido INT NOT NULL,
  idProducto INT NOT NULL,
  Cantidad INT NOT NULL,
  PrecioUnitario DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (idPedido) REFERENCES pedido(idPedido),
  FOREIGN KEY (idProducto) REFERENCES producto(idProducto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para la tabla `orden`
CREATE TABLE orden (
  idOrden INT AUTO_INCREMENT PRIMARY KEY,
  idProveedor INT NOT NULL,
  FechaOrden DATETIME NOT NULL,
  Estado VARCHAR(50) NOT NULL, -- Ejemplo: "En Proceso", "Recibido"
  Total DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (idProveedor) REFERENCES proveedores(idProveedores)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para la tabla `detalle_orden`
CREATE TABLE detalle_orden (
  idDetalleOrden INT AUTO_INCREMENT PRIMARY KEY,
  idOrden INT NOT NULL,
  idProducto INT NOT NULL,
  Cantidad INT NOT NULL,
  PrecioUnitario DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (idOrden) REFERENCES orden(idOrden),
  FOREIGN KEY (idProducto) REFERENCES producto(idProducto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

