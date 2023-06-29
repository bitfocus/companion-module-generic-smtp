import { CompanionStaticUpgradeScript, CreateConvertToBooleanFeedbackUpgradeScript } from '@companion-module/base'
import { DeviceConfig } from './config'

const BooleanFeedbackUpgradeMap: {} = {
	// Upgrades in here
}

export const UpgradeScripts: CompanionStaticUpgradeScript<DeviceConfig>[] = [
	CreateConvertToBooleanFeedbackUpgradeScript(BooleanFeedbackUpgradeMap),
]
