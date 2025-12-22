import { SomeCompanionConfigField } from '@companion-module/base'

export interface SMTPConfig {
	host: string
	port: number
	secure: boolean
	name: string
	user: string
}

export interface OldSMTPConfig {
	host: string
	port: number
	secure: boolean
	password: string
	name: string
	user: string
}

export interface SMTPSecrets {
	password: string
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'SMTP Server',
			width: 12,
		},
		{
			type: 'number',
			id: 'port',
			label: 'Port',
			default: 465,
			min: 1,
			max: 65535,
			width: 10,
		},
		{
			type: 'checkbox',
			id: 'secure',
			label: 'Secure',
			default: true,
			width: 1,
		},
		{
			type: 'textinput',
			id: 'name',
			label: 'Name of sender',
			width: 12,
		},
		{
			type: 'textinput',
			id: 'user',
			label: 'Address',
			width: 6,
		},
		{
			type: 'secret-text',
			id: 'password',
			label: 'Password',
			width: 6,
			required: false,
		},
	]
}
