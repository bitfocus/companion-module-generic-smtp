import { InstanceStatus } from '@companion-module/base'
import { SMTPInstance } from './index'

export interface Mail {
	recipient?: string
	cc?: string
	bcc?: string
	subject?: string
	message?: string
	replyTo?: string
}

export function UpdateActions(self: SMTPInstance): void {
	self.setActionDefinitions({
		sendMail: {
			name: 'Send email',
			description: 'Seperate multiple recipients with commas.',
			options: [
				{
					type: 'textinput',
					id: 'recipient',
					label: 'Recipient',
					useVariables: { local: true },
					multiline: true,
				},
				{
					type: 'textinput',
					id: 'replyTo',
					label: 'Reply-to',
					useVariables: { local: true },
				},
				{
					type: 'textinput',
					id: 'cc',
					label: 'CC',
					useVariables: { local: true },
					multiline: true,
				},
				{
					type: 'textinput',
					id: 'bcc',
					label: 'BCC',
					useVariables: { local: true },
					multiline: true,
				},
				{
					type: 'textinput',
					id: 'subject',
					label: 'Subject',
					required: true,
					useVariables: { local: true },
				},
				{
					type: 'textinput',
					id: 'message',
					label: 'Message',
					required: true,
					useVariables: { local: true },
					multiline: true,
				},
			],
			callback: async (event, _context): Promise<void> => {
				const mailContent = event.options
				if (typeof mailContent.subject === 'string' && typeof mailContent.message === 'string') {
					if (mailContent.recipient && typeof mailContent.recipient === 'string') {
						mailContent.recipient = mailContent.recipient.split(',')
					} else {
						delete mailContent.recipient
					}

					if (mailContent.cc && typeof mailContent.cc === 'string') {
						mailContent.cc = mailContent.cc.split(',')
					} else {
						delete mailContent.cc
					}

					if (mailContent.bcc && typeof mailContent.bcc === 'string') {
						mailContent.bcc = mailContent.bcc.split(',')
					} else {
						delete mailContent.bcc
					}

					if (!mailContent.replyTo) {
						delete mailContent.replyTo
					}
					if (self.status != InstanceStatus.Ok) {
						self.updateStatus(InstanceStatus.Ok)
						self.status = InstanceStatus.Ok
					}

					await self.sendEmail(mailContent).catch((e: string) => {
						self.log('error', `an error occured while sending the email: ${e}`)
						self.updateStatus(InstanceStatus.ConnectionFailure)
					})
				} else {
					self.log('error', 'an error occured when calling the action')
				}
			},
		},
	})
}
