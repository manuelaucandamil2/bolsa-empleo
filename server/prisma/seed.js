const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Roles previstos por la plataforma completa de Gestión Humana (ver memoria del proyecto).
// Hoy solo se usa "candidato" desde bolsa-empleo, pero el catálogo ya deja espacio
// para los demás roles sin requerir cambios de esquema.
const ROLES = [
  { name: 'candidato', label: 'Candidato' },
  { name: 'empleado', label: 'Empleado' },
  { name: 'gestion_humana', label: 'Gestión Humana' },
  { name: 'gerente', label: 'Gerente / Solicitante de Vacante' },
  { name: 'lider', label: 'Líder / Jefe' },
  { name: 'sst', label: 'Seguridad y Salud en el Trabajo' },
  { name: 'admin', label: 'Administrador de la Plataforma' },
]

// Mismos cargos que REQUIRES_RETHUS en el frontend (src/features/perfil/Perfil.jsx):
// el RETHUS y la tarjeta profesional no aplican a todos los cargos.
const REQUIRES_RETHUS = ['Odontología General', 'Medicina General', 'Enfermería', 'Psicología Clínica']

const DOCUMENT_TYPES = [
  { name: 'Hoja de vida', requiredFor: [] },
  { name: 'Documento de identidad', requiredFor: [] },
  { name: 'Diploma o acta de grado', requiredFor: [] },
  { name: 'Tarjeta profesional', requiredFor: REQUIRES_RETHUS },
  { name: 'Certificado RETHUS', requiredFor: REQUIRES_RETHUS },
]

// Mismas vacantes que src/features/vacantes/jobsData.js del frontend, reutilizadas
// como primer borrador del contrato de datos real (ver memoria "vacantes-data-is-mock").
const JOBS = [
  {
    id: 'odontologo-general-norte',
    category: 'Odontología IPS',
    badgeText: 'Publicado hoy',
    badgeTone: 'neutral',
    title: 'Odontólogo(a) General - Sede Norte',
    location: 'Medellín (Sede Pepe Sierra)',
    schedule: 'Término indefinido',
    modality: 'Presencial',
    description:
      'Requisitos: Registro RETHUS vigente, tarjeta profesional, experiencia mínima de 2 años en operativa, prótesis fija y…',
    responsibilities: [
      'Atención odontológica general a pacientes adscritos al plan de salud.',
      'Diagnóstico, tratamiento y seguimiento de procedimientos de operatoria y prótesis fija.',
      'Registro clínico conforme a la normativa vigente de historia clínica.',
    ],
    requirements: [
      'Título profesional en Odontología con tarjeta profesional vigente.',
      'Registro RETHUS activo.',
      'Mínimo 2 años de experiencia en consulta general.',
      'Disponibilidad para laborar en Sede Norte, Bogotá.',
    ],
    tags: ['Bono bienestar', 'Póliza de Salud', 'Capacitación'],
    salaryLabel: 'Asignación Salarial',
    salary: '$5.200.000 COP',
  },
  {
    id: 'psicologo-clinico-preventivamente',
    category: 'Salud Mental - Preventivamente',
    badgeText: 'Urgente',
    badgeTone: 'urgent',
    title: 'Psicólogo(a) Clínico - Clínica Preventivamente',
    location: 'Medellín (Sede El Poblado)',
    schedule: 'Tiempo Completo',
    modality: 'Presencial',
    description:
      'Atención terapéutica individual y grupal, elaboración de planes de intervención cognitivo-conductual. Tarjeta profesional al día…',
    responsibilities: [
      'Atención terapéutica individual y grupal a pacientes remitidos.',
      'Elaboración de planes de intervención cognitivo-conductual.',
      'Participación en juntas clínicas interdisciplinarias.',
    ],
    requirements: [
      'Título profesional en Psicología con énfasis clínico.',
      'Tarjeta profesional vigente.',
      'Experiencia mínima de 1 año en atención clínica.',
      'Disponibilidad de tiempo completo en Sede El Poblado, Medellín.',
    ],
    tags: ['Horario Flexible', 'Supervisión Clínica'],
    salaryLabel: 'Remuneración Fija',
    salary: '$4.500.000 COP',
  },
  {
    id: 'medico-general-consulta-externa',
    category: 'Medicina General',
    badgeText: '3 Vacantes',
    badgeTone: 'neutral',
    title: 'Médico(a) General de Consulta Externa',
    location: 'Cali (Sede San Fernando)',
    schedule: 'Turnos Rotativos',
    modality: 'Contrato Directo',
    description:
      'Consulta programada y prioritaria para usuarios adscritos al plan complementario. Formación médica continuada certificada y…',
    responsibilities: [
      'Consulta médica programada y prioritaria a usuarios del plan complementario.',
      'Formulación y seguimiento de tratamientos según guías clínicas vigentes.',
      'Remisión oportuna a especialidades cuando se requiera.',
    ],
    requirements: [
      'Título profesional en Medicina con Registro Médico vigente.',
      'Disponibilidad para turnos rotativos.',
      'Deseable experiencia previa en consulta externa.',
      'RCP básico vigente.',
    ],
    tags: ['Póliza Jurídica 100%', 'Alimentación Sede'],
    salaryLabel: 'Salario base + recargos',
    salary: '$6.800.000 COP',
  },
  {
    id: 'jefe-enfermeria-coordinacion',
    category: 'Enfermería Asistencial',
    badgeText: 'Hace 2 días',
    badgeTone: 'neutral',
    title: 'Jefe de Enfermería / Coordinación Asistencial',
    location: 'Barranquilla (Sede Prado)',
    schedule: 'Horario Fijo Diurno',
    modality: 'Presencial',
    description:
      'Supervisión del equipo de auxiliares, gestión de inventarios de bioseguridad, administración segura de medicamentos y…',
    responsibilities: [
      'Supervisión del equipo de auxiliares de enfermería.',
      'Gestión de inventarios de bioseguridad e insumos médicos.',
      'Administración segura de medicamentos conforme a protocolos institucionales.',
    ],
    requirements: [
      'Título profesional en Enfermería con tarjeta profesional vigente.',
      'Experiencia mínima de 3 años en coordinación asistencial.',
      'Conocimientos en gestión de calidad en salud.',
    ],
    tags: ['Auxilio de Movilidad', 'Convenios Educativos'],
    salaryLabel: 'Salario Integral',
    salary: '$3.800.000 COP',
  },
  {
    id: 'auxiliar-facturacion-ips',
    category: 'Administración en Salud',
    badgeText: 'Activa',
    badgeTone: 'active',
    title: 'Auxiliar Administrativo de Facturación IPS',
    location: 'Bucaramanga (Sede Cabecera)',
    schedule: 'Lunes a Viernes',
    modality: 'Presencial',
    description:
      'Generación y validación de RIPS conforme a normativa vigente del Ministerio de Salud, radicación electrónica ante EPS y gestión…',
    responsibilities: [
      'Generación y validación de RIPS conforme a normativa del Ministerio de Salud.',
      'Radicación electrónica de cuentas ante EPS.',
      'Gestión de glosas y respuesta a requerimientos de auditoría.',
    ],
    requirements: [
      'Técnico o tecnólogo en áreas administrativas o de salud.',
      'Experiencia mínima de 1 año en facturación en salud.',
      'Manejo de herramientas ofimáticas y software de facturación.',
    ],
    tags: ['Teletrabajo 1 día/sem', 'Caja de Compensación'],
    salaryLabel: 'Salario Base Legal',
    salary: '$2.100.000 COP',
  },
  {
    id: 'especialista-ortodoncia-ortopedia',
    category: 'Odontología Especializada',
    badgeText: 'Cupo Prioritario',
    badgeTone: 'priority',
    title: 'Especialista en Ortodoncia y Ortopedia Maxilar',
    location: 'Medellín (Sedes El poblado)',
    schedule: 'Por Honorarios / Fracciones',
    modality: 'Presencial',
    description:
      'Manejo de aparatología fija, ortopedia y alineadores invisibles. Infraestructura digital de escaneo intraoral disponible en sede…',
    responsibilities: [
      'Diagnóstico y planeación de tratamientos de ortodoncia y ortopedia maxilar.',
      'Manejo de aparatología fija y alineadores invisibles.',
      'Uso de escaneo intraoral 3D para seguimiento de tratamientos.',
    ],
    requirements: [
      'Especialización en Ortodoncia y Ortopedia Maxilar.',
      'Tarjeta profesional y RETHUS vigentes.',
      'Experiencia mínima de 2 años como especialista.',
      'Disponibilidad por honorarios/fracciones en sedes El poblado.',
    ],
    tags: ['Flujo Seguro Pacientes', 'Scanner 3D en Sede'],
    salaryLabel: 'Esquema Tarifario',
    salary: 'Porcentaje Competitivo',
  },
]

async function main() {
  for (const role of ROLES) {
    await prisma.role.upsert({ where: { name: role.name }, update: {}, create: role })
  }

  for (const doc of DOCUMENT_TYPES) {
    await prisma.documentType.upsert({
      where: { name: doc.name },
      update: { requiredFor: doc.requiredFor },
      create: doc,
    })
  }

  for (const job of JOBS) {
    await prisma.vacante.upsert({ where: { id: job.id }, update: job, create: job })
  }

  console.log(`Seed completado: ${ROLES.length} roles, ${DOCUMENT_TYPES.length} tipos de documento, ${JOBS.length} vacantes.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
