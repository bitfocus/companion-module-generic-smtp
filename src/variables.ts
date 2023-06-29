import { CompanionVariableDefinition, InstanceBase } from '@companion-module/base'
import { DeviceConfig } from './config'

export function UpdateVariableDefinitions(instance: InstanceBase<DeviceConfig>): void {
	const variables: CompanionVariableDefinition[] = [
		//{ variableId: 'variable1', name: 'My first variable' }
	]

	instance.setVariableDefinitions(variables)
}
