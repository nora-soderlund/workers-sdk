import assert from "node:assert";

// See public facing `cloudflare:test` types for docs
export let env: Record<string, unknown>;
export let SELF: Fetcher;

export let internalEnv: Record<string, unknown> & Env;
export function setEnv(newEnv: Record<string, unknown> & Env) {
	// Store full env for `WorkersSnapshotEnvironment`
	internalEnv = newEnv;

	// Strip internal bindings from user facing `env`
	env = { ...newEnv };
	SELF = newEnv.__VITEST_POOL_WORKERS_SELF_SERVICE;
	delete env.__VITEST_POOL_WORKERS_SELF_NAME;
	delete env.__VITEST_POOL_WORKERS_SELF_SERVICE;
	delete env.__VITEST_POOL_WORKERS_LOOPBACK_SERVICE;
	delete env.__VITEST_POOL_WORKERS_RUNNER_OBJECT;
	delete env.__VITEST_POOL_WORKERS_UNSAFE_EVAL;
}

export function getSerializedOptions(): SerializedOptions {
	assert(typeof __vitest_worker__ === "object", "Expected global Vitest state");
	const options = __vitest_worker__.config?.poolOptions?.workers;
	// `options` should always be defined when running tests
	assert(options !== undefined, "Expected serialised options");
	return options;
}
