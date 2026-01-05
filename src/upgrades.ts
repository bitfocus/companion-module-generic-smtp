import {
	type CompanionStaticUpgradeProps,
	type CompanionStaticUpgradeResult,
	type CompanionUpgradeContext,
	type CompanionStaticUpgradeScript,
} from '@companion-module/base'
import type { OldSMTPConfig, SMTPConfig, SMTPSecrets } from './config.js'

function isOldConfig(obj: any): obj is OldSMTPConfig {
	return typeof obj.password === 'string'
}

function makePasswordSecret(
	_context: CompanionUpgradeContext<SMTPConfig>,
	props: CompanionStaticUpgradeProps<SMTPConfig, SMTPSecrets>,
): CompanionStaticUpgradeResult<SMTPConfig, SMTPSecrets> {
	const result: CompanionStaticUpgradeResult<SMTPConfig, SMTPSecrets> = {
		updatedActions: [],
		updatedConfig: null,
		updatedSecrets: null,
		updatedFeedbacks: [],
	}

	if (isOldConfig(props.config) && props.config.password) {
		result.updatedSecrets = {
			password: props.config.password,
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...config } = props.config
		result.updatedConfig = config
	}

	return result
}

export const UpgradeScripts: CompanionStaticUpgradeScript<SMTPConfig, SMTPSecrets>[] = [makePasswordSecret]
