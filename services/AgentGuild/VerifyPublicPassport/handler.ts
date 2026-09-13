// Agent Guild connector by AgentTanuki. Self-contained for MSCR's nonbundled compiler.
// Based on the author's retained Agent Guild protocol helpers; no other MSCR handler is copied.
const ORIGIN = 'https://agent-guild-5d5r.onrender.com';
const MAX_BYTES = 65536;
const TIMEOUT_MS = 15000;

type Context = {
  inputs: Record<string, unknown>;
  setOutput: (variable: string, value: unknown) => void;
};

function outputName(inputs: unknown): string {
  requireValue(record(inputs), 'invalid_input');
  const item = Object.getOwnPropertyDescriptor(inputs, 'outputVariable');
  requireValue(
    item && 'value' in item && item.enumerable,
    'invalid_output_variable',
  );
  const value = item.value;
  requireValue(
    typeof value === 'string' &&
      /^[A-Za-z_][A-Za-z0-9_]{0,63}$/.test(value) &&
      !['__proto__', 'constructor', 'prototype'].includes(value),
    'invalid_output_variable',
  );
  return value;
}
function parameters(inputs: Record<string, unknown>, keys: string[]) {
  const descriptors = Object.getOwnPropertyDescriptors(inputs);
  requireValue(
    Object.getOwnPropertySymbols(inputs).length === 0,
    'invalid_input',
  );
  requireValue(
    Object.keys(descriptors).length === keys.length &&
      keys.every(
        (key) => descriptors[key]?.enumerable && 'value' in descriptors[key],
      ),
    'invalid_input',
  );
  return Object.fromEntries(keys.map((key) => [key, descriptors[key].value]));
}
function failure(operation: string, error: unknown) {
  const code =
    error instanceof GuildError ? error.code : 'operation_unavailable';
  return {
    operation,
    status: [
      'http_unavailable',
      'request_unavailable',
      'request_aborted',
      'request_timeout',
    ].includes(code)
      ? 'unavailable'
      : 'rejected',
    verified: false,
    code,
    serviceOrigin: ORIGIN,
  };
}

class GuildError extends Error {
  constructor(public readonly code: string) {
    super(code);
  }
}

function requireValue(value: unknown, code: string): asserts value {
  if (!value) {
    throw new GuildError(code);
  }
}

function record(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
function base58(value: string): Uint8Array {
  requireValue(value.length > 0 && value.length <= 128, 'invalid_did');
  let n = 0n;
  for (const char of value) {
    const digit = BASE58.indexOf(char);
    requireValue(digit >= 0, 'invalid_did');
    n = n * 58n + BigInt(digit);
  }
  const bytes: number[] = [];
  while (n > 0n) {
    bytes.unshift(Number(n % 256n));
    n /= 256n;
  }
  for (const char of value) {
    if (char !== '1') {
      break;
    }
    bytes.unshift(0);
  }
  return Uint8Array.from(bytes);
}
function did(value: unknown): string {
  requireValue(
    typeof value === 'string' && value.startsWith('did:key:z'),
    'invalid_did',
  );
  const bytes = base58(value.slice(9));
  requireValue(
    bytes.length === 34 && bytes[0] === 0xed && bytes[1] === 0x01,
    'invalid_did',
  );
  return value;
}
function timestamp(value: unknown): number {
  requireValue(typeof value === 'string', 'invalid_credential_time');
  const match =
    /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(?:\.(\d{1,6}))?(?:Z|\+00:00)$/.exec(
      value,
    );
  requireValue(match, 'invalid_credential_time');
  const millis = Date.parse(
    `${match[1]}.${(match[2] ?? '').padEnd(3, '0').slice(0, 3)}Z`,
  );
  requireValue(
    Number.isFinite(millis) &&
      new Date(millis).toISOString().slice(0, 19) === match[1],
    'invalid_credential_time',
  );
  return millis;
}

function passportBinding(
  credential: Record<string, unknown>,
  issuer: string,
  subject: string,
  maxAge: number,
  now: number,
): void {
  requireValue(credential.issuer === issuer, 'issuer_mismatch');
  requireValue(
    record(credential.credentialSubject) &&
      credential.credentialSubject.id === subject,
    'subject_mismatch',
  );
  requireValue(
    Array.isArray(credential.type) &&
      credential.type.includes('VerifiableCredential') &&
      credential.type.includes('AgentGuildPassport'),
    'unsupported_credential',
  );
  const proof = credential.proof;
  requireValue(
    record(proof) &&
      proof.type === 'DataIntegrityProof' &&
      proof.cryptosuite === 'eddsa-jcs-2022',
    'unsupported_proof',
  );
  requireValue(
    proof.proofPurpose === 'assertionMethod' &&
      typeof proof.proofValue === 'string' &&
      proof.proofValue.startsWith('z') &&
      base58(proof.proofValue.slice(1)).length === 64,
    'unsupported_proof',
  );
  requireValue(
    proof.verificationMethod === `${issuer}#${issuer.slice(8)}`,
    'issuer_mismatch',
  );
  const from = timestamp(credential.validFrom);
  const until = timestamp(credential.validUntil);
  requireValue(
    from <= now && now < until && from < until,
    'credential_outside_validity',
  );
  requireValue(now - from <= maxAge * 1000, 'credential_stale');
}

// JSON.parse alone discards duplicate object keys. Reject ambiguity before projection.
function strictJson(text: string): unknown {
  let offset = 0;
  function whitespace() {
    while (/\s/.test(text[offset] ?? '') && offset < text.length) {
      offset++;
    }
  }
  function string(): string {
    const start = offset++;
    while (offset < text.length) {
      if (text[offset++] === '"') {
        return JSON.parse(text.slice(start, offset));
      }
      if (text[offset - 1] === '\\') {
        offset++;
      }
    }
    throw new GuildError('invalid_response');
  }
  function value(depth = 0): void {
    requireValue(depth <= 24, 'invalid_response');
    whitespace();
    if (text[offset] === '"') {
      string();
      return;
    }
    if (text[offset] === '{') {
      offset++;
      whitespace();
      const keys = new Set<string>();
      if (text[offset] === '}') {
        offset++;
        return;
      }
      while (offset < text.length) {
        requireValue(text[offset] === '"', 'invalid_response');
        const key = string();
        requireValue(!keys.has(key), 'invalid_response');
        keys.add(key);
        whitespace();
        requireValue(text[offset++] === ':', 'invalid_response');
        value(depth + 1);
        whitespace();
        if (text[offset] === '}') {
          offset++;
          return;
        }
        requireValue(text[offset++] === ',', 'invalid_response');
        whitespace();
      }
    } else if (text[offset] === '[') {
      offset++;
      whitespace();
      if (text[offset] === ']') {
        offset++;
        return;
      }
      while (offset < text.length) {
        value(depth + 1);
        whitespace();
        if (text[offset] === ']') {
          offset++;
          return;
        }
        requireValue(text[offset++] === ',', 'invalid_response');
      }
    } else {
      const match =
        /^(?:true|false|null|-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/.exec(
          text.slice(offset),
        );
      requireValue(match, 'invalid_response');
      if (!['true', 'false', 'null'].includes(match[0])) {
        requireValue(Number.isFinite(Number(match[0])), 'invalid_response');
      }
      offset += match[0].length;
      return;
    }
    throw new GuildError('invalid_response');
  }
  try {
    value();
    whitespace();
    requireValue(offset === text.length, 'invalid_response');
    return JSON.parse(text);
  } catch {
    throw new GuildError('invalid_response');
  }
}

interface ResponseEvidence {
  value: unknown;
  httpStatus: number;
  responseBytes: number;
  requestedAt: string;
  completedAt: string;
}

async function requestJson(
  fetcher: typeof globalThis.fetch,
  path: string,
  timeoutMs: number,
  body?: string,
  signal?: AbortSignal,
): Promise<ResponseEvidence> {
  const controller = new AbortController();
  let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
  let timedOut = false;
  const requestedAt = new Date().toISOString();
  const serviceUrl = new URL(`${ORIGIN}${path}`).href;
  const cancel = () => controller.abort();
  const onAbort = () => {
    throw new GuildError(timedOut ? 'request_timeout' : 'request_aborted');
  };
  const aborted = new Promise<never>((_resolve, reject) => {
    controller.signal.addEventListener(
      'abort',
      () => {
        try {
          onAbort();
        } catch (error) {
          reject(error);
        }
      },
      { once: true },
    );
  });
  if (signal?.aborted) {
    controller.abort();
  } else {
    signal?.addEventListener('abort', cancel, { once: true });
  }
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  try {
    if (controller.signal.aborted) {
      return await aborted;
    }
    const work = async (): Promise<ResponseEvidence> => {
      const response = await fetcher(serviceUrl, {
        method: body === undefined ? 'GET' : 'POST',
        headers:
          body === undefined
            ? { Accept: 'application/json' }
            : {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
        body,
        signal: controller.signal,
        redirect: 'error',
        credentials: 'omit',
        cache: 'no-store',
        referrerPolicy: 'no-referrer',
        mode: 'cors',
      });
      requireValue(
        !response.redirected && response.status === 200,
        'http_unavailable',
      );
      requireValue(
        response.url === '' || response.url === serviceUrl,
        'unexpected_response_url',
      );
      requireValue(
        response.headers
          .get('content-type')
          ?.split(';')[0]
          .trim()
          .toLowerCase() === 'application/json',
        'invalid_response',
      );
      requireValue(response.body, 'invalid_response');
      reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let size = 0;
      while (true) {
        const next = await reader.read();
        if (next.done) {
          break;
        }
        size += next.value.byteLength;
        requireValue(size <= MAX_BYTES, 'response_too_large');
        chunks.push(next.value);
      }
      const bytes = new Uint8Array(size);
      let cursor = 0;
      for (const chunk of chunks) {
        bytes.set(chunk, cursor);
        cursor += chunk.byteLength;
      }
      const value = strictJson(
        new TextDecoder('utf-8', { fatal: true }).decode(bytes),
      );
      return {
        value,
        httpStatus: response.status,
        responseBytes: size,
        requestedAt,
        completedAt: new Date().toISOString(),
      };
    };
    return await Promise.race([work(), aborted]);
  } catch (error) {
    if (controller.signal.aborted) {
      throw new GuildError(timedOut ? 'request_timeout' : 'request_aborted');
    }
    throw error instanceof GuildError
      ? error
      : new GuildError('request_unavailable');
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', cancel);
    // Cancelling a host-supplied stream must not extend the operation's deadline.
    if (reader) {
      void reader.cancel().catch(() => undefined);
    }
    controller.abort();
  }
}

function verification(
  value: unknown,
  credential: Record<string, unknown>,
  issuer: string,
  subject: string,
) {
  requireValue(
    record(value) &&
      typeof value.valid === 'boolean' &&
      typeof value.guild_issued === 'boolean',
    'invalid_response',
  );
  requireValue(value.issuer === issuer, 'issuer_mismatch');
  requireValue(value.subject_did === subject, 'subject_mismatch');
  return {
    issuerDid: issuer,
    subjectDid: subject,
    signatureValidReported: value.valid,
    guildIssuedReported: value.guild_issued,
    verified: value.valid && value.guild_issued,
    validFrom: credential.validFrom,
    validUntil: credential.validUntil,
    timeAndBindingChecksPassed: true,
    limitations: [
      'The remote Guild verifier reports signature validity; no independent local cryptographic verification is performed.',
      'A valid signature proves origin and integrity, not truthful claims, safety, task quality or endpoint ownership.',
      'Expected issuer and subject were supplied separately; independence of those choices remains a caller precondition.',
      'No enrollment, issuance, payment or delegation was performed.',
    ],
  };
}

export const handler = async ({ inputs, setOutput }: Context) => {
  const outputVariable = outputName(inputs);
  let output: Record<string, unknown>;
  try {
    const { credentialJson, expectedIssuerDid, expectedSubjectDid } =
      parameters(inputs, [
        'credentialJson',
        'expectedIssuerDid',
        'expectedSubjectDid',
        'outputVariable',
      ]);
    requireValue(typeof credentialJson === 'string', 'invalid_credential');
    const credentialBytes = new TextEncoder().encode(credentialJson);
    requireValue(credentialBytes.length <= 32768, 'credential_too_large');
    requireValue(
      new TextDecoder('utf-8', { fatal: true }).decode(credentialBytes) ===
        credentialJson,
      'invalid_credential_encoding',
    );
    const credential = strictJson(credentialJson);
    requireValue(record(credential), 'invalid_credential');
    const issuer = did(expectedIssuerDid);
    const subject = did(expectedSubjectDid);
    // The caller chooses the two expected DIDs independently; content cannot prove that choice.
    passportBinding(credential, issuer, subject, 86400, Date.now());
    const response = await requestJson(
      globalThis.fetch,
      '/credentials/verify',
      TIMEOUT_MS,
      credentialJson,
    );
    passportBinding(credential, issuer, subject, 86400, Date.now());
    output = {
      operation: 'passport_verification',
      status: 'completed',
      serviceOrigin: ORIGIN,
      requestedAt: response.requestedAt,
      completedAt: response.completedAt,
      httpStatus: response.httpStatus,
      responseBytes: response.responseBytes,
      ...verification(response.value, credential, issuer, subject),
    };
  } catch (error) {
    output = failure('passport_verification', error);
  }
  setOutput(outputVariable, output);
};
