import { UseCaseError } from '@/core/errors/use-case-error'

export class InvaliAttachmentType extends Error implements UseCaseError {
  constructor(type: string) {
    super(`file type "${type}" is not valid.`)
  }
}
