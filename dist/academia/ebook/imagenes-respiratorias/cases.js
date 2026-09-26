(function (root) {
  'use strict';
  root.ImagingCases = {
  "rx": [
    {
      "id": "rx-normal",
      "title": "Referencia normal",
      "pattern": "normal",
      "context": "Estudio de referencia. Empezá por técnica, lateralidad y comparación de ambos campos.",
      "finding": "Campos simétricos, sin opacidad focal destacada; contornos diafragmáticos definidos en el esquema.",
      "meaning": "La referencia permite reconocer desviaciones, no demostrar ausencia de toda enfermedad.",
      "limit": "Una RX sin alteraciones evidentes no excluye TEP, enfermedad incipiente ni lesiones pequeñas.",
      "hint": "Revisá ambos vértices, hilios y bases antes de responder.",
      "source": "rx",
      "choices": [
        {
          "id": "a",
          "text": "Sin alteración focal representada"
        },
        {
          "id": "b",
          "text": "Ocupación pleural basal"
        },
        {
          "id": "c",
          "text": "Pérdida de volumen lobar"
        }
      ],
      "answer": "a"
    },
    {
      "id": "rx-consolidacion",
      "title": "Consolidación",
      "pattern": "consolidation",
      "context": "Caso docente ficticio: fiebre y tos. No se aportan cultivos ni resultado etiológico.",
      "finding": "Opacidad focal en el campo derecho con trayectos bronquiales aireados esquemáticos.",
      "meaning": "Patrón de ocupación alveolar; la infección es una posibilidad según el contexto.",
      "limit": "La imagen no identifica el microorganismo ni demuestra por sí sola infección.",
      "hint": "Buscá una opacidad que no se acompaña de una reducción marcada del volumen.",
      "source": "rx",
      "choices": [
        {
          "id": "c",
          "text": "Hiperinsuflación sin opacidades"
        },
        {
          "id": "a",
          "text": "Patrón de consolidación"
        },
        {
          "id": "b",
          "text": "Neumotórax aislado"
        }
      ],
      "answer": "a"
    },
    {
      "id": "rx-atelectasia",
      "title": "Atelectasia",
      "pattern": "atelectasis",
      "context": "Caso ficticio posoperatorio con respiración superficial.",
      "finding": "Opacidad triangular basal derecha y menor volumen del territorio representado.",
      "meaning": "La pérdida de volumen orienta a colapso; investigar su mecanismo con el equipo.",
      "limit": "No atribuir siempre la causa a secreciones ni indicar técnicas a partir del dibujo.",
      "hint": "La clave no es solo blanco: mirá el volumen.",
      "source": "rx",
      "choices": [
        {
          "id": "b",
          "text": "Derrame sin pérdida de volumen"
        },
        {
          "id": "c",
          "text": "Nódulo solitario"
        },
        {
          "id": "a",
          "text": "Atelectasia con pérdida de volumen"
        }
      ],
      "answer": "a"
    },
    {
      "id": "rx-derrame",
      "title": "Derrame pleural",
      "pattern": "effusion",
      "context": "Caso ficticio con disnea; comparar las bases y el ángulo costofrénico.",
      "finding": "Ocupación basal derecha de contorno superior curvo, con borramiento del ángulo.",
      "meaning": "El líquido pleural puede producir esta distribución; la posición modifica su aspecto.",
      "limit": "Una RX no determina por sí sola composición ni causa del líquido.",
      "hint": "Seguí el límite lateral del hemitórax hacia la base.",
      "source": "rx",
      "choices": [
        {
          "id": "a",
          "text": "Patrón de derrame pleural"
        },
        {
          "id": "b",
          "text": "Pulmón completamente normal"
        },
        {
          "id": "c",
          "text": "Neumotórax apical aislado"
        }
      ],
      "answer": "a"
    },
    {
      "id": "rx-neumotorax",
      "title": "Neumotórax",
      "pattern": "pneumothorax",
      "context": "Caso ficticio de dolor torácico súbito; imagen para reconocimiento, no decisión de drenaje.",
      "finding": "Línea pleural derecha separada de la pared y ausencia de trama periférica en el esquema.",
      "meaning": "Aire pleural como explicación del patrón; exige valoración clínica oportuna.",
      "limit": "Una imagen no define por sí sola neumotórax a tensión. Ante inestabilidad no se espera un ejercicio de imágenes.",
      "hint": "Diferenciá la línea pleural de un pliegue cutáneo.",
      "source": "rx",
      "choices": [
        {
          "id": "c",
          "text": "Derrame basal"
        },
        {
          "id": "a",
          "text": "Patrón compatible con neumotórax"
        },
        {
          "id": "b",
          "text": "Consolidación alveolar bilateral"
        }
      ],
      "answer": "a"
    },
    {
      "id": "rx-edema",
      "title": "Edema: patrón bilateral",
      "pattern": "edema",
      "context": "Caso ficticio con disnea y opacidades bilaterales; se requiere integrar antecedentes.",
      "finding": "Opacidades centrales en ambos pulmones, representadas de forma aproximadamente simétrica.",
      "meaning": "La distribución puede verse en edema; también existen causas alternativas de ocupación alveolar.",
      "limit": "No diagnostica insuficiencia cardíaca ni distingue siempre edema hidrostático de lesión de permeabilidad.",
      "hint": "Compará la distribución central bilateral con una lesión focal.",
      "source": "rx",
      "choices": [
        {
          "id": "b",
          "text": "Nódulo único"
        },
        {
          "id": "c",
          "text": "Neumotórax unilateral"
        },
        {
          "id": "a",
          "text": "Opacidades bilaterales compatibles con edema en contexto"
        }
      ],
      "answer": "a"
    },
    {
      "id": "rx-hiperinsuflacion",
      "title": "Hiperinsuflación",
      "pattern": "hyperinflation",
      "context": "Caso ficticio con disnea crónica. Primero comprobá técnica e inspiración.",
      "finding": "Campos más extendidos y cúpulas aplanadas en el esquema.",
      "meaning": "La hiperinsuflación puede acompañar enfermedad obstructiva.",
      "limit": "No confirma EPOC: el diagnóstico requiere evaluación funcional y clínica.",
      "hint": "Mirá la forma del diafragma, no solamente la oscuridad.",
      "source": "rx",
      "choices": [
        {
          "id": "a",
          "text": "Hiperinsuflación"
        },
        {
          "id": "b",
          "text": "Derrame pleural masivo"
        },
        {
          "id": "c",
          "text": "Colapso completo de ambos pulmones"
        }
      ],
      "answer": "a"
    },
    {
      "id": "rx-nodulo",
      "title": "Opacidad nodular",
      "pattern": "nodule",
      "context": "Hallazgo focal en una radiografía docente.",
      "finding": "Opacidad redondeada localizada en el campo superior derecho.",
      "meaning": "Requiere verificar si es lesión real, superposición o estructura extrapulmonar; la TC puede caracterizarla.",
      "limit": "No se infiere malignidad, tamaño real ni seguimiento desde un esquema sin calibrar.",
      "hint": "Localizá una alteración focal pequeña, no una opacidad lobar.",
      "source": "rx",
      "choices": [
        {
          "id": "c",
          "text": "Edema difuso"
        },
        {
          "id": "a",
          "text": "Opacidad nodular a caracterizar"
        },
        {
          "id": "b",
          "text": "Derrame pleural"
        }
      ],
      "answer": "a"
    }
  ],
  "ct": [
    {
      "id": "ct-normal",
      "title": "TC: referencia normal",
      "pattern": "normal",
      "context": "Cortes axiales conceptuales. En la sección anterior podés recorrer una selección de cortes clínicos reales normales.",
      "finding": "Dos pulmones aireados, vasos y mediastino central; cambian las estructuras según el nivel.",
      "meaning": "En axial se observa como desde los pies: la derecha del paciente queda a la izquierda de la pantalla.",
      "limit": "Un corte aislado no permite declarar normal toda la TC. El dibujo no contiene unidades Hounsfield.",
      "hint": "Ubicá primero anterior, posterior, derecha e izquierda.",
      "source": "ct",
      "choices": [
        {
          "id": "a",
          "text": "Anatomía normal esquemática"
        },
        {
          "id": "b",
          "text": "Enfisema bulloso representado"
        },
        {
          "id": "c",
          "text": "Derrame derecho"
        }
      ],
      "answer": "a"
    },
    {
      "id": "ct-consolidacion",
      "title": "Consolidación en TC",
      "pattern": "consolidation",
      "context": "Caso ficticio con opacidad del parénquima.",
      "finding": "Área densa en el pulmón derecho, con bronquios visibles dentro del territorio.",
      "meaning": "El parénquima normalmente aireado está ocupado; describir extensión y distribución.",
      "limit": "Consolidación no equivale exclusivamente a neumonía.",
      "hint": "Compará la zona densa con el pulmón aireado contralateral.",
      "source": "ct",
      "choices": [
        {
          "id": "c",
          "text": "Nódulo aislado"
        },
        {
          "id": "a",
          "text": "Consolidación"
        },
        {
          "id": "b",
          "text": "Ausencia completa de parénquima"
        }
      ],
      "answer": "a"
    },
    {
      "id": "ct-atelectasia",
      "title": "Atelectasia en TC",
      "pattern": "atelectasis",
      "context": "Caso ficticio con reducción de aireación regional.",
      "finding": "Territorio posterior derecho reducido y más denso en el esquema.",
      "meaning": "Pérdida de volumen y densidad aumentada apoyan un patrón de colapso.",
      "limit": "La causa debe establecerse con la serie y el contexto; no se deduce un tapón a partir del dibujo.",
      "hint": "Buscá cambios de forma y volumen además de densidad.",
      "source": "ct",
      "choices": [
        {
          "id": "b",
          "text": "Pulmón normal"
        },
        {
          "id": "c",
          "text": "Defecto vascular aislado"
        },
        {
          "id": "a",
          "text": "Atelectasia"
        }
      ],
      "answer": "a"
    },
    {
      "id": "ct-enfisema",
      "title": "Enfisema",
      "pattern": "emphysema",
      "context": "Caso ficticio con síntomas obstructivos crónicos.",
      "finding": "Áreas de menor atenuación dentro del parénquima representado.",
      "meaning": "El patrón es útil para reconocer destrucción del espacio aéreo; se describe tipo y distribución en una TC real.",
      "limit": "No se clasifica severidad funcional ni se confirma EPOC con este esquema.",
      "hint": "Buscá zonas más oscuras dentro del pulmón, no fuera de la pleura.",
      "source": "ct",
      "choices": [
        {
          "id": "a",
          "text": "Patrón de enfisema"
        },
        {
          "id": "b",
          "text": "Derrame pleural"
        },
        {
          "id": "c",
          "text": "Consolidación"
        }
      ],
      "answer": "a"
    },
    {
      "id": "ct-bronquiectasias",
      "title": "Bronquiectasias",
      "pattern": "bronchiectasis",
      "context": "Caso ficticio con tos productiva persistente.",
      "finding": "Bronquios dilatados, de paredes visibles, comparados con vasos acompañantes.",
      "meaning": "En una serie real se evalúa calibre, falta de afinamiento y extensión periférica.",
      "limit": "Un círculo en un único corte no basta: hay que seguir las estructuras.",
      "hint": "Seguí los anillos y compará bronquio con arteria adyacente.",
      "source": "ct",
      "choices": [
        {
          "id": "c",
          "text": "Neumotórax"
        },
        {
          "id": "a",
          "text": "Bronquiectasias"
        },
        {
          "id": "b",
          "text": "Nódulo sólido único"
        }
      ],
      "answer": "a"
    },
    {
      "id": "ct-fibrosis",
      "title": "Patrón fibrótico",
      "pattern": "fibrosis",
      "context": "Caso ficticio con disnea progresiva; discusión multidisciplinaria.",
      "finding": "Reticulación periférica, distorsión y espacios quísticos basales dibujados.",
      "meaning": "Los signos orientan a fibrosis; patrón y etiología se establecen con estudio completo.",
      "limit": "Panalización no equivale automáticamente a fibrosis pulmonar idiopática.",
      "hint": "Observá periferia, bases y distorsión, no solo aumento de blanco.",
      "source": "ct",
      "choices": [
        {
          "id": "b",
          "text": "Normalidad inequívoca"
        },
        {
          "id": "c",
          "text": "Embolia aislada"
        },
        {
          "id": "a",
          "text": "Patrón fibrótico"
        }
      ],
      "answer": "a"
    },
    {
      "id": "ct-vidrio",
      "title": "Vidrio esmerilado",
      "pattern": "groundglass",
      "context": "Caso ficticio de aumento parcial de atenuación.",
      "finding": "Zona gris tenue que permite reconocer estructuras vasculares a través de ella.",
      "meaning": "Es una descripción de imagen con múltiples causas posibles.",
      "limit": "No indica por sí sola COVID-19, edema ni una etiología específica.",
      "hint": "Compará cuánto se conservan visibles los vasos.",
      "source": "ct",
      "choices": [
        {
          "id": "a",
          "text": "Vidrio esmerilado"
        },
        {
          "id": "b",
          "text": "Consolidación que borra todo el detalle vascular"
        },
        {
          "id": "c",
          "text": "Aire pleural"
        }
      ],
      "answer": "a"
    },
    {
      "id": "ct-nodulo",
      "title": "Nódulo en TC",
      "pattern": "nodule",
      "context": "Hallazgo focal docente, sin escala diagnóstica.",
      "finding": "Lesión redondeada localizada en el pulmón derecho.",
      "meaning": "La TC real permite evaluar composición, bordes, tamaño y evolución.",
      "limit": "No aplicar tablas de seguimiento ni declarar malignidad con un dibujo sin dimensiones reales.",
      "hint": "Diferenciá la lesión de un vaso cortado transversalmente.",
      "source": "ct",
      "choices": [
        {
          "id": "c",
          "text": "Hiperinsuflación aislada"
        },
        {
          "id": "a",
          "text": "Nódulo a caracterizar"
        },
        {
          "id": "b",
          "text": "Derrame difuso"
        }
      ],
      "answer": "a"
    },
    {
      "id": "ct-embolia",
      "title": "Angio-TC: defecto de relleno",
      "pattern": "embolism",
      "context": "Esquema vascular ficticio, no una TC sin contraste.",
      "finding": "Una rama arterial opacificada contiene un defecto intraluminal representado.",
      "meaning": "En una angio-TC adecuada se analiza localización y calidad para evaluar TEP.",
      "limit": "Artefactos y contraste insuficiente pueden dificultar la interpretación. Este dibujo no confirma embolia.",
      "hint": "La alteración está dentro de un vaso, no en el espacio pleural.",
      "source": "ct",
      "choices": [
        {
          "id": "b",
          "text": "Bronquiectasia"
        },
        {
          "id": "c",
          "text": "Derrame pleural simple"
        },
        {
          "id": "a",
          "text": "Defecto de relleno vascular"
        }
      ],
      "answer": "a"
    }
  ],
  "us": [
    {
      "id": "us-normal",
      "title": "Pleura: referencia normal",
      "pattern": "normal",
      "context": "Exploración esquemática en una región torácica. La normalidad local no representa todo el pulmón.",
      "finding": "Línea pleural móvil y artefactos horizontales repetidos por debajo.",
      "meaning": "El deslizamiento y las líneas A describen el patrón visible en esa ventana.",
      "limit": "Las líneas A también aparecen en otras situaciones; no son un diagnóstico de normalidad global.",
      "hint": "Observá movimiento y artefactos, no una supuesta imagen completa de alvéolos.",
      "source": "us",
      "choices": [
        {
          "id": "a",
          "text": "Deslizamiento y líneas A"
        },
        {
          "id": "b",
          "text": "Consolidación periférica"
        },
        {
          "id": "c",
          "text": "Derrame complejo"
        }
      ],
      "answer": "a"
    },
    {
      "id": "us-lineas-b",
      "title": "Múltiples líneas B",
      "pattern": "blines",
      "context": "Caso ficticio con artefactos verticales en una ventana.",
      "finding": "Artefactos verticales nacen de pleura y llegan al fondo, acompañando el movimiento.",
      "meaning": "Describir cantidad, distribución y pleura; integrar otras regiones y clínica.",
      "limit": "No equivalen automáticamente a edema cardiogénico. Pueden observarse en fibrosis y otras condiciones.",
      "hint": "Los artefactos verticales atraviesan las líneas horizontales.",
      "source": "us",
      "choices": [
        {
          "id": "c",
          "text": "Diagnóstico etiológico definitivo de insuficiencia cardíaca"
        },
        {
          "id": "a",
          "text": "Múltiples líneas B"
        },
        {
          "id": "b",
          "text": "Normalidad global demostrada"
        }
      ],
      "answer": "a"
    },
    {
      "id": "us-consolidacion",
      "title": "Consolidación periférica",
      "pattern": "consolidation",
      "context": "Caso ficticio de lesión que contacta con pleura.",
      "finding": "Área con aspecto tisular y elementos bronquiales claros, algunos en movimiento.",
      "meaning": "Permite reconocer pérdida de aireación periférica accesible al ultrasonido.",
      "limit": "Lesiones centrales rodeadas de pulmón aireado pueden quedar ocultas.",
      "hint": "Buscá un aspecto de tejido donde antes predominaban artefactos.",
      "source": "us",
      "choices": [
        {
          "id": "b",
          "text": "Pulmón central completamente visualizado"
        },
        {
          "id": "c",
          "text": "Aire pleural aislado"
        },
        {
          "id": "a",
          "text": "Consolidación periférica"
        }
      ],
      "answer": "a"
    },
    {
      "id": "us-atelectasia",
      "title": "Atelectasia periférica",
      "pattern": "atelectasis",
      "context": "Caso ficticio de menor aireación basal.",
      "finding": "Región tisular reducida y elementos bronquiales sin movimiento claro en esta animación.",
      "meaning": "El patrón puede orientar a atelectasia al integrarlo con volumen, posición y clínica.",
      "limit": "Un broncograma estático no distingue por sí solo todas las causas de consolidación.",
      "hint": "Compará movimiento bronquial y volumen; no uses un único signo como sentencia.",
      "source": "us",
      "choices": [
        {
          "id": "a",
          "text": "Patrón tisular compatible con atelectasia en contexto"
        },
        {
          "id": "b",
          "text": "Normalidad local"
        },
        {
          "id": "c",
          "text": "Nódulo central visible a través de pulmón aireado"
        }
      ],
      "answer": "a"
    },
    {
      "id": "us-derrame",
      "title": "Derrame simple",
      "pattern": "effusion",
      "context": "Caso ficticio de colección pleural accesible.",
      "finding": "Espacio oscuro entre pared y pulmón, sobre el diafragma representado.",
      "meaning": "La ecografía permite localizar y describir líquido pleural.",
      "limit": "Anecoico no significa siempre trasudado. No se calcula volumen con este esquema.",
      "hint": "Ubicá primero el diafragma para no confundir líquido torácico y abdominal.",
      "source": "us",
      "choices": [
        {
          "id": "c",
          "text": "Parénquima normal"
        },
        {
          "id": "a",
          "text": "Colección pleural simple"
        },
        {
          "id": "b",
          "text": "Neumotórax confirmado"
        }
      ],
      "answer": "a"
    },
    {
      "id": "us-complejo",
      "title": "Derrame complejo",
      "pattern": "complex",
      "context": "Caso ficticio de líquido con ecos y tabiques.",
      "finding": "Colección pleural con líneas internas y contenido ecogénico.",
      "meaning": "La complejidad orienta la descripción y la evaluación especializada.",
      "limit": "No confirma empiema sin datos clínicos y análisis pertinentes.",
      "hint": "Compará con una colección homogéneamente negra.",
      "source": "us",
      "choices": [
        {
          "id": "b",
          "text": "Trasudado demostrado"
        },
        {
          "id": "c",
          "text": "Pulmón normal"
        },
        {
          "id": "a",
          "text": "Derrame pleural complejo"
        }
      ],
      "answer": "a"
    },
    {
      "id": "us-neumotorax",
      "title": "Sospecha de neumotórax",
      "pattern": "pneumothorax",
      "context": "Ventana anterior ficticia con ausencia de deslizamiento.",
      "finding": "Línea pleural sin movimiento y artefactos horizontales; modo M con patrón de líneas.",
      "meaning": "La combinación de hallazgos puede aumentar la sospecha; buscar otros signos y contexto.",
      "limit": "La ausencia de deslizamiento sola no confirma neumotórax; también puede ocurrir por otras causas.",
      "hint": "La ausencia de movimiento es una observación, no el diagnóstico final.",
      "source": "us",
      "choices": [
        {
          "id": "a",
          "text": "Ausencia de deslizamiento: requiere integrar otros signos"
        },
        {
          "id": "b",
          "text": "Neumotórax a tensión confirmado por un signo"
        },
        {
          "id": "c",
          "text": "Normalidad global garantizada"
        }
      ],
      "answer": "a"
    }
  ],
  "dia": [
    {
      "id": "dia-normal",
      "title": "Movimiento conservado",
      "pattern": "normal",
      "context": "Registro conceptual durante respiración espontánea; amplitud relativa, sin centímetros.",
      "finding": "Desplazamiento cíclico de la cúpula en la dirección inspiratoria indicada.",
      "meaning": "Identificar el ciclo es el primer paso antes de medir.",
      "limit": "Los rangos dependen de maniobra, posición, técnica y contexto.",
      "hint": "Compará inspiración con espiración del mismo ciclo.",
      "source": "dia",
      "choices": [
        {
          "id": "a",
          "text": "Movimiento conservado en el esquema"
        },
        {
          "id": "b",
          "text": "Parálisis confirmada"
        },
        {
          "id": "c",
          "text": "Prueba automática de extubación"
        }
      ],
      "answer": "a"
    },
    {
      "id": "dia-reducido",
      "title": "Excursión reducida",
      "pattern": "reduced",
      "context": "Escenario ficticio con menor amplitud respecto de la referencia.",
      "finding": "La cúpula se desplaza menos en el mismo marco temporal.",
      "meaning": "Puede motivar una evaluación de función, esfuerzo y condiciones de adquisición.",
      "limit": "No establece una causa ni separa por sí sola debilidad de bajo esfuerzo.",
      "hint": "La dirección se conserva, cambia la amplitud.",
      "source": "dia",
      "choices": [
        {
          "id": "c",
          "text": "Engrosamiento normal demostrado"
        },
        {
          "id": "a",
          "text": "Excursión reducida"
        },
        {
          "id": "b",
          "text": "Movimiento paradójico"
        }
      ],
      "answer": "a"
    },
    {
      "id": "dia-ausente",
      "title": "Movimiento ausente",
      "pattern": "absent",
      "context": "Escenario ficticio sin desplazamiento apreciable.",
      "finding": "Trazo casi horizontal y cúpula sin excursión representada.",
      "meaning": "Verificar técnica y condiciones antes de interpretar ausencia de movimiento.",
      "limit": "No diagnosticar parálisis con una única captura o durante ventilación controlada.",
      "hint": "Comprobá que exista esfuerzo y una ventana adecuada.",
      "source": "dia",
      "choices": [
        {
          "id": "b",
          "text": "Normalidad inequívoca"
        },
        {
          "id": "c",
          "text": "Mayor excursión"
        },
        {
          "id": "a",
          "text": "Sin movimiento visible en esta adquisición"
        }
      ],
      "answer": "a"
    },
    {
      "id": "dia-paradojico",
      "title": "Movimiento paradójico",
      "pattern": "paradoxical",
      "context": "Escenario ficticio con dirección opuesta a la referencia durante la inspiración.",
      "finding": "La cúpula se mueve en sentido inverso al ciclo señalado.",
      "meaning": "Es un hallazgo que requiere evaluación funcional y clínica especializada.",
      "limit": "El esquema no demuestra el mecanismo ni reemplaza una exploración completa.",
      "hint": "Compará el sentido del movimiento con el indicador de inspiración.",
      "source": "dia",
      "choices": [
        {
          "id": "a",
          "text": "Movimiento paradójico"
        },
        {
          "id": "b",
          "text": "Movimiento normal por definición"
        },
        {
          "id": "c",
          "text": "Medición de fuerza máxima"
        }
      ],
      "answer": "a"
    },
    {
      "id": "dia-inadecuado",
      "title": "Adquisición inadecuada",
      "pattern": "poor",
      "context": "La ventana no permite identificar con seguridad la interfaz que se necesita medir.",
      "finding": "Artefactos y pérdida de continuidad de la estructura; puntos de medida inciertos.",
      "meaning": "No corresponde forzar un número: mejorar la adquisición o pedir apoyo.",
      "limit": "Una medición reproducible sobre una estructura equivocada sigue siendo inválida.",
      "hint": "Antes de medir, identificá qué estás midiendo.",
      "source": "dia",
      "choices": [
        {
          "id": "c",
          "text": "Extubación autorizada"
        },
        {
          "id": "a",
          "text": "Registro no interpretable"
        },
        {
          "id": "b",
          "text": "Parálisis irreversible confirmada"
        }
      ],
      "answer": "a"
    }
  ],
  "vq": [
    {
      "id": "vq-normal",
      "title": "V/Q: referencia concordante",
      "pattern": "normal",
      "context": "Mapa conceptual de ventilación y perfusión, sin radiofármaco ni unidades clínicas.",
      "finding": "Distribución relativa concordante en ambos mapas.",
      "meaning": "Sirve como referencia de correspondencia regional.",
      "limit": "No es una gammagrafía real ni cuantifica probabilidades.",
      "hint": "Compará la misma región entre los dos paneles.",
      "source": "vq",
      "choices": [
        {
          "id": "a",
          "text": "Distribución concordante de referencia"
        },
        {
          "id": "b",
          "text": "Defecto discordante segmentario"
        },
        {
          "id": "c",
          "text": "Captación tumoral"
        }
      ],
      "answer": "a"
    },
    {
      "id": "vq-discordante",
      "title": "Defecto discordante",
      "pattern": "mismatch",
      "context": "Caso ficticio de región ventilada con perfusión reducida.",
      "finding": "Una región conserva ventilación y muestra déficit de perfusión.",
      "meaning": "La discordancia es relevante en la evaluación vascular, integrada con técnica y criterios.",
      "limit": "No asignar diagnóstico ni riesgo a partir de un esquema aislado.",
      "hint": "Encontrá una diferencia entre V y Q, no entre derecha e izquierda.",
      "source": "vq",
      "choices": [
        {
          "id": "c",
          "text": "Lesión mediastínica"
        },
        {
          "id": "a",
          "text": "Defecto V/Q discordante"
        },
        {
          "id": "b",
          "text": "Patrón concordante normal"
        }
      ],
      "answer": "a"
    },
    {
      "id": "vq-concordante",
      "title": "Defecto concordante",
      "pattern": "matched",
      "context": "Caso ficticio con reducción regional de ambas señales.",
      "finding": "La misma región está disminuida en ventilación y perfusión.",
      "meaning": "Se diferencia de una discordancia aislada y necesita correlación anatómica.",
      "limit": "La concordancia no identifica por sí sola la enfermedad causal.",
      "hint": "Buscá cambios en ambos mapas en el mismo sitio.",
      "source": "vq",
      "choices": [
        {
          "id": "b",
          "text": "Perfusión aislada reducida con ventilación conservada"
        },
        {
          "id": "c",
          "text": "Estudio completo normal"
        },
        {
          "id": "a",
          "text": "Defecto concordante"
        }
      ],
      "answer": "a"
    }
  ],
  "mr": [
    {
      "id": "mr-normal",
      "title": "RM: referencia anatómica",
      "pattern": "normal",
      "context": "Esquema axial; no representa una secuencia ni señal magnética calibrada.",
      "finding": "Mediastino central, pared y estructuras torácicas sin lesión añadida.",
      "meaning": "La RM puede aportar caracterización de tejidos en indicaciones seleccionadas.",
      "limit": "La intensidad depende de la secuencia; el dibujo no equivale a T1, T2 ni difusión.",
      "hint": "Reconocé compartimentos antes de buscar una lesión.",
      "source": "mr",
      "choices": [
        {
          "id": "a",
          "text": "Referencia sin lesión representada"
        },
        {
          "id": "b",
          "text": "Masa mediastínica"
        },
        {
          "id": "c",
          "text": "Invasión de pared"
        }
      ],
      "answer": "a"
    },
    {
      "id": "mr-mediastino",
      "title": "Lesión mediastínica",
      "pattern": "mass",
      "context": "Caso ficticio con lesión en el compartimento central.",
      "finding": "Volumen adicional en el mediastino, separado del parénquima en el esquema.",
      "meaning": "Localizar una lesión es distinto de establecer su histología.",
      "limit": "La RM debe interpretarse con sus secuencias y otros estudios.",
      "hint": "La lesión se ubica entre los pulmones.",
      "source": "mr",
      "choices": [
        {
          "id": "c",
          "text": "Imagen normal"
        },
        {
          "id": "a",
          "text": "Lesión mediastínica a caracterizar"
        },
        {
          "id": "b",
          "text": "Neumotórax aislado"
        }
      ],
      "answer": "a"
    },
    {
      "id": "mr-pared",
      "title": "Compromiso de pared",
      "pattern": "wall",
      "context": "Caso ficticio de lesión en contacto con pared torácica.",
      "finding": "Alteración focal junto a la pared, con relación anatómica representada.",
      "meaning": "La relación con tejidos vecinos puede ser relevante para caracterización y extensión.",
      "limit": "Contacto no demuestra invasión; el esquema no determina resecabilidad.",
      "hint": "Seguí el límite externo del tórax.",
      "source": "mr",
      "choices": [
        {
          "id": "b",
          "text": "Estudio normal"
        },
        {
          "id": "c",
          "text": "Patrón de ventilación/perfusión"
        },
        {
          "id": "a",
          "text": "Relación de una lesión con pared torácica"
        }
      ],
      "answer": "a"
    }
  ],
  "pet": [
    {
      "id": "pet-normal",
      "title": "PET-TC: captación fisiológica",
      "pattern": "normal",
      "context": "Mapa conceptual de captación sobre un esquema anatómico; sin SUV.",
      "finding": "Se representa actividad fisiológica en estructuras seleccionadas, sin foco pulmonar añadido.",
      "meaning": "La captación normal varía según órgano, preparación y condiciones.",
      "limit": "No es una distribución cuantitativa ni un estudio real.",
      "hint": "Actividad visible no significa automáticamente tumor.",
      "source": "pet",
      "choices": [
        {
          "id": "a",
          "text": "Referencia fisiológica esquemática"
        },
        {
          "id": "b",
          "text": "Todo foco corresponde a cáncer"
        },
        {
          "id": "c",
          "text": "Ausencia total de metabolismo"
        }
      ],
      "answer": "a"
    },
    {
      "id": "pet-lesion",
      "title": "Lesión con captación",
      "pattern": "avid",
      "context": "Caso ficticio con foco pulmonar de actividad aumentada.",
      "finding": "Foco coloreado dentro de un pulmón, con localización anatómica.",
      "meaning": "El hallazgo debe integrarse con TC, antecedentes y diagnóstico tisular cuando corresponda.",
      "limit": "Una captación aumentada no confirma malignidad.",
      "hint": "Describí captación y localización, no histología.",
      "source": "pet",
      "choices": [
        {
          "id": "c",
          "text": "Radiografía normal"
        },
        {
          "id": "a",
          "text": "Foco hipermetabólico a caracterizar"
        },
        {
          "id": "b",
          "text": "Malignidad demostrada sin más datos"
        }
      ],
      "answer": "a"
    },
    {
      "id": "pet-inflamacion",
      "title": "Captación inflamatoria",
      "pattern": "inflammation",
      "context": "Caso docente ficticio cuyo contexto incluye inflamación.",
      "finding": "Áreas de captación aumentada sin un patrón exclusivo de cáncer.",
      "meaning": "Procesos inflamatorios o infecciosos pueden captar el trazador.",
      "limit": "No existe un color que distinga por sí solo inflamación de tumor.",
      "hint": "El contexto clínico cambia la interpretación del mismo tipo de señal.",
      "source": "pet",
      "choices": [
        {
          "id": "b",
          "text": "Toda captación es cáncer"
        },
        {
          "id": "c",
          "text": "PET reemplaza siempre la biopsia"
        },
        {
          "id": "a",
          "text": "La captación también puede ser inflamatoria"
        }
      ],
      "answer": "a"
    }
  ]
};
})(typeof window !== 'undefined' ? window : globalThis);
