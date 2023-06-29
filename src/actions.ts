import { InstanceBase, InstanceStatus } from '@companion-module/base'
import { DeviceConfig } from './config'

export interface Mail {
	recipient?: string
	cc?: string
	bcc?: string
	subject: string
	message: string
	replyTo?: string
}

export function UpdateActions(self: InstanceBase<DeviceConfig>) {
	self.setActionDefinitions({
		sendMail: {
			name: 'Send email',
			description: 'Seperate multiple recipients with commas.',
			options: [
				{
					type: 'textinput',
					id: 'recipient',
					label: 'Recipient',
				},
				{
					type: 'textinput',
					id: 'replyTo',
					label: 'Reply-to',
				},
				{
					type: 'textinput',
					id: 'cc',
					label: 'CC',
				},
				{
					type: 'textinput',
					id: 'bcc',
					label: 'BCC',
				},
				{
					type: 'textinput',
					id: 'subject',
					label: 'Subject',
					required: true,
				},
				{
					type: 'textinput',
					id: 'message',
					label: 'Message',
					required: true,
				},
			],
			callback: async (event): Promise<void> => {
				const mailContent = event.options

				mailContent.subject = await self.parseVariablesInString(mailContent.subject)
				mailContent.message = await self.parseVariablesInString(mailContent.message)

				if (mailContent.recipient) {
					mailContent.recipient = mailContent.recipient.split(',')
				} else {
					delete mailContent.recipient
				}

				if (mailContent.cc) {
					mailContent.cc = await self.parseVariablesInString(mailContent.cc)
					mailContent.cc = mailContent.cc.split(',')
				} else {
					delete mailContent.cc
				}

				if (mailContent.bcc) {
					mailContent.bcc = await self.parseVariablesInString(mailContent.bcc)
					mailContent.bcc = mailContent.bcc.split(',')
				} else {
					delete mailContent.bcc
				}

				if (mailContent.replyTo) {
					mailContent.replyTo = await self.parseVariablesInString(mailContent.replyTo)
				} else {
					delete mailContent.replyTo
				}
				if (self.status != InstanceStatus.Ok) {
					self.updateStatus(InstanceStatus.Ok)
				}
				self.sendEmail(mailContent)
				.catch((e: string) => {
					self.log('error', `an error occured while sending the email: ${e}`)
					self.updateStatus(InstanceStatus.ConnectionFailure)
				})
			},
		},
	})
}
