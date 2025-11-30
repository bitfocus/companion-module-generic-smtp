import { CompanionVariableDefinition, InstanceBase } from '@companion-module/base'
import type { SMTPConfig, SMTPSecrets } from './config'

export function UpdateVariableDefinitions(instance: InstanceBase<SMTPConfig, SMTPSecrets>): void {
	const variables: CompanionVariableDefinition[] = [
		//{ variableId: 'variable1', name: 'My first variable' }
	]

	instance.setVariableDefinitions(variables)
}
