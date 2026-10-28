# QA — Estación de Colores

## Alcance verificado

`npm run check`: 16/16 pruebas aprobadas, sintaxis y pruebas de motor/DOM simulado. Seis niveles resueltos por BFS y reproducidos por los manejadores de la app; movimientos inválidos, transferencia parcial, inventario/capacidad, victoria, persistencia/recarga, deshacer, selección, reinicio y borrado, cancelación, ayuda, sincronización y almacenamiento bloqueado.

**No se afirma revisión de navegador real.** El doble DOM prueba lógica y manejadores, no layout, foco nativo, diálogos nativos, Intro/Espacio nativos ni lector de pantalla. Esa QA corresponde a publicación.

## Secuencias deterministas

Comenzar cada estación desde estado inicial; si hace falta, usar «Reiniciar estación» y confirmar. Seleccionar estación mediante `#levels.children[indice]`. Cada par significa pulsar origen y destino consecutivamente; IDs base cero `#tube-N`, rótulos visibles base uno. La última jugada muestra victoria y guarda `completed[indice].bestMoves`.

### 1. Primer transbordo

5 movimientos; 27 estados visitados.

Botones visibles: 1 → 4; 2 → 1; 2 → 4; 1 → 2; 1 → 4.

IDs (base cero): `[[0,3],[1,0],[1,3],[0,1],[0,3]]`.

### 2. Andén de ámbar

7 movimientos; 93 estados visitados.

Botones visibles: 1 → 4; 3 → 1; 2 → 3; 2 → 4; 1 → 2; 3 → 1; 3 → 4.

IDs (base cero): `[[0,3],[2,0],[1,2],[1,3],[0,1],[2,0],[2,3]]`.

### 3. Hora azul

9 movimientos; 233 estados visitados.

Botones visibles: 1 → 4; 3 → 1; 3 → 4; 1 → 3; 2 → 1; 2 → 4; 3 → 2; 1 → 3; 1 → 4.

IDs (base cero): `[[0,3],[2,0],[2,3],[0,2],[1,0],[1,3],[2,1],[0,2],[0,3]]`.

### 4. Cruce violeta

9 movimientos; 267 estados visitados.

Botones visibles: 1 → 5; 4 → 1; 3 → 4; 2 → 3; 2 → 5; 1 → 2; 4 → 1; 3 → 4; 3 → 5.

IDs (base cero): `[[0,4],[3,0],[2,3],[1,2],[1,4],[0,1],[3,0],[2,3],[2,4]]`.

### 5. Cinco destinos

11 movimientos; 653 estados visitados.

Botones visibles: 1 → 6; 5 → 1; 4 → 5; 3 → 4; 2 → 3; 2 → 6; 1 → 2; 5 → 1; 4 → 5; 3 → 4; 3 → 6.

IDs (base cero): `[[0,5],[4,0],[3,4],[2,3],[1,2],[1,5],[0,1],[4,0],[3,4],[2,3],[2,5]]`.

### 6. Última conexión

13 movimientos; 980 estados visitados.

Botones visibles: 1 → 5; 4 → 1; 3 → 4; 2 → 3; 2 → 5; 1 → 2; 4 → 1; 3 → 4; 3 → 5; 2 → 3; 1 → 2; 4 → 1; 4 → 5.

IDs (base cero): `[[0,4],[3,0],[2,3],[1,2],[1,4],[0,1],[3,0],[2,3],[2,4],[1,2],[0,1],[3,0],[3,4]]`.

## Revisión real pendiente

- Desktop y móvil (320/390 px): ningún desbordamiento; símbolos distinguibles.
- Tab e Intro/Espacio seleccionan origen y destino; Escape cancela selección.
- Diálogo: cancelar, Escape y confirmar; foco vuelve a un control útil.
- Movimiento inválido no cambia estado; uno válido mueve todo el grupo que cabe.
- Ganar las seis, recargar, comprobar catálogo y reiniciar conservando logro.
- Borrar todo con cancelación y confirmación.
- Dos pestañas: actualización y borrado; diálogo obsoleto cancelado.
- Consola sin errores ni solicitudes a servicios ajenos al origen.
