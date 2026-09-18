const prisma = require('../config/prisma')

async function recordAudit({ userId, action, entity, entityId, metadata }) {
  await prisma.auditLog.create({
    data: { userId, action, entity, entityId, metadata },
  })
}

module.exports = { recordAudit }
