import { InstanceBase, InstanceStatus, runEntrypoint, SomeCompanionConfigField } from '@companion-module/base'
import { UpdateActions, Mail } from './actions'
import { SMTPConfig, GetConfigFields } from './config'
import { UpdateVariableDefinitions } from './variables'

import nodemailer, { SendMailOptions } from 'nodemailer'

export class SMTPInstance extends InstanceBase<SMTPConfig> {
	private config: SMTPConfig
	status: string

	constructor(internal: unknown) {
		super(internal)
		this.config = {
			host: '',
			port: 465,
			secure: true,
			name: '',
			user: '',
			password: '',
		}
		this.status = ''
		process.title = this.label
	}

	/**
	 * Main initialization function called once the module
	 * is OK to start doing things.
	 */
	public async init(config: SMTPConfig): Promise<void> {
		process.title = this.label
		this.config = config

		this.updateStatus(InstanceStatus.Ok)
		this.status = InstanceStatus.Ok

		this.updateActions()
		this.updateVariableDefinitions()
		return Promise.resolve()
	}

	/**
	 * Process an updated configuration array.
	 */
	async configUpdated(config: SMTPConfig): Promise<void> {
		this.config = config
		return Promise.resolve()
	}

	/**
	 * Creates the configuration fields for web config.
	 */
	public getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	/**
	 * Clean up the instance before it is destroyed.
	 */
	public async destroy(): Promise<void> {
		this.log('debug', `destroy ${this.id}`)
		return Promise.resolve()
	}

	updateActions(): void {
		UpdateActions(this)
	}

	updateVariableDefinitions(): void {
		UpdateVariableDefinitions(this)
	}

	async sendEmail(mail: Mail): Promise<void> {
		const transporter = nodemailer.createTransport({
			host: String(this.config.host),
			port: Number(this.config.port),
			secure: Boolean(this.config.secure),
			auth: {
				user: String(this.config.user),
				pass: String(this.config.password),
			},
		})

		const mailDescription: SendMailOptions = {
			from: `${this.config.name} <${this.config.user}>`,
			to: mail.recipient,
			subject: mail.subject,
			html: mail.message,
		}

		if (mail.cc) {
			mailDescription.cc = mail.cc
		}

		if (mail.bcc) {
			mailDescription.bcc = mail.bcc
		}

		if (mail.replyTo) {
			mailDescription.replyTo = mail.replyTo
		}

		const info = await transporter.sendMail(mailDescription)
		this.log('debug', `email send successfully: ${info.response}`)
	}
}

runEntrypoint(SMTPInstance, [])
