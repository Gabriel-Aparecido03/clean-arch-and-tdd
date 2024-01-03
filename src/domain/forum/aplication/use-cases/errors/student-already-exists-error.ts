import { UseCaseError } from '@/core/errors/use-case-error'

export class StudentAlreadyExitsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Student "${identifier}" address already exists.`)
  }
}
