import { ValidationComposite } from '@/main/composites/validation-composite'
import { ValidationBuilder as Builder } from '@/main/builders/validation-builder'

export const makeCustomerValidation = (): ValidationComposite => ValidationComposite.build([
    ...Builder.field('name').required().build(),
    ...Builder.field('Description').required().build()
])