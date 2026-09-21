import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const stamp = {
  publishedAt: '2026-09-21',
  updatedAt: '2026-09-21',
  reviewAfter: '2026-12-21',
  authorId: 'equipo-editorial',
  reviewerId: 'revision-tecnica',
};

function yamlList(items) {
  return `[${items.map((item) => JSON.stringify(item)).join(', ')}]`;
}

function dumpFaqs(faqs) {
  return faqs
    .map(
      (faq) =>
        `  - question: ${JSON.stringify(faq.q)}\n    answer: ${JSON.stringify(faq.a)}`,
    )
    .join('\n');
}

function writeMdx(rel, front, body) {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  const lines = Object.entries(front)
    .filter(([key]) => key !== 'faqs')
    .map(([key, value]) => {
      if (Array.isArray(value)) return `${key}: ${yamlList(value)}`;
      if (typeof value === 'string' && /[:#]|^\d/.test(value)) return `${key}: ${JSON.stringify(value)}`;
      return `${key}: ${value}`;
    });
  lines.push('faqs:');
  lines.push(dumpFaqs(front.faqs));
  writeFileSync(file, `---\n${lines.join('\n')}\n---\n\n${body.trim()}\n`);
}

const services = [
  {
    slug: 'rehabilitacion-integral-edificios',
    title: 'Rehabilitación integral de edificios: alcance y presupuestos | Rehabilita tu Edificio',
    description:
      'Ordena fachada, cubierta, instalaciones comunes y accesibilidad en una rehabilitación integral de edificio y compara presupuestos de empresas especializadas.',
    h1: 'Rehabilitación integral de un edificio: coordinar partidas, no sumar facturas sueltas',
    keyword: 'rehabilitación integral de edificios',
    answer:
      'Una rehabilitación integral de edificio agrupa envolvente, cubierta, instalaciones comunes y, a menudo, accesos, bajo un mismo proyecto. Sirve cuando el inmueble acumula varias deficiencias y conviene comparar ofertas con la misma lista de capítulos, no con totales opacos.',
    related: ['/servicios/rehabilitacion-fachadas/', '/servicios/reparacion-cubiertas-tejados/', '/servicios/rehabilitacion-energetica/', '/guias/cuanto-cuesta-rehabilitar-edificio/'],
    faqs: [
      { q: '¿Qué se considera rehabilitación integral de un edificio?', a: 'Suele incluir fachada o SATE, cubierta, redes comunes y, si procede, accesibilidad. El alcance exacto lo fija la comunidad en el proyecto; no hay un paquete legal único.' },
      { q: '¿Se puede hacer por fases?', a: 'Sí, pero las fases deben encajar: impermeabilizar después de un SATE mal encontrado encarece. Pide un plan de etapas comparable entre empresas.' },
      { q: '¿Quién decide en la comunidad?', a: 'Las mayorías de la Ley de Propiedad Horizontal dependen del tipo de acuerdo. El administrador suele preparar la convocatoria; esta web no sustituye ese asesoramiento.' },
      { q: '¿Cómo comparar presupuestos?', a: 'Exige la misma descomposición: medios auxiliares, demolición, fachada, cubierta, instalaciones y residuos. Un total cerrado sin partidas no se puede comparar.' },
    ],
    body: `## Problemas que suele resolver

Cuando un bloque arrastra desprendimientos, goteras, pérdidas térmicas y un portal inaccesible, contratar cuatro obras sueltas deja encuentros mal resueltos. La actuación integral permite que fachada, petos y cubiertas se encuentren con el mismo criterio de agua y movimiento.

## En qué consiste

Un técnico define el estado, las partidas y, si hace falta, el proyecto. Después se piden ofertas a empresas que ejecuten o coordinen esos capítulos. Esta plataforma no dirige la obra: ayuda a precisar el alcance y a solicitar presupuestos a través de Habitissimo.

El proceso habitual empieza por inspeccionar envolvente y cubierta, sigue por medios auxiliares (andamio, plataformas) y termina por reposición de zonas comunes afectadas. Las licencias dependen del ayuntamiento y de si hay ocupación de vía.

## Precio

Influyen superficie de fachada y cubierta, número de plantas, estado, andamios, protecciones y si hay refuerzo estructural. Los rangos públicos de mercado son solo orientación; cada edificio necesita medición. Revisa la [guía de coste](/guias/cuanto-cuesta-rehabilitar-edificio/).

## Documentación

Pueden pedirse ITE o IEE previas, proyecto, estudio de seguridad y ocupación de vía. Consulta el [Código Técnico](https://www.codigotecnico.org/) como marco estatal y la ordenanza local como regla de tramitación.`,
  },
  {
    slug: 'rehabilitacion-fachadas',
    title: 'Rehabilitación de fachadas en comunidades | Rehabilita tu Edificio',
    description:
      'Desprendimientos, revestimientos y anclajes: cómo plantear la rehabilitación de fachada de un edificio y comparar presupuestos de empresas especializadas.',
    h1: 'Rehabilitar la fachada de un edificio: seguridad de la envolvente antes que el color',
    keyword: 'rehabilitación de fachadas',
    answer:
      'La rehabilitación de fachada trata revestimiento, anclajes, encuentros y, si procede, aislamiento. El objetivo primero es que no caigan piezas ni entre agua; el acabado viene después. Compara ofertas con la misma superficie y el mismo sistema constructivo.',
    related: ['/servicios/aislamiento-sate/', '/servicios/reparacion-grietas/', '/guias/precio-rehabilitar-fachada/', '/guias/permisos-rehabilitar-fachada/'],
    faqs: [
      { q: '¿Hay que poner SATE siempre que se toca la fachada?', a: 'No. Si el revestimiento está agotado puede bastar una reposición. El SATE tiene sentido cuando también se busca mejorar la envolvente o cuando el soporte lo admite.' },
      { q: '¿El andamio va aparte?', a: 'Debe aparecer como partida. En calles estrechas el andamio y la ocupación de vía pueden pesar tanto como el revestimiento.' },
      { q: '¿Qué pasa con balcones y cornisas?', a: 'Son puntos de desprendimiento frecuentes. Pide inspección de cantos, goterones y anclajes, no solo pintura.' },
      { q: '¿Se puede intervenir solo una medianera?', a: 'A veces sí, si el daño está localizado. Aun así hay que resolver encuentros con cubierta y con la fachada principal.' },
    ],
    body: `## Problemas

Desconchados, aplacados sueltos, fisuras, manchas de humedad y cantos de forjado oxidados. Una ITE desfavorable en fachada suele apuntar a estos puntos, no a un cambio estético.

## Actuación

Tras el diagnóstico se elige sistema: recrecido y pintura, mortero, aplacado o SATE. Cada uno cambia anclajes, peso y permisos. El [SATE](/servicios/aislamiento-sate/) es una opción, no un sinónimo de rehabilitar fachada.

## Precio y permisos

El coste se mueve con metros de fachada, plantas, ornamentos, protección de acera y residuos. La licencia y el andamio se tramitan en el municipio: ver [permisos para rehabilitar fachada](/guias/permisos-rehabilitar-fachada/).`,
  },
  {
    slug: 'reparacion-cubiertas-tejados',
    title: 'Reparación de cubiertas y tejados de comunidades | Rehabilita tu Edificio',
    description:
      'Goteras, tejas y encuentros: cómo plantear la reparación de la cubierta de un edificio y comparar presupuestos especializados.',
    h1: 'Reparar la cubierta de un edificio: el agua se corta en los encuentros',
    keyword: 'reparación de cubiertas y tejados',
    answer:
      'La reparación de cubiertas y tejados atiende tejas o láminas, petos, chimeneas y desagües. Las goteras rara vez se resuelven cambiando solo una teja: hay que ver pendientes y puntos singulares. Pide a las empresas el mismo alcance de intervención.',
    related: ['/servicios/impermeabilizacion-cubiertas/', '/servicios/rehabilitacion-integral-edificios/', '/guias/impermeabilizar-cubierta-comunidad/'],
    faqs: [
      { q: '¿Cubierta inclinada y plana se presupuestan igual?', a: 'No. La inclinada habla de tejas, rastrel y limas; la plana, de pendientes, sumideros y lámina. No compares un precio por m² si el sistema es otro.' },
      { q: '¿Hay que vaciar trasteros de cubierta?', a: 'Si existen, influyen en accesos y en encuentros. Decláralos en la visita.' },
      { q: '¿El aislamiento de cubierta es obligatorio?', a: 'Depende de si la actuación entra en exigencias del CTE DB-HE y del alcance del proyecto. No lo des por sentado en un parche local.' },
      { q: '¿Cuánto dura una reparación puntual?', a: 'Un parche puede aguantar una temporada y fallar en el siguiente temporal. Si hay varias goteras, conviene un criterio de cubierta completa.' },
    ],
    body: `## Problemas

Filtraciones en áticos, manchas en cajas de escalera, tejas desplazadas por viento y petos sin albardilla. En cubiertas planas, el agua encharcada señala pendientes o sumideros insuficientes.

## Actuación

Inspección, prueba de agua si procede, y decisión entre reparación local o reposición de sistema. La [impermeabilización](/servicios/impermeabilizacion-cubiertas/) entra cuando la lámina está agotada.

Medios auxiliares: líneas de vida, plataformas o andamio de cornisa. Sin esa partida el presupuesto no es comparable.`,
  },
  {
    slug: 'impermeabilizacion-cubiertas',
    title: 'Impermeabilización de cubiertas comunitarias | Rehabilita tu Edificio',
    description:
      'Láminas, pendientes y puntos singulares para cortar filtraciones en cubiertas de comunidades. Compara presupuestos con el mismo sistema.',
    h1: 'Impermeabilizar la cubierta de una comunidad: pendientes y puntos singulares',
    keyword: 'impermeabilización de cubiertas',
    answer:
      'Impermeabilizar una cubierta comunitaria no es pintar una tela. Hay que corregir pendientes, sumideros, encuentros con petos y pasos de instalaciones. Un presupuesto comparable nombra el sistema (bituminoso, sintético, líquido) y cómo se resuelven esos puntos.',
    related: ['/servicios/reparacion-cubiertas-tejados/', '/guias/impermeabilizar-cubierta-comunidad/', '/servicios/reforma-patios-interiores/'],
    faqs: [
      { q: '¿Qué sistema dura más?', a: 'Depende del soporte, del uso (transitable o no) y de la ejecución de encuentros. Pide ficha del sistema y detalles de petos, no una marca suelta.' },
      { q: '¿Se puede pisar después?', a: 'Solo si el sistema es transitable o hay protección. Una lámina no transitable se puncia con una silla o una antena mal apoyada.' },
      { q: '¿Hay que levantar el solado?', a: 'A menudo sí, para ver la lámina y las pendientes. Un recubrimiento encima de un soporte saturado reaparece como gotera.' },
      { q: '¿La garantía cubre encuentros?', a: 'Pregunta si incluye puntos singulares. Muchas reclamaciones nacen ahí, no en el paño central.' },
    ],
    body: `## Problemas

Goteras cíclicas, vegetación en juntas, petos sin goterón y antenas que perforan la lámina. El patio de luces a veces comparte la misma red de agua: coordina con [patios](/servicios/reforma-patios-interiores/).

## Precio

M² de cubierta, número de encuentros, si es transitable, medios de acceso y residuos del solado existente. No hay tarifa nacional; usa la guía de [impermeabilizar cubierta](/guias/impermeabilizar-cubierta-comunidad/) como marco, no como cotización.`,
  },
  {
    slug: 'aislamiento-sate',
    title: 'Aislamiento SATE en fachadas de edificios | Rehabilita tu Edificio',
    description:
      'Qué es el SATE, cuándo tiene sentido en una comunidad y qué debe incluir un presupuesto comparable de aislamiento por el exterior.',
    h1: 'Aislamiento SATE: mejorar la envolvente cuando ya hay que tocar la fachada',
    keyword: 'aislamiento SATE',
    answer:
      'El SATE es un sistema de aislamiento térmico por el exterior con placas, fijaciones, malla y revestimiento. Encaja cuando la fachada ya necesita intervención y se quiere reducir demanda energética. El presupuesto debe desglosar arranque, huecos, alféizares y coronación, no solo el m² de paño.',
    related: ['/servicios/rehabilitacion-energetica/', '/servicios/rehabilitacion-fachadas/', '/guias/cuanto-cuesta-instalar-sate/'],
    faqs: [
      { q: '¿El SATE se puede poner sobre cualquier fachada?', a: 'No. Hay que comprobar soporte, anclajes, puentes térmicos y normativa de incendio y espesores. Un proyectista o la empresa debe justificar el sistema.' },
      { q: '¿Cambia el aspecto del edificio?', a: 'Sí: espesor, alféizares y a veces color. En cascos protegidos puede haber limitaciones.' },
      { q: '¿Sustituye a cambiar ventanas?', a: 'Complementa. Una ventana antigua sigue siendo un hueco débil si no se coordina el encuentro con el SATE.' },
      { q: '¿Hay ayudas?', a: 'Pueden existir programas autonómicos o estatales, con requisitos y plazos variables. Ver [ayudas](/guias/ayudas-rehabilitacion-edificios/) y comprobar la convocatoria vigente.' },
    ],
    body: `## En qué consiste

El sistema se adhiere y se ancla al soporte, se arma con malla y se reviste. Los puntos delicados son zócalo, cajas de persiana, palomillas de toldo y coronación. El [CTE DB-HE](https://www.codigotecnico.org/DocumentosCTE/AhorroEnergia.html) marca exigencias de envolvente cuando el alcance del proyecto entra en su ámbito.

## Precio

Espesor, tipo de aislante, número de huecos, andamio y dificultad de recercados. Guía: [cuánto cuesta instalar SATE](/guias/cuanto-cuesta-instalar-sate/).`,
  },
  {
    slug: 'rehabilitacion-energetica',
    title: 'Rehabilitación energética de edificios | Rehabilita tu Edificio',
    description:
      'Envolvente, huecos e instalaciones comunes para reducir la demanda energética de un edificio. Compara actuaciones y presupuestos.',
    h1: 'Rehabilitación energética de un edificio: primero la demanda, después el equipo',
    keyword: 'rehabilitación energética de edificios',
    answer:
      'La rehabilitación energética reduce la demanda del edificio actuando sobre fachada, cubierta, huecos y, si procede, instalaciones comunes. No consiste en colocar un aparato más potente sobre una envolvente llena de puentes térmicos. El IEE ayuda a priorizar, pero no sustituye el proyecto.',
    related: ['/servicios/aislamiento-sate/', '/servicios/ite-iee/', '/guias/ayudas-rehabilitacion-edificios/'],
    faqs: [
      { q: '¿Por dónde empezar?', a: 'Por las pérdidas mayores: cubierta, fachada y huecos. Un equipo de climatización nuevo sobre una fachada sin aislar suele decepcionar.' },
      { q: '¿El IEE obliga a ejecutar?', a: 'El informe evalúa; la obligación de obras depende de la normativa autonómica o municipal y de los acuerdos de la comunidad.' },
      { q: '¿Las ayudas cubren todo?', a: 'Nunca lo des por sentado. Cada convocatoria fija bases, plazos y documentación. Lee [ayudas a la rehabilitación](/guias/ayudas-rehabilitacion-edificios/).' },
      { q: '¿Afecta a viviendas interiores?', a: 'La envolvente es común; las ventanas de cada casa pueden ser privativas. Hay que aclarar qué paga la comunidad y qué cada propietario.' },
    ],
    body: `## Problemas

Condensaciones, facturas altas, IEE con letra baja y fachadas que ya hay que rehabilitar. Combinar [SATE](/servicios/aislamiento-sate/) con cubierta e [ITE/IEE](/servicios/ite-iee/) evita obras desordenadas.

## Precio

Depende de si se toca solo un capítulo o varios, de andamios y de si hay cambio de huecos. No uses un único €/m² de vivienda como si el edificio fuera un piso.`,
  },
  {
    slug: 'refuerzo-estructural',
    title: 'Refuerzo estructural en edificios existentes | Rehabilita tu Edificio',
    description:
      'Cuándo un edificio necesita refuerzo de forjados o pilares y cómo pedir presupuestos a partir de un diagnóstico, no de una grieta fotografiada.',
    h1: 'Refuerzo estructural: primero el diagnóstico, después la partida de obra',
    keyword: 'refuerzo estructural edificios',
    answer:
      'Un refuerzo estructural interviene forjados, vigas, pilares o cantos cuando hay daño o falta de capacidad. No se presupuesta por foto de una grieta. Hace falta informe técnico que distinga patología de un defecto de revestimiento, y después empresas que ejecuten ese refuerzo concreto.',
    related: ['/servicios/reparacion-grietas/', '/servicios/ite-iee/', '/servicios/rehabilitacion-integral-edificios/'],
    faqs: [
      { q: '¿Toda grieta pide refuerzo?', a: 'No. Muchas son de retracción o de revestimiento. El refuerzo entra cuando el informe apunta a capacidad o a daño en el soporte.' },
      { q: '¿Se puede vivir en el edificio durante la obra?', a: 'A veces sí, con fases y apeos. Eso debe estar en el plan de obra, no improvisarse en el rellano.' },
      { q: '¿Quién firma el proyecto?', a: 'Un técnico competente según la LOE. Esta web no redacta proyectos ni dirige la ejecución.' },
      { q: '¿Cómo se compara el precio?', a: 'Por unidades de refuerzo (ml, m², pilares), apeos, medios auxiliares y ensayos, no por un tanto alzado opaco.' },
    ],
    body: `## Problemas

Fisuras en dinteles, flechas en forjados, corrosión de cantos y un ITE que habla de estructura. Relaciónalo con [reparación de grietas](/servicios/reparacion-grietas/) para no confundir el orden: diagnóstico, luego obra.

## Permisos

Un refuerzo suele exigir proyecto y licencia de mayor alcance que una pintura. El municipio concreta el trámite.`,
  },
  {
    slug: 'reparacion-grietas',
    title: 'Reparación de grietas en fachadas y comunidades | Rehabilita tu Edificio',
    description:
      'Cómo distinguir una grieta de revestimiento de un daño estructural y qué pedir en un presupuesto de reparación en comunidades.',
    h1: 'Reparar grietas en un edificio: no tapes hasta saber si se mueve',
    keyword: 'reparación de grietas fachada',
    answer:
      'Reparar grietas en fachada o patio empieza por clasificarlas: retracción, asiento, canto de forjado o daño estructural. Un sellado estético sobre una fisura activa vuelve a abrir. Pide inspección, y solo después un presupuesto de grapado, inyección o refuerzo.',
    related: ['/servicios/refuerzo-estructural/', '/servicios/rehabilitacion-fachadas/', '/guias/reparar-grietas-fachada/'],
    faqs: [
      { q: '¿Se puede sellar y pintar?', a: 'Solo si el informe dice que está inactiva y es de revestimiento. Si hay movimiento, el sellado es un parche.' },
      { q: '¿Hace falta andamio?', a: 'En fachada, casi siempre para inspeccionar y para ejecutar. Inclúyelo en la comparación.' },
      { q: '¿Las grietas de patio son menos graves?', a: 'Pueden señalar bajantes, humedad o estructura. No las minusvalores por no verse desde la calle.' },
      { q: '¿Cuánto cuesta?', a: 'Va de un sellado local a un refuerzo. La [guía de grietas](/guias/reparar-grietas-fachada/) explica factores, no una tarifa.' },
    ],
    body: `## Lectura rápida

Grieta horizontal en canto de forjado, escalonada en ladrillo, o en esquina de hueco: cada patrón sugiere una causa. Un técnico lo confirma; esta página no sustituye esa visita.

## Actuación

Testigos, grapas, morteros flexibles o paso a [refuerzo](/servicios/refuerzo-estructural/). El orden evita pagar dos veces el andamio.`,
  },
  {
    slug: 'accesibilidad-comunidades',
    title: 'Accesibilidad en comunidades de propietarios | Rehabilita tu Edificio',
    description:
      'Ascensor, rampas y portales: cómo plantear la supresión de barreras en un edificio y comparar presupuestos de accesibilidad.',
    h1: 'Accesibilidad en la comunidad: portal, ascensor y recorrido hasta la vivienda',
    keyword: 'accesibilidad comunidades de propietarios',
    answer:
      'La accesibilidad en comunidades cubre desniveles de portal, instalación o ampliación de ascensor, rampas y puertas. No es una reforma de vivienda: actúa sobre elementos comunes. Las mayorías y las ayudas dependen de la Ley de Propiedad Horizontal y de la normativa autonómica vigente.',
    related: ['/servicios/ite-iee/', '/guias/quien-paga-rehabilitacion-comunidad/', '/servicios/rehabilitacion-integral-edificios/'],
    faqs: [
      { q: '¿Obliga la ley a poner ascensor?', a: 'Hay supuestos de accesibilidad y de mayorías específicas. Confírmalo con el administrador y la normativa vigente, no con un eslogan comercial.' },
      { q: '¿Cabe un ascensor en cualquier caja de escalera?', a: 'No. Hay que medir hueco, forjados y normativa de incendio. A veces se propone exterior a patio o a fachada, con más permisos.' },
      { q: '¿Quién paga?', a: 'Como regla, los propietarios según su cuota, con matices legales. Ver [quién paga una rehabilitación](/guias/quien-paga-rehabilitacion-comunidad/).' },
      { q: '¿Se puede hacer solo la rampa del portal?', a: 'Sí, si el acuerdo y el espacio lo permiten. Un tramo accesible que muere en un segundo escalón no resuelve el recorrido.' },
    ],
    body: `## Problemas

Escalones a la calle, portal estrecho, ausencia de ascensor en cuatro plantas y sillas de ruedas que no giran. Una ITE puede señalarlo; la comunidad decide la actuación.

## Precio

Un salvaescaleras no se compara con un hueco de ascensor nuevo. Pide croquis, afecciones a viviendas bajas y licencia de obra mayor si hay estructura.`,
  },
  {
    slug: 'reforma-patios-interiores',
    title: 'Reforma de patios y zonas comunes | Rehabilita tu Edificio',
    description:
      'Pavimentos, bajantes vistas y revestimientos de patios de luces. Compara presupuestos de zonas comunes sin tratarlos como una reforma de vivienda.',
    h1: 'Patios y zonas comunes: agua, bajantes y un solado que se pueda mantener',
    keyword: 'reforma de patios interiores comunidades',
    answer:
      'Reformar un patio de luces o una zona común atiende pavimento, evacuación, bajantes vistas e iluminación. No es interiorismo: es higiene del edificio y control de humedad. Un presupuesto comparable incluye demoliciones, pendientes hacia sumideros y protección de viviendas que dan al patio.',
    related: ['/servicios/sustitucion-bajantes/', '/servicios/impermeabilizacion-cubiertas/', '/servicios/rehabilitacion-fachadas/'],
    faqs: [
      { q: '¿El patio es elemento común?', a: 'En la mayoría de escrituras sí. Revisa el título constitutivo si hay trasteros o tendederos privativos.' },
      { q: '¿Hay que cambiar bajantes a la vez?', a: 'Si están vistas y degradadas, suele ser el momento. Ver [sustitución de bajantes](/servicios/sustitucion-bajantes/).' },
      { q: '¿Se puede cerrar el patio?', a: 'Eso ya no es mantenimiento: puede exigir licencia, acuerdo y, a veces, incompatibilidad urbanística.' },
      { q: '¿Cómo se protege a quien vive al patio?', a: 'Pide plan de polvo, andamio interior y horarios. Es tan relevante como el solado.' },
    ],
    body: `## Problemas

Solado helado, humedad en plantas bajas, bajantes de fibrocemento y falta de pendiente. El patio concentra agua que la fachada principal no enseña.

## Precio

M², número de plantas del vacío, estado de bajantes y si hay que montar andamio interior. No uses tarifas de terraza de vivienda.`,
  },
  {
    slug: 'sustitucion-bajantes',
    title: 'Sustitución de bajantes en comunidades | Rehabilita tu Edificio',
    description:
      'Fugas, olores y redes antiguas: cómo plantear la sustitución de bajantes en un edificio y qué debe incluir el presupuesto.',
    h1: 'Sustituir bajantes en un edificio: la red vertical no se resuelve con un codo visto',
    keyword: 'sustitución de bajantes comunidades',
    answer:
      'Sustituir bajantes implica la red vertical de aguas, arquetas y encuentros con cubierta o patio. Un tramo parcheado en un rellano no cura un material agotado en toda la altura. Pide medición en ml, diámetros, número de viviendas afectadas y cómo se acometen las conexiones privativas.',
    related: ['/servicios/reforma-patios-interiores/', '/servicios/reparacion-cubiertas-tejados/', '/servicios/rehabilitacion-integral-edificios/'],
    faqs: [
      { q: '¿Fibrocemento qué trámite pide?', a: 'La retirada de materiales con amianto tiene normativa específica y empresas habilitadas. No lo trate una cuadrilla genérica como escombro mixto.' },
      { q: '¿Hay que entrar en las viviendas?', a: 'Casi siempre en el punto de conexión. Incluye ese acceso en el plan de obra.' },
      { q: '¿Se puede forrar en lugar de sustituir?', a: 'Hay sistemas de envejecimiento interior. El técnico debe decir si el soporte lo permite; no es un atajo universal.' },
      { q: '¿Cuánto dura la obra?', a: 'Depende de plantas, patio o patio de instalaciones, y de si se sustituye en vertical completa. Pide calendario por columnas.' },
    ],
    body: `## Problemas

Humedades en patios, olores en cuartos húmedos de plantas bajas y roturas por raíces en arquetas. Relaciónalo con [patios](/servicios/reforma-patios-interiores/) si la red va vista.

## Precio

Metros lineales, número de columnas, amianto si existe, andamio de patio y reposiciones de albañilería. El €/ml sin contexto no sirve.`,
  },
  {
    slug: 'ite-iee',
    title: 'ITE e IEE de edificios: diferencias y siguientes pasos | Rehabilita tu Edificio',
    description:
      'Qué es la inspección técnica del edificio y el informe de evaluación, en qué se diferencian y cómo pasar de un resultado desfavorable a presupuestos reales.',
    h1: 'ITE e IEE: dos informes distintos para decidir obras en el edificio',
    keyword: 'ITE IEE edificios',
    answer:
      'La ITE revisa el estado de conservación del edificio. El IEE incorpora, además, accesibilidad y evaluación energética, según el marco autonómico. Ni uno ni otro son un presupuesto. Sirven para priorizar partidas y, si sale desfavorable, para pedir ofertas de reparación concretas.',
    related: ['/guias/diferencia-ite-iee/', '/servicios/rehabilitacion-fachadas/', '/servicios/rehabilitacion-energetica/'],
    faqs: [
      { q: '¿Cuándo toca pasar la ITE?', a: 'Lo fija la comunidad autónoma y, a veces, el ayuntamiento, en función de la antigüedad. Comprueba la ordenanza de tu municipio; no hay una sola edad para toda España.' },
      { q: '¿Qué pasa si es desfavorable?', a: 'Habrá que ejecutar o proyectar las medidas que indique el informe, en el plazo que marque la administración competente.' },
      { q: '¿El IEE sustituye a la ITE?', a: 'En algunos marcos el IEE engloba la inspección. En otros conviven. Lee [la diferencia entre ITE e IEE](/guias/diferencia-ite-iee/).' },
      { q: '¿Quién lo encarga?', a: 'La comunidad, habitualmente a través del presidente o del administrador, a un técnico competente.' },
    ],
    body: `## Para qué sirve cada uno

La ITE habla de seguridad de fachada, cubierta, estructura e instalaciones. El IEE añade una lectura energética y de barreras. Un resultado desfavorable en fachada enlaza con [rehabilitación de fachadas](/servicios/rehabilitacion-fachadas/); uno energético, con [rehabilitación energética](/servicios/rehabilitacion-energetica/).

Esta web no emite ITE ni IEE. Ayuda a interpretar el siguiente paso y a solicitar presupuestos de las obras que el informe señale.`,
  },
];

for (const service of services) {
  writeMdx(`src/content/services/${service.slug}.mdx`, {
    title: service.title,
    description: service.description,
    h1: service.h1,
    primaryKeyword: service.keyword,
    searchIntent: 'commercial',
    layoutId: `svc-${service.slug}`,
    path: `/servicios/${service.slug}/`,
    pageType: 'service',
    ...stamp,
    sources: ['CTE', 'F1'],
    relatedPages: service.related,
    ctaLabel: 'Solicitar presupuestos de esta actuación',
    clickref: `${service.slug}_hero`,
    answer: service.answer,
    faqs: service.faqs,
  }, service.body);
}

console.log(`services ${services.length}`);

const guides = [
  {
    slug: 'cuanto-cuesta-rehabilitar-edificio',
    title: 'Cuánto cuesta rehabilitar un edificio en 2026 | Rehabilita tu Edificio',
    description: 'Factores que mueven el coste de rehabilitar un edificio y por qué no existe una tarifa única por metro cuadrado de vivienda.',
    h1: 'Cuánto cuesta rehabilitar un edificio: factores, no una tarifa cerrada',
    keyword: 'cuánto cuesta rehabilitar un edificio',
    answer: 'El coste de rehabilitar un edificio depende de la superficie de fachada y cubierta, de las plantas, del estado, de los andamios, de las licencias y de si hay estructura o accesibilidad. Un €/m² de vivienda induce a error porque se paga envolvente y zonas comunes, no el interior de cada casa.',
    related: ['/servicios/rehabilitacion-integral-edificios/', '/precios/', '/guias/precio-rehabilitar-fachada/'],
    faqs: [
      { q: '¿Hay un precio oficial por m²?', a: 'No. Hay referencias de mercado y bandas orientativas. Cada edificio se mide.' },
      { q: '¿El andamio puede superar el revestimiento?', a: 'En calles estrechas o edificios altos, sí. Debe ir desglosado.' },
      { q: '¿Las ayudas bajan el presupuesto de la empresa?', a: 'Las ayudas, si existen, se tramitan aparte. El presupuesto de obra debe poder entenderse sin ellas.' },
      { q: '¿Se puede comparar un llave en mano?', a: 'Solo si todas las empresas incluyen las mismas partidas y exclusiones.' },
    ],
    body: `## Respuesta directa

No cites un único número. Pide medición de fachada y cubierta, plantas, medios auxiliares y estado. Esta página se revisó el 2026-09-21.

## Qué mueve el total

Superficie real de actuación, accesos, materiales, andamios, licencias, ubicación y tipo de intervención (fachada, SATE, cubierta, integral). Los importes de calculadoras de esta web son intervalos. Cada edificio necesita valoración técnica.

Consulta el [CTE](https://www.codigotecnico.org/) como marco técnico y tu ayuntamiento para tasas de ocupación de vía.`,
  },
  {
    slug: 'precio-rehabilitar-fachada',
    title: 'Precio de rehabilitar una fachada comunitaria | Rehabilita tu Edificio',
    description: 'Qué debe incluir un presupuesto de fachada y qué factores cambian el precio en una comunidad de propietarios.',
    h1: 'Precio de rehabilitar una fachada: metros de envolvente, no de vivienda',
    keyword: 'precio rehabilitar fachada',
    answer: 'El precio de rehabilitar una fachada se calcula sobre los metros de fachada, el sistema (revestimiento, aplacado o SATE), los huecos, los cantos de forjado y el andamio. No conviertas el total en €/m² de piso: distorsiona la comparación.',
    related: ['/servicios/rehabilitacion-fachadas/', '/guias/cuanto-cuesta-instalar-sate/', '/guias/permisos-rehabilitar-fachada/'],
    faqs: [
      { q: '¿Pintar es rehabilitar?', a: 'Pintar sobre un soporte suelto no corrige desprendimientos. El presupuesto debe decir si hay picado, anclajes o solo recubrimiento.' },
      { q: '¿Los balcones van aparte?', a: 'Deben aparecer. Son puntos caros y sensibles de seguridad.' },
      { q: '¿El IVA cómo se trata?', a: 'El tipo aplicable lo determina la normativa fiscal vigente y el tipo de obra. Pide que el presupuesto lo aclare; esta guía no asesora fiscalmente.' },
    ],
    body: `## Cómo leer una oferta

Lista: andamio y ocupación de vía, picado, soporte, sistema de acabado, recercados, cantos, residuos y seguridad. Si falta una línea, no compares el total.

Revisión 2026-09-21. El municipio puede imponer tasas de vado no incluidas en la oferta de la empresa.`,
  },
  {
    slug: 'cuanto-cuesta-instalar-sate',
    title: 'Cuánto cuesta instalar SATE en un edificio | Rehabilita tu Edificio',
    description: 'Espesor, huecos y andamio: factores del coste de un SATE comunitario y advertencias para no usar una tarifa única.',
    h1: 'Cuánto cuesta instalar SATE: el paño es la parte fácil del presupuesto',
    keyword: 'cuánto cuesta instalar SATE',
    answer: 'El coste de un SATE se mueve con el espesor, el tipo de aislante, el número de huecos, los zócalos y el andamio. Un precio de paño liso no sirve si el edificio está lleno de recercados. Es orientación de 2026, no una cotización.',
    related: ['/servicios/aislamiento-sate/', '/servicios/rehabilitacion-energetica/', '/guias/ayudas-rehabilitacion-edificios/'],
    faqs: [
      { q: '¿Más espesor es siempre mejor?', a: 'Hasta el punto que justifique el proyecto y la normativa de incendio y de huecos. No improvises espesor por catálogo.' },
      { q: '¿Hay que cambiar alféizares?', a: 'Casi siempre, porque el plano de fachada sale. Inclúyelo.' },
      { q: '¿Las ayudas cubren el SATE?', a: 'Depende de la convocatoria. Ver [ayudas](/guias/ayudas-rehabilitacion-edificios/).' },
    ],
    body: `## Factores

Andamio, arranque, coronación, palomillas, cajas de persiana y encuentro con cubierta. El [DB-HE](https://www.codigotecnico.org/DocumentosCTE/AhorroEnergia.html) aplica cuando el alcance del proyecto entra en su ámbito.

Revisión 2026-09-21.`,
  },
  {
    slug: 'quien-paga-rehabilitacion-comunidad',
    title: 'Quién paga una rehabilitación en una comunidad | Rehabilita tu Edificio',
    description: 'Reglas generales de la propiedad horizontal sobre quién sufragía fachada, cubierta o ascensor, con advertencia de que cada caso depende del título y de la ley vigente.',
    h1: 'Quién paga una rehabilitación en la comunidad: elementos comunes y mayorías',
    keyword: 'quién paga rehabilitación comunidad',
    answer: 'Como regla, las obras en elementos comunes las pagan los propietarios según su cuota de participación. Hay matices para accesibilidad, mejoras y elementos privativos. La Ley de Propiedad Horizontal y el título constitutivo mandan; esta guía no es un dictamen jurídico.',
    related: ['/servicios/accesibilidad-comunidades/', '/guias/elegir-empresa-rehabilitacion/', '/servicios/rehabilitacion-integral-edificios/'],
    faqs: [
      { q: '¿Un bajo paga fachada?', a: 'Si la fachada es común, suele participar según cuota, salvo previsión distinta en el título. Confírmalo con el administrador.' },
      { q: '¿El local comercial se excluye?', a: 'Depende de estatutos y de si se beneficia del elemento. No hay una respuesta nacional única.' },
      { q: '¿Se puede fraccionar el pago a la empresa?', a: 'Es un acuerdo con la empresa, distinto de cómo se reparte internamente la comunidad.' },
    ],
    body: `## Marco

Consulta la [Ley de Propiedad Horizontal](https://www.boe.es/buscar/act.php?id=BOE-A-1960-10906). Las mayorías cambian si la obra es necesaria, de accesibilidad o de mejora. Un abogado o el administrador interpretan el caso.

Revisión 2026-09-21. No tomes esta página como asesoramiento legal.`,
  },
  {
    slug: 'permisos-rehabilitar-fachada',
    title: 'Permisos para rehabilitar una fachada | Rehabilita tu Edificio',
    description: 'Licencia, ocupación de vía y andamio: qué trámites suelen aparecer al rehabilitar la fachada de un edificio y por qué dependen del municipio.',
    h1: 'Permisos para rehabilitar una fachada: la licencia la define el ayuntamiento',
    keyword: 'permisos rehabilitar fachada',
    answer: 'Rehabilitar una fachada suele exigir comunicación o licencia municipal, ocupación de vía si hay andamio y, en fincas protegidas, informe de patrimonio. No hay un formulario único para España: cada ayuntamiento fija el trámite y las tasas.',
    related: ['/servicios/rehabilitacion-fachadas/', '/guias/precio-rehabilitar-fachada/', '/servicios/ite-iee/'],
    faqs: [
      { q: '¿Quién tramita, la comunidad o la empresa?', a: 'Debe quedar escrito. Muchas comunidades delegan, pero la responsabilidad frente al ayuntamiento sigue siendo del titular del inmueble.' },
      { q: '¿Un SATE pide más papeles que pintar?', a: 'Normalmente sí, porque cambia espesor y a veces huecos. El técnico lo encuadra.' },
      { q: '¿Y si la ITE es desfavorable?', a: 'El informe no sustituye la licencia de las obras que se ejecuten después.' },
    ],
    body: `## Qué preguntar en el ayuntamiento

Tipo de expediente, plazo, tasas de vado, protecciones de acera y si la finca está catalogada. El [CTE](https://www.codigotecnico.org/) no es una licencia.

Revisión 2026-09-21. Verifica la sede electrónica de tu municipio.`,
  },
  {
    slug: 'diferencia-ite-iee',
    title: 'Diferencia entre ITE e IEE | Rehabilita tu Edificio',
    description: 'ITE e IEE no son el mismo documento. Qué revisa cada uno y cómo usarlos para decidir obras, sin inventar una norma única para toda España.',
    h1: 'Diferencia entre ITE e IEE: conservación frente a evaluación más amplia',
    keyword: 'diferencia ITE IEE',
    answer: 'La ITE se centra en el estado de conservación. El IEE suele incorporar accesibilidad y eficiencia energética, según el marco autonómico. En algunos territorios el IEE absorbe la inspección; en otros conviven. Comprueba la norma de tu comunidad.',
    related: ['/servicios/ite-iee/', '/servicios/rehabilitacion-energetica/', '/guias/ayudas-rehabilitacion-edificios/'],
    faqs: [
      { q: '¿Quién la firma?', a: 'Un técnico competente. Ni la comunidad ni esta web emiten el documento.' },
      { q: '¿Sirve para pedir ayudas?', a: 'A menudo piden IEE o certificado energético actualizado. Lee las bases de la convocatoria.' },
      { q: '¿Si es favorable no hay que hacer nada?', a: 'Puede recomendar mantenimiento. Favorable no significa que la fachada dure otra década sin mirarla.' },
    ],
    body: `## Cómo usar el resultado

Traduce cada deficiencia a una partida: fachada, cubierta, accesos, energía. Luego pide presupuestos de esas partidas, no un “arreglo genérico”.

Revisión 2026-09-21. La edad de inspección la fija la normativa autonómica o local.`,
  },
  {
    slug: 'ayudas-rehabilitacion-edificios',
    title: 'Ayudas a la rehabilitación de edificios | Rehabilita tu Edificio',
    description: 'Cómo aproximarse a las ayudas de rehabilitación sin tratar una convocatoria caducada como un derecho. Qué documentación suele pedirse y qué no promete esta web.',
    h1: 'Ayudas a la rehabilitación de edificios: convoca, lee bases, no asumas el porcentaje',
    keyword: 'ayudas rehabilitación edificios',
    answer: 'Las ayudas a la rehabilitación de edificios cambian por año, comunidad autónoma y a veces municipio. Pueden exigir IEE, proyecto, mejora energética mínima y facturas. Esta guía no lista importes vigentes: te indica qué preguntar y que ninguna empresa debería vender la subvención como descuento ya cobrado.',
    related: ['/servicios/rehabilitacion-energetica/', '/guias/diferencia-ite-iee/', '/guias/cuanto-cuesta-instalar-sate/'],
    faqs: [
      { q: '¿Hay una ayuda estatal permanente?', a: 'Los programas tienen vigencia. Consulta el ministerio y tu comunidad en la fecha de tu acuerdo de junta.' },
      { q: '¿La empresa puede tramitarla?', a: 'Puede ayudar con papeles. La titularidad y los requisitos los cumple la comunidad.' },
      { q: '¿Si no hay ayuda no se rehabilita?', a: 'La necesidad de fachada o cubierta no espera a una convocatoria. Separa urgencia de oportunidad de incentivo.' },
    ],
    body: `## Qué preparar

Acuerdos de junta, IEE o certificado, proyecto, NIF de la comunidad y cuentas. Verifica siempre la web oficial de la administración que convoca. Revisión 2026-09-21.

No usamos cifras de programas caducados como si estuvieran abiertos.`,
  },
  {
    slug: 'elegir-empresa-rehabilitacion',
    title: 'Cómo elegir una empresa de rehabilitación de edificios | Rehabilita tu Edificio',
    description: 'Criterios para comparar empresas de fachada, cubierta o SATE: partidas, seguros, medios auxiliares y referencias de obra en altura, no slogans.',
    h1: 'Elegir empresa de rehabilitación: la misma lista de partidas para todos',
    keyword: 'elegir empresa rehabilitación edificios',
    answer: 'Elige una empresa de rehabilitación comparando el mismo alcance: medios auxiliares, sistema constructivo, plazos, residuos y exclusiones. Pide seguro, capacidad de trabajo en altura y cómo resuelven encuentros. No basta un total barato ni una foto de andamio ajeno.',
    related: ['/guias/cuanto-cuesta-rehabilitar-edificio/', '/servicios/rehabilitacion-fachadas/', '/guias/quien-paga-rehabilitacion-comunidad/'],
    faqs: [
      { q: '¿Cuántas ofertas pedir?', a: 'Al menos tres, con el mismo pliego. Dos llegan si el alcance está muy definido; una sola no se puede contrastar.' },
      { q: '¿Vale una empresa de reformas de pisos?', a: 'La obra en altura, andamios y comunidades pide oficio específico. Pregunta por medios y seguros de ese tipo de obra.' },
      { q: '¿Hay que visitar el edificio?', a: 'Sí. Un presupuesto sin visita es una hipótesis.' },
    ],
    body: `## Lista corta

Visita, desglose, andamio, plazos, forma de pago vinculada a hitos, y quién firma la dirección de obra si hace falta. Esta plataforma te ayuda a solicitar contactos a través de Habitissimo; no certifica a las empresas.

Revisión 2026-09-21.`,
  },
  {
    slug: 'reparar-grietas-fachada',
    title: 'Reparar grietas en fachada de un edificio | Rehabilita tu Edificio',
    description: 'Cómo leer una grieta de fachada comunitaria y qué pedir antes de sellar. Guía práctica para comunidades, no un diagnóstico a distancia.',
    h1: 'Reparar grietas de fachada: testigos y causa, luego el mortero',
    keyword: 'reparar grietas fachada edificio',
    answer: 'Una grieta de fachada se repara cuando se conoce si está activa y cuál es el soporte. Sellados sobre cantos oxidados o asientos fallan. Encarga inspección y, si procede, [refuerzo](/servicios/refuerzo-estructural/) antes de pintar.',
    related: ['/servicios/reparacion-grietas/', '/servicios/rehabilitacion-fachadas/', '/servicios/refuerzo-estructural/'],
    faqs: [
      { q: '¿Es urgente?', a: 'Si hay riesgo de desprendimiento, sí: protege la acera y llama a un técnico. Si es capilar en enfoscado, el plazo es de planificación.' },
      { q: '¿Un vecino puede reparar “su” trozo?', a: 'La fachada suele ser común. Un parche privativo desentona y no corta la causa.' },
    ],
    body: `## Pasos

Fotografiar con referencia, no cubrir, pedir visita, y comparar presupuestos de la actuación indicada. Revisión 2026-09-21.`,
  },
  {
    slug: 'impermeabilizar-cubierta-comunidad',
    title: 'Impermeabilizar la cubierta de una comunidad | Rehabilita tu Edificio',
    description: 'Pendientes, petos y uso transitable: guía para comunidades que arrastran goteras y necesitan un criterio de cubierta, no un parche.',
    h1: 'Impermeabilizar la cubierta comunitaria: el paño y los petos van juntos',
    keyword: 'impermeabilizar cubierta comunidad',
    answer: 'Impermeabilizar la cubierta de una comunidad exige pendientes, sumideros y detalles de peto. Un paño nuevo con un peto que vierte hacia dentro vuelve a filtrar. Pide sistema, transitabilidad y encuentros en el mismo documento.',
    related: ['/servicios/impermeabilizacion-cubiertas/', '/servicios/reparacion-cubiertas-tejados/', '/servicios/reforma-patios-interiores/'],
    faqs: [
      { q: '¿Se puede hacer en verano solo?', a: 'Ciertos sistemas tienen rango térmico. El proyectista o la ficha lo dicen. No lo improvises por calendario de vacaciones.' },
      { q: '¿Las antenas se levantan?', a: 'Deben resolverse con soportes y pasos estancos. Déjalas por escrito.' },
    ],
    body: `## Comparar ofertas

Mismo m², mismo número de encuentros, misma protección peatonal. Revisión 2026-09-21.`,
  },
];

for (const guide of guides) {
  writeMdx(`src/content/guides/${guide.slug}.mdx`, {
    title: guide.title,
    description: guide.description,
    h1: guide.h1,
    primaryKeyword: guide.keyword,
    searchIntent: 'informational',
    layoutId: `guide-${guide.slug}`,
    path: `/guias/${guide.slug}/`,
    pageType: 'guide',
    ...stamp,
    sources: ['CTE', 'LPH', 'F1'],
    relatedPages: guide.related,
    ctaLabel: 'Solicitar presupuestos',
    clickref: `guia_${guide.slug}_cta`,
    answer: guide.answer,
    faqs: guide.faqs,
  }, guide.body);
}

console.log(`guides ${guides.length}`);

const { geoCopy } = await import('./geo-copy.mjs');
const { locations } = await import('../src/data/locations.ts');

const variants = ['split-climate', 'problems-first', 'permits-first', 'stock-first', 'process-first', 'budget-first'];

for (const loc of locations) {
  const copy = geoCopy[loc.slug];
  if (!copy) throw new Error(`Falta copy para ${loc.slug}`);
  const extra = `El parque se describe aquí como ${loc.stock}, bajo un clima ${loc.climate}. El hilo de esta landing es ${loc.angle}. ${loc.permitHint} Los importes que veas en calculadoras o tablas de esta web son orientativos: cada edificio necesita medición de fachada o cubierta, medios auxiliares y, si procede, proyecto. Revisión editorial ${stamp.updatedAt}. No somos una constructora ni tenemos delegación en ${loc.name}: la solicitud de presupuesto se completa a través de Habitissimo para que profesionales de la zona puedan contactar.`;
  const body = `## Contexto local

${copy.intro}

${extra}

## Actuaciones que más se consultan

Fachada o [SATE](/servicios/aislamiento-sate/), [cubierta](/servicios/reparacion-cubiertas-tejados/), [accesibilidad](/servicios/accesibilidad-comunidades/) e [ITE o IEE](/servicios/ite-iee/). El orden lo marca el informe y la junta, no un pack comercial.

## Cómo solicitar presupuestos

Describe plantas, tipo de envolvente y si hay andamio o cubierta en mal estado. Usa el botón de esta página: el identificador de seguimiento queda asociado a ${loc.name}.`;

  writeMdx(`src/content/locations/${loc.slug}.mdx`, {
    title: copy.title,
    description: copy.description,
    h1: copy.h1,
    primaryKeyword: copy.keyword,
    searchIntent: 'commercial',
    layoutId: loc.layoutId,
    layoutVariant: loc.layoutVariant,
    path: `/rehabilitacion-edificios/${loc.slug}/`,
    pageType: 'geo',
    citySlug: loc.slug,
    ...stamp,
    sources: ['CTE', 'ITE', 'F1'],
    relatedPages: loc.related.map((slug) => `/rehabilitacion-edificios/${slug}/`),
    ctaLabel: `Encontrar profesionales en ${loc.name}`,
    clickref: `${loc.slug}_hero`,
    answer: copy.answer,
    faqs: copy.faqs,
  }, body);
}

console.log(`locations ${locations.length}`);

