import { ValidationComposite } from '@/main/composites/validation-composite'
import { ValidationBuilder as Builder } from '@/main/builders/validation-builder'

export const makeTaskValidation = (): ValidationComposite => ValidationComposite.build([
    ...Builder.field('title').required().build()
])