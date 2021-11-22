# Problem Set # 8: Mashup

1.  Implementa <a href="#Mashup" class="btn btn-sm btn-default">Mashup</a>



### Comprendiendo

#### index.html

Abra  `templates/index.html`, que será la única página HTML de su aplicación. Si nos fijamos en la  `cabeza`  de la página, verá todos los CSS y bibliotecas de JavaScript que usaremos (además de algunos otros).Incluidos en los comentarios HTML son URLs para la documentación de cada biblioteca si es curioso.

A continuación echar un vistazo a el  `body`(cuerpo) de la página, dentro de los cuales se  `div`  con un  `id`  único de un  `mapa`-canvas(mapa-lienzo). Está en ese  `div`  que inyectaremos un mapa. Debajo de ese  `div`  , mientras tanto, hay un  `form`(formulario) , dentro de la cual hay una input(entrada) de tipo text(texto) con un  `id`(identificación) única de  `q`  que usaremos para recibir información de los usuarios.

#### styles.css

Luego abra  `static/styles.css`  .Hay un montón de CSS que implementa la interfaz de usuario predeterminada del mashup. Siéntete libre de jugar (es decir, hacer cambios, guardar el archivo y volver a cargar la página en Chrome) para ver cómo funciona todo,pero lo mejor es deshacer los cambios por el momento antes de avanzar.

#### scripts.js

Luego abra  `static/scripts.js`.¡Ah, el archivo más interesante hasta ahora! Es este archivo el que implementa la interfaz de usuario "front-end" de mashup, que se basa en Google Maps y algunas rutas Flask "de fondo" para datos (que exploraremos próximamente). Vamos a caminar a través de este.

Encima del archivo hay algunas variables globales:

-   `map`(mapa), que contendrá una referencia (es decir, un apuntador de géneros) al mapa que pronto crearemos una instancia;
    
-   `markers(marcadores)`  , una matriz que contendrá referencias a cualquier marcador que agreguemos encima del mapa; y
    
-   `info(información)`  , una referencia a una "ventana de información" en la que finalmente mostraremos enlaces a artículos.
    

Debajo de esas variables globales hay una función anónima que será invocada automáticamente por jQuery cuando el DOM del mashup esté completamente cargado (es decir, cuando  `index.html`  y todos sus recursos, especialmente CSS y JavaScript, se hayan cargado en la memoria).

Encima de esta función anónima se encuentra una definición de  `styles`(estilos) , una matriz de dos objetos que usaremos para configurar nuestro mapa, de acuerdo con  [https://developers.google.com/maps/documentation/javascript/styling](https://developers.google.com/maps/documentation/javascript/styling)  . Recuerde que  `[`  y  `]`  denotan una matriz, mientras que  `{`  y  `}`  denotan un objeto.La (muy bonita) sangría que ves es solo una convención estilística a la que probablemente también sea ideal adherirse en tu código.

Debajo de  `styles`  se encuentra  `options`(opciones) , otra colección de claves y valores que, en última instancia, se usarán para configurar aún más el mapa, según  [https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions).

A continuación definimos  `canvas`(lienzo) , usando un poco de jQuery para obtener el nodo DOM cuyo  `id`  único es  `map-canvas`  .Mientras que  `$("# map-canvas")`  devuelve un objeto jQuery (que tiene una gran cantidad de funcionalidad incorporada),  `$("#map-canvas").get(0)`  devuelve el nodo subyacente DOM real que jQuery solo está envolviendo.

Tal vez la línea más poderosa hasta el momento es la siguiente en la que asignamos el  `map`(mapa) (esa variable global) un valor. Con nuevos google.maps.Map (canvas, options);

```
new google.maps.Map(canvas, options);
```

le estamos diciendo al navegador que cree una instancia de un nuevo mapa, inyectándolo en el nodo DOM especificado por  `canvas`), configurado por  `options`.

La línea debajo de esa, mientras tanto, le dice al navegador que llame a  `configure`  (otra función que hemos escrito) tan pronto como se carga el mapa.

##### addMarker (agregarMarcador)

Ah, un  `TODO`  . En última instancia, dado un  `place`(lugar) (es decir, código postal y más), esta función deberá agregar un marcador (es decir, icono) al mapa.

##### configure (configurar)

Esta función, mientras tanto, retoma el lugar donde quedó esa función anónima. Recuerde que se llama a  `configure`  tan pronto como se cargue el mapa. Dentro de esta función, configuramos un número de "listeners" (oyentes), especificando qué debería suceder cuando "escuchamos" ciertos eventos. Por ejemplo:

```
google.maps.event.addListener(map, "dragend", function() {
update();
});
```

indica que queremos escuchar un evento  `dragend`  en el mapa, llamando a la función anónima provista cuando lo escuchamos.Esa función anónima, mientras tanto, simplemente llama a  `update`  (otra función que pronto veremos). Según  [https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map](https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map),  `dragend`  se "dispara" (es decir, se transmite) "cuando el usuario deja de arrastrar el mapa".

De manera similar, escuchamos por  `zoom_changed`  , que se dispara "cuando cambia la propiedad de zoom del mapa" (es decir, el usuario acerca o aleja el zoom).

Debajo de esos oyentes está nuestra configuración de ese plugin de mecanografiado. Eche un vistazo a  [https://github.com/corejavascript/typeahead.js/blob/master/doc/jquery_typeahead.md](https://github.com/corejavascript/typeahead.js/blob/master/doc/jquery_typeahead.md)  si no está seguro de por qué  `highlight`(destacar) y  `minLength`(tamMínimo) deben hacer aquí. Sin embargo, lo más importante es saber que el valor de  `source`(fuente) (es decir,  `search`(búsqueda) ) es la función que llamará el complemento tan pronto como el usuario comience a escribir para que la función responda con una matriz de resultados de búsqueda en función de la entrada del usuario.Por ejemplo, si el usuario escribe  `foo`  en ese cuadro de texto, la función en última instancia debe devolver una matriz de todos los lugares en su base de datos que de alguna manera coincidan con  `foo`  .¡Cómo realizar esos partidos finalmente te quedará a ti! El valor de  `templates`(plantillas), mientras tanto, es un objeto con una clave,  `suggestion`(sugerencia) , cuyo valor es una "plantilla" que se utilizará para formatear cada entrada en el menú desplegable del complemento.Esa plantilla se crea mediante una llamada a  `Handlebars.compile`  , un método que viene con  [Handlebars](http://handlebarsjs.com/), un lenguaje de plantillas para JavaScript similar en espíritu a Jinja para Python.En este momento, esa plantilla es simplemente  `<div>TODO</div>`, lo que significa que cada entrada en ese menú desplegable literalmente dirá  `TODO`  . En última instancia, querrás cambiar ese valor a algo así como

```
<div>{{place_name}}, {{admin_name1}}, {{postal_code}}</div>
```

para que el complemento inserte dinámicamente esos valores (  `place_name`,  `admin_name1`  y  `postal_code`  ) u otros para usted.

Luego observe estas líneas, que son un tanto crípticas a primera vista:

```
$("#q").on("typeahead:selected", function(eventObject, suggestion, name) {
...
map.setCenter({lat: parseFloat(suggestion.latitude), lng: parseFloat(suggestion.longitude)});
...
update();
});
```

Estas líneas dicen que si el elemento HTML cuya  `id`  única es  `q`  activa un evento llamado  `typeahead: selected`  , como ocurrirá cuando el usuario seleccione una entrada del menú desplegable del complemento, queremos que jQuery llame a una función anónima cuyo segundo argumento,  `suggestion`, será un objeto que representa la entrada seleccionada. Dentro de ese objeto debe haber al menos dos propiedades:  `latitude`  y  `longitude`  .Luego llamaremos a  `setCenter`  para volver a centrar el mapa en esas coordenadas, después de lo cual llamaremos a  `update`(actualización) para actualizar los marcadores.

Debajo de esas líneas, mientras tanto, están estos:

```
$("#q").focus(function(eventData) {
info.close();
});
```

Si consulta  [http://api.jquery.com/focus/](http://api.jquery.com/focus/), ¿con suerte esas líneas tendrán sentido?

Debajo de estos están estos:

```
document.addEventListener("contextmenu", function(event) {
event.returnValue = true;
event.stopPropagation && event.stopPropagation();
event.cancelBubble && event.cancelBubble();
}, true);
```

Desafortunadamente, Google Maps inhabilita los clics y los clic derecho en los mapas, lo que interfiere con el uso de la función  **Inspeccionar Elemento**  de Chrome (increíblemente útil) , por lo que estas líneas vuelven a habilitarlos.

Lo último en  `configure`  es una llamada para  `update`(que veremos pronto) y una llamada a  `focus`(enfocar), esta vez sin argumentos.¡Vea  [http://api.jquery.com/focus/](http://api.jquery.com/focus/)  por qué!

##### removeMarkers (removerMarcadores)

Hm,  `TODO`. En última instancia, esta función deberá eliminar todos y cada uno de los marcadores del mapa.

##### search (buscar)

Esta función es llamada por el plugin de escritura anticipada cada vez que el usuario cambia el cuadro de texto del mashup como escribir o eliminar un carácter. El valor del cuadro de texto (es decir, lo que el usuario haya escrito en total) se pasa a  `search`  como  `query`(consulta) .Y el complemento también pasa para  `search`  dos argumentos adicionales, el último de los cuales (  `asyncResults`  ) es una función de "devolución de llamada" que la  `búsqueda`  debería llamar tan pronto como haya terminado de buscar coincidencias.En otras palabras, esta transferencia de  `asyncResults`  permite que  `search`  sea ​​"asíncrona", por lo que solo llamará a  `asyncResults`  tan pronto como esté listo, sin bloquear ninguna otra funcionalidad del mashup.En consecuencia,  `search`  utiliza el método  `getJSON`  de jQuery para contactar  `/search`  de forma asíncrona, pasando un parámetro,  `geo`  , cuyo valor es query .Una vez que search responde (sin importar cuántos milisegundos o segundos después), se llamará a la función anónima a  `done`(realizado) y se pasará data (datos) , cuyo valor será el que haya emitido JSON  `/search`. (Aunque si algo sale mal, se llama  `fracaso`  ).Finalmente llamado es  `asyncResults`  , a la cual  `search`  pasa los mismos  `data`  para que el complemento pueda iterar sobre los lugares incluidos (suponiendo que  `/search`  encontró coincidencias) para actualizar el menú desplegable del complemento.¡Uf!

Tenga en cuenta que estamos utilizando la interfaz "Promesa" de  `getJSON`  , por  [http://api.jquery.com/jquery.getjson/](http://api.jquery.com/jquery.getjson/). En lugar de pasar una función anónima directamente a  getJSON ( para invocar con éxito), en su lugar estamos "encadenando" llamadas juntas para obtener  `getJSON`  ,  `done`  (cuyo argumento, una función anónima, se invocará como exitoso) y  `fail`(fracaso) (cuyo argumento , otra función anónima, se llamará cuanda se encuentre una falla). Ver  [http://api.jquery.com/jquery.ajax/](http://api.jquery.com/jquery.ajax)  para algunos detalles adicionales.Y vea  [https://davidwalsh.name/write-javascript-promises](https://davidwalsh.name/write-javascript-promises)  para obtener una explicación de las promesas mismas.

Tenga en cuenta, también, que estamos usando  `console.log`  de manera similar a como podría usar  `eprintf`  en C para registrar errores por causa de la depuración.¡También querrás hacerlo! Simplemente tenga en cuenta que  `console.log`  registrará los mensajes en la consola del navegador (es decir, la pestaña  **Consola**  de las herramientas de desarrollador de Chrome), no en la ventana de su terminal.Consulte[https://developer.mozilla.org/en-US/docs/Web/API/Console/log](https://developer.mozilla.org/en-US/docs/Web/API/Console/log)  para obtener sugerencias.

##### showInfo (Mostrar Información)

Esta función abre la ventana de información en un marcador particular con contenido particular (es decir, HTML). Aunque si solo se proporciona un argumento(`marker`),  `showInfo`  simplemente muestra un ícono giratorio (que es solo un GIF animado). Observe, sin embargo, cómo esta función está creando una cadena de HTML dinámicamente, pasando después a  `setContent`(prepararContenido). Tal vez tenga esa técnica en mente en otro lugar.

##### update (Actualizar)

Lo último es  `update`  es la que primero determina los límites actuales del mapa, las coordenadas de las esquinas superior derecha (noreste) e inferior izquierda (suroeste).A continuación, pasa esas coordenadas a  `/`update a través de una solicitud GET (debajo del capó de  `getJSON`  ) a la:

```
GET /update?ne=37.45215513235332%2C-122.03830380859375&q=&sw=37.39503397352173%2C-122.28549619140625 HTTP/1.1
```

El  `%2C`  son solo comas que han sido "codificadas en URL".Tenga en cuenta que nuestro uso de comas es arbitrario; estamos esperando  `/update`  para analizar y extraer latitudes y longitudes de estos parámetros. Podríamos simplemente haber pasado cuatro parámetros distintos, pero sentimos que era semánticamente más limpio pasar solo un parámetro por esquina.

Como veremos pronto,  `/update`  está diseñado para devolver una matriz JSON de lugares que se encuentran dentro de los límites actuales del mapa (es decir, ciudades dentro de la vista). Después de todo, con esas dos esquinas solo puedes definir un rectángulo, ¡que es exactamente lo que es el mapa!

Tan pronto como responda  `/update`  , la función anónima pasada a  `done`  se llama y pasa  `data`  , cuyo valor es el JSON emitido por  `/update`  .(Aunque si algo sale mal, se llama  `fail`(fracaso). Esa función anónima primero elimina todos los marcadores del mapa y luego agrega iterativamente nuevos marcadores, uno para cada lugar (es decir, ciudad) en el JSON.

¡Uff y uf!

#### `application.py`

¡Ahora abre  `application.py`  , que contiene cuatro rutas!

##### `index`

Observe cómo esta primera ruta busca una  **API_KEY**, que requiere la API de JavaScript de Google Maps.En definitiva, todo lo que esta ruta hace es pasar esa clave a  **index.html**, la única plantilla de la aplicación.

##### `articles`

No hay mucho aquí todavía, ¡`TODO`!(por hacer)

##### `search`

Not much in this route yet either, just another  `TODO`!

##### `update`

Ah, está bien, aquí está el "back-end" que genera una matriz JSON de hasta 10 lugares (es decir, ciudades) que se encuentran dentro de los límites especificados (es decir, dentro del rectángulo definido por esas esquinas). No será necesario realizar cambios en esta ruta, pero sí leerla línea por línea, buscando en Google cualquier función con la que no esté familiarizado.

Y sí, las consultas SQL de este archivo suponen que el mundo es plano por simplicidad.

#### `helpers.py`

Por último, eche un vistazo a  `helpers.py`  .En este archivo hemos definido solo una función,  `lookup`(búsqueda) , que consulta Google News por artículos para una geografía en particular, recurriendo a The Onion si no hay ninguno disponible. Notarás que ha sido reemplazado el parámetro  `q`  en nuestra búsqueda URL con el parámetro  `geo`, de tal manera que pueda buscar los artículos de las noticias basado en una locación geográfica en específico. El parametro  `q`  mientras sea util para consultar articulos dadas unas palabras claves en específico, no forzaría que los resultados puedan ser de una locación geográfica en especifico. Así que, buscando por  `90210`  con el parámetro  `q`  podrías producir artículos de noticias sobre un show de TV, “90210”, dónde buscando con el parámetro  `geo`  podrías producir solo artículos de relevancia para el área de Beverly Hills en California.

## Especificación

### `mashup.db`

Por  `readme.md`  ,  `US.txt`  es bastante parecido a un archivo CSV, excepto que sus campos están delimitados con  `\t`  (un carácter de tabulación) en lugar de una coma. Convenientemente, SQLite le permite  [importar archivos CSV](https://www.sqlite.org/cli.html#csv_import)  y, como se ve, también archivos TSV (valores separados por tabuladores. Pero primero necesita una tabla en la que importar dicho archivo.

Usando phpLiteAdmin o  `sqlite3`  , cree una tabla en  `mashup.db`  llamada  `places`  que tenga estos doce campos, en este orden:

1.  `country_code`
2.  `postal_code`
3.  `place_name`
4.  `admin_name1`
5.  `admin_code1`
6.  `admin_name2`
7.  `admin_code2`
8.  `admin_name3`
9.  `admin_code3`
10.  `latitude`
11.  `longitude`
12.  `accuracy`

Consulte  `readme.md`  (o  `US.txt`  mismo) para obtener pistas sobre los tipos apropiados para estos campos. No incluya un campo de  `id`(identificación) (de lo contrario, no puede hacer lo que estamos a punto de hacer).

En lugar de  `INSERT`  las filas de  `US.txt`  en su tabla recién creada, ahora importémoslas en bulk de la siguiente manera:

```
$ sqlite3 mashup.db
.separator "\t"
.import US.txt places
```

Si ve algún error, es probable que su esquema de  `places`  no sea el correcto, en cuyo caso querrá  `ALTER`(o  `DROP`  y  `CREATE`) en consecuencia. Para confirmar que una importación es exitosa, ejecute

```
wc -l US.txt
```

para contar cuántas filas hay en  `US.txt`.(Ese argumento de la línea de comando es un guión seguido de una L minúscula) Luego ejecuta una consulta como

```
SELECT COUNT(*) FROM places;
```

en  `sqlite3`  o phpLiteAdmin.¡Los conteos deben coincidir!

### `application.py`

#### `articles (artículos)`

Complete la implementación de  `/articles`  de tal forma que genere una matriz JSON de objetos, cada uno de los cuales representa un artículo para  `geo`  , donde  `geo`  se pasa a  `/articles`  como un parámetro GET, como en la solución de personal, a continuación.

-   [http://mashup.cs50.net/articles?geo=02138](http://mashup.cs50.net/articles?geo=02138)
    
-   [http://mashup.cs50.net/articles?geo=06511](http://mashup.cs50.net/articles?geo=06511)
    
-   [http://mashup.cs50.net/articles?geo=90210](http://mashup.cs50.net/articles?geo=90210)
    

¡Las probabilidades son que quieras llamar a  `lookup`  ! Para probar  `/articles`  , incluso antes de que su cuadro de texto esté operativo, simplemente visite URLs como

-   `https://ide50-username.cs50.io/articles?geo=02138`
    
-   `https://ide50-username.cs50.io/articles?geo=06511`
    
-   `https://ide50-username.cs50.io/articles?geo=90210`
    

y otras variantes similares, donde el  `username`  es su propio nombre de usuario, para ver si recupera el JSON que espera.

#### `search (buscar)`

Complete la implementación de  `/search`  de tal forma que genere una matriz JSON de objetos, cada uno de los cuales representa una fila de  `places`  que de alguna manera coincide con el valor de  `q`, como en la solución de personal a continuación.

-   [http://mashup.cs50.net/search?q=02138](http://mashup.cs50.net/search?q=02138)
    
-   [http://mashup.cs50.net/search?q=Cambridge](http://mashup.cs50.net/search?q=Cambridge)
    
-   [http://mashup.cs50.net/search?q=06511](http://mashup.cs50.net/search?q=06511)
    
-   [http://mashup.cs50.net/search?q=New%20Haven](http://mashup.cs50.net/search?q=New%20Haven)
    

El valor de  `q`  , pasado a  `/search`  como un parámetro GET, podría ser una ciudad, estado o código postal. Dejamos que le permite decidir lo que constituye una cerilla y, por lo tanto, que las filas para seleccionar(`SELECT`). Basta con respaldar la búsqueda por códigos postales solamente, pero también intentar respaldar la búsqueda por ciudad y / o estado.Las probabilidades son que la palabra clave  `LIKE`  de SQL es útil. Si te sientes aventurero, te puede gustar (pero no es necesario) experimentar con el soporte de SQLite para  [búsquedas de texto completo](https://www.sqlite.org/fts3.html).

Por ejemplo, considere la consulta a continuación.

```
db.execute("SELECT * FROM places WHERE postal_code = :q", q=request.args.get("q"))
```

ULamentablemente, esa consulta requiere que la entrada de un usuario sea exactamente igual a un código postal (por el  `=`), que no es tan atractivo para la autocompletar.¿Qué tal este en su lugar? (Recuerde que  `+`  es el operador de concatenación de Python).

```
q = request.args.get("q") + "%"
db.execute("SELECT * FROM places WHERE postal_code LIKE :q", q=q)
```

Observe cómo este ejemplo se agrega  `%`  a la entrada del usuario, que resulta ser el carácter "comodín" de SQL que significa "coincidir con cualquier número de caracteres".El efecto es que esta consulta devolverá filas cuyos códigos postales coinciden con lo que el usuario tipeado seguido por cualquier cantidad de otros caracteres.En otras palabras, cualquiera de  `0`  ,  `02`  ,  `021`  ,  `0213`  y  `02138`  puede devolver filas, como cualquiera de  `0`  ,  `06`  ,  `065`  ,  `0651`  y  `06511`.

Si desea apoyar la búsqueda no solo por códigos postales, tenga en cuenta que SQL admite  `OR`  y  `AND`!

Para probar  `/search`, incluso antes de que su cuadro de texto esté operativo, simplemente visite las URL como

-   `https://ide50-username.cs50.io/search?q=02138`
    
-   `https://ide50-username.cs50.io/search?q=Cambridge+MA`
    
-   `https://ide50-username.cs50.io/search?q=Cambridge,+MA`
    
-   `https://ide50-username.cs50.io/search?q=Cambridge,+Massachusetts`
    
-   `https://ide50-username.cs50.io/search?q=Cambridge,+Massachusetts,+US`
    

o

-   `https://ide50-username.cs50.io/search?q=06511`
    
-   `https://ide50-username.cs50.io/search?q=New%20Haven+CT`
    
-   `https://ide50-username.cs50.io/search?q=New%20Haven,+CT`
    
-   `https://ide50-username.cs50.io/search?q=New%20Haven,+Connecticut`
    
-   `https://ide50-username.cs50.io/search?q=New+Haven,+Connecticut,+US`
    

y otras variantes similares, donde el  `username`  es su propio nombre de usuario, para ver si recupera el JSON que espera. De nuevo, sin embargo, dejamos que usted decida qué apoyo  `/search`  tendrá de tales variantes.¡Mientras más flexible, mejor! Intente implementar las características que usted mismo esperaría como usuario.

¡Siéntase libre de jugar con la solución del personal en  [http://mashup.cs50.net/](http://mashup.cs50.net/), inspeccionando sus solicitudes HTTP a través de la pestaña Red de Chrome según sea necesario, si no está seguro de cómo debería funcionar su propio código!

### `scripts.js`

Primero, hacia la parte superior de  `scripts.js`  , verá una función anónima, dentro de la cual hay una definición de  `options`  , un objeto, una de cuyas claves es  `center`  , cuyo valor es un objeto con dos claves propias ,  `lat`  y  `lng`  .Según el comentario junto a ese objeto, el mapa de su mashup está actualmente centrado en Stanford, California. D'oh! Cambie las coordenadas del centro de su mapa a Cambridge (42.3770, -71.1256) o New Haven (41.3184, -72.9318) o en cualquier otro lugar. (Aunque asegúrese de elegir las coordenadas en los EE. UU. Si descargó  `US.txt`).Una vez que guarde sus cambios y vuelva a cargar su mapa, ¡debería encontrarse allí! Alejar según sea necesario para confirmar visualmente.

Como antes, no dude en jugar con la solución del personal en  [http://mashup.cs50.net/](http://mashup.cs50.net/), inspeccionando sus solicitudes HTTP a través de la pestaña Red de Chrome según sea necesario, ¡si no está seguro de cómo debería funcionar su propio código!

#### `configure (configurar)`

Ahora que  `/search`  y su cuadro de texto están (¡con suerte!)trabajando, modifique el valor de la  `suggest`  en  `configure`  , la función en  `scripts.js`, para que muestre las coincidencias (es decir,  `place_name`,  `admin_name1`  y/u otros campos) en lugar de  `TODO`. Recuerde que un valor como

```
<div>{{place_name}}, {{admin_name1}}, {{postal_code}}</div>
```

podría hacer el truco.

#### `addMarker (Agregar Marcador)`

Implemente  `addMarker`  en  `scripts`.js de tal forma que agregue un marcador para el  `place`  en el mapa, donde  `place`  es un objeto de JavaScript que representa una fila de lugares. Consulte  [https://developers.google.com/maps/documentation/javascript/markers](https://developers.google.com/maps/documentation/javascript/markers)  para obtener sugerencias. Tenga en cuenta que la última versión (experimental) de la API de Google permite que los marcadores tengan  [etiquetas](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MarkerOptions).

Cuando se hace clic en un marcador, debe abrir la ventana de información del mashup, anclado en ese mismo marcador, cuyo contenido debe ser una lista desordenada de enlaces al artículo para la ubicación de ese artículo (a menos que  `/articles`  produzca un conjunto vacío)

No se preocupe si algunos de sus marcadores (o etiquetas) se superponen a otros, ¡suponiendo que sea el resultado de imperfecciones en la API de Google o en  `US.txt`  y no en su propio código!

Si desea personalizar el icono de sus marcadores, consulte  [https://developers.google.com/maps/documentation/javascript/markers#simple_icons](https://developers.google.com/maps/documentation/javascript/markers#simple_icons). Para las URL de los iconos incorporados en Google Maps, consulte  [http://www.lass.it/Web/viewer.aspx?id=4](http://www.lass.it/Web/viewer.aspx?id=4). Para iconos de terceros, consulte  [https://mapicons.mapsmarker.com/](https://mapicons.mapsmarker.com/).

#### removeMarkers (removerMarcadores)

Implemente  `removeMarkers`  de tal manera que elimine todos los marcadores del mapa (y los elimine).¡Lo más probable es que necesites  `addMarker`  para modificar esa variable global llamada  `markers`  para que  `removeMarkers`  haga su propia magia!