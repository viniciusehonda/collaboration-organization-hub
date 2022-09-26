import { ValidationComposite } from '@/main/composites/validation-composite'
import { ValidationBuilder as Builder } from '@/main/builders/validation-builder'

export const makeSignupValidation = (): ValidationComposite => ValidationComposite.build([
    ...Builder.field('firstName').required().build(),
    ...Builder.field('lastName').required().build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(4).build(),
    ...Builder.field('passwordConfirmation').required().min(4).sameAs('password').build()
])