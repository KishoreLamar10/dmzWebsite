import { PrismaClient } from '@prisma/client'

// as unknown as: required to attach a typed property to the untyped globalThis
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// In Prisma 7, the database connection URL is configured via prisma.config.ts
// for CLI operations (migrate, generate) and via a driver adapter at runtime.
// The adapter (e.g. @prisma/adapter-pg) will be wired in Phase 2 when the
// database connection is needed. For now, the singleton is scaffolded so that
// Phase 2 can add `adapter` to the constructor options without restructuring.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
