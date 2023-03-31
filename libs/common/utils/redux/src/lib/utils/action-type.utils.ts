export function getActionType(featureKey: string, type: string): string {
	return `[${
		featureKey.charAt(0).toUpperCase() + featureKey.slice(1)
	}] ${type}`;
}
