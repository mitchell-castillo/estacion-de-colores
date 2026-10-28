# Estación de Colores

Edición del 28 de octubre de 2026. Seis puzles originales de clasificación de fichas apiladas: 3–5 colores, capacidad 3 o 4, dos recipientes auxiliares. Una mecánica de ordenación por color, no un juego de rutas ferroviarias: la estación es el tema visual.

HTML, CSS y módulos ES nativos. Sin dependencias, compilación, analítica, cuentas, backend ni fuentes remotas. Todo permanece en el navegador.

## Ejecutar

Sirve la raíz por HTTP: `python3 -m http.server 8080`, abre `http://localhost:8080`. No uses `file://` (módulos ES). Para GitHub Pages, publica la raíz. Se incluye `.nojekyll`.

## Reglas

1. Pulsa un recipiente con fichas como origen y otro como destino.
2. Se mueve el grupo consecutivo del mismo color situado arriba, limitado al espacio libre del destino.
3. Solo se permite mover a un recipiente vacío o con el mismo color arriba.
4. Ganas cuando todos los recipientes no vacíos están **llenos de un solo color**.

Los vacíos son espacio de trabajo. Los movimientos imposibles no alteran la partida. Pulsa de nuevo el origen o Escape para deseleccionar. Todas las estaciones están disponibles desde el principio. No hay reloj ni penalizaciones. Deshacer y reiniciar permiten recuperarse de un bloqueo; no se ofrecen soluciones dentro del juego.

Cada color tiene también un símbolo: ● coral, ◆ azul, ▲ ámbar, ✚ violeta y ★ verde. Botones nativos, etiquetas descriptivas de abajo arriba, región viva, foco visible, navegación por Tab e Intro/Espacio, diálogo de confirmación cancelable con Escape. Diseño responsive desde 320 px.

## Persistencia

Clave `daily-games:estacion-de-colores:v1`:

```js
{version:1,currentLevel:0,completed:{"0":{bestMoves:5}},
 run:[{tubes:[[0,1,0],[1,0,1],[2,2,2],[],[]],moves:0,history:[]},/* otras 5 */],
 updatedAt:"2026-10-28T00:00:00.000Z"}
```

Compatible con el catálogo: `completed` contiene logros con `bestMoves` positivo; `run:null` restaura partidas iniciales. El parser valida límites, inventario de colores, capacidad, historial y versión. Conserva como máximo 100 estados para deshacer por estación, también tras recargar. Deshacer reduce el contador de movimientos del recorrido; un logro obtenido no se revoca al deshacer o reiniciar. El borrado total requiere confirmación.

La sincronización entre pestañas usa `storage` y lectura previa a una mutación, con resolución por última escritura del documento completo. No es colaboración simultánea por ficha. Los eventos más antiguos se ignoran; una eliminación externa reinicia. Un cambio externo cancela selección y diálogo para evitar confirmar sobre una partida obsoleta. Si falla localStorage, se informa y se sigue en memoria. No se transmiten datos.

## Verificación

`npm run check` (Node 20+, sin instalar paquetes) comprueba sintaxis y pruebas de motor, almacenamiento e interfaz simulada. CI usa Node 22. Cada nivel se resuelve por búsqueda BFS: enumera movimientos legales, conserva padres para reconstruir la ruta y elimina estados equivalentes por permutación de recipientes. Las secuencias resultantes se vuelven a ejecutar comprobando capacidad, inventario y victoria. Límite defensivo de búsqueda: 300 000 estados; todos estos niveles quedan muy por debajo.

`QA.md` incluye secuencias deterministas y el alcance de las pruebas. Las pruebas DOM son dobles de prueba, **no** un navegador real; layout, diálogos nativos y activación nativa por teclado necesitan revisión real aparte.

## Archivos

- `src/engine.js`: niveles, reglas, BFS y esquema.
- `app.js`: interfaz y almacenamiento.
- `assets/cover.svg`: ilustración vectorial original.
- `game.json`: manifiesto del juego.
- `tests/`: pruebas sin dependencias.
