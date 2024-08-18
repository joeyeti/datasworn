export async function buildLegacyDataforgedIdMap() {
	const glob = new Bun.Glob('**/*.json')

	const legacyIdRoot = 'src/legacy_ids/dataforged'

	const loadOps: Promise<unknown>[] = []

	for await (const file of glob.scan({ cwd: legacyIdRoot, absolute: true })) {
		loadOps.push(Bun.file(file).json())
	}

	const objects = await Promise.all(loadOps)

	const mergedObject: Record<string, string | null> = {}

	for (const obj of objects) Object.assign(mergedObject, obj)

	return mergedObject
}
