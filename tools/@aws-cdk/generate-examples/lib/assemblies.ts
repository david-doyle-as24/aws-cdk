import * as path from 'path';
import * as spec from '@jsii/spec';
import * as fs from 'fs-extra';
import { TypeScriptSnippet } from 'jsii-rosetta';

/**
 * Replaces the file where the original assembly file *should* be found with a new assembly file.
 * Recalculates the fingerprint of the assembly to avoid tampering detection.
 */
export async function replaceAssembly(assembly: spec.Assembly, directory: string): Promise<void> {
  const fileName = path.join(directory, '.jsii');
  await fs.writeJson(fileName, _fingerprint(assembly), {
    encoding: 'utf8',
    spaces: 2,
  });
}

/**
 * Replaces the old fingerprint with '***********'.
 *
 * @rmuller says fingerprinting is useless, as we do not actually check
 * if an assembly is changed. Instead of keeping the old (wrong) fingerprint
 * or spending extra time calculating a new fingerprint, we replace with '**********'
 * that demonstrates the fingerprint has changed.
 */
function _fingerprint(assembly: spec.Assembly): spec.Assembly {
  assembly.fingerprint = '*'.repeat(10);
  return assembly;
}

/**
 * Insert an example into the docs of a type
 */
export function insertExample(example: TypeScriptSnippet, type: spec.Type): void {
  if (type.docs) {
    type.docs.example = example.visibleSource;
  } else {
    type.docs = { example: example.visibleSource };
  }
}
