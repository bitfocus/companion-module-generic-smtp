import { InstanceBase, InstanceStatus, runEntrypoint, SomeCompanionConfigField } from '@companion-module/base'
import { UpdateActions, Mail } from './actions'
import { DeviceConfig, GetConfigFields } from './config'
import { UpgradeScripts } from './upgrades'
import { UpdateVariableDefinitions } from './variables'

import nodemailer, { SendMailOptions } from 'nodemailer'

class SMTPInstance extends InstanceBase<DeviceConfig> {
	private config: DeviceConfig
	private status: string

	constructor(internal: unknown) {
		super(internal)
		this.config = {}
		this.status = ""
	}

	/**
	 * Main initialization function called once the module
	 * is OK to start doing things.
	 */
	public async init(config: DeviceConfig): Promise<void> {
		this.updateStatus(InstanceStatus.Connecting)
		this.config = config

		this.updateStatus(InstanceStatus.Ok)
		this.status = InstanceStatus.Ok

		this.updateActions()
		this.updateVariableDefinitions()
	}

	/**
	 * Process an updated configuration array.
	 */
	async configUpdated(config: DeviceConfig) {
		this.config = config
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
	}

	updateActions() {
		UpdateActions(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	public async sendEmail(mail: Mail) {
		const transporter = nodemailer.createTransport({
			host: String(this.config.host),
			port: Number(this.config.port),
			secure: Boolean(this.config.secure),
			auth: {
				user: String(this.config.user),
				pass: String(this.config.password),
			},
		})

		let mailDescription: SendMailOptions = {
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
		console.log(info)
		this.log('debug', `email send successfully: ${info.response}`)
	}
}

runEntrypoint(SMTPInstance, UpgradeScripts)
