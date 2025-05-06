# TP3 - Angular Project

## Tecnologías y APIs utilizadas

### Angular
- Angular 19.2.0
- Angular Forms (Reactive Forms)
- Angular Common
- Angular Router

### Librerías de UI
- Bootstrap 5.3.5
- Bootstrap Icons 1.11.3
- DataTables 2.3.0
  - angular-datatables 19.0.0
  - datatables.net-bs5 2.3.0

### Otras dependencias
- jQuery 3.7.1

## Funcionalidades implementadas

### Parte 2 - Sistema de Tickets
- Formulario reactivo para crear tickets con validaciones
  - Validación de DNI (7-8 dígitos)
  - Validación de email
  - Selección de categoría turística
  - Selección de destino con precios predefinidos
  - Cálculo automático de precios con descuentos
    - Adulto: precio normal
    - Menor: 35% de descuento
    - Jubilado: 50% de descuento

- Tabla de tickets con DataTables
  - Paginación
  - Búsqueda
  - Ordenamiento
  - Interfaz en español
  - Botón de eliminación por ticket

- Resumen de ventas
  - Total por categoría
    - Cantidad de boletos
    - Monto total
  - Total general de ventas

- Características técnicas
  - Sistema de IDs incremental para tickets
  - Manejo de estado con servicios
  - Validaciones de formularios
  - Formateo de fechas y moneda
  - Diseño responsive con Bootstrap
  - Tablas interactivas con DataTables