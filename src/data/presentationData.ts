export type ScopePreset = 'south-africa' | 'corridor-eu' | 'global';

export interface RouteStop {
  id: string;
  order: number;
  name: string;
  country: string;
  coords: [number, number];
  type: 'produccion' | 'control' | 'puerto' | 'maritimo' | 'retail';
  typeLabel: string;
  coldChain: string;
  role: string;
  detail: string;
  isHub?: boolean;
}

export interface TradeRoute {
  id: string;
  code: string;
  name: string;
  shortName: string;
  scope: ScopePreset[];
  color: string;
  mode: 'terrestre' | 'maritimo';
  origin: string;
  destination: string;
  distanceLabel: string;
  transitTime: string;
  sharePercent: number;
  shareLabel: string;
  varieties: string[];
  summary: string;
  alert?: string;
  pathCoords: [number, number][];
  stops: RouteStop[];
}

export interface TourWaypoint {
  id: string;
  step: number;
  kicker: string;
  title: string;
  description: string;
  highlight: string;
  center: [number, number];
  zoom: number;
  focusRouteId?: string;
  scope: ScopePreset;
}

export interface DialogueTurn {
  speaker: string;
  student: string;
  role: string;
  delegation: 'cga' | 'auchan' | 'mediator';
  verbal: string;
  nonVerbal: string;
  expression: string;
}

export interface NegotiationPhase {
  id: number;
  title: string;
  shortTitle: string;
  timeRange: string;
  objective: string;
  cgaOffer: number | null;
  auchanOffer: number | null;
  agreedPrice: number | null;
  tensionLevel: number; // 0-100
  keyMilestone: string;
  turns: DialogueTurn[];
}

export interface CulturalDimension {
  id: string;
  label: string;
  southAfricaScore: number;
  franceScore: number;
  southAfricaTag: string;
  franceTag: string;
}

export interface CulturalTopic {
  id: string;
  title: string;
  southAfrica: {
    headline: string;
    summary: string;
    bullets: string[];
  };
  france: {
    headline: string;
    summary: string;
    bullets: string[];
  };
}

export const SCOPE_VIEWS: Record<
  ScopePreset,
  {
    label: string;
    center: [number, number];
    zoom: number;
    bounds?: [[number, number], [number, number]];
    subtitle: string;
  }
> = {
  'south-africa': {
    label: 'África Austral',
    center: [-28.8, 25.0],
    zoom: 5,
    bounds: [
      [-35.4, 15.0],
      [-18.8, 34.8],
    ],
    subtitle: 'Territorio productivo CGA (Sudáfrica + 5 países australes) y salidas portuarias',
  },
  'corridor-eu': {
    label: 'CGA → Auchan',
    center: [11.0, 6.0],
    zoom: 3,
    bounds: [
      [-35.8, -19.5],
      [53.5, 32.0],
    ],
    subtitle: 'Corredor marítimo CIF en contraestación hacia Francia y Europa',
  },
  global: {
    label: 'Red Global',
    center: [12.0, 26.0],
    zoom: 2,
    bounds: [
      [-36.5, -78.0],
      [54.5, 124.0],
    ],
    subtitle: 'Alcance internacional CGA en más de 120 países y mercados de diversificación',
  },
};

export const TRADE_ROUTES: TradeRoute[] = [
  {
    id: 'ruta-za-w',
    code: 'CGA-W01',
    name: 'Cabo Occidental y Norte → Puerto de Ciudad del Cabo',
    shortName: 'Cabo Occidental / Norte',
    scope: ['south-africa', 'corridor-eu'],
    color: '#C85A17',
    mode: 'terrestre',
    origin: 'Valle del Río Orange (Northern Cape)',
    destination: 'Puerto de Ciudad del Cabo',
    distanceLabel: '780 km',
    transitTime: '14 hrs (reefer)',
    sharePercent: 32,
    shareLabel: '32% volumen nacional',
    varieties: ['Naranja Navel', 'Mandarina suave', 'Limón', 'Toronja'],
    summary:
      'Regiones estratégicas de Western y Northern Cape con estatus fitosanitario privilegiado, clave para envíos hacia la Unión Europea y Norteamérica bajo acuerdos preferenciales.',
    pathCoords: [
      [-28.76, 20.61],
      [-30.45, 19.65],
      [-32.18, 18.89],
      [-32.59, 19.01],
      [-33.32, 19.35],
      [-33.8, 19.88],
      [-33.86, 19.12],
      [-33.9, 18.43],
    ],
    stops: [
      {
        id: 'zw-1',
        order: 1,
        name: 'Valle del Río Orange (Northern Cape)',
        country: 'Sudáfrica',
        coords: [-28.76, 20.61],
        type: 'produccion',
        typeLabel: 'Zona productora',
        coldChain: 'Pre-enfriado 4°C',
        role: 'Productores con acceso preferencial',
        detail:
          'Zona árida de alta sanidad vegetal destacada por su acceso a mercados exigentes como EE. UU., Canadá y la Unión Europea.',
      },
      {
        id: 'zw-2',
        order: 2,
        name: 'Clanwilliam (Cederberg)',
        country: 'Sudáfrica',
        coords: [-32.18, 18.89],
        type: 'produccion',
        typeLabel: 'Empacadora y loteo',
        coldChain: 'Empaque 3°C',
        role: 'Trazabilidad por lote',
        detail:
          'Selección, control de límites máximos de residuos (LMR) y etiquetado trazable por caja de 15 kg.',
      },
      {
        id: 'zw-3',
        order: 3,
        name: 'Citrusdal (Western Cape)',
        country: 'Sudáfrica',
        coords: [-32.59, 19.01],
        type: 'control',
        typeLabel: 'Control técnico CRI',
        coldChain: '2.0°C controlada',
        role: 'Investigación y aseguramiento CRI',
        detail:
          'Corazón citrícola del Western Cape supervisado bajo protocolos científicos de Citrus Research International (CRI).',
      },
      {
        id: 'zw-4',
        order: 4,
        name: 'Robertson (Breede River Valley)',
        country: 'Sudáfrica',
        coords: [-33.8, 19.88],
        type: 'produccion',
        typeLabel: 'Acopio regional',
        coldChain: '2.0°C controlada',
        role: 'Consolidación de cítricos suaves',
        detail:
          'Consolidación de mandarinas y naranjas tardías de contraestación para exportación hacia el hemisferio norte.',
      },
      {
        id: 'zw-5',
        order: 5,
        name: 'Puerto de Ciudad del Cabo',
        country: 'Sudáfrica',
        coords: [-33.9, 18.43],
        type: 'puerto',
        typeLabel: 'Puerto exportador',
        coldChain: 'Terminal Reefer -0.5°C',
        role: 'Puerta atlántica hacia Europa y Norteamérica',
        detail:
          'Terminal frigorífica principal del Atlántico para embarques bajo Incoterm CIF hacia Europa (Auchan) y Norteamérica.',
        isHub: true,
      },
    ],
  },
  {
    id: 'ruta-za-e',
    code: 'CGA-E02',
    name: 'Cinturón Oriental y África Austral → Durban y Gqeberha',
    shortName: 'Cinturón Oriental + Austral',
    scope: ['south-africa', 'corridor-eu'],
    color: '#1D6342',
    mode: 'terrestre',
    origin: 'Zimbabue · Limpopo · Eswatini',
    destination: 'Puertos de Durban y Ngqura/Gqeberha',
    distanceLabel: '1,920 km',
    transitTime: '28 hrs (red vial/ferro)',
    sharePercent: 68,
    shareLabel: '68% volumen austral',
    varieties: ['Naranja Valencia', 'Limón', 'Pomelo', 'Mandarina'],
    summary:
      'Integra productores de Limpopo, Mpumalanga, Eastern Cape y países vecinos miembros de CGA (Zimbabue, Eswatini, Mozambique, Namibia y Botsuana), incluyendo apoyo de CGA-GDC a agricultores emergentes.',
    alert:
      'Desafío crítico documentado: cuellos de botella y demoras logísticas en puertos sudafricanos + alza de insumos agrícolas.',
    pathCoords: [
      [-22.21, 30.0],
      [-23.88, 30.39],
      [-25.47, 30.97],
      [-26.52, 31.46],
      [-29.87, 31.04],
      [-31.6, 28.78],
      [-33.55, 25.69],
      [-33.8, 25.68],
    ],
    stops: [
      {
        id: 'ze-1',
        order: 1,
        name: 'Corredor Norte — Zimbabue',
        country: 'Zimbabue',
        coords: [-22.21, 30.0],
        type: 'produccion',
        typeLabel: 'Miembro regional CGA',
        coldChain: 'Camión Reefer 4°C',
        role: 'Integración África Austral',
        detail:
          'CGA amplió su representatividad más allá de Sudáfrica integrando a Zimbabue, Eswatini, Mozambique, Namibia y Botsuana.',
      },
      {
        id: 'ze-2',
        order: 2,
        name: 'Letsitele (Limpopo)',
        country: 'Sudáfrica',
        coords: [-23.88, 30.39],
        type: 'produccion',
        typeLabel: 'Zona productora',
        coldChain: 'Pre-enfriado 3°C',
        role: 'Producción de Valencia y pomelo',
        detail:
          'Uno de los polos de mayor volumen de exportación, beneficiado por asistencia técnica y programas de capacitación.',
      },
      {
        id: 'ze-3',
        order: 3,
        name: 'Nelspruit (Mpumalanga) y Eswatini',
        country: 'Sudáfrica / Eswatini',
        coords: [-25.47, 30.97],
        type: 'control',
        typeLabel: 'CGA-GDC Emergentes',
        coldChain: 'Inspección CRI 2°C',
        role: 'Inclusión de productores emergentes',
        detail:
          'Sede clave de programas de la CGA Grower Development Company (GDC) financiados con el aporte social de $0.15 USD/caja.',
      },
      {
        id: 'ze-4',
        order: 4,
        name: 'Puerto de Durban',
        country: 'Sudáfrica',
        coords: [-29.87, 31.04],
        type: 'puerto',
        typeLabel: 'Puerto principal',
        coldChain: 'Reefer Terminal -0.5°C',
        role: 'Mayor puerto citrícola del Índico',
        detail:
          'Concentra gran parte del flujo hacia Europa, Medio Oriente y Asia; punto sensible por cuellos de botella portuarios.',
        isHub: true,
      },
      {
        id: 'ze-5',
        order: 5,
        name: 'Sundays River Valley (Eastern Cape)',
        country: 'Sudáfrica',
        coords: [-33.55, 25.69],
        type: 'produccion',
        typeLabel: 'Polo limonero',
        coldChain: 'Pre-enfriado 3°C',
        role: 'Limón y naranja de exportación',
        detail:
          'Región líder en producción de limón y naranja para contraestación europea con estricta supervisión de calidad.',
      },
      {
        id: 'ze-6',
        order: 6,
        name: 'Puerto de Ngqura / Gqeberha',
        country: 'Sudáfrica',
        coords: [-33.8, 25.68],
        type: 'puerto',
        typeLabel: 'Puerto alternativo',
        coldChain: 'Terminal Reefer -0.5°C',
        role: 'Descongestión logística Eastern Cape',
        detail:
          'Salida marítima clave para mitigar demoras en Durban y garantizar cumplimiento de entregas continuas a Auchan.',
        isHub: true,
      },
    ],
  },
  {
    id: 'ruta-cif-eu',
    code: 'CIF-FR03',
    name: 'Corredor Principal — Sudáfrica → Francia y Europa (Auchan)',
    shortName: 'Corredor Auchan (CIF)',
    scope: ['corridor-eu', 'global'],
    color: '#22487A',
    mode: 'maritimo',
    origin: 'Durban / Ciudad del Cabo (ZA)',
    destination: 'Le Havre → Roubaix (Auchan FR + UE)',
    distanceLabel: '11,450 km',
    transitTime: '21–24 días marítimos',
    sharePercent: 38,
    shareLabel: '30%–40% exportación total',
    varieties: ['Naranja (15 kg)', 'Mandarina (15 kg)', 'Limón (15 kg)'],
    summary:
      'Eje central de la negociación: acuerdo marco de 3 años bajo Incoterm CIF a $10.15 USD/caja ($10.00 base + $0.15 productores emergentes), pago a 30 días, revisión anual tope 5% y protocolo de calidad compartido.',
    alert:
      'Regulación UE: tratamiento de frío estricto por Citrus Black Spot (casos OMC DS616 y DS624) + límites europeos de residuos.',
    pathCoords: [
      [-29.87, 31.04],
      [-34.6, 25.2],
      [-35.3, 19.6],
      [-33.9, 18.43],
      [-22.5, 6.2],
      [-6.5, -5.8],
      [9.5, -18.2],
      [26.8, -16.6],
      [36.13, -5.45],
      [42.8, -10.4],
      [48.9, -4.8],
      [49.48, 0.11],
      [50.69, 3.17],
      [51.4, 11.2],
      [52.23, 21.01],
    ],
    stops: [
      {
        id: 'eu-1',
        order: 1,
        name: 'Embarque CIF — Ciudad del Cabo',
        country: 'Sudáfrica',
        coords: [-33.9, 18.43],
        type: 'puerto',
        typeLabel: 'Salida Incoterm CIF',
        coldChain: 'Contenedor Reefer -0.5°C',
        role: 'Costo, Seguro y Flete asumidos por exportador',
        detail:
          'Despacho en contraestación cuando Europa no tiene cosecha propia, maximizando el valor de la fruta sudafricana.',
      },
      {
        id: 'eu-2',
        order: 2,
        name: 'Travesía Atlántico — Tratamiento de Frío',
        country: 'Aguas Internacionales',
        coords: [9.5, -18.2],
        type: 'maritimo',
        typeLabel: 'Protocolo CBS / OMC',
        coldChain: 'Tratamiento frío 22 días',
        role: 'Cumplimiento fitosanitario UE (DS616 / DS624)',
        detail:
          'Monitoreo continuo de temperatura en tránsito para cumplir normas fitosanitarias UE frente a la mancha negra de los cítricos.',
      },
      {
        id: 'eu-3',
        order: 3,
        name: 'Puerto de Algeciras (Red Alcampo)',
        country: 'España',
        coords: [36.13, -5.45],
        type: 'puerto',
        typeLabel: 'Entrada Ibérica',
        coldChain: 'Inspección compartida 2°C',
        role: 'Abasto a España (Alcampo) y Portugal',
        detail:
          'Punto estratégico de entrada para la red minorista de Auchan en la península ibérica (internacionalizada desde 1981).',
      },
      {
        id: 'eu-4',
        order: 4,
        name: 'Puerto de Le Havre',
        country: 'Francia',
        coords: [49.48, 0.11],
        type: 'puerto',
        typeLabel: 'Puerto destino CIF',
        coldChain: 'Aduana UE & Trazabilidad',
        role: 'Verificación documental y aduanal',
        detail:
          'Validación de certificados fitosanitarios, controles de residuos y trazabilidad por lote con costo de inspección compartido.',
        isHub: true,
      },
      {
        id: 'eu-5',
        order: 5,
        name: 'Sede Groupe Auchan — Roubaix',
        country: 'Francia',
        coords: [50.69, 3.17],
        type: 'retail',
        typeLabel: 'Hub Holding Elo',
        coldChain: 'Distribución omnicanal',
        role: 'Cúpula directiva (PDG) y plataforma francesa',
        detail:
          'Cuna de Auchan (fundada en 1961 por Gérard Mulliez). Coordina hipermercados, supermercados y Drive Click & Collect.',
        isHub: true,
      },
      {
        id: 'eu-6',
        order: 6,
        name: 'Red Europa Central (Polonia · Hungría · Rumanía)',
        country: 'Unión Europea',
        coords: [52.23, 21.01],
        type: 'retail',
        typeLabel: 'Cobertura europea',
        coldChain: 'Entregas ajustadas JIT',
        role: 'Abasto diferenciado y marca propia',
        detail:
          'Optimización logística omnicanal con menor inventario y entregas constantes durante toda la temporada.',
      },
    ],
  },
  {
    id: 'ruta-asia-me',
    code: 'DIV-AS04',
    name: 'Diversificación — Medio Oriente y Lejano Oriente (Asia)',
    shortName: 'Medio Oriente y Asia',
    scope: ['global'],
    color: '#176B78',
    mode: 'maritimo',
    origin: 'Puerto de Durban (ZA)',
    destination: 'Dubái → Chittagong → Shanghái',
    distanceLabel: '13,800 km',
    transitTime: '18–26 días marítimos',
    sharePercent: 36,
    shareLabel: 'Alta tasa de crecimiento',
    varieties: ['Pomelo / Toronja', 'Cítricos dulces', 'Naranja', 'Limón'],
    summary:
      'Eje clave de la estrategia CGA para reducir la dependencia de Europa (30–40%) y fortalecer su poder de negociación expandiendo cuotas en Asia (China, India, Bangladesh, Sudeste Asiático) y Medio Oriente.',
    pathCoords: [
      [-29.87, 31.04],
      [-21.2, 40.4],
      [-4.5, 46.8],
      [12.0, 54.8],
      [25.01, 55.06],
      [16.2, 66.5],
      [5.4, 80.5],
      [22.33, 91.81],
      [6.8, 97.5],
      [2.2, 101.8],
      [14.2, 114.6],
      [31.23, 121.47],
    ],
    stops: [
      {
        id: 'as-1',
        order: 1,
        name: 'Puerto de Jebel Ali (Dubái)',
        country: 'Emiratos Árabes Unidos',
        coords: [25.01, 55.06],
        type: 'puerto',
        typeLabel: 'Hub Medio Oriente',
        coldChain: 'Reefer 1°C',
        role: 'Volumen constante regional',
        detail:
          'Medio Oriente es uno de los mercados de mayor volumen constante para naranja, limón y mandarina sudafricana.',
        isHub: true,
      },
      {
        id: 'as-2',
        order: 2,
        name: 'Puerto de Chittagong',
        country: 'Bangladesh',
        coords: [22.33, 91.81],
        type: 'puerto',
        typeLabel: 'Sur de Asia',
        coldChain: 'Reefer 2°C',
        role: 'Expansión Asia Meridional',
        detail:
          'Mercado en rápido crecimiento junto con India y el Sudeste Asiático dentro de la estrategia de diversificación CGA.',
      },
      {
        id: 'as-3',
        order: 3,
        name: 'Puerto de Shanghái',
        country: 'China',
        coords: [31.23, 121.47],
        type: 'puerto',
        typeLabel: 'Lejano Oriente',
        coldChain: 'Tratamiento frío Asia',
        role: 'Demanda premium de pomelo y cítricos dulces',
        detail:
          'China encabeza el crecimiento asiático de CGA para pomelo, toronja y cítricos dulces de alta calidad.',
        isHub: true,
      },
    ],
  },
  {
    id: 'ruta-na-ee',
    code: 'PREF-NA05',
    name: 'Corredor Preferencial — Norteamérica (EE. UU. y Canadá)',
    shortName: 'Norteamérica (Preferencial)',
    scope: ['global'],
    color: '#A86A14',
    mode: 'maritimo',
    origin: 'Puerto de Ciudad del Cabo (ZA)',
    destination: 'Filadelfia (EE. UU.) → Montreal (Canadá)',
    distanceLabel: '12,600 km',
    transitTime: '22–25 días marítimos',
    sharePercent: 22,
    shareLabel: 'Acuerdos preferenciales',
    varieties: ['Mandarina suave', 'Naranja Navel', 'Cítricos Western/Northern Cape'],
    summary:
      'Mercado clave especialmente para los productores del Western y Northern Cape bajo acuerdos comerciales preferenciales; complementado por el mercado tradicional de Rusia y Europa del Este.',
    pathCoords: [
      [-33.9, 18.43],
      [-19.5, -3.5],
      [1.8, -28.0],
      [21.5, -52.5],
      [35.2, -68.0],
      [39.9, -75.14],
      [43.2, -67.5],
      [45.5, -73.55],
    ],
    stops: [
      {
        id: 'na-1',
        order: 1,
        name: 'Puerto de Filadelfia',
        country: 'Estados Unidos',
        coords: [39.9, -75.14],
        type: 'puerto',
        typeLabel: 'Entrada EE. UU.',
        coldChain: 'Protocolo USDA frío',
        role: 'Acuerdos preferenciales Western/Northern Cape',
        detail:
          'Principal puerto receptor en la costa este estadounidense para cítricos sudafricanos de contraestación.',
        isHub: true,
      },
      {
        id: 'na-2',
        order: 2,
        name: 'Puerto de Montreal',
        country: 'Canadá',
        coords: [45.5, -73.55],
        type: 'puerto',
        typeLabel: 'Entrada Canadá',
        coldChain: 'Reefer 1.5°C',
        role: 'Cobertura norteamericana',
        detail:
          'Consolida la presencia de CGA en más de 120 países rumbo a la meta Visión 260 (260 millones de cajas para 2032).',
      },
    ],
  },
];

export const TOUR_WAYPOINTS: TourWaypoint[] = [
  {
    id: 'tour-1',
    step: 1,
    kicker: 'Paso 1 de 6 · Origen Productivo',
    title: 'Territorio Citrícola de Sudáfrica y África Austral',
    description:
      'Fundada en 1997 tras la disolución del Citrus Board, la CGA representa a más de 1,400 productores en Sudáfrica, Zimbabue, Eswatini, Mozambique, Namibia y Botsuana, posicionando a Sudáfrica como el 2.º exportador mundial de cítricos frescos.',
    highlight: 'Meta Visión 260: 260 millones de cajas rentables y sostenibles para 2032',
    center: [-28.8, 25.2],
    zoom: 5,
    focusRouteId: 'ruta-za-w',
    scope: 'south-africa',
  },
  {
    id: 'tour-2',
    step: 2,
    kicker: 'Paso 2 de 6 · Investigación e Inclusión Social',
    title: 'Western Cape, CRI y Productores Emergentes (GDC)',
    description:
      'Mediante un gravamen legal por caja (statutory levy, 2002), CGA financia a Citrus Research International (CRI) en sanidad vegetal y a la CGA Grower Development Company para integrar a agricultores negros emergentes tras el apartheid.',
    highlight: 'En el acuerdo con Auchan se pactaron +$0.15 USD/caja para productores emergentes',
    center: [-32.9, 19.3],
    zoom: 7,
    focusRouteId: 'ruta-za-w',
    scope: 'south-africa',
  },
  {
    id: 'tour-3',
    step: 3,
    kicker: 'Paso 3 de 6 · Desafío Logístico Portuario',
    title: 'Puertos de Durban, Ngqura y Ciudad del Cabo',
    description:
      'Los principales retos operativos de CGA son mitigar los cuellos de botella y demoras logísticas en puertos sudafricanos, el alza de insumos agrícolas y las variaciones climáticas que presionan el precio por caja.',
    highlight: 'Coordinación entre Durban, Gqeberha y Ciudad del Cabo para cumplir entregas continuas',
    center: [-31.8, 28.0],
    zoom: 6,
    focusRouteId: 'ruta-za-e',
    scope: 'south-africa',
  },
  {
    id: 'tour-4',
    step: 4,
    kicker: 'Paso 4 de 6 · Corredor Marítimo CIF y OMC',
    title: 'Travesía Atlántica, Tratamiento de Frío y Casos OMC',
    description:
      'La negociación establece Incoterm CIF en contraestación. Frente a las exigencias de frío de la UE por la mancha negra de los cítricos (Citrus Black Spot), CGA respaldó los casos OMC DS616 y DS624 y pactó un protocolo de calidad compartido.',
    highlight: 'Acuerdo final: $10.15 USD/caja (15 kg) · CIF · Pago 30 días · Revisión anual tope 5%',
    center: [9.5, -15.0],
    zoom: 4,
    focusRouteId: 'ruta-cif-eu',
    scope: 'corridor-eu',
  },
  {
    id: 'tour-5',
    step: 5,
    kicker: 'Paso 5 de 6 · Contraparte Francesa',
    title: 'Groupe Auchan — Roubaix y Red Europea (Holding Elo)',
    description:
      'Fundado en 1961 en Roubaix por Gérard Mulliez, Auchan opera en 12 países (Francia, Alcampo España, Portugal, Polonia, Hungría, Rumanía...). Busca alimentos saludables a precios accesibles bajo un modelo omnicanal de entregas ajustadas.',
    highlight: 'Visión Auchan: "Eat well and live better while preserving the planet"',
    center: [48.2, 5.5],
    zoom: 5,
    focusRouteId: 'ruta-cif-eu',
    scope: 'corridor-eu',
  },
  {
    id: 'tour-6',
    step: 6,
    kicker: 'Paso 6 de 6 · Diversificación Global',
    title: 'Red Global de 120+ Países y Poder de Negociación',
    description:
      'Aunque UE y Reino Unido concentran del 30% al 40% del volumen, CGA evita atarse a exclusividad y diversifica agresivamente hacia China, India, Bangladesh, Medio Oriente y Norteamérica para proteger su rentabilidad.',
    highlight: '5 grandes bloques comerciales abastecidos desde África Austral',
    center: [12.0, 28.0],
    zoom: 2,
    focusRouteId: 'ruta-asia-me',
    scope: 'global',
  },
];

export const NEGOTIATION_PHASES: NegotiationPhase[] = [
  {
    id: 1,
    title: 'Fase 1. Protocolo inicial y saludos',
    shortTitle: 'Protocolo',
    timeRange: '0:00 – 0:40',
    objective: 'Presentación, saludos multiculturales, intercambio de tarjetas y creación de confianza.',
    cgaOffer: null,
    auchanOffer: null,
    agreedPrice: null,
    tensionLevel: 15,
    keyMilestone: 'Sawubona (Ubuntu) × Bonjour, Madame (formalidad francesa)',
    turns: [
      {
        speaker: 'Marie-Claire Botha',
        student: 'Em',
        role: 'Mediadora neutral',
        delegation: 'mediator',
        verbal:
          '«Buenos días a ambas delegaciones. Mi nombre es Marie-Claire Botha y seré la mediadora de esta negociación. Les agradezco su presencia. Podemos comenzar.»',
        nonVerbal: 'Se coloca de pie en medio de ambas delegaciones, sonríe ligeramente y mantiene las manos abiertas.',
        expression: 'Amable, tranquila y profesional.',
      },
      {
        speaker: 'Thandi Molefe',
        student: 'Liz',
        role: 'Jefa de delegación · CGA Sudáfrica',
        delegation: 'cga',
        verbal: '«"Sawubona. Igama lami ngu-Thandi". It’s a pleasure to meet you.» (Hola, señora Laurent. Es un gusto conocerla).',
        nonVerbal: 'Extiende la mano con firmeza, mantiene contacto visual y realiza una ligera inclinación de cabeza.',
        expression: 'Sonrisa cálida, mirada segura y actitud cordial.',
      },
      {
        speaker: 'Camille Laurent',
        student: 'Andy',
        role: 'Jefa de delegación · Auchan Francia',
        delegation: 'auchan',
        verbal: '«Bonjour, Madame Molefe. Enchantée. Merci de nous recevoir.» (Buenos días, señora Molefe. Encantada. Gracias por recibirnos).',
        nonVerbal: 'Responde con un apretón de manos breve y mantiene una postura erguida.',
        expression: 'Sonrisa discreta, rostro sereno y actitud formal.',
      },
      {
        speaker: 'Amahle Nkosi',
        student: 'Mich',
        role: 'Responsable de calidad y exportación · CGA',
        delegation: 'cga',
        verbal: '«Mucho gusto. Soy Amahle Nkosi, responsable de calidad y exportación de CGA.»',
        nonVerbal: 'Entrega su tarjeta con ambas manos y asiente ligeramente.',
        expression: 'Amable y segura.',
      },
      {
        speaker: 'Élodie Laurent',
        student: 'Ilse',
        role: 'Asesora comercial y legal · Auchan Francia',
        delegation: 'auchan',
        verbal: '«Enchantée. Soy Élodie Laurent, asesora comercial y legal de Auchan.»',
        nonVerbal: 'Recibe la tarjeta, la observa y la coloca cuidadosamente sobre la mesa.',
        expression: 'Seria, atenta y profesional.',
      },
    ],
  },
  {
    id: 2,
    title: 'Fase 2. Presentación de propuestas',
    shortTitle: 'Propuestas',
    timeRange: '0:40 – 1:15',
    objective: 'Presentar las ofertas iniciales de precio por caja de 15 kg y horizonte de suministro.',
    cgaOffer: 11.5,
    auchanOffer: 8.5,
    agreedPrice: null,
    tensionLevel: 42,
    keyMilestone: 'Brecha inicial de $3.00 USD/caja ($11.50 CGA vs $8.50 Auchan)',
    turns: [
      {
        speaker: 'Thandi Molefe',
        student: 'Liz',
        role: 'CGA – Sudáfrica',
        delegation: 'cga',
        verbal:
          '«Representamos a más de 1,400 productores de África austral. Proponemos un acuerdo de tres años para exportar naranja, mandarina y limón. Nuestro precio inicial es de 11.50 dólares por caja de 15 kilogramos.»',
        nonVerbal: 'Se inclina ligeramente hacia adelante y coloca su propuesta sobre la mesa.',
        expression: 'Segura, sonriente y convencida de su oferta.',
      },
      {
        speaker: 'Camille Laurent',
        student: 'Andy',
        role: 'Auchan – Francia',
        delegation: 'auchan',
        verbal:
          '«Agradecemos su propuesta. Sin embargo, Auchan busca mantener precios competitivos y garantizar un suministro constante. Nuestra oferta inicial es de 8.50 dólares por caja.»',
        nonVerbal: 'Consulta su libreta y enumera sus argumentos con los dedos.',
        expression: 'Seria, analítica y reservada.',
      },
    ],
  },
  {
    id: 3,
    title: 'Fase 3. Intercambio de información',
    shortTitle: 'Información',
    timeRange: '1:15 – 1:50',
    objective: 'Aclarar estándares de calidad, trazabilidad por lote, tratamiento de frío e Incoterm CIF.',
    cgaOffer: 11.5,
    auchanOffer: 8.5,
    agreedPrice: null,
    tensionLevel: 35,
    keyMilestone: 'Validación técnica: trazabilidad por lote + tratamiento frío + Incoterm CIF',
    turns: [
      {
        speaker: 'Amahle Nkosi',
        student: 'Mich',
        role: 'CGA – Sudáfrica',
        delegation: 'cga',
        verbal:
          '«Nuestra fruta cumple con los estándares de calidad. Contamos con controles de residuos, trazabilidad por lote y supervisión durante el transporte.»',
        nonVerbal: 'Presenta una bandeja de muestras y una carpeta con información técnica.',
        expression: 'Orgullosa, segura y dispuesta a demostrar la calidad.',
      },
      {
        speaker: 'Élodie Laurent',
        student: 'Ilse',
        role: 'Auchan – Francia',
        delegation: 'auchan',
        verbal:
          '«Nos interesa conocer más sobre la trazabilidad y el tratamiento de frío. También necesitamos saber qué condiciones de pago y entrega pueden ofrecernos.»',
        nonVerbal: 'Revisa los documentos y toma notas.',
        expression: 'Concentrada, seria y cuestionadora.',
      },
      {
        speaker: 'Thandi Molefe',
        student: 'Liz',
        role: 'CGA – Sudáfrica',
        delegation: 'cga',
        verbal:
          '«Podemos garantizar la trazabilidad de cada lote y proponemos trabajar bajo el incoterm CIF, con un plazo de pago que beneficie a ambas partes.»',
        nonVerbal: 'Asiente y mantiene las manos abiertas sobre la mesa.',
        expression: 'Tranquila y colaboradora.',
      },
    ],
  },
  {
    id: 4,
    title: 'Fase 4. Contraofertas',
    shortTitle: 'Contraofertas',
    timeRange: '1:50 – 2:25',
    objective: 'Acercar posiciones ajustando precio, volumen flexible y cláusula de revisión anual.',
    cgaOffer: 10.9,
    auchanOffer: 9.3,
    agreedPrice: null,
    tensionLevel: 54,
    keyMilestone: 'Brecha reducida a $1.60 USD/caja ($10.90 CGA vs $9.30 Auchan)',
    turns: [
      {
        speaker: 'Thandi Molefe',
        student: 'Liz',
        role: 'CGA – Sudáfrica',
        delegation: 'cga',
        verbal:
          '«Como muestra de buena voluntad, podemos reducir nuestra propuesta de 11.50 a 10.90 dólares por caja, siempre que exista un compromiso de compra a largo plazo.»',
        nonVerbal: 'Desliza una nueva propuesta hacia el centro de la mesa.',
        expression: 'Segura, pero con una sonrisa moderada.',
      },
      {
        speaker: 'Camille Laurent',
        student: 'Andy',
        role: 'Auchan – Francia',
        delegation: 'auchan',
        verbal:
          '«Apreciamos el esfuerzo. Podemos aumentar nuestra oferta de 8.50 a 9.30 dólares, considerando un volumen flexible y mejores condiciones de pago.»',
        nonVerbal: 'Revisa sus apuntes y levanta la mirada hacia Thandi.',
        expression: 'Pensativa y negociadora.',
      },
      {
        speaker: 'Élodie Laurent',
        student: 'Ilse',
        role: 'Auchan – Francia',
        delegation: 'auchan',
        verbal:
          '«Para Auchan es importante que el precio tenga estabilidad y que exista una revisión anual de costos con un límite establecido.»',
        nonVerbal: 'Señala una cláusula en el documento.',
        expression: 'Seria y firme.',
      },
      {
        speaker: 'Amahle Nkosi',
        student: 'Mich',
        role: 'CGA – Sudáfrica',
        delegation: 'cga',
        verbal: '«Podemos considerar esa condición, siempre que también se protejan los intereses de nuestros productores.»',
        nonVerbal: 'Mira a Thandi y después a la delegación francesa.',
        expression: 'Atenta y conciliadora.',
      },
    ],
  },
  {
    id: 5,
    title: 'Fase 5. Tensión y mediación',
    shortTitle: 'Mediación',
    timeRange: '2:25 – 3:35',
    objective: 'Superar el punto crítico mediante una fórmula integradora (paretiana) con impacto social.',
    cgaOffer: 10.15,
    auchanOffer: 10.15,
    agreedPrice: 10.15,
    tensionLevel: 86,
    keyMilestone: 'Solución mediadora: $10.00 base + $0.15 emergentes = $10.15 USD/caja',
    turns: [
      {
        speaker: 'Camille Laurent',
        student: 'Andy',
        role: 'Auchan – Francia',
        delegation: 'auchan',
        verbal:
          '«Debemos ser realistas. Tenemos otras alternativas de proveedores, como Perú y Chile. Necesitamos un precio que nos permita competir.»',
        nonVerbal: 'Cruza ligeramente los brazos y mantiene la mirada fija.',
        expression: 'Seria, firme y un poco inconforme.',
      },
      {
        speaker: 'Thandi Molefe',
        student: 'Liz',
        role: 'CGA – Sudáfrica',
        delegation: 'cga',
        verbal:
          '«Entendemos su posición, pero nuestros productores también enfrentan costos de transporte, insumos y exportación. No podemos aceptar un precio que afecte su trabajo.»',
        nonVerbal: 'Mantiene las manos sobre la mesa y deja de sonreír por unos segundos.',
        expression: 'Preocupada, pero segura y respetuosa.',
      },
      {
        speaker: 'Marie-Claire Botha',
        student: 'Em',
        role: 'Mediadora neutral',
        delegation: 'mediator',
        verbal:
          '«Permítanme intervenir. Ambas delegaciones buscan una relación comercial duradera. Propongo una solución que beneficie a las dos partes: un precio base de 10 dólares por caja, más 0.15 dólares destinados a productores emergentes. También propongo pago a 30 días, revisión anual de costos con un límite del 5% y un protocolo de calidad compartido.»',
        nonVerbal: 'Se coloca de pie, abre las manos y mira alternativamente a ambas jefas.',
        expression: 'Neutral, comprensiva y conciliadora.',
      },
      {
        speaker: 'Élodie Laurent',
        student: 'Ilse',
        role: 'Auchan – Francia',
        delegation: 'auchan',
        verbal:
          '«Podemos aceptar un total de 10.15 dólares por caja, siempre que el aporte sea transparente y podamos comprobar su destino.»',
        nonVerbal: 'Consulta sus apuntes y asiente ligeramente.',
        expression: 'Más relajada y dispuesta a llegar a un acuerdo.',
      },
      {
        speaker: 'Amahle Nkosi',
        student: 'Mich',
        role: 'CGA – Sudáfrica',
        delegation: 'cga',
        verbal:
          '«Estamos de acuerdo, siempre que el aporte beneficie realmente a los productores emergentes y se comparta el costo de las inspecciones.»',
        nonVerbal: 'Mira a Thandi y después asiente hacia la otra delegación.',
        expression: 'Esperanzada y satisfecha.',
      },
    ],
  },
  {
    id: 6,
    title: 'Fase 6. Acuerdo final',
    shortTitle: 'Acuerdo',
    timeRange: '3:35 – 4:20',
    objective: 'Confirmar formalmente las condiciones financieras, logísticas y de calidad.',
    cgaOffer: 10.15,
    auchanOffer: 10.15,
    agreedPrice: 10.15,
    tensionLevel: 18,
    keyMilestone: 'Confirmación bilateral: 3 años · $10.15 USD/caja · Pago 30 días · Tope 5%',
    turns: [
      {
        speaker: 'Marie-Claire Botha',
        student: 'Em',
        role: 'Mediadora neutral',
        delegation: 'mediator',
        verbal: '«Entonces, ¿podemos confirmar que ambas partes están de acuerdo con las condiciones propuestas?»',
        nonVerbal: 'Coloca el documento en el centro de la mesa y sonríe.',
        expression: 'Tranquila y satisfecha.',
      },
      {
        speaker: 'Thandi Molefe',
        student: 'Liz',
        role: 'CGA – Sudáfrica',
        delegation: 'cga',
        verbal:
          '«Por parte de CGA confirmamos el precio base de 10 dólares más 0.15 de aporte por caja, pago a 30 días, revisión anual y un acuerdo marco de tres años.»',
        nonVerbal: 'Asiente y mira directamente a Camille.',
        expression: 'Sonrisa de satisfacción y seguridad.',
      },
      {
        speaker: 'Camille Laurent',
        student: 'Andy',
        role: 'Auchan – Francia',
        delegation: 'auchan',
        verbal:
          '«Por parte de Auchan confirmamos las condiciones. Nos comprometemos a respetar los acuerdos de calidad, trazabilidad y las condiciones de compra.»',
        nonVerbal: 'Asiente y extiende la mano hacia Thandi.',
        expression: 'Amable y satisfecha.',
      },
    ],
  },
  {
    id: 7,
    title: 'Fase 7. Cierre formal',
    shortTitle: 'Cierre',
    timeRange: '4:20 – 5:00',
    objective: 'Firma del acuerdo marco y despedida cordial respetando ambos protocolos culturales.',
    cgaOffer: 10.15,
    auchanOffer: 10.15,
    agreedPrice: 10.15,
    tensionLevel: 8,
    keyMilestone: 'Firma oficial del Acuerdo Marco CGA × Groupe Auchan',
    turns: [
      {
        speaker: 'Marie-Claire Botha',
        student: 'Em',
        role: 'Mediadora neutral',
        delegation: 'mediator',
        verbal: '«Me alegra que hayamos llegado a un acuerdo. Les agradezco su disposición y declaro concluida esta negociación.»',
        nonVerbal: 'Entrega el contrato para la firma.',
        expression: 'Sonriente y profesional.',
      },
      {
        speaker: 'Thandi Molefe',
        student: 'Liz',
        role: 'CGA – Sudáfrica',
        delegation: 'cga',
        verbal: '«Muchas gracias, Madame Camille. Esperamos que esta sea la primera de muchas colaboraciones.»',
        nonVerbal: 'Firma el documento y estrecha la mano de Camille.',
        expression: 'Sonrisa amplia y sincera.',
      },
      {
        speaker: 'Camille Laurent',
        student: 'Andy',
        role: 'Auchan – Francia',
        delegation: 'auchan',
        verbal: '«Merci beaucoup. Ha sido un placer negociar con ustedes. Esperamos una relación comercial exitosa.»',
        nonVerbal: 'Firma el documento y responde al apretón de manos.',
        expression: 'Sonriente y cordial.',
      },
      {
        speaker: 'Amahle Nkosi y Élodie Laurent',
        student: 'Mich e Ilse',
        role: 'Equipos técnico y legal',
        delegation: 'mediator',
        verbal: '«Muchas gracias. Hasta la próxima.»',
        nonVerbal: 'Intercambian un apretón de manos y recogen sus documentos.',
        expression: 'Relajada y satisfecha.',
      },
    ],
  },
];

export const CULTURAL_DIMENSIONS: CulturalDimension[] = [
  {
    id: 'directness',
    label: 'Comunicación Directa (Bajo Contexto)',
    southAfricaScore: 84,
    franceScore: 42,
    southAfricaTag: 'Directa + hechos claros',
    franceTag: 'Implícita / matices',
  },
  {
    id: 'debate',
    label: 'Apertura al Debate Crítico / Refutación',
    southAfricaScore: 36,
    franceScore: 92,
    southAfricaTag: 'Armonía Ubuntu',
    franceTag: 'Debate intelectual',
  },
  {
    id: 'centralization',
    label: 'Centralización en Cúpula Directiva',
    southAfricaScore: 58,
    franceScore: 90,
    southAfricaTag: 'Consulta técnica previa',
    franceTag: 'Piramidal / PDG',
  },
  {
    id: 'formality',
    label: 'Formalidad Verbal y Títulos (Vous / Cadre)',
    southAfricaScore: 62,
    franceScore: 95,
    southAfricaTag: 'Cordial + small talk',
    franceTag: 'Monsieur/Madame estricto',
  },
  {
    id: 'monochronic',
    label: 'Rigidez Monócrona del Tiempo',
    southAfricaScore: 88,
    franceScore: 66,
    southAfricaTag: 'Tiempo controlado',
    franceTag: 'Regla 5–7 / estricta ejec.',
  },
  {
    id: 'relational',
    label: 'Énfasis en Vínculo Humano e Inclusión',
    southAfricaScore: 92,
    franceScore: 48,
    southAfricaTag: 'Ubuntu ("Yo soy porque somos")',
    franceTag: 'Credibilidad lógica primero',
  },
];

export const CULTURAL_TOPICS: CulturalTopic[] = [
  {
    id: 'comunicacion',
    title: 'Estilo de Comunicación',
    southAfrica: {
      headline: 'Directo, bajo contexto y consenso cooperativo (Ubuntu)',
      summary:
        'Expresión clara, transparente y respaldada en hechos verificables, pero modulada por la filosofía africana Ubuntu ("Yo soy porque nosotros somos").',
      bullets: [
        'Rechazan tácticas de presión extrema, hostilidad verbal o regateo agresivo.',
        'Buscan diálogo constructivo y acuerdos integradores ganar-ganar a largo plazo.',
        'Valoran la empatía, integridad y bienestar colectivo de los 1,400+ productores.',
      ],
    },
    france: {
      headline: 'Implícito, contexto medio-alto y debate intelectual',
      summary:
        'Estructuran primero los principios generales y el marco conceptual antes de bajar a detalles financieros; la comunicación escrita debe ser impecable.',
      bullets: [
        'El cuestionamiento incisivo y la refutación directa muestran interés intelectual, no hostilidad.',
        'Respetan interlocutores con dominio técnico, datos sólidos y coherencia lógica.',
        'Desconfían de discursos vagos o puramente emocionales.',
      ],
    },
  },
  {
    id: 'tiempo',
    title: 'Puntualidad y Horarios',
    southAfrica: {
      headline: 'Concepción monócrona (tiempo controlado)',
      summary:
        'Puntualidad estricta y adherencia rigurosa a horarios agendados como señal de seriedad, confiabilidad y respeto.',
      bullets: [
        'Cualquier imprevisto logístico debe notificarse con la mayor antelación posible.',
        'Enfoque en completar proyectos y cronogramas operativos concretos.',
      ],
    },
    france: {
      headline: 'Dualidad contextual + Semana de 35h y derecho a desconectar',
      summary:
        'En reuniones internas aplica la regla informal "5–7" (llegar 5 a 7 min tarde), pero en negociaciones ejecutivas internacionales la puntualidad es estricta.',
      bullets: [
        'Leyes laborales estrictas: semana de 35 horas y 11 horas consecutivas fuera del trabajo.',
        'Respeto absoluto al "derecho a desconectar": evitar correos/llamadas fuera de horario o en vacaciones.',
      ],
    },
  },
  {
    id: 'etiqueta',
    title: 'Saludo, Tarjetas y Vestimenta',
    southAfrica: {
      headline: 'Calidez interpersonal, inclusión y respeto mutuo',
      summary:
        'Apretón de manos firme, contacto visual directo y sonrisa abierta. Es vital dedicar minutos iniciales al small talk (viaje, clima, gastronomía, rugby o críquet).',
      bullets: [
        'Vestimenta ejecutiva conservadora y tradicional.',
        'Alta sensibilidad post-apartheid hacia inclusión, equidad y ciudadanía corporativa.',
        'Tratar con idéntica cortesía a toda la delegación sin actitudes paternalistas.',
      ],
    },
    france: {
      headline: 'Sobriedad formal, estatus gerencial (cadre) y cortesía verbal',
      summary:
        'Apretón breve, firme y cortés acompañado de "Bonjour". Uso obligatorio de Monsieur / Madame + apellido y tratamiento de usted (vous).',
      bullets: [
        'Las tarjetas deben indicar claramente el cargo directivo (cadre) y antigüedad.',
        'Vestimenta formal, clásica y elegante como reflejo de estatus y seriedad.',
        'La confianza se gana por rigor analítico y discreción, no por familiaridad instantánea.',
      ],
    },
  },
  {
    id: 'decisiones',
    title: 'Toma de Decisiones',
    southAfrica: {
      headline: 'Jerárquica con consulta técnica previa (Task Culture)',
      summary:
        'Aunque la alta dirección aprueba el acuerdo final, los equipos técnicos y mandos medios participan activamente y su influencia se basa en experiencia probada.',
      bullets: [
        'Fuerte cultura de tarea: adaptación rápida y rigor en estándares fitosanitarios y logística.',
        'Mayor margen operativo para ajustar términos técnicos durante la mesa.',
      ],
    },
    france: {
      headline: 'Centralizada en la cúpula (PDG), pausada y analítica',
      summary:
        'Estructura piramidal marcada donde el Président-Directeur Général concentra la autoridad estratégica; las reuniones recopilan evidencia para validación superior.',
      bullets: [
        'Rara vez se cierran contratos de forma inmediata en la primera mesa.',
        'Ritmo pausado que prioriza seguridad jurídica, coherencia estratégica y normativas UE.',
      ],
    },
  },
];

export const CONVERGENCE_POINTS = [
  'Visión de largo plazo orientada a la sostenibilidad: viabilidad de >1,400 citricultores (CGA) y alimentación saludable preservando el planeta (Auchan).',
  'Puntualidad estricta en reuniones ejecutivas internacionales y alto respeto por la profesionalidad.',
  'Exigencia de calidad técnica comprobable del producto, facilitando acuerdos marco plurianuales (3 años).',
];

export const FRICTION_ZONES = [
  {
    title: 'Armonía Ubuntu vs. Debate Crítico',
    risk: 'CGA puede percibir el cuestionamiento directo francés como hostilidad, mientras Auchan puede leer la cautela sudafricana como falta de rigor.',
    mitigation: 'Asumir cada objeción francesa como una oportunidad para demostrar dominio técnico con datos verificables de CRI.',
  },
  {
    title: 'Empatía Inicial vs. Reserva Formal',
    risk: 'Sudáfrica busca calidez interpersonal (small talk) antes de negociar; Francia mantiene distancia (Monsieur/Madame, vous) hasta validar credibilidad.',
    mitigation: 'Abrir con cortesía estructurada y cálida sin tutear ni invadir la esfera privada; respaldar todo con documentación impecable.',
  },
  {
    title: 'Margen Operativo vs. Validación PDG',
    risk: 'Presionar por cierres inmediatos choca con la toma de decisiones centralizada, pausada y analítica de la cúpula francesa.',
    mitigation: 'Diseñar cláusulas claras (tope 5%, trazabilidad, aporte verificable) y respetar los tiempos directivos y horarios laborales de Francia.',
  },
];

export const CGA_PROFILE = {
  name: "Citrus Growers' Association of Southern Africa (CGA)",
  founded: '1997 · Sudáfrica',
  product: 'Fruta fresca y derivados (Naranja, Mandarina, Limón, Pomelo)',
  mission:
    '“Apoyar a los productores de cítricos para que sean competitivos a nivel mundial y maximizar la sostenibilidad a largo plazo de sus miembros.”',
  vision:
    'Visión 260: “Que la industria produzca y exporte de manera rentable y sostenible 260 millones de cajas de cítricos para 2032, fortaleciendo toda la cadena de valor y generando más empleos y beneficios económicos para la región.”',
  values: [
    'Competitividad',
    'Sostenibilidad',
    'Colaboración',
    'Innovación',
    'Representación',
    'Participación',
    'Inclusión',
    'Responsabilidad',
  ],
  timeline: [
    {
      year: '1997',
      title: 'Nacimiento tras la desregulación agrícola',
      text: 'Tras disolverse el Citrus Board estatal, los citricultores fundan una entidad privada sin fines de lucro para representación unificada en logística, calidad y acceso a mercados.',
    },
    {
      year: '2002',
      title: 'Statutory Levy y Citrus Research International (CRI)',
      text: 'Se formaliza un gravamen legal por caja exportada aprobado por agricultores para financiar investigación científica, manejo de plagas y capacitación.',
    },
    {
      year: 'Inclusión',
      title: 'CGA Grower Development Company (GDC)',
      text: 'Filial dedicada a canalizar recursos y asistencia técnica directa a productores negros emergentes para superar rezagos históricos del apartheid.',
    },
    {
      year: 'OMC',
      title: 'Defensa técnica internacional (DS616 y DS624)',
      text: 'CGA lidera la evidencia científica para consultas ante la OMC frente a tratamientos de frío de la UE por mancha negra (Citrus Black Spot).',
    },
    {
      year: '2032',
      title: 'Meta Visión 260 y Diversificación Global',
      text: 'Más de 1,400 productores en 6 países australes abasteciendo a >120 países, impulsando expansión en China, India y Medio Oriente.',
    },
  ],
};

export const AUCHAN_PROFILE = {
  name: 'Groupe Auchan (Holding Elo)',
  founded: '1961 · Roubaix, Francia',
  product: 'Distribución minorista omnicanal (alimentos frescos, hipermercados, Drive Click & Collect)',
  mission: '“Asegurar que todas las personas que la rodean puedan vivir mejor.”',
  vision: '“Eat well and live better while preserving the planet.” (Comer bien y vivir mejor, preservando el planeta — 2023).',
  values: [
    'Compartir',
    'Confianza',
    'Progreso',
    'Escucha',
    'Fuerza de equipo',
    'Sencillez',
    'Rendimiento',
    'Responsabilidad',
  ],
  timeline: [
    {
      year: '1961',
      title: 'Fundación en Hauts Champs (Roubaix)',
      text: 'Gérard Mulliez adopta el modelo de autoservicio y venta por volumen con márgenes reducidos en el norte de Francia.',
    },
    {
      year: '1967',
      title: 'Primer hipermercado en Roncq',
      text: 'Sienta las bases del formato comercial de gran escala y en los años 70 integra desarrollo inmobiliario (Immochan / Ceetrus).',
    },
    {
      year: '1977',
      title: 'Accionariado para empleados',
      text: 'Medida pionera en el sector minorista que consolida el diálogo social y el sentido de pertenencia corporativa.',
    },
    {
      year: '1981+',
      title: 'Internacionalización (Alcampo y Europa)',
      text: 'Expansión a España (Alcampo), Portugal, Europa del Este, África (Senegal, Costa de Marfil) y Asia.',
    },
    {
      year: '2020–Hoy',
      title: 'Reconfiguración europea bajo Holding Elo',
      text: 'Tras vender Sun Art Retail a Alibaba e Italia, se enfoca en Francia, España, Portugal, Polonia, Hungría y Rumanía con logística omnicanal y alianzas de compra.',
    },
  ],
};

export const NEGOTIATION_INTERESTS = [
  {
    pillar: 'Precio y Financiamiento',
    cga: [
      'Precios rentables y estables que cubran alza de insumos y sobrecostos por demoras portuarias.',
      'Proteger el valor de la fruta en contraestación cuando Europa carece de cosecha propia.',
      'Reducir dependencia de UE/RU (30–40%) que resta poder de fijación de precios.',
    ],
    auchan: [
      'Precios competitivos frente al auge de cadenas de descuento duro en Europa.',
      'Márgenes estables y condiciones de pago favorables (30 días) para su modelo de volumen.',
      'Cláusula de estabilidad con revisión anual de costos con tope del 5%.',
    ],
  },
  {
    pillar: 'Exclusividad y Cobertura',
    cga: [
      'Mantener diversificación comercial sin atar a los productores a un único comprador.',
      'Conservar libertad para exportar a más de 120 países y crecer en Asia y Medio Oriente.',
    ],
    auchan: [
      'Asegurar abasto confiable y diferenciado en Francia, España, Portugal, Polonia, Rumanía y Hungría.',
      'Posibilidad de líneas especiales o marca propia diferenciada frente a competidores.',
    ],
  },
  {
    pillar: 'Volúmenes y Escala',
    cga: [
      'Escalar hacia la meta Visión 260 (260 millones de cajas para 2032) con compradores sólidos.',
      'Mitigar riesgos por cuellos de botella portuarios y variaciones climáticas.',
    ],
    auchan: [
      'Abasto continuo con entregas constantes en temporada y flexibilidad ante la demanda.',
      'Optimización logística omnicanal con menor superficie de venta y menos inventario.',
    ],
  },
  {
    pillar: 'Calidad y Certificaciones',
    cga: [
      'Acreditar máxima calidad con respaldo científico de CRI y trazabilidad por lote.',
      'Mitigar el impacto de barreras fitosanitarias UE (tratamiento de frío CBS / OMC DS616 y DS624).',
    ],
    auchan: [
      'Fruta segura, trazable y consistente que respalde su compromiso sostenible ante el consumidor.',
      'Cumplimiento estricto de normativa europea (límites de residuos y protocolos fitosanitarios).',
    ],
  },
];

export const TEAM_INFO = {
  university: 'Universidad Autónoma de Aguascalientes',
  center: 'Centro de Ciencias Económicas y Administrativas',
  degree: 'Lic. en Comercio Internacional · Semestre 5 · Grupo A',
  course: 'Multiculturalidad y Protocolo de Negocios',
  professor: 'Roussell Li-erth Toraya Pedroza',
  date: 'Viernes 27 de noviembre de 2026',
  teamName: 'Equipo 10',
  members: [
    { name: 'Angel Carranco, Ilse Lizeth', character: 'Élodie Laurent', delegation: 'Auchan – Francia' },
    { name: 'Luna Hernandez, Sara Elizabeth', character: 'Thandi Molefe', delegation: 'CGA – Sudáfrica' },
    { name: 'Marmolejo Quintanar, Andrea Michelle', character: 'Camille Laurent', delegation: 'Auchan – Francia' },
    { name: 'Muñoz Hernandez, Emily Montserrat', character: 'Marie-Claire Botha', delegation: 'Mediadora neutral' },
    { name: 'Perez Torres, Michel Angelique', character: 'Amahle Nkosi', delegation: 'CGA – Sudáfrica' },
  ],
};
